import { useMemo, useState } from 'react'

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
  tealTint: '#E8F3F1',
  greenTint: '#E8F5EE',
  green: '#1A7A4A',
  gold: '#B8860B',
  goldTint: '#FEF9EE',
  red: '#C63D2F',
  redTint: '#FDEBE8',
}

const FEATURE_GROUPS = [
  {
    id: 'client-portal',
    title: 'Client Portal',
    subtitle: 'Features visible to end clients in the TATCares portal',
    items: [
      {
        id: 'client_portal.enabled',
        name: 'Client Portal (global kill switch)',
        key: 'client_portal.enabled',
        desc: 'Master toggle for the entire client-facing portal. Disabling will show a maintenance page to all clients.',
        scope: ['All locations', 'All clients'],
        enabled: true,
      },
      {
        id: 'ffs.enabled',
        name: 'Financial Freedom Score',
        key: 'ffs.enabled',
        desc: 'Show Financial Freedom Score widget on client home dashboard.',
        scope: ['All locations'],
        enabled: true,
      },
      {
        id: 'ai_concierge.enabled',
        name: 'AI Ashley Concierge',
        key: 'ai_concierge.enabled',
        desc: 'Enable the in-portal AI assistant for all clients.',
        scope: ['All locations'],
        enabled: true,
      },
      {
        id: 'partner_network.enabled',
        name: 'Partner Network',
        key: 'partner_network.enabled',
        desc: 'Show Partner Network resources in client portal nav.',
        scope: ['All locations'],
        enabled: true,
      },
      {
        id: 'client.doc_upload',
        name: 'Client document upload',
        key: 'client.doc_upload',
        desc: 'Allow clients to upload documents directly via portal. 24-hour auto-lock applies.',
        scope: ['All locations'],
        enabled: true,
      },
    ],
  },
  {
    id: 'auth',
    title: 'Authentication',
    subtitle: 'Login methods and security policies',
    items: [
      {
        id: 'auth.email_pw',
        name: 'Email + Password (Phase 1)',
        key: 'auth.email_pw',
        desc: 'Standard email + password login with 2FA. Currently the only auth method in production.',
        scope: ['All roles'],
        enabled: true,
      },
      {
        id: 'auth.google_oauth',
        name: 'Google OAuth (Phase 2)',
        key: 'auth.google_oauth',
        desc: 'Sign in with Google for clients and staff. Pending backend build.',
        scope: ['Not yet deployed'],
        enabled: false,
        muted: true,
        badge: { label: 'Phase 2', tone: 'gold' },
      },
      {
        id: 'auth.2fa_required_first',
        name: 'Require 2FA on first login',
        key: 'auth.2fa_required_first',
        desc: 'Force users to enable 2FA on their first successful login.',
        scope: ['All roles'],
        enabled: true,
      },
      {
        id: 'auth.rate_limit',
        name: 'Rate limiting (5 fails = 15min lockout)',
        key: 'auth.rate_limit',
        desc: 'Lock account for 15 minutes after 5 failed login attempts.',
        scope: ['All roles'],
        enabled: true,
      },
    ],
  },
  {
    id: 'advisor-rm',
    title: 'Advisor & RM Tools',
    subtitle: 'Staff-side features',
    items: [
      {
        id: 'pipeline.enabled',
        name: 'Pipeline Board',
        key: 'pipeline.enabled',
        desc: '8-stage pipeline board for RM (stages 1-3) and Advisors (stages 4-8).',
        scope: ['Advisor', 'RM'],
        enabled: true,
      },
      {
        id: 'proposal_builder.enabled',
        name: 'Proposal Builder',
        key: 'proposal_builder.enabled',
        desc: '4-step proposal builder for advisors (prior year return -> YTD forecast -> strategy selection -> preview).',
        scope: ['Advisor only'],
        enabled: true,
      },
      {
        id: 'strategy_library.enabled',
        name: 'Strategy Library (17 strategies)',
        key: 'strategy_library.enabled',
        desc: 'IRS-allowable strategy library with filters and selection.',
        scope: ['Advisor', 'RM (read-only)'],
        enabled: true,
      },
    ],
  },
  {
    id: 'experimental',
    title: 'Experimental',
    subtitle: 'Beta features · Not yet production-ready',
    items: [
      {
        id: 'vapi.enabled',
        name: 'VAPI Voice Agent',
        key: 'vapi.enabled',
        desc: 'Inbound voice qualification via VAPI + Comcast SIP trunk. Pilot with Katy number only.',
        scope: ['Katy pilot'],
        enabled: false,
        badge: { label: 'Beta', tone: 'gold' },
      },
      {
        id: 'franchise.dashboard',
        name: 'Franchisee Dashboard',
        key: 'franchise.dashboard',
        desc: "Separate dashboard for future franchisees to see their own location's metrics.",
        scope: ['Hidden'],
        enabled: false,
        badge: { label: 'Internal only', tone: 'gold' },
      },
    ],
  },
]

function toneStyles(tone) {
  if (tone === 'gold') {
    return { background: palette.goldTint, color: '#7A5A00' }
  }
  return { background: palette.bg, color: palette.textSecondary }
}

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

export default function FeatureFlagsPage() {
  const [flags, setFlags] = useState(() => {
    const state = {}
    FEATURE_GROUPS.forEach((group) => {
      group.items.forEach((item) => {
        state[item.id] = item.enabled
      })
    })
    return state
  })

  const counts = useMemo(() => {
    const total = Object.keys(flags).length
    const enabled = Object.values(flags).filter(Boolean).length
    return { total, enabled }
  }, [flags])

  const toggleFlag = (id) => {
    setFlags((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <h2 className="text-2xl font-bold tracking-tight" style={{ color: palette.text }}>
              Feature Flags
            </h2>
            <span
              className="rounded-md px-2 py-0.5 text-[10px] font-extrabold uppercase"
              style={{ background: palette.tealTint, color: palette.green, letterSpacing: '0.06em' }}
            >
              {counts.enabled}/{counts.total} Enabled
            </span>
          </div>
          <p className="text-sm" style={{ color: palette.textSecondary }}>
            Portal feature toggles. Changes apply immediately and are logged in audit trail.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center gap-1 rounded-lg border px-3 py-2 text-xs font-bold sm:w-auto"
          style={{ borderColor: palette.border, color: palette.textSecondary }}
        >
          Import config
        </button>
      </header>

      {FEATURE_GROUPS.map((group) => (
        <section
          key={group.id}
          className="overflow-hidden rounded-2xl border"
          style={{ borderColor: palette.border, background: palette.card }}
        >
          <div className="border-b px-4 py-3 sm:px-5" style={{ borderColor: palette.borderSoft, background: '#FAF8F4' }}>
            <h3 className="text-[13.5px] font-bold" style={{ color: palette.text }}>
              {group.title}
            </h3>
            <p className="text-[11.5px]" style={{ color: palette.textSecondary }}>
              {group.subtitle}
            </p>
          </div>

          <div>
            {group.items.map((item) => {
              const checked = flags[item.id]
              return (
                <div
                  key={item.id}
                  className="grid gap-3 border-b px-4 py-3 sm:px-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                  style={{ borderColor: palette.borderSoft, opacity: item.muted ? 0.7 : 1 }}
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[13px] font-bold" style={{ color: palette.text }}>
                        {item.name}
                      </span>
                      <span
                        className="rounded-md px-2 py-0.5 font-mono text-[10.5px]"
                        style={{ background: palette.bg, color: palette.textMuted }}
                      >
                        {item.key}
                      </span>
                      {item.badge ? (
                        <span
                          className="rounded-md px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase"
                          style={toneStyles(item.badge.tone)}
                        >
                          {item.badge.label}
                        </span>
                      ) : null}
                    </div>

                    <p className="mt-1 text-[11.5px] leading-6" style={{ color: palette.textSecondary }}>
                      {item.desc}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.scope.map((scope) => (
                        <span
                          key={scope}
                          className="rounded-md border px-2 py-0.5 text-[10px] font-bold"
                          style={{ borderColor: palette.border, background: palette.bg, color: palette.textSecondary }}
                        >
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="md:justify-self-end">
                    <Toggle checked={checked} onToggle={() => toggleFlag(item.id)} />
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </section>
  )
}
