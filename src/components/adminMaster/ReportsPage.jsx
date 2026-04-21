import {
  BarChart3,
  Calendar,
  Check,
  ChevronDown,
  Download,
  Eye,
  Filter,
  Lightbulb,
  MapPin,
  Megaphone,
  Play,
  Plus,
  RefreshCw,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react'

const COLORS = {
  border: '#E7E3DD',
  borderSoft: '#F0ECE5',
  card: '#FFFFFF',
  bg: '#F7F5F2',
  text: '#1F2937',
  textSecondary: '#667085',
  textMuted: '#98A2B3',
  plum: '#5B4A8B',
  plumDeep: '#443569',
  plumTint: '#F3EFFA',
  teal: '#2F7D79',
  tealDeep: '#1F5E5B',
  tealTint: '#E8F3F1',
  tealBright: '#5ECFCA',
  green: '#1A7A4A',
  greenTint: '#E8F5EE',
  red: '#C63D2F',
  redTint: '#FDEBE8',
  gold: '#B8860B',
  goldTint: '#FEF9EE',
  blue: '#2C5F7F',
  blueTint: '#EEF3FC',
  navy: '#1A2838',
}

const FILTERS = [
  { label: 'Period', value: 'QTD · Q2 2026' },
  { label: 'Location', value: 'All locations' },
  { label: 'Advisor', value: 'All advisors' },
  { label: 'Plan', value: 'All plans' },
]

const KPI_ITEMS = [
  { label: 'MRR', value: '$61.2K', delta: 'up', sub: '7.5% QoQ' },
  { label: 'Net New Clients', value: '+14', delta: 'up', sub: '4 vs. Q1' },
  { label: 'Churn Rate', value: '2.1%', delta: 'down', sub: '0.4 pts QoQ' },
  { label: 'Avg Client LTV', value: '$3,920', delta: 'up', sub: '$280 QoQ' },
  { label: 'Proposal Close Rate', value: '68%', delta: 'up', sub: '6 pts QoQ' },
  { label: 'Avg FFS Score', value: '72', delta: 'up', sub: '3 pts QoQ' },
]

const INSIGHTS = [
  {
    title: 'Churn spike concentrated at Downtown (3 of 4 cancellations)',
    body: "All 3 churned clients were on David Chen's roster. This pattern aligns with transition risk.",
    tone: 'alert',
    link: 'View retention report',
  },
  {
    title: 'Rebecca approaching capacity (42 / 40 clients)',
    body: 'At current intake, she exceeds recommended load by early next month.',
    tone: 'warn',
    link: 'View advisor performance',
  },
  {
    title: 'Katy MRR up 12% QoQ, outpacing franchise average',
    body: 'Driven by Tax Planning Package conversion and strong retention at 94%.',
    tone: 'positive',
    link: 'View location P&L',
  },
  {
    title: 'AI Ashley qualification accuracy reached 98.4%',
    body: '1,284 leads processed with only 21 misroutes this period.',
    tone: 'info',
    link: 'View AI usage report',
  },
]

const REPORT_CARDS = [
  {
    title: 'Financial Performance',
    desc: 'Revenue by location, plan, and advisor. MRR and collections trends.',
    preview: '$61.2K MRR · +7.5% QoQ',
    tone: 'financial',
  },
  {
    title: 'Client Health & Retention',
    desc: 'Churn cohorts, FFS distribution, and 30-day inactivity flags.',
    preview: '91% retention · 4 churn this Q',
    tone: 'client',
  },
  {
    title: 'Advisor Performance',
    desc: 'Capacity, close rate, and FFS movement by advisor roster.',
    preview: 'Rebecca leads close rate',
    tone: 'advisor',
    adminOnly: true,
  },
  {
    title: 'Pipeline Conversion',
    desc: 'Eight-stage conversion, bottlenecks, and velocity by location.',
    preview: '68% close rate · 9 closing',
    tone: 'pipeline',
  },
  {
    title: 'AI Usage & Costs',
    desc: 'Calls by module, error rate, token spend, and ROI per automation.',
    preview: '2,240 calls · $186 spend',
    tone: 'ai',
    adminOnly: true,
  },
  {
    title: 'Marketing Attribution',
    desc: 'Leads by channel, CAC by source, and campaign ROI summary.',
    preview: 'EDDM leads · $42 CAC',
    tone: 'marketing',
  },
]

const SCHEDULED = [
  {
    name: 'Monday Morning CEO Snapshot',
    desc: 'Executive KPIs and prior week performance',
    recipients: 'Yvonne only',
    cadence: 'Weekly · Mon 7:00 AM',
    nextRun: 'Mon, Apr 27',
  },
  {
    name: 'Monthly Advisor Scorecards',
    desc: 'Advisor breakdown plus CEO summary',
    recipients: 'All advisors + CEO',
    cadence: '1st of month · 8:00 AM',
    nextRun: 'Fri, May 1',
  },
  {
    name: 'Quarterly Board Report',
    desc: 'Growth, retention, and expansion status',
    recipients: 'Yvonne + Angela',
    cadence: 'Quarter end',
    nextRun: 'Tue, Jun 30',
  },
]

const SAVED_REPORTS = [
  {
    name: 'David Chen handover impact',
    filter: 'Downtown · Last 90d',
    owner: 'Yvonne',
    lastRun: '2 days ago',
  },
  {
    name: 'Katy Grand Opening ROI tracker',
    filter: 'Katy · May 1 onward',
    owner: 'Yvonne',
    lastRun: 'Yesterday',
  },
]

function toneStyles(tone) {
  if (tone === 'alert') return { dot: COLORS.red }
  if (tone === 'warn') return { dot: COLORS.gold }
  if (tone === 'positive') return { dot: COLORS.green }
  return { dot: COLORS.teal }
}

function cardTone(tone) {
  if (tone === 'financial') return { bg: COLORS.greenTint, color: COLORS.green, icon: BarChart3 }
  if (tone === 'client') return { bg: COLORS.tealTint, color: COLORS.tealDeep, icon: Users }
  if (tone === 'advisor') return { bg: COLORS.blueTint, color: COLORS.blue, icon: BarChart3 }
  if (tone === 'pipeline') return { bg: COLORS.goldTint, color: '#7A5A00', icon: Filter }
  if (tone === 'ai') return { bg: COLORS.plumTint, color: COLORS.plumDeep, icon: Sparkles }
  return { bg: COLORS.redTint, color: COLORS.red, icon: Megaphone }
}

export default function ReportsTabPage() {
  return (
    <section className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.text }}>
              Reports
            </h2>
            <span
              className="rounded-md px-2 py-1 text-[10px] font-extrabold uppercase"
              style={{ background: COLORS.plumTint, color: COLORS.plumDeep, letterSpacing: '0.06em' }}
            >
              CEO View
            </span>
          </div>
          <p className="text-sm" style={{ color: COLORS.textSecondary }}>
            Franchise-wide analytics, recurring schedules, and custom report templates.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold"
            style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
          >
            <Download size={12} /> Export all
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold"
            style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
          >
            <Calendar size={12} /> Schedule
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-white"
            style={{ background: COLORS.plum }}
          >
            <Plus size={12} /> New Report
          </button>
        </div>
      </header>

      <div
        className="flex flex-wrap items-center gap-2 rounded-2xl border p-3"
        style={{ background: COLORS.card, borderColor: COLORS.border }}
      >
        {FILTERS.map((f, index) => (
          <div key={f.label} className="flex items-center gap-2">
            <span
              className="text-[10px] font-extrabold uppercase"
              style={{ color: COLORS.textMuted, letterSpacing: '0.09em' }}
            >
              {f.label}
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-semibold"
              style={{ borderColor: COLORS.border, color: COLORS.text }}
            >
              {f.value}
              <ChevronDown size={12} />
            </button>
            {index === 0 ? <span className="mx-1 hidden h-5 w-px sm:inline" style={{ background: COLORS.border }} /> : null}
          </div>
        ))}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-bold"
            style={{ background: COLORS.tealTint, borderColor: 'rgba(47,125,121,.2)', color: COLORS.tealDeep }}
          >
            <RefreshCw size={11} /> Comparing to Q1 2026
          </span>
          <button
            type="button"
            className="rounded-lg border px-3 py-1.5 text-xs font-bold"
            style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {KPI_ITEMS.map((item) => (
          <article
            key={item.label}
            className="relative overflow-hidden rounded-2xl border px-4 py-4"
            style={{ background: COLORS.card, borderColor: COLORS.border }}
          >
            <p
              className="mb-1 text-[10px] font-extrabold uppercase"
              style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}
            >
              {item.label}
            </p>
            <p className="mb-1 text-2xl font-extrabold tracking-tight" style={{ color: COLORS.text }}>
              {item.value}
            </p>
            <p className="text-[11px] font-bold" style={{ color: item.delta === 'up' ? COLORS.green : COLORS.red }}>
              {item.delta === 'up' ? 'Up' : 'Down'} {item.sub}
            </p>
          </article>
        ))}
      </div>

      <section
        className="relative overflow-hidden rounded-2xl border p-4"
        style={{
          borderColor: 'rgba(91,74,139,.15)',
          background: 'linear-gradient(135deg,#F3EFFA 0%,#EEF3FC 100%)',
        }}
      >
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="grid h-8 w-8 place-items-center rounded-lg text-white"
              style={{ background: COLORS.plum }}
            >
              <Lightbulb size={15} />
            </div>
            <div>
              <p className="text-sm font-bold" style={{ color: COLORS.plumDeep }}>
                AI-detected insights this period
              </p>
              <p className="text-xs" style={{ color: COLORS.textSecondary }}>
                4 items flagged for attention from trend anomalies.
              </p>
            </div>
          </div>
          <button type="button" className="text-xs font-bold" style={{ color: COLORS.plumDeep }}>
            Settings
          </button>
        </div>

        <div className="grid gap-2 md:grid-cols-2">
          {INSIGHTS.map((insight) => {
            const tone = toneStyles(insight.tone)
            return (
              <article
                key={insight.title}
                className="rounded-xl border p-3"
                style={{ background: COLORS.card, borderColor: COLORS.borderSoft }}
              >
                <div className="mb-1 flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full" style={{ background: tone.dot }} />
                  <div>
                    <p className="text-sm font-bold leading-snug" style={{ color: COLORS.text }}>
                      {insight.title}
                    </p>
                    <p className="mt-1 text-xs" style={{ color: COLORS.textSecondary }}>
                      {insight.body}
                    </p>
                    <button
                      type="button"
                      className="mt-2 text-xs font-bold"
                      style={{ color: COLORS.plumDeep }}
                    >
                      {insight.link} -&gt;
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section
        className="relative flex flex-col gap-3 overflow-hidden rounded-2xl p-5 lg:flex-row lg:items-center"
        style={{ background: 'linear-gradient(135deg,#1A2838 0%,#2A3F56 100%)' }}
      >
        <div
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
          style={{ background: 'rgba(94,207,202,.16)', color: COLORS.tealBright }}
        >
          <BarChart3 size={20} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-white">Build a custom report</p>
          <p className="text-sm text-white/70">
            Mix any metric and dimension, then save as template or schedule delivery.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-1 rounded-lg px-4 py-2 text-sm font-bold"
          style={{ background: COLORS.tealBright, color: COLORS.navy }}
        >
          <Plus size={13} /> Open report builder
        </button>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold" style={{ color: COLORS.text }}>
            Standard Reports
          </h3>
          <span
            className="rounded-md px-2 py-1 text-[11px] font-semibold"
            style={{ background: COLORS.bg, color: COLORS.textMuted }}
          >
            6 reports
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {REPORT_CARDS.map((card) => {
            const theme = cardTone(card.tone)
            const Icon = theme.icon
            return (
              <article
                key={card.title}
                className="flex min-h-45 flex-col rounded-2xl border p-4"
                style={{ background: COLORS.card, borderColor: COLORS.border }}
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-lg"
                    style={{ background: theme.bg, color: theme.color }}
                  >
                    <Icon size={16} />
                  </div>
                  {card.adminOnly ? (
                    <span
                      className="rounded-md px-2 py-1 text-[9px] font-extrabold uppercase text-white"
                      style={{ background: COLORS.plum, letterSpacing: '0.06em' }}
                    >
                      Admin-only
                    </span>
                  ) : null}
                </div>

                <p className="text-sm font-bold" style={{ color: COLORS.text }}>
                  {card.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: COLORS.textSecondary }}>
                  {card.desc}
                </p>

                <div className="mt-auto flex items-center justify-between border-t pt-3" style={{ borderColor: COLORS.borderSoft }}>
                  <p className="text-[11px]" style={{ color: COLORS.textMuted }}>
                    {card.preview}
                  </p>
                  <div className="flex items-center gap-1">
                    <IconButton ariaLabel="Export">
                      <Download size={12} />
                    </IconButton>
                    <IconButton ariaLabel="Preview">
                      <Eye size={12} />
                    </IconButton>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold" style={{ color: COLORS.text }}>
            Scheduled Reports
          </h3>
          <span
            className="rounded-md px-2 py-1 text-[11px] font-semibold"
            style={{ background: COLORS.bg, color: COLORS.textMuted }}
          >
            3 active
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border" style={{ background: COLORS.card, borderColor: COLORS.border }}>
          {SCHEDULED.map((row, index) => (
            <div
              key={row.name}
              className="grid gap-2 px-4 py-3 md:grid-cols-[1.3fr_1fr_1fr_120px]"
              style={{ borderTop: index === 0 ? 'none' : `1px solid ${COLORS.borderSoft}` }}
            >
              <div>
                <p className="text-sm font-bold" style={{ color: COLORS.text }}>
                  {row.name}
                </p>
                <p className="text-xs" style={{ color: COLORS.textSecondary }}>
                  {row.desc}
                </p>
              </div>
              <p className="text-xs" style={{ color: COLORS.textSecondary }}>
                {row.recipients}
              </p>
              <p className="inline-flex items-center gap-1 text-xs" style={{ color: COLORS.textSecondary }}>
                <Calendar size={11} /> {row.cadence}
              </p>
              <div className="flex items-center justify-between gap-2 md:justify-end">
                <p className="text-[11px] font-semibold" style={{ color: COLORS.textSecondary }}>
                  {row.nextRun}
                </p>
                <span
                  className="rounded-md px-2 py-1 text-[10px] font-extrabold uppercase"
                  style={{ background: COLORS.greenTint, color: COLORS.green, letterSpacing: '0.06em' }}
                >
                  Active
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold" style={{ color: COLORS.text }}>
            Saved Custom Reports
          </h3>
          <span
            className="rounded-md px-2 py-1 text-[11px] font-semibold"
            style={{ background: COLORS.bg, color: COLORS.textMuted }}
          >
            2 saved
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border" style={{ background: COLORS.card, borderColor: COLORS.border }}>
          {SAVED_REPORTS.map((row, index) => (
            <div
              key={row.name}
              className="grid gap-2 px-4 py-3 md:grid-cols-[1.4fr_1fr_120px_110px_120px]"
              style={{ borderTop: index === 0 ? 'none' : `1px solid ${COLORS.borderSoft}` }}
            >
              <p className="text-sm font-bold" style={{ color: COLORS.text }}>
                {row.name}
              </p>
              <p className="text-xs" style={{ color: COLORS.textSecondary }}>
                {row.filter}
              </p>
              <p className="text-xs" style={{ color: COLORS.textSecondary }}>
                {row.owner}
              </p>
              <p className="text-xs" style={{ color: COLORS.textSecondary }}>
                {row.lastRun}
              </p>
              <div className="flex items-center gap-1 md:justify-end">
                <IconButton ariaLabel="Run report">
                  <Play size={12} />
                </IconButton>
                <IconButton ariaLabel="Share report">
                  <Share2 size={12} />
                </IconButton>
                <IconButton ariaLabel="Duplicate report">
                  <MapPin size={12} />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}

function IconButton({ children, ariaLabel }) {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className="grid h-7 w-7 place-items-center rounded-md border"
      style={{ borderColor: COLORS.border, color: COLORS.textMuted, background: COLORS.card }}
    >
      {children}
    </button>
  )
}
