import { useRef } from 'react'

const documentTypes = [
  { key: 'w2', icon: '🧾', title: 'Pay Stubs / W-2', subtitle: 'YTD wages' },
  { key: 'bank', icon: '🏦', title: 'Bank Statements', subtitle: 'Deposits, income' },
  { key: 'cards', icon: '💳', title: 'Credit Cards', subtitle: 'Business expenses' },
  { key: 'pnl', icon: '📊', title: 'P&L Statement', subtitle: 'Business net income' },
  { key: 'prior', icon: '📑', title: 'Prior Year Return', subtitle: 'Auto-fill fields' },
  { key: 'rental', icon: '🏠', title: 'Rental Docs', subtitle: 'Schedule E income' },
]

function ProposalStepTwo({
  clientName,
  taxYear,
  documentFiles,
  handleDocumentUpload,
  monthsOfData,
  setMonthsOfData,
  wagesYtd,
  setWagesYtd,
  businessYtd,
  setBusinessYtd,
  rentalYtd,
  setRentalYtd,
  capitalGainsYtd,
  setCapitalGainsYtd,
  otherIncomeYtd,
  setOtherIncomeYtd,
  businessExpensesYtd,
  setBusinessExpensesYtd,
  ytdIncome,
  projectedFullYearIncome,
  projectedExpenses,
  projectedNetIncome,
  forecastMilestones,
  setCurrencyField,
  formatCurrency,
}) {
  const fileInputRefs = useRef({})

  return (
    <>
      <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-xl font-black tracking-tight text-slate-900">Client Proposal Builder</h3>
        <p className="mt-1 text-sm text-slate-500">
          {clientName || 'Unnamed Client'} · {taxYear} Tax Year
        </p>
      </section>

      <section className="mb-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 text-sm font-bold text-slate-900">
          Upload Current Year Documents
        </div>
        <div className="p-5">
          <p className="mb-4 text-sm text-slate-500">
            Upload available files and toggle status. AI extraction hooks can plug into these document slots.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
            {documentTypes.map((doc) => {
              const uploadedFile = documentFiles[doc.key]
              const uploaded = Boolean(uploadedFile)

              return (
                <div
                  key={doc.key}
                  className={`rounded-xl border-2 border-dashed p-4 text-center transition ${
                    uploaded
                      ? 'border-emerald-300 bg-emerald-50'
                      : 'border-slate-200 bg-white hover:border-[var(--brand-500)] hover:bg-slate-50'
                  }`}
                >
                  <div className="text-2xl">{doc.icon}</div>
                  <div className="mt-1 text-xs font-bold text-[#1B2A4A]">{doc.title}</div>
                  <div className="mt-1 text-[10px] text-slate-400">{doc.subtitle}</div>

                  {uploaded && (
                    <div className="mt-2 truncate text-[10px] font-medium text-emerald-700" title={uploadedFile.name}>
                      {uploadedFile.name}
                    </div>
                  )}

                  <div
                    className={`mt-3 inline-flex rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.08em] ${
                      uploaded ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-[var(--brand-700)]'
                    }`}
                  >
                    {uploaded ? 'Uploaded' : '+ Upload'}
                  </div>

                  <div className="mt-3 flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRefs.current[doc.key]?.click()}
                      className="rounded-md border border-slate-300 px-2.5 py-1 text-[10px] font-semibold text-slate-600 hover:border-slate-400"
                    >
                      {uploaded ? 'Change' : 'Select File'}
                    </button>

                    {uploaded && (
                      <button
                        type="button"
                        onClick={() => handleDocumentUpload(doc.key, null)}
                        className="rounded-md border border-rose-200 px-2.5 py-1 text-[10px] font-semibold text-rose-600 hover:bg-rose-50"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <input
                    ref={(element) => {
                      fileInputRefs.current[doc.key] = element
                    }}
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(event) => handleDocumentUpload(doc.key, event.target.files?.[0] ?? null)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="text-sm font-bold text-slate-900">Year-to-Date Income Mapping</div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Data through:</span>
            <select
              value={monthsOfData}
              onChange={(event) => setMonthsOfData(Number(event.target.value))}
              className="rounded-lg border border-slate-300 bg-white px-2 py-1 text-sm font-semibold text-slate-700"
            >
              <option value={3}>3 months (Mar)</option>
              <option value={4}>4 months (Apr)</option>
              <option value={5}>5 months (May)</option>
              <option value={6}>6 months (Jun)</option>
            </select>
          </div>
        </div>

        <div className="grid gap-6 p-5 lg:grid-cols-2">
          <div className="space-y-3">
            {[
              ['W-2 / Wages YTD', wagesYtd, setWagesYtd],
              ['Self-Employment / Business YTD', businessYtd, setBusinessYtd],
              ['Rental Income YTD', rentalYtd, setRentalYtd],
              ['Capital Gains YTD', capitalGainsYtd, setCapitalGainsYtd],
              ['Other Income YTD', otherIncomeYtd, setOtherIncomeYtd],
              ['Business Expenses YTD', businessExpensesYtd, setBusinessExpensesYtd],
            ].map(([label, value, setter]) => (
              <div key={label} className="grid gap-2 sm:grid-cols-[220px_1fr] sm:items-center">
                <label className="text-[11px] font-bold uppercase tracking-[0.08em] text-slate-600">{label}</label>
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                  <span className="text-sm font-semibold text-slate-400">$</span>
                  <input
                    type="text"
                    value={formatCurrency(value)}
                    onChange={setCurrencyField(setter)}
                    className="w-full bg-transparent px-2 py-2.5 text-sm outline-none"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.12em] text-[#0E7C86]">12/31 Forecast</div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between py-1">
                <span className="text-slate-500">YTD Income ({monthsOfData} mos)</span>
                <span className="font-semibold text-slate-700">${formatCurrency(ytdIncome)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-[#1B2A4A]">Projected Full-Year</span>
                <span className="font-bold text-[#0E7C86]">${formatCurrency(projectedFullYearIncome)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Projected Expenses</span>
                <span className="font-semibold text-slate-700">${formatCurrency(projectedExpenses)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-semibold text-[#1B2A4A]">Projected Net Income</span>
                <span className="font-bold text-[#0E7C86]">${formatCurrency(projectedNetIncome)}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Monthly Projection (Apr-Dec)
              </div>
              <div className="space-y-2">
                {forecastMilestones.map((milestone) => (
                  <div key={milestone.label} className="flex items-center gap-2 text-[11px]">
                    <span className="w-8 font-semibold text-slate-500">{milestone.label}</span>
                    <div className="h-2 flex-1 rounded-full bg-slate-200">
                      <div
                        className={`h-full rounded-full ${milestone.label === 'Dec' ? 'bg-emerald-600' : 'bg-[#0E7C86]'}`}
                        style={{ width: `${milestone.pct}%` }}
                      />
                    </div>
                    <span
                      className={`w-20 text-right font-semibold ${
                        milestone.label === 'Dec' ? 'text-emerald-700' : 'text-slate-600'
                      }`}
                    >
                      ${formatCurrency(milestone.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProposalStepTwo
