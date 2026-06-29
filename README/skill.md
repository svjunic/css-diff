# Claude Code スキル

css-review を Claude Code から呼び出すスキルです。CSS/SCSS/SASS ファイルを編集した後、意図しない副作用がないかを自動的に検証します。

## スキルの種類

| スキル | 用途 | 実行バイナリ |
|---|---|---|
| `css-review` | 社内・開発環境向け | プロジェクト内の `bin/css-review.src.js` を直接実行 |
| `css-review-npm` | 公開・汎用向け | npm パッケージ `@svjunic/css-review` を使用 |

どちらも同じ検証ロジックを実行します。状況に応じて使い分けてください。

## 検証の観点

### 1. カスケード差分

単純な文字列差分ではなく、ブラウザのカスケードルールを適用した**最終有効値**で比較します。

- **後勝ちルール** — `.a { color: red; color: green; }` → `green` のみを有効値として検出
- **`!important` の影響** — `!important` の付与・削除も変更として報告
- **`@media` / `@keyframes`** — コンテキスト別の差分も見落とさない

```
変更: .button
  color: red → blue
  padding: 8px → 12px

追加: .modal
  z-index: 100
```

### 2. セレクタ出現順の変更

DOM を使わずに、同じ詳細度（specificity）を持つセレクタの相対的な出現順が変わったことを検知します。

カスケードでは **後に書かれたルールが優先** されるため、セレクタの並び順を変えると最終的なスタイルが変わる可能性があります。競合プロパティ（同じプロパティを異なる値で定義しているセレクタどうし）が並び替えられた場合は特に強く警告します。

```
⚠️ 順序変更が検出されました
セレクタの並び順が変更されています。想定通りの変更か確認してください。
```

### 3. 標準外のプロパティ名

差分に含まれるすべてのプロパティ名を確認し、CSS の標準プロパティでないものを指摘します。タイポの早期発見に役立ちます。

**除外対象（正常として扱う）:**

- CSS カスタムプロパティ（`--primary-color` など）
- ベンダープレフィックス（`-webkit-`・`-moz-`・`-ms-`・`-o-` で始まるもの）

```
⚠️ 標準外のプロパティ名が含まれています
以下のプロパティはCSSの標準プロパティではありません。タイポの可能性があります：
- `disyplay`（`display` の間違いでしょうか？）
```

> このチェックはスキルの解釈フェーズで Claude が行います。コアツールは変更なく、false positive を避けるため候補が推測できる場合のみサジェストします。

## セットアップ

### css-review（社内・開発環境向け）

前提条件: postcss がグローバルインストールされていること

```bash
npm install -g postcss
```

スキルディレクトリをプロジェクトの `.claude/skills/` 以下に配置します。

### css-review-npm（公開・汎用向け）

スキルディレクトリで依存パッケージをインストールします。

```bash
cd .claude/skills/css-review-npm && npm ci
```

## 使い方

Claude Code のチャットで呼び出します。

```
/css-review
CSS確認して
スタイル変更を検証して
CSSの差分を見せて
```

### PostToolUse Hook（自動検証）

`css-review-npm` は CSS/SCSS/SASS ファイルを編集するたびに自動検証する hook にも対応しています。`.claude/settings.local.json` に設定を追加することで、手動で呼び出さなくても変更があるたびに通知を受けられます。

詳細は [css-review-npm/SKILL.md](../skills/css-review-npm/SKILL.md) を参照してください。

## 出力例

```
=== src/styles/button.css ===

変更あり: 3件

  .btn-primary
    color: #333 → #000

  .btn-secondary
    background: #f5f5f5 → #eeeeee
    border-color: #ccc → #bbb

HTMLレポート: css-review-report/src--styles--button.css.html
```

変更件数が多い場合は HTML レポート（`css-review-report/` 以下）への誘導に切り替わります。HTML レポートはセレクタごとのアコーディオン UI で詳細を確認できます。
