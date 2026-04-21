import React, { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Edit2, Mail, MapPin, CheckCircle, Clock, Check, FileText, AlertTriangle, MessageSquare, Download, Link, UserPlus, FileSignature, HelpCircle, Eye, Lock, UploadCloud, Plus, DollarSign, CreditCard, ExternalLink, Filter, Layout, File, Shield, X, ArrowDown, RefreshCw, MoreHorizontal } from 'lucide-react'
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

export default function AdminClientDetail() {
  const { clientId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('overview')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showReassignModal, setShowReassignModal] = useState(false)

  const clientFromState = location.state?.client
  const fallbackClient = ADMIN_CLIENTS.find((client) => client.id === clientId)
  const client = clientFromState?.id === clientId ? clientFromState : fallbackClient
  const clientInitials = client?.initials || client?.name?.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'CL'
  const clientName = client?.name || 'Unknown Client'
  const clientEmail = client?.email || 'no-email@tatcares.local'
  const clientLocation = client?.loc || 'Unknown Location'
  const clientPhone = client?.phone || '(000) 000-0000'
  const clientAdvisor = client?.advisor || 'Unassigned'
  const clientMrr = client?.mrr || '$0'
  const clientStatus = client?.status || 'Unknown'
  const clientStatusClasses =
    clientStatus === 'Active'
      ? 'border-[#C3E6C3] bg-[#E8F5EE] text-[#1A7A4A]'
      : clientStatus === 'Past Due'
        ? 'border-[#F5C2BC] bg-[#FDEBE8] text-[#C63D2F]'
        : clientStatus === 'Onboarding'
          ? 'border-[#EADAB0] bg-[#FEF9EE] text-[#7A5A00]'
          : 'border-[#E7E3DD] bg-[#F7F5F2] text-[#667085]'

  return (
    <div className="flex flex-col animate-in fade-in duration-200 min-h-full">
      {/* Back button */}
      <button onClick={() => navigate('/admin-master/clients')} className="inline-flex items-center gap-[6px] font-opensans text-[12px] font-semibold text-[#667085] bg-transparent border-none cursor-pointer py-[4px] mb-[12px] transition-colors hover:text-[#443569] mr-auto">
        <ArrowLeft size={13} strokeWidth={2} /> Back to Clients
      </button>

      {/* Hero Section (.cli-hero) */}
      <div className="mb-[14px] flex flex-col gap-[16px] rounded-[16px] border bg-white p-[16px] sm:p-[22px_26px] lg:flex-row lg:items-start lg:gap-[20px]" style={{ borderColor: COLORS.border, boxShadow: '0 1px 3px rgba(31,41,55,.04),0 4px 16px rgba(31,41,55,.04)' }}>
        <div className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full font-poppins text-[22px] font-extrabold text-white" style={{ background: client?.avColor || '#2F7D79' }}>
          {clientInitials}
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="mb-[2px] font-poppins text-[22px] font-bold tracking-[-0.02em] text-[#1F2937]">{clientName} (Client #{clientId})</h1>
          <div className="mb-[8px] font-mono text-[12px] text-[#667085]">{clientEmail}</div>
          <div className="flex items-center gap-[7px] flex-wrap">
            <span className={`inline-flex items-center gap-[5px] rounded-[6px] border px-[9px] py-[3px] font-opensans text-[10.5px] font-bold ${clientStatusClasses}`}>
              <CheckCircle size={10} strokeWidth={2} /> {clientStatus}
            </span>
            <span className="inline-flex items-center gap-[5px] rounded-[6px] border bg-[#F7F5F2] px-[9px] py-[3px] font-opensans text-[10.5px] font-bold text-[#667085]" style={{ borderColor: COLORS.border }}>
              <MapPin size={10} strokeWidth={2} /> {clientLocation}
            </span>
          </div>
        </div>
        <div className="grid w-full shrink-0 grid-cols-2 gap-[6px] sm:flex sm:w-auto sm:flex-wrap lg:flex-nowrap">
          <button onClick={() => setShowEditModal(true)} className="flex items-center justify-center gap-[6px] rounded-[10px] border bg-white px-[16px] py-[8px] font-opensans text-[12.5px] font-bold text-[#443569] transition-colors hover:border-[#5B4A8B] hover:bg-[#F3EFFA]" style={{ borderColor: COLORS.border }}>
            <Edit2 size={13} strokeWidth={2.5} /> Edit
          </button>
          <button onClick={() => setShowReassignModal(true)} className="flex items-center justify-center gap-[6px] rounded-[10px] border bg-white px-[16px] py-[8px] font-opensans text-[12.5px] font-bold text-[#443569] transition-colors hover:border-[#5B4A8B] hover:bg-[#F3EFFA]" style={{ borderColor: COLORS.border }}>
            <RefreshCw size={13} strokeWidth={2.5} /> Reassign
          </button>
          <button className="col-span-2 flex items-center justify-center gap-[6px] rounded-[10px] border bg-white px-[16px] py-[8px] font-opensans text-[12.5px] font-bold text-[#443569] transition-colors hover:border-[#5B4A8B] hover:bg-[#F3EFFA] sm:col-span-1" style={{ borderColor: COLORS.border }}>
            <Eye size={13} strokeWidth={2.5} /> View as client
          </button>
          <button className="hidden items-center justify-center rounded-[10px] border bg-white px-[14px] font-opensans text-[13px] font-bold text-[#667085] transition-colors hover:border-[#2F7D79] hover:text-[#1F5E5B] sm:flex sm:w-[42px] sm:px-0" style={{ borderColor: COLORS.border }}>
            <MoreHorizontal size={14} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* Stats (.cli-stats) */}
      <div className="mb-[18px] grid grid-cols-1 gap-[10px] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {[
          { lbl: 'MRR', val: clientMrr, sub: 'Current Plan' },
          { lbl: 'FFS Rating', val: '86', sub: 'High Engagement' },
          { lbl: 'Last Login', val: '2h ago', sub: 'via iOS App' },
          { lbl: 'Next Billing', val: 'Nov 12', sub: `${clientMrr} via Card` },
          { lbl: 'Advisor', val: clientAdvisor, sub: 'Lead RM', av: clientAdvisor.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase() }
        ].map((stat, i) => (
          <div key={i} className="rounded-[12px] border bg-white p-[12px_16px] shadow-[0_1px_3px_rgba(31,41,55,.04),0_4px_16px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
            <div className="mb-[4px] font-opensans text-[10px] font-extrabold uppercase tracking-[.1em] text-[#98A2B3]">{stat.lbl}</div>
            <div className="mb-[3px] font-poppins text-[17px] font-extrabold leading-[1] tracking-[-0.01em] text-[#1F2937]">{stat.val}</div>
            <div className="font-opensans text-[10.5px] text-[#98A2B3]">{stat.sub}</div>
            {stat.av && (
              <div className="mt-[2px] flex items-center gap-[6px]">
                <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[#1B3A5C] font-poppins text-[8px] font-extrabold text-white">
                  {stat.av}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs (.cli-tabs) */}
      <div className="mb-[16px] flex gap-[2px] overflow-x-auto border-b-[1.5px] pb-[2px]" style={{ borderColor: COLORS.border }}>
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'documents', label: 'Documents', badge: '8' },
          { id: 'messages', label: 'Messages', badge: '14' },
          { id: 'subscription', label: 'Subscription' },
          { id: 'audit', label: 'Audit' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`-mb-[1.5px] inline-flex shrink-0 items-center gap-[6px] border-b-[2px] bg-transparent px-[12px] py-[10px] font-opensans text-[12px] transition-all sm:px-[16px] sm:text-[13px] ${
              activeTab === t.id
                ? 'border-[#5B4A8B] text-[#443569] font-bold'
                : 'border-transparent text-[#667085] font-semibold hover:text-[#1F2937]'
            }`}
          >
            {t.label}
            {t.badge && (
              <span className={`rounded-[5px] border px-[6px] py-[1px] font-mono text-[10px] font-bold ${activeTab === t.id ? 'border-[rgba(91,74,139,.2)] bg-[#F3EFFA] text-[#443569]' : 'border-[#E7E3DD] bg-[#F7F5F2] text-[#667085]'}`}>
                {t.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Panel: Overview */}
      <div className={`flex-1 ${activeTab === 'overview' ? 'block' : 'hidden'}`}>
        <div className="grid grid-cols-1 gap-[16px] xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* Main Col */}
          <div className="order-1 flex flex-col gap-[14px]">
            {/* Timeline (.cli-card + .cli-timeline) */}
            <div className="rounded-[14px] border bg-white p-[18px_20px] shadow-[0_1px_3px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
              <div className="mb-[12px] flex items-center justify-between font-poppins text-[14px] font-bold tracking-[-0.01em] text-[#1F2937]">
                <div className="flex items-center gap-[7px]">
                  <Clock size={14} strokeWidth={2} /> Activity Timeline
                </div>
              </div>
              <div className="flex flex-col gap-[2px]">
                {/* green dot */}
                <div className="flex gap-[12px] py-[8px]">
                  <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border-[1.5px] bg-[#E8F5EE] border-[#C3E6C3] text-[#1A7A4A]">
                    <CheckCircle size={13} strokeWidth={2} />
                  </div>
                  <div className="flex-1 pt-[3px]">
                    <div className="font-opensans text-[12.5px] text-[#1F2937] leading-[1.5]"><strong>David Chen</strong> completed Q3 Review.</div>
                    <div className="mt-[2px] font-mono text-[10.5px] text-[#98A2B3]">Yesterday at 4:30 PM</div>
                  </div>
                </div>
                {/* teal dot */}
                <div className="flex gap-[12px] py-[8px]">
                  <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border-[1.5px] bg-[#E8F3F1] border-[rgba(47,125,121,.2)] text-[#1F5E5B]">
                    <FileText size={13} strokeWidth={2} />
                  </div>
                  <div className="flex-1 pt-[3px]">
                    <div className="font-opensans text-[12.5px] text-[#1F2937] leading-[1.5]">System generated <strong>Tax Strategy doc</strong>.</div>
                    <div className="mt-[2px] font-mono text-[10.5px] text-[#98A2B3]">Oct 12, 10:00 AM</div>
                  </div>
                </div>
                {/* plum dot */}
                <div className="flex gap-[12px] py-[8px]">
                  <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border-[1.5px] bg-[#F3EFFA] border-[rgba(91,74,139,.2)] text-[#443569]">
                    <MessageSquare size={13} strokeWidth={2} />
                  </div>
                  <div className="flex-1 pt-[3px]">
                    <div className="font-opensans text-[12.5px] text-[#1F2937] leading-[1.5]">Client sent a message in portal.</div>
                    <div className="mt-[2px] font-mono text-[10.5px] text-[#98A2B3]">Oct 10, 8:15 AM</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Data (.cli-side-row) used loosely here */}
            <div className="rounded-[14px] border bg-white p-[18px_20px] shadow-[0_1px_3px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
              <div className="mb-[12px] font-poppins text-[14px] font-bold tracking-[-0.01em] text-[#1F2937]">Client Profile Data</div>
              {[
                { lbl: 'Entity Type', val: 'LLC (S-Corp Election)' },
                { lbl: 'Tax ID', val: 'XX-XXX4921', mono: true },
                { lbl: 'Formation State', val: 'Texas' },
                { lbl: 'Phone', val: clientPhone, mono: true },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between gap-[12px] border-b border-[#F0ECE5] py-[8px] last:border-b-0">
                  <div className="font-opensans text-[10.5px] font-bold uppercase tracking-[.06em] text-[#98A2B3]">{row.lbl}</div>
                  <div className={`font-opensans text-[12.5px] font-semibold text-[#1F2937] text-right ${row.mono ? 'font-mono text-[11.5px]' : ''}`}>{row.val}</div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Col */}
          <div className="order-2 flex flex-col gap-[14px]">
            {/* FFS Gauge (.ffs-gauge) */}
            <div className="flex items-center gap-[14px] rounded-[10px] border-[#C3E6C3] border-[1px] bg-gradient-to-br from-[#E8F5EE] to-[#E8F3F1] p-[14px_16px]">
              <div className="font-poppins text-[32px] font-extrabold leading-[1] tracking-[-0.03em] text-[#1A7A4A]">86</div>
              <div className="flex-1">
                <div className="mb-[3px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.08em] text-[#98A2B3]">FFS Engagement</div>
                <div className="font-opensans text-[11.5px] text-[#1F2937] leading-[1.5]">Client is highly engaged and on track for all milestones.</div>
              </div>
            </div>

            {/* Action Items (.cli-next-step) */}
            <div className="rounded-[14px] border bg-white p-[18px_20px] shadow-[0_1px_3px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
              <div className="mb-[12px] flex items-center justify-between font-poppins text-[14px] font-bold tracking-[-0.01em] text-[#1F2937]">
                <div className="flex items-center gap-[7px]"><AlertTriangle size={14} strokeWidth={2} /> Action Items</div>
              </div>

              {/* Warn Step */}
              <div className="mb-[8px] flex items-start gap-[10px] rounded-[10px] border-[1.5px] border-[#B8860B] bg-[#FEF9EE] p-[12px_14px] last:mb-0">
                <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[8px] bg-white text-[#7a5a00]">
                  <FileSignature size={13} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="mb-[2px] font-opensans text-[12.5px] font-bold text-[#1F2937]">Sign Engagement Letter</div>
                  <div className="font-opensans text-[11.5px] text-[#667085] leading-[1.5]">Pending signature since Oct 10</div>
                  <div className="mt-[4px] inline-block cursor-pointer font-opensans text-[11px] font-bold text-[#443569]">Send Reminder</div>
                </div>
              </div>

              {/* Urgent Step */}
              <div className="mb-[0px] flex items-start gap-[10px] rounded-[10px] border-[1.5px] border-[#C63D2F] bg-[#FDEBE8] p-[12px_14px] last:mb-0">
                <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-[8px] bg-white text-[#C63D2F]">
                  <AlertTriangle size={13} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="mb-[2px] font-opensans text-[12.5px] font-bold text-[#1F2937]">Missing W-2</div>
                  <div className="font-opensans text-[11.5px] text-[#667085] leading-[1.5]">Blocks 2024 filing.</div>
                  <div className="mt-[4px] inline-block cursor-pointer font-opensans text-[11px] font-bold text-[#443569]">Request Document</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* Panel: Documents */}
      <div className={`flex-1 ${activeTab === 'documents' ? 'block' : 'hidden'}`}>
        <div className="rounded-[14px] border bg-white p-[14px] sm:p-[18px_20px] shadow-[0_1px_3px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
          <div className="mb-[16px] flex flex-col gap-[10px] sm:flex-row sm:items-center sm:justify-between">
            <h3 className="font-poppins text-[15px] font-bold tracking-[-0.01em] text-[#1F2937]">Client Documents</h3>
            <button className="flex items-center gap-[6px] rounded-[8px] bg-[#5B4A8B] px-[12px] py-[6px] font-opensans text-[11.5px] font-bold text-white transition-colors hover:bg-[#443569]">
              <UploadCloud size={13} strokeWidth={2.5} /> Upload
            </button>
          </div>
          
          {/* .doc-list */}
          <div className="flex flex-col gap-[1px] overflow-hidden rounded-[10px] bg-[#F0ECE5]">
            {[
              { status: 'locked', lbl: 'LOCKED', name: '2024_TaxPlan.pdf', meta: 'Added Oct 10 · 2.4 MB', ic: Lock },
              { status: 'signed', lbl: 'SIGNED', name: 'Engagement_Letter.pdf', meta: 'Added Oct 1 · 1.1 MB', ic: FileSignature },
              { status: 'unlocked', lbl: 'VIEWED', name: 'Q3_Review_Slides.pdf', meta: 'Added Sep 30 · 5.4 MB', ic: Eye },
            ].map((doc, i) => (
              <div key={i} className="flex flex-wrap items-center gap-[10px] bg-white p-[10px_12px] transition-colors hover:bg-[#F7F5F2] sm:flex-nowrap sm:gap-[12px] sm:p-[10px_14px]">
                <div className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] bg-[#F3EFFA] text-[#443569]">
                  <doc.ic size={14} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-opensans text-[12.5px] font-bold text-[#1F2937]">{doc.name}</div>
                  <div className="mt-[1px] font-mono text-[10.5px] text-[#98A2B3]">{doc.meta}</div>
                </div>
                {/* Dynamic doc-status badge */}
                <div className={`rounded-[5px] px-[8px] py-[3px] font-opensans text-[10px] font-bold tracking-[.04em] ${
                  doc.status === 'locked' ? 'bg-[#FDEBE8] text-[#C63D2F]' :
                  doc.status === 'signed' ? 'bg-[#E8F3F1] text-[#1F5E5B]' :
                  doc.status === 'unlocked' ? 'bg-[#E8F5EE] text-[#1A7A4A]' : 'bg-[#FEF9EE] text-[#7a5a00]'
                }`}>
                  {doc.lbl}
                </div>
                <div className="ml-auto flex gap-[4px]">
                  <button className="flex h-[28px] w-[28px] items-center justify-center rounded-[7px] border bg-white text-[#98A2B3] transition-colors hover:border-[#5B4A8B] hover:bg-[#F3EFFA] hover:text-[#443569]" style={{ borderColor: COLORS.border }}>
                    <Download size={12} strokeWidth={2} />
                  </button>
                  <button className="flex h-[28px] w-[28px] items-center justify-center rounded-[7px] border bg-white text-[#98A2B3] transition-colors hover:border-[#5B4A8B] hover:bg-[#F3EFFA] hover:text-[#443569]" style={{ borderColor: COLORS.border }}>
                    <Link size={12} strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel: Messages */}
      <div className={`flex-1 ${activeTab === 'messages' ? 'block' : 'hidden'}`}>
        <div className="rounded-[14px] border bg-white p-[14px] sm:p-[18px_20px] shadow-[0_1px_3px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
          <div className="mb-[16px] flex flex-col gap-[10px] border-b pb-[12px] sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: COLORS.borderSoft }}>
            <h3 className="font-poppins text-[15px] font-bold tracking-[-0.01em] text-[#1F2937]">Direct Messages</h3>
            <button className="flex items-center gap-[6px] rounded-[8px] border bg-white px-[12px] py-[6px] font-opensans text-[11.5px] font-bold text-[#667085] transition-colors hover:border-[#2F7D79] hover:text-[#1F5E5B]" style={{ borderColor: COLORS.border }}>
              <Plus size={13} strokeWidth={2.5} /> New Message
            </button>
          </div>
          
          {/* .msg-thread */}
          <div className="flex flex-col gap-[14px]">
            {/* Client msg */}
            <div className="flex w-full max-w-full gap-[10px] self-start sm:max-w-[78%]">
              <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#D4A017] font-poppins text-[9.5px] font-extrabold text-white">MH</div>
              <div className="rounded-[14px_14px_14px_2px] bg-[#F7F5F2] p-[10px_14px] max-w-full">
                <div className="mb-[3px] flex items-baseline gap-[8px]">
                  <div className="font-opensans text-[11.5px] font-bold text-[#1F2937]">Marcus Hill</div>
                  <div className="font-mono text-[10px] text-[#98A2B3]">Oct 10, 8:15 AM</div>
                </div>
                <div className="font-opensans text-[12.5px] leading-[1.55] text-[#1F2937]">Hi David, I just reviewed the proposed Q3 estimated tax strategy. Are we still factoring in the equipment depreciation for the new tractors?</div>
              </div>
            </div>

            {/* Staff msg (.staff) */}
            <div className="flex w-full max-w-full flex-row-reverse gap-[10px] self-end sm:max-w-[78%]">
              <div className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full bg-[#1B3A5C] font-poppins text-[9.5px] font-extrabold text-white">DC</div>
              <div className="rounded-[14px_14px_2px_14px] bg-[#F3EFFA] p-[10px_14px] max-w-full text-right">
                <div className="mb-[3px] flex flex-row-reverse items-baseline gap-[8px]">
                  <div className="font-opensans text-[11.5px] font-bold text-[#1F2937]">David Chen (RM)</div>
                  <div className="font-mono text-[10px] text-[#98A2B3]">Oct 10, 9:30 AM</div>
                </div>
                <div className="font-opensans text-[12.5px] leading-[1.55] text-[#1F2937]">Good morning Marcus! Yes, section 179 for those vehicles is factored into page 3. If you approve, please sign the engagement letter so we can file!</div>
              </div>
            </div>

          </div>

          <div className="mt-[20px] pt-[14px] border-t" style={{ borderColor: COLORS.borderSoft }}>
            <textarea className="w-full rounded-[10px] border border-[#E7E3DD] p-[12px_14px] font-opensans text-[12.5px] transition-all bg-white hover:border-[#5B4A8B] focus:border-[#5B4A8B] focus:outline-none" rows="3" placeholder="Type a message to Marcus..." />
            <div className="mt-[8px] flex justify-end">
              <button className="flex items-center gap-[6px] rounded-[8px] bg-[#5B4A8B] px-[16px] py-[8px] font-opensans text-[11.5px] font-bold text-white transition-colors hover:bg-[#443569]">
                Send Message
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Panel: Subscription */}
      <div className={`flex-1 ${activeTab === 'subscription' ? 'block' : 'hidden'} space-y-[16px]`}>
        {/* Stripe Subscription Card */}
        <div className="rounded-[14px] border bg-white p-[14px] sm:p-[18px_20px] shadow-[0_1px_3px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
          <div className="mb-[16px] flex flex-col gap-[8px] pb-[14px] border-b border-[#F0ECE5] sm:flex-row sm:items-center sm:justify-between">
             <div className="flex items-center gap-[8px] font-poppins text-[15px] font-bold text-[#1F2937] tracking-[-0.01em]">
                <Layout size={16} strokeWidth={2.5} className="text-[#1F2937]" /> Stripe Subscription
             </div>
             <div className="font-opensans text-[10.5px] font-bold tracking-[.02em] bg-[#E8F5EE] text-[#1A7A4A] px-[8px] py-[3px] rounded-[6px]">
               Active · Auto-renews
             </div>
          </div>

          <div className="grid grid-cols-1 gap-x-[40px] gap-y-[6px] md:grid-cols-2">
             {[
               { lbl: 'PLAN', val: 'Quarterly · $349/qtr' },
               { lbl: 'STRIPE SUBSCRIPTION ID', val: 'sub_1ABcQRDLp9K2Xy9z', mono: true },
               { lbl: 'STATUS', val: 'Active', green: true },
               { lbl: 'CUSTOMER ID', val: 'cus_PQ3xK8mFg7nL', mono: true },
               { lbl: 'STARTED', val: 'Jan 1, 2025' },
               { lbl: 'PAYMENT METHOD', val: 'Visa **** 4421' },
               { lbl: 'NEXT INVOICE', val: 'Jul 1, 2026' },
               { lbl: 'LIFETIME REVENUE', val: '$4,189.00' },
               { lbl: 'AUTO-RENEW', val: 'On', green: true },
               { lbl: 'FAILED PAYMENTS', val: '0' },
             ].map((r, i) => (
                <div key={i} className="flex items-center justify-between border-b border-[#F0ECE5] py-[10px] last:border-b-0">
                  <div className="font-opensans text-[10.5px] font-extrabold uppercase tracking-[.06em] text-[#98A2B3]">{r.lbl}</div>
                  <div className={`font-opensans text-[12.5px] font-semibold text-right ${r.green ? 'text-[#1A7A4A]' : 'text-[#1F2937]'} ${r.mono ? 'font-mono text-[11px]' : ''}`}>{r.val}</div>
                </div>
             ))}
          </div>

           <div className="mt-[16px] flex flex-col gap-[10px] border-t border-[#F0ECE5] pt-[14px] lg:flex-row lg:items-center lg:justify-between">
             <div className="flex flex-wrap gap-[8px]">
               <button className="rounded-[8px] border bg-white px-[12px] py-[6px] font-opensans text-[11.5px] font-bold text-[#1F2937] transition-colors hover:border-[#2F7D79] hover:bg-[#F7F5F2]" style={{ borderColor: COLORS.border }}>
                 Change plan
               </button>
               <button className="rounded-[8px] border bg-white px-[12px] py-[6px] font-opensans text-[11.5px] font-bold text-[#1F2937] transition-colors hover:border-[#2F7D79] hover:bg-[#F7F5F2]" style={{ borderColor: COLORS.border }}>
                 Issue credit
               </button>
               <button className="flex items-center gap-[4px] rounded-[8px] border bg-white px-[12px] py-[6px] font-opensans text-[11.5px] font-bold text-[#1F2937] transition-colors hover:border-[#2F7D79] hover:bg-[#F7F5F2]" style={{ borderColor: COLORS.border }}>
                 View on Stripe <ExternalLink size={12} strokeWidth={2.5} />
               </button>
             </div>
             <button className="rounded-[8px] border border-[#FDEBE8] bg-white px-[12px] py-[6px] font-opensans text-[11.5px] font-bold text-[#C63D2F] transition-colors hover:bg-[#FDEBE8]">
               Cancel subscription
             </button>
          </div>
        </div>

        {/* Invoice History Card */}
        <div className="rounded-[14px] border bg-white p-[14px] sm:p-[18px_20px] shadow-[0_1px_3px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
          <div className="mb-[16px] flex items-center justify-between pb-[14px] border-b border-[#F0ECE5]">
             <div className="flex items-center gap-[8px] font-poppins text-[15px] font-bold text-[#1F2937] tracking-[-0.01em]">
                <File size={16} strokeWidth={2.5} className="text-[#1F2937]" /> Invoice History
             </div>
          </div>
          <div>
            {[
              { date: 'Apr 1, 2026', id: 'inv_4D9a2P', plan: 'Quarterly subscription', amt: '$349.00' },
              { date: 'Jan 1, 2026', id: 'inv_3B8c1Q', plan: 'Quarterly subscription', amt: '$349.00' },
              { date: 'Oct 1, 2025', id: 'inv_2A7b0R', plan: 'Quarterly subscription', amt: '$349.00' },
            ].map((inv, i) => (
              <div key={i} className="flex flex-wrap items-center gap-y-[8px] border-b border-[#F0ECE5] py-[12px] last:border-b-0 transition-colors hover:bg-[#FAF8F4] px-[8px] -mx-[8px] rounded-[8px]">
                 <div className="w-full sm:w-[180px]">
                   <div className="font-opensans text-[12.5px] font-bold text-[#1F2937]">{inv.date}</div>
                   <div className="font-mono text-[10.5px] text-[#98A2B3] mt-[2px]">{inv.id}</div>
                 </div>
                 <div className="w-full flex-1 font-opensans text-[12.5px] text-[#667085] sm:w-auto">{inv.plan}</div>
                 <div className="w-auto sm:w-[100px] font-mono text-[12px] font-bold text-[#1F2937]">{inv.amt}</div>
                 <div className="w-auto sm:w-[80px]">
                   <span className="font-opensans text-[10.5px] font-bold tracking-[.02em] bg-[#E8F5EE] text-[#1A7A4A] px-[8px] py-[3px] rounded-[6px]">Paid</span>
                 </div>
                 <button className="ml-auto flex h-[28px] w-[28px] items-center justify-center rounded-[7px] border bg-white text-[#98A2B3] transition-colors hover:border-[#5B4A8B] hover:bg-[#F3EFFA] hover:text-[#443569] sm:ml-0" style={{ borderColor: COLORS.border }}>
                   <Download size={13} strokeWidth={2} />
                 </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panel: Audit */}
      <div className={`flex-1 ${activeTab === 'audit' ? 'block' : 'hidden'}`}>
        <div className="rounded-[14px] border bg-white p-[14px] sm:p-[18px_20px] shadow-[0_1px_3px_rgba(31,41,55,.04)]" style={{ borderColor: COLORS.border }}>
          <div className="mb-[18px] flex flex-col gap-[8px] pb-[14px] border-b border-[#F0ECE5] sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-[8px] font-poppins text-[14px] font-bold text-[#1F2937] tracking-[-0.01em] sm:text-[15px]">
              <Shield size={16} strokeWidth={2.5} className="text-[#1F2937]" /> Audit Trail <span className="font-semibold text-[#98A2B3]">· Client-scoped</span>
            </div>
            <button className="flex items-center gap-[6px] rounded-[8px] border bg-white px-[12px] py-[6px] font-opensans text-[11.5px] font-bold text-[#1F2937] transition-colors hover:bg-[#F7F5F2]" style={{ borderColor: COLORS.border }}>
              <Download size={13} strokeWidth={2} /> Export
            </button>
          </div>
          
          <div className="flex flex-col gap-[2px]">
            {[
              { 
                uName: 'Janet Okafor', act: 'login from 98.164.x.x (Houston, TX) · MFA verified',
                meta: 'Today · 1:06 PM · client_id: cli_0482',
                icBg: 'bg-[#F3EFFA]', icCol: 'text-[#443569]', border: 'border-[#E7E3DD]', icon: <div className="h-[4px] w-[4px] rounded-full bg-[#443569]"></div>
              },
              { 
                uName: 'Janet Okafor', act: 'submitted reassignment request — target: Yvonne Hollis-Cobb',
                meta: 'Today · 2:14 PM · triggered Pending Approval #A-8103',
                icBg: 'bg-[#F3EFFA]', icCol: 'text-[#443569]', border: 'border-[rgba(91,74,139,.2)]', icon: <Shield size={13} strokeWidth={2} />
              },
              { 
                uName: 'Angela Bernard (RM)', act: 'viewed client profile',
                meta: 'Today · 2:22 PM · accessed via: Pending Approvals queue',
                icBg: 'bg-[#E8F5EE]', icCol: 'text-[#1A7A4A]', border: 'border-[#C3E6C3]', icon: <Eye size={13} strokeWidth={2} />
              },
              { 
                uName: 'David Chen', act: 'locked document: W-2 (2025 · Regal Consulting)',
                meta: 'Mar 28 · 9:34 AM · document_id: doc_8829',
                icBg: 'bg-[#FEF9EE]', icCol: 'text-[#B8860B]', border: 'border-[#EADAB0]', icon: <Lock size={13} strokeWidth={2} />
              },
              { 
                uName: 'System', act: 'Stripe webhook · invoice.payment_succeeded · $349.00',
                meta: 'Apr 1 · 12:03 AM · event: evt_1JkP4zDLp9',
                icBg: 'bg-[#F7F5F2]', icCol: 'text-[#667085]', border: 'border-[#E7E3DD]', icon: <Layout size={13} strokeWidth={2} />
              },
              { 
                uName: 'David Chen', act: 'assigned as Advisor (client creation)',
                meta: 'Jan 1, 2025 · 10:22 AM · initial assignment',
                icBg: 'bg-[#F3EFFA]', icCol: 'text-[#443569]', border: 'border-[rgba(91,74,139,.2)]', icon: <UserPlus size={13} strokeWidth={2} />
              },
            ].map((r, i) => (
              <div key={i} className="flex gap-[12px] py-[10px] border-b border-transparent last:border-0 hover:bg-[#FAF8F4] px-[8px] -mx-[8px] rounded-[8px] transition-colors">
                <div className={`flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full border-[1.5px] ${r.icBg} ${r.icCol} ${r.border}`}>
                  {r.icon}
                </div>
                <div className="flex-1 pt-[5px]">
                  <div className="font-opensans text-[12.5px] text-[#1F2937] leading-[1.5]"><strong>{r.uName}</strong> · {r.act}</div>
                  <div className="mt-[2px] font-mono text-[10.5px] text-[#98A2B3]">{r.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Client Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A2838]/30 p-[12px] backdrop-blur-[2px] sm:p-[20px]">
          <div className="relative flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_20px_60px_rgba(31,41,55,.1)] sm:rounded-[20px]">
            <div className="flex items-start justify-between border-b px-[16px] py-[16px] sm:px-[32px] sm:py-[24px]" style={{ borderColor: COLORS.borderSoft }}>
              <div>
                <h2 className="font-poppins text-[22px] font-bold tracking-[-0.02em] text-[#1F2937]">Edit client</h2>
                <p className="mt-[4px] font-opensans text-[12px] text-[#667085]">Changes will be logged to the audit trail · Client will be notified of significant changes</p>
              </div>
              <button onClick={() => setShowEditModal(false)} className="rounded-[8px] border bg-white p-[6px] text-[#98A2B3] transition-colors hover:bg-[#F7F5F2]" style={{ borderColor: COLORS.border }}>
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-[16px] py-[16px] sm:px-[32px] sm:py-[24px]">
              <div className="mb-[24px] flex items-center gap-[14px] rounded-[12px] bg-[#F3EFFA] p-[16px]">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full font-poppins text-[15px] font-extrabold text-white" style={{ background: client?.avColor || '#2F7D79' }}>{clientInitials}</div>
                <div>
                  <div className="font-poppins text-[15px] font-bold text-[#1F2937]">{clientName}</div>
                  <div className="font-mono text-[11px] text-[#667085] mt-[2px]">Client · {clientLocation} · Member since Jan 2025</div>
                </div>
              </div>

              <div className="mb-[20px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.1em] text-[#98A2B3]">Contact Info</div>
              
              <div className="mb-[16px]">
                <label className="mb-[6px] block font-opensans text-[10.5px] font-bold uppercase tracking-[.06em] text-[#667085]">Full Name</label>
                <input type="text" defaultValue={clientName} className="w-full rounded-[10px] border border-[#E7E3DD] p-[10px_14px] font-opensans text-[13.5px] font-semibold text-[#1F2937] transition-all hover:border-[#5B4A8B] focus:border-[#5B4A8B] focus:outline-none" />
              </div>
              
              <div className="mb-[16px]">
                <label className="mb-[6px] block font-opensans text-[10.5px] font-bold uppercase tracking-[.06em] text-[#667085]">Email</label>
                <input type="text" defaultValue={clientEmail} className="w-full rounded-[10px] border border-[#E7E3DD] p-[10px_14px] font-opensans text-[13.5px] font-semibold text-[#1F2937] transition-all hover:border-[#5B4A8B] focus:border-[#5B4A8B] focus:outline-none" />
                <div className="mt-[6px] flex gap-[6px] font-opensans text-[11.5px] font-bold text-[#B8860B]">
                  <AlertTriangle size={13} strokeWidth={2.5} className="shrink-0 mt-[1px]" />
                  <span>Changing email will change the client's login. They'll receive a verification email at the new address.</span>
                </div>
              </div>
              
              <div className="mb-[24px]">
                <label className="mb-[6px] block font-opensans text-[10.5px] font-bold uppercase tracking-[.06em] text-[#667085]">Phone</label>
                <input type="text" defaultValue={clientPhone} className="w-full rounded-[10px] border border-[#E7E3DD] p-[10px_14px] font-opensans text-[13.5px] font-semibold text-[#1F2937] transition-all hover:border-[#5B4A8B] focus:border-[#5B4A8B] focus:outline-none" />
              </div>

              <div className="mb-[20px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.1em] text-[#98A2B3] pt-[16px] border-t border-[#F0ECE5]">Assignment</div>
              
              <div className="mb-[16px]">
                <label className="mb-[6px] block font-opensans text-[10.5px] font-bold uppercase tracking-[.06em] text-[#667085]">Assigned Advisor</label>
                <div className="flex items-center justify-between rounded-[10px] border border-[#E7E3DD] bg-[#FAF8F4] p-[12px_14px]">
                  <div className="flex items-center gap-[10px]">
                    <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-[#1B3A5C] font-poppins text-[10px] font-extrabold text-white">YC</div>
                    <div className="font-opensans text-[13.5px] font-bold text-[#1F2937]">Yvonne Hollis-Cobb <span className="font-normal text-[#98A2B3]">· Downtown</span></div>
                  </div>
                  <button onClick={() => { setShowEditModal(false); setShowReassignModal(true); }} className="rounded-[6px] border border-[#E7E3DD] bg-white px-[12px] py-[6px] font-opensans text-[11.5px] font-bold text-[#667085] hover:bg-[#F7F5F2] hover:text-[#1F2937] transition-colors shadow-sm">Reassign</button>
                </div>
                <div className="mt-[8px] font-opensans text-[11px] text-[#98A2B3]">To change the advisor, use the dedicated Reassign flow (handles notifications and audit properly)</div>
              </div>

              <div className="mb-[24px]">
                <label className="mb-[6px] block font-opensans text-[10.5px] font-bold uppercase tracking-[.06em] text-[#667085]">Location</label>
                <div className="flex items-center justify-between rounded-[10px] border border-[#E7E3DD] bg-[#F7F5F2] p-[10px_14px]">
                  <div className="flex items-center gap-[8px] font-opensans text-[13.5px] font-semibold text-[#1F2937]">
                    <MapPin size={14} className="text-[#98A2B3]" /> {clientLocation}
                  </div>
                  <div className="font-opensans text-[11.5px] text-[#98A2B3]">Inherited from Advisor</div>
                </div>
              </div>

              <div className="mb-[20px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.1em] text-[#98A2B3] pt-[16px] border-t border-[#F0ECE5]">Subscription</div>
              
              <div className="mb-[16px]">
                <label className="mb-[6px] block font-opensans text-[10.5px] font-bold uppercase tracking-[.06em] text-[#667085]">Plan</label>
                <select className="w-full rounded-[10px] border border-[#E7E3DD] bg-white p-[10px_14px] font-opensans text-[13.5px] text-[#1F2937] hover:border-[#5B4A8B] transition-colors focus:border-[#5B4A8B] focus:outline-none">
                  <option>Quarterly Base ($349.00)</option>
                  <option>Monthly Base ($120.00)</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col-reverse items-stretch justify-end gap-[10px] border-t bg-[#FAF8F4] px-[16px] py-[14px] sm:flex-row sm:items-center sm:px-[32px] sm:py-[20px]" style={{ borderColor: COLORS.borderSoft, borderRadius: '0 0 20px 20px' }}>
              <button onClick={() => setShowEditModal(false)} className="rounded-[10px] border bg-white px-[18px] py-[10px] font-opensans text-[13.5px] font-bold text-[#667085] transition-colors hover:bg-[#F7F5F2]" style={{ borderColor: COLORS.border }}>Cancel</button>
              <button onClick={() => setShowEditModal(false)} className="rounded-[10px] bg-[#5B4A8B] px-[18px] py-[10px] font-opensans text-[13.5px] font-bold text-white shadow-[0_4px_14px_rgba(91,74,139,.25)] transition-colors hover:bg-[#443569]">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* Reassign Modal */}
      {showReassignModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1A2838]/30 p-[12px] backdrop-blur-[2px] sm:p-[20px]">
          <div className="relative flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_20px_60px_rgba(31,41,55,.1)] sm:rounded-[20px]">
            <div className="flex items-start justify-between border-b px-[16px] py-[16px] sm:px-[32px] sm:py-[24px]" style={{ borderColor: COLORS.borderSoft }}>
              <div>
                <h2 className="font-poppins text-[22px] font-bold tracking-[-0.02em] text-[#1F2937]">Reassign client</h2>
                <p className="mt-[4px] font-opensans text-[12px] text-[#667085]">Move this client to a different Advisor · Both advisors and the client will be notified · Logged to audit trail</p>
              </div>
              <button onClick={() => setShowReassignModal(false)} className="rounded-[8px] border bg-white p-[6px] text-[#98A2B3] transition-colors hover:bg-[#F7F5F2]" style={{ borderColor: COLORS.border }}>
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-[16px] py-[16px] sm:px-[32px] sm:py-[24px]">
              <div className="mb-[24px] flex items-center gap-[14px] rounded-[12px] bg-[#F3EFFA] p-[16px]">
                <div className="flex h-[42px] w-[42px] items-center justify-center rounded-full font-poppins text-[15px] font-extrabold text-white" style={{ background: client?.avColor || '#2F7D79' }}>{clientInitials}</div>
                <div>
                  <div className="font-poppins text-[15px] font-bold text-[#1F2937]">{clientName}</div>
                  <div className="font-mono text-[11px] text-[#667085] mt-[2px]">Client · FFS Score 84 · {clientMrr}</div>
                </div>
              </div>

              <div className="mb-[10px] font-opensans text-[10.5px] font-extrabold uppercase tracking-[.1em] text-[#98A2B3]">From Advisor</div>
              
              <div className="mb-[16px] flex items-center gap-[12px] rounded-[12px] border border-[#E7E3DD] bg-[#FAF8F4] p-[16px] shadow-[0_1px_2px_rgba(31,41,55,.05)]">
                <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full bg-[#1B3A5C] font-poppins text-[14px] font-extrabold text-white">YC</div>
                <div>
                  <div className="font-poppins text-[14px] font-bold text-[#1F2937]">Yvonne Hollis-Cobb</div>
                  <div className="mt-[2px] font-mono text-[11px] text-[#98A2B3]">Downtown Houston · 18 assigned clients <span className="text-[#C63D2F]">· Pending deactivation</span></div>
                </div>
              </div>

              <div className="my-[20px] flex justify-center text-[#98A2B3]">
                <ArrowDown size={18} strokeWidth={2.5} />
              </div>

                <div className="mb-[16px] flex flex-col gap-[8px] sm:flex-row sm:items-center sm:justify-between">
                 <div className="font-opensans text-[10.5px] font-extrabold uppercase tracking-[.1em] text-[#98A2B3]">To Advisor</div>
                 <div className="w-full sm:w-[200px]">
                   <select className="w-full rounded-[8px] border border-[#E7E3DD] bg-white p-[8px_12px] font-opensans text-[12.5px] text-[#1F2937] hover:border-[#2C5F7F] transition-colors focus:border-[#2C5F7F] focus:outline-none shadow-sm cursor-pointer">
                     <option>Katy</option>
                     <option>Downtown Houston</option>
                   </select>
                 </div>
              </div>

              <div className="mb-[24px] rounded-[12px] border border-[#E7E3DD] bg-[#FAF8F4]">
                <div className="flex items-center justify-between border-b border-[#F0ECE5] p-[12px_16px]">
                  <div className="font-opensans text-[10px] font-extrabold uppercase tracking-[.1em] text-[#98A2B3]">Advisors at Katy</div>
                  <div className="font-mono text-[10px] text-[#667085]">1 available</div>
                </div>
                <div className="p-[16px]">
                   <div className="flex flex-col gap-[10px]">
                      <label className="flex cursor-pointer items-start gap-[12px] rounded-[10px] border-[1.5px] border-[#1A7A4A] bg-white p-[14px] shadow-[0_2px_8px_rgba(26,122,74,.1)] transition-colors hover:bg-[#F3FCF7]">
                         <div className="pt-[6px]">
                           <div className="flex h-[18px] w-[18px] items-center justify-center rounded-full border-[1.5px] border-[#1A7A4A]">
                             <div className="h-[10px] w-[10px] rounded-full bg-[#1A7A4A]"></div>
                           </div>
                         </div>
                         <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#1B3A5C] font-poppins text-[13px] font-extrabold text-white">YC</div>
                         <div className="flex-1">
                            <div className="font-opensans text-[14px] font-bold text-[#1F2937]">Yvonne Hollis-Cobb</div>
                            <div className="mt-[4px] flex items-center gap-[6px] font-opensans text-[11px] text-[#667085]">
                               <span className="rounded-[4px] border border-[#E7E3DD] bg-[#F7F5F2] px-[6px] py-[2px] font-medium text-[#1F2937]">Katy</span>
                               <span>CPA · Lead Advisor</span>
                            </div>
                         </div>
                         <div className="text-right">
                           <div className="font-poppins text-[14px] font-bold text-[#1F2937]">24 <span className="text-[#98A2B3] font-normal">/ 40</span></div>
                           <div className="mt-[6px] h-[3.5px] w-[46px] overflow-hidden rounded-full bg-[#E7E3DD]">
                             <div className="h-full w-[60%] bg-[#1A7A4A]"></div>
                           </div>
                         </div>
                      </label>
                   </div>
                </div>
              </div>

              <div className="mb-[20px]">
                <label className="mb-[8px] block font-opensans text-[10.5px] font-bold uppercase tracking-[.06em] text-[#667085]">Reason for reassignment <span className="font-normal normal-case">· Required for audit trail</span></label>
                <select className="w-full rounded-[10px] border border-[#E7E3DD] bg-white p-[10px_14px] font-opensans text-[13.5px] text-[#1F2937] hover:border-[#2C5F7F] transition-colors focus:border-[#2C5F7F] focus:outline-none cursor-pointer">
                  <option>Client requested reassignment</option>
                  <option>Advisor out of office</option>
                  <option>Workload rebalancing</option>
                </select>
              </div>

              <div className="mb-[28px]">
                <label className="mb-[8px] block font-opensans text-[10.5px] font-bold uppercase tracking-[.06em] text-[#667085]">Note <span className="font-normal normal-case">· Optional · Visible to both advisors</span></label>
                <textarea className="w-full rounded-[10px] border border-[#E7E3DD] p-[12px_14px] font-opensans text-[13.5px] text-[#1F2937] focus:border-[#2C5F7F] focus:outline-none transition-all" rows="3" placeholder="Context for the new advisor..." defaultValue='Context for the new advisor (e.g., "Janet is prepping for Q2 estimated tax question, last thread was 3 days ago")'></textarea>
              </div>

              <div className="rounded-[12px] bg-[#FAF8F4] p-[18px] border border-[#E7E3DD] flex flex-col gap-[14px]">
                <label className="flex items-center gap-[12px] cursor-pointer group">
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border-[1.5px] border-[#2C5F7F] bg-[#2C5F7F]">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </div>
                  <span className="font-opensans text-[13.5px] text-[#1F2937] font-semibold group-hover:text-[#2C5F7F] transition-colors">Send welcome email to client with new Advisor intro</span>
                </label>
                <label className="flex items-center gap-[12px] cursor-pointer group">
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border-[1.5px] border-[#2C5F7F] bg-[#2C5F7F]">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </div>
                  <span className="font-opensans text-[13.5px] text-[#1F2937] font-semibold group-hover:text-[#2C5F7F] transition-colors">Notify previous Advisor of reassignment</span>
                </label>
                <label className="flex items-center gap-[12px] cursor-pointer group">
                  <div className="flex h-[18px] w-[18px] items-center justify-center rounded-[4px] border-[1.5px] border-[#2C5F7F] bg-[#2C5F7F]">
                    <Check size={12} strokeWidth={3} className="text-white" />
                  </div>
                  <span className="font-opensans text-[13.5px] text-[#1F2937] font-semibold group-hover:text-[#2C5F7F] transition-colors">Notify new Advisor with client handoff summary</span>
                </label>
              </div>

            </div>
            
            <div className="flex flex-col gap-[12px] border-t bg-[#FAF8F4] px-[16px] py-[14px] sm:flex-row sm:items-center sm:justify-between sm:px-[32px] sm:py-[22px]" style={{ borderColor: COLORS.borderSoft, borderRadius: '0 0 20px 20px' }}>
              <div className="font-opensans text-[11.5px] font-semibold text-[#667085]">Action is irreversible</div>
              <div className="flex flex-col-reverse gap-[8px] sm:flex-row sm:gap-[12px]">
                 <button onClick={() => setShowReassignModal(false)} className="rounded-[10px] border bg-white px-[20px] py-[10px] font-opensans text-[13.5px] font-bold text-[#667085] transition-colors hover:bg-[#F7F5F2]" style={{ borderColor: COLORS.border }}>Cancel</button>
                 <button onClick={() => setShowReassignModal(false)} className="rounded-[10px] bg-[#2C5F7F] px-[20px] py-[10px] font-opensans text-[13.5px] font-bold text-white shadow-[0_4px_14px_rgba(44,95,127,.25)] transition-colors hover:bg-[#1B3A5C]">Confirm Reassignment</button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
