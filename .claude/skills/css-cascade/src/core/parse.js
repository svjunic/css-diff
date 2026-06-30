/**
 * parse.js
 * PostCSS を使って CSS テキストを中間モデルに変換する。
 *
 * 出力: Map<contextKey, Array<{selector, prop, value, important}>>
 *   - contextKey: "base" | "@media <condition>" | "@font-face" | "@keyframes <name>"
 *   - グループセレクタ (.a, .b) は個別セレクタに分解して配布
 *   - ソース順を保持（後勝ちルール適用のため）
 */

import postcss from 'postcss'
import { normalizeSelector, normalizeMediaCondition, normalizeValue, canonicalizeSelector } from './normalize.js'

/**
 * @font-face ブロックのプロパティ群から擬似セレクタキーを生成する。
 * (font-family, font-weight, font-style) の複合キーで区別する。
 */
function getFontFaceKey(declarations) {
  const parts = {}
  for (const decl of declarations) {
    const p = decl.prop.toLowerCase()
    if (p === 'font-family' || p === 'font-weight' || p === 'font-style') {
      parts[p] = normalizeValue(decl.value).replace(/['"]/g, '')
    }
  }
  const family = parts['font-family'] || 'unknown'
  const weight = parts['font-weight'] || 'normal'
  const style = parts['font-style'] || 'normal'
  return `${family}/${weight}/${style}`
}

/**
 * @keyframes / @-webkit-keyframes のベンダープレフィックスを除去して
 * 統一した contextKey を返す。
 */
function normalizeKeyframesName(atRuleName, params) {
  return `@keyframes ${params.trim()}`
}

/**
 * CSS テキストをパースして、各コンテキスト内のセレクタを最終出現順で返す。
 * セレクタが複数回登場する場合は最後の出現位置を採用する（カスケード的に最後が有効なため）。
 *
 * @param {string} cssText
 * @param {{ semanticSelectors?: boolean }} [options]
 * @returns {Map<string, string[]>}  Map<contextKey, 出現順のセレクタ配列>
 */
export function parseSelectorOrder(cssText, options = {}) {
  const posMap = new Map() // contextKey → Map<selector, lastPosition>
  let counter = 0

  function ensureCtx(key) {
    if (!posMap.has(key)) posMap.set(key, new Map())
    return posMap.get(key)
  }

  function addSel(contextKey, selector) {
    ensureCtx(contextKey).set(selector, counter++)
  }

  const normSel = options.semanticSelectors ? canonicalizeSelector : normalizeSelector

  function processRule(rule, contextKey) {
    for (const sel of rule.selectors.map(s => normSel(s))) {
      addSel(contextKey, sel)
    }
  }

  function processAtRule(atRule, parentContextKey) {
    const name = atRule.name.toLowerCase()
    if (name === 'media') {
      const condition = normalizeMediaCondition(atRule.params)
      const contextKey = `@media ${condition}`
      ensureCtx(contextKey)
      atRule.each(node => {
        if (node.type === 'rule') processRule(node, contextKey)
        else if (node.type === 'atrule') processAtRule(node, contextKey)
      })
    } else if (name === 'font-face' || name === 'keyframes' || name === '-webkit-keyframes' || name === 'charset' || name === 'import' || name === 'namespace') {
      // cascade ordering に関係しないコンテキストはスキップ
    } else {
      if (atRule.nodes) {
        atRule.each(node => {
          if (node.type === 'rule') processRule(node, parentContextKey)
          else if (node.type === 'atrule') processAtRule(node, parentContextKey)
        })
      }
    }
  }

  let root
  try {
    root = postcss.parse(cssText, { from: undefined })
  } catch {
    return new Map()
  }

  ensureCtx('base')
  root.each(node => {
    if (node.type === 'rule') processRule(node, 'base')
    else if (node.type === 'atrule') processAtRule(node, 'base')
  })

  const result = new Map()
  for (const [contextKey, selectorPos] of posMap) {
    result.set(
      contextKey,
      [...selectorPos.entries()].sort((a, b) => a[1] - b[1]).map(e => e[0]),
    )
  }
  return result
}

/**
 * CSS テキストをパースして中間モデルを返す。
 *
 * @param {string} cssText - CSS 文字列
 * @param {{ semanticSelectors?: boolean }} [options]
 * @returns {Map<string, Array<{selector: string, prop: string, value: string, important: boolean}>>}
 */
export function parseCss(cssText, options = {}) {
  /** @type {Map<string, Array<{selector: string, prop: string, value: string, important: boolean}>>} */
  const result = new Map()

  function ensureContext(key) {
    if (!result.has(key)) result.set(key, [])
    return result.get(key)
  }

  function addDecl(contextKey, selector, decl) {
    ensureContext(contextKey).push({
      selector,
      prop: decl.prop.toLowerCase(),
      value: normalizeValue(decl.value),
      important: decl.important || false,
    })
  }

  const normSel = options.semanticSelectors ? canonicalizeSelector : normalizeSelector

  /** 通常の Rule ノードを処理する */
  function processRule(rule, contextKey) {
    // グループセレクタを個別セレクタに分解
    const selectors = rule.selectors.map(s => normSel(s))
    for (const sel of selectors) {
      rule.each(node => {
        if (node.type === 'decl') {
          addDecl(contextKey, sel, node)
        }
      })
    }
  }

  /** AtRule ノードを再帰的に処理する */
  function processAtRule(atRule, parentContextKey) {
    const name = atRule.name.toLowerCase()

    if (name === 'media') {
      // @media: 条件ごとに独立コンテキスト
      const condition = normalizeMediaCondition(atRule.params)
      const contextKey = `@media ${condition}`
      ensureContext(contextKey)
      atRule.each(node => {
        if (node.type === 'rule') {
          processRule(node, contextKey)
        } else if (node.type === 'atrule') {
          // ネストした @media や @supports 等
          processAtRule(node, contextKey)
        }
      })
    } else if (name === 'font-face') {
      // @font-face: (family/weight/style) を擬似セレクタとして使う
      const contextKey = '@font-face'
      ensureContext(contextKey)

      // font-face key を決めるために宣言を2回読む（1回目はキー収集用）
      const decls = []
      atRule.each(node => {
        if (node.type === 'decl') decls.push(node)
      })
      const sel = getFontFaceKey(decls)

      for (const decl of decls) {
        addDecl(contextKey, sel, decl)
      }
    } else if (name === 'keyframes' || name === '-webkit-keyframes') {
      // @keyframes: アニメーション名ごとにコンテキスト、ストップを擬似セレクタに
      const contextKey = normalizeKeyframesName(name, atRule.params)
      ensureContext(contextKey)
      atRule.each(node => {
        if (node.type === 'rule') {
          // キーフレームのストップ (0%, 100%, from, to など) を selector として扱う
          const stops = node.selectors.map(s => s.trim()).join(', ')
          node.each(decl => {
            if (decl.type === 'decl') {
              addDecl(contextKey, stops, decl)
            }
          })
        }
      })
    } else if (name === 'charset' || name === 'import' || name === 'namespace') {
      // skip
    } else {
      // 未知の @ルール: 子ルールがあれば親コンテキストに処理
      if (atRule.nodes) {
        atRule.each(node => {
          if (node.type === 'rule') {
            processRule(node, parentContextKey)
          } else if (node.type === 'atrule') {
            processAtRule(node, parentContextKey)
          }
        })
      }
    }
  }

  let root
  try {
    root = postcss.parse(cssText, { from: undefined })
  } catch (e) {
    // パースエラーでも部分的に結果を返す
    return result
  }

  // base コンテキストを最初に確保してキー順を安定させる
  ensureContext('base')

  root.each(node => {
    if (node.type === 'rule') {
      processRule(node, 'base')
    } else if (node.type === 'atrule') {
      processAtRule(node, 'base')
    }
  })

  return result
}
