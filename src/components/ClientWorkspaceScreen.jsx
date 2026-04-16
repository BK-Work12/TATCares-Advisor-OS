import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Circle, Send } from 'lucide-react';
import ProposalBuilderView from './ProposalBuilderView';
import { COLORS, cardShadow } from './tatcaresShared';

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'proposals', label: 'Proposal Builder' },
  { id: 'diagnostics', label: 'Diagnostics' },
  { id: 'taxplan', label: 'Tax Plan' },
  { id: 'ffsscoring', label: 'FFS Score' },
];

const STAGE_FLOW = [
  'New Leads',
  'Ashley Qualified',
  'Intake In Progress',
  'Advisor Review',
  'Proposal Building',
  'Proposal Sent',
  'Active Subscribers',
  'Renewal Decision',
];

function normalizeStage(stage) {
  if (!stage) {
    return STAGE_FLOW[0];
  }

  const lower = stage.toLowerCase();
  const exact = STAGE_FLOW.find((s) => s.toLowerCase() === lower);
  if (exact) {
    return exact;
  }

  if (lower.includes('new')) return 'New Leads';
  if (lower.includes('ashley')) return 'Ashley Qualified';
  if (lower.includes('intake')) return 'Intake In Progress';
  if (lower.includes('advisor')) return 'Advisor Review';
  if (lower.includes('proposal building')) return 'Proposal Building';
  if (lower.includes('proposal sent')) return 'Proposal Sent';
  if (lower.includes('active')) return 'Active Subscribers';
  if (lower.includes('renewal')) return 'Renewal Decision';
  return STAGE_FLOW[0];
}

function scoreVisual(score) {
  if (typeof score !== 'number') {
    return { label: 'Not scored', color: COLORS.textMuted, bg: COLORS.bg, value: '—' };
  }
  if (score >= 75) {
    return { label: 'Optimized', color: COLORS.green, bg: '#E8F5EE', value: String(score) };
  }
  if (score >= 55) {
    return { label: 'Building', color: COLORS.teal, bg: COLORS.tealTint, value: String(score) };
  }
  if (score >= 40) {
    return { label: 'At risk', color: COLORS.gold, bg: '#FEF9EE', value: String(score) };
  }
  return { label: 'Critical', color: COLORS.red, bg: COLORS.redTint, value: String(score) };
}

function TopHeader({ client, activeTab, onTabChange, onBackToPipeline }) {
  const scoreMeta = scoreVisual(client.score);
  const tierBg = client.tier === 'T3' ? '#E8F5EE' : client.tier === 'T2' ? '#F3EFFA' : '#EEF3FC';
  const tierColor = client.tier === 'T3' ? COLORS.green : client.tier === 'T2' ? '#5B4A8B' : '#2C5F7F';

  return (
    <div className="shrink-0 border-b" style={{ background: COLORS.card, borderBottomColor: COLORS.border }}>
      <div className="flex flex-wrap items-center gap-2 border-b px-4 pb-3 pt-3 sm:px-6" style={{ borderBottomColor: COLORS.borderSoft }}>
        <button
          onClick={onBackToPipeline}
          className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-[12px] font-bold"
          style={{ color: COLORS.textMuted }}
        >
          <ArrowLeft size={13} />
          Pipeline
        </button>
        <span style={{ color: COLORS.border }}>/</span>
        <div
          className="flex h-7.5 w-7.5 items-center justify-center rounded-lg text-[11px] font-extrabold text-white"
          style={{ background: client.avatarColor || COLORS.teal }}
        >
          {client.initials}
        </div>
        <div className="text-[15px] font-bold tracking-tight" style={{ color: COLORS.text }}>
          {client.name}
        </div>
        <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: tierBg, color: tierColor }}>
          {client.tier}
        </span>
        <span className="text-[11px]" style={{ color: COLORS.textMuted }}>
          {client.stage}
        </span>
        <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: scoreMeta.bg, color: scoreMeta.color }}>
          {typeof client.score === 'number' ? `FFS ${client.score}` : 'Not Scored'}
        </span>
      </div>

      <div className="flex overflow-x-auto px-2 sm:px-4">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="shrink-0 border-b-2 px-3 py-2.5 text-[13px] font-semibold sm:px-4"
              style={{
                borderBottomColor: isActive ? COLORS.teal : 'transparent',
                color: isActive ? COLORS.tealDeep : COLORS.textMuted,
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function OverviewPanel({ client }) {
  const stageIndex = Math.max(0, STAGE_FLOW.indexOf(client.stage));
  const scoreMeta = scoreVisual(client.score);
  const [moveStage, setMoveStage] = useState('');
  const checklist = [
    { label: 'Ashley qualification', done: stageIndex >= 1 },
    { label: 'Consultation done', done: stageIndex >= 2 },
    { label: 'Questionnaire complete', done: stageIndex >= 3 },
    { label: '1040 uploaded', done: stageIndex >= 3 },
    { label: 'FFS scored', done: typeof client.score === 'number' },
    { label: 'Go/No-Go approved', done: stageIndex >= 4 },
  ];

  const detailRows = [
    ['Income', client.meta.split(' · ')[0] || '—'],
    ['Lead Source', client.meta.split(' · ')[1] || '—'],
    ['Tier', client.tier],
    ['Days In Stage', client.days],
    ['FFS Score', typeof client.score === 'number' ? `${client.score} / 100` : 'Not scored'],
    ['Current Stage', client.stage],
  ];

  return (
    <div className="grid w-full grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
      <div>
        <div className="mb-4 rounded-2xl border px-5 py-5" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
          <div className="mb-3 text-[14px] font-bold tracking-tight" style={{ color: COLORS.text }}>
            Pipeline Stage
          </div>

          <div className="mb-3.5 overflow-x-auto pb-2">
            <div className="inline-flex items-center gap-2">
              {STAGE_FLOW.map((stage, i) => {
                const done = i < stageIndex;
                const current = i === stageIndex;
                const bg = current ? COLORS.tealTint : done ? '#E8F5EE' : COLORS.bg;
                const borderColor = current ? COLORS.teal : done ? COLORS.green : COLORS.border;
                const color = current ? COLORS.tealDeep : done ? COLORS.green : COLORS.textMuted;
                return (
                  <div key={stage} className="inline-flex items-center gap-2">
                    <span
                      className="whitespace-nowrap rounded-lg border px-3 py-1 text-[10.5px] font-bold"
                      style={{ background: bg, borderColor, color }}
                    >
                      {stage}
                    </span>
                    {i < STAGE_FLOW.length - 1 && <ArrowRight size={11} color={COLORS.textMuted} />}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="text-[13px] font-bold" style={{ color: COLORS.text }}>
                Current: <span style={{ color: COLORS.teal }}>{client.stage}</span>
              </div>
              <div className="mt-0.5 text-[12px]" style={{ color: COLORS.textMuted }}>
                {client.days} in this stage
              </div>
            </div>

            <div className="flex gap-2">
              <select
                value={moveStage}
                onChange={(event) => setMoveStage(event.target.value)}
                className="rounded-[9px] border px-3 py-1.75 text-[12.5px] outline-none"
                style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.card }}
              >
                <option value="">Move to stage...</option>
                {STAGE_FLOW.map((stage) => (
                  <option key={stage} value={stage}>
                    {stage}
                  </option>
                ))}
              </select>
              <button
                className="rounded-[9px] px-3.5 py-1.75 text-[12px] font-bold text-white"
                style={{ background: COLORS.teal }}
              >
                Move →
              </button>
            </div>
          </div>
        </div>

        <div className="mb-4 rounded-2xl border px-5 py-5" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
          <div className="mb-3 text-[14px] font-bold tracking-tight" style={{ color: COLORS.text }}>
            Client Details
          </div>
          <div className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
            {detailRows.map(([label, value]) => (
              <div key={label} className="border-b py-2" style={{ borderBottomColor: COLORS.borderSoft }}>
                <div className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: COLORS.textMuted }}>
                  {label}
                </div>
                <div className="mt-0.5 text-[13px] font-semibold" style={{ color: COLORS.text }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border px-5 py-5" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
          <div className="mb-2.5 flex items-center justify-between gap-3">
            <div className="text-[14px] font-bold tracking-tight" style={{ color: COLORS.text }}>
              Advisor Notes
            </div>
            <button
              className="rounded-lg border px-3 py-1.5 text-[11.5px] font-bold"
              style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.card }}
            >
              Save Note
            </button>
          </div>
          <textarea
            defaultValue={client.status}
            className="min-h-22.5 w-full resize-y rounded-[10px] border px-3.5 py-3 text-[13px] outline-none"
            style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.text, lineHeight: 1.6 }}
          ></textarea>
        </div>
      </div>

      <div>
        <div className="mb-4 rounded-2xl border px-5 py-4.5" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
          <div className="mb-2 text-[13px] font-bold" style={{ color: COLORS.text }}>
            Financial Freedom Score™
          </div>
          <div className="pt-1 text-center">
            <div className="text-5xl font-extrabold leading-none" style={{ color: scoreMeta.color }}>{scoreMeta.value}</div>
            <div className="mt-1 text-[11px] font-extrabold uppercase tracking-widest" style={{ color: scoreMeta.color }}>{scoreMeta.label}</div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
              <div className="h-full rounded-full" style={{ width: `${typeof client.score === 'number' ? client.score : 0}%`, background: scoreMeta.color }}></div>
            </div>
          </div>
          <button
            className="mt-3 w-full rounded-[9px] border px-3 py-2 text-[12px] font-bold"
            style={{ background: COLORS.tealTint, color: COLORS.tealDeep, borderColor: 'rgba(47,125,121,.2)' }}
          >
            Score This Client →
          </button>
        </div>

        <div className="mb-4 rounded-2xl border px-5 py-4.5" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
          <div className="mb-2 text-[13px] font-bold" style={{ color: COLORS.text }}>
            Next Action
          </div>
          <div
            className="mb-3 rounded-[10px] border-l-[3px] px-3 py-2 text-[12.5px] leading-[1.45]"
            style={{
              background: client.actionTone === 'urgent' ? COLORS.redTint : client.actionTone === 'warn' ? '#FEF9EE' : COLORS.tealTint,
              color: client.actionTone === 'urgent' ? COLORS.red : client.actionTone === 'warn' ? '#7a5a00' : COLORS.tealDeep,
              borderLeftColor: client.actionTone === 'urgent' ? COLORS.red : client.actionTone === 'warn' ? COLORS.gold : COLORS.teal,
            }}
          >
            {client.status}
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="w-full rounded-[9px] px-3 py-2 text-[12px] font-bold text-white"
              style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.25),0 1px 3px rgba(198,61,47,.15)' }}
            >
              Build Proposal
            </button>
            <button
              className="w-full rounded-[9px] border-[1.5px] px-3 py-2 text-[12px] font-bold"
              style={{ background: COLORS.card, borderColor: COLORS.border, color: COLORS.textSec }}
            >
              Run Diagnostics
            </button>
            <button
              className="w-full rounded-[9px] border-[1.5px] px-3 py-2 text-[12px] font-bold"
              style={{ background: COLORS.card, borderColor: COLORS.border, color: COLORS.textSec }}
            >
              Tax Plan Builder
            </button>
          </div>
        </div>

        <div className="rounded-2xl border px-5 py-4.5" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
          <div className="mb-2 text-[13px] font-bold" style={{ color: COLORS.text }}>
            Intake Checklist
          </div>
          {checklist.map((item) => (
            <div key={item.label} className="flex items-center gap-2 border-b py-1.75 text-[12.5px] last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft, color: item.done ? COLORS.text : COLORS.textMuted }}>
              <span className="inline-flex h-4.5 w-4.5 items-center justify-center rounded-[5px]" style={{ background: item.done ? COLORS.teal : COLORS.border }}>
                {item.done ? <Check size={10} color="#fff" strokeWidth={3} /> : <Circle size={10} color={COLORS.textMuted} />}
              </span>
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DiagnosticsPanel() {
  return (
    <div className=" w-full">
      <div className="mb-4 flex flex-col items-start justify-between gap-4 rounded-[18px] border px-5 py-4 sm:flex-row sm:items-center sm:px-6" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-extrabold text-white" style={{ background: '#1A7A4A' }}>JC</div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-lg font-bold tracking-tight" style={{ color: COLORS.text }}>Jordan Crawford</div>
              <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: '#E8F5EE', color: '#1A7A4A' }}>T3 · Advisor</span>
              <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: COLORS.tealTint, color: COLORS.tealDeep }}>FFS 68 · Building</span>
            </div>
            <div className="mt-1 text-[12.5px]" style={{ color: COLORS.textSec }}>Single · Houston, TX · TATCares since Jan 2023 · Advised by Yvonne Hollis-Cobb, CPA</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex overflow-hidden rounded-[10px] border" style={{ borderColor: COLORS.border, background: COLORS.bg }}>
            <button className="px-3 py-1.5 text-[12px] font-bold" style={{ background: COLORS.card, color: COLORS.text }}>3-year view</button>
            <button className="px-3 py-1.5 text-[12px] font-bold" style={{ color: COLORS.textMuted }}>2-year view</button>
            <button className="px-3 py-1.5 text-[12px] font-bold" style={{ color: COLORS.textMuted }}>1-year view</button>
          </div>
          <select className="rounded-[10px] border px-3 py-1.5 text-[12.5px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.card, color: COLORS.text }}>
            <option>Jordan Crawford</option>
            <option>Sandra Kim</option>
            <option>Priya Sharma</option>
            <option>Robert Chen</option>
          </select>
        </div>
      </div>

      <div className="mb-4 flex gap-3 rounded-[14px] border px-4 py-3.5" style={{ background: COLORS.tealTint, borderColor: 'rgba(47,125,121,.22)' }}>
        <div className="mt-0.5 flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg" style={{ background: COLORS.teal }}>
          <Circle size={14} color="#fff" strokeWidth={2.5} />
        </div>
        <div>
          <div className="text-[13px] font-bold" style={{ color: COLORS.tealDeep }}>Jordan's tax bill has grown 30% over 3 years while income grew only 18%.</div>
          <div className="mt-1 text-[12.5px] leading-normal" style={{ color: COLORS.tealDeep }}>The gap is explained by missed S-Corp election, no defined benefit contribution, and under-utilization of business deductions. Combined opportunity for 2024 is estimated at <strong>$78,572</strong> in recoverable tax dollars.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3" style={{ borderBottomColor: COLORS.borderSoft }}>
              <div className="text-[14px] font-bold" style={{ color: COLORS.text }}>3-year return comparison</div>
              <div className="flex items-center gap-2">
                <span className="text-[12px]" style={{ color: COLORS.textSec }}>Data source: uploaded 1040s</span>
                <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: COLORS.redTint, color: COLORS.red }}>2024 current year</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-190 border-collapse">
                <thead>
                  <tr>
                    {['Line item', '2022', '2023', '2024 (current)', '3-yr trend'].map((head, idx) => (
                      <th
                        key={head}
                        className="px-4 py-2.5 text-right text-[10px] font-extrabold uppercase tracking-widest"
                        style={{
                          textAlign: idx === 0 ? 'left' : 'right',
                          color: idx === 3 ? COLORS.red : COLORS.textMuted,
                          background: idx === 3 ? COLORS.redTint : COLORS.bg,
                          borderBottom: `1px solid ${COLORS.borderSoft}`,
                        }}
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Gross income', '$524,800', '$603,200', '$682,110', '↑ 30%'],
                    ['Adjusted gross income', '$510,200', '$588,600', '$667,510', '↑ 31%'],
                    ['Total deductions taken', '$14,600', '$14,600', '$14,600', '— flat'],
                    ['Retirement contributions', '$0', '$0', '$0', 'Missed'],
                    ['Business deductions', '$28,400', '$31,200', '$29,800', '— minimal'],
                    ['Taxable income', '$467,200', '$543,800', '$622,910', '↑ 33%'],
                    ['Effective tax rate', '26.8%', '28.1%', '29.5%', '↑ +2.7 pts'],
                  ].map((row) => (
                    <tr key={row[0]} style={{ borderBottom: `1px solid ${COLORS.borderSoft}` }}>
                      {row.map((cell, idx) => (
                        <td
                          key={idx}
                          className="px-4 py-2.5 text-right text-[12.5px]"
                          style={{
                            textAlign: idx === 0 ? 'left' : 'right',
                            color: idx === 0 ? COLORS.text : idx === 4 ? (row[4] === '— flat' || row[4] === '— minimal' ? COLORS.textMuted : COLORS.red) : COLORS.textSec,
                            fontWeight: idx === 0 ? 600 : 400,
                            background: idx === 3 ? 'rgba(198,61,47,.04)' : 'transparent',
                          }}
                        >
                          {cell === 'Missed' ? <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: COLORS.redTint, color: COLORS.red }}>Missed</span> : cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr style={{ background: COLORS.bg }}>
                    <td className="px-4 py-3.5 text-left text-[14px] font-bold" style={{ color: COLORS.text }}>Total tax paid</td>
                    <td className="px-4 py-3.5 text-right text-[13px] font-bold" style={{ color: COLORS.textSec }}>$140,610</td>
                    <td className="px-4 py-3.5 text-right text-[13px] font-bold" style={{ color: COLORS.textSec }}>$168,408</td>
                    <td className="px-4 py-3.5 text-right text-[16px] font-extrabold" style={{ color: COLORS.red, background: 'rgba(198,61,47,.04)' }}>$200,772</td>
                    <td className="px-4 py-3.5 text-right text-[13px] font-extrabold" style={{ color: COLORS.red }}>↑ $60,162</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3" style={{ borderBottomColor: COLORS.borderSoft }}>
              <div className="text-[14px] font-bold" style={{ color: COLORS.text }}>Income vs. tax growth — 3-year trend</div>
              <span className="text-[12px]" style={{ color: COLORS.textSec }}>Tax growing faster than income</span>
            </div>
            <div className="px-6 py-5">
              <div className="mb-5">
                <div className="mb-3 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted }}>Gross income</div>
                {[
                  ['2022', '77%', '$524,800', '#E8F5EE', '#1A7A4A', false],
                  ['2023', '88%', '$603,200', '#E8F5EE', '#1A7A4A', false],
                  ['2024', '100%', '$682,110  ↑ 30%', '#C8EDD8', '#1A7A4A', true],
                ].map(([year, width, label, bg, color, bold]) => (
                  <div key={year} className="mb-2.5 flex items-center gap-3">
                    <span className="w-9 text-[12px] font-bold" style={{ color: bold ? COLORS.text : COLORS.textMuted }}>{year}</span>
                    <div className="h-7 flex-1 overflow-hidden rounded-md" style={{ background: COLORS.border }}>
                      <div className="flex h-full items-center rounded-md pl-3" style={{ width, background: bg }}>
                        <span className="text-[12px] font-bold" style={{ color }}>{label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="mb-3 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted }}>Total tax paid</div>
                {[
                  ['2022', '70%', '$140,610', COLORS.redTint, COLORS.red, false],
                  ['2023', '84%', '$168,408', COLORS.redTint, COLORS.red, false],
                  ['2024', '100%', '$200,772  ↑ 43%', '#F5C4BC', COLORS.red, true],
                ].map(([year, width, label, bg, color, bold]) => (
                  <div key={year} className="mb-2.5 flex items-center gap-3">
                    <span className="w-9 text-[12px] font-bold" style={{ color: bold ? COLORS.text : COLORS.textMuted }}>{year}</span>
                    <div className="h-7 flex-1 overflow-hidden rounded-md" style={{ background: COLORS.border }}>
                      <div className="flex h-full items-center rounded-md pl-3" style={{ width, background: bg }}>
                        <span className="text-[12px] font-bold" style={{ color }}>{label}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 rounded-[10px] px-3.5 py-2.5 text-[12.5px]" style={{ background: COLORS.redTint, color: COLORS.red }}>
                  <strong>Tax grew 43% while income grew 30%.</strong> The 13-point gap represents $18,000+ in avoidable tax over the period.
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3" style={{ borderBottomColor: COLORS.borderSoft }}>
              <div className="text-[14px] font-bold" style={{ color: COLORS.text }}>Missed strategy opportunities</div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: COLORS.redTint, color: COLORS.red }}>5 gaps found</span>
                <span className="text-[12px]" style={{ color: COLORS.textSec }}>~$78,572 recoverable</span>
              </div>
            </div>

            {[
              ['#5B4A8B', 'S-Corp election not filed', 'Net business income exceeded $80K in all 3 years. S-Corp election on distributions would have significantly reduced self-employment tax exposure.', '~$15,000 / year recoverable', 'Missed in: 2022 · 2023 · 2024', 'High', 'red'],
              ['#2C5F7F', 'No defined benefit plan', 'At $682K income, a defined benefit pension plan could shelter $100K-$150K annually. No retirement vehicle of any kind was used in 3 years.', '~$50,000 / year recoverable', 'Missed in: 2022 · 2023 · 2024', 'High', 'red'],
              ['#B8860B', 'Augusta Rule (280A) not applied', 'Client owns a home and operates a business. Renting the home to the business for up to 14 days per year produces tax-free rental income.', '~$14,000 / year recoverable', 'Missed in: 2022 · 2023 · 2024', 'Medium', 'gold'],
              [COLORS.teal, 'HSA not opened or funded', 'Client is eligible for a Health Savings Account with a high-deductible plan. 2024 max contribution ($4,150) provides triple tax advantage.', '~$1,000 / year recoverable', 'Missed in: 2023 · 2024', 'Medium', 'gold'],
              ['#3E6B4F', 'QBI deduction not fully captured', 'As a pass-through entity, up to 20% of qualified business income may be deductible under 199A. Returns show this was not applied in any of the 3 years.', '~$8,000 / year recoverable', 'Missed in: 2022 · 2023 · 2024', 'Medium', 'gold'],
            ].map((row) => (
              <div key={row[1]} className="flex items-start gap-3 border-b px-5 py-3.5 last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft }}>
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg" style={{ background: row[0] }}>
                  <Circle size={14} color="#fff" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <div className="text-[13px] font-bold" style={{ color: COLORS.text }}>{row[1]}</div>
                  <div className="mt-0.5 text-[12px] leading-[1.45]" style={{ color: COLORS.textSec }}>{row[2]}</div>
                  <div className="mt-1 text-[13px] font-bold" style={{ color: row[0] }}>{row[3]}</div>
                  <div className="mt-0.5 text-[11px]" style={{ color: COLORS.textMuted }}>{row[4]}</div>
                </div>
                <span className="shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: row[6] === 'red' ? COLORS.redTint : '#FEF9EE', color: row[6] === 'red' ? COLORS.red : '#7a5a00' }}>{row[5]}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-4 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="border-b px-5 py-3 text-[13px] font-bold" style={{ borderBottomColor: COLORS.borderSoft, color: COLORS.text }}>2024 opportunity summary</div>
            <div className="px-5 pb-0 pt-3">
              {[
                ['S-Corp election', '$15,000', '#5B4A8B'],
                ['Defined benefit plan', '$50,000', '#2C5F7F'],
                ['Augusta Rule', '$14,000', '#B8860B'],
                ['QBI deduction', '$8,000', '#3E6B4F'],
                ['HSA contribution', '$1,572', COLORS.teal],
              ].map((row, idx) => (
                <div key={row[0]} className="flex items-center justify-between border-b py-2 text-[12.5px] last:border-b-0" style={{ borderBottomColor: idx === 4 ? 'transparent' : COLORS.borderSoft }}>
                  <span style={{ color: COLORS.textSec }}>{row[0]}</span>
                  <span className="font-bold" style={{ color: row[2] }}>{row[1]}</span>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 text-center" style={{ background: COLORS.navy }}>
              <div className="text-[11px] font-bold uppercase tracking-wider text-white/50">Total recoverable in 2024</div>
              <div className="mt-1 text-[32px] font-extrabold tracking-tight" style={{ color: '#5ECFCA' }}>$78,572</div>
              <div className="text-[12px] text-white/50">vs. $200,772 current liability</div>
            </div>
          </div>

          <div className="mb-4 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="border-b px-5 py-3 text-[13px] font-bold" style={{ borderBottomColor: COLORS.borderSoft, color: COLORS.text }}>FFS score history</div>
            {[
              ['2022', '41', COLORS.red, 'Critical'],
              ['2023', '52', '#B8860B', 'At risk'],
              ['2024', '68', COLORS.teal, 'Building'],
            ].map((row, idx) => (
              <div key={row[0]} className="flex items-center justify-between border-b px-5 py-2.5 last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft }}>
                <span className="text-[13px] font-bold" style={{ color: idx === 2 ? COLORS.text : COLORS.textMuted }}>{row[0]}</span>
                <div className="mx-3 h-1.5 flex-1 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
                  <div className="h-full rounded-full" style={{ width: `${row[1]}%`, background: row[2] }}></div>
                </div>
                <span className="w-7 text-right text-[14px] font-extrabold" style={{ color: row[2] }}>{row[1]}</span>
                <span className="ml-2 rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: row[3] === 'Critical' ? COLORS.redTint : row[3] === 'At risk' ? '#FEF9EE' : COLORS.tealTint, color: row[3] === 'Critical' ? COLORS.red : row[3] === 'At risk' ? '#7a5a00' : COLORS.tealDeep }}>{row[3]}</span>
              </div>
            ))}
            <div className="px-5 py-3 text-[12px]" style={{ background: COLORS.tealTint, color: COLORS.tealDeep }}>Score has improved <strong>+27 points</strong> over 3 years. Implementing the 5 identified strategies could push the score to <strong>85+</strong> by year end.</div>
          </div>

          <div className="mb-4 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="border-b px-5 py-3 text-[13px] font-bold" style={{ borderBottomColor: COLORS.borderSoft, color: COLORS.text }}>Effective tax rate trend</div>
            <div className="p-4">
              {[
                ['2022', '54%', '26.8%', COLORS.textSec, 'baseline', COLORS.textMuted],
                ['2023', '56%', '28.1%', '#E8782A', '+1.3 pts', COLORS.red],
                ['2024', '59%', '29.5%', COLORS.red, '+1.4 pts', COLORS.red],
              ].map((row) => (
                <div key={row[0]} className="mb-2.5 flex items-center justify-between gap-2">
                  <span className="w-9 text-[12px] font-bold" style={{ color: row[3] === COLORS.red ? COLORS.text : COLORS.textMuted }}>{row[0]}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
                    <div className="h-full rounded-full" style={{ width: row[1], background: row[3] }}></div>
                  </div>
                  <span className="w-10 text-right text-[13px] font-extrabold" style={{ color: row[3] }}>{row[2]}</span>
                  <span className="w-10 text-right text-[11px] font-bold" style={{ color: row[5] }}>{row[4]}</span>
                </div>
              ))}
              <div className="mt-3 border-t pt-3" style={{ borderTopColor: COLORS.borderSoft }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="w-9 text-[12px] font-bold" style={{ color: COLORS.teal }}>After</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
                    <div className="h-full rounded-full" style={{ width: '32%', background: COLORS.teal }}></div>
                  </div>
                  <span className="w-10 text-right text-[13px] font-extrabold" style={{ color: COLORS.teal }}>16.1%</span>
                  <span className="w-10 text-right text-[11px] font-bold" style={{ color: COLORS.teal }}>-13.4</span>
                </div>
                <div className="mt-1 text-[11px] italic" style={{ color: COLORS.textMuted }}>Projected rate after all strategies applied</div>
              </div>
            </div>
          </div>

          <div className="mb-4 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="border-b px-5 py-3 text-[13px] font-bold" style={{ borderBottomColor: COLORS.borderSoft, color: COLORS.text }}>Key findings</div>
            {[
              [COLORS.red, 'Tax bill has grown 43% over 3 years while income grew only 30% - the gap is closing in the wrong direction.'],
              [COLORS.red, 'Zero retirement contributions in any of the 3 years - the single largest missed opportunity at ~$50K/year.'],
              ['#B8860B', 'Standard deduction was taken all 3 years with no attempt to itemize or layer above-the-line deductions.'],
              ['#B8860B', 'Business entity is still a sole proprietorship despite 3 years of $500K+ net income - significant SE tax exposure.'],
              [COLORS.teal, 'Client is highly receptive to strategy recommendations based on questionnaire responses. Engagement risk is low.'],
            ].map((row) => (
              <div key={row[1]} className="flex items-start gap-2.5 border-b px-5 py-3 last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft }}>
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full" style={{ background: row[0] }}></span>
                <div className="text-[12.5px] leading-[1.4]" style={{ color: COLORS.textSec }}>{row[1]}</div>
              </div>
            ))}
          </div>

          <button className="w-full rounded-[10px] px-4 py-3 text-[13px] font-bold text-white" style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.25),0 1px 3px rgba(198,61,47,.15)' }}>
            Start proposal using this diagnostic
          </button>
        </div>
      </div>
    </div>
  );
}

function TaxPlanPanel() {
  const [income, setIncome] = useState(682000);
  const [dbp, setDbp] = useState(100000);
  const [salary, setSalary] = useState(72000);

  function fmt(n) {
    return `$${Math.round(n).toLocaleString('en-US')}`;
  }

  function calcScenario() {
    const augusta = 14000;
    const qbi = (income - salary) * 0.2 * 0.24;
    const hsa = 1572;
    const taxableIncome = income - salary - dbp - augusta - 14600;
    let tax = 0;

    if (taxableIncome > 578125) tax = 174238 + (taxableIncome - 578125) * 0.37;
    else if (taxableIncome > 231250) tax = 52832 + (taxableIncome - 231250) * 0.35;
    else if (taxableIncome > 182951) tax = 37104 + (taxableIncome - 182951) * 0.32;
    else if (taxableIncome > 95375) tax = 16290 + (taxableIncome - 95375) * 0.24;
    else if (taxableIncome > 44725) tax = 5147 + (taxableIncome - 44725) * 0.22;
    else if (taxableIncome > 11000) tax = 1100 + (taxableIncome - 11000) * 0.12;
    else tax = taxableIncome * 0.1;

    const se = salary * 0.0765;
    const total = Math.max(0, tax + se - qbi - hsa);
    const baseline = 200772;
    const saving = baseline - total;
    return { total, saving };
  }

  const scenario = calcScenario();

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col items-start justify-between gap-4 rounded-[18px] border px-5 py-4 sm:flex-row sm:items-center sm:px-6" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-extrabold text-white" style={{ background: '#1A7A4A' }}>JC</div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-[17px] font-bold tracking-tight" style={{ color: COLORS.text }}>Jordan Crawford</div>
              <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: '#E8F5EE', color: '#1A7A4A' }}>T3 · Advisor</span>
              <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: COLORS.tealTint, color: COLORS.tealDeep }}>FFS 68 · Building</span>
              <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: '#E8F5EE', color: '#1A7A4A' }}>Plan active · Q1 2024</span>
            </div>
            <div className="mt-1 text-[12px]" style={{ color: COLORS.textSec }}>2024 tax year · Plan started Jan 15, 2024 · 3 strategies in execution · Next check-in Apr 22</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select className="rounded-[10px] border px-3 py-1.5 text-[12.5px] outline-none" style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.card }}>
            <option>Jordan Crawford</option>
            <option>Sandra Kim</option>
            <option>Carol Williams</option>
            <option>Priya Sharma</option>
          </select>
          <select className="rounded-[10px] border px-3 py-1.5 text-[12.5px] outline-none" style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.card }}>
            <option>2024 plan</option>
            <option>2023 plan</option>
            <option>2022 plan</option>
          </select>
        </div>
      </div>

      <div className="mb-4 overflow-hidden rounded-[18px]" style={{ background: COLORS.navy }}>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
          <div className="px-6 py-5 text-center">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-white/40">Before plan</div>
            <div className="mt-1 text-4xl font-extrabold tracking-tight" style={{ color: '#FF6B6B' }}>$200,772</div>
            <div className="mt-1 text-[12px] text-white/45">Original tax liability</div>
          </div>
          <div className="flex items-center justify-center px-2 text-white/30">→</div>
          <div className="px-6 py-5 text-center">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-white/40">Savings delivered so far</div>
            <div className="mt-1 text-4xl font-extrabold tracking-tight" style={{ color: '#5ECFCA' }}>$29,000</div>
            <div className="mt-1 text-[12px] text-white/45">S-Corp + Augusta Rule done</div>
          </div>
          <div className="flex items-center justify-center px-2 text-white/30">→</div>
          <div className="px-6 py-5 text-center">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-white/40">Projected year-end</div>
            <div className="mt-1 text-4xl font-extrabold tracking-tight text-white">$122,200</div>
            <div className="mt-1 text-[12px] text-white/45">If all strategies execute</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3.5" style={{ background: 'rgba(0,0,0,.2)' }}>
          <div className="text-center">
            <div className="text-[18px] font-extrabold text-white">37%</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">Plan progress</div>
          </div>
          <div className="h-9 w-px" style={{ background: 'rgba(255,255,255,.1)' }}></div>
          <div className="mx-1 min-w-45 flex-1">
            <div className="mb-1 flex justify-between text-[11px] text-white/45">
              <span>2 of 5 strategies complete</span>
              <span>Dec 31 deadline</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,.12)' }}>
              <div className="h-full rounded-full" style={{ width: '37%', background: 'linear-gradient(90deg,#5ECFCA,#2F7D79)' }}></div>
            </div>
          </div>
          <div className="h-9 w-px" style={{ background: 'rgba(255,255,255,.1)' }}></div>
          <div className="text-center">
            <div className="text-[18px] font-extrabold text-white">$78,572</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">Total opportunity</div>
          </div>
          <div className="h-9 w-px" style={{ background: 'rgba(255,255,255,.1)' }}></div>
          <div className="text-center">
            <div className="text-[18px] font-extrabold text-white">$49,572</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">Still to capture</div>
          </div>
          <div className="h-9 w-px" style={{ background: 'rgba(255,255,255,.1)' }}></div>
          <div className="text-center">
            <div className="text-[18px] font-extrabold text-white">260</div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">Days remaining</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_320px]">
        <div>
          <div className="mb-4 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3" style={{ borderBottomColor: COLORS.borderSoft }}>
              <div className="text-[14px] font-bold" style={{ color: COLORS.text }}>Strategy execution tracker</div>
              <div className="flex items-center gap-2">
                <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: '#E8F5EE', color: '#1A7A4A' }}>2 complete</span>
                <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: '#FEF9EE', color: '#7a5a00' }}>1 in progress</span>
                <span className="rounded-lg border px-2 py-0.5 text-[10px] font-extrabold" style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.textMuted }}>2 not started</span>
                <button className="rounded-[10px] border px-2.5 py-1 text-[11.5px] font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.card }}>+ Add strategy</button>
              </div>
            </div>

            {[
              ['complete', 'S-Corp election (Form 2553)', 'Filed with IRS Jan 28, 2024. Election approved Mar 3. Reasonable salary of $72,000/yr established. SE tax reduction in effect.', '$15,000', 'Complete'],
              ['complete', 'Augusta Rule rental - 14 days (280A)', 'Home rental agreement drafted and signed. 14 rental days scheduled across Q1-Q2. Documentation package complete and filed.', '$14,000', 'Complete'],
              ['progress', 'Defined benefit pension plan setup', 'Third-party administrator engaged. Actuarial calculation underway. Plan document expected Apr 30. First contribution due by Oct 15.', '$50,000', 'In progress'],
              ['pending', 'QBI deduction (199A) - up to 20% of net income', 'Needs entity structure confirmation post S-Corp election. Will be captured on 2024 return when filed. No action needed until tax prep.', '$8,000', 'Not started'],
              ['alert', 'HSA account - max contribution $4,150', 'Client has HDHP-eligible plan but HSA not yet opened. Can contribute up to $4,150 for 2024 before April 15, 2025.', '$1,572', 'Needs action'],
            ].map((row, idx) => {
              const statusStyle = row[0] === 'complete'
                ? { dotBg: '#1A7A4A', tagBg: '#E8F5EE', tagColor: '#1A7A4A', amtColor: '#1A7A4A' }
                : row[0] === 'progress'
                  ? { dotBg: '#B8860B', tagBg: '#FEF9EE', tagColor: '#7a5a00', amtColor: '#B8860B' }
                  : row[0] === 'alert'
                    ? { dotBg: COLORS.border, tagBg: COLORS.redTint, tagColor: COLORS.red, amtColor: COLORS.textMuted }
                    : { dotBg: COLORS.border, tagBg: COLORS.bg, tagColor: COLORS.textMuted, amtColor: COLORS.textMuted };

              return (
                <div key={row[1]} className="flex items-start gap-3 border-b px-5 py-4 last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft, background: idx === 2 ? '#FFFDF5' : 'transparent' }}>
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: statusStyle.dotBg }}>
                    {row[0] === 'complete' ? <Check size={13} color="#fff" strokeWidth={3} /> : row[0] === 'progress' ? <Circle size={12} color="#fff" strokeWidth={2.5} /> : <Circle size={12} color={COLORS.textMuted} strokeWidth={2.5} />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-bold" style={{ color: COLORS.text }}>{row[1]}</div>
                    <div className="mt-0.5 text-[12px] leading-[1.4]" style={{ color: COLORS.textSec }}>{row[2]}</div>
                    <div className="mt-1 text-[11px]" style={{ color: row[0] === 'progress' ? '#7a5a00' : row[0] === 'alert' ? COLORS.red : COLORS.textMuted }}>
                      {row[0] === 'progress' ? 'Due Oct 15, 2024 · Admin: Pinnacle TPA · In progress' : row[0] === 'alert' ? 'Action needed — open account' : row[0] === 'pending' ? 'Captured at filing · No action needed until Dec' : 'Completed and documented'}
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="text-[13px] font-bold" style={{ color: statusStyle.amtColor }}>{row[3]}</span>
                    <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: statusStyle.tagBg, color: statusStyle.tagColor }}>{row[4]}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b px-5 py-3" style={{ borderBottomColor: COLORS.borderSoft }}>
              <div className="text-[14px] font-bold" style={{ color: COLORS.text }}>Scenario modeler</div>
              <span className="text-[12px]" style={{ color: COLORS.textSec }}>Adjust inputs to model different outcomes</span>
            </div>
            <div className="p-5">
              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[12.5px] font-semibold" style={{ color: COLORS.text }}>Projected year-end income</span>
                  <span className="text-[13px] font-extrabold" style={{ color: COLORS.text }}>{fmt(income)}</span>
                </div>
                <input type="range" min="400000" max="900000" value={income} step="10000" onChange={(e) => setIncome(Number(e.target.value))} className="w-full accent-[#2F7D79]" />
                <div className="mt-1 flex justify-between text-[10px]" style={{ color: COLORS.textMuted }}><span>$400K</span><span>$900K</span></div>
              </div>

              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[12.5px] font-semibold" style={{ color: COLORS.text }}>DBP contribution amount</span>
                  <span className="text-[13px] font-extrabold" style={{ color: COLORS.text }}>{fmt(dbp)}</span>
                </div>
                <input type="range" min="0" max="150000" value={dbp} step="5000" onChange={(e) => setDbp(Number(e.target.value))} className="w-full accent-[#2F7D79]" />
                <div className="mt-1 flex justify-between text-[10px]" style={{ color: COLORS.textMuted }}><span>$0</span><span>$150K max</span></div>
              </div>

              <div className="mb-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[12.5px] font-semibold" style={{ color: COLORS.text }}>S-Corp salary (reasonable comp)</span>
                  <span className="text-[13px] font-extrabold" style={{ color: COLORS.text }}>{fmt(salary)}</span>
                </div>
                <input type="range" min="50000" max="150000" value={salary} step="2000" onChange={(e) => setSalary(Number(e.target.value))} className="w-full accent-[#2F7D79]" />
                <div className="mt-1 flex justify-between text-[10px]" style={{ color: COLORS.textMuted }}><span>$50K</span><span>$150K</span></div>
              </div>

              <div className="rounded-[14px] px-5 py-4 text-center" style={{ background: COLORS.navy }}>
                <div className="text-[11px] font-bold uppercase tracking-wider text-white/45">Projected year-end tax liability</div>
                <div className="mt-1 text-[28px] font-extrabold tracking-tight" style={{ color: '#5ECFCA' }}>{fmt(scenario.total)}</div>
                <div className="mt-1 text-[12px] text-white/45">Saving {fmt(scenario.saving)} vs. $200,772 baseline</div>
              </div>

              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => { setIncome(682000); setDbp(100000); setSalary(72000); }}
                  className="flex-1 rounded-[10px] border px-3 py-2 text-[12px] font-bold"
                  style={{ background: COLORS.card, borderColor: COLORS.border, color: COLORS.textSec }}
                >
                  Reset
                </button>
                <button className="flex-1 rounded-[10px] px-3 py-2 text-[12px] font-bold text-white" style={{ background: '#1A7A4A' }}>
                  Apply to plan
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="border-b px-5 py-3 text-[13px] font-bold" style={{ borderBottomColor: COLORS.borderSoft, color: COLORS.text }}>Quarterly milestones</div>
            {[
              ['Q1 · Jan - Mar 2024', 'Entity + Augusta setup', 'S-Corp filed · Augusta docs signed · Plan onboarding call done', '#1A7A4A', 'Done', '#E8F5EE', '#1A7A4A'],
              ['Q2 · Apr - Jun 2024', 'DBP document + HSA open', 'Actuarial report due Apr 30 · HSA account to open · Estimated tax payment Q2', '#B8860B', 'Active', '#FEF9EE', '#7a5a00'],
              ['Q3 · Jul - Sep 2024', 'Mid-year review + catch-up', 'Income reconciliation · Strategy adjustment if needed · Q3 estimated tax', COLORS.border, 'Pending', COLORS.bg, COLORS.textMuted],
              ['Q4 · Oct - Dec 2024', 'DBP contribution · Final tax prep', 'DBP contribution by Oct 15 · QBI confirmed · Year-end close', COLORS.border, 'Pending', COLORS.bg, COLORS.textMuted],
            ].map((row, idx) => (
              <div key={row[0]} className="flex items-start gap-3 border-b px-5 py-3 last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft }}>
                <div className="mt-1 h-3 w-3 shrink-0 rounded-full" style={{ background: row[3] }}></div>
                <div className="flex-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: COLORS.textMuted }}>{row[0]}</div>
                  <div className="mt-0.5 text-[12.5px] font-bold" style={{ color: COLORS.text }}>{row[1]}</div>
                  <div className="text-[11.5px]" style={{ color: COLORS.textSec }}>{row[2]}</div>
                </div>
                <span className="shrink-0 rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: row[5], color: row[6] }}>{row[4]}</span>
              </div>
            ))}
          </div>

          <div className="mb-4 flex gap-3 rounded-[14px] border px-4 py-3.5" style={{ background: COLORS.tealTint, borderColor: 'rgba(47,125,121,.22)' }}>
            <div className="mt-0.5 flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-lg" style={{ background: COLORS.teal }}>
              <Circle size={14} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-[13px] font-bold" style={{ color: COLORS.tealDeep }}>HSA still needs action.</div>
              <div className="mt-1 text-[12.5px]" style={{ color: COLORS.tealDeep }}>Jordan's HSA account hasn't been opened. This is a simple 20-minute setup that unlocks a triple tax benefit. Bring it up on today's 1 PM call.</div>
            </div>
          </div>

          <div className="mb-4 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="border-b px-5 py-3 text-[13px] font-bold" style={{ borderBottomColor: COLORS.borderSoft, color: COLORS.text }}>Year-end tax projection</div>
            <div className="px-5 py-4">
              {[
                ['Gross income (projected)', '$682,110', COLORS.text],
                ['S-Corp salary (W-2)', '($72,000)', '#1A7A4A'],
                ['DBP contribution', '($100,000)', '#1A7A4A'],
                ['Augusta rental income', '($14,000)', '#1A7A4A'],
                ['QBI deduction (199A)', '($8,000)', '#1A7A4A'],
                ['HSA contribution', '($4,150) pending', COLORS.textMuted],
              ].map((row, idx) => (
                <div key={row[0]} className="flex justify-between border-b py-2 text-[12.5px]" style={{ borderBottomColor: idx === 5 ? 'transparent' : COLORS.borderSoft }}>
                  <span style={{ color: COLORS.textSec }}>{row[0]}</span>
                  <span className="font-semibold" style={{ color: row[2] }}>{row[1]}</span>
                </div>
              ))}
              <div className="flex justify-between py-2 text-[15px] font-bold" style={{ color: COLORS.text }}>
                <span>Projected net tax owed</span>
                <span style={{ color: COLORS.teal }}>$122,200</span>
              </div>
              <div className="mt-1 rounded-[10px] px-3.5 py-2.5 text-[12px]" style={{ background: COLORS.tealTint, color: COLORS.tealDeep }}>
                Effective rate drops from <strong>29.5%</strong> to <strong>16.1%</strong> when all strategies execute.
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderBottomColor: COLORS.borderSoft }}>
              <div className="text-[13px] font-bold" style={{ color: COLORS.text }}>Plan notes</div>
              <button className="rounded-[10px] border px-2.5 py-1 text-[11.5px] font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.card }}>+ Add note</button>
            </div>
            {[
              ['Apr 15, 2026 · Yvonne', 'Confirmed S-Corp salary at $72K with Jordan on Q1 call. He was surprised at the SE tax savings and wants to discuss increasing DBP contribution to $120K. Revisit on today\'s call.'],
              ['Mar 3, 2026 · Yvonne', 'IRS confirmed S-Corp election approved. Pinnacle TPA engagement letter signed. DBP plan document expected Apr 30 — follow up if not received by May 5.'],
              ['Feb 14, 2026 · Yvonne', 'Augusta rental agreement completed for 14 days. Dates documented across Q1 and Q2. Rental rate set at fair market value per Zillow comparable.'],
            ].map((row) => (
              <div key={row[0]} className="border-b px-5 py-3 last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft }}>
                <div className="mb-0.5 text-[10px] font-bold" style={{ color: COLORS.textMuted }}>{row[0]}</div>
                <div className="text-[12.5px] leading-normal" style={{ color: COLORS.textSec }}>{row[1]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FFSPanel() {
  const [openPillarId, setOpenPillarId] = useState('ret');
  const [pillars, setPillars] = useState([
    {
      id: 'ret',
      name: 'Retirement optimization',
      color: '#2C5F7F',
      max: 25,
      criteria: [
        { id: 'r1', label: 'Has active retirement account', note: '401k, IRA, SEP-IRA, SIMPLE, or similar', pts: 6, status: 'none' },
        { id: 'r2', label: 'Maximizing contributions', note: 'Contributing at or near IRS annual maximum', pts: 9, status: 'partial' },
        { id: 'r3', label: 'Catch-up contributions (age 50+)', note: 'Additional contribution available', pts: 5, status: 'na' },
        { id: 'r4', label: 'Roth vs. Traditional strategy', note: 'Allocation based on expected future bracket', pts: 5, status: 'none' },
      ],
    },
    {
      id: 'inc',
      name: 'Income structuring',
      color: '#5B4A8B',
      max: 25,
      criteria: [
        { id: 'i1', label: 'Business entity optimized', note: 'Most tax-efficient entity type for income level', pts: 8, status: 'complete' },
        { id: 'i2', label: 'S-Corp reasonable salary established', note: 'Documented comp, payroll running', pts: 7, status: 'complete' },
        { id: 'i3', label: 'QBI deduction captured (199A)', note: 'Up to 20% of qualified business income deducted', pts: 5, status: 'partial' },
        { id: 'i4', label: 'Withholding & estimated payments', note: 'Not significantly over- or under-withholding', pts: 5, status: 'partial' },
      ],
    },
    {
      id: 'ded',
      name: 'Deduction capture',
      color: '#B8860B',
      max: 20,
      criteria: [
        { id: 'd1', label: 'Itemized vs. standard optimized', note: 'Use method that lowers taxable income more', pts: 7, status: 'partial' },
        { id: 'd2', label: 'HSA fully utilized', note: 'Contributing up to IRS annual limit', pts: 6, status: 'none' },
        { id: 'd3', label: 'Childcare & dependent credits', note: 'Eligible credits applied', pts: 4, status: 'complete' },
        { id: 'd4', label: 'Above-the-line deductions', note: 'SE health insurance, student loan interest, etc.', pts: 3, status: 'partial' },
      ],
    },
    {
      id: 'inv',
      name: 'Investment & capital strategy',
      color: '#3E6B4F',
      max: 15,
      criteria: [
        { id: 'v1', label: 'Tax-loss harvesting strategy', note: 'Offset gains with losses where eligible', pts: 6, status: 'na' },
        { id: 'v2', label: 'Capital gains timing', note: 'Timing sales to favor long-term rates', pts: 5, status: 'na' },
        { id: 'v3', label: 'Crypto reporting & strategy', note: 'Properly reported and optimized', pts: 4, status: 'na' },
      ],
    },
    {
      id: 'comp',
      name: 'Filing accuracy & compliance',
      color: COLORS.teal,
      max: 15,
      criteria: [
        { id: 'c1', label: 'Filed on time, no extensions needed', note: 'Consistent timely filing history', pts: 4, status: 'complete' },
        { id: 'c2', label: 'No unresolved IRS notices', note: 'No open correspondence, audits, or payment plans', pts: 6, status: 'complete' },
        { id: 'c3', label: 'All years filed, no gaps', note: 'Returns filed for all required years', pts: 5, status: 'complete' },
      ],
    },
  ]);

  function scorePct(pct) {
    if (pct >= 75) return COLORS.green;
    if (pct >= 50) return COLORS.gold;
    return COLORS.red;
  }

  const scoring = useMemo(() => {
    let total = 0;
    const category = [];
    const gaps = [];

    for (const pillar of pillars) {
      let earned = 0;
      let possible = 0;

      for (const criterion of pillar.criteria) {
        if (criterion.status === 'na') continue;
        possible += criterion.pts;
        const factor = criterion.status === 'complete' ? 1 : criterion.status === 'partial' ? 0.5 : 0;
        earned += criterion.pts * factor;
        if (criterion.status !== 'complete') {
          gaps.push({
            label: criterion.label,
            gain: criterion.pts - criterion.pts * factor,
          });
        }
      }

      const normalized = possible > 0 ? (earned / possible) * pillar.max : pillar.max;
      total += normalized;
      category.push({
        id: pillar.id,
        name: pillar.name,
        color: pillar.color,
        allNA: possible === 0,
        pct: possible > 0 ? Math.round((earned / possible) * 100) : 100,
      });
    }

    const score = Math.min(100, Math.round(total));
    gaps.sort((a, b) => b.gain - a.gain);
    return { score, category, recs: gaps.slice(0, 3) };
  }, [pillars]);

  function gradeInfo(score) {
    if (score >= 90) return { label: 'FREEDOM', subtitle: 'Tax Elite - Freedom', color: '#5ECFCA' };
    if (score >= 75) return { label: 'OPTIMIZED', subtitle: 'Optimized - Grade B+', color: '#5ECFCA' };
    if (score >= 55) return { label: 'BUILDING', subtitle: 'Building - Grade C', color: '#5ECFCA' };
    if (score >= 40) return { label: 'AT RISK', subtitle: 'At Risk - Grade D', color: '#E8A020' };
    if (score >= 20) return { label: 'CRITICAL', subtitle: 'Critical - Grade F+', color: '#FF6B6B' };
    return { label: 'STARTING', subtitle: 'Just Starting - Grade F', color: '#FF6B6B' };
  }

  const grade = gradeInfo(scoring.score);

  function setCriterionStatus(pillarId, criterionId, status) {
    setPillars((current) =>
      current.map((pillar) => {
        if (pillar.id !== pillarId) return pillar;
        return {
          ...pillar,
          criteria: pillar.criteria.map((criterion) =>
            criterion.id === criterionId ? { ...criterion, status } : criterion,
          ),
        };
      }),
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col items-start justify-between gap-4 rounded-[18px] border px-5 py-4 sm:flex-row sm:items-center sm:px-6" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
        <div className="flex items-center gap-3.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-extrabold text-white" style={{ background: '#1A7A4A' }}>JC</div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-[17px] font-bold tracking-tight" style={{ color: COLORS.text }}>Jordan Crawford</div>
              <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: '#E8F5EE', color: '#1A7A4A' }}>T3 · Advisor</span>
              <span className="rounded-lg px-2 py-0.5 text-[10px] font-extrabold" style={{ background: COLORS.tealTint, color: COLORS.tealDeep }}>Active subscriber</span>
            </div>
            <div className="mt-1 text-[12px]" style={{ color: COLORS.textSec }}>Single · Houston, TX · 2024 tax year · Plan started Jan 15, 2024</div>
          </div>
        </div>
        <div className="text-[12px]" style={{ color: COLORS.textMuted }}>Last scored: Apr 1, 2026 by Yvonne</div>
      </div>

      <div className="mb-4 flex flex-col gap-5 rounded-[18px] px-6 py-5 md:flex-row md:items-center" style={{ background: COLORS.navy }}>
        <div className="min-w-25 text-center">
          <div className="text-[60px] font-extrabold leading-none tracking-tight" style={{ color: grade.color }}>{scoring.score}</div>
          <div className="mt-1 text-[11px] font-extrabold uppercase tracking-widest" style={{ color: grade.color }}>{grade.subtitle}</div>
        </div>

        <div className="flex-1">
          <div className="mb-1 text-[16px] font-bold text-white">{grade.label === 'BUILDING' ? 'Building toward Financial Freedom' : 'Financial Freedom Score Status'}</div>
          <div className="mb-3 text-[13px] leading-normal text-white/55">2 of 5 strategies complete. S-Corp done, Augusta Rule done. Defined benefit in progress. HSA still needs to be opened - easiest win remaining.</div>
          <div className="mb-1 h-2 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,.12)' }}>
            <div className="h-full rounded-full" style={{ width: `${scoring.score}%`, background: 'linear-gradient(90deg,#5ECFCA,#2F7D79)' }}></div>
          </div>
          <div className="flex justify-between text-[11px] text-white/35">
            <span>0</span>
            <span>{scoring.score} / 100</span>
            <span>100</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          <button className="inline-flex items-center justify-center gap-1.5 rounded-[10px] px-4 py-2 text-[12px] font-bold text-white" style={{ background: '#1A7A4A' }}>
            <Send size={12} />
            Push to client
          </button>
          <button className="rounded-[10px] border px-4 py-2 text-[12px] font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.card }}>
            View client page
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
        <div>
          {pillars.map((pillar) => {
            const possible = pillar.criteria.filter((c) => c.status !== 'na').reduce((sum, c) => sum + c.pts, 0);
            const earned = pillar.criteria.reduce((sum, c) => {
              if (c.status === 'na') return sum;
              if (c.status === 'complete') return sum + c.pts;
              if (c.status === 'partial') return sum + c.pts * 0.5;
              return sum;
            }, 0);
            const pct = possible > 0 ? Math.round((earned / possible) * 100) : 100;
            const isOpen = openPillarId === pillar.id;

            return (
              <div key={pillar.id} className="mb-3 overflow-hidden rounded-[18px] border last:mb-0" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
                <button
                  onClick={() => setOpenPillarId((current) => (current === pillar.id ? '' : pillar.id))}
                  className="flex w-full items-center justify-between px-5 py-3 text-left"
                  style={{ background: COLORS.card }}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: pillar.color }}></span>
                    <span className="text-[14px] font-bold tracking-tight" style={{ color: COLORS.text }}>{pillar.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-1.25 w-20 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: scorePct(pct) }}></div>
                    </div>
                    <span className="w-9 text-right text-[14px] font-extrabold" style={{ color: scorePct(pct) }}>{possible > 0 ? `${pct}%` : 'N/A'}</span>
                    <span className="text-[11px]" style={{ color: COLORS.textMuted }}>{pillar.max} pts</span>
                    <ArrowRight size={15} color={COLORS.textMuted} style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform .2s' }} />
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t px-5 pb-3" style={{ borderTopColor: COLORS.borderSoft }}>
                    {pillar.criteria.map((criterion) => (
                      <div key={criterion.id} className="flex items-center justify-between gap-3 border-b py-2.5 last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft }}>
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] font-bold" style={{ color: COLORS.text }}>{criterion.label}</div>
                          <div className="mt-0.5 text-[11.5px] leading-[1.4]" style={{ color: COLORS.textMuted }}>{criterion.note}</div>
                        </div>
                        <span className="w-9 shrink-0 text-right text-[11px]" style={{ color: COLORS.textMuted }}>{criterion.pts} pts</span>
                        <div className="flex shrink-0 gap-1">
                          {[
                            ['complete', 'Complete'],
                            ['partial', 'Partial'],
                            ['none', 'None'],
                            ['na', 'N/A'],
                          ].map(([value, label]) => {
                            const active = criterion.status === value;
                            const variant = value === 'complete'
                              ? { bg: '#E8F5EE', color: '#1A7A4A', border: 'rgba(26,122,74,.3)' }
                              : value === 'partial'
                                ? { bg: '#FEF9EE', color: '#7a5a00', border: 'rgba(184,134,11,.3)' }
                                : value === 'none'
                                  ? { bg: COLORS.redTint, color: COLORS.red, border: 'rgba(198,61,47,.25)' }
                                  : { bg: COLORS.bg, color: COLORS.textMuted, border: COLORS.border };
                            return (
                              <button
                                key={value}
                                onClick={() => setCriterionStatus(pillar.id, criterion.id, value)}
                                className="rounded-[7px] border px-2 py-1 text-[10px] font-bold"
                                style={{
                                  background: active ? variant.bg : COLORS.bg,
                                  color: active ? variant.color : COLORS.textMuted,
                                  borderColor: active ? variant.border : COLORS.border,
                                  opacity: value === 'na' ? 0.8 : 1,
                                }}
                              >
                                {label}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div>
          <div className="mb-3 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="border-b px-4.5 py-3 text-[13px] font-bold" style={{ borderBottomColor: COLORS.borderSoft, color: COLORS.text }}>Top 3 improvement opportunities</div>
            {scoring.recs.map((rec, i) => (
              <div key={rec.label} className="flex items-start gap-2.5 border-b px-4.5 py-2.5 last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft }}>
                <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-extrabold text-white" style={{ background: COLORS.red }}>{i + 1}</div>
                <div>
                  <div className="text-[12.5px] font-bold" style={{ color: COLORS.text }}>{rec.label}</div>
                  <div className="mt-0.5 text-[12px] font-bold" style={{ color: COLORS.teal }}>+{Math.round(rec.gain)} pts available</div>
                </div>
              </div>
            ))}
            <div className="mx-4.5 mb-4 mt-3 rounded-[10px] border px-3.5 py-2.5 text-[12px] leading-[1.45]" style={{ background: COLORS.tealTint, borderColor: 'rgba(47,125,121,.2)', color: COLORS.tealDeep }}>
              Completing these items could move this client's score from <strong>{scoring.score} → {Math.min(100, scoring.score + scoring.recs.reduce((sum, item) => sum + Math.round(item.gain), 0))}</strong>.
            </div>
          </div>

          <div className="mb-3 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="border-b px-4.5 py-3 text-[13px] font-bold" style={{ borderBottomColor: COLORS.borderSoft, color: COLORS.text }}>Score by category</div>
            {scoring.category.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b px-4.5 py-2.5 last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft }}>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ background: item.color }}></span>
                  <span className="text-[12.5px]" style={{ color: COLORS.textSec }}>{item.name}</span>
                </div>
                <div className="mx-2 h-1 w-15 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
                  <div className="h-full rounded-full" style={{ width: `${item.allNA ? 100 : item.pct}%`, background: item.allNA ? COLORS.textMuted : scorePct(item.pct) }}></div>
                </div>
                <span className="w-8 text-right text-[12px] font-extrabold" style={{ color: item.allNA ? COLORS.textMuted : scorePct(item.pct) }}>{item.allNA ? 'N/A' : `${item.pct}%`}</span>
              </div>
            ))}
          </div>

          <div className="mb-3 overflow-hidden rounded-[18px] border" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="border-b px-4.5 py-3 text-[13px] font-bold" style={{ borderBottomColor: COLORS.borderSoft, color: COLORS.text }}>Score history</div>
            {[
              ['Jan 2024 · onboarding', 41, COLORS.red],
              ['Mar 2024 · 30-day', 58, COLORS.gold],
              ['Apr 2024 · current', scoring.score, scoring.score >= 75 ? COLORS.teal : scoring.score >= 55 ? COLORS.gold : COLORS.red],
            ].map((row, idx) => (
              <div key={row[0]} className="flex items-center justify-between border-b px-4.5 py-2.5 last:border-b-0" style={{ borderBottomColor: COLORS.borderSoft }}>
                <span className="text-[12px] font-bold" style={{ color: idx === 2 ? COLORS.text : COLORS.textMuted }}>{row[0]}</span>
                <div className="mx-2 h-1 w-15 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
                  <div className="h-full rounded-full" style={{ width: `${row[1]}%`, background: row[2] }}></div>
                </div>
                <span className="w-7 text-right text-[13px] font-extrabold" style={{ color: row[2] }}>{row[1]}</span>
              </div>
            ))}
            <div className="px-4.5 py-2.5 text-[12px]" style={{ color: COLORS.textSec }}>↑ <strong>+{scoring.score - 41} points</strong> since onboarding</div>
          </div>

          <button className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] px-4 py-3 text-[13px] font-bold text-white" style={{ background: '#1A7A4A' }}>
            <Send size={13} />
            Save score + push to client dashboard
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ClientWorkspaceScreen({ client, onBackToPipeline }) {
  const [activeTab, setActiveTab] = useState('overview');

  const currentClient = useMemo(() => {
    if (client) {
      return {
        ...client,
        stage: normalizeStage(client.stage),
      };
    }

    return {
      name: 'Jordan Crawford',
      initials: 'JC',
      tier: 'T3',
      stage: 'Proposal Sent',
      status: 'Proposal delivery call today',
      score: 68,
      avatarColor: '#1A7A4A',
      meta: 'Opened 2× · Meeting Today 1PM',
      days: '3d',
      actionTone: 'ok',
    };
  }, [client]);

  return (
    <div className="flex h-full min-h-0 flex-col" style={{ background: COLORS.bg }}>
      <TopHeader
        client={currentClient}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBackToPipeline={onBackToPipeline}
      />

      <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
        {activeTab === 'overview' && <OverviewPanel client={currentClient} />}
        {activeTab === 'proposals' && (
          <div className="w-full">
            <ProposalBuilderView />
          </div>
        )}
        {activeTab === 'diagnostics' && <DiagnosticsPanel />}
        {activeTab === 'taxplan' && <TaxPlanPanel />}
        {activeTab === 'ffsscoring' && <FFSPanel />}
      </div>
    </div>
  );
}
