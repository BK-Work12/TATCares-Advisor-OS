import {
  Edit3,
  Link2,
  Plus,
  Settings2,
  UserPlus,
  Users,
} from 'lucide-react'

const partners = [
  {
    initials: 'MW',
    avatarBg: '#1B3A5C',
    name: 'Marcus Webb, CFP',
    company: 'Pinnacle Wealth Advisors · (713) 555-0190',
    category: 'Wealth Management',
    categoryBg: '#1B3A5C',
    linked: 'Defined Benefit Plan (S08)',
    stat1: '$420M',
    stat1Label: 'AUM',
    stat2: '18.4%',
    stat2Label: 'ROI',
    stat3: '34',
    stat3Label: 'TAT clients',
    urgent: true,
  },
  {
    initials: 'DR',
    avatarBg: '#5B4A8B',
    name: 'Diana Reyes, JD',
    company: 'Nexus Law Group · (713) 555-0214',
    category: 'Business Attorney',
    categoryBg: '#5B4A8B',
    linked: 'S-Corp Election (S01), LLC Conversion (S02)',
    stat1: '200+',
    stat1Label: 'S-Corps filed',
    stat2: '5 days',
    stat2Label: 'Turnaround',
    stat3: '61',
    stat3Label: 'TAT clients',
    urgent: true,
  },
  {
    initials: 'JO',
    avatarBg: '#1A7A4A',
    name: 'James Okonkwo, REALTOR',
    company: 'Houston Premium Properties · (713) 555-0177',
    category: 'Real Estate',
    categoryBg: '#1A7A4A',
    linked: 'Augusta Rule (S09), Cost Segregation (S14)',
    stat1: '312',
    stat1Label: 'Closed',
    stat2: '6.8%',
    stat2Label: 'Cap rate',
    stat3: '28',
    stat3Label: 'TAT clients',
    urgent: true,
  },
  {
    initials: 'RK',
    avatarBg: '#C0663A',
    name: 'Rachel Kim, CLU',
    company: 'Shield Benefits Group · (713) 555-0231',
    category: 'Insurance',
    categoryBg: '#C0663A',
    linked: 'Defined Benefit Plan (S08), Captive Insurance (S17)',
    stat1: '180+',
    stat1Label: 'Policies',
    stat2: '$12M+',
    stat2Label: 'Sheltered',
    stat3: '19',
    stat3Label: 'TAT clients',
    urgent: false,
  },
  {
    initials: 'TB',
    avatarBg: '#2C5F7F',
    name: 'Tom Bradley, CPP',
    company: 'Streamline Payroll Co. · (713) 555-0108',
    category: 'Payroll',
    categoryBg: '#2C5F7F',
    linked: 'S-Corp Election (S01), Hiring Your Kids (S10)',
    stat1: '500+',
    stat1Label: 'On payroll',
    stat2: '48 hr',
    stat2Label: 'Setup',
    stat3: '47',
    stat3Label: 'TAT clients',
    urgent: false,
  },
  {
    initials: 'AT',
    avatarBg: '#B8860B',
    name: 'Angela Torres, NMLS',
    company: 'Summit Capital Lending · (713) 555-0165',
    category: 'Lending',
    categoryBg: '#B8860B',
    linked: 'Cost Segregation (S14), Opportunity Zones (S15)',
    stat1: '$80M+',
    stat1Label: 'Closed',
    stat2: '6.2%',
    stat2Label: 'Avg rate',
    stat3: '22',
    stat3Label: 'TAT clients',
    urgent: false,
  },
]

function PartnerCard({ partner }) {
  return (
    <article className="flex flex-col rounded-2xl border border-[#E7E3DD] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#5B4A8B] hover:shadow-md">
      <div className="mb-3 flex items-start gap-3.5">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold text-white"
          style={{ background: partner.avatarBg }}
        >
          {partner.initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-bold text-[#1F2937]">{partner.name}</h3>
          <p className="mt-0.5 text-[11.5px] text-[#667085]">{partner.company}</p>
          <span
            className="mt-1.5 inline-block rounded-md px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.04em] text-white"
            style={{ background: partner.categoryBg }}
          >
            {partner.category}
          </span>
        </div>
      </div>

      <div className="mb-3 flex items-center gap-2 rounded-lg bg-[#F7F5F2] px-2.5 py-2 text-[11px] text-[#667085]">
        <Link2 size={13} className="shrink-0 text-[#1F5E5B]" />
        <span>
          Linked to: <strong className="font-bold text-[#1F2937]">{partner.linked}</strong>
        </span>
      </div>

      <div className="mt-auto grid grid-cols-3 gap-3 border-t border-[#F0ECE5] pt-3">
        <div>
          <div className="text-[15px] font-extrabold text-[#1F2937]">{partner.stat1}</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#98A2B3]">{partner.stat1Label}</div>
        </div>
        <div>
          <div className="text-[15px] font-extrabold text-[#1F2937]">{partner.stat2}</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#98A2B3]">{partner.stat2Label}</div>
        </div>
        <div>
          <div className="text-[15px] font-extrabold text-[#1F2937]">{partner.stat3}</div>
          <div className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#98A2B3]">{partner.stat3Label}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 border-t border-[#F0ECE5] pt-3">
        {partner.urgent ? (
          <span className="rounded-md bg-[#FEF9EE] px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.04em] text-[#7A5A00]">
            Urgent flag
          </span>
        ) : null}
        <span className="rounded-md bg-[#E8F5EE] px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.04em] text-[#1A7A4A]">
          Active
        </span>
        <div className="ml-auto flex gap-1.5">
          <button type="button" className="rounded-md border border-[#E7E3DD] p-1.5 text-[#667085] hover:border-[#5B4A8B] hover:bg-[#F3EFFA] hover:text-[#443569]">
            <Edit3 size={12} />
          </button>
          <button type="button" className="rounded-md border border-[#E7E3DD] p-1.5 text-[#667085] hover:border-[#5B4A8B] hover:bg-[#F3EFFA] hover:text-[#443569]">
            <Settings2 size={12} />
          </button>
        </div>
      </div>
    </article>
  )
}

export default function PartnerNetworkPage() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">Partner Network</h2>
            <span className="rounded-md bg-[#E8F3F1] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.04em] text-[#1F5E5B]">
              6 approved
            </span>
          </div>
          <p className="mt-1 text-sm text-[#667085]">
            Curated vendor partners that clients can request intros to · Each partner links to strategies they help execute · Visible in the client portal
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-2 text-xs font-bold text-[#667085]">
            <Users size={12} /> Intro requests (3)
          </button>
          <button type="button" className="inline-flex items-center gap-1 rounded-lg bg-[#5B4A8B] px-3 py-2 text-xs font-bold text-white">
            <Plus size={12} /> Add Partner
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#1A2838] to-[#2A3F56] px-5 py-4 text-white">
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(94,207,202,.12)_0%,transparent_70%)]" />
        <div className="relative flex flex-wrap items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(94,207,202,.15)] text-[#5ECFCA]">
            <UserPlus size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold">3 intro requests pending your review</div>
            <div className="text-[11.5px] text-white/70">Clients have asked for intros to Marcus Webb (2), Diana Reyes (1)</div>
          </div>
          <button type="button" className="rounded-lg bg-[#5ECFCA] px-3 py-1.5 text-[11.5px] font-bold text-[#1A2838]">
            Review queue
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <article className="rounded-2xl border border-[#E7E3DD] bg-white px-5 py-4 shadow-sm">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#98A2B3]">Active partners</div>
          <div className="mt-1 text-3xl font-extrabold text-[#1F2937]">6</div>
          <div className="mt-1 text-[11.5px] text-[#667085]">Across 6 categories</div>
        </article>
        <article className="rounded-2xl border border-[#E7E3DD] bg-white px-5 py-4 shadow-sm">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#98A2B3]">Intro requests</div>
          <div className="mt-1 text-3xl font-extrabold text-[#1F2937]">47</div>
          <div className="mt-1 text-[11.5px] text-[#667085]">This quarter</div>
        </article>
        <article className="rounded-2xl border border-[#E7E3DD] bg-white px-5 py-4 shadow-sm">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#98A2B3]">Conversion rate</div>
          <div className="mt-1 text-3xl font-extrabold text-[#1F2937]">73%</div>
          <div className="mt-1 text-[11.5px] text-[#1A7A4A]">+8 pts QoQ</div>
        </article>
        <article className="rounded-2xl border border-[#E7E3DD] bg-white px-5 py-4 shadow-sm">
          <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#98A2B3]">Top partner</div>
          <div className="mt-1 text-sm font-extrabold text-[#1F2937]">Diana Reyes</div>
          <div className="mt-1 text-[11.5px] text-[#667085]">61 TAT clients</div>
        </article>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#E7E3DD] bg-white p-3">
        <div className="inline-flex items-center gap-1 rounded-lg border border-[#2F7D79] bg-[#E8F3F1] px-3 py-1.5 text-xs font-semibold text-[#1F5E5B]">
          All types
        </div>
        <button type="button" className="rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]">Wealth</button>
        <button type="button" className="rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]">Legal</button>
        <button type="button" className="rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]">Insurance</button>
        <button type="button" className="rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]">Lending</button>
        <span className="ml-auto text-[11px] font-mono text-[#98A2B3]">6 partners</span>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {partners.map((partner) => (
          <PartnerCard key={partner.name} partner={partner} />
        ))}
      </div>
    </section>
  )
}
