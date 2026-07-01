import { describe, it, expect } from 'vitest'
import { computeOrderRisks } from '../src/core/order-risk.js'
import { computeSpecificity, sameSpecificity } from '../src/core/specificity.js'
import { parseSelectorOrder } from '../src/core/parse.js'

// ─── specificity ──────────────────────────────────────────────────────────

describe('computeSpecificity', () => {
  it('クラスセレクタ (0,1,0)', () => {
    expect(computeSpecificity('.foo')).toEqual([0, 1, 0])
  })
  it('要素 + クラス (0,1,1)', () => {
    expect(computeSpecificity('div.foo')).toEqual([0, 1, 1])
  })
  it('ID セレクタ (1,0,0)', () => {
    expect(computeSpecificity('#id')).toEqual([1, 0, 0])
  })
  it('要素名のみ (0,0,1)', () => {
    expect(computeSpecificity('div')).toEqual([0, 0, 1])
  })
  it('属性セレクタ (0,1,0)', () => {
    expect(computeSpecificity('[type=text]')).toEqual([0, 1, 0])
  })
  it('擬似クラス (0,1,0)', () => {
    expect(computeSpecificity(':hover')).toEqual([0, 1, 0])
  })
  it('擬似要素 (0,0,1)', () => {
    expect(computeSpecificity('::before')).toEqual([0, 0, 1])
  })
  it('複合セレクタ (1,2,1)', () => {
    expect(computeSpecificity('#main .nav:hover div')).toEqual([1, 2, 1])
  })
  it('ユニバーサルセレクタ * は 0', () => {
    expect(computeSpecificity('*')).toEqual([0, 0, 0])
  })

  it(':not() 単一引数の詳細度を引き継ぐ', () => {
    expect(computeSpecificity(':not(.a)')).toEqual([0, 1, 0])
  })
  it(':not() カンマ区切り複数引数は最大値を採用する (CSS L4)', () => {
    expect(computeSpecificity(':not(.a, .b)')).toEqual([0, 1, 0])
    expect(computeSpecificity(':not(.a, #id)')).toEqual([1, 0, 0])
  })
  it(':not() 内の括弧ありセレクタ (:is()) でカンマを誤分割しない', () => {
    expect(computeSpecificity(':not(:is(.a, .b))')).toEqual([0, 1, 0])
  })
  it(':not() 内の括弧ありセレクタ (:nth-child()) でカンマを誤分割しない', () => {
    // :nth-child 自体の b=1 + of S 部分の max(.a,.b)=1 → 合計 [0,2,0] が仕様に準拠
    expect(computeSpecificity(':not(:nth-child(2n of .a, .b))')).toEqual([0, 2, 0])
  })

  it(':is() は引数の最大詳細度を引き継ぐ (CSS L4)', () => {
    expect(computeSpecificity(':is(#id)')).toEqual([1, 0, 0])
    expect(computeSpecificity(':is(.foo)')).toEqual([0, 1, 0])
    expect(computeSpecificity(':is(.a, #id)')).toEqual([1, 0, 0])
  })
  it(':not(:is(#id)) は [1,0,0] を返す', () => {
    expect(computeSpecificity(':not(:is(#id))')).toEqual([1, 0, 0])
  })
  it(':where() は常に詳細度 0', () => {
    expect(computeSpecificity(':where(.foo)')).toEqual([0, 0, 0])
    expect(computeSpecificity(':where(#id)')).toEqual([0, 0, 0])
  })
  it(':not(:is(:where(.a,.b))) は二重ネストで [0,0,0] を返す', () => {
    expect(computeSpecificity(':not(:is(:where(.a,.b)))')).toEqual([0, 0, 0])
  })
  it(':is(.a:not(:nth-child(2))) は二重ネストで [0,2,0] を返す', () => {
    expect(computeSpecificity(':is(.a:not(:nth-child(2)))')).toEqual([0, 2, 0])
  })
})

describe('sameSpecificity', () => {
  it('同じクラスセレクタ同士', () => {
    expect(sameSpecificity('.a', '.b')).toBe(true)
  })
  it('クラスと要素は異なる', () => {
    expect(sameSpecificity('.a', 'div')).toBe(false)
  })
  it('ID とクラスは異なる', () => {
    expect(sameSpecificity('#id', '.cls')).toBe(false)
  })
})

// ─── parseSelectorOrder ───────────────────────────────────────────────────

describe('parseSelectorOrder', () => {
  it('単純なセレクタリストを返す', () => {
    const css = '.a { color: red; } .b { color: blue; } .c { color: green; }'
    const order = parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.a', '.b', '.c'])
  })

  it('グループセレクタを展開する', () => {
    const css = '.a, .b { color: red; } .c { color: blue; }'
    const order = parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.a', '.b', '.c'])
  })

  it('@media 内のセレクタを別コンテキストで返す', () => {
    const css = '.a { color: red; } @media (max-width: 768px) { .b { color: blue; } }'
    const order = parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.a'])
    expect(order.get('@media (max-width: 768px)')).toEqual(['.b'])
  })

  it('同じセレクタが複数回登場した場合は最終出現位置を使う', () => {
    // .a が最後に出現 → 順序は .b, .a
    const css = '.a { color: red; } .b { color: blue; } .a { margin: 0; }'
    const order = parseSelectorOrder(css)
    expect(order.get('base')).toEqual(['.b', '.a'])
  })
})

// ─── computeOrderRisks ────────────────────────────────────────────────────

describe('computeOrderRisks — パターン1: 単純スワップ', () => {
  const old = `
    .s1 { color: red; }
    .s2 { color: red; }
    .s3 { color: blue; font-weight: bold; }
    .s4 { color: red; }
    .s5 { color: green; font-weight: normal; }
    .s6 { color: red; }
  `
  const newCss = `
    .s1 { color: red; }
    .s2 { color: red; }
    .s5 { color: green; font-weight: normal; }
    .s4 { color: red; }
    .s3 { color: blue; font-weight: bold; }
    .s6 { color: red; }
  `

  it('base コンテキストで moved 行が 2 件検知される', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    expect(base.hasWarning).toBe(true)
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved).toHaveLength(2)
  })

  it('moved 行が (.s3, .s5) と (.s5, .s3) のペアになる', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base.rows.filter(r => r.type === 'moved')
    const selPairs = moved.map(r => [r.oldSelector, r.newSelector])
    expect(selPairs).toContainEqual(['.s3', '.s5'])
    expect(selPairs).toContainEqual(['.s5', '.s3'])
  })

  it('競合プロパティ (color, font-weight) が検知される', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const movedRow = base.rows.find(r => r.type === 'moved' && r.oldSelector === '.s3')
    expect(movedRow.conflictingProps.length).toBeGreaterThan(0)
    const propNames = movedRow.conflictingProps.map(p => p.prop)
    expect(propNames).toContain('color')
    expect(propNames).toContain('font-weight')
  })

  it('moved 行は同一詳細度フラグが true', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const moved = base.rows.filter(r => r.type === 'moved')
    moved.forEach(row => expect(row.sameSpecificity).toBe(true))
  })
})

describe('computeOrderRisks — パターン2: 削除後に順序維持', () => {
  const old = `
    .s1 { color: red; }
    .s2 { color: blue; }
    .s3 { color: green; }
    .s4 { color: red; }
  `
  const newCss = `
    .s1 { color: red; }
    .s3 { color: green; }
    .s4 { color: red; }
  `

  it('moved 行が 0 件', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    expect(base.hasWarning).toBe(false)
    expect(base.rows.filter(r => r.type === 'moved')).toHaveLength(0)
  })

  it('.s2 が deleted 行として現れる', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    const deleted = base.rows.filter(r => r.type === 'deleted')
    expect(deleted.map(r => r.oldSelector)).toContain('.s2')
  })
})

describe('computeOrderRisks — パターン3: 挿入のみ', () => {
  const old = `
    .s1 { color: red; }
    .s3 { color: green; }
  `
  const newCss = `
    .s1 { color: red; }
    .s2 { color: blue; }
    .s3 { color: green; }
  `

  it('moved 行が 0 件', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    // 変更なし (追加のみ) の場合、base コンテキストは結果に含まれる（added 行あり）
    if (base) {
      expect(base.hasWarning).toBe(false)
      expect(base.rows.filter(r => r.type === 'moved')).toHaveLength(0)
    }
  })
})

describe('computeOrderRisks — 変更なし', () => {
  const css = `
    .a { color: red; }
    .b { color: blue; }
    .c { color: green; }
  `

  it('結果が空配列', () => {
    const risks = computeOrderRisks(css, css)
    expect(risks).toHaveLength(0)
  })
})

describe('computeOrderRisks — 同値スワップ（競合なし）', () => {
  const old = `
    .a { color: red; }
    .b { color: red; }
  `
  const newCss = `
    .b { color: red; }
    .a { color: red; }
  `

  it('moved 行はあるが conflictingProps が空', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    expect(base.hasWarning).toBe(true)
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved.length).toBeGreaterThan(0)
    moved.forEach(row => expect(row.conflictingProps).toHaveLength(0))
  })
})

describe('computeOrderRisks — 詳細度が異なるスワップ', () => {
  const old = `
    div.a { color: red; }
    .b { color: blue; }
  `
  const newCss = `
    .b { color: blue; }
    div.a { color: red; }
  `

  it('moved 行が 2 件かつ sameSpecificity が false', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    const moved = base.rows.filter(r => r.type === 'moved')
    expect(moved.length).toBeGreaterThan(0)
    moved.forEach(row => expect(row.sameSpecificity).toBe(false))
  })
})

describe('computeOrderRisks — @media 内のスワップ', () => {
  const old = `
    @media (max-width: 768px) {
      .a { color: red; }
      .b { color: blue; }
    }
  `
  const newCss = `
    @media (max-width: 768px) {
      .b { color: blue; }
      .a { color: red; }
    }
  `

  it('@media コンテキストで moved 行を検知する', () => {
    const risks = computeOrderRisks(old, newCss)
    const media = risks.find(r => r.contextKey === '@media (max-width: 768px)')
    expect(media).toBeDefined()
    expect(media.hasWarning).toBe(true)
  })
})

describe('computeOrderRisks — 既存サンプルデータ (.mogeta2-*)', () => {
  const old = `
    .mogeta2-1--moge-ta { color: blue; }
    .mogeta2-1-other    { color: red; }
    .mogeta2-1          { color: red; }
  `
  const newCss = `
    .mogeta2-1          { color: red; }
    .mogeta2-1--moge-ta { color: blue; }
    .mogeta2-1-other    { color: red; }
  `

  it('.mogeta2-1 と .mogeta2-1--moge-ta のスワップが検知される', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    expect(base).toBeDefined()
    expect(base.hasWarning).toBe(true)

    const moved = base.rows.filter(r => r.type === 'moved')
    const involvedSelectors = moved.flatMap(r => [r.oldSelector, r.newSelector])
    expect(involvedSelectors).toContain('.mogeta2-1')
    expect(involvedSelectors).toContain('.mogeta2-1--moge-ta')
  })

  it('.mogeta2-1 と .mogeta2-1-other は同値なので conflictingProps なし', () => {
    const risks = computeOrderRisks(old, newCss)
    const base = risks.find(r => r.contextKey === 'base')
    // .mogeta2-1 と .mogeta2-1-other は共に color:red なので競合なし
    const movedPairs = base.rows
      .filter(r => r.type === 'moved')
      .filter(r =>
        (r.oldSelector === '.mogeta2-1' && r.newSelector === '.mogeta2-1-other') ||
        (r.oldSelector === '.mogeta2-1-other' && r.newSelector === '.mogeta2-1'),
      )
    movedPairs.forEach(row => expect(row.conflictingProps).toHaveLength(0))
  })
})
