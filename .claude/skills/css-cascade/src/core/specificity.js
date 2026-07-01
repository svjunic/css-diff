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

  // :not()・:is()・:has()・:matches() は引数の最大詳細度を引き継ぐ（CSS Selectors Level 4）
  // :where() は常に詳細度 0。括弧の深さを手動追跡して任意の深さのネストに対応する
  {
    const PSEUDO_RE = /:(?<name>not|is|has|matches|where)\s*\(/gi
    let kept = ''
    let pos = 0
    let m
    while ((m = PSEUDO_RE.exec(s)) !== null) {
      const innerStart = m.index + m[0].length
      const end = findMatchingParen(s, innerStart)
      if (end === null) {
        // 括弧未閉: マッチ前テキストを kept に保存し内側セレクタを破棄して break
        kept += s.slice(pos, m.index)
        pos = s.length
        break
      }
      kept += s.slice(pos, m.index)
      pos = end
      PSEUDO_RE.lastIndex = pos
      if (m.groups.name.toLowerCase() !== 'where') {
        const inner = s.slice(innerStart, end - 1).trim()
        const args = splitTopLevelCommas(inner)
        let maxSpec = [0, 0, 0]
        for (const arg of args) {
          const spec = computeSpecificity(arg)
          if (isHigherSpec(spec, maxSpec)) maxSpec = spec
        }
        a += maxSpec[0]; b += maxSpec[1]; c += maxSpec[2]
      }
    }
    s = kept + s.slice(pos)
  }

  // :nth-child(An+B of S)・:nth-last-child(An+B of S) の "of S" 部分の詳細度を反映
  // 括弧の深さを手動追跡し、of S 内の関数形擬似クラス (:lang(fr) 等) も正しく処理する
  {
    const NTH_RE = /:nth-(?:child|last-child)\s*\(/gi
    let kept2 = ''
    let pos2 = 0
    let m2
    while ((m2 = NTH_RE.exec(s)) !== null) {
      const innerStart = m2.index + m2[0].length
      const end = findMatchingParen(s, innerStart)
      kept2 += s.slice(pos2, m2.index)
      if (end !== null) {
        const arg = s.slice(innerStart, end - 1)
        const ofIdx = arg.search(/\bof\b/i)
        if (ofIdx !== -1) {
          const selectorList = arg.slice(ofIdx + 2).trim()
          const specs = splitTopLevelCommas(selectorList).map(sel => computeSpecificity(sel))
          const maxSpec = specs.reduce((max, spec) => isHigherSpec(spec, max) ? spec : max, [0, 0, 0])
          a += maxSpec[0]; b += maxSpec[1]; c += maxSpec[2]
        }
        pos2 = end
        b++
      } else {
        pos2 = s.length
      }
      NTH_RE.lastIndex = pos2
    }
    s = kept2 + s.slice(pos2)
  }

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
