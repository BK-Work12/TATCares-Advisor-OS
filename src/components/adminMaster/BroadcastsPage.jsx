import {
  AlertTriangle,
  Bell,
  Calendar,
  ChevronDown,
  Download,
  MapPin,
  Megaphone,
  Search,
  Plus,
  Send,
  Sparkles,
  Star,
  User,
  Users,
  Briefcase,
} from 'lucide-react'

const stats = [
  { label: 'Total broadcasts', value: '8', sub: 'Sent last 30 days' },
  { label: 'Avg delivery', value: '99%', sub: 'Fast portal + email fanout' },
  { label: 'Avg open rate', value: '74%', sub: '+9 pts QoQ', subColor: '#1A7A4A' },
  { label: 'Scheduled', value: '1', sub: 'Next send Apr 22' },
]

const history = [
  {
    title: 'Q2 deadline reminder - 10 days out',
    sub: 'Your Q2 estimated tax payment is due...',
    audience: 'All clients (187)',
    sent: 'Apr 15 - 9:00 AM',
    delivered: '186 / 187',
    openRate: '72%',
    status: 'Sent',
    statusType: 'sent',
  },
  {
    title: "Katy Grand Opening - You're invited!",
    sub: 'Join us May 20 at 12 PM for ribbon cutting...',
    audience: 'Katy clients (24)',
    sent: 'Apr 10 - 10:30 AM',
    delivered: '24 / 24',
    openRate: '88%',
    status: 'Sent',
    statusType: 'sent',
  },
  {
    title: 'New Augusta Rule checklist available',
    sub: "We've published an updated 2026 checklist for...",
    audience: 'Augusta strategy (71)',
    sent: 'Mar 30 - 2:15 PM',
    delivered: '71 / 71',
    openRate: '54%',
    status: 'Sent',
    statusType: 'sent',
  },
  {
    title: "Pearland opening soon - Expression of interest",
    sub: 'Scheduled for Apr 22 - Drafted',
    audience: 'Pearland waitlist (2)',
    sent: 'Scheduled Apr 22',
    delivered: '-',
    openRate: '-',
    status: 'Scheduled',
    statusType: 'scheduled',
  },
]

function statusStyle(type) {
  if (type === 'scheduled') return 'bg-[#FEF9EE] text-[#7A5A00]'
  return 'bg-[#E8F5EE] text-[#1A7A4A]'
}

export default function BroadcastsPage() {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">Broadcasts</h2>
            <span className="rounded-md bg-[#F3EFFA] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.04em] text-[#443569]">
              New
            </span>
          </div>
          <p className="mt-1 max-w-4xl text-sm text-[#667085]">
            Push announcements directly to client portals. Choose audience by location, advisor, plan, or specific clients. All sends are logged to audit trail.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-2 lg:flex lg:flex-wrap">
          <button type="button" className="inline-flex w-full items-center justify-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-2 text-xs font-bold text-[#667085] sm:w-auto">
            <Calendar size={12} /> Schedule
          </button>
          <button type="button" className="inline-flex w-full items-center justify-center gap-1 rounded-lg bg-[#5B4A8B] px-3 py-2 text-xs font-bold text-white sm:w-auto">
            <Send size={12} /> Send Now
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#1A2838] to-[#2A3F56] px-5 py-4 text-white">
        <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(94,207,202,.1)_0%,transparent_70%)]" />
        <div className="relative flex flex-wrap items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(94,207,202,.15)] text-[#5ECFCA]">
            <Megaphone size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold">4 high-priority announcements sent this month</div>
            <div className="text-[11.5px] text-white/70">Best performer: Katy Grand Opening invite with 88% open rate</div>
          </div>
          <button type="button" className="w-full rounded-lg bg-[#5ECFCA] px-3 py-1.5 text-[11.5px] font-bold text-[#1A2838] sm:w-auto">
            View analytics
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-2xl border border-[#E7E3DD] bg-white px-5 py-4 shadow-sm">
            <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#98A2B3]">{stat.label}</div>
            <div className="mt-1 text-3xl font-extrabold text-[#1F2937]">{stat.value}</div>
            <div className="mt-1 text-[11.5px]" style={{ color: stat.subColor || '#667085' }}>
              {stat.sub}
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-2xl border border-[#E7E3DD] bg-[#F7F7F7] p-5 shadow-sm">
          <div className="mb-5 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#98A2B3]">Compose Broadcast</div>

          <div className="space-y-4">
            <div>
              <div className="mb-1 flex items-baseline gap-1.5">
                <label className="text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#98A2B3]">Title</label>
                <span className="text-[10.5px] text-[#98A2B3]">· Shows as notification headline</span>
              </div>
              <input
                type="text"
                value="Q2 estimated tax payment due June 15"
                readOnly
                className="h-10 w-full rounded-[9px] border border-[#D6D3CD] bg-white px-3 text-sm text-[#1F2937]"
              />
            </div>

            <div>
              <label className="mb-1 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#98A2B3]">Message</label>
              <textarea
                readOnly
                value="Your Q2 estimated tax payment is due June 15. Log in to your portal to view the calculated amount and payment voucher. Reach out to your advisor if your income has changed significantly from Q1."
                className="min-h-20 w-full rounded-[9px] border border-[#D6D3CD] bg-white px-3 py-2 text-sm text-[#1F2937]"
              />
            </div>

            <div>
              <div className="mb-1 flex items-baseline gap-1.5">
                <label className="text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#98A2B3]">Action Link</label>
                <span className="text-[10.5px] text-[#98A2B3]">· Optional · Deep link into client portal</span>
              </div>
              <button
                type="button"
                className="flex h-10 w-full items-center justify-between rounded-[9px] border border-[#D6D3CD] bg-white px-3 text-sm text-[#1F2937]"
              >
                <span>Open My Plan</span>
                <ChevronDown size={14} className="text-[#667085]" />
              </button>
            </div>

            <div>
              <label className="mb-2 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#98A2B3]">Priority</label>
              <div className="flex flex-wrap gap-1.5">
                <button type="button" className="rounded-[9px] border border-[#D6D3CD] bg-white px-3 py-1.5 text-sm text-[#475467]">
                  Normal
                </button>
                <button type="button" className="inline-flex items-center gap-1 rounded-[9px] border border-[#5B4A8B] bg-[#5B4A8B] px-3 py-1.5 text-sm font-semibold text-white">
                  <Star size={12} /> Important
                </button>
                <button type="button" className="inline-flex items-center gap-1 rounded-[9px] border border-[#D6D3CD] bg-white px-3 py-1.5 text-sm text-[#475467]">
                  <AlertTriangle size={12} /> Urgent
                </button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#98A2B3]">Audience</label>
              <div className="flex flex-wrap gap-1.5">
                <button type="button" className="inline-flex items-center gap-1 rounded-[9px] border border-[#5B4A8B] bg-[#5B4A8B] px-3 py-1.5 text-sm font-semibold text-white">
                  <Users size={12} /> All clients (187)
                </button>
                <button type="button" className="inline-flex items-center gap-1 rounded-[9px] border border-[#D6D3CD] bg-white px-3 py-1.5 text-sm text-[#475467]">
                  <MapPin size={12} /> By location
                </button>
                <button type="button" className="inline-flex items-center gap-1 rounded-[9px] border border-[#D6D3CD] bg-white px-3 py-1.5 text-sm text-[#475467]">
                  <User size={12} /> By advisor
                </button>
                <button type="button" className="inline-flex items-center gap-1 rounded-[9px] border border-[#D6D3CD] bg-white px-3 py-1.5 text-sm text-[#475467]">
                  <Briefcase size={12} /> By plan
                </button>
                <button type="button" className="inline-flex items-center gap-1 rounded-[9px] border border-[#D6D3CD] bg-white px-3 py-1.5 text-sm text-[#475467]">
                  <Star size={12} /> By strategy
                </button>
                <button type="button" className="inline-flex items-center gap-1 rounded-[9px] border border-[#D6D3CD] bg-white px-3 py-1.5 text-sm text-[#475467]">
                  <Search size={12} /> Specific clients
                </button>
              </div>
              <p className="mt-2 text-[11.5px] text-[#98A2B3]">
                Estimated reach: <span className="font-bold text-[#101828]">187 clients</span> · Delivers to portal & sends email to those with email notifications enabled
              </p>
            </div>

            <div className="rounded-xl border border-[#E7E3DD] bg-[#F0EFED] p-3.5">
              <label className="flex items-start gap-2 text-[13px] leading-relaxed text-[#0B1730]"><input type="checkbox" defaultChecked className="mt-1" /> Also send as email</label>
              <label className="mt-2.5 flex items-start gap-2 text-[13px] leading-relaxed text-[#0B1730]"><input type="checkbox" defaultChecked className="mt-1" /> Respect client notification preferences</label>
              <label className="mt-2.5 flex items-start gap-2 text-[13px] leading-relaxed text-[#0B1730]"><input type="checkbox" className="mt-1" /> Mark as read-required (shows on login until acknowledged)</label>
            </div>
          </div>
        </article>

        <article className="rounded-2xl border border-[#E7E3DD] bg-[#F0EFED] p-4 lg:sticky lg:top-3 lg:h-fit">
          <div className="mb-3 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#98A2B3]">Preview · Client Portal</div>
          <div className="rounded-xl border border-[#D6D3CD] bg-white p-3.5">
            <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#E8F3F1] text-[#1F5E5B]">
              <Bell size={14} />
            </div>
            <div className="mb-1.5 flex items-center gap-2">
              <span className="inline-flex rounded bg-[#FEF2C7] px-1.5 py-0.5 text-[9px] font-extrabold tracking-[0.05em] text-[#7A5A00]">Important</span>
              <span className="font-mono text-[10px] text-[#98A2B3]">Just now</span>
            </div>
            <h3 className="text-sm font-bold text-[#0B1730]">Q2 estimated tax payment due June 15</h3>
            <p className="mt-1 text-xs leading-relaxed text-[#667085]">
              Your Q2 estimated tax payment is due June 15. Log in to your portal to view the calculated amount and payment voucher...
            </p>
            <button type="button" className="mt-2 rounded-md bg-[#2F7D79] px-3 py-1.5 text-xs font-bold text-white">
              Open My Plan →
            </button>
            <div className="mt-2 font-mono text-[10px] text-[#98A2B3]">From Yvonne Hollis-Cobb · TAT U Inc.</div>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-[#98A2B3]">
            This is how your broadcast will appear in the client portal Notifications tab. Clients with email notifications on will also receive an email.
          </p>
        </article>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-[15px] font-bold text-[#1F2937]">Recent broadcasts</h3>
        <span className="font-mono text-[11px] text-[#98A2B3]">Last 30 days - 8 sent</span>
      </div>

      <div className="space-y-3 md:hidden">
        {history.map((row) => (
          <article key={row.title} className="rounded-2xl border border-[#E7E3DD] bg-white p-4 shadow-sm">
            <h4 className="text-sm font-semibold text-[#1F2937]">{row.title}</h4>
            <p className="mt-0.5 text-[11px] text-[#98A2B3]">{row.sub}</p>

            <dl className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
              <div>
                <dt className="font-bold uppercase tracking-[0.06em] text-[#98A2B3]">Audience</dt>
                <dd className="mt-0.5 text-[#667085]">{row.audience}</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-[0.06em] text-[#98A2B3]">Sent</dt>
                <dd className="mt-0.5 font-mono text-[#667085]">{row.sent}</dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-[0.06em] text-[#98A2B3]">Delivered</dt>
                <dd className="mt-0.5">
                  <span className="rounded bg-[#F7F5F2] px-2 py-0.5 font-mono text-[11px] text-[#667085]">{row.delivered}</span>
                </dd>
              </div>
              <div>
                <dt className="font-bold uppercase tracking-[0.06em] text-[#98A2B3]">Open Rate</dt>
                <dd className="mt-0.5">
                  <span className={`rounded px-2 py-0.5 font-mono text-[11px] ${row.openRate === '-' ? 'bg-[#F7F5F2] text-[#98A2B3]' : 'bg-[#E8F5EE] text-[#1A7A4A]'}`}>
                    {row.openRate}
                  </span>
                </dd>
              </div>
            </dl>

            <div className="mt-3 text-right">
              <span className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.05em] ${statusStyle(row.statusType)}`}>
                {row.status}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-[#E7E3DD] bg-white shadow-sm md:block">
        <table className="min-w-240 w-full border-collapse">
          <thead className="bg-[#FAF8F4]">
            <tr className="text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#98A2B3]">
              <th className="px-4 py-3 text-left">Broadcast</th>
              <th className="px-4 py-3 text-left">Audience</th>
              <th className="px-4 py-3 text-left">Sent</th>
              <th className="px-4 py-3 text-left">Delivered</th>
              <th className="px-4 py-3 text-left">Open Rate</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((row) => (
              <tr key={row.title} className="border-t border-[#F0ECE5] text-sm text-[#1F2937]">
                <td className="px-4 py-3">
                  <div className="font-semibold">{row.title}</div>
                  <div className="text-[11px] text-[#98A2B3]">{row.sub}</div>
                </td>
                <td className="px-4 py-3 text-[#667085]">{row.audience}</td>
                <td className="px-4 py-3 font-mono text-[11px] text-[#667085]">{row.sent}</td>
                <td className="px-4 py-3">
                  <span className="rounded bg-[#F7F5F2] px-2 py-0.5 font-mono text-[11px] text-[#667085]">{row.delivered}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded px-2 py-0.5 font-mono text-[11px] ${row.openRate === '-' ? 'bg-[#F7F5F2] text-[#98A2B3]' : 'bg-[#E8F5EE] text-[#1A7A4A]'}`}>
                    {row.openRate}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`rounded px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.05em] ${statusStyle(row.statusType)}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


    </section>
  )
}
