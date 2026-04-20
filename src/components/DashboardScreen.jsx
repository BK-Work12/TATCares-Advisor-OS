import React, { useState } from 'react';
import { COLORS, cardShadow } from './tatcaresShared';

const plum = '#5B4A8B';
const navy = COLORS.navy;   // #1B3A5C
const teal = COLORS.teal;   // #2F7D79
const red = COLORS.red;     // #C63D2F
const gold = COLORS.gold;   // #B8860B
const green = COLORS.green; // #1A7A4A

/* ── Greeting ─────────────────────────────────────────── */
const Greeting = () => (
  <div className="mb-5 sm:mb-5.5">
    <div className="mb-1 text-[20px] font-extrabold text-[#1B3A5C] sm:text-[22px]" style={{ fontFamily: 'Poppins, sans-serif' }}>
      Good morning, Angela
    </div>
    <div className="text-[12px] text-[#667085] sm:text-[13px]">
      Wednesday, April 15, 2026 &middot; 5 open tasks &middot; 3 meetings today
    </div>
  </div>
);

/* ── KPI Stat Card ────────────────────────────────────── */
const StatCard = ({ label, value, barColor, barPct, sub }) => (
  <div className="rounded-[14px] border border-[#E7E3DD] bg-white p-[16px_16px] sm:p-[18px_20px]" style={{ boxShadow: cardShadow }}>
    <div className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#98A2B3] mb-1.5">
      {label}
    </div>
    <div className="mb-2.5 text-[24px] font-extrabold leading-none sm:text-[28px]" style={{ color: barColor }}>
      {value}
    </div>
    <div className="h-1.25 rounded-full bg-[#E7E3DD] overflow-hidden mb-1.5">
      <div className="h-full rounded-full" style={{ width: `${barPct}%`, background: barColor }} />
    </div>
    <div className="text-[11px] text-[#98A2B3]">{sub}</div>
  </div>
);

/* ── Alert Banner ─────────────────────────────────────── */
const AlertBanner = ({ tone, text, actionLabel }) => {
  const isRed = tone === 'red';
  const bg = isRed ? '#FDEBE8' : '#FEF9EE';
  const borderColor = isRed ? red : gold;
  const iconColor = isRed ? red : gold;
  const textColor = isRed ? '#7B1D13' : '#5a3e00';
  return (
    <div className="mb-2.5 flex flex-col items-start gap-2 rounded-[10px] border-[1.5px] p-[12px_14px] sm:flex-row sm:gap-2.5 sm:p-[12px_16px]" style={{ background: bg, borderColor }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-px">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div className="flex-1 text-[13px] leading-[1.45]" style={{ color: textColor }}>{text}</div>
      {actionLabel && (
        <button className="cursor-pointer border-none bg-transparent pl-0 text-[11px] font-bold sm:shrink-0 sm:whitespace-nowrap sm:pl-2" style={{ color: iconColor }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

/* ── Task Row ─────────────────────────────────────────── */
const TaskRow = ({ label, priority, due, initialDone = false, note, onToggle }) => {
  const [done, setDone] = useState(initialDone);
  const priorityColor = priority === 'High' ? red : priority === 'Medium' ? gold : '#98A2B3';
  const priorityBg = priority === 'High' ? '#FDEBE8' : priority === 'Medium' ? '#FEF9EE' : '#E7E3DD';
  const toggle = () => {
    setDone(prev => !prev);
    onToggle?.();
  };
  return (
    <div className="flex items-start gap-2.5 border-b border-[#F0ECE5] px-4 py-2.5 sm:px-5">
      <button
        onClick={toggle}
        className="w-4 h-4 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center cursor-pointer bg-transparent p-0"
        style={{ borderColor: done ? green : '#E7E3DD', background: done ? green : 'transparent' }}
        aria-label={done ? 'Mark incomplete' : 'Mark complete'}
      >
        {done && (
          <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="2,6 5,9 10,3" />
          </svg>
        )}
      </button>
      <div className="flex-1 min-w-0">
        <div className={`text-[13px] leading-[1.4] ${done ? 'line-through text-[#98A2B3]' : 'text-[#1F2937]'}`}>
          {label}
        </div>
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          {priority && !done && (
            <span className="text-[10px] font-bold px-1.75 py-0.5 rounded-full" style={{ color: priorityColor, background: priorityBg }}>
              {priority}
            </span>
          )}
          {due && <span className="text-[11px] text-[#98A2B3]">{due}</span>}
          {note && <span className="text-[11px] font-bold text-[#C63D2F]">{note}</span>}
        </div>
      </div>
    </div>
  );
};

/* ── Pipeline Stage Group ─────────────────────────────── */
const PipelineStage = ({ stageName, count, stageColor, clients }) => (
  <div className="border-b border-[#F0ECE5] px-4 py-2.5 sm:px-5">
    <div className="flex items-center gap-2 mb-1.5">
      <div className="w-2 h-2 rounded-full shrink-0" style={{ background: stageColor }} />
      <div className="text-[12px] font-bold text-[#667085] flex-1">{stageName}</div>
      <span className="text-[11px] font-extrabold px-2 py-px rounded-full" style={{ color: stageColor, background: `${stageColor}22` }}>{count}</span>
    </div>
    {clients.map((c, i) => (
      <div key={i} className="mb-1 flex items-center gap-2 pl-3.5 sm:pl-4">
        <div className="text-[12px] text-[#1F2937] flex-1">{c.name}</div>
        <span className="text-[10px] font-bold px-1.75 py-0.5 rounded-full" style={{ color: c.tagColor, background: `${c.tagColor}18` }}>{c.tag}</span>
      </div>
    ))}
  </div>
);

/* ── Meeting Row ──────────────────────────────────────── */
const MeetingRow = ({ time, name, detail, dotColor, actionLabel, actionColor }) => (
  <div className="flex flex-col items-start gap-2 border-b border-[#F0ECE5] px-4 py-2.5 sm:flex-row sm:items-center sm:gap-3 sm:px-5">
    <div className="w-2 h-2 rounded-full shrink-0" style={{ background: dotColor }} />
    <div className="flex-1 min-w-0">
      <div className="text-[12px] font-bold text-[#98A2B3] mb-0.5">{time}</div>
      <div className="text-[13px] font-bold text-[#1F2937]">{name}</div>
      <div className="text-[12px] text-[#667085]">{detail}</div>
    </div>
    {actionLabel && (
      <button
        className="cursor-pointer rounded-lg border px-3 py-1.25 text-[11px] font-bold sm:shrink-0"
        style={{ color: actionColor || teal, background: `${actionColor || teal}15`, borderColor: `${actionColor || teal}40` }}
      >
        {actionLabel}
      </button>
    )}
  </div>
);

/* ── Access Row ───────────────────────────────────────── */
const AccessRow = ({ label, allowed }) => (
  <div className="flex items-start justify-between gap-2 border-b border-[#F0ECE5] py-1.75">
    <span className={`text-[12px] leading-[1.35] ${allowed ? 'text-[#1F2937]' : 'text-[#98A2B3]'}`}>{label}</span>
    {allowed ? (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20,6 9,17 4,12" />
      </svg>
    ) : (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    )}
  </div>
);

/* ── Card Shell ───────────────────────────────────────── */
const Card = ({ title, actionLabel, onAction, children }) => (
  <div className="mb-4 overflow-hidden rounded-2xl border border-[#E7E3DD] bg-white" style={{ boxShadow: cardShadow }}>
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0ECE5] px-4 py-3.5 sm:px-5">
      <div className="text-[13px] font-bold text-[#1F2937]">{title}</div>
      {actionLabel && (
        <button onClick={onAction} className="text-[11px] font-bold text-[#2F7D79] bg-transparent border-none cursor-pointer">
          {actionLabel}
        </button>
      )}
    </div>
    {children}
  </div>
);

/* ── Main Dashboard ───────────────────────────────────── */
const INITIAL_TASKS = [
  { id: 1, label: 'Send Sandra Kim meeting confirmation + Zoom link', priority: 'High', due: 'Due Today', done: false },
  { id: 2, label: 'Send Ashley qualification link to Brian Wallace', priority: 'High', due: 'Due Today', note: '6 days overdue', done: false },
  { id: 3, label: 'Review 3 Advisor reassignment requests', priority: 'Medium', due: 'Due Apr 17', done: false },
  { id: 4, label: 'Follow up Tina Brooks — consult not booked', priority: 'Medium', due: 'Due Apr 17', done: false },
  { id: 5, label: 'Send 1040 upload reminder to Sandra Kim', priority: 'Medium', due: 'Due Apr 18', done: false },
  { id: 6, label: 'Add notes from Marcus Johnson discovery call', priority: null, due: 'Completed · Apr 14', done: true },
];

export default function DashboardScreen({ onScreenChange }) {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTaskLabel, setNewTaskLabel] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskDue, setNewTaskDue] = useState('');

  const toggleTask = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const addTask = () => {
    if (!newTaskLabel.trim()) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), label: newTaskLabel.trim(), priority: newTaskPriority, due: newTaskDue || 'No due date', done: false },
    ]);
    setNewTaskLabel('');
    setNewTaskDue('');
    setNewTaskPriority('Medium');
    setShowAddForm(false);
  };

  return (
    <div className="px-4 py-5 sm:px-5 sm:py-6 lg:px-7">
      <Greeting />

      {/* KPI Stat Cards */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3.5 xl:grid-cols-4">
        <StatCard label="Total Clients" value="24" barColor={navy} barPct={80} sub="Active managed clients" />
        <StatCard label="Meetings Today" value="3" barColor={teal} barPct={100} sub="All sessions confirmed" />
        <StatCard label="Reassignment Requests" value="3" barColor={gold} barPct={30} sub="Pending your review" />
        <StatCard label="Urgent Actions" value="2" barColor={red} barPct={25} sub="Require immediate attention" />
      </div>

      {/* Alert Banners */}
      <div className="mb-5">
        <AlertBanner tone="red" text={<><strong>Brian Wallace</strong> — Qualification link never sent. Lead is 2+ days old.</>} actionLabel="Take Action" />
        <AlertBanner tone="gold" text={<><strong>Tina Brooks</strong> — Consultation not booked after 3 days.</>} actionLabel="Follow Up" />
        <AlertBanner tone="gold" text={<><strong>3 Advisor reassignment requests</strong> pending your review.</>} actionLabel="Review" />
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 items-start gap-4 xl:grid-cols-2">

        {/* Left Column */}
        <div>
          <Card title="My Tasks" actionLabel="+ Add" onAction={() => setShowAddForm(v => !v)}>
            {tasks.map(t => (
              <TaskRow
                key={t.id}
                label={t.label}
                priority={t.priority}
                due={t.due}
                note={t.note}
                initialDone={t.done}
                onToggle={() => toggleTask(t.id)}
              />
            ))}
            {showAddForm && (
              <div className="flex flex-col gap-2 border-b border-[#F0ECE5] px-4 py-3 sm:px-5">
                <input
                  autoFocus
                  className="w-full text-[13px] border border-[#E7E3DD] rounded-lg px-3 py-2 outline-none focus:border-[#2F7D79]"
                  placeholder="Task description…"
                  value={newTaskLabel}
                  onChange={e => setNewTaskLabel(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && addTask()}
                />
                <div className="flex flex-col gap-2 sm:flex-row">
                  <select
                    className="cursor-pointer rounded-lg border border-[#E7E3DD] px-2 py-1.5 text-[11px] font-bold outline-none sm:w-auto"
                    value={newTaskPriority}
                    onChange={e => setNewTaskPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <input
                    className="flex-1 rounded-lg border border-[#E7E3DD] px-2 py-1.5 text-[11px] outline-none focus:border-[#2F7D79]"
                    placeholder="Due date (e.g. Due Today)"
                    value={newTaskDue}
                    onChange={e => setNewTaskDue(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addTask()}
                  />
                </div>
                <div className="flex flex-col justify-end gap-2 sm:flex-row">
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="cursor-pointer rounded-lg border border-[#E7E3DD] bg-transparent px-3 py-1.5 text-[11px] font-bold text-[#98A2B3]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addTask}
                    className="cursor-pointer rounded-lg border-none px-3 py-1.5 text-[11px] font-bold text-white"
                    style={{ background: teal }}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            )}
          </Card>

          <Card
            title="Pipeline — My Stages (1–3)"
            actionLabel="View All →"
            onAction={() => onScreenChange?.('pipeline')}
          >
            <PipelineStage
              stageName="New Leads"
              count={3}
              stageColor={navy}
              clients={[
                { name: 'Marcus Johnson', tag: 'Ashley Pending', tagColor: gold },
                { name: 'Brian Wallace', tag: 'Urgent', tagColor: red },
              ]}
            />
            <PipelineStage
              stageName="Ashley Qualified"
              count={2}
              stageColor={teal}
              clients={[
                { name: 'Tina Brooks', tag: 'Follow Up', tagColor: gold },
                { name: 'Kevin Marsh', tag: 'Booked', tagColor: green },
              ]}
            />
            <PipelineStage
              stageName="Intake In Progress"
              count={3}
              stageColor={plum}
              clients={[
                { name: 'Sandra Kim', tag: '1040 Missing', tagColor: red },
                { name: 'Lisa Nguyen', tag: 'Churn Risk', tagColor: red },
              ]}
            />
          </Card>
        </div>

        {/* Right Column */}
        <div>
          <Card
            title="Today's Meetings"
            actionLabel="View All →"
            onAction={() => onScreenChange?.('meetings')}
          >
            <MeetingRow time="10:00 AM" name="Sandra Kim" detail="30-min discovery · Zoom" dotColor={teal} actionLabel="Join" actionColor={teal} />
            <MeetingRow time="1:00 PM" name="Tina Brooks" detail="Consultation follow-up" dotColor={plum} actionLabel="Prep" actionColor={plum} />
            <MeetingRow time="3:30 PM" name="Marcus Johnson" detail="Discovery call · Zoom" dotColor={gold} actionLabel="Prep" actionColor={gold} />
          </Card>

          <Card title="My Access Level">
            <div className="p-[14px_16px] sm:p-[14px_20px]">
              <span
                className="inline-block text-[11px] font-bold rounded-full px-3 py-0.75 mb-3.5 border"
                style={{ color: teal, background: `${teal}18`, borderColor: `${teal}40` }}
              >
                RM &middot; Full Access
              </span>

              <div className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#98A2B3] mb-1">
                Client Management
              </div>
              <AccessRow label="View & manage all assigned clients" allowed />
              <AccessRow label="Add / remove clients from pipeline" allowed />
              <AccessRow label="Update client profiles & contact info" allowed />

              <div className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#98A2B3] mt-3 mb-1">
                Documents, Intake & Billing
              </div>
              <AccessRow label="Upload & access client documents" allowed />
              <AccessRow label="Manage intake & qualification steps" allowed />
              <AccessRow label="View billing history & payment status" allowed />

              <div className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#98A2B3] mt-3 mb-1">
                Reporting & Messaging
              </div>
              <AccessRow label="Send emails & notifications" allowed />
              <AccessRow label="View client-facing reports" allowed />

              <div className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#98A2B3] mt-3 mb-1">
                Restricted — Advisor Only
              </div>
              <AccessRow label="Edit Freedom Score methodology" allowed={false} />
              <AccessRow label="Manage advisor accounts & roles" allowed={false} />
              <AccessRow label="Access billing & subscription settings" allowed={false} />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
