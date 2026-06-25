import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { renderDiff, renderOrderRisks } from '../ui/render.js'

// esbuild bundles with define: { __BUNDLED_CSS__: JSON.stringify(css) }
// In ESM context (npm package), falls back to readFileSync
function getCss() {
  if (typeof __BUNDLED_CSS__ !== 'undefined') return __BUNDLED_CSS__
  return readFileSync(fileURLToPath(new URL('../styles.css', import.meta.url)), 'utf8')
}

const REPORT_STYLE = `
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}
/* 詳細パネル: data-expanded="true" のときのみ表示 */
.selector-card:not([data-expanded="true"]) .selector-detail { display: none; }
.order-risks-section { margin-top: 32px; }
`

const REPORT_SCRIPT = `
<script>
document.addEventListener('DOMContentLoaded', () => {
  // セレクタカードのアコーディオン
  document.querySelectorAll('.selector-header').forEach(header => {
    header.addEventListener('click', () => {
      const card = header.closest('.selector-card')
      if (!card) return
      const expanded = card.getAttribute('data-expanded') === 'true'
      card.setAttribute('data-expanded', expanded ? 'false' : 'true')
      const icon = header.querySelector('.selector-expand-icon')
      if (icon) icon.textContent = expanded ? '▼' : '▲'
    })
  })

  // 出現順リスクのコンテキストヘッダーのアコーディオン
  document.querySelectorAll('.or-context-header').forEach(header => {
    header.addEventListener('click', () => {
      const wrap = header.nextElementSibling
      if (!wrap) return
      const collapsed = wrap.classList.toggle('or-table-wrap--collapsed')
      const icon = header.querySelector('.or-toggle-icon')
      if (icon) icon.textContent = collapsed ? '▶' : '▼'
      header.setAttribute('aria-expanded', String(!collapsed))
    })
  })
})
</script>
`

/**
 * @param {Map} diffResult - diff() の出力
 * @param {Array|null} orderRisks - computeOrderRisks() の出力、または null
 * @returns {string} セルフコンテインドHTML文字列
 */
export function generateHtmlReport(diffResult, orderRisks) {
  const css = getCss()

  // 変更があったセレクタのみ filteredItems に含める
  // expandedSelectors に全キーを渡して詳細パネルを事前レンダリングする
  const filteredItems = []
  const expandedSelectors = new Set()
  for (const [ctxKey, ctxDiff] of diffResult) {
    for (const [selector, selDiff] of ctxDiff.selectors) {
      if (selDiff.status !== 'unchanged') {
        filteredItems.push({ contextKey: ctxKey, selector, positions: new Set() })
        expandedSelectors.add(`${ctxKey}||${selector}`)
      }
    }
  }

  const hasPropertyChanges = filteredItems.length > 0
  const hasOrderRisks = orderRisks && orderRisks.some(r => r.hasWarning)

  // 静的レポートではすべての順序リストコンテキストを展開済みにする
  const expandedContexts = orderRisks ? new Set(orderRisks.map(r => r.contextKey)) : new Set()

  let bodyContent = ''
  if (hasPropertyChanges) {
    bodyContent += `<div class="diff-section">${renderDiff(diffResult, filteredItems, { expandedSelectors })}</div>`
  }
  if (hasOrderRisks) {
    bodyContent += renderOrderRisks(orderRisks, { expandedContexts })
  }
  if (!hasPropertyChanges && !hasOrderRisks) {
    bodyContent = '<div class="empty-state">差分はありません。</div>'
  }

  return `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Diff Report</title>
  <style>${css}</style>
  <style>${REPORT_STYLE}</style>
</head>
<body>
  <div id="app">${bodyContent}</div>
  ${REPORT_SCRIPT}
</body>
</html>`
}
