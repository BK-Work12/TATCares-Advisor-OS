import { useMemo, useState } from 'react'

const filters = ['All', 'Entity', 'Retirement', 'Deduction', 'Investment']

const strategyCatalog = [
  {
    id: 's-corp-election',
    title: 'S-Corp Election',
    category: 'Entity',
    description: 'Reduces SE tax on distributions by electing S-Corp status.',
    savings: 45000,
    taxableReduction: 110000,
    incomeReduction: 20000,
    pillClass: 'bg-[#EDE0F7] text-[#5B2C8D]',
  },
  {
    id: 'augusta-rule',
    title: 'Augusta Rule (§280A)',
    category: 'Deduction',
    description: 'Rent personal home to business up to 14 days tax-free.',
    savings: 37000,
    taxableReduction: 90000,
    incomeReduction: 24000,
    pillClass: 'bg-[#FFF3CD] text-[#C8972A]',
  },
  {
    id: 'defined-benefit-plan',
    title: 'Defined Benefit Plan',
    category: 'Retirement',
    description: 'High-income earners can shelter six figures annually.',
    savings: 40200,
    taxableReduction: 65000,
    incomeReduction: 35000,
    pillClass: 'bg-[#D1ECF1] text-[#0E7C86]',
  },
  {
    id: 'backdoor-roth',
    title: 'Backdoor Roth IRA',
    category: 'Retirement',
    description: 'Bypass Roth income limits through strategic conversion.',
    savings: 7000,
    taxableReduction: 12000,
    incomeReduction: 5000,
    pillClass: 'bg-[#D1ECF1] text-[#0E7C86]',
  },
  {
    id: 'qbi',
    title: 'QBI Deduction (§199A)',
    category: 'Deduction',
    description: 'Up to 20% deduction for qualified pass-through income.',
    savings: 12000,
    taxableReduction: 32000,
    incomeReduction: 6000,
    pillClass: 'bg-[#FFF3CD] text-[#C8972A]',
  },
  {
    id: 'cost-seg',
    title: 'Cost Segregation Study',
    category: 'Investment',
    description: 'Accelerate depreciation on real estate components.',
    savings: 35000,
    taxableReduction: 80000,
    incomeReduction: 18000,
    pillClass: 'bg-[#D4EDDA] text-[#1A7A4A]',
  },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US').format(Math.max(0, Math.round(value)))
}

function ProposalStepThree({
  clientName,
  taxYear,
  beforeIncome,
  beforeTaxableIncome,
  beforeTaxOwed,
  beforeBalance,
  selectedStrategyIds,
  setSelectedStrategyIds,
}) {
  const [activeFilter, setActiveFilter] = useState('All')

  const visibleStrategies = useMemo(() => {
    if (activeFilter === 'All') {
      return strategyCatalog
    }
    return strategyCatalog.filter((strategy) => strategy.category === activeFilter)
  }, [activeFilter])

  const selectedStrategies = useMemo(
    () => strategyCatalog.filter((strategy) => selectedStrategyIds.has(strategy.id)),
    [selectedStrategyIds],
  )

  const totalSavings = useMemo(
    () => selectedStrategies.reduce((sum, strategy) => sum + strategy.savings, 0),
    [selectedStrategies],
  )

  const totalTaxableReduction = useMemo(
    () => selectedStrategies.reduce((sum, strategy) => sum + strategy.taxableReduction, 0),
    [selectedStrategies],
  )

  const totalIncomeReduction = useMemo(
    () => selectedStrategies.reduce((sum, strategy) => sum + strategy.incomeReduction, 0),
    [selectedStrategies],
  )

  const planCost = useMemo(() => Math.round(totalSavings * 0.106), [totalSavings])

  const afterIncome = Math.max(0, beforeIncome - totalIncomeReduction)
  const afterTaxableIncome = Math.max(0, beforeTaxableIncome - totalTaxableReduction)
  const afterTaxOwed = Math.max(0, beforeTaxOwed - totalSavings)
  const afterBalance = Math.max(0, beforeBalance - totalSavings)

  const toggleStrategy = (strategyId) => {
    setSelectedStrategyIds((current) => {
      const next = new Set(current)
      if (next.has(strategyId)) {
        next.delete(strategyId)
      } else {
        next.add(strategyId)
      }
      return next
    })
  }

  return (
    <>
      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-black tracking-tight text-slate-900">Client Proposal Builder</h3>
        <p className="mt-1 text-sm text-slate-500">
          {clientName} · {taxYear} · {selectedStrategies.length} strategies selected ·{' '}
          <span className="font-bold text-[#1A7A4A]">~${formatCurrency(totalSavings)} total savings</span>
        </p>
      </section>

      <section className="mb-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <h4 className="text-sm font-bold text-slate-900">Strategy Library - Select Client Strategies</h4>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => {
              const isActive = filter === activeFilter
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] transition ${
                    isActive
                      ? 'bg-[#1B2A4A] text-white'
                      : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                  }`}
                >
                  {filter}
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-4">
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {visibleStrategies.map((strategy) => {
              const isSelected = selectedStrategyIds.has(strategy.id)
              return (
                <button
                  key={strategy.id}
                  type="button"
                  onClick={() => toggleStrategy(strategy.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    isSelected
                      ? 'border-[#0E7C86] bg-[#EBF7F8] ring-2 ring-inset ring-[#0E7C86]'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${strategy.pillClass}`}>
                      {strategy.category}
                    </span>
                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold ${
                        isSelected
                          ? 'bg-[#0E7C86] text-white'
                          : 'border-2 border-slate-300 bg-white text-slate-300'
                      }`}
                    >
                      {isSelected ? '✓' : ''}
                    </span>
                  </div>

                  <div className="text-sm font-bold text-slate-900">{strategy.title}</div>
                  <div className="mt-1 text-xs leading-5 text-slate-500">{strategy.description}</div>
                  <div className="mt-3 text-sm font-black text-[#1A7A4A]">~${formatCurrency(strategy.savings)} savings</div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      <section className="rounded-2xl bg-[#1B2A4A] p-6 text-white shadow-lg">
        <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white/45">Live Before / After Preview</div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-2 text-sm">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#FF6B6B]">Before Plan</div>
            <div className="flex justify-between"><span className="text-white/65">Income</span><span className="font-semibold">${formatCurrency(beforeIncome)}</span></div>
            <div className="flex justify-between"><span className="text-white/65">Taxable Inc</span><span className="font-semibold">${formatCurrency(beforeTaxableIncome)}</span></div>
            <div className="flex justify-between"><span className="text-white/65">Tax Owed</span><span className="font-semibold">${formatCurrency(beforeTaxOwed)}</span></div>
            <div className="flex justify-between"><span className="text-white/65">Balance</span><span className="font-semibold text-[#FF6B6B]">${formatCurrency(beforeBalance)}</span></div>
          </div>

          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
            <div className="text-4xl font-black text-[#0E7C86]">${formatCurrency(totalSavings)}</div>
            <div className="mt-1 text-xs text-white/70">Estimated Tax Savings</div>
            <div className="mt-3 text-sm font-bold text-[#C8972A]">Plan Cost: ${formatCurrency(planCost)}</div>
            <div className="text-[10px] text-white/45">(~10.6% of savings)</div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#0E7C86]">After Plan</div>
            <div className="flex justify-between"><span className="text-white/65">Income</span><span className="font-semibold text-[#0E7C86]">${formatCurrency(afterIncome)}</span></div>
            <div className="flex justify-between"><span className="text-white/65">Taxable Inc</span><span className="font-semibold text-[#0E7C86]">${formatCurrency(afterTaxableIncome)}</span></div>
            <div className="flex justify-between"><span className="text-white/65">Tax Owed</span><span className="font-semibold text-[#0E7C86]">${formatCurrency(afterTaxOwed)}</span></div>
            <div className="flex justify-between"><span className="text-white/65">Balance</span><span className="font-semibold text-[#0E7C86]">${formatCurrency(afterBalance)}</span></div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProposalStepThree
