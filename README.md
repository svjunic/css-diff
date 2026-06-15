# css-diff

CSS の変更内容を構造レベルで比較するツールです。単純な文字列差分ではなく、**同一セレクタ内で最終的に有効になるプロパティ**を算出したうえで新旧を比較します。

**Github Pages:** [https://svjunic.github.io/sv-css-diff/](https://svjunic.github.io/sv-css-diff/)

ヽ(´ー｀)ノ＜ Github Pagesで公開しているので、ローカルで立ち上げる必要はないよ！

## 特徴

### CSS 構造を理解した比較

単純な文字列差分ではなく、ブラウザと同じカスケードルールを適用した**最終値**で比較します。

- **後勝ちルール** — `.a { color: red; color: green; }` は `green` だけを有効値として比較
- **`!important` 優先** — `!important` の付与・削除も変更として検出
- **グループセレクタの展開** — `.a, .b { }` は `.a` と `.b` それぞれに展開して比較

### コンテキスト別の差分表示

- **`@media`** — メディアクエリごとに差分を分離して表示
- **`@font-face` / `@keyframes`** — フォントやアニメーションの差分にも対応

### 絞り込みと検索

- **ファジー検索** — セレクタ名でインクリメンタル絞り込み
- **ステータスフィルタ** — 追加 / 削除 / 変更 / 変更なし で絞り込み
- **⚠️ 順序警告フィルタ** — 出現順が変わったセレクタのみ表示

### セレクタ出現順の変更検知

CSS カスケードでは、同じ詳細度（specificity）を持つ複数のセレクタが同一エレメントにマッチするとき、**出現順が後のルールが優先**されます。DOM を使わずに、セレクタの相対的な出現順が変わったことを検知して警告します。

#### 検知パターン

| パターン | 旧 CSS | 新 CSS | 警告 |
|---|---|---|---|
| **単純な並び替え** | A→B→C→D | A→C→B→D | B と C の行に ⚠️ |
| **削除のみ（残りは順序維持）** | A→B→C→D | A→C→D | B を削除行として表示（⚠️ なし） |
| **追加のみ（既存は順序維持）** | A→B→C | A→X→B→C | X を追加行として表示（⚠️ なし） |
| **削除＋並び替え** | A→B→C→D | A→D→C | B 削除（⚠️ なし）＋ C と D は ⚠️ |

⚠️ 行のうち、**同一詳細度**かつ**競合プロパティ**（同じプロパティを異なる値で定義）がある場合は、より強い警告を表示します。

### 比較オプション

- **表記揺れを無視** — `calc(x * 2)` と `calc(x*2)` のような書き方の違いを同一視（`#FFF` = `#ffffff`、先頭ゼロ省略、クォートの有無なども対象）
- **属性セレクタの等価** — `[class*='list']` と `[class*=list]` を同一セレクタとして扱う

## CLI

### インストール

```bash
npm install -g @svjunic/css-diff
```

### 使い方

```bash
# 変更箇所を表示（変更・追加・削除すべて）
css-diff old.css new.css

# JSON 形式で出力（CI/CD・スクリプト連携向け）
css-diff old.css new.css --format json

# 追加されたプロパティのみ
css-diff old.css new.css --filter added

# 表記揺れを無視して比較
css-diff old.css new.css --ignore-cosmetic
```

| オプション | 説明 |
|-----------|------|
| `--format <text\|json>` | 出力フォーマット (default: text) |
| `--filter <changed\|added\|removed\|unchanged\|all>` | 絞り込み (default: changed) |
| `--ignore-cosmetic` | 表記揺れを無視 |
| `--semantic-selectors` | 属性セレクタのクォート有無を同一視 |
| `--no-color` | ANSI カラーを無効化 |

終了コード: `0` = 差分なし、`1` = 差分あり、`2` = エラー（CI/CD での利用に対応）

### ライブラリとして使う

```javascript
import { diffCss } from '@svjunic/css-diff'

const result = diffCss(oldCssText, newCssText, { ignoreCosmetic: true })
```

---

## ローカル開発セットアップ

```bash
npm install
```

## 開発サーバー起動

```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開きます。

`data/old/module.css` と `data/new/module.css` を配置しておくと、起動時に自動ロードされます。

## ビルド

```bash
npm run build
```

## テスト

```bash
npm test
```

## 使い方

1. 画面左の「旧 CSS」エリアに比較元の CSS ファイルをドロップ（またはクリックして選択）
2. 画面右の「新 CSS」エリアに比較先の CSS ファイルをドロップ
3. 差分が自動表示される

### フィルタ

差分結果は以下のステータスで絞り込めます。

| ステータス  | 意味                                      |
| ----------- | ----------------------------------------- |
| `added`     | 新 CSS にのみ存在するプロパティ／セレクタ |
| `removed`   | 旧 CSS にのみ存在するプロパティ／セレクタ |
| `changed`   | 値が変わったプロパティ                    |
| `unchanged` | 変更なし                                  |

### オプション

| オプション     | 効果                                                                          |
| -------------- | ----------------------------------------------------------------------------- |
| 表記揺れを無視 | calc 内スペース・先頭ゼロ・16進数カラー・クォートなどを同一視して差分から除外 |
| セレクタ等価   | 属性セレクタのクォート有無を同一セレクタとして扱う                            |

## ディレクトリ構成

```
css-diff-app/
├── data/
│   ├── old/module.css   # 比較元（初期ロード用）
│   └── new/module.css   # 比較先（初期ロード用）
├── src/
│   ├── core/
│   │   ├── parse.js     # CSS → 中間モデル（PostCSS 使用）
│   │   ├── resolve.js   # 後勝ちルール適用 → 最終プロパティ集合
│   │   ├── diff.js      # 新旧の最終プロパティ集合を比較
│   │   └── normalize.js # セレクタ・値の正規化ユーティリティ
│   └── ui/
│       ├── main.js      # エントリーポイント・状態管理
│       ├── render.js    # 差分結果の HTML 生成
│       ├── dropzone.js  # ファイルドロップ UI
│       └── fuzzy.js     # fzf によるファジー検索
├── tests/
│   ├── diff.test.js     # diff ロジックのテスト
│   └── resolve.test.js  # resolve ロジックのテスト
└── index.html
```

## 比較ロジック

```
CSS テキスト
    │
    ▼
parseCss()   PostCSS でパースし、コンテキスト（base / @media 等）×
             セレクタ×プロパティの宣言リストに変換
    │
    ▼
resolve()    後勝ちルールと !important を適用し、
             各セレクタの最終有効プロパティ集合を算出
    │
    ▼
diff()       新旧の最終プロパティ集合をセレクタ・プロパティ単位で比較し、
             added / removed / changed / unchanged のステータスを付与
```

## 技術スタック

| ライブラリ                                  | 用途                   |
| ------------------------------------------- | ---------------------- |
| [Vite](https://vitejs.dev/)                 | 開発サーバー・バンドル |
| [PostCSS](https://postcss.org/)             | CSS パース             |
| [fzf](https://github.com/ajitid/fzf-for-js) | ファジー検索           |
| [Vitest](https://vitest.dev/)               | テスト                 |
