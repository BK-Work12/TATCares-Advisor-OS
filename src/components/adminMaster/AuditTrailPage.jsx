import { Download, Search, ChevronDown } from 'lucide-react'

const auditEvents = [
  {
    time: '14:47:23 today',
    user: 'Angela Bernard',
    userInitials: 'AB',
    userColor: 'bg-[#2F7D79]',
    role: 'RM',
    roleClass: 'bg-[#2F7D79] text-white',
    action: 'Pipeline stage change',
    detail: 'Marcus Hill moved Stage 2 -> 3',
    record: 'client_20410',
    location: 'Katy',
  },
  {
    time: '14:33:08 today',
    user: 'System',
    userInitials: 'SYS',
    userColor: 'bg-[#98A2B3]',
    role: 'System',
    roleClass: 'bg-[#98A2B3] text-white',
    action: 'Document auto-lock',
    detail: '24hr window elapsed on client upload',
    record: 'doc_88421',
    location: 'Downtown',
  },
  {
    time: '14:25:12 today',
    user: 'AI Ashley',
    userInitials: 'AI',
    userColor: 'bg-[#5B4A8B]',
    role: 'AI',
    roleClass: 'bg-[#5B4A8B] text-white',
    action: 'Lead qualified',
    detail: 'Rodriguez, M. routed to Angela · Priority: High',
    record: 'lead_01284',
    location: 'Katy',
  },
  {
    time: '14:09:44 today',
    user: 'Stripe',
    userInitials: '$',
    userColor: 'bg-[#635BFF]',
    role: 'System',
    roleClass: 'bg-[#635BFF] text-white',
    action: 'Payment success',
    detail: 'Quarterly subscription renewal · $349.00',
    record: 'ch_1Nxyz...',
    location: 'Downtown',
  },
  {
    time: '13:48:02 today',
    user: 'Yvonne',
    userInitials: 'YC',
    userColor: 'bg-gradient-to-br from-[#5B4A8B] to-[#7a64b5]',
    role: 'Admin',
    roleClass: 'bg-[#5B4A8B] text-white',
    action: 'AI module config',
    detail: 'Updated Strategy Generator prompt to v2.4.1',
    record: 'ai_strategy',
    location: 'System',
  },
  {
    time: '12:55:38 today',
    user: 'Angela Bernard',
    userInitials: 'AB',
    userColor: 'bg-[#2F7D79]',
    role: 'RM',
    roleClass: 'bg-[#2F7D79] text-white',
    action: 'Document unlock',
    detail: 'Sarah Williams W-2 unlocked (manual override)',
    record: 'doc_88402',
    location: 'Katy',
  },
]

export default function AuditTrailPage() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">Audit Trail</h2>
          <p className="mt-1 text-sm text-[#667085]">
            All actions logged across all roles · Accessible by Master Admin only · Immutable · Retention: 7 years
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-2 text-xs font-bold text-[#667085]"
        >
          <Download size={12} /> Export logs
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E7E3DD] bg-white">
        <div className="flex flex-wrap items-center gap-2 border-b border-[#F0ECE5] bg-[#FAF8F4] p-3">
          <div className="flex min-w-55 flex-1 items-center gap-2 rounded-lg border border-[#E7E3DD] bg-white px-3 py-2">
            <Search size={13} className="text-[#98A2B3]" />
            <input
              className="w-full border-none bg-transparent text-xs text-[#1F2937] outline-none"
              placeholder="Search by user, action, or record ID..."
            />
          </div>

          {['Today', 'All users', 'All actions', 'All locations'].map((item, index) => (
            <button
              key={item}
              type="button"
              className={`inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold ${
                index === 0
                  ? 'border-[#2F7D79] bg-[#E8F3F1] text-[#1F5E5B]'
                  : 'border-[#E7E3DD] bg-white text-[#667085]'
              }`}
            >
              {item}
              <ChevronDown size={11} />
            </button>
          ))}

          <span className="ml-auto text-[11px] font-mono text-[#98A2B3]">38 events today</span>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-190">
            <div className="grid grid-cols-[130px_160px_100px_1fr_110px_80px] gap-3 border-b border-[#E7E3DD] bg-[#FAF8F4] px-4 py-3 text-[10.5px] font-extrabold uppercase tracking-[.08em] text-[#98A2B3]">
              <div>Timestamp</div>
              <div>User</div>
              <div>Role</div>
              <div>Action</div>
              <div>Record</div>
              <div>Location</div>
            </div>

            {auditEvents.map((event) => (
              <div
                key={`${event.time}-${event.record}`}
                className="grid grid-cols-[130px_160px_100px_1fr_110px_80px] items-center gap-3 border-b border-[#F0ECE5] px-4 py-3 text-xs text-[#1F2937] hover:bg-[#FAF8F4]"
              >
                <div className="font-mono text-[11px] text-[#667085]">{event.time}</div>
                <div className="flex items-center gap-2 font-semibold">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-extrabold text-white ${event.userColor}`}
                  >
                    {event.userInitials}
                  </span>
                  {event.user}
                </div>
                <div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[.05em] ${event.roleClass}`}>
                    {event.role}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">{event.action}</span> - {event.detail}
                </div>
                <div className="font-mono text-[11px] text-[#1F5E5B]">{event.record}</div>
                <div className="text-[11px] text-[#667085]">{event.location}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
