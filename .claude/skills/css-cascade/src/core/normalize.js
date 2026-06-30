/**
 * normalize.js
 * CSS テキストの正規化ユーティリティ。
 * 意味を変えない範囲の空白・表記揺れを吸収し、
 * 整形済み vs ミニファイ の差が比較結果に影響しないようにする。
 */

/**
 * セレクタ文字列を正規化する。
 * - 前後の空白をトリム
 * - 連続空白を1スペースに圧縮
 * - コンビネータ（> + ~）周辺の空白を正規化
 */
export function normalizeSelector(sel) {
  return sel
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/\s*([>+~])\s*/g, ' $1 ')
    .trim()
}

/**
 * @media の条件文字列を正規化する。
 * - 前後の空白をトリム
 * - 連続空白を1スペースに圧縮
 * - 括弧と論理演算子（and / or / not / only）の周辺空白を正規化
 *   例: "(min-width:521px)and(max-width:960px)"
 *       → "(min-width: 521px) and (max-width: 960px)"
 */
export function normalizeMediaCondition(condition) {
  return condition
    .trim()
    // コロン後のスペースを正規化: "max-width:960px" → "max-width: 960px"
    .replace(/:\s*/g, ': ')
    // 連続空白を1つに圧縮
    .replace(/\s+/g, ' ')
    // 括弧と論理演算子の間のスペースを統一（前後に1つ）
    .replace(/\)\s*(and|or|not|only)\s*\(/gi, ') $1 (')
    // 末尾クリーンアップ
    .trim()
    .replace(/\s+/g, ' ')
}

/**
 * プロパティ値を正規化する。
 * - 前後の空白をトリムのみ
 * - 色の短縮や単位の変換等は行わない（過剰正規化で実際の差分を消さないため）
 */
export function normalizeValue(value) {
  return value.trim()
}

/**
 * 16進カラー文字列を正規化する（内部ヘルパ）。
 * - 小文字化
 * - 3桁 → 6桁 (#abc → #aabbcc)
 * - 4桁 → 8桁 (#abcd → #aabbccdd)
 */
function normalizeHex(hex) {
  const h = hex.toLowerCase()
  if (h.length === 4) {
    // #rgb → #rrggbb
    return '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3]
  }
  if (h.length === 5) {
    // #rgba → #rrggbbaa
    return '#' + h[1] + h[1] + h[2] + h[2] + h[3] + h[3] + h[4] + h[4]
  }
  return h
}

/**
 * 比較判定専用の値正規化（表記揺れを吸収する）。
 * 表示には使わず、diff の変更判定のみに使用する。
 *
 * 正規化の内容:
 * 1. 前後の空白をトリム、連続空白を1スペースに
 * 2. クォートを除去 ('a' → a, "a" → a)
 * 3. * / 周辺の空白を除去 (a * b → a*b)  ※ + - は calc の意味が変わるため触れない
 * 4. 先頭ゼロを補完 (.2em → 0.2em)
 * 5. 16進カラーを正規化 (#FFF → #ffffff)
 */
export function canonicalizeValue(value) {
  let v = value.trim().replace(/\s+/g, ' ')
  // クォート除去
  v = v.replace(/['"]/g, '')
  // カンマ周辺の空白を除去 (a, b → a,b)  ※多値プロパティ・font-family・transition等の表記揺れ吸収
  v = v.replace(/\s*,\s*/g, ',')
  // * / 周辺の空白を除去
  v = v.replace(/\s*([*/])\s*/g, '$1')
  // 先頭ゼロ補完: 数値の前に空白・カンマ・括弧がある場合、または行頭
  v = v.replace(/(^|[\s,(])\.(\d)/g, '$10.$2')
  // 16進カラー正規化
  v = v.replace(/#[0-9a-fA-F]{3,8}\b/g, m => normalizeHex(m))
  return v
}

/**
 * セレクタ文字列を意味レベルで正規化する（表記揺れを吸収する）。
 * 比較判定・キー集約専用。表示には使わない。
 *
 * normalizeSelector の正規化に加えて:
 * - 属性セレクタ内のクォートを除去 ([class*='list'] → [class*=list])
 * - 属性セレクタ内の = 系演算子前後の空白を除去
 */
export function canonicalizeSelector(sel) {
  let s = normalizeSelector(sel)
  // 属性セレクタ内を正規化
  s = s.replace(/\[([^\]]*)\]/g, (_, inner) => {
    let t = inner.replace(/\s*([~|^$*]?=)\s*/g, '$1') // = 系演算子の前後空白除去
    t = t.replace(/(['"])(.*?)\1/g, '$2')             // クォート除去
    return '[' + t.trim() + ']'
  })
  return s
}
