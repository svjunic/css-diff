/**
 * resolve.js
 * 中間モデルに「後勝ち + !important」ルールを適用し、
 * セレクタごとの最終有効プロパティ集合を算出する。
 *
 * 入力: Map<contextKey, Array<{selector, prop, value, important}>>
 * 出力: Map<contextKey, Map<selector, Map<prop, {value: string, important: boolean}>>>
 */

/**
 * @param {Map<string, Array<{selector: string, prop: string, value: string, important: boolean}>>} parsed
 * @returns {Map<string, Map<string, Map<string, {value: string, important: boolean}>>>}
 */
export function resolve(parsed) {
  /** @type {Map<string, Map<string, Map<string, {value: string, important: boolean}>>>} */
  const result = new Map()

  for (const [contextKey, entries] of parsed) {
    if (!result.has(contextKey)) result.set(contextKey, new Map())
    const ctxMap = result.get(contextKey)

    for (const { selector, prop, value, important } of entries) {
      if (!ctxMap.has(selector)) ctxMap.set(selector, new Map())
      const propMap = ctxMap.get(selector)

      const existing = propMap.get(prop)
      if (!existing) {
        // 初回登場
        propMap.set(prop, { value, important })
      } else if (existing.important && !important) {
        // 既存が !important で incoming が通常 → 上書き不可
      } else {
        // それ以外はすべて後勝ち（!important 同士も後勝ち）
        propMap.set(prop, { value, important })
      }
    }
  }

  return result
}
