import { useState } from 'react'
import {
  Bell,
  Bolt,
  Clock3,
  FileText,
  Lock,
  Mail,
  UserCog,
  Users,
  CreditCard,
  Check,
} from 'lucide-react'

const palette = {
  border: '#E7E3DD',
  borderSoft: '#F0ECE5',
  bg: '#F7F5F2',
  card: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#667085',
  textMuted: '#98A2B3',
  red: '#C63D2F',
  redTint: '#FDEBE8',
  teal: '#2F7D79',
  tealDeep: '#1F5E5B',
  tealTint: '#E8F3F1',
  plum: '#5B4A8B',
  plumTint: '#F3EFFA',
  gold: '#B8860B',
  goldTint: '#FEF9EE',
}

const RULES = [
  {
    id: 'advisor-deactivation-unassigned',
    name: 'Advisor deactivation with unassigned clients',
    tone: 'urgent',
    toneLabel: 'Urgent',
    description:
      'Triggers when an Advisor account is flagged for deactivation while they still have active clients. Alerts both the RM and Master Admin to force reassignment first.',
    enabled: true,
    flow: [
      { kind: 'trigger', icon: UserCog, label: 'Advisor deactivation requested' },
      { kind: 'neutral', icon: Mail, label: 'Email + portal alert' },
      { kind: 'action', icon: Users, label: 'RM + Master Admin' },
    ],
  },
  {
    id: 'inactive-30-days',
    name: 'No client activity for 30 days',
    tone: 'warning',
    toneLabel: 'Warning',
    description:
      'Flags any client whose portal activity, messaging, or document uploads have been silent for 30+ days. Used by RM to trigger re-engagement outreach.',
    enabled: true,
    flow: [
      { kind: 'trigger', icon: Clock3, label: '30-day inactivity threshold' },
      { kind: 'neutral', icon: Bell, label: 'Portal alert only' },
      { kind: 'action', icon: Users, label: 'Assigned Advisor + RM' },
    ],
  },
  {
    id: 'document-shared-client',
    name: 'Document shared with client',
    tone: 'info',
    toneLabel: 'Info',
    description:
      'Triggered when an Advisor or RM shares a document with a client. Client receives both an email and a portal alert.',
    enabled: true,
    flow: [
      { kind: 'trigger', icon: FileText, label: 'Document shared' },
      { kind: 'neutral', icon: Mail, label: 'Email + portal alert' },
      { kind: 'action', icon: Check, label: 'Client' },
    ],
  },
  {
    id: 'document-auto-lock',
    name: 'Document auto-lock (24hr)',
    tone: 'system',
    toneLabel: 'System',
    description:
      'System auto-locks client-uploaded documents 24 hours after upload. Client can no longer self-delete; only RM or Master Admin can unlock.',
    enabled: true,
    flow: [
      { kind: 'trigger', icon: Clock3, label: '24 hours after upload' },
      { kind: 'neutral', icon: Lock, label: 'Auto-lock + notify' },
      { kind: 'action', icon: Users, label: 'Assigned Advisor + RM' },
    ],
  },
  {
    id: 'advisor-reassignment-request',
    name: 'Advisor reassignment request',
    tone: 'approval',
    toneLabel: 'Approval required',
    description:
      'Client requests reassignment to a different advisor. Routed to RM for approval, with Master Admin override available. Client is notified when approved or denied.',
    enabled: true,
    flow: [
      { kind: 'trigger', icon: UserCog, label: 'Client submits request' },
      { kind: 'neutral', icon: Check, label: 'RM approves/denies' },
      { kind: 'action', icon: Mail, label: 'Notify client' },
    ],
  },
  {
    id: 'payment-past-due',
    name: 'Payment past due',
    tone: 'urgent',
    toneLabel: 'Urgent',
    description:
      'Triggered by Stripe webhook when a subscription charge fails. Starts dunning sequence and alerts billing owner.',
    enabled: true,
    flow: [
      { kind: 'trigger', icon: CreditCard, label: 'Stripe charge failed' },
      { kind: 'neutral', icon: Bolt, label: 'Retry 3x over 7 days' },
      { kind: 'action', icon: Users, label: 'Advisor + Master Admin' },
    ],
  },
]

function Toggle({ checked, onToggle }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onToggle}
      className="relative h-6 w-11 rounded-full transition"
      style={{ background: checked ? palette.plum : palette.border }}
    >
      <span
        className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition"
        style={{ left: checked ? 'calc(100% - 22px)' : '2px' }}
      />
    </button>
  )
}

function toneBadge(tone) {
  if (tone === 'urgent') return { background: palette.redTint, color: palette.red }
  if (tone === 'warning') return { background: palette.goldTint, color: '#7A5A00' }
  if (tone === 'info') return { background: palette.tealTint, color: palette.tealDeep }
  if (tone === 'system') return { background: palette.plumTint, color: '#443569' }
  if (tone === 'approval') return { background: palette.goldTint, color: '#7A5A00' }
  return { background: palette.bg, color: palette.textSecondary }
}

function flowTone(kind) {
  if (kind === 'trigger') {
    return { background: palette.goldTint, borderColor: '#EADAB0', color: '#7A5A00' }
  }
  if (kind === 'action') {
    return { background: palette.tealTint, borderColor: 'rgba(47,125,121,.2)', color: palette.tealDeep }
  }
  return { background: palette.card, borderColor: palette.border, color: palette.text }
}

export default function AlertRulesPage() {
  const [states, setStates] = useState(() => {
    const initial = {}
    RULES.forEach((rule) => {
      initial[rule.id] = rule.enabled
    })
    return initial
  })

  const toggleRule = (id) => {
    setStates((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="space-y-3">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: palette.text }}>
            Alert Rules
          </h2>
          <p className="mt-1 text-sm" style={{ color: palette.textSecondary }}>
            Rules engine for notifications. Defines what triggers alerts across roles and how they are delivered.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-bold text-white sm:w-auto"
          style={{ background: palette.plum }}
        >
          <Bell size={12} />
          New Rule
        </button>
      </header>

      {RULES.map((rule) => (
        <article
          key={rule.id}
          className="rounded-2xl border px-4 py-4 sm:px-5"
          style={{ borderColor: palette.border, background: palette.card }}
        >
          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h3 className="text-[14px] font-bold" style={{ color: palette.text }}>
                  {rule.name}
                </h3>
                <span
                  className="rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase"
                  style={toneBadge(rule.tone)}
                >
                  {rule.toneLabel}
                </span>
              </div>
              <p className="max-w-3xl text-[12px] leading-6" style={{ color: palette.textSecondary }}>
                {rule.description}
              </p>
            </div>

            <div className="md:pl-4">
              <Toggle checked={states[rule.id]} onToggle={() => toggleRule(rule.id)} />
            </div>
          </div>

          <div
            className="flex flex-wrap items-center gap-2 rounded-xl p-2.5"
            style={{ background: palette.bg }}
          >
            {rule.flow.map((step, idx) => {
              const Icon = step.icon
              return (
                <div key={step.label} className="contents">
                  <div
                    className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-[11px] font-semibold"
                    style={flowTone(step.kind)}
                  >
                    <Icon size={12} />
                    {step.label}
                  </div>
                  {idx < rule.flow.length - 1 ? (
                    <span className="px-0.5 text-sm" style={{ color: palette.textMuted }}>
                      →
                    </span>
                  ) : null}
                </div>
              )
            })}
          </div>
        </article>
      ))}
    </section>
  )
}
