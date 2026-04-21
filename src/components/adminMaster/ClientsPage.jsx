import React, { useState, useRef, useEffect } from 'react'
import { Search, Filter, MoreHorizontal, ArrowUpRight, ArrowDownRight, ChevronDown, Activity, Users, FileText, AlertCircle, TrendingUp, X, Upload, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { ADMIN_CLIENTS } from './adminClientData'

const COLORS = {
  bg: '#F7F5F2', card: '#FFFFFF', border: '#E7E3DD', borderSoft: '#F0ECE5',
  red: '#C63D2F', redTint: '#FDEBE8',
  tealDeep: '#1F5E5B', teal: '#2F7D79', tealTint: '#E8F3F1', tealBright: '#5ECFCA',
  text: '#1F2937', textSec: '#667085', textMuted: '#98A2B3',
  navy: '#1B3A5C', green: '#1A7A4A', greenTint: '#E8F5EE',
  gold: '#B8860B', goldTint: '#FEF9EE',
  plum: '#5B4A8B', plumTint: '#F3EFFA', plumDeep: '#443569',
}

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

function AddClientModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-[16px] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b px-[24px] py-[20px]" style={{ borderColor: COLORS.borderSoft }}>
          <div>
            <h2 className="font-poppins text-[22px] font-bold tracking-[-0.02em] text-[#1F2937]">Add new client</h2>
            <p className="mt-[4px] font-opensans text-[13px] leading-[1.5] text-[#667085] max-w-[420px]">
              Creates a client account &amp; sends welcome email · 48-hour invite link · Client sets their own password and enrolls in 2FA on first login
            </p>
          </div>
          <button onClick={onClose} className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] border bg-[#F7F5F2] text-[#98A2B3] transition-colors hover:text-[#1F2937]" style={{ borderColor: COLORS.border }}>
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[24px] py-[24px]">
          {/* Section: Contact Info */}
          <div className="mb-[24px]">
            <div className="mb-[16px] font-opensans text-[11px] font-extrabold uppercase tracking-[.1em] text-[#98A2B3]">
              Contact Info
            </div>
            
            <div className="mb-[16px]">
              <label className="mb-[6px] block font-opensans text-[11px] font-extrabold uppercase tracking-[.08em] text-[#667085]">Full Name</label>
              <input type="text" placeholder="e.g. Sarah Williams" className="w-full rounded-[10px] border px-[14px] py-[10px] font-opensans text-[13.5px] text-[#1F2937] outline-none focus:border-[#5B4A8B] focus:shadow-[0_0_0_3px_rgba(91,74,139,.1)]" style={{ borderColor: COLORS.border }} />
            </div>

            <div className="mb-[16px]">
              <label className="mb-[6px] block font-opensans text-[11px] font-extrabold uppercase tracking-[.08em] text-[#667085]">Email</label>
              <input type="email" placeholder="sarah@example.com" className="w-full rounded-[10px] border px-[14px] py-[10px] font-opensans text-[13.5px] text-[#1F2937] outline-none focus:border-[#5B4A8B] focus:shadow-[0_0_0_3px_rgba(91,74,139,.1)]" style={{ borderColor: COLORS.border }} />
              <p className="mt-[4px] font-opensans text-[11.5px] text-[#98A2B3]">Used for login and all TAT notifications</p>
            </div>

            <div>
              <label className="mb-[6px] flex items-center gap-[4px] font-opensans text-[11px] font-extrabold uppercase tracking-[.08em] text-[#667085]">
                Phone <span className="text-[#98A2B3] font-semibold normal-case tracking-normal">· Optional</span>
              </label>
              <input type="tel" placeholder="(281) 555-0199" className="w-full rounded-[10px] border px-[14px] py-[10px] font-opensans text-[13.5px] text-[#1F2937] outline-none focus:border-[#5B4A8B] focus:shadow-[0_0_0_3px_rgba(91,74,139,.1)]" style={{ borderColor: COLORS.border }} />
            </div>
          </div>

          <div className="my-[24px] h-[1px] w-full" style={{ background: COLORS.borderSoft }} />

          {/* Section: Assignment */}
          <div className="mb-[24px]">
            <div className="mb-[16px] font-opensans text-[11px] font-extrabold uppercase tracking-[.1em] text-[#98A2B3]">
              Assignment
            </div>

            <div className="mb-[16px]">
              <label className="mb-[6px] block font-opensans text-[11px] font-extrabold uppercase tracking-[.08em] text-[#667085]">Location</label>
              <select className="w-full appearance-none rounded-[10px] border bg-white px-[14px] py-[10px] font-opensans text-[13.5px] text-[#1F2937] outline-none focus:border-[#5B4A8B]" style={{ 
                borderColor: COLORS.border, 
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667085' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '14px'
              }}>
                <option>Katy</option>
                <option>Downtown Houston</option>
              </select>
            </div>

            <div className="mb-[16px]">
              <label className="mb-[6px] flex items-center gap-[4px] font-opensans text-[11px] font-extrabold uppercase tracking-[.08em] text-[#667085]">
                Assigned Advisor <span className="text-[#98A2B3] font-semibold normal-case tracking-normal">· Required</span>
              </label>

              {/* Advisor Picker Match */}
              <div className="overflow-hidden rounded-[10px] border bg-white" style={{ borderColor: COLORS.border }}>
                <div className="flex items-center justify-between border-b bg-[#FAF8F4] px-[14px] py-[10px] font-opensans text-[11px] font-extrabold uppercase tracking-[.08em] text-[#98A2B3]" style={{ borderColor: COLORS.borderSoft }}>
                  <span>Advisors at Katy</span>
                  <span className="font-mono font-semibold">1 available</span>
                </div>
                
                <div className="flex cursor-pointer items-center gap-[12px] p-[16px] transition-colors hover:bg-[#F7F5F2]">
                  <div className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[6px] border-[2px] bg-white transition-all" style={{ borderColor: COLORS.border }}></div>
                  <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#1B3A5C] font-poppins text-[11px] font-extrabold text-white">YC</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-opensans text-[13px] font-bold text-[#1F2937]">Yvonne Hollis-Cobb</div>
                    <div className="mt-[2px] flex items-center gap-[6px]">
                      <span className="rounded-[5px] border bg-[#F7F5F2] px-[6px] py-[2px] font-opensans text-[9.5px] font-bold text-[#667085]" style={{ borderColor: COLORS.border }}>Katy</span>
                      <span className="font-opensans text-[11px] text-[#98A2B3]">CPA · Lead Advisor</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-[4px]">
                    <div className="font-mono text-[11.5px] font-semibold text-[#1F2937]"><span className="text-[#1F2937]">24</span> <span className="text-[#98A2B3]">/ 40</span></div>
                    <div className="h-[3px] w-[32px] overflow-hidden rounded-full bg-[#E7E3DD]">
                      <div className="h-full bg-[#1A7A4A] w-[60%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-[24px] h-[1px] w-full" style={{ background: COLORS.borderSoft }} />

          {/* Section: Subscription */}
          <div>
            <div className="mb-[16px] font-opensans text-[11px] font-extrabold uppercase tracking-[.1em] text-[#98A2B3]">
              Subscription
            </div>
            <div>
              <label className="mb-[6px] block font-opensans text-[11px] font-extrabold uppercase tracking-[.08em] text-[#667085]">Plan</label>
              <select className="w-full appearance-none rounded-[10px] border bg-white px-[14px] py-[10px] font-opensans text-[13.5px] text-[#1F2937] outline-none focus:border-[#5B4A8B]" style={{ 
                borderColor: COLORS.border, 
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23667085' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 12px center',
                backgroundSize: '14px'
              }}>
                <option>Quarterly Subscription — $349/qtr</option>
                <option>Monthly Base — $129/mo</option>
              </select>
              <p className="mt-[4px] font-opensans text-[11.5px] text-[#98A2B3]">Stripe subscription will be created automatically on client signup</p>
            </div>
          </div>

        </div>

        <div className="border-t bg-[#FAF8F4] px-[24px] py-[16px] flex justify-end gap-[12px]" style={{ borderColor: COLORS.borderSoft }}>
          <button onClick={onClose} className="rounded-[10px] border bg-white px-[16px] py-[8px] font-opensans text-[13px] font-bold text-[#667085] hover:bg-[#F7F5F2] hover:text-[#1F2937]" style={{ borderColor: COLORS.border }}>
            Cancel
          </button>
          <button onClick={onClose} className="rounded-[10px] border-none bg-[#5B4A8B] px-[18px] py-[8px] font-opensans text-[13px] font-bold text-white shadow-[0_4px_14px_rgba(91,74,139,.25),0_1px_3px_rgba(91,74,139,.15)] transition-all hover:bg-[#443569]">
            Add Client
          </button>
        </div>
      </div>
    </div>
  )
}

function ImportCsvModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 animate-in fade-in duration-200">
      <div className="relative flex max-h-[90vh] w-full max-w-[620px] flex-col overflow-hidden rounded-[16px] bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b px-[24px] py-[20px] pb-[20px]" style={{ borderColor: COLORS.borderSoft }}>
          <div>
            <h2 className="font-poppins text-[22px] font-bold tracking-[-0.02em] text-[#1F2937]">Import Clients Via CSV</h2>
          </div>
          <button onClick={onClose} className="flex h-[32px] w-[32px] items-center justify-center rounded-[10px] border bg-[#F7F5F2] text-[#98A2B3] transition-colors hover:text-[#1F2937]" style={{ borderColor: COLORS.border }}>
            <X size={16} strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[24px] pb-[30px] pt-[0]">
          {/* Steps */}
          <div className="-mx-[24px] mb-[18px] flex items-center gap-[0] border-b bg-[#FAF8F4] px-[20px] py-[14px]" style={{ borderColor: COLORS.borderSoft }}>
            <div className="flex items-center gap-[8px] font-opensans text-[11.5px] font-bold text-[#443569]">
              <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#5B4A8B] font-poppins text-[10.5px] font-extrabold text-white">1</div>
              Upload CSV
            </div>
            <div className="mx-[12px] h-[1.5px] min-w-[20px] flex-1" style={{ background: COLORS.border }}></div>
            <div className="flex items-center gap-[8px] font-opensans text-[11.5px] font-semibold text-[#98A2B3]">
              <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#E7E3DD] font-poppins text-[10.5px] font-extrabold text-white">2</div>
              Map Columns
            </div>
            <div className="mx-[12px] h-[1.5px] min-w-[20px] flex-1" style={{ background: COLORS.border }}></div>
            <div className="flex items-center gap-[8px] font-opensans text-[11.5px] font-semibold text-[#98A2B3]">
              <div className="flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-[#E7E3DD] font-poppins text-[10.5px] font-extrabold text-white">3</div>
              Review
            </div>
          </div>

          <div className="mb-[14px] cursor-pointer rounded-[14px] border-[2px] border-dashed border-[#E7E3DD] bg-[#F7F5F2] px-[28px] py-[36px] text-center transition-all hover:bg-[#F3EFFA] hover:border-[#5B4A8B]">
            <div className="mx-auto mb-[12px] flex h-[48px] w-[48px] items-center justify-center rounded-[14px] bg-[#F3EFFA] text-[#443569]">
              <Upload size={22} strokeWidth={2} />
            </div>
            <h3 className="mb-[5px] font-poppins text-[15px] font-bold tracking-[-0.01em] text-[#1F2937]">Click to upload or drag & drop</h3>
            <p className="font-opensans text-[12px] leading-[1.5] text-[#667085]">
              Upload your structured .csv data. maximum size 10MB.
            </p>
          </div>

          <div className="rounded-[10px] border bg-white p-[16px]" style={{ borderColor: COLORS.border }}>
            <div className="mb-[8px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.08em] text-[#98A2B3]">Required CSV Columns</div>
            <div className="grid grid-cols-3 gap-x-[10px] gap-y-[6px]">
              {['first_name', 'last_name', 'email', 'phone', 'location_pin', 'advisor_id'].map(col => (
                <div key={col} className="flex items-center gap-[4px] rounded-[6px] bg-[#F3EFFA] px-[8px] py-[3px] font-mono text-[10.5px] font-bold text-[#443569]">
                  <span className="mr-[2px] text-[#C63D2F]">*</span> {col}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default function ClientsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeModal, setActiveModal] = useState(null) // 'add', 'import', null
  const [filterMenuOpen, setFilterMenuOpen] = useState(false)
  const filterMenuRef = useRef(null)

  useClickOutside(filterMenuRef, () => {
    if (filterMenuOpen) setFilterMenuOpen(false)
  })

  const renderStatus = (status) => {
    switch (status) {
      case 'Active':
        return <><span className="mr-1.5 inline-block h-[8px] w-[8px] rounded-full align-middle" style={{ background: COLORS.green }} />{status}</>
      case 'Past Due':
        return <><span className="mr-1.5 inline-block h-[8px] w-[8px] rounded-full align-middle" style={{ background: COLORS.red }} />{status}</>
      case 'Onboarding':
        return <><span className="mr-1.5 inline-block h-[8px] w-[8px] rounded-full align-middle" style={{ background: COLORS.gold }} />{status}</>
      default:
        return <><span className="mr-1.5 inline-block h-[8px] w-[8px] rounded-full align-middle" style={{ background: COLORS.textMuted }} />{status}</>
    }
  }

  return (
    <div className="flex flex-col animate-in fade-in zoom-in-95 duration-200">
      <AddClientModal open={activeModal === 'add'} onClose={() => setActiveModal(null)} />
      <ImportCsvModal open={activeModal === 'import'} onClose={() => setActiveModal(null)} />

      {/* Page Header */}
      <div className="mb-[22px] flex items-start justify-between gap-[16px]">
        <div>
          <div className="mb-[4px] flex items-center gap-[12px]">
            <h2 className="font-poppins text-[22px] font-bold tracking-[-0.02em] text-[#1F2937]">Clients</h2>
          </div>
          <div className="font-opensans text-[13px] leading-[1.5] text-[#667085] max-w-[620px]">
            All TATCares clients across Katy and Downtown Houston · Each client is assigned to exactly one RM.
          </div>
        </div>
        <div className="flex shrink-0 gap-[8px]">
          <button onClick={() => setActiveModal('import')} className="inline-flex items-center gap-[6px] rounded-[10px] border bg-white px-[16px] py-[8px] font-opensans text-[12.5px] font-bold text-[#667085] transition-all hover:bg-[#F7F5F2] hover:text-[#1F2937]" style={{ borderColor: COLORS.border }}>
            <Upload size={13} /> Import CSV
          </button>
          <button onClick={() => setActiveModal('add')} className="inline-flex items-center gap-[6px] rounded-[10px] border-none bg-[#5B4A8B] px-[16px] py-[8px] font-opensans text-[12.5px] font-bold text-white shadow-[0_4px_14px_rgba(91,74,139,.25),0_1px_3px_rgba(91,74,139,.15)] transition-all hover:bg-[#443569]">
            + Add Client
          </button>
        </div>
      </div>


      {/* KPI Grid */}
      <div className="mb-[20px] grid grid-cols-2 gap-[12px] lg:grid-cols-6">
        {[
          { lbl: 'Total Clients', val: '187', delta: '+14', dir: 'up', ic: <Users /> },
          { lbl: 'Active Subs', val: '174', delta: '+12', dir: 'up', ic: <Activity /> },
          { lbl: 'Avg MRR', val: '$418', delta: '+$21', dir: 'up', ic: <TrendingUp /> },
          { lbl: 'Avg FFS', val: '72', delta: '+3', dir: 'up', ic: <FileText /> },
          { lbl: 'Past Due', val: '3', delta: '-1', dir: 'down', ic: <AlertCircle /> },
          { lbl: 'Inactive', val: '8', delta: '+2', dir: 'down', ic: <AlertCircle /> },
        ].map((kpi, i) => (
          <div key={i} className="relative overflow-hidden rounded-[14px] border bg-white p-[16px_18px] shadow-[0_1px_3px_rgba(31,41,55,.04),0_4px_16px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
            <div className="mb-[6px] flex items-center gap-[5px] font-opensans text-[10.5px] font-bold uppercase tracking-[.1em] text-[#98A2B3]">
              {React.cloneElement(kpi.ic, { size: 11, strokeWidth: 2 })} {kpi.lbl}
            </div>
            <div className="mb-[6px] font-poppins text-[22px] font-extrabold leading-[1] tracking-[-0.02em] text-[#1F2937]">
              {kpi.val}
            </div>
            <div className={`flex items-center gap-[3px] font-opensans text-[10.5px] font-bold ${kpi.dir === 'up' ? 'text-[#1A7A4A]' : 'text-[#C63D2F]'}`}>
              {kpi.dir === 'up' ? <ArrowUpRight size={11} strokeWidth={2.5} /> : <ArrowDownRight size={11} strokeWidth={2.5} />}
              {kpi.delta} this month
            </div>
          </div>
        ))}
      </div>

      {/* Table Area */}
      <div className="overflow-hidden rounded-[16px] border bg-white shadow-[0_1px_3px_rgba(31,41,55,.04),0_4px_16px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-[10px] border-b bg-[#FAF8F4] px-[18px] py-[14px]" style={{ borderColor: COLORS.borderSoft }}>
          <div className="flex max-w-[280px] flex-1 items-center gap-[7px] rounded-[9px] border bg-white px-[10px] py-[6px] min-w-[200px]" style={{ borderColor: COLORS.border }}>
            <Search size={13} className="text-[#98A2B3]" strokeWidth={2} />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="flex-1 border-none bg-transparent font-opensans text-[12px] text-[#1F2937] outline-none placeholder:text-[#98A2B3]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative" ref={filterMenuRef}>
            <button 
              onClick={() => setFilterMenuOpen(prev => !prev)}
              className={`flex items-center gap-[6px] rounded-[9px] border px-[10px] py-[6px] font-opensans text-[12px] font-semibold transition-colors ${filterMenuOpen ? 'border-[#5B4A8B] bg-[#F3EFFA] text-[#443569]' : 'border-[#E7E3DD] bg-white text-[#667085] hover:border-[#2F7D79] hover:text-[#1F5E5B]'}`}
            >
              <Filter size={11} strokeWidth={2.5} /> Status
              <ChevronDown size={11} strokeWidth={2.5} />
            </button>
            <div className={`absolute left-0 top-[calc(100%+4px)] z-[120] min-w-[200px] rounded-[10px] border bg-white p-[5px] shadow-[0_12px_28px_rgba(31,41,55,.15)] transition-all ${filterMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'}`} style={{ borderColor: COLORS.border }}>
              <div className="flex cursor-pointer items-center justify-between rounded-[7px] bg-[#F3EFFA] px-[11px] py-[8px] font-opensans text-[12.5px] font-bold text-[#443569] transition-colors">
                <div className="flex items-center gap-[8px]"><Check size={13} strokeWidth={3} /> Active</div>
                <div className="rounded-[4px] bg-[rgba(91,74,139,.15)] px-[6px] py-[1px] font-mono text-[10.5px] font-semibold text-[#443569]">174</div>
              </div>
              <div className="flex cursor-pointer items-center justify-between rounded-[7px] px-[11px] py-[8px] font-opensans text-[12.5px] font-medium text-[#667085] transition-colors hover:bg-[#F7F5F2] hover:text-[#1F2937]">
                <div className="flex items-center gap-[8px]">Onboarding</div>
                <div className="rounded-[4px] bg-[#F7F5F2] px-[6px] py-[1px] font-mono text-[10.5px] font-semibold text-[#98A2B3]">5</div>
              </div>
              <div className="my-[4px] h-[1px] w-full" style={{ background: COLORS.borderSoft }}></div>
              <div className="flex cursor-pointer items-center justify-between rounded-[7px] px-[11px] py-[8px] font-opensans text-[12.5px] font-medium text-[#667085] transition-colors hover:bg-[#F7F5F2] hover:text-[#1F2937]">
                <div className="flex items-center gap-[8px]">Past Due</div>
                <div className="rounded-[4px] bg-[#F7F5F2] px-[6px] py-[1px] font-mono text-[10.5px] font-semibold text-[#98A2B3]">3</div>
              </div>
            </div>
          </div>

          <button className="flex items-center gap-[6px] rounded-[9px] border bg-white px-[10px] py-[6px] font-opensans text-[12px] font-semibold text-[#667085] transition-colors hover:border-[#2F7D79] hover:text-[#1F5E5B]" style={{ borderColor: COLORS.border }}>
            <Filter size={11} strokeWidth={2.5} /> Advisor
            <ChevronDown size={11} strokeWidth={2.5} />
          </button>
          <div className="ml-auto font-mono text-[11px] font-semibold text-[#98A2B3]">{ADMIN_CLIENTS.length} results shown</div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-[#FAF8F4]">
              <tr>
                <th className="border-b px-[16px] py-[11px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.08em] text-[#98A2B3]" style={{ borderColor: COLORS.border }}>Client</th>
                <th className="border-b px-[16px] py-[11px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.08em] text-[#98A2B3]" style={{ borderColor: COLORS.border }}>Advisor / RM</th>
                <th className="border-b px-[16px] py-[11px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.08em] text-[#98A2B3]" style={{ borderColor: COLORS.border }}>Location</th>
                <th className="border-b px-[16px] py-[11px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.08em] text-[#98A2B3]" style={{ borderColor: COLORS.border }}>MRR</th>
                <th className="border-b px-[16px] py-[11px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.08em] text-[#98A2B3]" style={{ borderColor: COLORS.border }}>Status</th>
                <th className="border-b px-[16px] py-[11px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.08em] text-[#98A2B3] w-[60px]" style={{ borderColor: COLORS.border }}></th>
              </tr>
            </thead>
            <tbody>
              {ADMIN_CLIENTS.map((c, idx) => (
                <tr key={c.id} className="group cursor-pointer border-b transition-colors hover:bg-[#FAF8F4] last:border-b-0" style={{ borderColor: COLORS.borderSoft }} onClick={() => navigate(`/admin-master/clients/${c.id}`, { state: { client: c } })}>
                  <td className="px-[16px] py-[12px] align-middle">
                    <div className="flex items-center gap-[10px]">
                      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full font-poppins text-[11px] font-extrabold text-white" style={{ background: c.avColor }}>
                        {c.initials}
                      </div>
                      <div>
                        <div className="font-opensans text-[12.5px] font-bold text-[#1F2937]">{c.name}</div>
                        <div className="mt-[1px] font-mono text-[11px] text-[#98A2B3] group-hover:text-[#667085] transition-colors">{c.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-[16px] py-[12px] align-middle font-opensans text-[12.5px] text-[#1F2937]">{c.advisor}</td>
                  <td className="px-[16px] py-[12px] align-middle font-opensans text-[12.5px] text-[#1F2937]">{c.loc}</td>
                  <td className="px-[16px] py-[12px] align-middle font-opensans text-[12.5px] font-semibold text-[#1F2937]">{c.mrr}</td>
                  <td className="px-[16px] py-[12px] align-middle font-opensans text-[12.5px] font-semibold text-[#1F2937]">
                    {renderStatus(c.status)}
                  </td>
                  <td className="px-[16px] py-[12px] align-middle text-right">
                    <button className="rounded-[6px] border-none bg-transparent p-[6px] text-[#98A2B3] transition-colors hover:bg-[#F7F5F2] hover:text-[#1F2937]">
                      <MoreHorizontal size={14} strokeWidth={2} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
