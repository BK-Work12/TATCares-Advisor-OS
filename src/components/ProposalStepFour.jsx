import { useMemo } from 'react'

const strategyCatalog = [
  {
    id: 's-corp-election',
    title: 'S-Corp Election',
    category: 'Entity',
    description: 'Reduces SE tax on distributions via Form 2553 election.',
    savings: 45000,
    taxableReduction: 110000,
    incomeReduction: 20000,
    badgeColor: '#5B2C8D',
    bgColor: '#EDE0F7',
    borderColor: 'rgba(91,44,141,.3)',
    badgeId: 'S01',
  },
  {
    id: 'augusta-rule',
    title: 'Augusta Rule (§280A)',
    category: 'Deduction',
    description: 'Rent home to business up to 14 days — income tax-free.',
    savings: 37000,
    taxableReduction: 90000,
    incomeReduction: 24000,
    badgeColor: '#C8972A',
    bgColor: '#FFF3CD',
    borderColor: 'rgba(200,151,42,.3)',
    badgeId: 'S09',
  },
  {
    id: 'defined-benefit-plan',
    title: 'Defined Benefit Plan',
    category: 'Retirement',
    description: 'High-income earners shelter $100K+ through defined benefit.',
    savings: 40200,
    taxableReduction: 65000,
    incomeReduction: 35000,
    badgeColor: '#0E7C86',
    bgColor: '#D1ECF1',
    borderColor: 'rgba(14,124,134,.3)',
    badgeId: 'S08',
  },
  {
    id: 'backdoor-roth',
    title: 'Backdoor Roth IRA',
    category: 'Retirement',
    description: 'Bypass income limits through strategic conversion.',
    savings: 7000,
    taxableReduction: 12000,
    incomeReduction: 5000,
    badgeColor: '#0E7C86',
    bgColor: '#D1ECF1',
    borderColor: 'rgba(14,124,134,.3)',
    badgeId: 'S02',
  },
  {
    id: 'qbi',
    title: 'QBI Deduction (§199A)',
    category: 'Deduction',
    description: 'Up to 20% deduction for qualified pass-through income.',
    savings: 12000,
    taxableReduction: 32000,
    incomeReduction: 6000,
    badgeColor: '#C8972A',
    bgColor: '#FFF3CD',
    borderColor: 'rgba(200,151,42,.3)',
    badgeId: 'S03',
  },
  {
    id: 'cost-seg',
    title: 'Cost Segregation Study',
    category: 'Investment',
    description: 'Accelerate depreciation on real estate components.',
    savings: 35000,
    taxableReduction: 80000,
    incomeReduction: 18000,
    badgeColor: '#1A7A4A',
    bgColor: '#D4EDDA',
    borderColor: 'rgba(26,122,74,.3)',
    badgeId: 'S04',
  },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US').format(Math.max(0, Math.round(value)))
}

function estimateTax(taxableIncome, filingStatus) {
  const taxBrackets = {
    Single: [
      [11600, 0.1],
      [47150, 0.12],
      [100525, 0.22],
      [191950, 0.24],
      [243725, 0.32],
      [609350, 0.35],
      [Infinity, 0.37],
    ],
    MFJ: [
      [23200, 0.1],
      [94300, 0.12],
      [201050, 0.22],
      [383900, 0.24],
      [487450, 0.32],
      [731200, 0.35],
      [Infinity, 0.37],
    ],
  }

  let remaining = Math.max(0, Math.round(taxableIncome))
  let previousCap = 0
  let tax = 0

  for (const [cap, rate] of taxBrackets[filingStatus]) {
    if (remaining <= 0) break
    const bracketSize = cap - previousCap
    const taxableAtRate = Math.min(remaining, bracketSize)
    tax += taxableAtRate * rate
    remaining -= taxableAtRate
    previousCap = cap
  }

  return Math.round(tax)
}

function ProposalStepFour({
  clientName,
  taxYear,
  filingStatus,
  beforeIncome,
  beforeTaxableIncome,
  beforeTaxOwed,
  beforeBalance,
  selectedStrategyIds,
  formatCurrency: parentFormatCurrency,
}) {
  const selectedStrategies = useMemo(() => {
    if (!selectedStrategyIds || selectedStrategyIds.size === 0) {
      return []
    }
    return strategyCatalog.filter((s) => selectedStrategyIds.has(s.id))
  }, [selectedStrategyIds])

  const totalIncomeReduction = useMemo(
    () => selectedStrategies.reduce((sum, s) => sum + s.incomeReduction, 0),
    [selectedStrategies],
  )

  const totalTaxableReduction = useMemo(
    () => selectedStrategies.reduce((sum, s) => sum + s.taxableReduction, 0),
    [selectedStrategies],
  )

  const totalSavings = useMemo(() => selectedStrategies.reduce((sum, s) => sum + s.savings, 0), [selectedStrategies])

  const planCost = useMemo(() => Math.round(totalSavings * 0.106), [totalSavings])

  const afterIncome = useMemo(() => Math.max(0, beforeIncome - totalIncomeReduction), [beforeIncome, totalIncomeReduction])

  const afterTaxableIncome = useMemo(
    () => Math.max(0, beforeTaxableIncome - totalTaxableReduction),
    [beforeTaxableIncome, totalTaxableReduction],
  )

  const afterTaxOwed = useMemo(
    () => estimateTax(afterTaxableIncome, filingStatus),
    [afterTaxableIncome, filingStatus],
  )

  const afterBalance = useMemo(() => Math.max(0, afterTaxOwed), [afterTaxOwed])

  const taxSavings = useMemo(() => Math.max(0, beforeTaxOwed - afterTaxOwed), [beforeTaxOwed, afterTaxOwed])

  const netSavings = useMemo(() => Math.max(0, taxSavings - planCost), [taxSavings, planCost])

  const costPercentage = useMemo(
    () => (taxSavings > 0 ? Math.round((planCost / taxSavings) * 100 * 10) / 10 : 0),
    [planCost, taxSavings],
  )

  const formatter = parentFormatCurrency || formatCurrency

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900">
          Proposal Preview — {clientName} · {taxYear}
        </h2>
      </div>

      {/* Proposal Document */}
      <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        {/* Cover Section */}
        <div className="space-y-3 border-b border-slate-200 pb-8 text-center">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400">TakeAway Tax Cares</div>
          <div className="text-4xl font-black tracking-tight text-slate-900">The Tax Plan</div>
          <div className="text-lg text-slate-600">Prepared for {clientName}</div>
          <div className="text-xs text-slate-400">
            Tax Year {taxYear} · {filingStatus} · April {new Date().getDate()}, {new Date().getFullYear()}
          </div>
        </div>

        {/* Before/After Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Before */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-red-600">Tax Assessment — BEFORE Plan</div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Gross Income</span>
                <span className="font-bold text-slate-900">${formatter(beforeIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Standard Deduction</span>
                <span className="font-bold text-slate-900">($14,600)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Other Deductions</span>
                <span className="font-bold text-slate-900">$0</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3">
                <span className="text-slate-600">Taxable Income</span>
                <span className="font-bold text-slate-900">${formatter(beforeTaxableIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Estimated Tax Owed</span>
                <span className="font-bold text-slate-900">${formatter(beforeTaxOwed)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Credits</span>
                <span className="font-bold text-slate-900">$0</span>
              </div>
              <div className="flex justify-between border-t border-red-200 pt-3">
                <span className="text-sm font-bold text-red-600">⚠ Balance Due</span>
                <span className="text-2xl font-black text-red-600">${formatter(beforeBalance)}</span>
              </div>
            </div>
          </div>

          {/* After */}
          <div className="space-y-4">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-700">
              Tax Assessment — AFTER Plan
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Gross Income</span>
                <span className="font-bold text-emerald-700">${formatter(afterIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Standard Deduction</span>
                <span className="font-bold text-emerald-700">($14,600)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Other Deductions</span>
                <span className="font-bold text-emerald-700">$0</span>
              </div>
              <div className="flex justify-between border-t border-emerald-200 pt-3">
                <span className="text-slate-600">Taxable Income</span>
                <span className="font-bold text-emerald-700">${formatter(afterTaxableIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Estimated Tax Owed</span>
                <span className="font-bold text-emerald-700">${formatter(afterTaxOwed)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Credits</span>
                <span className="font-bold text-emerald-700">$0</span>
              </div>
              <div className="flex justify-between border-t border-emerald-200 pt-3">
                <span className="text-sm font-bold text-emerald-700">✓ Balance Due</span>
                <span className="text-2xl font-black text-emerald-700">${formatter(afterBalance)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Spotlight */}
        <div className="space-y-3 rounded-xl bg-teal-700 px-6 py-8 text-center text-white md:px-8">
          <div className="text-sm opacity-75">Our plans will reduce your taxable debt by</div>
          <div className="text-5xl font-black tracking-tight">${formatter(totalTaxableReduction)}</div>
          <div className="text-lg font-bold">Saving you ${formatter(taxSavings)} in tax dollars</div>
          <div className="text-sm font-semibold opacity-90">Leaving a reduced balance of ${formatter(afterBalance)}</div>
        </div>

        {/* 10% Rule */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-slate-200 p-6 md:p-8">
            <div className="text-sm font-bold text-slate-900">Based on the savings, your plan only costs you</div>
            <div className="text-xs text-slate-500">10.6% of the savings = a fraction of what you keep</div>
            <div className="text-4xl font-black text-amber-700">{costPercentage}%</div>
            <div className="text-xs text-slate-400">of estimated tax savings</div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-3 rounded-xl bg-yellow-50 p-6 md:p-8">
            <div className="text-sm text-slate-600">Now isn't that worth it?</div>
            <div className="text-sm text-slate-600">The plan's cost is</div>
            <div className="text-5xl font-black text-slate-900">${formatter(planCost)}</div>
            <div className="mt-3 rounded-lg bg-emerald-100 px-3 py-2 text-xs font-bold text-emerald-700">
              NET SAVINGS: ${formatter(netSavings)}
            </div>
          </div>
        </div>

        {/* Selected Strategies */}
        {selectedStrategies.length > 0 && (
          <div className="space-y-4 border-t border-slate-200 pt-6">
            <div className="text-sm font-bold tracking-tight text-slate-900">📋 The Plans — Selected Strategies</div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {selectedStrategies.map((strategy) => (
                <div
                  key={strategy.id}
                  style={{
                    backgroundColor: strategy.bgColor,
                    borderColor: strategy.borderColor,
                  }}
                  className="flex gap-3 rounded-lg border p-4"
                >
                  <div
                    style={{
                      backgroundColor: strategy.badgeColor,
                      color: '#fff',
                    }}
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  >
                    {strategy.badgeId}
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-slate-900">{strategy.title}</div>
                    <div className="mt-1 text-[11px] text-slate-600">{strategy.description}</div>
                    <div
                      style={{ color: strategy.badgeColor }}
                      className="mt-2 text-xs font-bold"
                    >
                      ~${formatter(strategy.savings)} savings
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-400">
          Prepared by TakeAway Tax Cares · This proposal is an estimate based on prior-year returns and current-year
          projections. Actual results may vary. · takeawaytax.com
        </div>
      </div>

      {/* Action Buttons */}
      {/* <div className="flex gap-3">
        <button
          type="button"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          📥 Download PDF
        </button>
        <button
          type="button"
          className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
        >
          🖨️ Print Proposal
        </button>
        <button
          type="button"
          className="flex-1 rounded-lg bg-teal-700 px-4 py-3 text-sm font-bold text-white hover:bg-teal-800"
        >
          ✓ Approve & Send
        </button>
      </div> */}
    </div>
  )
}

export default ProposalStepFour
