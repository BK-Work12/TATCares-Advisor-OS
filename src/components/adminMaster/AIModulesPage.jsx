import { useMemo, useState } from 'react'
import {
  Check,
  ChevronDown,
  MoreHorizontal,
  Play,
  Plus,
  Settings,
  Sparkles,
  FileText,
  History,
  Sliders,
} from 'lucide-react'

const palette = {
  border: '#E7E3DD',
  borderSoft: '#F0ECE5',
  bg: '#F7F5F2',
  card: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#667085',
  textMuted: '#98A2B3',
  plum: '#5B4A8B',
  plumDeep: '#443569',
  plumTint: '#F3EFFA',
  teal: '#2F7D79',
  tealDeep: '#1F5E5B',
  tealTint: '#E8F3F1',
  green: '#1A7A4A',
  gold: '#B8860B',
  goldTint: '#FEF9EE',
  red: '#C63D2F',
  redTint: '#FDEBE8',
  blueTint: '#EEF3FC',
}

const moduleSeed = [
  {
    id: 'ashley',
    name: 'AI Ashley · Concierge',
    desc: '3-question qualifier and lead router to RM.',
    model: 'claude-sonnet-4-6',
    version: 'v3.2.0',
    uses: '1,284 calls/mo',
    status: 'active',
    temperature: 0.3,
    maxTokens: 1024,
  },
  {
    id: 'scorer',
    name: 'Lead Scorer',
    desc: 'Scores inbound leads 1-100 on fit and urgency.',
    model: 'claude-haiku-4-5',
    version: 'v2.1.3',
    uses: '412 calls/mo',
    status: 'active',
    temperature: 0.1,
    maxTokens: 512,
  },
  {
    id: 'strategy',
    name: 'Strategy Generator',
    desc: 'Builds tax strategy sets from approved library.',
    model: 'claude-opus-4-7',
    version: 'v2.4.1',
    uses: '64 calls/mo',
    status: 'warn',
    temperature: 0.4,
    maxTokens: 3072,
  },
  {
    id: 'ffs',
    name: 'FFS Calculator',
    desc: 'Computes Financial Freedom Score across pillars.',
    model: 'claude-sonnet-4-6',
    version: 'v1.4.2',
    uses: '187 calls/mo',
    status: 'active',
    temperature: 0.2,
    maxTokens: 1536,
  },
]

const promptTemplate = `You are AI Ashley, the first-touch concierge for TakeAway Tax.

ROLE
- Ask exactly three qualification questions.
- Route qualified leads to Angela Bernard (RM).

GUARDRAILS
- Never provide direct tax advice.
- Never quote pricing.
- Keep responses warm, concise, and human.`

const MODEL_OPTIONS = ['claude-haiku-4-5', 'claude-sonnet-4-6', 'claude-opus-4-7']

export default function AIModulesPage() {
  const [modules, setModules] = useState(moduleSeed)
  const [selectedId, setSelectedId] = useState(moduleSeed[0].id)
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [activeTab, setActiveTab] = useState('config')
  const [message, setMessage] = useState('')
  const [testOutput, setTestOutput] = useState('')
  const [testInput, setTestInput] = useState(
    "Hi, my name is Marcus Hill. I'm a small business owner in Katy - I run a commercial insurance brokerage, about $340K in revenue last year. I got hit with a surprise $47K tax bill in April and I want to make sure that never happens again. Can you help me?",
  )
  const [promptDraft, setPromptDraft] = useState(promptTemplate)

  const filteredModules = useMemo(() => {
    if (selectedFilter === 'Client-facing') return modules.filter((m) => m.id === 'ashley' || m.id === 'ffs')
    if (selectedFilter === 'Internal') return modules.filter((m) => m.id === 'scorer' || m.id === 'strategy')
    return modules
  }, [modules, selectedFilter])

  const selected = useMemo(
    () => filteredModules.find((m) => m.id === selectedId) || filteredModules[0] || modules[0],
    [filteredModules, modules, selectedId],
  )

  const updateSelected = (patch) => {
    setModules((prev) => prev.map((item) => (item.id === selectedId ? { ...item, ...patch } : item)))
  }

  const flash = (text) => {
    setMessage(text)
    window.clearTimeout(flash.t)
    flash.t = window.setTimeout(() => setMessage(''), 1800)
  }

  const runTest = () => {
    setTestOutput(
      `model: ${selected.model} · temp: ${selected.temperature} · 847ms · 284 tokens\n\nHi Marcus - thanks for reaching out, and I'm sorry to hear about the April surprise. That's exactly the kind of thing we help business owners get ahead of.\n\nI just have 3 quick questions to make sure we route you to the right person on our team.\n\n1. It sounds like you're looking for tax planning rather than just preparation - is that right?\n\n2. You mentioned you own the brokerage - do you also have any W-2 income, or is it all business income?\n\n3. You shared $340K in revenue - what's roughly your personal take-home from the business?\n\n----\n[QUALIFICATION: PASS]\nRouting -> Angela Bernard · Stage 1 · Priority: High`,
    )
  }

  const rotateModel = () => {
    const currentIndex = MODEL_OPTIONS.indexOf(selected.model)
    const nextModel = MODEL_OPTIONS[(currentIndex + 1) % MODEL_OPTIONS.length]
    updateSelected({ model: nextModel })
    flash(`Model set to ${nextModel}`)
  }

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: palette.text }}>
              AI Modules
            </h2>
            <span
              className="rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase"
              style={{ background: palette.plumTint, color: palette.plumDeep, letterSpacing: '0.06em' }}
            >
              4 Active
            </span>
          </div>
          <p className="text-sm" style={{ color: palette.textSecondary }}>
            Configure prompts, models, safeguards, and test behavior before deployment.
          </p>
        </div>

        <div className="grid w-full grid-cols-2 gap-2 sm:w-auto sm:grid-cols-3">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold"
            style={{ borderColor: palette.border, color: palette.textSecondary }}
            onClick={() => flash('Usage logs opened')}
          >
            <FileText size={12} /> Logs
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold"
            style={{ borderColor: palette.border, color: palette.textSecondary }}
            onClick={() => flash('Compared latest versions')}
          >
            <History size={12} /> Compare
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-white"
            style={{ background: palette.plum }}
            onClick={() => flash('New module flow opened')}
          >
            <Plus size={12} /> New Module
          </button>
        </div>
      </header>

      {message ? (
        <div
          className="rounded-xl border px-3 py-2 text-xs font-semibold"
          style={{ borderColor: 'rgba(47,125,121,.2)', background: palette.tealTint, color: palette.tealDeep }}
        >
          {message}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside
          className="overflow-hidden rounded-2xl border"
          style={{ borderColor: palette.border, background: palette.card }}
        >
          <div className="border-b px-4 py-3" style={{ borderColor: palette.borderSoft, background: '#FAF8F4' }}>
            <div className="mb-2 text-sm font-bold" style={{ color: palette.text }}>
              Modules
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Client-facing', 'Internal'].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setSelectedFilter(chip)}
                  className="rounded-md border px-2 py-1 text-[10.5px] font-bold"
                  style={{
                    borderColor: palette.border,
                    background: selectedFilter === chip ? palette.plumTint : palette.card,
                    color: selectedFilter === chip ? palette.plumDeep : palette.textSecondary,
                  }}
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          <div className="max-h-150 overflow-y-auto p-2">
            {filteredModules.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedId(m.id)}
                className="mb-1 w-full rounded-xl border p-3 text-left"
                style={{
                  borderColor: m.id === selectedId ? 'rgba(91,74,139,.25)' : 'transparent',
                  background: m.id === selectedId ? palette.plumTint : 'transparent',
                }}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <div className="truncate text-sm font-bold" style={{ color: palette.text }}>
                    {m.name}
                  </div>
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: m.status === 'warn' ? palette.gold : palette.green }}
                  />
                </div>
                <div className="text-[11px]" style={{ color: palette.textSecondary }}>
                  {m.desc}
                </div>
                <div className="mt-1.5 text-[10px] font-mono" style={{ color: palette.textMuted }}>
                  {m.version} · {m.uses}
                </div>
              </button>
            ))}
          </div>
        </aside>

        <article className="overflow-hidden rounded-2xl border" style={{ borderColor: palette.border, background: palette.card }}>
          <div className="border-b px-5 py-4" style={{ borderColor: palette.borderSoft, background: '#f6f3fa' }}>
            <div className="mb-1 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-[29px] leading-none font-extrabold" style={{ color: '#1f2330' }}>
                    Claude Marketer
                  </h3>
                  <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase text-white" style={{ background: palette.green }}>
                    Active
                  </span>
                </div>
                <p className="mt-1 max-w-3xl text-sm" style={{ color: palette.textSecondary }}>
                  Generates social posts, email newsletters, and ad copy aligned with the TAT editorial calendar and brand voice.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="rounded-lg border px-2.5 py-2"
                  style={{ borderColor: palette.border, color: palette.textMuted }}
                  onClick={() => flash('More module actions')}
                >
                  <MoreHorizontal size={12} />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-white"
                  style={{ background: palette.plum }}
                  onClick={() => flash('Changes saved')}
                >
                  <Check size={12} /> Save changes
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm" style={{ color: palette.textMuted }}>
              <span>Model: <strong style={{ color: palette.text }}>{selected.model}</strong></span>
              <span>Version: <strong style={{ color: palette.text }}>{selected.version}</strong></span>
              <span>Updated: <strong style={{ color: palette.text }}>Apr 14, 2026 · Melanie</strong></span>
              <span>Calls (30d): <strong style={{ color: palette.text }}>46</strong></span>
            </div>
          </div>

          <div className="border-b px-4" style={{ borderColor: palette.borderSoft }}>
            <div className="flex flex-wrap gap-1">
              {[
                { key: 'config', label: 'Configuration', icon: Settings },
                { key: 'prompt', label: 'System Prompt', icon: FileText },
                { key: 'test', label: 'Test Console', icon: Play },
                { key: 'history', label: 'Version History', icon: History },
              ].map((tab) => {
                const Icon = tab.icon
                const active = tab.key === activeTab
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setActiveTab(tab.key)}
                    className="inline-flex items-center gap-1 border-b-2 px-3 py-3 text-xs"
                    style={{ borderBottomColor: active ? palette.plum : 'transparent', color: active ? palette.plumDeep : palette.textMuted }}
                  >
                    <Icon size={13} />
                    <span className="text-sm leading-none font-semibold">{tab.label}</span>
                    {tab.key === 'history' ? (
                      <span className="rounded-full bg-[#EEECEC] px-1.5 py-0.5 text-[10px] font-extrabold" style={{ color: palette.textSecondary }}>
                        7
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="max-h-150 overflow-y-auto px-4 py-4 sm:px-6">
            {activeTab === 'config' ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-2 border-b pb-4 sm:flex-row sm:items-center" style={{ borderColor: palette.borderSoft }}>
                  <div className="w-full sm:w-44">
                    <div className="text-sm font-semibold" style={{ color: palette.text }}>Status</div>
                    <div className="text-sm" style={{ color: palette.textMuted }}>Disable to stop all calls to this module</div>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2"
                    onClick={() => updateSelected({ status: selected.status === 'off' ? 'active' : 'off' })}
                  >
                    <span
                      className="relative inline-flex h-6 w-10 items-center rounded-full transition"
                      style={{ background: selected.status === 'off' ? '#D4D4D8' : palette.plum }}
                    >
                      <span
                        className="inline-block h-4 w-4 rounded-full bg-white transition"
                        style={{ transform: selected.status === 'off' ? 'translateX(4px)' : 'translateX(20px)' }}
                      />
                    </span>
                    <span className="text-lg font-semibold" style={{ color: palette.green }}>{selected.status === 'off' ? 'Disabled' : 'Active'}</span>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="border-b pb-4" style={{ borderColor: palette.borderSoft }}>
                    <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: palette.text }}>Model</div>
                        <div className="text-sm" style={{ color: palette.textMuted }}>Claude model used for this module</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={rotateModel}
                      className="flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-base"
                      style={{ borderColor: palette.border, color: palette.text }}
                    >
                      {selected.model}
                      <ChevronDown size={13} color={palette.textSecondary} />
                    </button>
                  </div>

                  <div className="border-b pb-4" style={{ borderColor: palette.borderSoft }}>
                    <div className="mb-2 flex items-end justify-between">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: palette.text }}>Temperature</div>
                        <div className="text-sm" style={{ color: palette.textMuted }}>0 = deterministic · 1 = creative</div>
                      </div>
                      <div className="rounded-lg px-2 py-1 text-base font-bold" style={{ background: '#EFECE7', color: palette.textSecondary }}>
                        {selected.temperature.toFixed(1)}
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={selected.temperature}
                      onChange={(e) => updateSelected({ temperature: Number(e.target.value) })}
                      className="w-full accent-[#5B4A8B]"
                    />
                  </div>

                  <div className="border-b pb-4" style={{ borderColor: palette.borderSoft }}>
                    <div className="mb-2 flex items-end justify-between">
                      <div>
                        <div className="text-sm font-semibold" style={{ color: palette.text }}>Max tokens</div>
                        <div className="text-sm" style={{ color: palette.textMuted }}>Maximum response length</div>
                      </div>
                      <div className="rounded-lg px-2 py-1 text-base font-bold" style={{ background: '#EFECE7', color: palette.textSecondary }}>
                        {selected.maxTokens}
                      </div>
                    </div>
                    <input
                      type="range"
                      min="256"
                      max="4096"
                      step="128"
                      value={selected.maxTokens}
                      onChange={(e) => updateSelected({ maxTokens: Number(e.target.value) })}
                      className="w-full accent-[#5B4A8B]"
                    />
                  </div>

                  <div className="border-b pb-4" style={{ borderColor: palette.borderSoft }}>
                    <div className="mb-2 text-sm font-semibold" style={{ color: palette.text }}>Routing target</div>
                    <button type="button" className="flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-base" style={{ borderColor: palette.border, color: palette.text }} onClick={() => flash('Routing target picker opened')}>
                      Angela Bernard · Relationship Manager
                      <ChevronDown size={13} color={palette.textSecondary} />
                    </button>
                  </div>

                  <div className="border-b pb-4" style={{ borderColor: palette.borderSoft }}>
                    <div className="mb-2 text-sm font-semibold" style={{ color: palette.text }}>Rate limit</div>
                    <input type="number" value={20} readOnly className="w-30 rounded-xl border px-3 py-2.5 text-base" style={{ borderColor: palette.border, color: palette.text }} />
                  </div>

                  <div>
                    <div className="mb-2 text-sm font-semibold" style={{ color: palette.text }}>Fallback</div>
                    <button type="button" className="flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-base" style={{ borderColor: palette.border, color: palette.text }} onClick={() => flash('Fallback action picker opened')}>
                      Route to Angela immediately
                      <ChevronDown size={13} color={palette.textSecondary} />
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'prompt' ? (
              <div className="space-y-3">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="text-2xl font-extrabold" style={{ color: palette.text }}>System Prompt</div>
                    <div className="text-sm" style={{ color: palette.textMuted }}>
                      Changes create a new version in history · Saved drafts do not affect production until deployed
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-xl border px-3 py-2 text-base font-semibold"
                      style={{ borderColor: palette.border, color: palette.textSecondary }}
                      onClick={() => {
                        setPromptDraft(promptTemplate)
                        flash('Prompt reverted to v3.1.8')
                      }}
                    >
                      Revert to v3.1.8
                    </button>
                    <button type="button" className="px-2 py-2 text-base font-semibold" style={{ color: palette.tealDeep }} onClick={() => flash('Prompt copied')}>
                      Copy
                    </button>
                  </div>
                </div>

                <textarea
                  value={promptDraft}
                  onChange={(e) => setPromptDraft(e.target.value)}
                  className="min-h-90 w-full rounded-xl border p-3 font-mono text-base leading-7"
                  style={{ borderColor: palette.border, color: palette.text, background: palette.card }}
                />

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm font-semibold" style={{ color: palette.textMuted }}>
                    {promptDraft.length.toLocaleString()} characters · ~{Math.max(1, Math.round(promptDraft.length / 4))} tokens
                  </div>
                  <div className="flex gap-2">
                    <button type="button" className="rounded-xl border px-3 py-2 text-base font-semibold" style={{ borderColor: palette.border, color: palette.textSecondary }} onClick={() => flash('Prompt draft saved')}>
                      Save draft
                    </button>
                    <button type="button" className="rounded-xl px-3 py-2 text-base font-bold text-white" style={{ background: palette.plum }} onClick={() => flash('Prompt deployed as v3.3.0')}>
                      Deploy as v3.3.0
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {activeTab === 'test' ? (
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-extrabold" style={{ color: palette.text }}>Test console</div>
                  <div className="text-sm" style={{ color: palette.textMuted }}>
                    Run the current prompt against sample inputs · Does not hit production · Results are not logged to audit trail
                  </div>
                </div>

                <div className="grid gap-3 xl:grid-cols-2">
                  <div className="overflow-hidden rounded-xl border" style={{ borderColor: palette.border }}>
                    <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: palette.borderSoft, background: '#F8F7F3' }}>
                      <span className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: palette.textSecondary }}>Input</span>
                      <button type="button" className="text-[12px] font-bold" style={{ color: palette.tealDeep }} onClick={() => flash('Loaded sample input')}>
                        Load example
                      </button>
                    </div>
                    <textarea
                      value={testInput}
                      onChange={(e) => setTestInput(e.target.value)}
                      className="min-h-85 w-full p-3 font-mono text-base leading-7 outline-none"
                      style={{ color: palette.text }}
                    />
                  </div>

                  <div className="overflow-hidden rounded-xl border" style={{ borderColor: palette.border }}>
                    <div className="flex items-center justify-between border-b px-3 py-2" style={{ borderColor: palette.borderSoft, background: '#F8F7F3' }}>
                      <span className="text-[11px] font-extrabold uppercase tracking-widest" style={{ color: palette.textSecondary }}>Output</span>
                      <span className="rounded-md bg-[#E8F5EE] px-2 py-0.5 text-[12px] font-bold" style={{ color: palette.green }}>
                        Qualified
                      </span>
                    </div>
                    <pre className="min-h-85 whitespace-pre-wrap p-3 font-mono text-base leading-7" style={{ color: palette.textSecondary }}>
                      {testOutput || 'Run a test to generate output.'}
                    </pre>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button type="button" onClick={runTest} className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-base font-bold text-white" style={{ background: palette.plum }}>
                    <Play size={13} /> Run test
                  </button>
                </div>
              </div>
            ) : null}

            {activeTab === 'history' ? (
              <div className="space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="text-2xl font-extrabold" style={{ color: palette.text }}>Version history</div>
                    <div className="text-sm" style={{ color: palette.textMuted }}>7 versions · Any version can be deployed or forked into a new draft</div>
                  </div>
                  <button type="button" className="rounded-xl border px-3 py-2 text-base font-semibold" style={{ borderColor: palette.border, color: palette.textSecondary }} onClick={() => flash('Comparing versions')}>
                    Compare versions
                  </button>
                </div>

                {[
                  {
                    tag: 'v3.2.0',
                    deployed: true,
                    at: 'Apr 12, 2026 · 2:14 PM',
                    by: 'Yvonne',
                    title: 'Tightened qualifying income threshold, added Houston metro check',
                    desc: 'Raised W-2 qualification floor from $150K to $200K. Added explicit Houston metro area check (Katy, Downtown, Pearland). Refined tone to be warmer and less salesy.',
                  },
                  {
                    tag: 'v3.1.8',
                    at: 'Mar 28, 2026 · 10:03 AM',
                    by: 'Melanie',
                    title: 'Handoff script revision - Angela RM routing',
                    desc: 'Updated handoff language to explicitly mention Angela by name. Removed "automated" language. Added 1-hour callback promise.',
                  },
                  {
                    tag: 'v3.1.7',
                    at: 'Mar 21, 2026 · 4:47 PM',
                    by: 'Yvonne',
                    title: 'Added disqualification path - out-of-metro leads',
                    desc: 'Added graceful exit path for leads outside Houston metro. Offers newsletter and resource library instead of routing to Angela.',
                  },
                  {
                    tag: 'v3.0.0',
                    at: 'Mar 8, 2026 · 9:22 AM',
                    by: 'Melanie',
                    title: 'Major rewrite - new 3-question framework',
                    desc: 'Refactor to 3-question qualification flow with strict guardrails and standardized routing payload.',
                  },
                ].map((v) => (
                  <article key={v.tag} className="border-b pb-4" style={{ borderColor: palette.borderSoft }}>
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2 text-sm" style={{ color: palette.textMuted }}>
                        <span className="h-3 w-3 rounded-full" style={{ background: v.deployed ? palette.plum : '#b8c0cc' }} />
                        <span className="rounded bg-[#EEE9F8] px-2 py-0.5 font-mono text-sm font-bold" style={{ color: palette.plumDeep }}>{v.tag}</span>
                        {v.deployed ? <span className="rounded bg-[#DDF5E6] px-2 py-0.5 text-[11px] font-bold" style={{ color: palette.green }}>Deployed</span> : null}
                        <span>{v.at}</span>
                      </div>
                      <span className="text-base font-semibold" style={{ color: palette.textSecondary }}>{v.by}</span>
                    </div>
                    <div className="mb-1 text-2xl font-bold" style={{ color: palette.text }}>{v.title}</div>
                    <div className="mb-2 text-base" style={{ color: palette.textSecondary }}>{v.desc}</div>
                    <div className="flex items-center gap-2">
                      <button type="button" className="rounded-xl border px-3 py-1.5 text-sm font-semibold" style={{ borderColor: palette.border, color: palette.textSecondary }} onClick={() => flash(`Viewing diff for ${v.tag}`)}>
                        View diff
                      </button>
                      <button type="button" className="px-2 py-1.5 text-sm font-bold" style={{ color: palette.tealDeep }} onClick={() => flash(v.deployed ? `Forked ${v.tag} as draft` : `Restored ${v.tag}`)}>
                        {v.deployed ? 'Fork as draft' : 'Restore'}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      </div>


    </section>
  )
}
