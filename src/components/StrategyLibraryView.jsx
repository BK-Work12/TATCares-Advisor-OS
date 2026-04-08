import { useDeferredValue, useEffect, useMemo, useState } from 'react'

const categories = ['All', 'Entity', 'Retirement', 'Deduction', 'Investment', 'Timing']

const strategies = [
  {
    id: 'S01',
    title: 'S-Corp Election',
    category: 'Entity',
    risk: 'Medium',
    savings: '$8,000 - $25,000',
    form: 'Form 2553',
    duration: '60-90 days',
    summary: 'Reduce self-employment tax by splitting owner compensation between salary and distributions.',
    qualification:
      'Business owners with net profit above $40,000 per year operating through an eligible LLC or corporation.',
    howItWorks:
      'The business elects S-Corp tax treatment, pays the owner a reasonable salary through payroll, and distributes the remaining profit through K-1 distributions that are generally not subject to self-employment tax.',
    steps: [
      'File Form 2553 with the IRS within the applicable election window.',
      'Set a documented reasonable compensation benchmark for the owner.',
      'Run payroll and withhold taxes consistently through the year.',
      'Distribute remaining profit through shareholder distributions.',
    ],
    tags: ['Self-Employment Tax', 'High Impact', 'Entity'],
    tiers: ['T1', 'T2', 'T3'],
    accent: 'bg-[#5B2C8D]',
    panelAccent: 'bg-[#5B2C8D]',
    pillClass: 'bg-[#EDE0F7] text-[#5B2C8D]',
  },
  {
    id: 'S02',
    title: 'Accountable Plan Reimbursement',
    category: 'Deduction',
    risk: 'Low',
    savings: '$2,500 - $9,000',
    form: 'Board Policy + Expense Logs',
    duration: '14-21 days',
    summary: 'Reimburse owners for home office, mileage, internet, and supplies through the business.',
    qualification: 'Owners using personal funds for ordinary and necessary business expenses.',
    howItWorks:
      'The company adopts an accountable plan policy and reimburses substantiated expenses to the owner, creating a business deduction without personal taxable income.',
    steps: [
      'Adopt a written accountable plan policy.',
      'Gather recurring reimbursable expense records.',
      'Submit reimbursement reports monthly.',
      'Book reimbursements correctly inside the business ledger.',
    ],
    tags: ['Reimbursement', 'Home Office', 'Easy Win'],
    tiers: ['T1', 'T2'],
    accent: 'bg-[#0E7C86]',
    panelAccent: 'bg-[#0E7C86]',
    pillClass: 'bg-[#D1ECF1] text-[#0E7C86]',
  },
  {
    id: 'S03',
    title: 'Defined Benefit Pension',
    category: 'Retirement',
    risk: 'Medium',
    savings: '$25,000 - $120,000',
    form: 'Plan Adoption Package',
    duration: '30-60 days',
    summary: 'Accelerate large retirement deductions for high-income owners nearing retirement age.',
    qualification: 'High-income business owners with strong cash flow and a multi-year planning horizon.',
    howItWorks:
      'A defined benefit plan allows materially larger deductible contributions than standard retirement accounts, based on age, income, and actuarial calculations.',
    steps: [
      'Coordinate plan design with a third-party administrator.',
      'Run contribution projections against cash flow.',
      'Adopt the plan and establish funding schedule.',
      'Complete annual actuarial testing and funding.',
    ],
    tags: ['High Income', 'Retirement', 'Advanced'],
    tiers: ['T2', 'T3'],
    accent: 'bg-[#1B2A4A]',
    panelAccent: 'bg-[#1B2A4A]',
    pillClass: 'bg-[#DBE7FF] text-[#1B2A4A]',
  },
  {
    id: 'S04',
    title: 'Solo 401(k) - Max Contribution',
    category: 'Retirement',
    risk: 'Low',
    savings: '$5,000 - $23,000',
    form: 'Solo 401(k) Adoption',
    duration: '7-14 days',
    summary: 'Maximize deductible retirement contributions for self-employed owners.',
    qualification: 'Self-employed individuals or owner-only businesses with earned income.',
    howItWorks:
      'The owner contributes as both employee and employer, allowing a larger combined annual contribution limit than many basic retirement accounts.',
    steps: [
      'Open the Solo 401(k) plan with a provider.',
      'Calculate employee and employer contribution room.',
      'Fund contributions before filing deadlines.',
      'Track annual reporting thresholds.',
    ],
    tags: ['Pre-Tax', 'Self-Employed', 'Simple'],
    tiers: ['T1', 'T2', 'T3'],
    accent: 'bg-[#0E7C86]',
    panelAccent: 'bg-[#0E7C86]',
    pillClass: 'bg-[#D1ECF1] text-[#0E7C86]',
  },
  {
    id: 'S05',
    title: 'Health Savings Account Stacking',
    category: 'Deduction',
    risk: 'Low',
    savings: '$1,500 - $8,300',
    form: 'HSA Contribution Record',
    duration: '1-7 days',
    summary: 'Use pre-tax HSA contributions to reduce taxable income and build medical reserves.',
    qualification: 'Taxpayers covered by a qualifying high-deductible health plan.',
    howItWorks:
      'Eligible individuals contribute to an HSA, receive an above-the-line deduction, and can later use funds tax-free for qualified medical expenses.',
    steps: [
      'Confirm HDHP eligibility for the year.',
      'Open or review the HSA account.',
      'Set contribution targets and payroll handling.',
      'Track qualified expenses for tax-free reimbursements.',
    ],
    tags: ['Medical', 'Above-the-Line', 'Cash Flow'],
    tiers: ['T1'],
    accent: 'bg-[#1A7A4A]',
    panelAccent: 'bg-[#1A7A4A]',
    pillClass: 'bg-[#D4EDDA] text-[#1A7A4A]',
  },
  {
    id: 'S06',
    title: 'Cost Segregation Study',
    category: 'Investment',
    risk: 'Medium',
    savings: '$15,000 - $90,000',
    form: 'Engineering Study',
    duration: '30-45 days',
    summary: 'Accelerate depreciation on income-producing real estate through asset reclassification.',
    qualification: 'Owners of recently acquired, built, or improved investment and business property.',
    howItWorks:
      'A cost segregation study identifies building components eligible for shorter depreciation lives, creating larger current deductions and deferring tax.',
    steps: [
      'Collect property basis and improvement records.',
      'Order engineering-led cost segregation analysis.',
      'Map components to applicable recovery periods.',
      'Apply depreciation and any catch-up adjustment on the return.',
    ],
    tags: ['Real Estate', 'Depreciation', 'High Impact'],
    tiers: ['T2', 'T3'],
    accent: 'bg-[#C8972A]',
    panelAccent: 'bg-[#C8972A]',
    pillClass: 'bg-[#FFF3CD] text-[#C8972A]',
  },
  {
    id: 'S07',
    title: 'Backdoor Roth Conversion',
    category: 'Retirement',
    risk: 'Low',
    savings: '$0 - $12,000',
    form: 'IRA Contribution + Conversion',
    duration: '3-5 days',
    summary: 'Create long-term tax-free retirement growth even when income exceeds Roth thresholds.',
    qualification: 'Taxpayers phased out of direct Roth IRA contributions without problematic pre-tax IRA balances.',
    howItWorks:
      'The taxpayer makes a non-deductible traditional IRA contribution and then converts it to a Roth IRA, subject to pro-rata rules.',
    steps: [
      'Review pre-tax IRA balances for pro-rata exposure.',
      'Fund the non-deductible traditional IRA.',
      'Convert to Roth and document basis.',
      'Report the transaction accurately on Form 8606.',
    ],
    tags: ['Roth', 'Future Savings', 'Retirement'],
    tiers: ['T1', 'T2'],
    accent: 'bg-[#7C3AED]',
    panelAccent: 'bg-[#7C3AED]',
    pillClass: 'bg-[#EFE7FF] text-[#7C3AED]',
  },
  {
    id: 'S08',
    title: 'Real Estate Professional Status',
    category: 'Investment',
    risk: 'High',
    savings: '$20,000 - $150,000',
    form: 'Time Logs + Return Support',
    duration: 'Ongoing annual support',
    summary: 'Convert suspended passive real estate losses into active offsets when eligibility standards are met.',
    qualification: 'Taxpayers meeting hour requirements and material participation tests for real property trades or businesses.',
    howItWorks:
      'If the taxpayer qualifies as a real estate professional and materially participates, rental losses may offset non-passive income rather than being suspended.',
    steps: [
      'Track qualified real estate service hours contemporaneously.',
      'Document material participation for each relevant activity.',
      'Evaluate grouping elections where appropriate.',
      'Prepare return with strong audit-ready substantiation.',
    ],
    tags: ['Passive Loss', 'Audit Sensitive', 'Advanced'],
    tiers: ['T3'],
    accent: 'bg-[#C0392B]',
    panelAccent: 'bg-[#C0392B]',
    pillClass: 'bg-[#FADBD8] text-[#C0392B]',
  },
  {
    id: 'S09',
    title: 'Augusta Rule (§280A)',
    category: 'Deduction',
    risk: 'Low',
    savings: '$5,000 - $14,000',
    form: 'Rental Documentation Packet',
    duration: '5-10 days',
    summary: 'Rent your home to your business for qualifying meetings and receive tax-free rental income.',
    qualification: 'Owners using their residence for legitimate business meetings with supportable fair-market rental value.',
    howItWorks:
      'The business deducts rental payments for qualifying short-term use of the home, while the homeowner generally excludes the rental income if total rental days remain within the statutory limit.',
    steps: [
      'Document business meeting dates and attendees.',
      'Establish market rental value with comparable support.',
      'Generate rental invoices and company payment records.',
      'Maintain minutes, agendas, and substantiation packet.',
    ],
    tags: ['Home', 'Tax-Free Income', '§280A'],
    tiers: ['T1', 'T2', 'T3'],
    accent: 'bg-[#C8972A]',
    panelAccent: 'bg-[#C8972A]',
    pillClass: 'bg-[#FFF3CD] text-[#C8972A]',
  },
  {
    id: 'S10',
    title: 'Bunching Charitable Contributions',
    category: 'Timing',
    risk: 'Low',
    savings: '$2,000 - $15,000',
    form: 'Donor-Advised Fund',
    duration: '2-7 days',
    summary: 'Cluster multiple years of giving into one tax year to maximize itemized deductions.',
    qualification: 'Taxpayers whose annual deductions hover near the standard deduction threshold.',
    howItWorks:
      'Contributing multiple years of charitable gifts at once may allow the taxpayer to itemize in one year and take the standard deduction in others.',
    steps: [
      'Review itemized deduction baseline.',
      'Estimate optimal bunching year and amount.',
      'Fund a donor-advised fund if needed.',
      'Track carryforward and grant timing.',
    ],
    tags: ['Charity', 'Timing', 'Simple'],
    tiers: ['T1'],
    accent: 'bg-[#1B2A4A]',
    panelAccent: 'bg-[#1B2A4A]',
    pillClass: 'bg-[#DBE7FF] text-[#1B2A4A]',
  },
  {
    id: 'S11',
    title: 'R&D Credit Study',
    category: 'Entity',
    risk: 'Medium',
    savings: '$10,000 - $75,000',
    form: 'R&D Credit Study',
    duration: '30-60 days',
    summary: 'Claim credits for qualifying experimentation and development activities.',
    qualification: 'Businesses investing in process, software, product, or technical improvement efforts.',
    howItWorks:
      'A study identifies qualified research expenditures and calculates tax credits that may offset income tax or payroll tax in some startup cases.',
    steps: [
      'Inventory technical projects and development teams.',
      'Map wages, supplies, and contractor costs.',
      'Complete nexus interviews and credit calculations.',
      'File supporting forms and maintain project evidence.',
    ],
    tags: ['Credit', 'Innovation', 'Entity'],
    tiers: ['T2', 'T3'],
    accent: 'bg-[#0E7C86]',
    panelAccent: 'bg-[#0E7C86]',
    pillClass: 'bg-[#D1ECF1] text-[#0E7C86]',
  },
  {
    id: 'S12',
    title: 'Section 179 Vehicle Deduction',
    category: 'Deduction',
    risk: 'Medium',
    savings: '$6,000 - $32,000',
    form: 'Asset Purchase + Mileage Support',
    duration: '10-20 days',
    summary: 'Accelerate depreciation on qualifying business-use vehicles.',
    qualification: 'Businesses acquiring qualifying vehicles used predominantly for business.',
    howItWorks:
      'Depending on weight and business use, the taxpayer may expense a significant portion of the vehicle cost using Section 179 and/or bonus depreciation.',
    steps: [
      'Confirm vehicle eligibility and GVWR thresholds.',
      'Document business-use percentage.',
      'Coordinate purchase timing with taxable income.',
      'Book and report depreciation correctly.',
    ],
    tags: ['Vehicle', 'Depreciation', 'Equipment'],
    tiers: ['T1', 'T2'],
    accent: 'bg-[#C8972A]',
    panelAccent: 'bg-[#C8972A]',
    pillClass: 'bg-[#FFF3CD] text-[#C8972A]',
  },
  {
    id: 'S13',
    title: 'Installment Sale Timing',
    category: 'Timing',
    risk: 'Medium',
    savings: '$8,000 - $55,000',
    form: 'Sale Agreement Structuring',
    duration: '15-30 days',
    summary: 'Spread taxable gain from qualifying asset sales across multiple tax years.',
    qualification: 'Taxpayers selling certain appreciated property and receiving payment over time.',
    howItWorks:
      'Installment sale treatment recognizes gain as payments are received, potentially smoothing tax brackets and timing.',
    steps: [
      'Model sale structure and collection schedule.',
      'Confirm property eligibility for installment reporting.',
      'Draft agreement terms with tax timing in mind.',
      'Track interest, basis, and annual recognition.',
    ],
    tags: ['Sale', 'Deferral', 'Timing'],
    tiers: ['T2'],
    accent: 'bg-[#1B2A4A]',
    panelAccent: 'bg-[#1B2A4A]',
    pillClass: 'bg-[#DBE7FF] text-[#1B2A4A]',
  },
  {
    id: 'S14',
    title: 'Qualified Opportunity Zone Roll',
    category: 'Investment',
    risk: 'High',
    savings: '$12,000 - $80,000',
    form: 'Fund Subscription + Gain Election',
    duration: '20-45 days',
    summary: 'Defer and potentially reduce gain through qualifying opportunity zone investments.',
    qualification: 'Taxpayers realizing eligible capital gains and willing to hold long-term investments.',
    howItWorks:
      'Investing qualifying gains into a QOF within the required period may defer taxes and provide tax-free growth on future appreciation after long holding periods.',
    steps: [
      'Identify eligible gain and investment window.',
      'Perform diligence on QOF opportunities.',
      'Complete fund subscription and basis tracking.',
      'Monitor holding period and compliance testing.',
    ],
    tags: ['Capital Gains', 'Deferral', 'Advanced'],
    tiers: ['T3'],
    accent: 'bg-[#C0392B]',
    panelAccent: 'bg-[#C0392B]',
    pillClass: 'bg-[#FADBD8] text-[#C0392B]',
  },
  {
    id: 'S15',
    title: 'Cash vs. Accrual Method Review',
    category: 'Timing',
    risk: 'Low',
    savings: '$3,000 - $18,000',
    form: 'Accounting Method Review',
    duration: '14-30 days',
    summary: 'Optimize income recognition timing by confirming the most favorable accounting method.',
    qualification: 'Businesses eligible to use cash basis or considering a method change.',
    howItWorks:
      'Choosing or changing accounting methods can accelerate deductions or defer income based on how revenue and expenses are recognized for tax purposes.',
    steps: [
      'Review current tax accounting method.',
      'Model cash and accrual tax results.',
      'Prepare change procedures if beneficial.',
      'Implement bookkeeping adjustments prospectively.',
    ],
    tags: ['Method Change', 'Timing', 'Planning'],
    tiers: ['T1', 'T2'],
    accent: 'bg-[#0E7C86]',
    panelAccent: 'bg-[#0E7C86]',
    pillClass: 'bg-[#D1ECF1] text-[#0E7C86]',
  },
  {
    id: 'S16',
    title: 'Family Management Company',
    category: 'Entity',
    risk: 'High',
    savings: '$15,000 - $70,000',
    form: 'Entity Setup + Agreements',
    duration: '30-75 days',
    summary: 'Separate centralized management functions into a supporting entity when facts support the structure.',
    qualification: 'Families with multiple operating or investment entities and defensible shared-service activities.',
    howItWorks:
      'A management company can centralize services and reallocate income and expenses, but must be operationally real and properly documented.',
    steps: [
      'Evaluate business purpose and economic substance.',
      'Establish legal entity and service agreements.',
      'Track actual services performed and charges.',
      'Monitor transfer pricing and documentation quality.',
    ],
    tags: ['Advanced', 'Entity', 'Documentation'],
    tiers: ['T3'],
    accent: 'bg-[#7C3AED]',
    panelAccent: 'bg-[#7C3AED]',
    pillClass: 'bg-[#EFE7FF] text-[#7C3AED]',
  },
  {
    id: 'S17',
    title: 'Year-End Income Deferral Stack',
    category: 'Timing',
    risk: 'Medium',
    savings: '$4,000 - $30,000',
    form: 'Year-End Planning Packet',
    duration: '7-14 days',
    summary: 'Coordinate receivables, expenses, bonuses, retirement, and purchases before year-end.',
    qualification: 'Businesses and owner-operators approaching year-end with flexibility over timing decisions.',
    howItWorks:
      'The advisor sequences deductions and income events across year-end to manage taxable income, bracket exposure, and cash flow.',
    steps: [
      'Run current-year projection and target taxable income.',
      'Review expenses, retirement, payroll, and billing timing.',
      'Execute selected actions before year-end deadlines.',
      'Document assumptions for next-year follow-up.',
    ],
    tags: ['Year-End', 'Deferral', 'Advisor Led'],
    tiers: ['T1', 'T2', 'T3'],
    accent: 'bg-[#1A7A4A]',
    panelAccent: 'bg-[#1A7A4A]',
    pillClass: 'bg-[#D4EDDA] text-[#1A7A4A]',
  },
]

function StrategyLibraryView() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedStrategyId, setSelectedStrategyId] = useState('S01')
  const deferredSearch = useDeferredValue(searchQuery)

  const filteredStrategies = useMemo(() => {
    const normalizedQuery = deferredSearch.trim().toLowerCase()

    return strategies.filter((strategy) => {
      const matchesCategory = activeCategory === 'All' || strategy.category === activeCategory
      const haystack = [strategy.id, strategy.title, strategy.category, strategy.summary, ...strategy.tags]
        .join(' ')
        .toLowerCase()
      const matchesSearch = normalizedQuery.length === 0 || haystack.includes(normalizedQuery)

      return matchesCategory && matchesSearch
    })
  }, [activeCategory, deferredSearch])

  useEffect(() => {
    if (!filteredStrategies.some((strategy) => strategy.id === selectedStrategyId)) {
      setSelectedStrategyId(filteredStrategies[0]?.id ?? '')
    }
  }, [filteredStrategies, selectedStrategyId])

  const selectedStrategy =
    filteredStrategies.find((strategy) => strategy.id === selectedStrategyId) ?? filteredStrategies[0] ?? strategies[0]

  const visibleCount = filteredStrategies.length

  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Strategy Library</h2>
          <p className="mt-1 text-sm text-slate-500">
            {visibleCount} of {strategies.length} IRS-allowable strategies visible · Click any strategy to view the full
            playbook
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
          <span className="font-semibold text-slate-900">Active playbook:</span> {selectedStrategy.title}
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:items-start xl:grid-cols-[minmax(0,1fr)_380px]">
        <section className="min-w-0">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-4">
              <div className="relative">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  Search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search strategies, tags, forms, or impact areas"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 pl-18 text-sm text-slate-700 outline-none ring-0 placeholder:text-slate-400 focus:border-[var(--brand-500)] focus:bg-white"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isActive = category === activeCategory

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={`rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] transition ${
                        isActive
                          ? 'bg-[#1B2A4A] text-white shadow-sm'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                      }`}
                    >
                      {category}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-3">
            {filteredStrategies.map((strategy) => {
              const isSelected = strategy.id === selectedStrategy.id
              const riskClass =
                strategy.risk === 'High'
                  ? 'text-[#C0392B]'
                  : strategy.risk === 'Medium'
                    ? 'text-[#C8972A]'
                    : 'text-[#1A7A4A]'

              return (
                <button
                  key={strategy.id}
                  type="button"
                  onClick={() => setSelectedStrategyId(strategy.id)}
                  className={`w-full rounded-2xl border p-4 text-left shadow-sm transition ${
                    isSelected
                      ? 'border-[#0E7C86] bg-[#EBF7F8] ring-2 ring-inset ring-[#0E7C86]'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${strategy.accent} text-[11px] font-bold text-white`}
                    >
                      {strategy.id}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-black text-slate-900">{strategy.title}</span>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${strategy.pillClass}`}>
                          {strategy.category}
                        </span>
                        <span className={`text-[11px] font-bold uppercase tracking-[0.08em] ${riskClass}`}>
                          {strategy.risk}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {strategy.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="shrink-0 text-left md:text-right">
                      <div className="text-lg font-black text-[#1A7A4A]">{strategy.savings}</div>
                      <div className="text-[10px] uppercase tracking-[0.08em] text-slate-400">Est. savings</div>
                      <div className="mt-2 flex gap-1 md:justify-end">
                        {strategy.tiers.map((tier) => (
                          <span
                            key={tier}
                            className="rounded-full bg-white/90 px-2 py-1 text-[10px] font-bold text-slate-600 ring-1 ring-slate-200"
                          >
                            {tier}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}

            {filteredStrategies.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center shadow-sm">
                <p className="text-sm font-semibold text-slate-700">No strategies match this search.</p>
                <p className="mt-1 text-sm text-slate-500">Try another category or broader keyword.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="xl:sticky xl:top-6 xl:self-start">
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
            <div className={`${selectedStrategy.panelAccent} px-5 py-5 text-white`}>
              <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">
                {selectedStrategy.id} · {selectedStrategy.category}
              </div>
              <h3 className="mt-2 text-2xl font-black leading-tight">{selectedStrategy.title}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-white/80">
                <span>{selectedStrategy.form}</span>
                <span>{selectedStrategy.duration}</span>
                <span>{selectedStrategy.risk} complexity</span>
              </div>
            </div>

            <div className="space-y-5 p-5">
              <div className="rounded-2xl bg-emerald-50 p-4 ring-1 ring-emerald-100">
                <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">
                  Estimated savings range
                </div>
                <div className="mt-1 text-3xl font-black text-emerald-700">{selectedStrategy.savings}</div>
              </div>

              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Who qualifies</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{selectedStrategy.qualification}</p>
              </div>

              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">How it works</h4>
                <p className="mt-2 text-sm leading-6 text-slate-600">{selectedStrategy.howItWorks}</p>
              </div>

              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Implementation steps
                </h4>
                <ol className="mt-3 space-y-3">
                  {selectedStrategy.steps.map((step, index) => (
                    <li key={step} className="flex items-start gap-3 text-sm text-slate-600">
                      <span
                        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${selectedStrategy.accent} text-[10px] font-bold text-white`}
                      >
                        {index + 1}
                      </span>
                      <span className="leading-6">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  className="flex-1 rounded-xl bg-[var(--brand-600)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-700)]"
                >
                  + Add to Proposal
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  AI
                </button>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default StrategyLibraryView