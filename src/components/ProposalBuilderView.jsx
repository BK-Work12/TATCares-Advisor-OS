import { useMemo, useState } from 'react'
import ProposalStepOne from './ProposalStepOne'
import ProposalStepThree from './ProposalStepThree'
import ProposalStepTwo from './ProposalStepTwo'
import ProposalStepFour from './ProposalStepFour'

const steps = [
  { id: 1, title: 'Prior Year Return' },
  { id: 2, title: 'Current Year Mapping' },
  { id: 3, title: 'Strategy Selection' },
  { id: 4, title: 'Proposal Preview' },
]

const standardDeductionByStatus = {
  Single: 14600,
  MFJ: 29200,
}

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

function clampCurrency(value) {
  return Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0
}

function parseCurrencyInput(value) {
  const normalized = value.replace(/,/g, '').replace(/[^\d.]/g, '')
  const parsed = Number(normalized)
  return Number.isNaN(parsed) ? 0 : clampCurrency(parsed)
}

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US').format(clampCurrency(value))
}

function estimateTax(taxableIncome, filingStatus) {
  let remaining = clampCurrency(taxableIncome)
  let previousCap = 0
  let tax = 0

  for (const [cap, rate] of taxBrackets[filingStatus]) {
    if (remaining <= 0) {
      break
    }

    const bracketSize = cap - previousCap
    const taxableAtRate = Math.min(remaining, bracketSize)
    tax += taxableAtRate * rate
    remaining -= taxableAtRate
    previousCap = cap
  }

  return Math.round(tax)
}

function StepButton({ step, activeStep, onClick }) {
  const isActive = step.id === activeStep
  const isCompleted = step.id < activeStep

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition md:text-sm ${
        isActive
          ? 'border-[#0E7C86] bg-[#EBF7F8] text-[#0E7C86]'
          : isCompleted
            ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
      }`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
          isActive
            ? 'bg-[#0E7C86] text-white'
            : isCompleted
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-200 text-slate-500'
        }`}
      >
        {isCompleted ? '✓' : step.id}
      </span>
      <span>{step.title}</span>
    </button>
  )
}

function PlaceholderStep({ title, description }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <h3 className="text-xl font-black tracking-tight text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5 text-sm text-slate-500">
        This section is ready for your next implementation phase.
      </div>
    </div>
  )
}

function ProposalBuilderView() {
  const [activeStep, setActiveStep] = useState(1)
  const [clientName, setClientName] = useState('J. Crawford')
  const [email, setEmail] = useState('jcrawford@email.com')
  const [taxYear, setTaxYear] = useState('2024')
  const [filingStatus, setFilingStatus] = useState('Single')

  const [grossIncome, setGrossIncome] = useState(682110)
  const [standardDeduction, setStandardDeduction] = useState(14600)
  const [otherDeductions, setOtherDeductions] = useState(0)
  const [taxCredits, setTaxCredits] = useState(0)

  const [documentFiles, setDocumentFiles] = useState({
    w2: null,
    bank: null,
    cards: null,
    pnl: null,
    prior: null,
    rental: null,
  })

  const [wagesYtd, setWagesYtd] = useState(170527)
  const [businessYtd, setBusinessYtd] = useState(0)
  const [rentalYtd, setRentalYtd] = useState(0)
  const [capitalGainsYtd, setCapitalGainsYtd] = useState(0)
  const [otherIncomeYtd, setOtherIncomeYtd] = useState(0)
  const [businessExpensesYtd, setBusinessExpensesYtd] = useState(28420)
  const [monthsOfData, setMonthsOfData] = useState(3)
  const [selectedStrategyIds, setSelectedStrategyIds] = useState(
    new Set(['s-corp-election', 'augusta-rule', 'defined-benefit-plan']),
  )

  const taxableIncome = useMemo(
    () => Math.max(0, grossIncome - standardDeduction - otherDeductions),
    [grossIncome, standardDeduction, otherDeductions],
  )

  const estimatedTax = useMemo(
    () => estimateTax(taxableIncome, filingStatus),
    [taxableIncome, filingStatus],
  )

  const balanceDue = useMemo(() => Math.max(0, estimatedTax - taxCredits), [estimatedTax, taxCredits])

  const ytdIncome = useMemo(
    () => wagesYtd + businessYtd + rentalYtd + capitalGainsYtd + otherIncomeYtd,
    [wagesYtd, businessYtd, rentalYtd, capitalGainsYtd, otherIncomeYtd],
  )

  const projectedFullYearIncome = useMemo(
    () => Math.round((ytdIncome / Math.max(monthsOfData, 1)) * 12),
    [ytdIncome, monthsOfData],
  )

  const projectedExpenses = useMemo(
    () => Math.round((businessExpensesYtd / Math.max(monthsOfData, 1)) * 12),
    [businessExpensesYtd, monthsOfData],
  )

  const projectedNetIncome = useMemo(
    () => Math.max(0, projectedFullYearIncome - projectedExpenses),
    [projectedFullYearIncome, projectedExpenses],
  )

  const forecastMilestones = useMemo(() => {
    const checkpoints = [4, 5, 6, 9, 12]
    const labels = ['Apr', 'May', 'Jun', 'Sep', 'Dec']
    return checkpoints.map((month, index) => {
      const value = Math.round((projectedFullYearIncome * month) / 12)
      return {
        label: labels[index],
        value,
        pct: Math.max(8, Math.round((value / Math.max(projectedFullYearIncome, 1)) * 100)),
      }
    })
  }, [projectedFullYearIncome])

  const setCurrencyField = (setter) => (event) => setter(parseCurrencyInput(event.target.value))

  const handleDocumentUpload = (key, file) => {
    setDocumentFiles((current) => ({
      ...current,
      [key]: file ?? null,
    }))
  }

  const autofillFromStatus = () => {
    setStandardDeduction(standardDeductionByStatus[filingStatus])
  }

  const goNext = () => setActiveStep((value) => Math.min(4, value + 1))
  const goBack = () => setActiveStep((value) => Math.max(1, value - 1))

  return (
    <div className="flex-1 p-6 md:p-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900">Client Proposal Builder</h2>
          <p className="mt-1 text-sm text-slate-500">
            Build the before/after tax assessment, strategy stack, year-end forecast, and proposal output.
          </p>
        </div>
      </div>

      <div className="mb-5 grid gap-2 md:grid-cols-4">
        {steps.map((step) => (
          <StepButton key={step.id} step={step} activeStep={activeStep} onClick={() => setActiveStep(step.id)} />
        ))}
      </div>

      {activeStep === 1 && (
        <ProposalStepOne
          clientName={clientName}
          setClientName={setClientName}
          email={email}
          setEmail={setEmail}
          taxYear={taxYear}
          setTaxYear={setTaxYear}
          filingStatus={filingStatus}
          setFilingStatus={setFilingStatus}
          grossIncome={grossIncome}
          setGrossIncome={setGrossIncome}
          standardDeduction={standardDeduction}
          setStandardDeduction={setStandardDeduction}
          otherDeductions={otherDeductions}
          setOtherDeductions={setOtherDeductions}
          taxCredits={taxCredits}
          setTaxCredits={setTaxCredits}
          taxableIncome={taxableIncome}
          estimatedTax={estimatedTax}
          balanceDue={balanceDue}
          setCurrencyField={setCurrencyField}
          formatCurrency={formatCurrency}
          autofillFromStatus={autofillFromStatus}
        />
      )}

      {activeStep === 2 && (
        <ProposalStepTwo
          clientName={clientName}
          taxYear={taxYear}
          documentFiles={documentFiles}
          handleDocumentUpload={handleDocumentUpload}
          monthsOfData={monthsOfData}
          setMonthsOfData={setMonthsOfData}
          wagesYtd={wagesYtd}
          setWagesYtd={setWagesYtd}
          businessYtd={businessYtd}
          setBusinessYtd={setBusinessYtd}
          rentalYtd={rentalYtd}
          setRentalYtd={setRentalYtd}
          capitalGainsYtd={capitalGainsYtd}
          setCapitalGainsYtd={setCapitalGainsYtd}
          otherIncomeYtd={otherIncomeYtd}
          setOtherIncomeYtd={setOtherIncomeYtd}
          businessExpensesYtd={businessExpensesYtd}
          setBusinessExpensesYtd={setBusinessExpensesYtd}
          ytdIncome={ytdIncome}
          projectedFullYearIncome={projectedFullYearIncome}
          projectedExpenses={projectedExpenses}
          projectedNetIncome={projectedNetIncome}
          forecastMilestones={forecastMilestones}
          setCurrencyField={setCurrencyField}
          formatCurrency={formatCurrency}
        />
      )}

      {activeStep === 3 && (
        <ProposalStepThree
          clientName={clientName}
          taxYear={taxYear}
          beforeIncome={grossIncome}
          beforeTaxableIncome={taxableIncome}
          beforeTaxOwed={estimatedTax}
          beforeBalance={balanceDue}
          selectedStrategyIds={selectedStrategyIds}
          setSelectedStrategyIds={setSelectedStrategyIds}
        />
      )}

      {activeStep === 4 && (
        <ProposalStepFour
          clientName={clientName}
          taxYear={taxYear}
          filingStatus={filingStatus}
          beforeIncome={grossIncome}
          beforeTaxableIncome={taxableIncome}
          beforeTaxOwed={estimatedTax}
          beforeBalance={balanceDue}
          selectedStrategyIds={selectedStrategyIds}
          formatCurrency={formatCurrency}
        />
      )}

      <div className="mt-5 flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={activeStep === 1}
          className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={activeStep === 4}
          className="rounded-lg bg-[var(--brand-600)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand-700)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {activeStep < 4 ? `Next: ${steps[activeStep].title} ->` : 'Completed'}
        </button>
      </div>
    </div>
  )
}

export default ProposalBuilderView
