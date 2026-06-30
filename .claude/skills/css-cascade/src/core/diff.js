/**
 * diff.js
 * 新旧の resolve 結果を比較して構造化差分を生成する。
 *
 * 出力構造:
 * Map<contextKey, {
 *   status: 'added'|'removed'|'changed'|'unchanged',
 *   changeCount: number,
 *   selectors: Map<selector, {
 *     status: 'added'|'removed'|'changed'|'unchanged',
 *     changeCount: number,
 *     props: Map<prop, {
 *       status: 'added'|'removed'|'changed'|'unchanged',
 *       oldValue?: string, oldImportant?: boolean,
 *       newValue?: string, newImportant?: boolean,
 *       value?: string, important?: boolean   // unchanged 時のみ
 *     }>
 *   }>
 * }>
 *
 * - コンテキスト・セレクタ・プロパティはキーでソートして決定性を保証する
 */

import { canonicalizeValue } from './normalize.js'

/**
 * @param {Map} resolvedOld
 * @param {Map} resolvedNew
 * @param {{ ignoreCosmetic?: boolean }} [options]
 * @returns {Map}
 */
export function diff(resolvedOld, resolvedNew, options = {}) {
  const result = new Map()

  const allContexts = new Set([...resolvedOld.keys(), ...resolvedNew.keys()])

  // base を先頭にしてから残りをソート
  const sortedContexts = ['base', ...[...allContexts].filter(k => k !== 'base').sort()]

  for (const ctxKey of sortedContexts) {
    if (!allContexts.has(ctxKey)) continue

    const oldCtx = resolvedOld.get(ctxKey) || new Map()
    const newCtx = resolvedNew.get(ctxKey) || new Map()

    const allSelectors = new Set([...oldCtx.keys(), ...newCtx.keys()])
    const selectorMap = new Map()
    let ctxChangeCount = 0

    for (const sel of [...allSelectors].sort()) {
      const oldProps = oldCtx.get(sel) || new Map()
      const newProps = newCtx.get(sel) || new Map()

      const allProps = new Set([...oldProps.keys(), ...newProps.keys()])
      const propMap = new Map()
      let selChangeCount = 0

      for (const prop of [...allProps].sort()) {
        const oldEntry = oldProps.get(prop)
        const newEntry = newProps.get(prop)

        let propDiff

        if (!oldEntry && newEntry) {
          propDiff = {
            status: 'added',
            newValue: newEntry.value,
            newImportant: newEntry.important,
          }
          selChangeCount++
        } else if (oldEntry && !newEntry) {
          propDiff = {
            status: 'removed',
            oldValue: oldEntry.value,
            oldImportant: oldEntry.important,
          }
          selChangeCount++
        } else {
          const valuesDiffer = options.ignoreCosmetic
            ? canonicalizeValue(oldEntry.value) !== canonicalizeValue(newEntry.value)
            : oldEntry.value !== newEntry.value
          if (valuesDiffer || oldEntry.important !== newEntry.important) {
            propDiff = {
              status: 'changed',
              oldValue: oldEntry.value,
              oldImportant: oldEntry.important,
              newValue: newEntry.value,
              newImportant: newEntry.important,
            }
            selChangeCount++
          } else {
            propDiff = {
              status: 'unchanged',
              // ignoreCosmetic 時は新側の値を canonical 代表として保持
              value: newEntry.value,
              important: newEntry.important,
            }
          }
        }

        propMap.set(prop, propDiff)
      }

      let selStatus
      if (!oldCtx.has(sel)) {
        selStatus = 'added'
      } else if (!newCtx.has(sel)) {
        selStatus = 'removed'
      } else if (selChangeCount > 0) {
        selStatus = 'changed'
      } else {
        selStatus = 'unchanged'
      }

      selectorMap.set(sel, {
        status: selStatus,
        changeCount: selChangeCount,
        props: propMap,
      })
      ctxChangeCount += selChangeCount
    }

    let ctxStatus
    if (!resolvedOld.has(ctxKey)) {
      ctxStatus = 'added'
    } else if (!resolvedNew.has(ctxKey)) {
      ctxStatus = 'removed'
    } else if (ctxChangeCount > 0) {
      ctxStatus = 'changed'
    } else {
      ctxStatus = 'unchanged'
    }

    result.set(ctxKey, {
      status: ctxStatus,
      changeCount: ctxChangeCount,
      selectors: selectorMap,
    })
  }

  return result
}
