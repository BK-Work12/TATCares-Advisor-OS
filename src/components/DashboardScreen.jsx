import React from 'react';
import {
  ArrowRight,
  DollarSign,
  Eye,
  FileText,
  Plus,
  RefreshCw,
  UserPlus,
  Users,
  Video,
} from 'lucide-react';
import { COLORS, cardShadow } from './tatcaresShared';

const GreetingBanner = () => (
  <div className="mb-5 flex flex-col gap-5 rounded-[18px] px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-7 lg:py-6" style={{ background: COLORS.navy }}>
    <div className="min-w-0">
      <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-white/45 mb-1.5">
        Wednesday, April 15, 2026 · Tax deadline day
      </div>
      <div className="text-[26px] font-extrabold tracking-[-0.03em] text-white leading-tight">Good morning, Yvonne.</div>
      <div className="text-[13px] text-white/55 mt-1">You have 3 consultations today and 2 proposals waiting for review.</div>
    </div>
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4 lg:flex lg:gap-5">
      {[
        { n: '$1.2M', l: 'Client savings YTD', h: true },
        { n: '24', l: 'Active clients' },
        { n: '91%', l: 'Renewal rate' },
      ].map((s) => (
        <div key={s.l} className="min-w-0 rounded-xl px-4 py-3.5 text-center sm:min-w-27.5 sm:px-5" style={{ background: 'rgba(255,255,255,.08)' }}>
          <div className="text-2xl font-extrabold tracking-[-0.03em] leading-none" style={{ color: s.h ? '#5ECFCA' : '#fff' }}>
            {s.n}
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.04em] text-white/45 mt-1">{s.l}</div>
        </div>
      ))}
    </div>
  </div>
);

const KPICard = ({ label, value, delta, tone, icon: Icon }) => {
  const toneMap = {
    teal: { bg: COLORS.tealTint, stroke: COLORS.teal },
    red: { bg: COLORS.redTint, stroke: COLORS.red },
    green: { bg: '#E8F5EE', stroke: COLORS.green },
    gold: { bg: '#FEF9EE', stroke: COLORS.gold },
  };
  const deltaClass = tone === 'green' ? COLORS.green : tone === 'red' ? COLORS.red : COLORS.textMuted;

  return (
    <div className="flex items-start justify-between gap-3 rounded-[14px] border px-4 py-4 sm:px-5" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: COLORS.textMuted }}>
          {label}
        </div>
        <div className="text-[26px] font-extrabold tracking-[-0.03em] leading-none" style={{ color: COLORS.text }}>
          {value}
        </div>
        <div className="text-[11px] font-semibold mt-1" style={{ color: deltaClass }}>
          {delta}
        </div>
      </div>
      <div className="w-9 h-9 rounded-[10px] flex items-center justify-center" style={{ background: toneMap[tone].bg }}>
        <Icon size={16} strokeWidth={2} color={toneMap[tone].stroke} />
      </div>
    </div>
  );
};

const MeetingRow = ({ time, now, color, name, type, tag, tagClass }) => (
  <div className="flex flex-col gap-3 border-b px-4 py-3.5 sm:px-5 md:flex-row md:items-center md:gap-3.5" style={{ borderColor: COLORS.borderSoft }}>
    <div className="text-xs font-bold md:w-15.5 md:text-right" style={{ color: now ? COLORS.red : COLORS.textMuted }}>
      {time}
    </div>
    <div className="h-0.75 w-full rounded md:h-10 md:w-0.75" style={{ background: color }}></div>
    <div className="flex-1 min-w-0">
      <div className="text-[13px] font-bold" style={{ color: COLORS.text }}>{name}</div>
      <div className="text-[11.5px] mt-0.5" style={{ color: COLORS.textSec }}>
        {type}
        {tag && <span className={`ml-1.5 inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-lg ${tagClass}`}>{tag}</span>}
      </div>
    </div>
    <div className="flex gap-1.5 md:self-center">
      {[Video, FileText].map((Icon, idx) => (
        <button key={idx} className="w-7 h-7 rounded-lg border flex items-center justify-center" style={{ background: COLORS.bg, borderColor: COLORS.border }}>
          <Icon size={13} color={COLORS.textMuted} />
        </button>
      ))}
    </div>
  </div>
);

const AlertRow = ({ dot, name, tag, tagClass, message, time }) => (
  <div className="flex flex-col gap-2 border-b px-4 py-3.5 sm:px-5 md:flex-row md:items-start md:gap-3" style={{ borderColor: COLORS.borderSoft }}>
    <div className="flex items-start gap-3 md:flex-1">
    <div className="w-2 h-2 rounded-full mt-1.5" style={{ background: dot }}></div>
    <div className="min-w-0 flex-1">
      <div className="text-[13px] font-bold" style={{ color: COLORS.text }}>
        {name}
        <span className={`ml-1.5 inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-lg ${tagClass}`}>{tag}</span>
      </div>
      <div className="text-xs mt-0.5 leading-[1.4]" style={{ color: COLORS.textSec }}>{message}</div>
    </div>
    </div>
    <div className="text-[11px] md:mt-0.5 md:shrink-0" style={{ color: COLORS.textMuted }}>{time}</div>
  </div>
);

const ScoreRow = ({ initials, avatar, name, tier, score, bar, tag, tagClass }) => (
  <div className="flex flex-col gap-3 border-b px-4 py-3 sm:px-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: COLORS.borderSoft }}>
    <div className="flex items-center gap-2.5">
      <div className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: avatar }}>{initials}</div>
      <div>
        <div className="text-[13px] font-semibold" style={{ color: COLORS.text }}>{name}</div>
        <div className="text-[10px]" style={{ color: COLORS.textMuted }}>{tier}</div>
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-2 md:justify-end">
      <div className="h-1 w-18 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
        <div className="h-full rounded-full" style={{ width: `${score}%`, background: bar }}></div>
      </div>
      <div className="w-6 text-right text-sm font-extrabold" style={{ color: bar }}>{score}</div>
      <span className={`inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-lg ${tagClass}`}>{tag}</span>
    </div>
  </div>
);

const StageRow = ({ dot, name, count, width, strong }) => (
  <div className="flex flex-col gap-2 border-b px-4 py-2.5 sm:px-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: COLORS.borderSoft }}>
    <div className="flex items-center gap-2.5">
      <div className="w-2 h-2 rounded-full" style={{ background: dot }}></div>
      <div className="text-[13px]" style={{ color: name === 'Lead captured' ? COLORS.textMuted : COLORS.text }}>{name}</div>
    </div>
    <div className="flex items-center gap-2.5 md:justify-end">
      <div className="h-1 w-15 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
        <div className="h-full rounded-full" style={{ width: `${width}%`, background: dot }}></div>
      </div>
      <div className="text-[15px] font-extrabold" style={{ color: strong ? COLORS.green : COLORS.text }}>{count}</div>
    </div>
  </div>
);

const ActivityRow = ({ initials, bg, text, time }) => (
  <div className="flex flex-col gap-2 border-b px-4 py-3 sm:px-5 md:flex-row md:items-start md:gap-3" style={{ borderColor: COLORS.borderSoft }}>
    <div className="flex items-start gap-3 md:flex-1">
    <div className="w-7 h-7 rounded-full text-[10px] font-bold text-white flex items-center justify-center" style={{ background: bg }}>{initials}</div>
    <div className="flex-1 text-[12.5px] leading-[1.4]" style={{ color: COLORS.textSec }}>{text}</div>
    </div>
    <div className="text-[11px] md:mt-0.5 md:shrink-0" style={{ color: COLORS.textMuted }}>{time}</div>
  </div>
);

export default function DashboardScreen() {
  return (
    <div className="px-4 pb-6 pt-4 sm:px-5 sm:pb-8 sm:pt-5 lg:px-7 lg:pt-6">
      <GreetingBanner />

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 2xl:grid-cols-4">
        <KPICard label="Active TATCares clients" value="24" delta="↑ 3 from last quarter" tone="green" icon={Users} />
        <KPICard label="Open proposals" value="7" delta="2 awaiting your review" tone="red" icon={ArrowRight} />
        <KPICard label="Revenue this quarter" value="$41.2K" delta="↑ 18% vs last quarter" tone="green" icon={DollarSign} />
        <KPICard label="Renewals due this month" value="6" delta="3 high, 2 medium risk" tone="gold" icon={RefreshCw} />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <div className="rounded-[18px] border overflow-hidden mb-4" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex flex-col gap-2 border-b px-4 py-3.5 sm:px-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: COLORS.borderSoft }}>
              <div className="text-sm font-bold" style={{ color: COLORS.text }}>Today's consultations</div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-lg" style={{ background: COLORS.redTint, color: COLORS.red }}>3 today</span>
                <button className="text-[11px] font-bold rounded-[10px] px-3 py-1.5 border" style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.card }}>View all meetings</button>
              </div>
            </div>
            <MeetingRow time="9:00 AM" now color={COLORS.red} name="Sandra Kim" type="Q1 Strategy review · TATCares T2 · FFS 52" tag="At risk" tagClass="bg-[#FEF9EE] text-[#7a5a00]" />
            <MeetingRow time="1:00 PM" color={COLORS.teal} name="Jordan Crawford" type="Proposal delivery · TATCares T3 · FFS 68" tag="Building" tagClass="bg-[#E8F3F1] text-[#1F5E5B]" />
            <MeetingRow time="3:30 PM" color="#5B4A8B" name="Marcus Johnson" type="New client intake · Discovery call" />
          </div>

          <div className="rounded-[18px] border overflow-hidden mb-4" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex flex-col gap-2 border-b px-4 py-3.5 sm:px-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: COLORS.borderSoft }}>
              <div className="text-sm font-bold" style={{ color: COLORS.text }}>Clients needing attention</div>
              <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-lg" style={{ background: COLORS.redTint, color: COLORS.red }}>5 alerts</span>
            </div>
            <AlertRow dot={COLORS.red} name="Derek Wilson" tag="Renewal overdue" tagClass="bg-[#FDEBE8] text-[#C63D2F]" message="Q1 renewal was due Apr 1 — no payment received. At risk of churn. Last contact was 18 days ago." time="18d ago" />
            <AlertRow dot={COLORS.red} name="Priya Sharma" tag="FFS dropped" tagClass="bg-[#FEF9EE] text-[#7a5a00]" message="Score dropped from 71 to 54 after updated income data. Strategy review needed before next check-in." time="2d ago" />
            <AlertRow dot={COLORS.gold} name="Robert Chen" tag="Renewal in 7 days" tagClass="bg-[#FEF9EE] text-[#7a5a00]" message="Q2 renewal due Apr 22. No strategy updates since onboarding. Consider scheduling a progress call." time="Apr 22" />
            <AlertRow dot={COLORS.gold} name="Lisa Nguyen" tag="No contact 30d" tagClass="bg-[#FEF9EE] text-[#7a5a00]" message="No advisor touchpoint in 30 days. Questionnaire completed but proposal not yet started." time="30d ago" />
            <AlertRow dot={COLORS.teal} name="James Park" tag="Proposal ready" tagClass="bg-[#E8F3F1] text-[#1F5E5B]" message="Proposal for 2024 is built and ready. Client hasn't opened it yet — consider a follow-up." time="3d ago" />
          </div>

          <div className="rounded-[18px] border overflow-hidden" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex flex-col gap-2 border-b px-4 py-3.5 sm:px-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: COLORS.borderSoft }}>
              <div className="text-sm font-bold" style={{ color: COLORS.text }}>Client Freedom Scores</div>
              <button className="text-xs font-bold" style={{ color: COLORS.tealDeep }}>Score all clients →</button>
            </div>
            <ScoreRow initials="JC" avatar="#1A7A4A" name="Jordan Crawford" tier="T3 · Advisor" score={68} bar="#2F7D79" tag="Building" tagClass="bg-[#E8F3F1] text-[#1F5E5B]" />
            <ScoreRow initials="SK" avatar="#B8860B" name="Sandra Kim" tier="T2 · Planner" score={52} bar="#B8860B" tag="At risk" tagClass="bg-[#FEF9EE] text-[#7a5a00]" />
            <ScoreRow initials="PS" avatar="#2F7D79" name="Priya Sharma" tier="T2 · Planner" score={54} bar="#B8860B" tag="At risk" tagClass="bg-[#FEF9EE] text-[#7a5a00]" />
            <ScoreRow initials="RC" avatar="#5B4A8B" name="Robert Chen" tier="T1 · Starter" score={79} bar="#2F7D79" tag="Optimized" tagClass="bg-[#E8F3F1] text-[#1F5E5B]" />
            <ScoreRow initials="LN" avatar="#2C5F7F" name="Lisa Nguyen" tier="T2 · Planner" score={38} bar="#C63D2F" tag="Critical" tagClass="bg-[#FDEBE8] text-[#C63D2F]" />
          </div>
        </div>

        <div>
          <div className="rounded-[18px] border overflow-hidden mb-4" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex flex-col gap-2 border-b px-4 py-3.5 sm:px-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: COLORS.borderSoft }}>
              <div className="text-sm font-bold" style={{ color: COLORS.text }}>Pipeline snapshot</div>
              <button className="text-xs font-bold" style={{ color: COLORS.tealDeep }}>Full board →</button>
            </div>
            <StageRow dot="#98A2B3" name="Lead captured" count="8" width={100} />
            <StageRow dot="#B8860B" name="Questionnaire sent" count="5" width={62} />
            <StageRow dot="#2F7D79" name="Intake complete" count="3" width={37} />
            <StageRow dot="#C63D2F" name="Proposal in review" count="2" width={25} />
            <StageRow dot="#5B4A8B" name="Plan delivered" count="3" width={37} />
            <StageRow dot="#1A7A4A" name="Active subscriber" count="24" width={100} strong />
          </div>

          <div className="rounded-[18px] border overflow-hidden mb-4" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="flex flex-col gap-2 border-b px-4 py-3.5 sm:px-5 md:flex-row md:items-center md:justify-between" style={{ borderColor: COLORS.borderSoft }}>
              <div className="text-sm font-bold" style={{ color: COLORS.text }}>Recent activity</div>
              <button className="text-xs font-bold" style={{ color: COLORS.tealDeep }}>View all →</button>
            </div>
            <ActivityRow initials="JC" bg="#1A7A4A" text={<><strong style={{ color: COLORS.text }}>Jordan Crawford</strong> opened the 2024 proposal. Viewed for 4 minutes.</>} time="12m ago" />
            <ActivityRow initials="SK" bg="#2F7D79" text={<><strong style={{ color: COLORS.text }}>Sandra Kim</strong> completed the strategy questionnaire. FFS score pending.</>} time="1h ago" />
            <ActivityRow initials="MJ" bg="#5B4A8B" text={<><strong style={{ color: COLORS.text }}>Marcus Johnson</strong> booked a discovery call for today at 3:30 PM.</>} time="3h ago" />
            <ActivityRow initials="PS" bg="#B8860B" text={<><strong style={{ color: COLORS.text }}>Priya Sharma</strong>'s income data updated. FFS score dropped from 71 → 54.</>} time="2d ago" />
            <ActivityRow initials="DW" bg="#C63D2F" text={<><strong style={{ color: COLORS.text }}>Derek Wilson</strong> missed Q1 renewal. Payment not received as of Apr 1.</>} time="14d ago" />
          </div>

          <div className="rounded-[18px] border overflow-hidden" style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}>
            <div className="border-b px-4 py-3.5 sm:px-5" style={{ borderColor: COLORS.borderSoft }}>
              <div className="text-sm font-bold" style={{ color: COLORS.text }}>Quick actions</div>
            </div>
            <div className="p-4 flex flex-col gap-2">
              <button className="w-full rounded-[10px] px-4 py-2.5 text-white text-xs font-bold flex items-center justify-center gap-2" style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.25),0 1px 3px rgba(198,61,47,.15)' }}>
                <Plus size={13} strokeWidth={2.5} />
                Start new proposal
              </button>
              <button className="w-full rounded-[10px] px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 border" style={{ background: COLORS.card, borderColor: COLORS.border, color: COLORS.textSec }}>
                <Eye size={13} />
                Score a client (FFS)
              </button>
              <button className="w-full rounded-[10px] px-4 py-2.5 text-xs font-bold flex items-center justify-center gap-2 border" style={{ background: COLORS.card, borderColor: COLORS.border, color: COLORS.textSec }}>
                <UserPlus size={13} />
                Add new client
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}