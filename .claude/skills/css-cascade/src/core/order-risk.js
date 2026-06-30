import { parseCss, parseSelectorOrder } from './parse.js'
import { resolve } from './resolve.js'
import { sameSpecificity } from './specificity.js'

/**
 * old/new のセレクタリストを比較し表示用の行を返す。
 *
 * アプローチ: 位置ベースのアラインメント
 *   両方に存在するセレクタを各リストから抽出し、
 *   同じインデックス同士をペアリングする。
 *   - oldCommon[i] === newCommon[i] → equal
 *   - oldCommon[i] !== newCommon[i] → moved（相対順序が変わった）
 */
function buildOrderRows(oldList, newList) {
  const oldSet = new Set(oldList)
  const newSet = new Set(newList)

  const oldCommon = oldList.filter(s => newSet.has(s))
  const newCommon = newList.filter(s => oldSet.has(s))

  // 位置ベースのペアリング: oldCommon[i] → newCommon[i]
  const pairing = new Map()
  for (let i = 0; i < oldCommon.length; i++) {
    pairing.set(oldCommon[i], newCommon[i])
  }

  const rows = []
  let ni = 0

  for (const oldSel of oldList) {
    if (!newSet.has(oldSel)) {
      rows.push({ type: 'deleted', oldSelector: oldSel, newSelector: null })
      continue
    }

    const pairedNew = pairing.get(oldSel)

    // pairedNew より前に来る new 専用セレクタを added 行として挿入
    // pairedNew ∈ oldSet のため !oldSet.has() が false になった時点で必ず pairedNew を指す
    while (ni < newList.length && !oldSet.has(newList[ni])) {
      rows.push({ type: 'added', oldSelector: null, newSelector: newList[ni] })
      ni++
    }

    rows.push(
      oldSel === pairedNew
        ? { type: 'equal', oldSelector: oldSel, newSelector: pairedNew }
        : { type: 'moved', oldSelector: oldSel, newSelector: pairedNew },
    )
    ni++ // pairedNew を消費
  }

  // 末尾の追加専用セレクタ
  while (ni < newList.length) {
    if (!oldSet.has(newList[ni])) {
      rows.push({ type: 'added', oldSelector: null, newSelector: newList[ni] })
    }
    ni++
  }

  return rows
}

function annotateMovedRow(row, oldList, newList, oldCtxProps, newCtxProps) {
  row.sameSpecificity = sameSpecificity(row.oldSelector, row.newSelector)
  row.conflictingProps = []

  const oldPosA = oldList.indexOf(row.oldSelector)
  const oldPosX = oldList.indexOf(row.newSelector)
  const newPosA = newList.indexOf(row.oldSelector)
  const newPosX = newList.indexOf(row.newSelector)

  if (oldPosA < 0 || oldPosX < 0 || newPosA < 0 || newPosX < 0) return

  const oldWinner = oldPosA > oldPosX ? row.oldSelector : row.newSelector
  const newWinner = newPosA > newPosX ? row.oldSelector : row.newSelector

  if (oldWinner === newWinner) return

  const propsA = newCtxProps.get(row.oldSelector) || new Map()
  const propsX = newCtxProps.get(row.newSelector) || new Map()

  for (const [prop, entryA] of propsA) {
    const entryX = propsX.get(prop)
    if (!entryX) continue
    if (entryA.value === entryX.value && entryA.important === entryX.important) continue

    const oldWinnerEntry = (oldCtxProps.get(oldWinner) || new Map()).get(prop)
    const newWinnerEntry = (newCtxProps.get(newWinner) || new Map()).get(prop)
    if (!oldWinnerEntry || !newWinnerEntry) continue

    row.conflictingProps.push({
      prop,
      oldEffective: { value: oldWinnerEntry.value, important: oldWinnerEntry.important },
      newEffective: { value: newWinnerEntry.value, important: newWinnerEntry.important },
    })
  }
}

export function computeOrderRisks(oldCss, newCss, options = {}) {
  const parseOpts = { semanticSelectors: options.semanticSelectors }

  const oldOrder = parseSelectorOrder(oldCss, parseOpts)
  const newOrder = parseSelectorOrder(newCss, parseOpts)
  const resolvedOld = resolve(parseCss(oldCss, parseOpts))
  const resolvedNew = resolve(parseCss(newCss, parseOpts))

  const allContexts = new Set([...oldOrder.keys(), ...newOrder.keys()])
  const sortedContexts = ['base', ...[...allContexts].filter(k => k !== 'base').sort()]
  const results = []

  for (const contextKey of sortedContexts) {
    if (!allContexts.has(contextKey)) continue

    const oldList = oldOrder.get(contextKey) || []
    const newList = newOrder.get(contextKey) || []

    const rows = buildOrderRows(oldList, newList)

    const oldCtxProps = resolvedOld.get(contextKey) || new Map()
    const newCtxProps = resolvedNew.get(contextKey) || new Map()

    for (const row of rows) {
      if (row.type === 'moved') {
        annotateMovedRow(row, oldList, newList, oldCtxProps, newCtxProps)
      }
    }

    const hasWarning = rows.some(r => r.type === 'moved')

    if (rows.some(r => r.type !== 'equal')) {
      results.push({ contextKey, rows, hasWarning })
    }
  }

  return results
}
