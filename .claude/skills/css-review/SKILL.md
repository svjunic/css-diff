---
name: css-review
description: SASSやCSSを修正した後に最終的なスタイル変更が想定通りか検証するスキル。「CSS確認して」「スタイル変更を検証して」「/css-review」「css変更を確認」「CSSの差分を見せて」などのフレーズが出た時に使用。プロジェクト内のスクリプトを使ってCSSの意味的差分を確認する（社内・開発環境向け）。
allowed-tools:
  - Bash
  - Read
---

# CSS 差分検証スキル（スクリプト版）

プロジェクト内の `bin/css-review.src.js` を使い、CSSカスケードルールを踏まえた意味的差分で変更を検証するスキル。テキスト差分ではなく「最終的に有効なプロパティ値」レベルで比較するため、後勝ちルールや `!important` の影響も正確に把握できる。

## 前提条件

- Node.js 18.3.0 以上
- postcss が以下いずれかの方法でインストール済みであること（初回のみ）

**方法A: グローバルインストール**（環境に1回だけ実行）

```bash
npm install -g postcss
```

この場合、スクリプト実行時に `NODE_PATH=$(npm root -g)` を先頭に付ける（Step 2 参照）。

**方法B: プロジェクトにインストール済み**

検証対象プロジェクトの `node_modules/postcss` が存在する場合は追加作業不要。Node.js の通常のモジュール解決でプロジェクトの postcss が使われる。

> `<SKILL_DIR>` = このスキルが読み込まれた際に表示される `Base directory for this skill:` のパス。以降の手順でも同様に使用すること。

## 実行手順

### Step 1: 変更されたCSSファイルを検出する

```bash
git diff --name-only HEAD -- '*.css'
```

検出対象は `.css` ファイルのみです（SCSS/SASS ソースファイルは対象外）。コンパイル後の CSS ファイルを検証してください。

変更ファイルが0件の場合は「検証対象なし（未コミットのCSS変更がありません）」と報告して終了。

> 変更ファイルが1件以上あった場合は、必ず Step 2 のスクリプトを実行すること。
> git diff のテキスト差分だけで変更内容を判断しないこと。

### Step 2: HTMLレポートを生成し、意味的差分を取得する

> **postcss 解決について:** 以下のコマンドは `NODE_PATH=$(npm root -g)` を付けてグローバル postcss を参照する。
> プロジェクトに postcss がインストールされている場合（方法B）、プロジェクトの node_modules が優先されるため NODE_PATH は無視される。どちらの方法でも同じコマンドが使える。

#### Step 2a: 各ファイルのHTMLレポートを生成する

変更された各ファイルを個別に比較し、HTMLレポートを `css-review-report/` に出力する。
セレクタ順序の変更も検出するため `--order-risk` を常に付与する。

```bash
mkdir -p css-review-report

for filepath in $(git diff --name-only HEAD -- '*.css' | sort); do
  git show HEAD:${filepath} > /tmp/css-review-old-one.css 2>/dev/null || > /tmp/css-review-old-one.css
  OUTPUT_HTML="css-review-report/$(echo "$filepath" | sed 's|/|--|g').html"
  NODE_PATH=$(npm root -g) node <SKILL_DIR>/bin/css-review.src.js \
    /tmp/css-review-old-one.css ${filepath} \
    --format html --order-risk > "$OUTPUT_HTML" 2>&1 || true
  echo "HTMLレポート: $OUTPUT_HTML"
done
```

#### Step 2b: 各ファイルを並列で比較してClaudeが読むための意味的差分を取得する

各ファイルを並列処理し、終了後にソート順で結合して出力する。

```bash
WORK_DIR=$(mktemp -d)

for filepath in $(git diff --name-only HEAD -- '*.css' | sort); do
  (
    SLUG=$(echo "$filepath" | tr '/' '-')
    OLD="$WORK_DIR/old-${SLUG}.css"
    OUT="$WORK_DIR/out-${SLUG}.txt"
    git show HEAD:${filepath} > "$OLD" 2>/dev/null || > "$OLD"
    echo "=== $filepath ===" > "$OUT"
    NODE_PATH=$(npm root -g) node <SKILL_DIR>/bin/css-review.src.js "$OLD" "${filepath}" \
      --format json --order-risk --filter all >> "$OUT" 2>&1
    echo $? > "$WORK_DIR/exit-${SLUG}.code"
  ) &
done

wait

OVERALL_EXIT=0
for filepath in $(git diff --name-only HEAD -- '*.css' | sort); do
  SLUG=$(echo "$filepath" | tr '/' '-')
  cat "$WORK_DIR/out-${SLUG}.txt"
  FILE_EXIT=$(cat "$WORK_DIR/exit-${SLUG}.code" 2>/dev/null || echo 0)
  [ "$FILE_EXIT" -gt "$OVERALL_EXIT" ] && OVERALL_EXIT=$FILE_EXIT
done

rm -rf "$WORK_DIR"
exit $OVERALL_EXIT
```

終了コードの意味（`OVERALL_EXIT` = 全ファイル中の最大値）：

- `0` → 差分なし（全ファイル）
- `1` → 差分あり（いずれか1ファイル以上）
- `2` → エラー（ファイル読み込み失敗・CSSパースエラー）

### Step 3: 結果を解釈・報告する

Step 2b の出力は `=== filepath ===` セパレータで区切られたファイルごとの JSON ブロックになっている。各ファイルの `summary` と `contexts` を読み取り、ファイルごとに報告する。
**HTMLレポートのパスを必ず表示すること。**

**大量変更時（ファイル全体で `changed + added + removed` 合計が 50 件超）:** `summary` のみ報告し、「変更件数が多いため詳細はHTMLレポートを参照してください」と案内する。

**変更の確認ポイント：**

- `changed` プロパティ: 変更前の値 (`oldValue`) → 変更後の値 (`newValue`) を表示
- `added` プロパティ: 意図的な追加か、想定外の副作用かを確認
- `removed` プロパティ: 意図的な削除か確認
- `@media` コンテキスト: メディアクエリ内の変更も見落とさない

**順序変更の報告（プロパティ変更がゼロでも必ず確認）：**

JSON の `orderRisks` フィールドを確認する。`hasWarning: true` のエントリがあれば順序変更あり。
`conflictingProps` が存在する場合はカスケード競合（後勝ちルールで適用値が変わる）を意味するため特に注意して報告する。

```
⚠️ **順序変更が検出されました**
セレクタの並び順が変更されています。想定通りの変更か確認してください。

HTMLレポートで詳細を確認してください:
→ css-review-report/docs--common.css.html
```

**エージェントとしての判断：**

このスキルの目的は「CSSの変更が意図しないカスケードの副作用（セレクタの上書きや順序変更による影響）を引き起こしていないか」を確認することである。

- プロパティ変更あり → 変更内容が「意図した変更の直接的な結果」か「副作用」かを区別して報告。HTMLレポートも案内する
- プロパティ変更ゼロ・順序変更あり → `⚠️ **順序変更が検出されました**` と警告し、HTMLレポートへ誘導する
- 差分なし（exit code 0）かつ順序変更なし → 問題なしと報告

**プロパティ名の検証：**

差分の全コンテキストに含まれるすべての `prop` 値（`added`・`changed`・`removed` のすべてのステータスが対象）を確認し、以下の条件をすべて満たすものを「標準外プロパティ」としてフラグを立てる：

1. `--` で始まるCSSカスタムプロパティでないこと（例: `--primary-color` は除外）
2. `-webkit-`・`-moz-`・`-ms-`・`-o-` などのベンダープレフィックスで始まらないこと
3. 標準のCSSプロパティとして認識できないこと（Claudeの知識で判断）

標準外プロパティが見つかった場合は以下の形式で報告する：

```
⚠️ **標準外のプロパティ名が含まれています**
以下のプロパティはCSSの標準プロパティではありません。タイポの可能性があります：
- `disyplay`（`display` の間違いでしょうか？）
```

- 候補が推測できる場合はサジェストする
- 推測が難しい場合は「標準CSSプロパティではありません」とだけ伝える

## エラー対処

| エラー                    | 原因                          | 対処                                                            |
| ------------------------- | ----------------------------- | --------------------------------------------------------------- |
| `Cannot find module`      | postcss 未インストール        | `npm install -g postcss` を実行                                |
| `Exit code 2`             | CSSパースエラー               | ファイルの構文エラーを確認                                      |
| git showがエラー          | 新規追加ファイル              | 空ファイルを旧バージョンとして使用（Step 2参照）               |
