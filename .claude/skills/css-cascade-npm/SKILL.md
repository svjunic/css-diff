---
name: css-cascade-npm
description: テストが書けない大規模CSSにおいて、変更によるカスケードリスク（セレクタの競合・順序変更による意図しない上書き）を検出するスキル。「/css-cascade」「CSSのカスケードリスクを確認して」「CSSの変更影響を確認して」「CSS変更でカスケードが壊れていないか確認して」などのフレーズが出た時に使用。@svjunic/css-cascadeをnpm経由で取得してCSSの意味的差分を確認する（公開・汎用向け）。
allowed-tools:
  - Bash
  - Read
---

# CSS カスケードリスク確認スキル（npm版）

`@svjunic/css-cascade` を使い、CSSカスケードルールを踏まえた意味的差分で変更を検証するスキル。テキスト差分ではなく「最終的に有効なプロパティ値」レベルで比較するため、後勝ちルールや `!important` の影響も正確に把握できる。

## 前提条件

- Node.js 18.3.0 以上
- @svjunic/css-cascade は初回実行時にスキルディレクトリへ自動インストールされる（npm ci）

> `<SKILL_DIR>` = このスキルが読み込まれた際に表示される `Base directory for this skill:` のパス。以降の手順でも同様に使用すること。

## 実行手順

### Step 1: @svjunic/css-cascade をスキルディレクトリにインストールする（初回のみ）

```bash
if [ ! -d "<SKILL_DIR>/node_modules/@svjunic" ]; then
  echo "@svjunic/css-cascade をインストールしています（初回のみ）..."
  npm ci --prefix <SKILL_DIR>
fi
```

`<SKILL_DIR>/node_modules/@svjunic` が存在しない場合は `npm ci` でインストールしてから Step 2 へ進む。`node_modules` が存在する場合はスキップする。

### Step 2: 変更されたCSSファイルを検出する

```bash
git diff --name-only HEAD -- '*.css'
```

検出対象は `.css` ファイルのみです（SCSS/SASS ソースファイルは対象外）。コンパイル後の CSS ファイルを検証してください。

変更ファイルが0件の場合は「検証対象なし（未コミットのCSS変更がありません）」と報告して終了。

> 変更ファイルが1件以上あった場合は、必ず Step 3 のスクリプトを実行すること。
> git diff のテキスト差分だけで変更内容を判断しないこと。

### Step 3: HTMLレポートを生成し、意味的差分を取得する

#### Step 3a: 各ファイルのHTMLレポートを生成する

変更された各ファイルを個別に比較し、HTMLレポートを `css-cascade-report/` に出力する。
セレクタ順序の変更も検出するため `--order-risk` を常に付与する。

```bash
mkdir -p css-cascade-report
WORK_DIR=$(mktemp -d)

for filepath in $(git diff --name-only HEAD -- '*.css' | sort); do
  SLUG=$(echo "$filepath" | tr '/' '-')
  OLD="$WORK_DIR/old-${SLUG}.css"
  git show HEAD:${filepath} > "$OLD" 2>/dev/null || > "$OLD"
  OUTPUT_HTML="css-cascade-report/$(echo "$filepath" | sed 's|/|--|g').html"
  node <SKILL_DIR>/node_modules/.bin/css-cascade \
    "$OLD" ${filepath} \
    --format html --order-risk > "$OUTPUT_HTML" 2>&1 || true
  echo "HTMLレポート: file://$(pwd)/$OUTPUT_HTML"
done

rm -rf "$WORK_DIR"
```

#### Step 3b: 各ファイルを並列で比較してClaudeが読むための意味的差分を取得する

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
    node <SKILL_DIR>/node_modules/.bin/css-cascade "$OLD" "${filepath}" \
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

- `0` → 差分なし・順序変更リスクなし（全ファイル）
- `1` → 差分あり、または順序変更リスクあり（いずれか1ファイル以上）
- `2` → エラー（ファイル読み込み失敗・CSSパースエラー）

### Step 4: 結果を解釈・報告する

Step 3b の出力は `=== filepath ===` セパレータで区切られたファイルごとの JSON ブロックになっている。各ファイルの `summary` と `contexts` を読み取り、ファイルごとに報告する。
**HTMLレポートのパスを必ず表示すること。**

**JSON 出力の構造（Step 3b の各ブロックの形式）：**

```json
{
  "version": 1,
  "summary": { "changed": 2, "added": 1, "removed": 0, "unchanged": 14 },
  "contexts": [
    {
      "key": "@media screen",
      "status": "changed",
      "changeCount": 3,
      "selectors": [
        {
          "selector": ".foo .bar",
          "status": "changed",
          "changeCount": 2,
          "props": [
            { "prop": "color",   "status": "changed",  "oldValue": "red",  "newValue": "blue" },
            { "prop": "display", "status": "added",                         "newValue": "flex" },
            { "prop": "margin",  "status": "removed",  "oldValue": "8px"                      }
          ]
        }
      ]
    }
  ],
  "orderRisks": [
    {
      "contextKey": "base",
      "hasWarning": true,
      "rows": [
        {
          "type": "moved",
          "oldSelector": ".foo",
          "newSelector": ".foo",
          "sameSpecificity": true,
          "conflictingProps": [
            {
              "prop": "color",
              "oldEffective": { "value": "red", "important": false },
              "newEffective": { "value": "blue", "important": false }
            }
          ]
        }
      ]
    }
  ]
}
```

フィールドの意味：
- `contexts[].key`: コンテキスト識別子（`@media screen` / `root` など）
- `contexts[].selectors[].props[].status`: `"changed"` / `"added"` / `"removed"` のいずれか
- `props[].oldValue`: 変更前の値（`status` が `changed` または `removed` の場合のみ存在）
- `props[].newValue`: 変更後の値（`status` が `changed` または `added` の場合のみ存在）
- `orderRisks[].contextKey`: リスクが発生するコンテキスト（`"base"` / `"@media screen"` など）
- `orderRisks[].rows[].type`: 変更種別（`"moved"` / `"added"` / `"deleted"` / `"equal"`）
- `orderRisks[].rows[].oldSelector` / `newSelector`: 移動前後のセレクタ
- `orderRisks[].rows[].sameSpecificity`: 詳細度が同一かどうか（true のとき順序が効く）
- `orderRisks[].rows[].conflictingProps[].prop`: 競合プロパティ名
- `orderRisks[].rows[].conflictingProps[].oldEffective` / `newEffective`: 変更前後の適用値と `!important` フラグ

**大量変更時（ファイル全体で `changed + added + removed` 合計が 50 件超）:** `summary` のみ報告し、「変更件数が多いため詳細はHTMLレポートを参照してください」と案内する。

**変更の確認ポイント：**

- `changed` プロパティ: 変更前の値 (`oldValue`) → 変更後の値 (`newValue`) を表示
- `added` プロパティ: 意図的な追加か、想定外の副作用かを確認
- `removed` プロパティ: 意図的な削除か確認
- `@media` コンテキスト: メディアクエリ内の変更も見落とさない

**順序変更の報告（プロパティ変更がゼロでも必ず確認）：**

JSON の `orderRisks` フィールドを確認する。`hasWarning: true` のエントリがあれば順序変更あり。
`rows[].conflictingProps` が存在するエントリはカスケード競合（後勝ちルールで適用値が変わる）を意味するため特に注意して報告する。
競合プロパティは `rows[].conflictingProps[].prop` で確認し、`oldEffective` / `newEffective` で変更前後の適用値を確認する。

```
⚠️ **順序変更が検出されました**
セレクタの並び順が変更されています。想定通りの変更か確認してください。

HTMLレポートで詳細を確認してください:
→ css-cascade-report/docs--common.css.html
```

**エージェントとしての判断：**

このスキルの目的は「CSSの変更が意図しないカスケードの副作用（セレクタの上書きや順序変更による影響）を引き起こしていないか」を確認することである。

- プロパティ変更あり → 変更内容が「意図した変更の直接的な結果」か「副作用」かを区別して報告。HTMLレポートも案内する
- プロパティ変更ゼロ・順序変更あり → `⚠️ **順序変更が検出されました**` と警告し、HTMLレポートへ誘導する
- 差分なし（exit code 0）かつ順序変更なし → 問題なしと報告

**出力フォーマット：**

全ファイルの結果をサマリーテーブルにまとめ、⚠️ のファイルのみ変更詳細を展開する。

```markdown
| 判定 | ファイル | changed | added | removed | 順序変更 | その他 | レポート |
|------|---------|---------|-------|---------|---------|--------|---------|
| ✅ | common.css | 0 | 0 | 0 | なし | | - |
| ⚠️ | main.css | 2 | 1 | 0 | あり (color, bg) | | [main--css.html](file:///abs/path/css-cascade-report/main--css.html) |
| ❌ | broken.css | - | - | - | - | CSSパースエラー | - |
```

列の定義：
- **判定**: `✅`（問題なし）/ `⚠️`（変更あり または 順序変更あり）/ `❌`（エラー）
- **順序変更**: `orderRisks` に `hasWarning: true` があれば「あり」＋`conflictingProps` を併記
- **その他**: エラーメッセージ、標準外プロパティの警告など
- **レポート**: Step 3a が出力した `file://` URL を `[filename](url)` 形式の markdown リンクにして記載。Claude Code UI でクリックするとブラウザで開ける。エラー時は `-`

⚠️ のファイルがある場合、テーブルの後に変更詳細を展開する：

```markdown
#### main.css の変更詳細
- `@media screen` › `.foo .bar`
  - `color`: `red` → `blue`
  - `display`: （追加）`flex`
```

大量変更時（50 件超）はテーブルのサマリーのみ掲載し、詳細はレポートへ誘導する。

**posttooluse.js との連携：**

ファイル保存時に `posttooluse.js` が自動実行され、1 行サマリー（`[css-cascade] filename: N 変更, 順序変更リスク M 件`）を出力する。これは変更の警告通知であり、詳細報告（Step 4 の全項目）は `/css-cascade-npm` スキルを明示的に呼び出した際に行う。

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

| エラー                               | 原因                     | 対処                                             |
| ------------------------------------ | ------------------------ | ------------------------------------------------ |
| `Exit code 2`                        | CSSパースエラー          | ファイルの構文エラーを確認                       |
| `@svjunic/css-cascade が見つかりません` | パッケージ未インストール | `npm install @svjunic/css-cascade` を実行           |
| git showがエラー                     | 新規追加ファイル         | 空ファイルを旧バージョンとして使用（Step 3参照） |
