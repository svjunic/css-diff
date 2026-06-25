# CLI

## インストール

```bash
npm install -g @svjunic/css-diff
```

## 使い方

```bash
# 変更箇所を表示（変更・追加・削除すべて）
css-diff old.css new.css

# JSON 形式で出力（CI/CD・スクリプト連携向け）
css-diff old.css new.css --format json

# HTML レポートを生成（セレクタ順序変更も含む）
css-diff old.css new.css --format html --order-risk > report.html

# 追加されたプロパティのみ
css-diff old.css new.css --filter added

# 表記揺れを無視して比較
css-diff old.css new.css --ignore-cosmetic
```

## オプション

| オプション                                           | 説明                               |
| ---------------------------------------------------- | ---------------------------------- |
| `--format <text\|json\|html>`                        | 出力フォーマット (default: text)   |
| `--filter <changed\|added\|removed\|unchanged\|all>` | 絞り込み (default: changed)        |
| `--order-risk`                                       | セレクタ出現順の変更リスクを検出   |
| `--ignore-cosmetic`                                  | 表記揺れを無視                     |
| `--semantic-selectors`                               | 属性セレクタのクォート有無を同一視 |
| `--no-color`                                         | ANSI カラーを無効化                |

終了コード: `0` = 差分なし、`1` = 差分あり、`2` = エラー（CI/CD での利用に対応）

## ライブラリとして使う

```javascript
import { diffCss } from "@svjunic/css-diff";

const result = diffCss(oldCssText, newCssText, { ignoreCosmetic: true });
```
