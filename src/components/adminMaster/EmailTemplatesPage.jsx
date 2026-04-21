import { useMemo, useRef, useState } from 'react'
import {
  BarChart3,
  Bold,
  Calendar,
  Code2,
  Copy,
  Download,
  Eye,
  Italic,
  Link,
  List,
  PenSquare,
  Plus,
  Save,
  Send,
  Underline,
  Upload,
} from 'lucide-react'

const summaryTiles = [
  { label: 'Total templates', value: '12', sub: '9 active · 3 draft' },
  { label: 'Pushed to staff', value: '9', sub: 'Available in RM & Advisor OS' },
  { label: 'Sends this month', value: '342', sub: '+18% vs. March', subColor: '#1A7A4A' },
  { label: 'Open rate (avg)', value: '68%', sub: 'Industry avg: 42%', subColor: '#1A7A4A' },
]

const starterTemplates = [
  {
    id: 'welcome',
    name: 'Welcome to TakeAway Tax - next steps inside',
    category: 'Onboarding',
    sent: 89,
    roles: ['RM', 'Adv'],
    status: 'active',
    subtitle: 'Onboarding · Sent to new clients after account creation · 48hr setup window',
    subject: "Welcome to TakeAway Tax, {{ClientFirstName}} - let's get you set up",
    body:
      'Hi {{ClientFirstName}},\n\nWelcome to TakeAway Tax - we are thrilled you have joined us.\n\nYour {{SubscriptionPlan}} subscription is now active, and I will be your Relationship Manager as you get started. Your assigned Advisor, {{AdvisorName}} at our {{LocationName}} office, is already looking forward to meeting you.\n\nHere is what happens next:\n\n1. Complete your onboarding questionnaire at {{PortalLink}}\n2. Upload your prior-year tax return\n3. {{AdvisorName}} will reach out within one business day\n\nWarmly,\n{{RMName}}\nRelationship Manager · TakeAway Tax',
    updatedBy: 'Melanie',
    updatedAt: 'Apr 14, 2026',
    openRate: '72%',
  },
  {
    id: 'followup',
    name: 'Following up on our conversation',
    category: 'Follow-up',
    sent: 64,
    roles: ['RM', 'Adv'],
    status: 'active',
    subtitle: 'Follow-up · Discovery and proposal-stage follow-up template',
    subject: 'Following up, {{ClientFirstName}}',
    body: 'Hi {{ClientFirstName}},\n\nWanted to follow up on our recent conversation and share next steps.\n\nBest,\n{{AdvisorName}}',
    updatedBy: 'Yvonne',
    updatedAt: 'Apr 9, 2026',
    openRate: '68%',
  },
  {
    id: 'proposal',
    name: 'Your personalized proposal is ready',
    category: 'Follow-up',
    sent: 42,
    roles: ['Adv'],
    status: 'active',
    subtitle: 'Follow-up · Sent after proposal generation',
    subject: 'Your proposal is ready, {{ClientFirstName}}',
    body: 'Hi {{ClientFirstName}},\n\nYour personalized proposal is now ready to review in the portal.\n\n{{AdvisorName}}',
    updatedBy: 'Rebecca',
    updatedAt: 'Apr 2, 2026',
    openRate: '70%',
  },
  {
    id: 'deadline',
    name: 'Tax deadline countdown',
    category: 'Campaigns',
    sent: 0,
    roles: ['RM'],
    status: 'draft',
    subtitle: 'Campaigns · Deadline reminder draft',
    subject: 'Tax deadline in {{DaysUntilDeadline}} days',
    body: 'Hi {{ClientFirstName}},\n\nFriendly reminder that your deadline is approaching.\n\n- TATCares Team',
    updatedBy: 'Melanie',
    updatedAt: 'Apr 16, 2026',
    openRate: '-',
  },
]

const mergeFields = [
  { token: '{{ClientFirstName}}', desc: 'Given name - Marcus' },
  { token: '{{ClientEmail}}', desc: 'Primary email on file' },
  { token: '{{SubscriptionPlan}}', desc: 'Active plan name' },
  { token: '{{PortalLink}}', desc: 'Personalized portal URL' },
  { token: '{{AdvisorName}}', desc: "Client's assigned Advisor" },
  { token: '{{RMName}}', desc: 'Assigned RM' },
  { token: '{{LocationName}}', desc: 'Office location' },
  { token: '{{RenewalDate}}', desc: 'Next charge date' },
]

const usageRows = [
  { name: 'Angela Bernard', role: 'Relationship Manager', sent: '54 sends', open: '74%', initials: 'AB', color: '#2F7D79', width: '100%' },
  { name: 'Yvonne Hollis-Cobb', role: 'CEO · Lead Advisor', sent: '22 sends', open: '68%', initials: 'YC', color: '#1B3A5C', width: '41%' },
  { name: 'Rebecca Mendoza', role: 'Senior Advisor', sent: '13 sends', open: '69%', initials: 'RM', color: '#1B3A5C', width: '24%' },
]

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState(starterTemplates)
  const [selectedId, setSelectedId] = useState('welcome')
  const [activeTab, setActiveTab] = useState('compose')
  const [feedback, setFeedback] = useState('')
  const [subject, setSubject] = useState(starterTemplates[0].subject)
  const [body, setBody] = useState(starterTemplates[0].body)
  const [allowRm, setAllowRm] = useState(true)
  const [allowAdv, setAllowAdv] = useState(true)
  const bodyRef = useRef(null)

  const selectedTemplate = useMemo(() => templates.find((t) => t.id === selectedId) || templates[0], [templates, selectedId])

  function flash(message) {
    setFeedback(message)
    window.clearTimeout(flash.t)
    flash.t = window.setTimeout(() => setFeedback(''), 2200)
  }

  function selectTemplate(id) {
    const next = templates.find((t) => t.id === id)
    if (!next) return
    setSelectedId(id)
    setSubject(next.subject)
    setBody(next.body)
    setActiveTab('compose')
  }

  function saveCurrent(push = false) {
    setTemplates((prev) =>
      prev.map((t) =>
        t.id === selectedId
          ? {
              ...t,
              subject,
              body,
              status: 'active',
              updatedBy: 'Yvonne',
              updatedAt: 'Apr 21, 2026',
            }
          : t,
      ),
    )
    flash(push ? 'Saved and pushed to staff' : 'Template saved')
  }

  function duplicateTemplate() {
    const src = selectedTemplate
    const id = `${src.id}-${Date.now()}`
    const copy = {
      ...src,
      id,
      name: `${src.name} (Copy)`,
      status: 'draft',
      sent: 0,
      openRate: '-',
      updatedBy: 'Yvonne',
      updatedAt: 'Apr 21, 2026',
    }
    setTemplates((prev) => [copy, ...prev])
    setSelectedId(id)
    setSubject(copy.subject)
    setBody(copy.body)
    flash('Template duplicated')
  }

  function newTemplate() {
    const id = `new-${Date.now()}`
    const item = {
      id,
      name: 'Untitled Template',
      category: 'Onboarding',
      sent: 0,
      roles: ['RM'],
      status: 'draft',
      subtitle: 'Draft template · Define purpose and audience',
      subject: 'New subject line',
      body: 'Hi {{ClientFirstName}},\n\n',
      updatedBy: 'Yvonne',
      updatedAt: 'Apr 21, 2026',
      openRate: '-',
    }
    setTemplates((prev) => [item, ...prev])
    setSelectedId(id)
    setSubject(item.subject)
    setBody(item.body)
    setActiveTab('compose')
    flash('New template created')
  }

  function insertToken(token) {
    const area = bodyRef.current
    if (!area) {
      setBody((prev) => `${prev}${token}`)
      return
    }
    const start = area.selectionStart
    const end = area.selectionEnd
    const next = `${body.slice(0, start)}${token}${body.slice(end)}`
    setBody(next)
    requestAnimationFrame(() => {
      area.focus()
      const pos = start + token.length
      area.setSelectionRange(pos, pos)
    })
    flash(`Inserted ${token}`)
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight text-[#1F2937]">Email Templates</h2>
            <span className="rounded-md bg-[#E8F3F1] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.04em] text-[#1F5E5B]">12 templates</span>
          </div>
          <p className="mt-1 max-w-4xl text-sm text-[#667085]">Master-owned email library. Build once, push to every Advisor and RM. Merge fields auto-populate with client data at send time.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => flash('Export started')} className="inline-flex items-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-2 text-xs font-bold text-[#667085]">
            <Download size={12} /> Export
          </button>
          <button type="button" onClick={() => flash('Active templates pushed to staff')} className="inline-flex items-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-2 text-xs font-bold text-[#667085]">
            <Upload size={12} /> Push all active
          </button>
        </div>
      </div>

      {feedback ? <div className="rounded-xl border border-[#B7E4CD] bg-[#E8F5EE] px-3 py-2 text-xs font-semibold text-[#1A7A4A]">{feedback}</div> : null}

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {summaryTiles.map((tile) => (
          <article key={tile.label} className="rounded-2xl border border-[#E7E3DD] bg-white px-5 py-4 shadow-sm">
            <div className="text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#98A2B3]">{tile.label}</div>
            <div className="mt-1 text-3xl font-extrabold text-[#1F2937]">{tile.value}</div>
            <div className="mt-1 text-[11.5px]" style={{ color: tile.subColor || '#667085' }}>
              {tile.sub}
            </div>
          </article>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[340px_1fr]">
        <aside className="overflow-hidden rounded-2xl border border-[#E7E3DD] bg-white shadow-sm">
          <div className="border-b border-[#F0ECE5] bg-[#FAF8F4] px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <div className="text-sm font-bold text-[#1F2937]">Library</div>
              <button type="button" onClick={newTemplate} className="inline-flex items-center gap-1 rounded-md bg-[#5B4A8B] px-2.5 py-1.5 text-[11px] font-bold text-white">
                <Plus size={11} /> New
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Onboarding', 'Follow-up', 'Billing', 'Campaigns'].map((chip, i) => (
                <button key={chip} type="button" onClick={() => flash(`Filter: ${chip}`)} className={`rounded-md border px-2 py-1 text-[10.5px] font-bold ${i === 0 ? 'border-[#5B4A8B] bg-[#F3EFFA] text-[#443569]' : 'border-[#E7E3DD] bg-white text-[#667085]'}`}>
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-155 overflow-y-auto p-2">
            {templates.map((tpl) => {
              const selected = tpl.id === selectedId
              return (
                <button
                  key={tpl.id}
                  type="button"
                  onClick={() => selectTemplate(tpl.id)}
                  className={`mb-1.5 w-full rounded-xl border p-3 text-left transition ${selected ? 'border-[#5B4A8B] bg-[#F3EFFA]' : 'border-transparent hover:bg-[#F7F5F2]'}`}
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <div className="line-clamp-1 text-[12.5px] font-bold text-[#1F2937]">{tpl.name}</div>
                    <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${tpl.status === 'active' ? 'bg-[#1A7A4A]' : 'bg-[#B8860B]'}`} />
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[10.5px] text-[#98A2B3]">
                    <span className="rounded border border-[#E7E3DD] bg-white px-1.5 py-0.5 font-semibold text-[#667085]">{tpl.category}</span>
                    <span>· {tpl.sent ? `${tpl.sent} sent` : 'Draft'}</span>
                    <span className="ml-auto inline-flex gap-1">
                      {tpl.roles.map((r) => (
                        <span key={r} className={`rounded px-1 py-0.5 text-[9px] font-extrabold uppercase ${r === 'RM' ? 'bg-[#E8F3F1] text-[#1F5E5B]' : 'bg-[#EEF3FC] text-[#2C5F7F]'}`}>
                          {r}
                        </span>
                      ))}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </aside>

        <article className="overflow-hidden rounded-2xl border border-[#E7E3DD] bg-white shadow-sm">
          <header className="border-b border-[#F0ECE5] bg-linear-to-br from-[#FAF8F4] to-[#E8F3F1] px-5 py-4">
            <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-[#1F2937]">{selectedTemplate.name}</h3>
                <p className="text-xs text-[#667085]">{selectedTemplate.subtitle}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={duplicateTemplate} className="inline-flex items-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]">
                  <Copy size={12} /> Duplicate
                </button>
                <button type="button" onClick={() => saveCurrent(true)} className="inline-flex items-center gap-1 rounded-lg bg-[#5B4A8B] px-3 py-1.5 text-xs font-bold text-white">
                  <Save size={12} /> Save & push
                </button>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#98A2B3]">
              <span>
                Status: <strong className="text-[#1A7A4A]">{selectedTemplate.status === 'active' ? 'Active' : 'Draft'}</strong>
              </span>
              <span>
                Available: <strong className="text-[#1F2937]">{selectedTemplate.roles.join(' + ')}</strong>
              </span>
              <span>
                Last edited: <strong className="text-[#1F2937]">{selectedTemplate.updatedAt} · {selectedTemplate.updatedBy}</strong>
              </span>
              <span>
                Open rate: <strong className="text-[#1A7A4A]">{selectedTemplate.openRate}</strong>
              </span>
            </div>
          </header>

          <div className="border-b border-[#F0ECE5] px-5">
            <div className="flex flex-wrap gap-1">
              {[
                { id: 'compose', label: 'Compose', icon: PenSquare },
                { id: 'variables', label: 'Merge Fields', icon: Code2 },
                { id: 'push', label: 'Push Settings', icon: Upload },
                { id: 'usage', label: 'Usage', icon: BarChart3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1 border-b-2 px-3 py-2 text-xs font-semibold ${activeTab === tab.id ? 'border-[#2F7D79] text-[#1F5E5B]' : 'border-transparent text-[#98A2B3]'}`}
                >
                  <tab.icon size={12} /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-155 overflow-y-auto px-5 py-4">
            {activeTab === 'compose' ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#98A2B3]">Subject line</label>
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full rounded-lg border border-[#E7E3DD] px-3 py-2 text-sm text-[#1F2937]" />
                </div>

                <div>
                  <label className="mb-1 block text-[10.5px] font-extrabold uppercase tracking-[0.08em] text-[#98A2B3]">Body</label>
                  <div className="flex flex-wrap items-center gap-1 rounded-t-lg border border-b-0 border-[#E7E3DD] bg-[#FAF8F4] p-2">
                    <button type="button" onClick={() => flash('Bold toggled')} className="rounded border border-[#E7E3DD] bg-white px-2 py-1 text-[11px] text-[#667085]"><Bold size={11} /></button>
                    <button type="button" onClick={() => flash('Italic toggled')} className="rounded border border-[#E7E3DD] bg-white px-2 py-1 text-[11px] text-[#667085]"><Italic size={11} /></button>
                    <button type="button" onClick={() => flash('Underline toggled')} className="rounded border border-[#E7E3DD] bg-white px-2 py-1 text-[11px] text-[#667085]"><Underline size={11} /></button>
                    <button type="button" onClick={() => flash('List inserted')} className="rounded border border-[#E7E3DD] bg-white px-2 py-1 text-[11px] text-[#667085]"><List size={11} /></button>
                    <button type="button" onClick={() => flash('Link added')} className="rounded border border-[#E7E3DD] bg-white px-2 py-1 text-[11px] text-[#667085]"><Link size={11} /></button>
                    <span className="mx-1 h-4 w-px bg-[#E7E3DD]" />
                    <button type="button" onClick={() => setActiveTab('variables')} className="inline-flex items-center gap-1 rounded border border-[#5B4A8B] bg-[#F3EFFA] px-2 py-1 text-[11px] font-semibold text-[#443569]">
                      <Code2 size={11} /> Insert merge field
                    </button>
                  </div>
                  <textarea ref={bodyRef} value={body} onChange={(e) => setBody(e.target.value)} className="min-h-56 w-full rounded-b-lg border border-[#E7E3DD] px-3 py-2 text-sm leading-relaxed text-[#1F2937]" />
                </div>

                <div className="rounded-xl border border-[#E7E3DD] bg-[#FAF8F4] p-4">
                  <div className="mb-2 text-[10px] font-extrabold uppercase tracking-widest text-[#98A2B3]">Preview - merged sample</div>
                  <div className="mb-2 border-b border-[#F0ECE5] pb-2 text-sm font-bold text-[#1F2937]">{subject.replace('{{ClientFirstName}}', 'Marcus')}</div>
                  <p className="whitespace-pre-wrap text-[13px] leading-relaxed text-[#1F2937]">
                    {body
                      .replaceAll('{{ClientFirstName}}', 'Marcus')
                      .replaceAll('{{SubscriptionPlan}}', 'Quarterly Subscription')
                      .replaceAll('{{AdvisorName}}', 'Yvonne Hollis-Cobb')
                      .replaceAll('{{RMName}}', 'Angela Bernard')
                      .replaceAll('{{LocationName}}', 'Katy')
                      .replaceAll('{{PortalLink}}', 'portal.tatcares.com/m.hill')}
                  </p>
                </div>
              </div>
            ) : null}

            {activeTab === 'variables' ? (
              <div>
                <div className="mb-3 text-sm font-bold text-[#1F2937]">Available merge fields</div>
                <div className="grid gap-2 sm:grid-cols-2">
                  {mergeFields.map((field) => (
                    <button
                      key={field.token}
                      type="button"
                      onClick={() => insertToken(field.token)}
                      className="rounded-lg border border-[#E7E3DD] bg-[#F7F5F2] p-3 text-left hover:border-[#5B4A8B] hover:bg-[#F3EFFA]"
                    >
                      <div className="font-mono text-xs font-semibold text-[#443569]">{field.token}</div>
                      <div className="mt-1 text-[11px] text-[#98A2B3]">{field.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {activeTab === 'push' ? (
              <div className="space-y-4">
                <div className="text-sm font-bold text-[#1F2937]">Who can use this template</div>
                <div className="space-y-3 rounded-xl border border-[#E7E3DD] p-4">
                  <label className="flex items-center justify-between text-sm text-[#1F2937]">
                    <span>Relationship Manager access</span>
                    <input type="checkbox" checked={allowRm} onChange={(e) => setAllowRm(e.target.checked)} />
                  </label>
                  <label className="flex items-center justify-between text-sm text-[#1F2937]">
                    <span>Advisor access</span>
                    <input type="checkbox" checked={allowAdv} onChange={(e) => setAllowAdv(e.target.checked)} />
                  </label>
                </div>
                <div className="rounded-xl border border-[#B9DDD9] bg-[#E8F3F1] p-3 text-[11.5px] text-[#1F5E5B]">
                  Save and push will publish this template to selected roles instantly.
                </div>
              </div>
            ) : null}

            {activeTab === 'usage' ? (
              <div className="space-y-4">
                <div className="grid gap-2 sm:grid-cols-4">
                  {[
                    { v: '89', l: 'Sent (30d)' },
                    { v: '72%', l: 'Open rate', c: '#1A7A4A' },
                    { v: '48%', l: 'Click rate', c: '#1F5E5B' },
                    { v: '8', l: 'Replies' },
                  ].map((k) => (
                    <div key={k.l} className="rounded-xl border border-[#E7E3DD] bg-[#F7F5F2] p-3 text-center">
                      <div className="text-2xl font-extrabold" style={{ color: k.c || '#1F2937' }}>{k.v}</div>
                      <div className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.08em] text-[#98A2B3]">{k.l}</div>
                    </div>
                  ))}
                </div>

                <div className="rounded-xl border border-[#E7E3DD] bg-white">
                  {usageRows.map((row) => (
                    <div key={row.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 border-b border-[#F0ECE5] px-3 py-2 last:border-b-0">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-extrabold text-white" style={{ background: row.color }}>{row.initials}</div>
                        <div>
                          <div className="text-xs font-bold text-[#1F2937]">{row.name}</div>
                          <div className="text-[10.5px] text-[#98A2B3]">{row.role}</div>
                        </div>
                      </div>
                      <div className="font-mono text-[11px] text-[#667085]">{row.sent}</div>
                      <div className="font-mono text-[11px] text-[#1A7A4A]">{row.open}</div>
                    </div>
                  ))}
                </div>

                <div className="grid gap-2 sm:grid-cols-2">
                  <button type="button" onClick={() => flash('Usage exported')} className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-2 text-xs font-semibold text-[#667085]">
                    <Download size={12} /> Export Usage
                  </button>
                  <button type="button" onClick={() => flash('Schedule dialog opened')} className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-2 text-xs font-semibold text-[#667085]">
                    <Calendar size={12} /> Schedule Report
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <footer className="flex flex-wrap justify-end gap-2 border-t border-[#F0ECE5] bg-[#FAF8F4] px-5 py-3">
            <button type="button" onClick={() => flash('Preview opened')} className="inline-flex items-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]"><Eye size={12} /> Preview</button>
            <button type="button" onClick={() => flash('Template copied')} className="inline-flex items-center gap-1 rounded-lg border border-[#E7E3DD] px-3 py-1.5 text-xs font-semibold text-[#667085]"><Copy size={12} /> Duplicate</button>
            <button type="button" onClick={() => saveCurrent(false)} className="inline-flex items-center gap-1 rounded-lg border border-[#2F7D79] bg-[#E8F3F1] px-3 py-1.5 text-xs font-semibold text-[#1F5E5B]"><Save size={12} /> Save</button>
            <button type="button" onClick={() => saveCurrent(true)} className="inline-flex items-center gap-1 rounded-lg bg-[#5B4A8B] px-3 py-1.5 text-xs font-bold text-white"><Send size={12} /> Save & Push</button>
          </footer>
        </article>
      </div>
    </section>
  )
}
