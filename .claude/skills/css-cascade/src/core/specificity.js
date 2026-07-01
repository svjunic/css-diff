/**
 * specificity.js
 * CSS セレクタの詳細度 (specificity) を計算するユーティリティ。
 *
 * 返り値: [a, b, c]
 *   a = ID セレクタ (#id) の数
 *   b = クラス (.class)、属性 ([attr])、擬似クラス (:hover) の数
 *   c = 要素名 (div)、擬似要素 (::before) の数
 */

function isHigherSpec([a1, b1, c1], [a2, b2, c2]) {
  return a1 > a2 || (a1 === a2 && b1 > b2) || (a1 === a2 && b1 === b2 && c1 > c2)
}

function splitTopLevelCommas(str) {
  const parts = []
  let depth = 0, start = 0
  for (let i = 0; i < str.length; i++) {
    if (str[i] === '(') depth++
    else if (str[i] === ')') depth--
    else if (str[i] === ',' && depth === 0) {
      parts.push(str.slice(start, i).trim())
      start = i + 1
    }
  }
  const last = str.slice(start).trim()
  if (last) parts.push(last)
  return parts
}

function findMatchingParen(s, start) {
  let depth = 1, i = start
  while (i < s.length && depth > 0) {
    if (s[i] === '(') depth++
    else if (s[i] === ')') depth--
    i++
  }
  return depth === 0 ? i : null
}

// 正規表現で擬似クラスブロックをスキャンし、onMatch を呼んだ後にブロックを除去した文字列を返す。
// 括弧未閉の場合はその位置以降を除去して終了する（PSEUDO_RE / NTH_RE ループの共通パターン）。
function stripPseudoBlocks(s, regex, onMatch) {
  let kept = '', pos = 0, m
  while ((m = regex.exec(s)) !== null) {
    const innerStart = m.index + m[0].length
    const end = findMatchingParen(s, innerStart)
    kept += s.slice(pos, m.index)
    if (end === null) { pos = s.length; break }
    onMatch(s, innerStart, end, m)
    pos = end
    regex.lastIndex = pos
  }
  return kept + s.slice(pos)
}

/**
 * セレクタの詳細度を [a, b, c] タプルで返す。
 * ネストした :not() 等の内側の詳細度は簡略化して扱う。
 * @param {string} selector
 * @param {number} [_depth=0]
 * @returns {[number, number, number]}
 */
export function computeSpecificity(selector, _depth = 0) {
  if (_depth > 100) return [0, 0, 0]
  let s = selector
  let a = 0, b = 0, c = 0

  // 擬似要素 ::xxx を除去してカウント
  s = s.replace(/::[\w-]+(\([^)]*\))?/g, () => { c++; return '' })

  // :nth-child(An+B of S)・:nth-last-child(An+B of S) の "of S" 部分の詳細度を反映。
  // PSEUDO_RE より先に処理することで、of S 内の :is()/:has() を PSEUDO_RE が
  // SUM 加算する問題を防ぎ、正しく MAX 詳細度を適用できる
  s = stripPseudoBlocks(s, /:nth-(?:child|last-child)\s*\(/gi, (str, innerStart, end) => {
    const arg = str.slice(innerStart, end - 1)
    const ofMatch = arg.match(/\bof\b/i)
    if (ofMatch) {
      const selectorList = arg.slice(ofMatch.index + ofMatch[0].length).trim()
      const specs = splitTopLevelCommas(selectorList).map(sel => computeSpecificity(sel, _depth + 1))
      const maxSpec = specs.reduce((max, spec) => isHigherSpec(spec, max) ? spec : max, [0, 0, 0])
      a += maxSpec[0]; b += maxSpec[1]; c += maxSpec[2]
    }
    b++ // :nth-child() 自体は擬似クラス
  })

  // :not()・:is()・:has()・:matches() は引数の最大詳細度を引き継ぐ（CSS Selectors Level 4）
  // :where() は常に詳細度 0。括弧の深さを手動追跡して任意の深さのネストに対応する
  s = stripPseudoBlocks(s, /:(?<name>not|is|has|matches|where)\s*\(/gi, (str, innerStart, end, m) => {
    if (m.groups.name.toLowerCase() !== 'where') {
      const inner = str.slice(innerStart, end - 1).trim()
      const args = splitTopLevelCommas(inner)
      let maxSpec = [0, 0, 0]
      for (const arg of args) {
        const spec = computeSpecificity(arg, _depth + 1)
        if (isHigherSpec(spec, maxSpec)) maxSpec = spec
      }
      a += maxSpec[0]; b += maxSpec[1]; c += maxSpec[2]
    }
  })

  // 属性セレクタ [...] を除去してカウント。
  // NTH_RE / PSEUDO_RE の後に行うことで、疑似クラス内部の属性セレクタの二重カウントを防ぐ
  s = s.replace(/\[[^\]]*\]/g, () => { b++; return '' })

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
