function ProposalStepOne({
  clientName,
  setClientName,
  email,
  setEmail,
  taxYear,
  setTaxYear,
  filingStatus,
  setFilingStatus,
  grossIncome,
  setGrossIncome,
  standardDeduction,
  setStandardDeduction,
  otherDeductions,
  setOtherDeductions,
  taxCredits,
  setTaxCredits,
  taxableIncome,
  estimatedTax,
  balanceDue,
  setCurrencyField,
  formatCurrency,
  autofillFromStatus,
}) {
  return (
    <>
      <section className="mb-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-5 py-4 text-sm font-bold text-slate-900">Client Information</div>
        <div className="grid gap-4 p-5 md:grid-cols-3">
          <label className="space-y-1">
            <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Client Name</span>
            <input
              type="text"
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[var(--brand-500)] focus:bg-white"
            />
          </label>

          <label className="space-y-1">
            <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[var(--brand-500)] focus:bg-white"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Tax Year</span>
              <select
                value={taxYear}
                onChange={(event) => setTaxYear(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[var(--brand-500)] focus:bg-white"
              >
                <option>2024</option>
                <option>2023</option>
              </select>
            </label>

            <label className="space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Filing Status</span>
              <select
                value={filingStatus}
                onChange={(event) => setFilingStatus(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm outline-none focus:border-[var(--brand-500)] focus:bg-white"
              >
                <option>Single</option>
                <option>MFJ</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <h3 className="text-sm font-bold text-slate-900">Prior Year Return - Tax Assessment (Before Plan)</h3>
          <button
            type="button"
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-400"
          >
            Upload Return to Auto-Fill
          </button>
        </div>

        <div className="grid gap-6 p-5 lg:grid-cols-2">
          <div className="space-y-4">
            <label className="space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Gross Income</span>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                <span className="text-sm font-semibold text-slate-400">$</span>
                <input
                  type="text"
                  value={formatCurrency(grossIncome)}
                  onChange={setCurrencyField(setGrossIncome)}
                  className="w-full bg-transparent px-2 py-2.5 text-sm outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400">Total income from all sources</p>
            </label>

            <label className="space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Standard Deduction</span>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                <span className="text-sm font-semibold text-slate-400">$</span>
                <input
                  type="text"
                  value={formatCurrency(standardDeduction)}
                  onChange={setCurrencyField(setStandardDeduction)}
                  className="w-full bg-transparent px-2 py-2.5 text-sm outline-none"
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span>Auto values: $14,600 single / $29,200 MFJ</span>
                <button
                  type="button"
                  onClick={autofillFromStatus}
                  className="font-semibold text-[var(--brand-700)] hover:text-[var(--brand-600)]"
                >
                  Use default
                </button>
              </div>
            </label>

            <label className="space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Other Deductions / Adj.</span>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                <span className="text-sm font-semibold text-slate-400">$</span>
                <input
                  type="text"
                  value={formatCurrency(otherDeductions)}
                  onChange={setCurrencyField(setOtherDeductions)}
                  className="w-full bg-transparent px-2 py-2.5 text-sm outline-none"
                />
              </div>
            </label>

            <label className="space-y-1">
              <span className="block text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">Tax Credits</span>
              <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3">
                <span className="text-sm font-semibold text-slate-400">$</span>
                <input
                  type="text"
                  value={formatCurrency(taxCredits)}
                  onChange={setCurrencyField(setTaxCredits)}
                  className="w-full bg-transparent px-2 py-2.5 text-sm outline-none"
                />
              </div>
            </label>
          </div>

          <div className="rounded-2xl bg-[#1B2A4A] p-5 text-white shadow-lg">
            <div className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
              Live Calculation - Before Plan
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between border-b border-white/10 py-2">
                <span className="text-white/70">Gross Income</span>
                <span className="font-semibold">${formatCurrency(grossIncome)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 py-2">
                <span className="text-white/70">Standard Deduction</span>
                <span className="font-semibold">(${formatCurrency(standardDeduction)})</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 py-2">
                <span className="text-white/70">Other Deductions</span>
                <span className="font-semibold">(${formatCurrency(otherDeductions)})</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/20 py-2 text-base font-bold">
                <span>Taxable Income</span>
                <span>${formatCurrency(taxableIncome)}</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/10 py-2">
                <span className="text-white/70">Estimated Tax Owed</span>
                <span className="font-semibold">${formatCurrency(estimatedTax)}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-white/70">Credits</span>
                <span className="font-semibold">${formatCurrency(taxCredits)}</span>
              </div>
            </div>

            <div className="mt-3 border-t border-white/20 pt-3">
              <div className="flex items-end justify-between">
                <span className="text-sm font-bold">Balance Due</span>
                <span className="text-3xl font-black text-[#FF6B6B]">${formatCurrency(balanceDue)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProposalStepOne
