import {
  BarChart3,
  ChevronDown,
  Download,
  FileText,
  MoreHorizontal,
  Newspaper,
  Plus,
  Search,
  Upload,
  Video,
} from 'lucide-react'

const stats = [
  { label: 'Total content', value: '14', sub: 'Published this Q' },
  { label: 'Articles', value: '6', sub: '3 featured' },
  { label: 'Videos', value: '2', sub: 'Avg 4:12 watch' },
  { label: 'Checklists', value: '6', sub: '243 downloads' },
  { label: 'Avg open rate', value: '58%', sub: '+6 pts QoQ', subColor: '#1A7A4A' },
]

const items = [
  {
    type: 'article',
    source: 'IRS.gov',
    date: 'Apr 10, 2026',
    title: 'IRS extends S-Corp election deadline — what high-income earners need to know in 2026',
    tags: ['S01 S-Corp', 'S02 LLC Conversion', '→ 71 clients'],
    featured: true,
    highlighted: true,
  },
  {
    type: 'article',
    source: 'Forbes Tax',
    date: 'Apr 8, 2026',
    title: 'Defined Benefit Plans in 2026: contribution limits and who qualifies',
    tags: ['S08 Defined Benefit', 'S06 Cash Balance', '→ 9 clients'],
  },
  {
    type: 'article',
    source: 'TaxNotes',
    date: 'Apr 5, 2026',
    title: 'Augusta Rule: how to document your 14 rental days properly',
    tags: ['S09 Augusta Rule', '→ 71 clients'],
  },
  {
    type: 'video',
    source: 'Yvonne · 4:12',
    date: 'Apr 2, 2026',
    title: 'Q2 estimated tax payments explained — when, how much, and safe harbor rules',
    tags: ['All plans', '→ 174 clients'],
  },
  {
    type: 'checklist',
    source: 'PDF · 2 pages',
    date: 'Apr 1, 2026',
    title: 'S-Corp election checklist — step-by-step guide',
    tags: ['S01 S-Corp', '→ 87 clients', '124 downloads'],
  },
  {
    type: 'checklist',
    source: 'PDF · 1 page',
    date: 'Mar 30, 2026',
    title: 'Augusta Rule documentation checklist',
    tags: ['S09 Augusta Rule', '→ 71 clients', '68 downloads'],
  },
  {
    type: 'article',
    source: 'Journal of Accountancy',
    date: 'Mar 30, 2026',
    title: 'Reasonable salary benchmarks for S-Corp owners by industry',
    tags: ['S01 S-Corp', '→ 87 clients'],
  },
  {
    type: 'checklist',
    source: 'PDF · 1 page',
    date: 'Mar 22, 2026',
    title: 'Q2 tax prep checklist — actions before June 30',
    tags: ['All plans', '→ 187 clients', '51 downloads'],
  },
]

function typeUi(type) {
  if (type === 'video') {
    return {
      badgeBg: '#FDEBE8',
      badgeColor: '#C63D2F',
      iconBg: '#FDEBE8',
      iconColor: '#C63D2F',
      Icon: Video,
      label: 'Video',
    }
  }
  if (type === 'checklist') {
    return {
      badgeBg: '#FEF9EE',
      badgeColor: '#7A5A00',
      iconBg: '#FEF9EE',
      iconColor: '#7A5A00',
      Icon: Upload,
      label: 'Checklist',
    }
  }
  return {
    badgeBg: '#E8F3F1',
    badgeColor: '#1F5E5B',
    iconBg: '#E8F3F1',
    iconColor: '#1F5E5B',
    Icon: FileText,
    label: 'Article',
  }
}

function NewsRow({ item }) {
  const ui = typeUi(item.type)

  return (
    <article
      className={`flex flex-col gap-3 rounded-xl border bg-white p-4 transition sm:flex-row sm:items-center sm:gap-4 ${
        item.highlighted ? 'border-[#5B4A8B] shadow-[0_0_0_1px_#5B4A8B]' : 'border-[#E7E3DD] hover:-translate-y-0.5 hover:border-[#5B4A8B]'
      }`}
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
        style={{ background: ui.iconBg, color: ui.iconColor }}
      >
        <ui.Icon size={16} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center gap-2">
          {item.featured ? (
            <span className="rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.05em] text-white" style={{ background: '#B8860B' }}>
              Featured
            </span>
          ) : null}
          <span className="rounded px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.05em]" style={{ background: ui.badgeBg, color: ui.badgeColor }}>
            {ui.label}
          </span>
          <span className="text-[10.5px] font-semibold text-[#98A2B3]">{item.source}</span>
          <span className="font-mono text-[10px] text-[#98A2B3]">{item.date}</span>
        </div>
        <h3 className="text-[13px] font-bold leading-snug text-[#1F2937]">{item.title}</h3>
        <div className="mt-2 flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded border border-[#E7E3DD] bg-[#F7F5F2] px-1.5 py-0.5 text-[9.5px] font-bold text-[#667085]">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex shrink-0 gap-1 self-end sm:self-center">
        <button type="button" className="rounded-md border border-[#E7E3DD] p-1.5 text-[#98A2B3] hover:border-[#5B4A8B] hover:bg-[#F3EFFA] hover:text-[#443569]">
          <BarChart3 size={12} />
        </button>
        <button type="button" className="rounded-md border border-[#E7E3DD] p-1.5 text-[#98A2B3] hover:border-[#5B4A8B] hover:bg-[#F3EFFA] hover:text-[#443569]">
          <MoreHorizontal size={12} />
        </button>
      </div>
    </article>
  )
}

export default function TaxNewsPage() {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">Tax News</h2>
            <span className="rounded-md bg-[#E8F3F1] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.04em] text-[#1F5E5B]">
              14 published
            </span>
          </div>
          <p className="mt-1 max-w-4xl text-sm text-[#667085]">
            Curate articles, videos, and downloadable checklists · Each item auto-targets clients based on their active strategies · Appears in the client portal Tax News tab
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-2 text-xs font-bold text-[#667085]">
            <Upload size={12} /> Upload Checklist
          </button>
          <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-2 text-xs font-bold text-[#667085]">
            <Video size={12} /> Add Video
          </button>
          <button type="button" className="inline-flex items-center gap-1 rounded-lg bg-[#5B4A8B] px-3 py-2 text-xs font-bold text-white">
            <Plus size={12} /> New Article
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-[#1A2838] to-[#2A3F56] px-5 py-4 text-white">
        <div className="absolute -right-5 -top-5 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(94,207,202,.1)_0%,transparent_70%)]" />
        <div className="relative flex flex-wrap items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[rgba(94,207,202,.15)] text-[#5ECFCA]">
            <Newspaper size={16} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-bold">Featured article pushed to 187 clients · Avg open rate 64%</div>
            <div className="text-[11.5px] text-white/70">"IRS extends S-Corp election deadline" reached 71 clients with active S-Corp strategies · 23 clicked through</div>
          </div>
          <button type="button" className="rounded-lg bg-[#5ECFCA] px-3 py-1.5 text-[11.5px] font-bold text-[#1A2838]">
            Feed analytics
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
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

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-[#E7E3DD] bg-white p-3">
        <label className="relative min-w-52 flex-1">
          <Search size={13} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]" />
          <input
            type="text"
            placeholder="Search title, source, or strategy tag..."
            className="w-full rounded-lg border border-[#E7E3DD] bg-white py-1.5 pl-8 pr-2 text-xs text-[#1F2937] outline-none"
          />
        </label>
        <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#2F7D79] bg-[#E8F3F1] px-3 py-1.5 text-xs font-semibold text-[#1F5E5B]">
          All types <ChevronDown size={11} />
        </button>
        <button type="button" className="rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]">Articles (6)</button>
        <button type="button" className="rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]">Videos (2)</button>
        <button type="button" className="rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]">Checklists (6)</button>
        <button type="button" className="rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]">Published</button>
        <span className="ml-auto font-mono text-[11px] text-[#98A2B3]">14 of 14</span>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => (
          <NewsRow key={`${item.type}-${item.title}`} item={item} />
        ))}
      </div>

      <div className="mt-2 flex justify-center">
        <button type="button" className="inline-flex items-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-bold text-[#667085]">
          <Download size={11} /> Show all 14 items
        </button>
      </div>
    </section>
  )
}
