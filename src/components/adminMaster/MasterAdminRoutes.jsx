import {
  AlertTriangle,
  ArrowDown,
  Bell,
  Calendar,
  ChevronDown,
  Copy,
  CreditCard,
  Download,
  Eye,
  FileText,
  LayoutGrid,
  Layers,
  Lock,
  MapPin,
  Megaphone,
  Menu,
  Newspaper,
  RefreshCw,
  Search,
  Shield,
  Info,
  Upload,
  UserPlus,
  Users,
  X,
  Zap,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import ClientsPage from './ClientsPage'
import AdminClientDetail from './AdminClientDetail'
import LocationsPage from './LocationsPage'
import ReportsTabPage from './ReportsPage'
import BillingTabPage from './BillingPage'
import AuditTrailPage from './AuditTrailPage'
import PartnerNetworkPage from './PartnerNetworkPage'
import TaxNewsPage from './TaxNewsPage'
import BroadcastsPage from './BroadcastsPage'
import EmailTemplatesPage from './EmailTemplatesPage'
import AIModulesPage from './AIModulesPage'
import FeatureFlagsPage from './FeatureFlagsPage'
import AlertRulesPage from './AlertRulesPage'

const COLORS = {
  bg: '#F7F5F2',
  card: '#FFFFFF',
  border: '#E7E3DD',
  borderSoft: '#F0ECE5',
  red: '#C63D2F',
  redTint: '#FDEBE8',
  teal: '#2F7D79',
  green: '#1A7A4A',
  tealBright: '#5ECFCA',
  text: '#1F2937',
  textSecondary: '#667085',
  textMuted: '#98A2B3',
  plum: '#5B4A8B',
  plumTint: '#F3EFFA',
  plumDeep: '#443569',
  sidebarBg: '#1A2838',
}

const NAV_GROUPS = [
  {
    label: 'Overview',
    items: [{ to: '/admin-master/dashboard', label: 'Dashboard', icon: LayoutGrid }],
  },
  {
    label: 'People',
    items: [
      { to: '/admin-master/users', label: 'Users & Roles', icon: Users, badge: '9' },
      { to: '/admin-master/clients', label: 'Clients', icon: Users, badge: '187' },
      { to: '/admin-master/locations', label: 'Locations', icon: MapPin, badge: '3' },
    ],
  },
  {
    label: 'Operations',
    items: [
      { to: '/admin-master/reports', label: 'Reports', icon: FileText, badge: 'New' },
      { to: '/admin-master/billing', label: 'Billing & Subs', icon: CreditCard },
      { to: '/admin-master/audit', label: 'Audit Trail', icon: Shield },
    ],
  },
  {
    label: 'Client Portal',
    items: [
      { to: '/admin-master/partners', label: 'Partner Network', icon: Users, badge: '6' },
      { to: '/admin-master/taxnews', label: 'Tax News', icon: Newspaper, badge: '14' },
      { to: '/admin-master/broadcasts', label: 'Broadcasts', icon: Megaphone },
    ],
  },
  {
    label: 'Content',
    items: [{ to: '/admin-master/email', label: 'Email Templates', icon: FileText, badge: '12' }],
  },
]

const SYSTEM_TOOLS = [
  { to: '/admin-master/ai', label: 'AI Modules', icon: Zap, badge: '9' },
  { to: '/admin-master/flags', label: 'Feature Flags', icon: Layers },
  { to: '/admin-master/alerts', label: 'Alert Rules', icon: Bell },
]

function getActiveTitle(pathname) {
  if (pathname.includes('/users')) return 'Users & Roles'
  if (pathname.includes('/clients')) return 'Clients'
  if (pathname.includes('/locations')) return 'Locations'
  if (pathname.includes('/reports')) return 'Reports'
  if (pathname.includes('/billing')) return 'Billing & Subscriptions'
  if (pathname.includes('/audit')) return 'Audit Trail'
  if (pathname.includes('/partners')) return 'Partner Network'
  if (pathname.includes('/taxnews')) return 'Tax News'
  if (pathname.includes('/broadcasts')) return 'Broadcasts'
  if (pathname.includes('/email')) return 'Email Templates'
  if (pathname.includes('/ai')) return 'AI Modules'
  if (pathname.includes('/flags')) return 'Feature Flags'
  if (pathname.includes('/alerts')) return 'Alert Rules'
  return 'Franchise Dashboard'
}

function SidebarNavItem({ to, label, Icon, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `mb-1 flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${isActive ? 'font-bold' : 'font-medium'
        }`
      }
      style={({ isActive }) => ({
        color: isActive ? COLORS.tealBright : 'rgba(255,255,255,0.55)',
        background: isActive ? 'rgba(94,207,202,0.13)' : 'transparent',
      })}
    >
      <span className="flex items-center gap-2.5">
        <Icon size={15} />
        <span>{label}</span>
      </span>
      {badge ? (
        <span
          className="rounded-full px-1.5 py-0.5 text-[10px] font-extrabold text-white"
          style={{ background: COLORS.red, minWidth: '20px', textAlign: 'center' }}
        >
          {badge}
        </span>
      ) : null}
    </NavLink>
  )
}

function AdminSidebar() {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [systemOpen, setSystemOpen] = useState(false)

  const inSystemTools = SYSTEM_TOOLS.some((item) => location.pathname.includes(item.to.replace('/admin-master/', '/')))

  useEffect(() => {
    setIsOpen(false)
    if (inSystemTools) setSystemOpen(true)
  }, [location.pathname])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed left-3 top-3 z-40 flex h-10 w-10 items-center justify-center rounded-xl border lg:hidden"
        style={{ borderColor: COLORS.border, background: COLORS.card }}
        aria-label="Open sidebar"
      >
        <Menu size={18} color={COLORS.textSecondary} />
      </button>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/45 transition lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-70 shrink-0 flex-col border-r transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:w-64 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        style={{ background: COLORS.sidebarBg, borderColor: 'rgba(255,255,255,0.08)' }}
      >
        <div className="flex items-center justify-between border-b px-5 py-5" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div>
            <div className="text-lg font-extrabold tracking-tight text-white">
              TAT<span style={{ color: COLORS.tealBright }}>Cares</span>
            </div>
            <div
              className="mt-2 inline-flex items-center rounded-md px-2 py-1 text-[10px] font-extrabold uppercase"
              style={{
                letterSpacing: '0.08em',
                background: COLORS.plum,
                color: '#FFFFFF',
              }}
            >
              Master Admin
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="mb-3">
              <div
                className="px-2 pb-1.5 pt-2 text-[10px] font-extrabold uppercase"
                style={{ color: 'rgba(255,255,255,0.26)', letterSpacing: '0.12em' }}
              >
                {group.label}
              </div>
              {group.items.map((item) => (
                <SidebarNavItem
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  Icon={item.icon}
                  badge={item.badge}
                />
              ))}
            </div>
          ))}

          <div className="mt-2">
            <button
              type="button"
              onClick={() => setSystemOpen((prev) => !prev)}
              className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm font-semibold transition ${systemOpen ? 'text-[#5ECFCA]' : 'text-white/60'
                }`}
              style={{
                background: systemOpen ? 'rgba(94,207,202,0.1)' : 'rgba(255,255,255,0.04)',
                borderColor: systemOpen ? 'rgba(94,207,202,0.25)' : 'rgba(255,255,255,0.08)',
              }}
            >
              <span className="flex items-center gap-2.5">
                <Zap size={15} />
                <span>System tools</span>
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform ${systemOpen ? 'rotate-180' : ''}`}
              />
            </button>

            <div className={`mt-1 space-y-1 rounded-xl bg-[#0F1924] p-1 ${systemOpen ? 'block' : 'hidden'}`}>
              {SYSTEM_TOOLS.map((item) => (
                <SidebarNavItem
                  key={item.to}
                  to={item.to}
                  label={item.label}
                  Icon={item.icon}
                  badge={item.badge}
                />
              ))}
            </div>
          </div>
        </nav>

        <div className="border-t px-4 py-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2.5 rounded-xl p-2" style={{ background: 'rgba(0,0,0,0.15)' }}>
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg text-xs font-extrabold text-white"
              style={{ background: `linear-gradient(135deg, ${COLORS.plum}, #7a64b5)` }}
            >
              YC
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-xs font-bold text-white">Yvonne Hollis-Cobb</div>
              <div className="mt-0.5 text-[10px] font-bold uppercase" style={{ color: COLORS.tealBright }}>
                CEO · Master Admin
              </div>
            </div>
            <div className="h-2 w-2 rounded-full" style={{ background: COLORS.tealBright }} />
          </div>

          <div className="mt-3 grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center px-1">
            <div className="text-center">
              <div className="text-base font-extrabold text-white">187</div>
              <div className="text-[9px] font-semibold uppercase tracking-wider text-white/40">Clients</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-base font-extrabold" style={{ color: COLORS.tealBright }}>$61.2K</div>
              <div className="text-[9px] font-semibold uppercase tracking-wider text-white/40">MRR</div>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div className="text-center">
              <div className="text-base font-extrabold text-[#FFB84D]">4</div>
              <div className="text-[9px] font-semibold uppercase tracking-wider text-white/40">Alerts</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

function Topbar({ onOpenNewUser, onSetImpersonation }) {
  const location = useLocation()
  const [viewAsOpen, setViewAsOpen] = useState(false)

  const setViewAs = (label) => {
    onSetImpersonation(label)
    setViewAsOpen(false)
  }

  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b px-4 pl-14 sm:px-6 lg:pl-6"
      style={{ background: COLORS.card, borderColor: COLORS.border }}
    >
      <div className="text-base font-bold tracking-tight" style={{ color: COLORS.text }}>
        {getActiveTitle(location.pathname)}
      </div>
      <div
        className="ml-3 hidden max-w-90 flex-1 items-center gap-2 rounded-xl border px-3 py-2 lg:flex"
        style={{ background: '#F5F3EF', borderColor: COLORS.border }}
      >
        <Search size={14} color={COLORS.textMuted} />
        <input
          type="text"
          className="w-full border-none bg-transparent text-sm outline-none"
          placeholder="Search users, clients, audit events..."
          style={{ color: COLORS.text }}
        />
        <span className="rounded-md bg-[#ECEAE5] px-1.5 py-0.5 font-mono text-[10px]" style={{ color: COLORS.textMuted }}>
          Cmd+K
        </span>
      </div>
      <div className="relative hidden md:block">
        <button
          className="hidden items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold md:flex"
          style={{ background: COLORS.plumTint, borderColor: 'rgba(91,74,139,.2)', color: COLORS.plumDeep }}
          onClick={() => setViewAsOpen((prev) => !prev)}
          type="button"
        >
          <Eye size={12} />
          View as
          <ChevronDown size={12} />
        </button>
        {viewAsOpen ? (
          <div
            className="absolute right-0 top-11 z-30 w-56 rounded-xl border p-1 shadow-lg"
            style={{ background: COLORS.card, borderColor: COLORS.border }}
          >
            <button
              type="button"
              className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]"
              onClick={() => setViewAs('Yvonne Hollis-Cobb · Advisor OS')}
            >
              Advisor OS
            </button>
            <button
              type="button"
              className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]"
              onClick={() => setViewAs('Angela Bernard · Relationship Manager OS')}
            >
              Relationship Manager OS
            </button>
            <button
              type="button"
              className="w-full rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]"
              onClick={() => setViewAs('Janet Okafor · Client Portal')}
            >
              Client Portal
            </button>
          </div>
        ) : null}
      </div>
      <button
        className="ml-auto flex h-9 w-9 items-center justify-center rounded-xl border"
        style={{ borderColor: COLORS.border, background: COLORS.card }}
        aria-label="Notifications"
      >
        <Bell size={15} color={COLORS.textSecondary} />
        <span
          className="absolute ml-5 -mt-5 rounded-full px-1 py-0 text-[9px] font-extrabold text-white"
          style={{ background: COLORS.red, minWidth: '15px' }}
        >
          4
        </span>
      </button>
      <div className="hidden text-xs font-semibold sm:block" style={{ color: COLORS.textMuted }}>
        Fri, Apr 17, 2026
      </div>
      <button
        type="button"
        onClick={onOpenNewUser}
        className="hidden rounded-xl px-3 py-2 text-xs font-bold text-white lg:inline-flex"
        style={{ background: COLORS.plum }}
      >
        <UserPlus size={12} className="mr-1" />
        New User
      </button>
    </header>
  )
}

function KpiCard({ label, value, sub, valueColor }) {
  return (
    <article
      className="rounded-2xl border px-5 py-4 shadow-sm"
      style={{ background: COLORS.card, borderColor: COLORS.border }}
    >
      <div
        className="text-[11px] font-extrabold uppercase"
        style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}
      >
        {label}
      </div>
      <div className="mt-2 text-3xl font-extrabold tracking-tight" style={{ color: valueColor || COLORS.text }}>
        {value}
      </div>
      <div className="mt-1 text-xs font-semibold" style={{ color: COLORS.textSecondary }}>
        {sub}
      </div>
    </article>
  )
}

function DashboardPage({ onNavigate, onOpenModal }) {
  return (
    <section className="space-y-4">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold tracking-tight" style={{ color: COLORS.text }}>
              Good morning, Yvonne
            </h1>
            <span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase text-white" style={{ background: COLORS.plum }}>
              Master Admin
            </span>
          </div>
          <p className="mt-1 text-sm" style={{ color: COLORS.textSecondary }}>
            Franchise snapshot across Katy, Downtown Houston, and Pearland - updated 4 min ago
          </p>
        </div>
        <div className="flex gap-2">
          <button className="rounded-xl border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
            <Download size={12} className="mr-1 inline" />
            Export
          </button>
          <button className="rounded-xl px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.plum }}>
            <RefreshCw size={12} className="mr-1 inline" />
            Refresh
          </button>
        </div>
      </div>

      <div className="rounded-3xl bg-linear-to-br from-[#1A2838] to-[#2A3F56] p-6 text-white">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-[0.12em] text-[#5ECFCA]">
              Franchise Snapshot · April 2026
            </div>
            <h2 className="mt-1 text-lg font-extrabold tracking-tight">Quarter-to-date performance</h2>
          </div>
          <span className="rounded-lg border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold">
            <Calendar size={11} className="mr-1 inline" />
            QTD (Apr 1 - 17)
          </span>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">MRR</div>
            <div className="mt-2 text-3xl font-extrabold">$61,243</div>
            <div className="mt-1 text-xs font-bold text-[#5ECFCA]">+$4,280 vs March</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">Active Clients</div>
            <div className="mt-2 text-3xl font-extrabold">187</div>
            <div className="mt-1 text-xs font-bold text-[#5ECFCA]">+14 this month</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">Pipeline Value</div>
            <div className="mt-2 text-3xl font-extrabold">$118.4K</div>
            <div className="mt-1 text-xs font-bold text-[#5ECFCA]">34 open · 9 closing</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/50">Renewal Rate</div>
            <div className="mt-2 text-3xl font-extrabold">91%</div>
            <div className="mt-1 text-xs font-bold text-[#FF8A7A]">-2 pts · 3 at risk</div>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Pending Approvals" value="4" sub="Need your attention" valueColor={COLORS.red} />
        <KpiCard label="AI Modules" value="9" sub="All active" valueColor={COLORS.teal} />
        <KpiCard label="Stripe Sync" value="Live" sub="Last pull 2 min ago" valueColor={COLORS.plumDeep} />
        <KpiCard label="Locations" value="3" sub="1 opening in October" valueColor={COLORS.text} />
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold" style={{ color: COLORS.text }}>
              Revenue & Clients by Location
            </div>
            <div className="text-xs" style={{ color: COLORS.textSecondary }}>
              3 locations - 1 opening October 2026
            </div>
          </div>
          <button type="button" onClick={() => onNavigate('locations')} className="text-xs font-bold" style={{ color: COLORS.teal }}>
            Manage locations -&gt;
          </button>
        </div>
        <div className="grid gap-3 lg:grid-cols-3">
          {[
            { name: 'Katy', mrr: '$28.4K', clients: '89', status: 'Active' },
            { name: 'Downtown Houston', mrr: '$32.8K', clients: '98', status: 'Active' },
            { name: 'Pearland', mrr: 'Signed', clients: '42% done', status: 'Pending' },
          ].map((loc) => (
            <article key={loc.name} className="rounded-2xl border bg-white p-4" style={{ borderColor: COLORS.border }}>
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="text-base font-bold" style={{ color: COLORS.text }}>
                    {loc.name}
                  </div>
                  <div className="text-[11px]" style={{ color: COLORS.textSecondary }}>
                    {loc.name === 'Katy' ? '23501 Cinco Ranch Blvd' : loc.name === 'Downtown Houston' ? '1001 Fannin St' : 'Opens October 2026'}
                  </div>
                </div>
                <span className="rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: loc.status === 'Pending' ? '#FEF9EE' : '#E8F5EE', color: loc.status === 'Pending' ? '#7a5a00' : '#1A7A4A' }}>
                  {loc.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-xl p-2" style={{ background: COLORS.bg }}>
                  <div className="text-[10px] uppercase" style={{ color: COLORS.textMuted }}>
                    MRR
                  </div>
                  <div className="text-lg font-extrabold" style={{ color: COLORS.text }}>
                    {loc.mrr}
                  </div>
                </div>
                <div className="rounded-xl p-2" style={{ background: COLORS.bg }}>
                  <div className="text-[10px] uppercase" style={{ color: COLORS.textMuted }}>
                    Clients
                  </div>
                  <div className="text-lg font-extrabold" style={{ color: COLORS.text }}>
                    {loc.clients}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="grid gap-3 xl:grid-cols-[1fr_340px]">
        <div className="space-y-3">
          <article className="rounded-2xl border bg-white" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: COLORS.borderSoft }}>
              <div>
                <div className="text-sm font-bold" style={{ color: COLORS.text }}>
                  Pending Approvals
                </div>
                <div className="text-xs" style={{ color: COLORS.textMuted }}>
                  4 items need your attention
                </div>
              </div>
              <span className="rounded-md px-2 py-0.5 text-[10px] font-bold" style={{ background: COLORS.redTint || '#FDEBE8', color: COLORS.red }}>
                4 open
              </span>
            </div>
            <div className="space-y-3 px-5 py-4">
              <div className="border-b pb-3" style={{ borderColor: COLORS.borderSoft }}>
                <div className="text-sm font-bold" style={{ color: COLORS.text }}>
                  Advisor deactivation: David Chen - 18 clients unassigned
                </div>
                <div className="text-xs" style={{ color: COLORS.textSecondary }}>
                  Submitted by Angela - 2h ago
                </div>
                <button
                  type="button"
                  onClick={() => onOpenModal('review-reassign')}
                  className="mt-2 rounded-lg border px-2.5 py-1 text-[11px] font-bold"
                  style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
                >
                  Review & reassign
                </button>
              </div>
              <div className="border-b pb-3" style={{ borderColor: COLORS.borderSoft }}>
                <div className="text-sm font-bold" style={{ color: COLORS.text }}>
                  Advisor reassignment request - Janet Okafor -&gt; Yvonne
                </div>
                <div className="text-xs" style={{ color: COLORS.textSecondary }}>
                  Client requested via portal
                </div>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenModal('approval-approve')}
                    className="rounded-lg px-2.5 py-1 text-[11px] font-bold text-white"
                    style={{ background: COLORS.green }}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenModal('approval-deny')}
                    className="rounded-lg border px-2.5 py-1 text-[11px] font-bold"
                    style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
                  >
                    Deny
                  </button>
                </div>
              </div>
              <div>
                <div className="text-sm font-bold" style={{ color: COLORS.text }}>
                  Unlock request: auto-locked W-2 upload
                </div>
                <div className="text-xs" style={{ color: COLORS.textSecondary }}>
                  Client: Marcus Hill
                </div>
                <button
                  type="button"
                  onClick={() => onOpenModal('unlock-doc')}
                  className="mt-2 rounded-lg border px-2.5 py-1 text-[11px] font-bold"
                  style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
                >
                  <Lock size={11} className="mr-1 inline" />
                  Unlock
                </button>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border bg-white" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: COLORS.borderSoft }}>
              <div>
                <div className="text-sm font-bold" style={{ color: COLORS.text }}>
                  AI Module Health
                </div>
                <div className="text-xs" style={{ color: COLORS.textMuted }}>
                  9 modules · Last sweep 3 min ago
                </div>
              </div>
              <button type="button" onClick={() => onNavigate('ai')} className="text-xs font-bold" style={{ color: COLORS.teal }}>
                Full config -&gt;
              </button>
            </div>
            <div className="grid gap-2 px-5 py-4 sm:grid-cols-2 lg:grid-cols-3">
              {['AI Ashley', 'Lead Scorer', 'Return Analyzer', 'Strategy Generator', 'FFS Calculator', 'Claude Marketer'].map((module) => (
                <div key={module} className="rounded-xl border p-3" style={{ borderColor: COLORS.border, background: COLORS.bg }}>
                  <div className="text-xs font-bold" style={{ color: COLORS.text }}>
                    {module}
                  </div>
                  <div className="mt-1 text-[10px]" style={{ color: COLORS.textMuted }}>
                    98% success
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="space-y-3">
          <article className="rounded-2xl border bg-white" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: COLORS.borderSoft }}>
              <div>
                <div className="text-sm font-bold" style={{ color: COLORS.text }}>
                  Billing Sync
                </div>
                <div className="text-xs" style={{ color: COLORS.textMuted }}>
                  Last pull · 2 min ago
                </div>
              </div>
              <span className="rounded-md bg-[#635BFF] px-2 py-0.5 text-[9px] font-extrabold uppercase text-white">Stripe Live</span>
            </div>
            <div className="grid grid-cols-2 gap-3 px-5 py-4">
              <div>
                <div className="text-[10px] uppercase" style={{ color: COLORS.textMuted }}>
                  Active Subs
                </div>
                <div className="text-2xl font-extrabold" style={{ color: COLORS.text }}>
                  174
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase" style={{ color: COLORS.textMuted }}>
                  Past Due
                </div>
                <div className="text-2xl font-extrabold" style={{ color: COLORS.red }}>
                  3
                </div>
              </div>
            </div>
          </article>

          <article className="rounded-2xl border bg-white" style={{ borderColor: COLORS.border }}>
            <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: COLORS.borderSoft }}>
              <div>
                <div className="text-sm font-bold" style={{ color: COLORS.text }}>
                  Recent Activity
                </div>
                <div className="text-xs" style={{ color: COLORS.textMuted }}>
                  Live audit feed
                </div>
              </div>
              <button type="button" onClick={() => onNavigate('audit')} className="text-xs font-bold" style={{ color: COLORS.teal }}>
                Full log -&gt;
              </button>
            </div>
            <div className="space-y-2 px-5 py-4">
              {[
                'Angela moved Marcus Hill to Stage 3',
                'System auto-locked client document',
                'AI Ashley routed new lead',
                'Stripe confirmed $349 renewal',
                'Yvonne updated AI prompt to v2.4.1',
              ].map((item) => (
                <div key={item} className="border-b pb-2 text-xs" style={{ borderColor: COLORS.borderSoft, color: COLORS.textSecondary }}>
                  {item}
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

function PlaceholderPage({ title, subtitle }) {
  return (
    <section className="rounded-2xl border bg-white p-6" style={{ borderColor: COLORS.border }}>
      <h2 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.text }}>
        {title}
      </h2>
      <p className="mt-2 text-sm" style={{ color: COLORS.textSecondary }}>
        {subtitle}
      </p>
    </section>
  )
}

const STAFF_USERS = [
  {
    id: 'yvonne-admin',
    name: 'Yvonne Hollis-Cobb',
    email: 'yvonne@takeawaytax.com',
    role: 'admin',
    location: 'All (franchise)',
    clients: 24,
    lastActive: 'Now',
    status: 'active',
    twoFA: true,
    avatar: 'YC',
    avatarBg: 'linear-gradient(135deg,#5B4A8B,#7a64b5)',
  },
  {
    id: 'yvonne-advisor',
    name: 'Yvonne Hollis-Cobb',
    email: 'yvonne@takeawaytax.com',
    role: 'advisor',
    location: 'Katy',
    clients: 24,
    lastActive: 'Now',
    status: 'active',
    twoFA: true,
    avatar: 'YC',
    avatarBg: '#1B3A5C',
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    email: 'david@takeawaytax.com',
    role: 'advisor',
    location: 'Downtown',
    clients: 18,
    lastActive: '3d ago',
    status: 'deactivation-pending',
    twoFA: true,
    avatar: 'DC',
    avatarBg: '#1B3A5C',
  },
  {
    id: 'rebecca-mendoza',
    name: 'Rebecca Mendoza',
    email: 'rebecca@takeawaytax.com',
    role: 'advisor',
    location: 'Downtown',
    clients: 42,
    lastActive: '12m ago',
    status: 'active',
    twoFA: true,
    avatar: 'RM',
    avatarBg: '#1B3A5C',
  },
  {
    id: 'pearland-seat',
    name: 'Advisor seat - Pearland',
    email: 'pending hire',
    role: 'advisor',
    location: 'Pearland',
    clients: 0,
    lastActive: '-',
    status: 'hiring',
    twoFA: false,
    avatar: '?',
    avatarBg: '#98A2B3',
  },
  {
    id: 'angela-bernard',
    name: 'Angela Bernard',
    email: 'angela@takeawaytax.com',
    role: 'rm',
    location: 'All (remote)',
    clients: 187,
    lastActive: '5m ago',
    status: 'active',
    twoFA: true,
    avatar: 'AB',
    avatarBg: '#2F7D79',
  },
  {
    id: 'kesha-johnson',
    name: 'Kesha Johnson',
    email: 'kesha@takeawaytax.com',
    role: 'office',
    location: 'Katy',
    clients: 0,
    lastActive: '18m ago',
    status: 'active',
    twoFA: true,
    avatar: 'KJ',
    avatarBg: '#D4A017',
  },
  {
    id: 'anastasia-novak',
    name: 'Anastasia Novak',
    email: 'anastasia@takeawaytax.com',
    role: 'office',
    location: 'Katy',
    clients: 0,
    lastActive: '2h ago',
    status: 'active',
    twoFA: true,
    avatar: 'AN',
    avatarBg: '#6B8E9E',
  },
  {
    id: 'monique-adams',
    name: 'Monique Adams',
    email: 'monique@takeawaytax.com',
    role: 'advisor',
    location: 'Katy',
    clients: 0,
    lastActive: 'Feb 14',
    status: 'deactivated',
    twoFA: false,
    avatar: 'MA',
    avatarBg: '#8B7355',
  },
]

const ROLE_LABELS = {
  admin: 'Admin',
  advisor: 'Advisor',
  rm: 'RM',
  office: 'Office',
}

function roleBadgeStyle(role) {
  if (role === 'admin') return { background: COLORS.plum, color: '#FFFFFF' }
  if (role === 'advisor') return { background: '#1B3A5C', color: '#FFFFFF' }
  if (role === 'rm') return { background: COLORS.teal, color: '#FFFFFF' }
  return { background: '#F7F5F2', color: COLORS.textSecondary, border: `1px solid ${COLORS.border}` }
}

function statusStyle(status) {
  if (status === 'active') return { label: 'Active', color: '#1A7A4A', dot: '#1A7A4A' }
  if (status === 'deactivation-pending') return { label: 'Deactivation pending', color: '#B8860B', dot: '#B8860B' }
  if (status === 'hiring') return { label: 'Hiring', color: COLORS.textMuted, dot: COLORS.textMuted }
  return { label: 'Deactivated', color: COLORS.textMuted, dot: COLORS.textMuted }
}

function UsersPage({ onOpenNewUser, onOpenWorkflowModal, onSetImpersonation }) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('active')
  const [openMenuId, setOpenMenuId] = useState(null)
  const [modalType, setModalType] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)
  const [editName, setEditName] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editLocation, setEditLocation] = useState('Katy')
  const [editPhotoPreview, setEditPhotoPreview] = useState('')
  const [passwordMode, setPasswordMode] = useState('link')
  const [tempPassword, setTempPassword] = useState('TxCat-Ranch-8729!')
  const [resetForceLogout, setResetForceLogout] = useState(true)
  const [resetNotifyUser, setResetNotifyUser] = useState(true)
  const [resetRequire2FA, setResetRequire2FA] = useState(true)
  const [reset2faForceLogout, setReset2faForceLogout] = useState(true)
  const [reset2faNotifyUser, setReset2faNotifyUser] = useState(true)
  const [reset2faRequireEnroll, setReset2faRequireEnroll] = useState(true)
  const [nextRole, setNextRole] = useState('advisor')
  const desktopMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const editPhotoInputRef = useRef(null)

  useEffect(() => {
    const closeMenu = (event) => {
      const clickedDesktop = desktopMenuRef.current?.contains(event.target)
      const clickedMobile = mobileMenuRef.current?.contains(event.target)
      if (!clickedDesktop && !clickedMobile) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', closeMenu)
    return () => document.removeEventListener('mousedown', closeMenu)
  }, [])

  useEffect(() => {
    if (!selectedUser) return
    setEditName(selectedUser.name)
    setEditEmail(selectedUser.email)
    setEditLocation(selectedUser.location.includes('Katy') ? 'Katy' : selectedUser.location.includes('Downtown') ? 'Downtown Houston' : selectedUser.location.includes('Pearland') ? 'Pearland' : 'All locations')
    setNextRole(selectedUser.role === 'admin' ? 'advisor' : selectedUser.role === 'advisor' ? 'rm' : 'advisor')
    setEditPhotoPreview('')
  }, [selectedUser])

  const filteredUsers = useMemo(() => {
    return STAFF_USERS.filter((user) => {
      const matchesSearch =
        !search.trim() ||
        `${user.name} ${user.email} ${user.location}`.toLowerCase().includes(search.toLowerCase())

      const matchesRole = roleFilter === 'all' || user.role === roleFilter

      const matchesLocation =
        locationFilter === 'all' ||
        (locationFilter === 'katy' && user.location.includes('Katy')) ||
        (locationFilter === 'downtown' && user.location.includes('Downtown')) ||
        (locationFilter === 'pearland' && user.location.includes('Pearland')) ||
        (locationFilter === 'all-location' && user.location.includes('All'))

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && user.status === 'active') ||
        (statusFilter === 'non-active' && user.status !== 'active') ||
        (statusFilter === 'pending' && user.status === 'deactivation-pending') ||
        (statusFilter === 'hiring' && user.status === 'hiring') ||
        (statusFilter === 'deactivated' && user.status === 'deactivated')

      return matchesSearch && matchesRole && matchesLocation && matchesStatus
    })
  }, [locationFilter, roleFilter, search, statusFilter])

  const openUserModal = (type, user) => {
    setSelectedUser(user)
    if (type === 'reset-password') {
      setPasswordMode('link')
      setResetForceLogout(true)
      setResetNotifyUser(true)
      setResetRequire2FA(true)
    }
    if (type === 'reset-2fa') {
      setReset2faForceLogout(true)
      setReset2faNotifyUser(true)
      setReset2faRequireEnroll(true)
    }
    setModalType(type)
    setOpenMenuId(null)
  }

  const closeUserModal = () => {
    setModalType(null)
    setSelectedUser(null)
    setPasswordMode('link')
  }

  const generateTempPassword = () => {
    const left = ['TxCat', 'Summit', 'Oak', 'Delta', 'Harbor']
    const right = ['Ranch', 'Ledger', 'Prime', 'Bridge', 'Vault']
    const number = Math.floor(Math.random() * 9000 + 1000)
    const symbol = ['!', '@', '#', '$'][Math.floor(Math.random() * 4)]
    const first = left[Math.floor(Math.random() * left.length)]
    const second = right[Math.floor(Math.random() * right.length)]
    setTempPassword(`${first}-${second}-${number}${symbol}`)
  }

  const openEditPhotoPicker = () => {
    editPhotoInputRef.current?.click()
  }

  const handleEditPhotoUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditPhotoPreview(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const roleImpact = useMemo(() => {
    if (!selectedUser) return []
    if (selectedUser.role === nextRole) return ['No change. User already has this role.']
    if (selectedUser.role === 'advisor' && nextRole === 'rm') {
      return [
        `All ${selectedUser.clients} assigned clients should be reassigned first.`,
        'User gains RM visibility across client rosters and early pipeline stages.',
        'User loses advisor-only actions for proposal and tax-plan execution.',
      ]
    }
    if (selectedUser.role === 'rm' && nextRole === 'advisor') {
      return [
        'User will lose franchise-wide RM visibility.',
        'User will need a specific client roster as an advisor.',
        'User appears in new-client advisor assignment lists.',
      ]
    }
    if (nextRole === 'admin') {
      return [
        'Requires CEO confirmation and full-audit trace.',
        'User gains full permissions for billing, AI config, users, and flags.',
        'Use sparingly to maintain least-privilege access.',
      ]
    }
    return ['Role change will update access scopes and force permission cache refresh.']
  }, [nextRole, selectedUser])

  const deactivationBlocked = selectedUser?.role === 'advisor' && selectedUser?.clients > 0

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.text }}>
            Users & Roles
          </h2>
          <p className="max-w-3xl text-sm" style={{ color: COLORS.textSecondary }}>
            9 staff accounts across 3 roles. Master Admin can create, deactivate, and reassign any user.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="rounded-xl border px-3 py-2 text-xs font-bold sm:text-sm" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
            Export CSV
          </button>
          <button
            type="button"
            onClick={onOpenNewUser}
            className="inline-flex items-center gap-1 rounded-xl px-4 py-2 text-xs font-bold text-white sm:text-sm"
            style={{ background: COLORS.plum }}
          >
            <UserPlus size={14} />
            New User
          </button>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Master Admin" value="1" sub="CEO" valueColor={COLORS.plumDeep} />
        <KpiCard label="Advisors" value="3" sub="1 pending hire" valueColor={COLORS.text} />
        <KpiCard label="RM" value="1" sub="Angela · all locations" valueColor={COLORS.teal} />
        <KpiCard label="Total Staff" value="9" sub="Active + pending" valueColor={COLORS.text} />
      </div>

      <div className="rounded-2xl border" style={{ borderColor: COLORS.border, background: COLORS.card }}>
        <div className="flex flex-wrap items-center gap-2 border-b p-3" style={{ borderColor: COLORS.borderSoft, background: '#FAF8F4' }}>
          <label className="relative min-w-55 flex-1">
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2" color={COLORS.textMuted} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search staff by name, email, or location"
              className="w-full rounded-lg border py-2 pl-9 pr-3 text-xs sm:text-sm"
              style={{ borderColor: COLORS.border, color: COLORS.text }}
            />
          </label>

          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="rounded-lg border px-2 py-2 text-xs font-semibold sm:text-sm" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
            <option value="all">All roles</option>
            <option value="admin">Master Admin</option>
            <option value="advisor">Advisors</option>
            <option value="rm">Relationship Managers</option>
            <option value="office">Office staff</option>
          </select>

          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="rounded-lg border px-2 py-2 text-xs font-semibold sm:text-sm" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
            <option value="all">All locations</option>
            <option value="katy">Katy</option>
            <option value="downtown">Downtown Houston</option>
            <option value="pearland">Pearland</option>
            <option value="all-location">All-location staff</option>
          </select>

          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border px-2 py-2 text-xs font-semibold sm:text-sm" style={{ borderColor: statusFilter === 'all' ? COLORS.border : COLORS.teal, color: COLORS.textSecondary, background: statusFilter === 'all' ? '#FFFFFF' : '#E8F3F1' }}>
            <option value="active">Active</option>
            <option value="all">All statuses</option>
            <option value="non-active">All non-active</option>
            <option value="pending">Deactivation pending</option>
            <option value="hiring">Hiring</option>
            <option value="deactivated">Deactivated</option>
          </select>

          <div className="ml-auto text-xs font-semibold" style={{ color: COLORS.textMuted }}>
            {filteredUsers.length} of {STAFF_USERS.length} staff
          </div>
        </div>

        <div className="hidden overflow-x-auto md:block" ref={desktopMenuRef}>
          <table className="w-full min-w-245 border-collapse">
            <thead style={{ background: '#FAF8F4' }}>
              <tr className="text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Location(s)</th>
                <th className="px-4 py-3 text-left">Clients</th>
                <th className="px-4 py-3 text-left">Last Active</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">2FA</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => {
                const status = statusStyle(user.status)
                return (
                  <tr key={user.id} className="border-b align-middle text-sm hover:bg-[#FAF8F4]" style={{ borderColor: COLORS.borderSoft, color: COLORS.text }}>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold text-white" style={{ background: user.avatarBg }}>
                          {user.avatar}
                        </div>
                        <div>
                          <div className="font-bold">{user.name}</div>
                          <div className="text-[11px]" style={{ color: COLORS.textMuted }}>{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-flex rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase" style={{ ...roleBadgeStyle(user.role), letterSpacing: '0.05em' }}>
                        {ROLE_LABELS[user.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3">{user.location}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: user.id === 'david-chen' ? COLORS.red : COLORS.textSecondary }}>
                      {user.clients ? user.clients : '-'}
                    </td>
                    <td className="px-4 py-3" style={{ color: COLORS.textSecondary }}>{user.lastActive}</td>
                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold" style={{ color: status.color }}>
                        <span className="h-2 w-2 rounded-full" style={{ background: status.dot }} />
                        {status.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase"
                        style={user.twoFA ? { background: '#E8F5EE', color: '#1A7A4A' } : { background: '#F7F5F2', color: COLORS.textMuted }}
                      >
                        {user.twoFA ? 'Enabled' : 'Disabled'}
                      </span>
                    </td>
                    <td className="relative px-4 py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        {user.id === 'david-chen' ? (
                          <button
                            type="button"
                            onClick={() => onOpenWorkflowModal?.('review-reassign')}
                            className="rounded-lg border px-2 py-1 text-[11px] font-bold"
                            style={{ borderColor: '#F3C4BE', color: COLORS.red, background: '#FDEBE8' }}
                          >
                            Reassign 18
                          </button>
                        ) : null}
                        <button
                          type="button"
                          onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                          className="rounded-lg border p-1.5"
                          style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
                          aria-label={`Actions for ${user.name}`}
                        >
                          <Menu size={14} />
                        </button>
                      </div>

                      {openMenuId === user.id ? (
                        <div className="absolute right-4 top-10 z-20 w-52 overflow-hidden rounded-xl border bg-white p-1 shadow-xl" style={{ borderColor: COLORS.border }}>
                          <button type="button" onClick={() => openUserModal('edit', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]" style={{ color: COLORS.text }}>
                            <FileText size={13} /> Edit user
                          </button>
                          <button type="button" onClick={() => openUserModal('reset-password', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]" style={{ color: COLORS.text }}>
                            <Lock size={13} /> Reset password
                          </button>
                          <button type="button" onClick={() => openUserModal('reset-2fa', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]" style={{ color: COLORS.text }}>
                            <Shield size={13} /> Reset 2FA
                          </button>
                          <button type="button" onClick={() => openUserModal('change-role', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]" style={{ color: COLORS.text }}>
                            <RefreshCw size={13} /> Change role
                          </button>
                          <button type="button" onClick={() => openUserModal('impersonate', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]" style={{ color: COLORS.text }}>
                            <Eye size={13} /> View as user
                          </button>
                          <div className="my-1 h-px" style={{ background: COLORS.borderSoft }} />
                          <button type="button" onClick={() => openUserModal('deactivate', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#FDEBE8]" style={{ color: COLORS.red }}>
                            <AlertTriangle size={13} /> Deactivate user
                          </button>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 p-3 md:hidden" ref={mobileMenuRef}>
          {filteredUsers.map((user) => {
            const status = statusStyle(user.status)
            return (
              <article key={user.id} className="relative rounded-xl border p-3" style={{ borderColor: COLORS.borderSoft, background: '#FFFFFF' }}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold text-white" style={{ background: user.avatarBg }}>{user.avatar}</div>
                    <div>
                      <div className="text-sm font-bold" style={{ color: COLORS.text }}>{user.name}</div>
                      <div className="text-[11px]" style={{ color: COLORS.textMuted }}>{user.email}</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpenMenuId(openMenuId === user.id ? null : user.id)}
                    className="rounded-lg border p-1.5"
                    style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
                    aria-label={`Actions for ${user.name}`}
                  >
                    <Menu size={14} />
                  </button>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-xs" style={{ color: COLORS.textSecondary }}>
                  <div>Role: <span className="font-semibold" style={{ color: COLORS.text }}>{ROLE_LABELS[user.role]}</span></div>
                  <div>Status: <span className="font-semibold" style={{ color: status.color }}>{status.label}</span></div>
                  <div>Location: <span className="font-semibold" style={{ color: COLORS.text }}>{user.location}</span></div>
                  <div>Clients: <span className="font-semibold" style={{ color: COLORS.text }}>{user.clients || '-'}</span></div>
                </div>

                {user.id === 'david-chen' ? (
                  <button
                    type="button"
                    onClick={() => onOpenWorkflowModal?.('review-reassign')}
                    className="mt-2 w-full rounded-lg border px-2 py-1.5 text-xs font-bold"
                    style={{ borderColor: '#F3C4BE', color: COLORS.red, background: '#FDEBE8' }}
                  >
                    Reassign 18 clients before deactivation
                  </button>
                ) : null}

                {openMenuId === user.id ? (
                  <div className="absolute right-3 top-11 z-20 w-52 overflow-hidden rounded-xl border bg-white p-1 shadow-xl" style={{ borderColor: COLORS.border }}>
                    <button type="button" onClick={() => openUserModal('edit', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]" style={{ color: COLORS.text }}>
                      <FileText size={13} /> Edit user
                    </button>
                    <button type="button" onClick={() => openUserModal('reset-password', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]" style={{ color: COLORS.text }}>
                      <Lock size={13} /> Reset password
                    </button>
                    <button type="button" onClick={() => openUserModal('reset-2fa', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]" style={{ color: COLORS.text }}>
                      <Shield size={13} /> Reset 2FA
                    </button>
                    <button type="button" onClick={() => openUserModal('change-role', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]" style={{ color: COLORS.text }}>
                      <RefreshCw size={13} /> Change role
                    </button>
                    <button type="button" onClick={() => openUserModal('impersonate', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#F7F5F2]" style={{ color: COLORS.text }}>
                      <Eye size={13} /> View as user
                    </button>
                    <div className="my-1 h-px" style={{ background: COLORS.borderSoft }} />
                    <button type="button" onClick={() => openUserModal('deactivate', user)} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold hover:bg-[#FDEBE8]" style={{ color: COLORS.red }}>
                      <AlertTriangle size={13} /> Deactivate user
                    </button>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </div>

      <div className="rounded-xl border px-4 py-3 text-xs sm:text-sm" style={{ borderColor: 'rgba(91,74,139,0.2)', background: '#F3EFFA', color: COLORS.plumDeep }}>
        <strong>Admin note:</strong> Advisors cannot be deactivated until all assigned clients are reassigned. David Chen currently has 18 clients pending reassignment.
      </div>

      <BasicModal
        open={modalType === 'edit'}
        title="Edit user"
        subtitle="Changes will be logged to the audit trail · User will be notified"
        onClose={closeUserModal}
        actions={(
          <>
            <button type="button" onClick={closeUserModal} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
              Cancel
            </button>
            <button type="button" onClick={closeUserModal} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.plum }}>
              Save changes
            </button>
          </>
        )}
      >
        <div className="max-h-[68vh] space-y-4 overflow-y-auto pr-1">
          <div className="rounded-2xl border p-3" style={{ borderColor: COLORS.border, background: '#EFEAF6' }}>
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full text-sm font-extrabold text-white"
                style={editPhotoPreview ? { backgroundImage: `url(${editPhotoPreview})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: selectedUser?.avatarBg || COLORS.plum }}
              >
                {editPhotoPreview ? '' : selectedUser?.avatar || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold" style={{ color: '#1A2942' }}>{selectedUser?.name}</div>
                <div className="text-xs" style={{ color: '#5B6D88' }}>{selectedUser?.email}</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border, background: '#F7F5F2' }}>
            <div className="flex items-center gap-3">
              <div
                className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full text-lg font-extrabold text-white"
                style={editPhotoPreview ? { backgroundImage: `url(${editPhotoPreview})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: selectedUser?.avatarBg || '#1A3F6A' }}
              >
                {editPhotoPreview ? '' : selectedUser?.avatar || 'U'}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-2xl font-bold tracking-tight" style={{ color: '#1A2942' }}>Profile photo</div>
                <p className="mt-1 text-sm" style={{ color: '#5B6D88' }}>
                  JPG or PNG · Square 400x400 minimum · Max 2 MB · Visible to clients on advisor profile, directory, and email signatures
                </p>
                <input ref={editPhotoInputRef} type="file" accept="image/*" onChange={handleEditPhotoUpload} className="hidden" />
                <button type="button" onClick={openEditPhotoPicker} className="mt-2 inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
                  <Upload size={13} /> Upload photo
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Full name</div>
            <input className="w-full rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: COLORS.border, color: '#1A2942' }} value={editName} onChange={(e) => setEditName(e.target.value)} />
          </div>

          <div>
            <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Email</div>
            <input className="w-full rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: COLORS.border, color: '#1A2942' }} value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
            <p className="mt-1.5 text-xs font-semibold" style={{ color: '#A06A00' }}>
              <AlertTriangle size={12} className="mr-1 inline" />Changing the email changes this user's login. They'll be forced to re-verify via the new address.
            </p>
          </div>

          <div>
            <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>
              User ID <span className="font-semibold normal-case" style={{ letterSpacing: 0 }}>· System identifier · Read-only</span>
            </div>
            <input
              readOnly
              className="w-full cursor-not-allowed rounded-xl border px-3 py-2.5 font-mono text-sm"
              style={{ borderColor: COLORS.border, color: '#8A96A8', background: '#F3F1EE' }}
              value={selectedUser?.id || ''}
            />
          </div>

          <div>
            <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Role</div>
            <input
              readOnly
              className="w-full cursor-not-allowed rounded-xl border px-3 py-2.5 text-sm"
              style={{ borderColor: COLORS.border, color: '#8A96A8', background: '#F3F1EE' }}
              value={selectedUser ? ROLE_LABELS[selectedUser.role] : ''}
            />
          </div>

          <div>
            <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Location</div>
            <select className="w-full rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: COLORS.border, color: '#1A2942' }} value={editLocation} onChange={(e) => setEditLocation(e.target.value)}>
              <option>Katy</option>
              <option>Downtown Houston</option>
              <option>Pearland</option>
              <option>All locations</option>
            </select>
          </div>
        </div>
      </BasicModal>

      <BasicModal
        open={modalType === 'reset-password'}
        title="Reset password"
        subtitle="Override user credentials · Logged to audit trail"
        onClose={closeUserModal}
        actions={(
          <>
            <button type="button" onClick={closeUserModal} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
              Cancel
            </button>
            <button type="button" onClick={closeUserModal} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.plum }}>
              {passwordMode === 'link' ? 'Send reset link' : 'Set temporary password'}
            </button>
          </>
        )}
      >
        <div className="max-h-[68vh] space-y-4 overflow-y-auto pr-1">
          <div className="rounded-2xl border p-3" style={{ borderColor: COLORS.border, background: '#EFEAF6' }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ background: selectedUser?.avatarBg || COLORS.plum }}>
                {selectedUser?.avatar || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold" style={{ color: '#1A2942' }}>{selectedUser?.name}</div>
                <div className="text-xs" style={{ color: '#5B6D88' }}>{selectedUser?.email}</div>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Reset method</div>
            <button
              type="button"
              onClick={() => setPasswordMode('link')}
              className="w-full rounded-xl border p-4 text-left"
              style={passwordMode === 'link' ? { borderColor: '#7461AF', background: '#F0ECFA' } : { borderColor: COLORS.border, background: '#FFFFFF' }}
            >
              <div className="flex items-start gap-3">
                <input type="radio" checked={passwordMode === 'link'} onChange={() => setPasswordMode('link')} className="mt-1 h-4 w-4" />
                <span className="block">
                  <span className="block text-lg font-bold" style={{ color: '#1A2942' }}>
                    Send password reset link via email
                    <span className="ml-2 text-sm font-extrabold uppercase" style={{ color: '#1A7A4A', letterSpacing: '0.04em' }}>Recommended</span>
                  </span>
                  <span className="mt-1 block text-sm" style={{ color: '#5B6D88' }}>
                    User receives an email with a 24-hour one-time link to create their own password. Most secure option per RBAC.
                  </span>
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setPasswordMode('temp')}
              className="mt-2 w-full rounded-xl border p-4 text-left"
              style={passwordMode === 'temp' ? { borderColor: '#7461AF', background: '#F0ECFA' } : { borderColor: COLORS.border, background: '#FFFFFF' }}
            >
              <div className="flex items-start gap-3">
                <input type="radio" checked={passwordMode === 'temp'} onChange={() => setPasswordMode('temp')} className="mt-1 h-4 w-4" />
                <span className="block">
                  <span className="block text-lg font-bold" style={{ color: '#1A2942' }}>Set temporary password now</span>
                  <span className="mt-1 block text-sm" style={{ color: '#5B6D88' }}>
                    Admin-set password · User will be forced to change it on first login. Use only when email access is unavailable.
                  </span>
                </span>
              </div>
            </button>
          </div>

          {passwordMode === 'temp' ? (
            <div className="flex items-center gap-2 rounded-lg border px-3 py-2" style={{ borderColor: COLORS.border }}>
              <span className="text-xs font-bold uppercase" style={{ color: COLORS.textMuted }}>Temp Password</span>
              <span className="ml-auto text-sm font-semibold" style={{ color: COLORS.text }}>{tempPassword}</span>
              <button type="button" onClick={generateTempPassword} className="rounded-md border px-2 py-1 text-[11px] font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
                Regenerate
              </button>
            </div>
          ) : null}

          <div className="border-t pt-3" style={{ borderColor: COLORS.borderSoft }}>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Additional actions</div>
            <div className="space-y-3 rounded-xl p-3" style={{ background: '#F7F5F2' }}>
              <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#1A2942' }}>
                <input type="checkbox" checked={resetForceLogout} onChange={(e) => setResetForceLogout(e.target.checked)} className="h-4 w-4" />
                Force logout from all active sessions
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#1A2942' }}>
                <input type="checkbox" checked={resetNotifyUser} onChange={(e) => setResetNotifyUser(e.target.checked)} className="h-4 w-4" />
                Notify user via email
              </label>
              <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#1A2942' }}>
                <input type="checkbox" checked={resetRequire2FA} onChange={(e) => setResetRequire2FA(e.target.checked)} className="h-4 w-4" />
                Require 2FA re-verification on next login
              </label>
            </div>
          </div>
        </div>
      </BasicModal>

      <BasicModal
        open={modalType === 'reset-2fa'}
        title="Reset 2FA"
        subtitle="Revoke enrolled devices · Logged to audit trail"
        onClose={closeUserModal}
        actions={(
          <>
            <button type="button" onClick={closeUserModal} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
              Cancel
            </button>
            <button type="button" onClick={closeUserModal} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white" style={{ background: '#D14531' }}>
              Revoke 2FA & notify
            </button>
          </>
        )}
      >
        <div className="max-h-[68vh] space-y-4 overflow-y-auto pr-1">
          <div className="rounded-2xl border p-3" style={{ borderColor: COLORS.border, background: '#EFEAF6' }}>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ background: selectedUser?.avatarBg || COLORS.plum }}>
                {selectedUser?.avatar || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-extrabold" style={{ color: '#1A2942' }}>{selectedUser?.name}</div>
                <div className="text-xs" style={{ color: '#5B6D88' }}>{selectedUser?.email}</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: '#F2B4AE', background: '#FDEBE8' }}>
            <div className="flex items-start gap-3">
              <AlertTriangle size={20} style={{ color: '#D14531', marginTop: '2px' }} />
              <div>
                <p className="text-xl font-bold" style={{ color: '#D14531' }}>
                  This will revoke all enrolled 2FA devices
                </p>
                <p className="mt-1 text-sm" style={{ color: '#1A2942' }}>
                  The user will be locked out until they re-enroll a new authenticator on their next login. Use this when they've lost access to their phone or changed devices.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 rounded-xl p-4" style={{ background: '#F1EFED' }}>
            <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#1A2942' }}>
              <input type="checkbox" checked={reset2faForceLogout} onChange={(e) => setReset2faForceLogout(e.target.checked)} className="h-4 w-4" />
              Force logout from all active sessions
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#1A2942' }}>
              <input type="checkbox" checked={reset2faNotifyUser} onChange={(e) => setReset2faNotifyUser(e.target.checked)} className="h-4 w-4" />
              Send notification email to user
            </label>
            <label className="flex items-center gap-2 text-sm font-semibold" style={{ color: '#1A2942' }}>
              <input type="checkbox" checked={reset2faRequireEnroll} onChange={(e) => setReset2faRequireEnroll(e.target.checked)} className="h-4 w-4" />
              Require 2FA re-enrollment on next login (per RBAC)
            </label>
          </div>

          <div className="rounded-xl border p-4" style={{ borderColor: '#B8D8D5', background: '#E6F1F0' }}>
            <div className="flex items-start gap-3">
              <Info size={20} style={{ color: '#1F6B6A', marginTop: '2px' }} />
              <p className="text-sm" style={{ color: '#125A5A' }}>
                On their next successful password login, the user will be prompted to set up a new authenticator app. They won't be able to access the portal until enrollment is complete.
              </p>
            </div>
          </div>
        </div>
      </BasicModal>

      <BasicModal
        open={modalType === 'change-role'}
        title="Change role"
        subtitle={selectedUser ? `User: ${selectedUser.name}` : ''}
        onClose={closeUserModal}
        actions={(
          <>
            <button type="button" onClick={closeUserModal} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
              Cancel
            </button>
            <button type="button" onClick={closeUserModal} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.plum }}>
              Change role
            </button>
          </>
        )}
      >
        <div className="space-y-3">
          <select className="w-full rounded-lg border px-3 py-2 text-sm" style={{ borderColor: COLORS.border }} value={nextRole} onChange={(e) => setNextRole(e.target.value)}>
            <option value="advisor">Advisor</option>
            <option value="rm">Relationship Manager</option>
            <option value="admin">Master Admin</option>
          </select>
          <div className="space-y-1 rounded-xl border p-3" style={{ borderColor: '#EADAB0', background: '#FEF9EE' }}>
            {roleImpact.map((line) => (
              <div key={line} className="text-xs" style={{ color: '#7a5a00' }}>
                {'->'} {line}
              </div>
            ))}
          </div>
        </div>
      </BasicModal>

      <BasicModal
        open={modalType === 'impersonate'}
        title="View as user"
        subtitle={selectedUser ? `Start an audited view session as ${selectedUser.name}.` : ''}
        onClose={closeUserModal}
        actions={(
          <>
            <button type="button" onClick={closeUserModal} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (selectedUser) {
                  onSetImpersonation?.(selectedUser.name)
                }
                closeUserModal()
              }}
              className="rounded-lg px-3 py-1.5 text-xs font-bold text-white"
              style={{ background: COLORS.plum }}
            >
              Start view session
            </button>
          </>
        )}
      >
        <div className="space-y-3">
          <div className="rounded-xl border p-3" style={{ borderColor: '#E8DDBD', background: '#FFF8E8' }}>
            <p className="text-sm font-bold" style={{ color: '#8A5F0A' }}>
              You are entering read-through mode.
            </p>
            <p className="mt-1 text-xs" style={{ color: COLORS.textSecondary }}>
              All actions are audit-logged and the top banner will show an active impersonation session.
            </p>
          </div>
          <div className="rounded-xl border p-3 text-xs" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
            Session scope: client records, pipeline visibility, messaging context, and document previews.
          </div>
        </div>
      </BasicModal>

      <BasicModal
        open={modalType === 'deactivate'}
        title="Deactivate user"
        subtitle={selectedUser ? `User: ${selectedUser.name}` : ''}
        onClose={closeUserModal}
        actions={(
          deactivationBlocked ? (
            <>
              <button type="button" onClick={closeUserModal} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  closeUserModal()
                  onOpenWorkflowModal?.('review-reassign')
                }}
                className="rounded-lg px-3 py-1.5 text-xs font-bold text-white"
                style={{ background: COLORS.plum }}
              >
                Start reassignment wizard
              </button>
            </>
          ) : (
            <>
              <button type="button" onClick={closeUserModal} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
                Cancel
              </button>
              <button type="button" onClick={closeUserModal} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.red }}>
                Deactivate user
              </button>
            </>
          )
        )}
      >
        {deactivationBlocked ? (
          <div className="space-y-3">
            <div className="rounded-xl border p-3" style={{ borderColor: '#F3C4BE', background: '#FDEBE8' }}>
              <p className="text-sm font-bold" style={{ color: COLORS.red }}>
                Cannot deactivate yet. {selectedUser?.clients} clients must be reassigned first.
              </p>
              <p className="mt-1 text-xs" style={{ color: COLORS.textSecondary }}>
                Per policy, advisor deactivation is blocked until all active clients have new advisors.
              </p>
            </div>
            <div className="rounded-lg border p-3 text-xs" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
              Suggested targets: Yvonne (24/40), Rebecca (42/40), Pearland seat pending hire.
            </div>
          </div>
        ) : (
          <div className="rounded-xl border p-3" style={{ borderColor: '#F3C4BE', background: '#FDEBE8' }}>
            <p className="text-sm font-bold" style={{ color: COLORS.red }}>User will lose access immediately.</p>
            <p className="mt-1 text-xs" style={{ color: COLORS.textSecondary }}>
              All active sessions terminate and login remains blocked until reactivation.
            </p>
          </div>
        )}
      </BasicModal>
    </section>
  )
}

function ReportsPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.text }}>
        Reports
      </h2>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        <KpiCard label="MRR" value="$61.2K" sub="+7.5% QoQ" valueColor="#1A7A4A" />
        <KpiCard label="Net New Clients" value="+14" sub="+4 vs Q1" valueColor={COLORS.teal} />
        <KpiCard label="Churn" value="2.1%" sub="+0.4 pts QoQ" valueColor={COLORS.red} />
      </div>
    </section>
  )
}

function BillingPage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight" style={{ color: COLORS.text }}>
        Billing & Subscriptions
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="MRR" value="$61,243" sub="+$4,280 vs March" />
        <KpiCard label="ARR" value="$734,916" sub="+7.5% QoQ" />
        <KpiCard label="Past Due" value="$1,047" sub="3 subs" valueColor={COLORS.red} />
        <KpiCard label="Churn (30d)" value="2.1%" sub="4 cancellations" />
      </div>

      <div className="overflow-hidden rounded-2xl border" style={{ background: COLORS.card, borderColor: COLORS.border }}>
        <div
          className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-3 border-b px-4 py-3 text-[11px] font-extrabold uppercase"
          style={{ borderColor: COLORS.borderSoft, color: COLORS.textMuted, letterSpacing: '0.07em' }}
        >
          <span>Client</span>
          <span>Plan</span>
          <span>Status</span>
          <span>Amount</span>
          <span>Past Due</span>
        </div>
        {[
          { client: 'Marcus Hill', plan: 'Quarterly', status: 'Past due', amount: '$349.00', due: '13 days' },
          { client: 'Rachel Gonzalez', plan: 'Quarterly', status: 'Dunning', amount: '$349.00', due: '8 days' },
          { client: 'Thomas Park', plan: 'Seasonal', status: 'Dunning', amount: '$349.00', due: '4 days' },
        ].map((row) => (
          <div
            key={row.client}
            className="grid grid-cols-[1.3fr_1fr_1fr_1fr_1fr] gap-3 border-b px-4 py-3 text-sm"
            style={{ borderColor: COLORS.borderSoft, color: COLORS.text }}
          >
            <span className="font-semibold">{row.client}</span>
            <span>{row.plan}</span>
            <span style={{ color: row.status === 'Past due' ? COLORS.red : '#B8860B' }}>{row.status}</span>
            <span>{row.amount}</span>
            <span style={{ color: row.status === 'Past due' ? COLORS.red : '#B8860B' }}>{row.due}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function MobileQuickNav() {
  return null
}

function BasicModal({ open, title, subtitle, onClose, children, actions }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4" role="dialog" aria-modal="true">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl" style={{ background: COLORS.card }}>
        <div className="flex items-start justify-between border-b px-5 py-4" style={{ borderColor: COLORS.borderSoft }}>
          <div>
            <h3 className="text-lg font-bold" style={{ color: COLORS.text }}>{title}</h3>
            {subtitle ? (
              <p className="mt-1 text-xs" style={{ color: COLORS.textSecondary }}>{subtitle}</p>
            ) : null}
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-[#F7F5F2]" aria-label="Close">
            <X size={16} color={COLORS.textMuted} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        <div className="flex justify-end gap-2 border-t px-5 py-3" style={{ borderColor: COLORS.borderSoft }}>
          {actions}
        </div>
      </div>
    </div>
  )
}

function ApproveReassignmentModal({ open, onClose, onViewThread }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-2 sm:p-4" role="dialog" aria-modal="true">
      <div className="flex h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl" style={{ background: COLORS.card }}>
        <div className="flex items-start justify-between border-b px-5 py-4" style={{ borderColor: COLORS.borderSoft }}>
          <div>
            <h3 className="text-3xl font-bold tracking-tight" style={{ color: '#1A2942' }}>Approve reassignment</h3>
            <p className="mt-1 text-sm" style={{ color: '#40577A' }}>
              Janet requested reassignment to Yvonne · Approve to execute individually (outside the bulk Apr 28 workflow)
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl border p-2" style={{ borderColor: COLORS.border }} aria-label="Close">
            <X size={16} color={COLORS.textMuted} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Client</div>
            <div className="rounded-2xl border p-4" style={{ borderColor: '#D9DDE4', background: '#FAFBFC' }}>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ background: '#D8A41B' }}>
                  JO
                </div>
                <div className="min-w-0">
                  <div className="text-2xl font-bold tracking-tight" style={{ color: '#1A2942' }}>Janet Okafor</div>
                  <div className="text-sm" style={{ color: '#5E6F88' }}>janet.okafor@gmail.com · (713) 555-0134</div>
                  <div className="mt-2 flex flex-wrap gap-1.5 text-[11px] font-semibold">
                    <span className="rounded-md border px-2 py-0.5" style={{ borderColor: '#CDE9D8', background: '#EAF7F0', color: '#177245' }}>FFS 84</span>
                    <span className="rounded-md border px-2 py-0.5" style={{ borderColor: '#D9DDE4', color: '#4B5E7B' }}>Quarterly · $349</span>
                    <span className="rounded-md border px-2 py-0.5" style={{ borderColor: '#D9DDE4', color: '#4B5E7B' }}>Downtown Houston</span>
                    <span className="rounded-md border px-2 py-0.5" style={{ borderColor: '#D9DDE4', color: '#4B5E7B' }}>Member since Jan 2025</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Original request</div>
            <div className="rounded-2xl border-l-3 p-4" style={{ borderColor: '#6B57A8', background: '#FCFBFE' }}>
              <div className="mb-2 flex items-center justify-between text-[11px] font-bold uppercase" style={{ color: '#7D8DA6', letterSpacing: '0.06em' }}>
                <span>From Janet · Portal message</span>
                <span style={{ textTransform: 'none' }}>Yesterday · 4:30 PM</span>
              </div>
              <p className="text-base italic" style={{ color: '#1A2942' }}>
                "Also following up — I’d like to request being reassigned to a different Advisor. Not sure what’s happening with you but I heard you might be leaving. Hoping to move to Yvonne?"
              </p>
              <button type="button" onClick={onViewThread} className="mt-2 text-sm font-bold" style={{ color: '#1A2942' }}>
                View full thread -&gt;
              </button>
            </div>
          </section>

          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Currently assigned to</div>
            <div className="rounded-2xl border p-4" style={{ borderColor: '#D9DDE4', background: '#F9FAFB' }}>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold" style={{ background: '#C7CEDA', color: '#FFFFFF' }}>
                  DC
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold tracking-tight" style={{ color: '#4F5E76' }}>David Chen</span>
                    <span className="text-sm font-bold" style={{ color: '#A0822D' }}>Pending deactivation</span>
                  </div>
                  <div className="text-sm" style={{ color: '#98A3B5' }}>Downtown · Last day Apr 30 · 18 clients pending reassignment</div>
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-center">
            <ArrowDown size={20} color="#8EA0BB" />
          </div>

          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#087A46' }}>Reassign to (approved)</div>
            <div className="rounded-2xl border p-4" style={{ borderColor: '#D9DDE4', background: '#FAFBFC' }}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ background: '#173B67' }}>
                    YC
                  </div>
                  <div>
                    <div className="text-2xl font-bold tracking-tight" style={{ color: '#1A2942' }}>Yvonne Hollis-Cobb</div>
                    <div className="text-sm" style={{ color: '#6F7E95' }}>Katy · CEO / Lead Advisor · Cross-location reassignment</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold" style={{ color: '#1A2942' }}>
                  <span>24</span>
                  <span style={{ color: '#0D8B53' }}>➜ 25</span>
                  <span style={{ color: '#98A3B5' }}>/ 40</span>
                  <span className="h-1.5 w-16 rounded-full" style={{ background: '#E4E8EE' }}>
                    <span className="block h-1.5 rounded-full" style={{ width: '62%', background: '#0D8B53' }} />
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border px-4 py-3" style={{ borderColor: '#E6CC8F', background: '#FFF8E8' }}>
            <div className="flex items-start gap-2 text-sm" style={{ color: '#8A5F0A' }}>
              <AlertTriangle size={16} className="mt-0.5 shrink-0" />
              <p>
                <span className="font-bold">Cross-location note.</span> Janet's location will change from Downtown Houston to Katy. Janet explicitly requested Yvonne by name - location change is expected and consistent with client's intent.
              </p>
            </div>
          </section>

          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Handoff note · Optional · Visible to Yvonne</div>
            <textarea
              className="h-24 w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: '#D9DDE4', color: '#1A2942' }}
              defaultValue="Janet asked about Q2 estimated tax payment calibration 3 days ago - still unanswered."
            />
          </section>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t px-5 py-3" style={{ borderColor: COLORS.borderSoft }}>
          <button type="button" onClick={onClose} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
            Cancel
          </button>
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.green }}>
            Approve & reassign
          </button>
        </div>
      </div>
    </div>
  )
}

function ReviewReassignModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-2 sm:p-4" role="dialog" aria-modal="true">
      <div className="flex h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl" style={{ background: COLORS.card }}>
        <div className="flex items-start justify-between border-b px-5 py-4" style={{ borderColor: COLORS.borderSoft }}>
          <div>
            <h3 className="text-3xl font-bold tracking-tight" style={{ color: '#1A2942' }}>Review & reassign</h3>
            <p className="mt-1 text-sm" style={{ color: '#40577A' }}>
              David Chen deactivation on Apr 30 · 18 clients require reassignment and handoff routing.
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl border p-2" style={{ borderColor: COLORS.border }} aria-label="Close">
            <X size={16} color={COLORS.textMuted} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <section className="rounded-2xl border p-4" style={{ borderColor: '#D9DDE4', background: '#FAFBFC' }}>
            <div className="mb-3 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Source advisor</div>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ background: '#AAB4C5' }}>
                  DC
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight" style={{ color: '#1A2942' }}>David Chen</div>
                  <div className="text-sm" style={{ color: '#687B98' }}>Downtown Houston · Advisor</div>
                </div>
              </div>
              <span className="rounded-md px-2 py-1 text-xs font-bold" style={{ background: '#FFF6E5', color: '#9A6D09' }}>
                Pending deactivation
              </span>
            </div>
          </section>

          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Client reassignment plan</div>
            <div className="overflow-hidden rounded-2xl border" style={{ borderColor: '#D9DDE4' }}>
              <div className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-3 border-b px-4 py-2 text-[11px] font-extrabold uppercase" style={{ borderColor: '#E8EBF0', color: '#7D8DA6', letterSpacing: '0.06em' }}>
                <span>Client</span>
                <span>Current</span>
                <span>Reassign to</span>
                <span>Status</span>
              </div>
              {[
                ['Janet Okafor', 'David', 'Yvonne', 'Approved'],
                ['Marcus Hill', 'David', 'Angela', 'Ready'],
                ['Rachel Gonzalez', 'David', 'Yvonne', 'Ready'],
                ['Thomas Park', 'David', 'Angela', 'Ready'],
              ].map((row) => (
                <div key={row[0]} className="grid grid-cols-[1.2fr_1fr_1fr_auto] gap-3 border-b px-4 py-3 text-sm" style={{ borderColor: '#F0F2F6', color: '#1A2942' }}>
                  <span className="font-semibold">{row[0]}</span>
                  <span style={{ color: '#687B98' }}>{row[1]}</span>
                  <span className="font-semibold" style={{ color: '#1F5C94' }}>{row[2]}</span>
                  <span className="rounded-md px-2 py-0.5 text-[11px] font-bold" style={{ background: row[3] === 'Approved' ? '#EAF7F0' : '#EEF4FF', color: row[3] === 'Approved' ? '#177245' : '#285CA8' }}>
                    {row[3]}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border px-4 py-3" style={{ borderColor: '#D8E6FF', background: '#F4F8FF' }}>
            <div className="text-sm" style={{ color: '#315A99' }}>
              <span className="font-bold">Workload check.</span> This plan keeps all destination advisors below 70% capacity and preserves same-location routing where possible.
            </div>
          </section>

          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Ops note · Internal only</div>
            <textarea
              className="h-24 w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: '#D9DDE4', color: '#1A2942' }}
              defaultValue="Execute all remaining client moves by Apr 28 EOD and trigger advisor handoff notifications."
            />
          </section>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t px-5 py-3" style={{ borderColor: COLORS.borderSoft }}>
          <button type="button" onClick={onClose} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
            Cancel
          </button>
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.plum }}>
            Execute reassignment
          </button>
        </div>
      </div>
    </div>
  )
}

function UnlockDocumentModal({ open, onClose }) {
  const [duration, setDuration] = useState('48 hours')
  const [reason, setReason] = useState('Client requested correction (employer issued amended W-2)')

  if (!open) return null

  const options = [
    {
      label: '24 hours',
      help: 'Client has 24 hours to replace the file · Auto-relocks tomorrow at 5:00 PM',
      badge: 'Standard',
      badgeBg: '#E8F5EE',
      badgeColor: '#177245',
    },
    {
      label: '48 hours',
      help: 'Gives client weekend buffer · Auto-relocks Sunday at 5:00 PM · Recommended for non-urgent replacements',
      badge: 'Recommended',
      badgeBg: '#E8F0FF',
      badgeColor: '#244D90',
    },
    {
      label: '1 week',
      help: 'Auto-relocks Apr 24 at 5:00 PM · Use when client needs to coordinate with a third party (employer, CPA, etc.)',
      badge: '',
    },
    {
      label: 'Permanent unlock',
      help: 'Stays unlocked until manually relocked · Use with caution · Bypasses the 24hr auto-lock policy',
      badge: 'Manual relock required',
      badgeBg: '#FFEDE9',
      badgeColor: '#BE3E2D',
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-2 sm:p-4" role="dialog" aria-modal="true">
      <div className="flex h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl" style={{ background: COLORS.card }}>
        <div className="flex items-start justify-between border-b px-5 py-4" style={{ borderColor: COLORS.borderSoft }}>
          <div>
            <h3 className="text-3xl font-bold tracking-tight" style={{ color: '#1A2942' }}>Unlock document</h3>
            <p className="mt-1 text-sm" style={{ color: '#40577A' }}>
              Grant temporary edit access so Marcus Hill can replace the locked W-2 with a corrected version
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl border p-2" style={{ borderColor: COLORS.border }} aria-label="Close">
            <X size={16} color={COLORS.textMuted} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <section className="rounded-2xl p-4" style={{ background: '#F2F0FA' }}>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-white" style={{ background: '#6553A3' }}>
                <FileText size={16} />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tight" style={{ color: '#1A2942' }}>W-2 (2025 · Western Insurance Partners)</div>
                <div className="text-sm" style={{ color: '#5B6D88' }}>Marcus Hill · Locked Apr 15 · 184 KB · Preview -&gt;</div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Client's unlock request</div>
            <div className="rounded-2xl border-l-3 p-4" style={{ borderColor: '#6B57A8', background: '#FCFBFE' }}>
              <div className="mb-2 text-right text-[11px] font-bold" style={{ color: '#7D8DA6' }}>Apr 16 · 2:08 PM</div>
              <p className="text-base italic" style={{ color: '#1A2942' }}>
                "Hey team, I just realized the W-2 I uploaded has an error - my employer sent a corrected version with updated Box 12 code DD (healthcare). Can you unlock so I can replace? Thanks!"
              </p>
            </div>
          </section>

          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Unlock duration</div>
            <div className="space-y-2.5">
              {options.map((item) => {
                const selected = duration === item.label
                return (
                  <label
                    key={item.label}
                    className="flex cursor-pointer items-start justify-between gap-3 rounded-2xl border px-4 py-3"
                    style={{
                      borderColor: selected ? '#6553A3' : '#D9DDE4',
                      background: selected ? '#F5F2FC' : '#FFFFFF',
                      boxShadow: selected ? '0 0 0 1px #6553A3 inset' : 'none',
                    }}
                  >
                    <span className="flex items-start gap-2.5">
                      <input
                        type="radio"
                        name="unlock-duration"
                        checked={selected}
                        onChange={() => setDuration(item.label)}
                        className="mt-1"
                      />
                      <span>
                        <span className="block text-2xl font-bold tracking-tight" style={{ color: '#1A2942' }}>{item.label}</span>
                        <span className="block max-w-2xl text-sm" style={{ color: '#5B6D88' }}>{item.help}</span>
                      </span>
                    </span>
                    {item.badge ? (
                      <span className="shrink-0 rounded-md px-2 py-0.5 text-[11px] font-bold" style={{ background: item.badgeBg, color: item.badgeColor }}>
                        {item.badge}
                      </span>
                    ) : null}
                  </label>
                )
              })}
            </div>
          </section>

          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Reason · Required for audit</div>
            <select
              className="w-full rounded-xl border px-3 py-2 text-sm"
              style={{ borderColor: '#D9DDE4', color: '#1A2942' }}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            >
              <option>Client requested correction (employer issued amended W-2)</option>
              <option>Advisor approved replacement after QA review</option>
              <option>File was uploaded with wrong document type</option>
              <option>Manual unlock approved by compliance</option>
            </select>
          </section>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t px-5 py-3" style={{ borderColor: COLORS.borderSoft }}>
          <button type="button" onClick={onClose} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
            Cancel
          </button>
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.teal }}>
            Unlock {duration.toLowerCase()}
          </button>
        </div>
      </div>
    </div>
  )
}

function CreateUserModal({ open, onClose }) {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('michael@takeawaytax.com')
  const [userId, setUserId] = useState('')
  const [role, setRole] = useState('Advisor')
  const [credentialMode, setCredentialMode] = useState('password')
  const [tempPassword, setTempPassword] = useState('TxCat-Ranch-8729!')
  const [showPassword, setShowPassword] = useState(false)
  const [requireChangeOnLogin, setRequireChangeOnLogin] = useState(true)
  const [require2FAOnLogin, setRequire2FAOnLogin] = useState(true)
  const [emailCredsAfterCreate, setEmailCredsAfterCreate] = useState(false)
  const [photoPreview, setPhotoPreview] = useState('')
  const photoInputRef = useRef(null)

  useEffect(() => {
    const trimmedEmail = email.trim().toLowerCase()
    if (!trimmedEmail.includes('@')) {
      setUserId('auto-generated from email')
      return
    }
    const namePart = trimmedEmail.split('@')[0]
    const generated = namePart.replace(/[^a-z0-9]+/g, '.').replace(/^\.+|\.+$/g, '')
    setUserId(generated || 'auto-generated from email')
  }, [email])

  const generateTempPassword = () => {
    const left = ['TxCat', 'Summit', 'Oak', 'Delta', 'Harbor']
    const right = ['Ranch', 'Ledger', 'Prime', 'Bridge', 'Vault']
    const number = Math.floor(Math.random() * 9000 + 1000)
    const symbol = ['!', '@', '#', '$'][Math.floor(Math.random() * 4)]
    const first = left[Math.floor(Math.random() * left.length)]
    const second = right[Math.floor(Math.random() * right.length)]
    setTempPassword(`${first}-${second}-${number}${symbol}`)
  }

  const copyTempPassword = async () => {
    try {
      await navigator.clipboard.writeText(tempPassword)
    } catch {
      // Ignore clipboard errors in restricted browser contexts.
    }
  }

  const openPhotoPicker = () => {
    photoInputRef.current?.click()
  }

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoPreview(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const removePhoto = () => {
    setPhotoPreview('')
    if (photoInputRef.current) {
      photoInputRef.current.value = ''
    }
  }

  const passwordStrength = useMemo(() => {
    let score = 0
    if (tempPassword.length >= 12) score += 1
    if (/[A-Z]/.test(tempPassword) && /[a-z]/.test(tempPassword)) score += 1
    if (/\d/.test(tempPassword)) score += 1
    if (/[^A-Za-z0-9]/.test(tempPassword)) score += 1
    return score
  }, [tempPassword])

  const avatarInitials = useMemo(() => {
    const parts = fullName.trim().split(/\s+/).filter(Boolean)
    if (parts.length === 0) return '+'
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase()
    return `${parts[0].slice(0, 1)}${parts[parts.length - 1].slice(0, 1)}`.toUpperCase()
  }, [fullName])

  if (!open) return null

  const strengthLabel = passwordStrength >= 4 ? 'Strong' : passwordStrength === 3 ? 'Good' : 'Weak'
  const strengthWidth = passwordStrength >= 4 ? '100%' : passwordStrength === 3 ? '74%' : '42%'
  const strengthColor = passwordStrength >= 4 ? '#177245' : passwordStrength === 3 ? '#A0822D' : COLORS.red

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-2 sm:p-4" role="dialog" aria-modal="true">
      <div className="flex h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl" style={{ background: COLORS.card }}>
        <div className="flex items-start justify-between border-b px-5 py-4" style={{ borderColor: COLORS.borderSoft }}>
          <div>
            <h3 className="text-3xl font-bold tracking-tight" style={{ color: '#1A2942' }}>Create new user</h3>
            <p className="mt-1 text-sm" style={{ color: '#40577A' }}>
              Set credentials now, or send an email invite for self-setup · All actions logged to audit trail
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl border p-2" style={{ borderColor: COLORS.border }} aria-label="Close">
            <X size={16} color={COLORS.textMuted} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-4">
          <section>
            <div className="mb-2 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Identity</div>
            <div className="rounded-2xl border p-4" style={{ borderColor: COLORS.border }}>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={openPhotoPicker}
                  className="flex h-18 w-18 items-center justify-center overflow-hidden rounded-full text-2xl font-bold text-white"
                  style={photoPreview ? { backgroundImage: `url(${photoPreview})`, backgroundSize: 'cover', backgroundPosition: 'center' } : { background: '#1A3F6A' }}
                >
                  {photoPreview ? '' : avatarInitials}
                </button>
                <div className="min-w-0 flex-1">
                  <div className="text-2xl font-bold tracking-tight" style={{ color: '#1A2942' }}>Profile photo</div>
                  <p className="mt-1 text-sm" style={{ color: '#5B6D88' }}>
                    JPG or PNG · Square 400x400 minimum · Max 2 MB · Visible to clients on advisor profile, directory, and email signatures
                  </p>
                  <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <button type="button" onClick={openPhotoPicker} className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
                      <Upload size={13} /> Upload photo
                    </button>
                    {photoPreview ? (
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-bold"
                        style={{ borderColor: '#F3C4BE', color: COLORS.red, background: '#FDEBE8' }}
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <div>
              <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Full name</div>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="e.g. Michael Rodriguez"
                className="w-full rounded-xl border px-3 py-2.5 text-sm"
                style={{ borderColor: COLORS.border, color: '#1A2942' }}
              />
            </div>

            <div>
              <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Email</div>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border px-3 py-2.5 text-sm"
                style={{ borderColor: COLORS.border, color: '#1A2942' }}
              />
            </div>

            <div>
              <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>
                User ID <span className="font-semibold normal-case" style={{ letterSpacing: 0 }}>· Unique handle for login & audit trail</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  value={userId}
                  onChange={(event) => setUserId(event.target.value)}
                  className="w-full rounded-xl border px-3 py-2.5 font-mono text-sm"
                  style={{ borderColor: COLORS.border, color: '#1A2942' }}
                />
                <button type="button" onClick={() => setEmail(email)} className="rounded-lg border p-2" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }} aria-label="Regenerate user id">
                  <RefreshCw size={14} />
                </button>
              </div>
              <p className="mt-1 text-xs" style={{ color: '#8A96A8' }}>Format: firstname.lastname · Must be unique across the franchise</p>
            </div>

            <div>
              <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Role</div>
              <select value={role} onChange={(event) => setRole(event.target.value)} className="w-full rounded-xl border px-3 py-2.5 text-sm" style={{ borderColor: COLORS.border, color: '#1A2942' }}>
                <option>Advisor</option>
                <option>Relationship Manager</option>
                <option>Office</option>
                <option>Master Admin</option>
              </select>
            </div>
          </section>

          <section>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 border-b pb-2" style={{ borderColor: COLORS.borderSoft }}>
              <div className="text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Credentials</div>
              <div className="rounded-lg p-0.5" style={{ background: '#F5F3EF' }}>
                <button
                  type="button"
                  onClick={() => setCredentialMode('password')}
                  className="rounded-md px-3 py-1.5 text-xs font-bold"
                  style={{ background: credentialMode === 'password' ? COLORS.plum : 'transparent', color: credentialMode === 'password' ? '#FFFFFF' : COLORS.textSecondary }}
                >
                  Set password now
                </button>
                <button
                  type="button"
                  onClick={() => setCredentialMode('invite')}
                  className="rounded-md px-3 py-1.5 text-xs font-bold"
                  style={{ background: credentialMode === 'invite' ? COLORS.plum : 'transparent', color: credentialMode === 'invite' ? '#FFFFFF' : COLORS.textSecondary }}
                >
                  Email invite
                </button>
              </div>
            </div>

            {credentialMode === 'password' ? (
              <div className="space-y-3">
                <div>
                  <div className="mb-1 text-xs font-extrabold uppercase tracking-[0.08em]" style={{ color: '#7D8DA6' }}>Temporary password</div>
                  <div className="flex items-center gap-2">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={tempPassword}
                      onChange={(event) => setTempPassword(event.target.value)}
                      className="w-full rounded-xl border px-3 py-2.5 font-mono text-lg"
                      style={{ borderColor: COLORS.border, color: '#1A2942' }}
                    />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className="rounded-lg border p-2" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }} aria-label="Toggle password visibility">
                      <Eye size={15} />
                    </button>
                    <button type="button" onClick={generateTempPassword} className="rounded-lg border p-2" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }} aria-label="Regenerate password">
                      <RefreshCw size={15} />
                    </button>
                    <button type="button" onClick={copyTempPassword} className="rounded-lg border p-2" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }} aria-label="Copy password">
                      <Copy size={15} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="h-1.5 overflow-hidden rounded-full" style={{ background: '#E4E8EE' }}>
                    <div className="h-1.5 rounded-full" style={{ width: strengthWidth, background: strengthColor }} />
                  </div>
                  <div className="text-right text-xs font-bold uppercase" style={{ color: strengthColor }}>{strengthLabel}</div>
                </div>
              </div>
            ) : (
              <div className="rounded-xl border px-3 py-2 text-sm" style={{ borderColor: '#D8E6FF', background: '#F4F8FF', color: '#315A99' }}>
                User receives a secure invite to create their own password and enroll 2FA during first login.
              </div>
            )}

            <div className="mt-3 space-y-2 rounded-xl p-3" style={{ background: '#F7F5F2' }}>
              <label className="flex items-center gap-2 text-sm" style={{ color: '#1A2942' }}>
                <input type="checkbox" checked={requireChangeOnLogin} onChange={(event) => setRequireChangeOnLogin(event.target.checked)} />
                Require password change on first login
              </label>
              <label className="flex items-center gap-2 text-sm" style={{ color: '#1A2942' }}>
                <input type="checkbox" checked={require2FAOnLogin} onChange={(event) => setRequire2FAOnLogin(event.target.checked)} />
                Require 2FA enrollment on first login
                <span style={{ color: '#8A96A8' }}>(per RBAQ)</span>
              </label>
              <label className="flex items-center gap-2 text-sm" style={{ color: '#1A2942' }}>
                <input type="checkbox" checked={emailCredsAfterCreate} onChange={(event) => setEmailCredsAfterCreate(event.target.checked)} />
                Email credentials to user after creation
              </label>
            </div>
          </section>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t px-5 py-3" style={{ borderColor: COLORS.borderSoft }}>
          <button type="button" onClick={onClose} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
            Cancel
          </button>
          <button type="button" onClick={onClose} className="rounded-lg px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.plum }}>
            Create user
          </button>
        </div>
      </div>
    </div>
  )
}

export default function MasterAdminRoutes() {
  const navigate = useNavigate()
  const [activeModal, setActiveModal] = useState(null)
  const [impersonatingAs, setImpersonatingAs] = useState('')

  const closeModal = () => setActiveModal(null)

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: COLORS.bg }}>
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {impersonatingAs ? (
          <div className="flex items-center justify-between gap-3 px-4 py-2 text-xs font-semibold text-white sm:px-6" style={{ background: `linear-gradient(90deg, ${COLORS.plum}, ${COLORS.plumDeep})` }}>
            <span>Viewing as {impersonatingAs} · all actions are logged.</span>
            <button type="button" className="rounded-md border border-white/20 bg-white/10 px-2 py-1" onClick={() => setImpersonatingAs('')}>
              Exit view
            </button>
          </div>
        ) : null}

        <Topbar onOpenNewUser={() => setActiveModal('new-user')} onSetImpersonation={setImpersonatingAs} />
        <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          <MobileQuickNav />
          <div className="mt-4 lg:mt-0">
            <Routes>
              <Route path="/" element={<Navigate to="dashboard" replace />} />
              <Route
                path="dashboard"
                element={<DashboardPage onNavigate={(path) => navigate(`/admin-master/${path}`)} onOpenModal={setActiveModal} />}
              />
              <Route path="users" element={<UsersPage onOpenNewUser={() => setActiveModal('new-user')} onOpenWorkflowModal={setActiveModal} onSetImpersonation={setImpersonatingAs} />} />
              <Route path="clients" element={<ClientsPage />} />
              <Route path="clients/:clientId" element={<AdminClientDetail />} />
              <Route path="locations" element={<LocationsPage />} />
              <Route path="reports" element={<ReportsTabPage />} />
              <Route path="billing" element={<BillingTabPage />} />
              <Route path="audit" element={<AuditTrailPage />} />
              <Route path="partners" element={<PartnerNetworkPage />} />
              <Route path="taxnews" element={<TaxNewsPage />} />
              <Route path="broadcasts" element={<BroadcastsPage />} />
              <Route path="email" element={<EmailTemplatesPage />} />
              <Route path="ai" element={<AIModulesPage />} />
              <Route path="flags" element={<FeatureFlagsPage />} />
              <Route path="alerts" element={<AlertRulesPage />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </div>
        </main>
      </div>

      <CreateUserModal open={activeModal === 'new-user'} onClose={closeModal} />

      <ReviewReassignModal open={activeModal === 'review-reassign'} onClose={closeModal} />

      <BasicModal
        open={activeModal === 'approval-deny'}
        title="Deny Reassignment Request"
        subtitle="Client: Janet Okafor · Request: David Chen -> Yvonne"
        onClose={closeModal}
        actions={(
          <>
            <button type="button" onClick={closeModal} className="rounded-lg border px-3 py-1.5 text-xs font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}>
              Cancel
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg px-3 py-1.5 text-xs font-bold text-white"
              style={{ background: COLORS.red }}
            >
              Deny & notify
            </button>
          </>
        )}
      >
        <textarea className="h-28 w-full rounded-lg border p-3 text-sm" style={{ borderColor: COLORS.border }} defaultValue="Thanks for your request. We will complete reassignment through the bulk transition workflow and notify you shortly." />
      </BasicModal>

      <ApproveReassignmentModal
        open={activeModal === 'approval-approve'}
        onClose={closeModal}
        onViewThread={() => {
          closeModal()
          navigate('/admin-master/clients')
        }}
      />

      <UnlockDocumentModal open={activeModal === 'unlock-doc'} onClose={closeModal} />
    </div>
  )
}
