import { Building2, CalendarDays, MapPin, Users, Users2, X } from 'lucide-react'
import { useState } from 'react'

const COLORS = {
  border: '#E7E3DD',
  borderSoft: '#F0ECE5',
  text: '#1F2937',
  textSecondary: '#667085',
  textMuted: '#98A2B3',
  teal: '#2F7D79',
  tealBright: '#5ECFCA',
  navy: '#1B3A5C',
  green: '#1A7A4A',
  gold: '#B8860B',
}

const LOCATION_CARDS = [
  {
    id: 'katy',
    name: 'Katy',
    address: '23501 Cinco Ranch Blvd, Katy, TX 77494',
    headerGradient: 'linear-gradient(135deg,#1F5E5B 0%,#2F7D79 100%)',
    badge: { text: 'FLAGSHIP', bg: 'rgba(94,207,202,.2)', color: '#5ECFCA' },
    metrics: [
      { label: 'MRR', value: '$28.4K' },
      { label: 'Clients', value: '89' },
      { label: 'Retention', value: '94%', valueColor: '#5ECFCA' },
    ],
    teamTitle: 'Team on-site',
    team: [
      { initials: 'YC', name: 'Yvonne Hollis-Cobb', role: 'CEO - Lead Advisor', bg: '#1B3A5C' },
      { initials: 'KJ', name: 'Kesha Johnson', role: 'Client Coordinator', bg: '#D4A017' },
      { initials: 'AN', name: 'Anastasia Novak', role: 'Executive Assistant', bg: '#6B8E9E' },
      { initials: 'SM', name: 'Stephanie Morgan', role: 'Office Manager', bg: '#8B7355' },
    ],
    note: {
      bg: '#FDEBE8',
      border: '#C63D2F',
      color: '#C63D2F',
      text: 'Grand Opening: May 20, 2026 - 12 PM',
    },
  },
  {
    id: 'downtown',
    name: 'Downtown Houston',
    address: '1001 Fannin St, Houston, TX 77002',
    headerGradient: 'linear-gradient(135deg,#1B3A5C 0%,#2C5F7F 100%)',
    badge: { text: 'TOP REVENUE', bg: 'rgba(94,207,202,.2)', color: '#5ECFCA' },
    metrics: [
      { label: 'MRR', value: '$32.8K' },
      { label: 'Clients', value: '98' },
      { label: 'Retention', value: '88%', valueColor: '#FFB84D' },
    ],
    teamTitle: 'Team on-site',
    team: [
      {
        initials: 'DC',
        name: 'David Chen',
        role: 'Advisor - 18 clients to reassign',
        bg: '#1B3A5C',
        badge: { text: 'Pending deact.', bg: '#FEF9EE', color: '#7a5a00' },
        muted: true,
      },
      { initials: 'RM', name: 'Rebecca Mendoza', role: 'Senior Advisor', bg: '#1B3A5C' },
      {
        initials: 'AB',
        name: 'Angela Bernard',
        role: 'RM - All locations',
        bg: '#2F7D79',
        badge: { text: 'Remote', bg: '#F7F5F2', color: '#667085' },
      },
    ],
    note: {
      bg: '#FEF9EE',
      border: '#B8860B',
      color: '#7a5a00',
      text: 'Advisor coverage gap - 2 seats open',
    },
  },
  {
    id: 'pearland',
    name: 'Pearland',
    address: 'TBD, Pearland, TX 77584',
    headerGradient: 'linear-gradient(135deg,#B8860B 0%,#D4A017 100%)',
    badge: { text: 'OPENING OCT', bg: 'rgba(255,255,255,.18)', color: '#FFFFFF' },
    metrics: [
      { label: 'Lease', value: 'Signed' },
      { label: 'Build-out', value: '42%' },
      { label: 'Days out', value: '167' },
    ],
    teamTitle: 'Launch checklist',
    checklist: [
      { text: 'Lease signed - Jan 2026', done: true },
      { text: 'Permits approved', done: true },
      { text: 'Build-out in progress (42%)', pending: true },
      { text: 'Hire Advisor (2 candidates)' },
      { text: 'Hire Coordinator' },
      { text: 'Soft launch - Oct 1' },
      { text: 'Grand opening - Oct 15' },
    ],
  },
]

const DEFAULT_LAUNCH_STEPS = [
  { id: 1, label: 'Lease signed', step: 'Step 1', done: false },
  { id: 2, label: 'Permits approved', step: 'Step 2', done: false },
  { id: 3, label: 'Build-out complete', step: 'Step 3', done: false },
  { id: 4, label: 'Lead Advisor hired', step: 'Step 4', done: false },
  { id: 5, label: 'Client Coordinator hired', step: 'Step 5', done: false },
  { id: 6, label: 'Systems setup (phone, POS, Wi-Fi)', step: 'Step 6', done: false },
  { id: 7, label: 'Soft launch scheduled', step: 'Step 7', done: false },
  { id: 8, label: 'Grand opening scheduled', step: 'Step 8', done: false },
]

const HEADER_SWATCHES = [
  { id: 'teal', title: 'Teal (Katy)', gradient: 'linear-gradient(135deg,#1F5E5B 0%,#2F7D79 100%)' },
  { id: 'navy', title: 'Navy (Downtown)', gradient: 'linear-gradient(135deg,#1A2838 0%,#2C5F7F 100%)' },
  { id: 'gold', title: 'Gold (Pearland)', gradient: 'linear-gradient(135deg,#B8860B 0%,#D4A017 100%)' },
  { id: 'plum', title: 'Plum', gradient: 'linear-gradient(135deg,#3B2F5E 0%,#5B4A8B 100%)' },
  { id: 'forest', title: 'Forest', gradient: 'linear-gradient(135deg,#1B4332 0%,#2D6A4F 100%)' },
  { id: 'sienna', title: 'Sienna', gradient: 'linear-gradient(135deg,#8B3A3A 0%,#C0663A 100%)' },
]

function FieldLabel({ children }) {
  return (
    <label className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.08em]" style={{ color: '#98A2B3' }}>
      {children}
    </label>
  )
}

function InputBase({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`h-11 w-full rounded-xl border px-3 text-sm outline-none placeholder:text-[#9CA3AF] focus:border-[#7C66B3] ${className}`}
      style={{ borderColor: COLORS.border, color: COLORS.text }}
    />
  )
}

function SelectBase({ className = '', children, ...props }) {
  return (
    <select
      {...props}
      className={`h-11 w-full rounded-xl border px-3 text-sm outline-none focus:border-[#7C66B3] ${className}`}
      style={{ borderColor: COLORS.border, color: COLORS.text }}
    >
      {children}
    </select>
  )
}

function NewLocationModal({ onClose }) {
  const [form, setForm] = useState({
    name: '',
    street: '',
    city: '',
    state: 'TX',
    zip: '',
    phone: '',
    email: '',
    ownership: 'corporate',
    franchiseeName: '',
    businessEntity: '',
    franchiseEmail: '',
    franchisePhone: '',
    royaltyRate: '8% of gross revenue',
    marketingFee: '2% brand fund',
    territoryRadius: '5-mile exclusive',
    franchiseAgreement: false,
    trainingComplete: false,
    franchiseFeePaid: false,
    status: 'upcoming',
    openDate: '',
    badge: '',
    manager: 'hiring',
    advisorSeats: '2',
    rmSeats: '1',
    clientTarget: '80',
    headerGradient: HEADER_SWATCHES[0].gradient,
  })
  const [launchSteps, setLaunchSteps] = useState(DEFAULT_LAUNCH_STEPS)

  const setField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))
  const toggleLaunchStep = (id) => {
    setLaunchSteps((prev) => prev.map((step) => (step.id === id ? { ...step, done: !step.done } : step)))
  }

  const previewName = form.name.trim() || 'Your location name'
  const previewAddress = [form.street.trim(), form.city.trim(), form.state.trim(), form.zip.trim()]
    .filter(Boolean)
    .join(', ') || 'Full address will appear here'

  const createLocation = () => {
    onClose()
  }

  return (
    <div className="fixed inset-0 z-40 flex items-start justify-center bg-[#0B1320]/45 p-3 sm:p-6">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-2xl border bg-white shadow-2xl" style={{ borderColor: COLORS.border }}>
        <div className="flex items-start justify-between border-b px-5 py-4 sm:px-6" style={{ borderColor: COLORS.borderSoft }}>
          <div>
            <h2 className="text-[34px] font-extrabold tracking-[-0.02em] leading-none" style={{ color: COLORS.navy }}>
              New Location
            </h2>
            <p className="mt-2 max-w-[700px] text-[14px] leading-6" style={{ color: COLORS.textSecondary }}>
              Add a corporate-owned location or franchise - Creates a location card on this screen and makes it selectable for staff and client assignments
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border"
            style={{ borderColor: COLORS.border, color: COLORS.textMuted }}
            aria-label="Close new location form"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[calc(92vh-110px)] overflow-y-auto px-5 py-5 sm:px-6">
          <div className="text-[11px] font-extrabold uppercase tracking-[0.1em]" style={{ color: COLORS.textMuted }}>
            Location Identity
          </div>
          <div className="mt-2 border-t pt-3" style={{ borderColor: COLORS.borderSoft }}>
            <div>
              <FieldLabel>Location Name</FieldLabel>
              <InputBase value={form.name} onChange={(e) => setField('name', e.target.value)} placeholder="e.g. Sugar Land, The Woodlands, Cypress" />
              <p className="mt-1.5 text-[12px]" style={{ color: COLORS.textMuted }}>
                Short name used in navigation, reports, and client-facing labels (e.g. "Katy", "Downtown Houston")
              </p>
            </div>

            <div className="mt-4">
              <FieldLabel>Street Address</FieldLabel>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-[2fr_1fr_80px_1fr]">
                <InputBase value={form.street} onChange={(e) => setField('street', e.target.value)} placeholder="123 Main Street, Suite 200" />
                <InputBase value={form.city} onChange={(e) => setField('city', e.target.value)} placeholder="City" />
                <InputBase value={form.state} onChange={(e) => setField('state', e.target.value.toUpperCase())} placeholder="TX" maxLength={2} className="text-center" />
                <InputBase value={form.zip} onChange={(e) => setField('zip', e.target.value)} placeholder="ZIP" maxLength={10} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-3">
              <div>
                <FieldLabel>Phone</FieldLabel>
                <InputBase value={form.phone} onChange={(e) => setField('phone', e.target.value)} placeholder="(713) 555-0100" />
              </div>
              <div>
                <FieldLabel>Location Email</FieldLabel>
                <InputBase value={form.email} onChange={(e) => setField('email', e.target.value)} placeholder="sugarland@takeawaytax.com" />
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.1em]" style={{ color: COLORS.textMuted }}>
            Ownership Model
          </div>
          <div className="mt-2 grid grid-cols-1 gap-3 border-t pt-3 sm:grid-cols-2" style={{ borderColor: COLORS.borderSoft }}>
            <button
              type="button"
              className="rounded-2xl border-2 p-4 text-left"
              style={{
                borderColor: form.ownership === 'corporate' ? '#6D5BA9' : COLORS.border,
                background: form.ownership === 'corporate' ? '#F3F0FA' : '#FFFFFF',
              }}
              onClick={() => setField('ownership', 'corporate')}
            >
              <div className="flex items-center justify-between">
                <Building2 size={19} color={COLORS.navy} />
                {form.ownership === 'corporate' ? (
                  <div className="h-5 w-5 rounded-full text-center text-[11px] font-bold text-white" style={{ background: '#6D5BA9' }}>
                    ✓
                  </div>
                ) : null}
              </div>
              <div className="mt-2 text-[26px] font-extrabold tracking-[-0.02em] leading-none" style={{ color: COLORS.navy }}>
                Corporate-owned
              </div>
              <p className="mt-2 text-[13px] leading-6" style={{ color: COLORS.textSecondary }}>
                Operated by TAT U Inc. - Revenue flows to parent - Full operational control and hiring authority
              </p>
            </button>
            <button
              type="button"
              className="rounded-2xl border p-4 text-left"
              style={{
                borderColor: form.ownership === 'franchise' ? '#6D5BA9' : COLORS.border,
                background: form.ownership === 'franchise' ? '#F3F0FA' : '#FFFFFF',
              }}
              onClick={() => setField('ownership', 'franchise')}
            >
              <div className="flex items-center justify-between">
                <Users2 size={19} color={COLORS.navy} />
                {form.ownership === 'franchise' ? (
                  <div className="h-5 w-5 rounded-full text-center text-[11px] font-bold text-white" style={{ background: '#6D5BA9' }}>
                    ✓
                  </div>
                ) : null}
              </div>
              <div className="mt-2 text-[26px] font-extrabold tracking-[-0.02em] leading-none" style={{ color: COLORS.navy }}>
                Franchise
              </div>
              <p className="mt-2 text-[13px] leading-6" style={{ color: COLORS.textSecondary }}>
                Independently owned - Royalty and fees per FDD - Franchisee has hiring authority within brand standards
              </p>
            </button>
          </div>

          {form.ownership === 'franchise' ? (
            <div className="mt-3 rounded-xl border bg-[#FBFAFD] p-4" style={{ borderColor: '#E5DFF5' }}>
              <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.08em]" style={{ color: '#3B2F5E' }}>
                Franchisee Details
              </div>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <FieldLabel>Franchisee Name</FieldLabel>
                  <InputBase value={form.franchiseeName} onChange={(e) => setField('franchiseeName', e.target.value)} placeholder="e.g. Michael and Angela Rodriguez" />
                </div>
                <div>
                  <FieldLabel>Business Entity</FieldLabel>
                  <InputBase value={form.businessEntity} onChange={(e) => setField('businessEntity', e.target.value)} placeholder="e.g. Rodriguez Ventures LLC" />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div>
                  <FieldLabel>Primary Contact Email</FieldLabel>
                  <InputBase value={form.franchiseEmail} onChange={(e) => setField('franchiseEmail', e.target.value)} placeholder="owner@rodriguezventures.com" />
                </div>
                <div>
                  <FieldLabel>Primary Contact Phone</FieldLabel>
                  <InputBase value={form.franchisePhone} onChange={(e) => setField('franchisePhone', e.target.value)} placeholder="(713) 555-0200" />
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div>
                  <FieldLabel>Royalty Rate</FieldLabel>
                  <SelectBase value={form.royaltyRate} onChange={(e) => setField('royaltyRate', e.target.value)}>
                    <option>8% of gross revenue</option>
                    <option>6% of gross revenue</option>
                    <option>10% of gross revenue</option>
                    <option>Custom...</option>
                  </SelectBase>
                </div>
                <div>
                  <FieldLabel>Marketing Fee</FieldLabel>
                  <SelectBase value={form.marketingFee} onChange={(e) => setField('marketingFee', e.target.value)}>
                    <option>2% brand fund</option>
                    <option>1% brand fund</option>
                    <option>3% brand fund</option>
                    <option>None</option>
                  </SelectBase>
                </div>
                <div>
                  <FieldLabel>Territory Radius</FieldLabel>
                  <SelectBase value={form.territoryRadius} onChange={(e) => setField('territoryRadius', e.target.value)}>
                    <option>5-mile exclusive</option>
                    <option>10-mile exclusive</option>
                    <option>ZIP-based territory</option>
                    <option>No exclusivity</option>
                  </SelectBase>
                </div>
              </div>
              <div className="mt-3">
                <FieldLabel>FDD and Franchise Agreement On File</FieldLabel>
                <label className="mt-1 flex items-center gap-2 text-sm" style={{ color: COLORS.textSecondary }}>
                  <input type="checkbox" checked={form.franchiseAgreement} onChange={(e) => setField('franchiseAgreement', e.target.checked)} />
                  Signed franchise agreement uploaded
                </label>
                <label className="mt-1 flex items-center gap-2 text-sm" style={{ color: COLORS.textSecondary }}>
                  <input type="checkbox" checked={form.trainingComplete} onChange={(e) => setField('trainingComplete', e.target.checked)} />
                  Franchisee completed pre-opening training
                </label>
                <label className="mt-1 flex items-center gap-2 text-sm" style={{ color: COLORS.textSecondary }}>
                  <input type="checkbox" checked={form.franchiseFeePaid} onChange={(e) => setField('franchiseFeePaid', e.target.checked)} />
                  Initial franchise fee paid ($45,000)
                </label>
              </div>
            </div>
          ) : null}

          <div className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.1em]" style={{ color: COLORS.textMuted }}>
            Status & Timeline
          </div>
          <div className="mt-2 border-t pt-3" style={{ borderColor: COLORS.borderSoft }}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <FieldLabel>Status</FieldLabel>
                <SelectBase value={form.status} onChange={(e) => setField('status', e.target.value)}>
                  <option value="upcoming">Opening soon (build-out)</option>
                  <option value="active">Active (operational)</option>
                  <option value="paused">Paused / On hold</option>
                </SelectBase>
              </div>
              <div>
                <FieldLabel>Target Open Date</FieldLabel>
                <div className="relative">
                  <InputBase type="date" value={form.openDate} onChange={(e) => setField('openDate', e.target.value)} className="pr-10" />
                  <CalendarDays size={15} className="pointer-events-none absolute right-3 top-3" color={COLORS.textMuted} />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <FieldLabel>Card Badge · Optional · Shown on location card header</FieldLabel>
              <SelectBase value={form.badge} onChange={(e) => setField('badge', e.target.value)}>
                <option value="">No badge</option>
                <option value="OPENING OCT">OPENING OCT</option>
                <option value="OPENING SOON">OPENING SOON</option>
                <option value="NEW">NEW</option>
                <option value="FLAGSHIP">FLAGSHIP</option>
                <option value="TOP REVENUE">TOP REVENUE</option>
                <option value="FRANCHISE">FRANCHISE</option>
              </SelectBase>
            </div>

            {form.status !== 'active' ? (
              <div className="mt-4 rounded-xl border" style={{ borderColor: COLORS.border }}>
                <div className="border-b px-4 py-3 text-[11px] font-extrabold uppercase tracking-[0.1em]" style={{ borderColor: COLORS.borderSoft, color: COLORS.textMuted }}>
                  Launch Checklist
                </div>
                <div>
                  {launchSteps.map((step) => (
                    <button
                      key={step.id}
                      type="button"
                      onClick={() => toggleLaunchStep(step.id)}
                      className="grid w-full grid-cols-[auto_1fr_auto] items-center gap-3 border-b px-4 py-3 text-left last:border-b-0"
                      style={{ borderColor: COLORS.borderSoft }}
                    >
                      <div
                        className="flex h-4 w-4 items-center justify-center rounded border text-[10px]"
                        style={{
                          borderColor: step.done ? COLORS.teal : '#C9C4BD',
                          background: step.done ? '#EAF7F6' : '#FFFFFF',
                          color: COLORS.teal,
                        }}
                      >
                        {step.done ? '✓' : ''}
                      </div>
                      <span className="text-[14px] font-semibold" style={{ color: COLORS.text }}>
                        {step.label}
                      </span>
                      <span className="text-[12px]" style={{ color: COLORS.textMuted }}>
                        {step.step}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.1em]" style={{ color: COLORS.textMuted }}>
            Team Assignment
          </div>
          <div className="mt-2 border-t pt-3" style={{ borderColor: COLORS.borderSoft }}>
            <div>
              <FieldLabel>Location Manager · Owns day-to-day ops for this office</FieldLabel>
              <SelectBase value={form.manager} onChange={(e) => setField('manager', e.target.value)}>
                <option value="hiring">Still hiring (leave unassigned)</option>
                <option>Stephanie Morgan · Office Manager (currently Katy)</option>
                <option>Yvonne Hollis-Cobb · CEO/Lead Advisor</option>
                <option>Rebecca Mendoza · Senior Advisor (currently Downtown)</option>
                <option value="invite">+ Invite new manager by email...</option>
              </SelectBase>
            </div>

            <div className="mt-4">
              <FieldLabel>Capacity Targets · Used for advisor-load warnings and growth reports</FieldLabel>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <div>
                  <InputBase type="number" value={form.advisorSeats} onChange={(e) => setField('advisorSeats', e.target.value)} className="text-center" />
                  <div className="mt-1 text-center text-[11px]" style={{ color: COLORS.textMuted }}>
                    Advisor seats
                  </div>
                </div>
                <div>
                  <InputBase type="number" value={form.rmSeats} onChange={(e) => setField('rmSeats', e.target.value)} className="text-center" />
                  <div className="mt-1 text-center text-[11px]" style={{ color: COLORS.textMuted }}>
                    RM seats
                  </div>
                </div>
                <div>
                  <InputBase type="number" value={form.clientTarget} onChange={(e) => setField('clientTarget', e.target.value)} className="text-center" />
                  <div className="mt-1 text-center text-[11px]" style={{ color: COLORS.textMuted }}>
                    Client target (Y1)
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-[11px] font-extrabold uppercase tracking-[0.1em]" style={{ color: COLORS.textMuted }}>
            Card Header Color
          </div>
          <div className="mt-2 border-t pt-3" style={{ borderColor: COLORS.borderSoft }}>
            <div className="flex flex-wrap gap-2">
              {HEADER_SWATCHES.map((swatch) => (
                <button
                  key={swatch.id}
                  type="button"
                  aria-label={swatch.title}
                  title={swatch.title}
                  onClick={() => setField('headerGradient', swatch.gradient)}
                  className="h-8 w-8 rounded-full border-2"
                  style={{
                    background: swatch.gradient,
                    borderColor: form.headerGradient === swatch.gradient ? '#1F2937' : '#FFFFFF',
                    boxShadow: form.headerGradient === swatch.gradient ? '0 0 0 2px #DAD3C9' : '0 0 0 1px #DAD3C9',
                  }}
                />
              ))}
            </div>

            <div className="mt-4 rounded-xl border p-3" style={{ borderColor: COLORS.border }}>
              <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>
                Preview · Location card header
              </div>
              <div className="rounded-xl px-4 pb-3 pt-4 text-white" style={{ background: form.headerGradient }}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-[18px] font-extrabold tracking-[-0.02em]">{previewName}</div>
                    <div className="mt-0.5 text-[12px] text-white/75">{previewAddress}</div>
                  </div>
                  {form.badge ? (
                    <span className="rounded-md bg-white/20 px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-[0.08em] text-white">
                      {form.badge}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-2 border-t pt-4" style={{ borderColor: COLORS.borderSoft }}>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 items-center rounded-xl border px-4 text-sm font-bold"
              style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={createLocation}
              className="inline-flex h-10 items-center rounded-xl border px-4 text-sm font-bold"
              style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
            >
              Save as Draft
            </button>
            <button
              type="button"
              onClick={createLocation}
              className="inline-flex h-10 items-center rounded-xl px-4 text-sm font-bold text-white"
              style={{ background: '#5B4A8B' }}
            >
              Create Location
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TeamRow({ member }) {
  return (
    <div className="flex items-center gap-[10px]">
      <div
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white"
        style={{ background: member.bg, opacity: member.muted ? 0.55 : 1 }}
      >
        {member.initials}
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate text-[12px] font-bold" style={{ color: member.muted ? COLORS.textMuted : COLORS.text }}>
          {member.name}
          {member.badge ? (
            <span
              className="ml-1.5 rounded px-1.5 py-0.5 text-[9px] font-bold"
              style={{ background: member.badge.bg, color: member.badge.color }}
            >
              {member.badge.text}
            </span>
          ) : null}
        </div>
        <div className="text-[10.5px]" style={{ color: COLORS.textMuted }}>
          {member.role}
        </div>
      </div>
    </div>
  )
}

function LocationCard({ location }) {
  return (
    <article className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: COLORS.border }}>
      <div className="rounded-t-2xl px-5 pb-4 pt-5 text-white" style={{ background: location.headerGradient }}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="text-[20px] font-bold tracking-[-0.02em]">{location.name}</div>
            <div className="mt-0.5 text-[12px] text-white/75">{location.address}</div>
          </div>
          {location.badge ? (
            <span
              className="rounded-md px-2 py-0.5 text-[9.5px] font-extrabold uppercase tracking-[0.08em]"
              style={{ background: location.badge.bg, color: location.badge.color }}
            >
              {location.badge.text}
            </span>
          ) : null}
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {location.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-white/60">{metric.label}</div>
              <div className="mt-1 text-[15px] font-extrabold tracking-[-0.02em]" style={{ color: metric.valueColor || '#FFFFFF' }}>
                {metric.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-[18px]">
        <div className="mb-2.5 text-[10.5px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>
          {location.teamTitle}
        </div>

        {location.team ? (
          <div className="mb-3.5 space-y-2">
            {location.team.map((member) => (
              <TeamRow key={member.name} member={member} />
            ))}
          </div>
        ) : null}

        {location.checklist ? (
          <div className="mb-3.5 space-y-1.5">
            {location.checklist.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-2 text-[12px]"
                style={{ color: item.done ? COLORS.text : item.pending ? '#7a5a00' : COLORS.textMuted }}
              >
                <span>{item.done ? '✓' : item.pending ? '⟳' : '○'}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        ) : null}

        {location.note ? (
          <div
            className="rounded-lg border-l-[3px] px-3.5 py-2.5 text-[12px] font-semibold"
            style={{ background: location.note.bg, borderColor: location.note.border, color: location.note.color }}
          >
            {location.note.text}
          </div>
        ) : (
          <button
            type="button"
            className="inline-flex w-full items-center justify-center rounded-lg border px-3 py-1.5 text-[11px] font-bold"
            style={{ borderColor: COLORS.border, color: COLORS.textSecondary }}
          >
            View full launch plan
          </button>
        )}
      </div>
    </article>
  )
}

export default function LocationsPage() {
  const [isNewLocationOpen, setIsNewLocationOpen] = useState(false)

  return (
    <section className="animate-in fade-in zoom-in-95 duration-200">
      <div className="mb-[22px] flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-[22px] font-bold tracking-[-0.02em]" style={{ color: COLORS.text }}>
            Locations
          </h1>
          <p className="mt-1 max-w-[700px] text-[13px] leading-[1.5]" style={{ color: COLORS.textSecondary }}>
            3 franchise locations - Katy Grand Opening May 20, 2026 - Pearland launch targeting October 2026
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsNewLocationOpen(true)}
          className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-xs font-bold text-white"
          style={{ background: '#5B4A8B' }}
        >
          <Building2 size={13} />
          New Location
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {LOCATION_CARDS.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      <div className="mt-5 rounded-xl border bg-white px-4 py-3" style={{ borderColor: COLORS.border }}>
        <div className="flex flex-wrap items-center gap-3 text-[12px]" style={{ color: COLORS.textSecondary }}>
          <span className="inline-flex items-center gap-1.5 font-bold" style={{ color: COLORS.text }}>
            <MapPin size={13} />
            Portfolio Snapshot
          </span>
          <span>3 locations</span>
          <span>•</span>
          <span>187 total clients</span>
          <span>•</span>
          <span>$61.2K MRR</span>
          <span>•</span>
          <span className="inline-flex items-center gap-1.5" style={{ color: COLORS.gold }}>
            <Users size={13} />
            2 open advisor seats
          </span>
        </div>
      </div>

      {isNewLocationOpen ? <NewLocationModal onClose={() => setIsNewLocationOpen(false)} /> : null}
    </section>
  )
}
