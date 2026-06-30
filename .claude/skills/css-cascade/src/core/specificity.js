/**
 * specificity.js
 * CSS セレクタの詳細度 (specificity) を計算するユーティリティ。
 *
 * 返り値: [a, b, c]
 *   a = ID セレクタ (#id) の数
 *   b = クラス (.class)、属性 ([attr])、擬似クラス (:hover) の数
 *   c = 要素名 (div)、擬似要素 (::before) の数
 */

/**
 * セレクタの詳細度を [a, b, c] タプルで返す。
 * ネストした :not() 等の内側の詳細度は簡略化して扱う。
 * @param {string} selector
 * @returns {[number, number, number]}
 */
export function computeSpecificity(selector) {
  let s = selector
  let a = 0, b = 0, c = 0

  // 擬似要素 ::xxx を除去してカウント
  s = s.replace(/::[\w-]+(\([^)]*\))?/g, () => { c++; return '' })

  // 属性セレクタ [...] を除去してカウント
  s = s.replace(/\[[^\]]*\]/g, () => { b++; return '' })

  // :not() は引数の詳細度を引き継ぐ（CSS Selectors Level 3/4）。:not() 自体は b++ しない
  s = s.replace(/:not\(\s*([^)]*?)\s*\)/gi, (_, inner) => {
    inner.replace(/#[\w-]+/g, () => { a++; return '' })
    inner.replace(/\.[\w-]+|\[[^\]]*\]/g, () => { b++; return '' })
    return ''
  })

  // 擬似クラス :xxx を除去してカウント（関数形式も含む）
  s = s.replace(/:[^:\s>+~([\].#]+(\([^)]*\))?/g, () => { b++; return '' })

  // ID セレクタ #xxx を除去してカウント
  s = s.replace(/#[\w-]+/g, () => { a++; return '' })

  // クラスセレクタ .xxx を除去してカウント
  s = s.replace(/\.[\w-]+/g, () => { b++; return '' })

  // コンビネータを除去
  s = s.replace(/[>+~]/g, ' ')

  // 残った要素名（* を除く）をカウント
  const elements = s.split(/\s+/).filter(t => t && t !== '*' && /^[a-zA-Z][\w-]*/.test(t))
  c += elements.length

  return [a, b, c]
}

/**
 * 2 つのセレクタが同じ詳細度かどうかを返す。
 * @param {string} sA
 * @param {string} sB
 * @returns {boolean}
 */
export function sameSpecificity(sA, sB) {
  const [a1, b1, c1] = computeSpecificity(sA)
  const [a2, b2, c2] = computeSpecificity(sB)
  return a1 === a2 && b1 === b2 && c1 === c2
}
