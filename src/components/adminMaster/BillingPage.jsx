import { Check, ExternalLink, RefreshCw, Search } from 'lucide-react'

const COLORS = {
  border: '#E7E3DD',
  borderSoft: '#F0ECE5',
  card: '#FFFFFF',
  bg: '#F7F5F2',
  text: '#1F2937',
  textSecondary: '#667085',
  textMuted: '#98A2B3',
  plum: '#5B4A8B',
  teal: '#2F7D79',
  tealTint: '#E8F3F1',
  green: '#1A7A4A',
  red: '#C63D2F',
  gold: '#B8860B',
}

const HERO_STATS = [
  { label: 'MRR', value: '$61,243', sub: '+$4,280 vs. March', tone: 'up' },
  { label: 'ARR', value: '$734,916', sub: '+7.5% QoQ', tone: 'up' },
  { label: 'Past Due', value: '$1,047', sub: '3 subs · 2 dunning', tone: 'down' },
  { label: 'Churn (30d)', value: '2.1%', sub: '4 cancellations · 14 new', tone: 'neutral' },
]

const PLANS = [
  {
    name: 'Quarterly Subscription',
    price: '$349',
    per: '/qtr',
    tag: { label: 'Core', bg: COLORS.tealTint, color: '#1F5E5B' },
    features: ['TATCares Client Portal', 'AI Ashley Concierge', 'Financial Freedom Score', 'Quarterly check-in'],
    foot: '148 active',
  },
  {
    name: 'Tax Planning Package',
    price: '$1,500',
    per: '+ one-time',
    tag: { label: 'Strategy', bg: '#F3EFFA', color: '#443569' },
    features: ['Full return analysis', 'Custom tax plan (5-17 strategies)', 'Implementation roadmap', '2 hours advisor time'],
    foot: '24 delivered YTD',
  },
  {
    name: 'Seasonal Bundle',
    price: '$1,700',
    per: '/season',
    tag: { label: 'Bundle', bg: '#FEF9EE', color: '#7A5A00' },
    features: ['Tax prep + planning', 'Client Portal access', 'Audit protection', 'Priority advisor access'],
    foot: '26 active',
  },
]

const SUBSCRIPTIONS = [
  { client: 'Marcus Hill', id: 'sub_1ABc...Xy9z', plan: 'Quarterly', status: 'Past due', amount: '$349.00', nextCharge: 'Apr 4 (overdue)', pastDue: '13 days' },
  { client: 'Rachel Gonzalez', id: 'sub_2Def...Ab3k', plan: 'Quarterly', status: 'Dunning', amount: '$349.00', nextCharge: 'Apr 9 (overdue)', pastDue: '8 days' },
  { client: 'Thomas Park', id: 'sub_3Ghi...Cd7m', plan: 'Seasonal', status: 'Dunning', amount: '$349.00', nextCharge: 'Apr 13 (overdue)', pastDue: '4 days' },
]

export default function BillingTabPage() {
  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.text }}>
              Billing & Subscriptions
            </h2>
            <span
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-extrabold uppercase text-white"
              style={{ background: '#635BFF', letterSpacing: '0.06em' }}
            >
              Stripe Live
            </span>
          </div>
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            All subscriptions managed via Stripe Billing · Last sync 2 min ago · 174 active subs · 3 past due
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold"
            style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
          >
            <RefreshCw size={12} /> Sync now
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold"
            style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
          >
            <ExternalLink size={12} /> Open Stripe Dashboard
          </button>
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {HERO_STATS.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border px-5 py-4"
            style={{ background: COLORS.card, borderColor: COLORS.border }}
          >
            <p className="mb-2 text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
              {stat.label}
            </p>
            <p className="text-3xl font-extrabold tracking-tight" style={{ color: stat.tone === 'down' ? COLORS.red : COLORS.text }}>
              {stat.value}
            </p>
            <p className="mt-1 text-xs" style={{ color: stat.tone === 'up' ? COLORS.green : stat.tone === 'down' ? COLORS.red : COLORS.textSecondary }}>
              {stat.sub}
            </p>
          </article>
        ))}
      </div>

      <section className="space-y-3">
        <h3 className="text-base font-bold" style={{ color: COLORS.text }}>
          Plans
        </h3>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className="rounded-2xl border p-5"
              style={{ background: COLORS.card, borderColor: COLORS.border }}
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-bold" style={{ color: COLORS.text }}>
                    {plan.name}
                  </p>
                  <p className="mt-1 text-3xl font-extrabold tracking-tight" style={{ color: COLORS.text }}>
                    {plan.price}
                    <span className="ml-1 text-xs font-semibold" style={{ color: COLORS.textMuted }}>
                      {plan.per}
                    </span>
                  </p>
                </div>
                <span
                  className="rounded-md px-2 py-1 text-[10px] font-bold"
                  style={{ background: plan.tag.bg, color: plan.tag.color }}
                >
                  {plan.tag.label}
                </span>
              </div>

              <div className="space-y-1">
                {plan.features.map((feature) => (
                  <p key={feature} className="inline-flex items-center gap-1 text-xs" style={{ color: COLORS.textSecondary }}>
                    <Check size={11} color={COLORS.green} /> {feature}
                  </p>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between border-t pt-3" style={{ borderColor: COLORS.borderSoft }}>
                <span className="text-xs" style={{ color: COLORS.textSecondary }}>
                  {plan.foot}
                </span>
                <button type="button" className="text-xs font-bold" style={{ color: '#1F5E5B' }}>
                  Edit in Stripe
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="rounded-2xl border" style={{ background: COLORS.card, borderColor: COLORS.border }}>
          <div className="flex flex-wrap items-center gap-2 border-b px-4 py-3" style={{ borderColor: COLORS.borderSoft, background: '#FAF8F4' }}>
            <label
              className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border px-3 py-2"
              style={{ borderColor: COLORS.border, background: COLORS.card }}
            >
              <Search size={12} color={COLORS.textMuted} />
              <input
                type="text"
                placeholder="Search subscriptions, clients, invoices..."
                className="w-full bg-transparent text-xs outline-none"
              />
            </label>

            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-bold"
              style={{ borderColor: COLORS.red, background: '#FDEBE8', color: COLORS.red }}
            >
              Past due <span className="rounded-full bg-[#C63D2F] px-1.5 py-0.5 text-[10px] text-white">3</span>
            </button>
            <button type="button" className="rounded-lg border px-2.5 py-1.5 text-xs font-semibold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
              All plans
            </button>
            <button type="button" className="rounded-lg border px-2.5 py-1.5 text-xs font-semibold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
              All statuses
            </button>
            <span className="ml-auto text-[11px]" style={{ color: COLORS.textMuted }}>
              3 of 177 subscriptions
            </span>
          </div>

          <div className="overflow-x-auto">
            <div
              className="grid min-w-[920px] grid-cols-[1.5fr_1fr_1fr_1fr_1.1fr_1fr_130px] gap-3 border-b px-4 py-3 text-[10px] font-extrabold uppercase"
              style={{ borderColor: COLORS.borderSoft, color: COLORS.textMuted, letterSpacing: '0.08em' }}
            >
              <span>Client</span>
              <span>Plan</span>
              <span>Status</span>
              <span>Amount</span>
              <span>Next Charge</span>
              <span>Days Past Due</span>
              <span className="text-right">Actions</span>
            </div>

            {SUBSCRIPTIONS.map((row) => {
              const isPastDue = row.status === 'Past due'
              return (
                <div
                  key={row.client}
                  className="grid min-w-[920px] grid-cols-[1.5fr_1fr_1fr_1fr_1.1fr_1fr_130px] gap-3 border-b px-4 py-3 text-sm"
                  style={{ borderColor: COLORS.borderSoft, color: COLORS.text }}
                >
                  <div>
                    <p className="font-bold">{row.client}</p>
                    <p className="font-mono text-[11px]" style={{ color: COLORS.textMuted }}>{row.id}</p>
                  </div>
                  <span>{row.plan}</span>
                  <span style={{ color: isPastDue ? COLORS.red : '#7A5A00' }}>{row.status}</span>
                  <span className="font-mono">{row.amount}</span>
                  <span className="font-mono text-xs" style={{ color: COLORS.textSecondary }}>{row.nextCharge}</span>
                  <span className="font-mono" style={{ color: isPastDue ? COLORS.red : '#7A5A00' }}>{row.pastDue}</span>
                  <div className="text-right">
                    <button
                      type="button"
                      className="rounded-lg border px-2.5 py-1.5 text-xs font-bold"
                      style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
                    >
                      {isPastDue ? 'Retry charge' : 'View Stripe'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

    </section>
  )
}
