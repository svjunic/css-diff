#!/usr/bin/env node
// Copyright (c) 2026 sv.junic. MIT License. v0.2.0
// Source: https://github.com/svjunic/css-cascade

import { readFileSync } from 'node:fs'
import { parseArgs } from 'node:util'
import { parseCss } from '../src/core/parse.js'
import { resolve } from '../src/core/resolve.js'
import { diff } from '../src/core/diff.js'
import { computeOrderRisks } from '../src/core/order-risk.js'
import { generateHtmlReport } from '../src/reporters/html.js'

const HELP = `Usage: css-cascade <old.css> <new.css> [options]

Arguments:
  old.css    比較元 CSS ファイルのパス
  new.css    比較先 CSS ファイルのパス

Options:
  --format <text|json|html>               出力フォーマット (default: text)
  --filter <changed|added|removed|unchanged|all>
                                          ステータスで絞り込み (default: changed)
  --order-risk                            セレクタ出現順リスクを表示
  --ignore-cosmetic                       表記揺れを無視
  --semantic-selectors                    属性セレクタのクォート有無を同一視
  --no-color                              ANSI カラーを無効化
  -v, --version                           バージョンを表示
  -h, --help                              ヘルプを表示

Exit codes:
  0  差分なし・順序変更なし
  1  差分あり、または --order-risk 指定時に順序変更あり（プロパティ差分ゼロでも exit 1）
  2  エラー`

let parsed
try {
  parsed = parseArgs({
    options: {
      format:               { type: 'string',  default: 'text' },
      filter:               { type: 'string',  default: 'changed' },
      'order-risk':         { type: 'boolean', default: false },
      'ignore-cosmetic':    { type: 'boolean', default: false },
      'semantic-selectors': { type: 'boolean', default: false },
      'no-color':           { type: 'boolean', default: false },
      version:              { type: 'boolean', short: 'v', default: false },
      help:                 { type: 'boolean', short: 'h', default: false },
    },
    allowPositionals: true,
    args: process.argv.slice(2),
  })
} catch (err) {
  console.error(`Error: ${err.message}`)
  process.exit(2)
}

const { values, positionals } = parsed

if (values.version) {
  // __PKG_VERSION__ はビルド時に注入される。ソース直実行時は package.json から読む
  // eslint-disable-next-line no-undef
  const version = typeof __PKG_VERSION__ !== 'undefined' ? __PKG_VERSION__ : JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).version
  console.log(version)
  process.exit(0)
}

if (values.help) {
  console.log(HELP)
  process.exit(0)
}

if (positionals.length < 2) {
  console.error('Error: 2つのファイルパスが必要です\n')
  console.error(HELP)
  process.exit(2)
}

const VALID_FORMATS = new Set(['text', 'json', 'html'])
if (!VALID_FORMATS.has(values.format)) {
  console.error('Error: --format は text | json | html のいずれかです')
  process.exit(2)
}

const VALID_FILTERS = new Set(['changed', 'added', 'removed', 'unchanged', 'all'])
if (!VALID_FILTERS.has(values.filter)) {
  console.error('Error: --filter は changed | added | removed | unchanged | all のいずれかです')
  process.exit(2)
}

function readFile(path) {
  try {
    return readFileSync(path, 'utf8')
  } catch (err) {
    console.error(`Error: ファイルを読み込めません "${path}": ${err.message}`)
    process.exit(2)
  }
}

const [oldPath, newPath] = positionals
const oldCss = readFile(oldPath)
const newCss = readFile(newPath)

let result
let orderRisks = []
try {
  const parseOptions = { semanticSelectors: values['semantic-selectors'] }
  result = diff(
    resolve(parseCss(oldCss, parseOptions)),
    resolve(parseCss(newCss, parseOptions)),
    { ignoreCosmetic: values['ignore-cosmetic'] },
  )
  if (values['order-risk']) {
    orderRisks = computeOrderRisks(oldCss, newCss, { semanticSelectors: values['semantic-selectors'] })
  }
} catch (err) {
  console.error(`Parse error: ${err.message}`)
  process.exit(2)
}

// filter: 'changed' は added+removed+changed をすべて含む（「差分あり」の意）
function shouldInclude(status, filter) {
  if (filter === 'all') return true
  if (filter === 'changed') return status !== 'unchanged'
  return status === filter
}

function summarize(result) {
  let changed = 0, added = 0, removed = 0, unchanged = 0
  for (const [, ctx] of result) {
    for (const [, sel] of ctx.selectors) {
      for (const [, p] of sel.props) {
        if (p.status === 'changed') changed++
        else if (p.status === 'added') added++
        else if (p.status === 'removed') removed++
        else unchanged++
      }
    }
  }
  return { changed, added, removed, unchanged }
}

const summary = summarize(result)
const hasDiff = summary.changed > 0 || summary.added > 0 || summary.removed > 0
const hasOrderWarning = values['order-risk'] && orderRisks.some(r => r.hasWarning)
const filter = values.filter

if (values.format === 'html') {
  const html = generateHtmlReport(result, values['order-risk'] ? orderRisks : null)
  process.stdout.write(html)
  process.exit((hasDiff || hasOrderWarning) ? 1 : 0)
}

if (values.format === 'json') {
  const contexts = []
  for (const [ctxKey, ctx] of result) {
    const selectors = []
    for (const [selector, sel] of ctx.selectors) {
      const props = []
      for (const [propName, p] of sel.props) {
        if (!shouldInclude(p.status, filter)) continue
        props.push({ prop: propName, ...p })
      }
      if (props.length > 0) {
        selectors.push({ selector, status: sel.status, changeCount: sel.changeCount, props })
      }
    }
    if (selectors.length > 0) {
      contexts.push({ key: ctxKey, status: ctx.status, changeCount: ctx.changeCount, selectors })
    }
  }
  const output = { version: 1, summary, contexts }
  if (values['order-risk']) output.orderRisks = orderRisks
  console.log(JSON.stringify(output, null, 2))
} else {
  const useColor = !values['no-color'] && !!process.stdout.isTTY
  const c = {
    reset:  useColor ? '\x1b[0m'  : '',
    yellow: useColor ? '\x1b[33m' : '',
    green:  useColor ? '\x1b[32m' : '',
    red:    useColor ? '\x1b[31m' : '',
    cyan:   useColor ? '\x1b[36m' : '',
    dim:    useColor ? '\x1b[2m'  : '',
  }

  for (const [ctxKey, ctx] of result) {
    const ctxLines = []
    for (const [selector, sel] of ctx.selectors) {
      const propLines = []
      for (const [propName, p] of sel.props) {
        if (!shouldInclude(p.status, filter)) continue
        if (p.status === 'changed') {
          propLines.push(`    ${c.yellow}~${c.reset} ${propName}: ${p.oldValue} → ${p.newValue}`)
        } else if (p.status === 'added') {
          propLines.push(`    ${c.green}+${c.reset} ${propName}: ${p.newValue}`)
        } else if (p.status === 'removed') {
          propLines.push(`    ${c.red}-${c.reset} ${propName}: ${p.oldValue}`)
        } else {
          propLines.push(`      ${propName}: ${p.value}`)
        }
      }
      if (propLines.length > 0) {
        ctxLines.push(`  ${c.dim}${selector}${c.reset}`)
        ctxLines.push(...propLines)
      }
    }
    if (ctxLines.length > 0) {
      console.log(`\n${c.cyan}[${ctxKey}]${c.reset}`)
      ctxLines.forEach(l => console.log(l))
    }
  }

  const parts = []
  if (summary.changed) parts.push(`${c.yellow}${summary.changed} changed${c.reset}`)
  if (summary.added)   parts.push(`${c.green}${summary.added} added${c.reset}`)
  if (summary.removed) parts.push(`${c.red}${summary.removed} removed${c.reset}`)
  if ((filter === 'all' || filter === 'unchanged') && summary.unchanged) parts.push(`${summary.unchanged} unchanged`)
  console.log(`\nSummary: ${parts.length ? parts.join(', ') : 'no differences'}`)

  if (values['order-risk'] && orderRisks.length > 0) {
    console.log(`\nOrder Risks:`)
    for (const { contextKey, rows } of orderRisks) {
      const visibleRows = rows.filter(r => r.type !== 'equal')
      if (visibleRows.length === 0) continue

      const maxOld = Math.max(6, ...visibleRows.map(r => (r.oldSelector ?? '-').length))
      const maxNew = Math.max(6, ...visibleRows.map(r => (r.newSelector ?? '-').length))

      console.log(`\n${c.cyan}[${contextKey}]${c.reset}`)
      console.log(`  ${'旧 CSS'.padEnd(maxOld)}  ${'新 CSS'.padEnd(maxNew)}  状態`)
      console.log(`  ${'-'.repeat(maxOld)}  ${'-'.repeat(maxNew)}  ------`)

      for (const row of visibleRows) {
        const oldCol = (row.oldSelector ?? '-').padEnd(maxOld)
        const newCol = (row.newSelector ?? '-').padEnd(maxNew)
        if (row.type === 'moved') {
          const spec = row.sameSpecificity ? ` ${c.dim}(詳細度が同じ)${c.reset}` : ''
          console.log(`  ${oldCol}  ${newCol}  ${c.yellow}⚠ 順序変更${c.reset}${spec}`)
          if (row.conflictingProps && row.conflictingProps.length > 0) {
            for (const cp of row.conflictingProps) {
              const imp = v => v.important ? ' !important' : ''
              console.log(`    ${c.dim}${cp.prop}: ${cp.oldEffective.value}${imp(cp.oldEffective)} → ${cp.newEffective.value}${imp(cp.newEffective)}${c.reset}`)
            }
          }
        } else if (row.type === 'deleted') {
          console.log(`  ${oldCol}  ${'-'.padEnd(maxNew)}  ${c.red}- 削除${c.reset}`)
        } else if (row.type === 'added') {
          console.log(`  ${'-'.padEnd(maxOld)}  ${newCol}  ${c.green}+ 追加${c.reset}`)
        }
      }
    }
  }
}

process.exit((hasDiff || hasOrderWarning) ? 1 : 0)
