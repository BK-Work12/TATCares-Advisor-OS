import React, { useMemo, useState } from 'react';
import { COLORS, cardShadow } from './tatcaresShared';

const ADVISOR_COLORS = {
	'Yvonne Hollis-Cobb': COLORS.teal,
	'David Reyes': '#5B4A8B',
	'Priya Shankar': '#B8860B',
	'Angela (RM)': COLORS.red,
};

const TYPE_COLORS = {
	'Discovery Call': { bg: '#EEF3FC', color: '#2C5F7F' },
	Consultation: { bg: '#F3EFFA', color: '#5B4A8B' },
	'30-Day Check-In': { bg: COLORS.tealTint, color: COLORS.tealDeep },
	'Renewal Call': { bg: '#E8F5EE', color: COLORS.green },
	'Follow-Up': { bg: '#FEF9EE', color: '#7A5A00' },
	'Ashley Intake': { bg: '#F3EFFF', color: '#6B3FA0' },
};

const INITIAL_MEETINGS = [
	{
		id: 1,
		date: '2026-04-15',
		time: '10:00 AM',
		duration: '30 min',
		client: 'Sandra Kim',
		advisor: 'Yvonne Hollis-Cobb',
		location: 'Katy',
		type: '30-Day Check-In',
		format: 'Zoom',
		status: 'today',
		tier: 'T2',
		ffs: 41,
		notes: 'Follow up on 1040 upload. She mentioned previous accountant has 2023 return.',
		talking: [
			'Ask if she reached her previous accountant about the 2023 1040.',
			'Confirm upload timeline so Yvonne can complete the FFS.',
			'Set expectation that FFS will be ready within 48 hours of upload.',
		],
		checklist: ['Send Zoom link confirmation email', 'Review intake questionnaire progress', 'Open Sandra Kim profile'],
	},
	{
		id: 2,
		date: '2026-04-15',
		time: '1:00 PM',
		duration: '30 min',
		client: 'Tina Brooks',
		advisor: 'Yvonne Hollis-Cobb',
		location: 'Katy',
		type: 'Follow-Up',
		format: 'Phone',
		status: 'today',
		tier: 'T2',
		ffs: 0,
		notes: 'Tina asked to move to next week due to schedule.',
		talking: ['Acknowledge schedule constraints and make rebooking easy.', 'Offer two concrete next-week windows.'],
		checklist: ['Have calendar open', 'Keep the call under 10 minutes'],
	},
	{
		id: 3,
		date: '2026-04-15',
		time: '3:30 PM',
		duration: '30 min',
		client: 'Marcus Johnson',
		advisor: 'Yvonne Hollis-Cobb',
		location: 'Katy',
		type: 'Discovery Call',
		format: 'Zoom',
		status: 'today',
		tier: 'T2',
		ffs: 0,
		notes: 'Referred by Jordan Crawford. High S-Corp interest.',
		talking: ['Confirm current entity structure.', 'Explain TATCares onboarding flow.', 'Set intake expectations.'],
		checklist: ['Send reminder 30 min before', 'Prepare qualifier context'],
	},
	{
		id: 4,
		date: '2026-04-17',
		time: '11:00 AM',
		duration: '30 min',
		client: 'Tina Brooks',
		advisor: 'Yvonne Hollis-Cobb',
		location: 'Katy',
		type: 'Consultation',
		format: 'Zoom',
		status: 'upcoming',
		tier: 'T2',
		ffs: 0,
		notes: 'Rescheduled consultation.',
		talking: ['Set consultation outcome expectations.', 'Confirm she reviewed prior summary.'],
		checklist: ['Resend invite and Zoom link'],
	},
	{
		id: 5,
		date: '2026-04-18',
		time: '10:00 AM',
		duration: '60 min',
		client: 'Kevin Marsh',
		advisor: 'David Reyes',
		location: 'Downtown Houston',
		type: 'Consultation',
		format: 'Zoom',
		status: 'upcoming',
		tier: 'T1',
		ffs: 0,
		notes: 'First consultation after Ashley qualification.',
		talking: ['Walk through onboarding scope.', 'Confirm baseline tax profile.'],
		checklist: ['Share prep with David Reyes'],
	},
	{
		id: 6,
		date: '2026-04-18',
		time: '2:00 PM',
		duration: '30 min',
		client: 'Priya Sharma',
		advisor: 'Priya Shankar',
		location: 'Katy',
		type: 'Consultation',
		format: 'Zoom',
		status: 'upcoming',
		tier: 'T2',
		ffs: 54,
		notes: 'Go/No-Go review consultation.',
		talking: ['Review FFS pre-assessment 54.', 'Discuss S-Corp opportunity.'],
		checklist: ['Prepare subscription timeline'],
	},
	{
		id: 7,
		date: '2026-04-20',
		time: '9:00 AM',
		duration: '30 min',
		client: 'Melissa Grant',
		advisor: 'Priya Shankar',
		location: 'Katy',
		type: 'Renewal Call',
		format: 'Phone',
		status: 'upcoming',
		tier: 'T1',
		ffs: 72,
		notes: 'Q2 renewal call.',
		talking: ['Share Q1 wins and FFS change.', 'Align on Q2 priorities.'],
		checklist: ['Prepare renewal summary'],
	},
	{
		id: 8,
		date: '2026-04-22',
		time: '11:00 AM',
		duration: '30 min',
		client: 'Lisa Nguyen',
		advisor: 'David Reyes',
		location: 'Downtown Houston',
		type: '30-Day Check-In',
		format: 'Zoom',
		status: 'upcoming',
		tier: 'T2',
		ffs: 22,
		notes: 'High churn risk check-in.',
		talking: ['Lead with empathy.', 'Offer intake support during call.'],
		checklist: ['Send personal reminder email'],
	},
	{
		id: 9,
		date: '2026-04-24',
		time: '10:00 AM',
		duration: '45 min',
		client: 'Derek Wilson',
		advisor: 'Yvonne Hollis-Cobb',
		location: 'Katy',
		type: 'Renewal Call',
		format: 'Zoom',
		status: 'upcoming',
		tier: 'T2',
		ffs: 58,
		notes: 'Final save attempt before cancellation review.',
		talking: ['Address objections directly.', 'Use progress recap to retain.'],
		checklist: ['Prepare payment link'],
	},
	{
		id: 10,
		date: '2026-04-28',
		time: '2:00 PM',
		duration: '30 min',
		client: 'Brian Wallace',
		advisor: 'David Reyes',
		location: 'Downtown Houston',
		type: 'Ashley Intake',
		format: 'Zoom',
		status: 'upcoming',
		tier: 'T3',
		ffs: 0,
		notes: 'Qualified lead intake call.',
		talking: ['Confirm intake details and timeline.'],
		checklist: ['Brief advisor with context'],
	},
	{
		id: 11,
		date: '2026-04-14',
		time: '3:00 PM',
		duration: '30 min',
		client: 'Marcus Johnson',
		advisor: 'Yvonne Hollis-Cobb',
		location: 'Katy',
		type: 'Discovery Call',
		format: 'Zoom',
		status: 'past',
		tier: 'T2',
		ffs: 0,
		notes: 'Qualified and moved to intake.',
		talking: [],
		checklist: [],
	},
	{
		id: 12,
		date: '2026-04-13',
		time: '11:00 AM',
		duration: '60 min',
		client: 'Kevin Marsh',
		advisor: 'David Reyes',
		location: 'Downtown Houston',
		type: 'Ashley Intake',
		format: 'Phone',
		status: 'past',
		tier: 'T1',
		ffs: 0,
		notes: 'Consultation booked.',
		talking: [],
		checklist: [],
	},
	{
		id: 13,
		date: '2026-04-12',
		time: '10:00 AM',
		duration: '30 min',
		client: 'Jordan Crawford',
		advisor: 'Yvonne Hollis-Cobb',
		location: 'Katy',
		type: '30-Day Check-In',
		format: 'Zoom',
		status: 'past',
		tier: 'T3',
		ffs: 68,
		notes: 'Progress reviewed, referral captured.',
		talking: [],
		checklist: [],
	},
	{
		id: 14,
		date: '2026-04-11',
		time: '2:00 PM',
		duration: '45 min',
		client: 'Melissa Grant',
		advisor: 'Priya Shankar',
		location: 'Katy',
		type: 'Consultation',
		format: 'Zoom',
		status: 'past',
		tier: 'T1',
		ffs: 61,
		notes: 'Q1 review completed.',
		talking: [],
		checklist: [],
	},
];

function statusLabel(status) {
	if (status === 'today') return 'Today';
	if (status === 'past') return 'Completed';
	return 'Scheduled';
}

function statusPillStyle(status) {
	if (status === 'today') return { bg: COLORS.tealTint, color: COLORS.tealDeep };
	if (status === 'past') return { bg: COLORS.bg, color: COLORS.textMuted, border: COLORS.border };
	return { bg: '#EEF3FC', color: '#2C5F7F' };
}

export default function MeetingsScreen() {
	const [meetings, setMeetings] = useState(INITIAL_MEETINGS);
	const [view, setView] = useState('list');
	const [search, setSearch] = useState('');
	const [filterAdvisor, setFilterAdvisor] = useState('');
	const [filterLocation, setFilterLocation] = useState('');
	const [filterType, setFilterType] = useState('');
	const [filterStatus, setFilterStatus] = useState('');
	const [activeMeetingId, setActiveMeetingId] = useState(null);
	const [isPrepPanelOpen, setIsPrepPanelOpen] = useState(false);
	const [calMonth, setCalMonth] = useState(3);
	const [calYear, setCalYear] = useState(2026);
	const [showSchedule, setShowSchedule] = useState(false);
	const [noteTab, setNoteTab] = useState('shared');
	const [draftNote, setDraftNote] = useState('');
	const [checklistState, setChecklistState] = useState({});
	const [scheduleForm, setScheduleForm] = useState({
		client: '',
		type: '',
		date: '2026-04-15',
		time: '10:00',
		duration: '30 min',
		format: 'Zoom',
		advisor: '',
		location: '',
		notes: '',
	});

	const advisorOptions = useMemo(
		() => Array.from(new Set(meetings.map((m) => m.advisor))).sort((a, b) => a.localeCompare(b)),
		[meetings]
	);
	const locationOptions = useMemo(
		() => Array.from(new Set(meetings.map((m) => m.location))).sort((a, b) => a.localeCompare(b)),
		[meetings]
	);
	const typeOptions = useMemo(() => Array.from(new Set(meetings.map((m) => m.type))), [meetings]);

	const filtered = useMemo(() => {
		const query = search.trim().toLowerCase();
		return meetings.filter((m) => {
			if (query && !(`${m.client} ${m.type}`.toLowerCase().includes(query))) return false;
			if (filterAdvisor && m.advisor !== filterAdvisor) return false;
			if (filterLocation && m.location !== filterLocation) return false;
			if (filterType && m.type !== filterType) return false;
			if (filterStatus && m.status !== filterStatus) return false;
			return true;
		});
	}, [meetings, search, filterAdvisor, filterLocation, filterType, filterStatus]);

	const grouped = useMemo(() => {
		const today = filtered.filter((m) => m.status === 'today');
		const upcoming = filtered.filter((m) => m.status === 'upcoming');
		const past = filtered.filter((m) => m.status === 'past');
		return [
			{ key: 'today', label: 'Today - April 15', color: COLORS.teal, items: today },
			{ key: 'upcoming', label: 'Upcoming', color: '#2C5F7F', items: upcoming },
			{ key: 'past', label: 'Past Meetings', color: COLORS.textMuted, items: past },
		].filter((g) => g.items.length > 0);
	}, [filtered]);

	const todayMeetings = useMemo(() => meetings.filter((m) => m.status === 'today'), [meetings]);
	const counts = useMemo(() => {
		const today = filtered.filter((m) => m.status === 'today').length;
		const upcoming = filtered.filter((m) => m.status === 'upcoming').length;
		return { today, upcoming };
	}, [filtered]);

	const activeMeeting = useMemo(() => {
		if (!activeMeetingId) return null;
		return meetings.find((m) => m.id === activeMeetingId) || null;
	}, [activeMeetingId, meetings]);

	const monthTitle = useMemo(() => {
		const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
		return `${names[calMonth]} ${calYear}`;
	}, [calMonth, calYear]);

	const calendarCells = useMemo(() => {
		const firstDay = new Date(calYear, calMonth, 1).getDay();
		const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
		const cells = [];
		for (let i = 0; i < 42; i += 1) {
			const dayNum = i - firstDay + 1;
			const inMonth = dayNum >= 1 && dayNum <= daysInMonth;
			const iso = inMonth
				? `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`
				: null;
			const events = inMonth ? meetings.filter((m) => m.date === iso) : [];
			cells.push({ inMonth, dayNum, iso, events });
		}
		return cells;
	}, [calMonth, calYear, meetings]);

	const isTodayMeeting = (meeting) => meeting.status === 'today';

	const openPrep = (meeting, noteView = 'shared') => {
		setActiveMeetingId(meeting.id);
		setNoteTab(noteView);
		setDraftNote(meeting.notes || '');
		setChecklistState({});
		setIsPrepPanelOpen(true);
	};

	const joinMeeting = (meeting) => {
		setActiveMeetingId(meeting.id);
		setIsPrepPanelOpen(true);
	};

	const toggleChecklist = (idx) => {
		setChecklistState((prev) => ({ ...prev, [idx]: !prev[idx] }));
	};

	const saveNotes = () => {
		if (!activeMeeting) return;
		setMeetings((prev) => prev.map((m) => (m.id === activeMeeting.id ? { ...m, notes: draftNote } : m)));
	};

	const closePrepPanel = () => {
		setIsPrepPanelOpen(false);
	};

	const submitSchedule = () => {
		if (!scheduleForm.client || !scheduleForm.type || !scheduleForm.date || !scheduleForm.time) return;
		const dateVal = new Date(scheduleForm.date);
		const today = new Date('2026-04-15');
		let status = 'upcoming';
		if (dateVal.toDateString() === today.toDateString()) status = 'today';
		if (dateVal < today) status = 'past';

		const [hh, mm] = scheduleForm.time.split(':').map(Number);
		const ampm = hh >= 12 ? 'PM' : 'AM';
		const hour12 = hh % 12 || 12;
		const displayTime = `${hour12}:${String(mm).padStart(2, '0')} ${ampm}`;

		const newMeeting = {
			id: Date.now(),
			date: scheduleForm.date,
			time: displayTime,
			duration: scheduleForm.duration,
			client: scheduleForm.client,
			advisor: scheduleForm.advisor || 'Angela (RM)',
			location: scheduleForm.location || 'Katy',
			type: scheduleForm.type,
			format: scheduleForm.format,
			status,
			tier: 'T1',
			ffs: 0,
			notes: scheduleForm.notes,
			talking: [],
			checklist: [],
		};

		setMeetings((prev) => [newMeeting, ...prev]);
		setShowSchedule(false);
		setScheduleForm({
			client: '',
			type: '',
			date: '2026-04-15',
			time: '10:00',
			duration: '30 min',
			format: 'Zoom',
			advisor: '',
			location: '',
			notes: '',
		});
	};

	const moveCal = (step) => {
		setCalMonth((prevMonth) => {
			const next = prevMonth + step;
			if (next < 0) {
				setCalYear((y) => y - 1);
				return 11;
			}
			if (next > 11) {
				setCalYear((y) => y + 1);
				return 0;
			}
			return next;
		});
	};

	const jumpTodayCal = () => {
		setCalMonth(3);
		setCalYear(2026);
	};

	return (
		<div className="flex min-h-full flex-col xl:h-full">
			<div className="flex min-h-0 flex-1 flex-col overflow-visible xl:flex-row xl:overflow-hidden" style={{ background: COLORS.bg }}>
				<div className="flex min-h-0 flex-1 flex-col overflow-visible border-b xl:overflow-hidden xl:border-b-0 xl:border-r" style={{ borderColor: COLORS.border }}>
					<div className="flex flex-wrap items-center gap-2 border-b bg-white px-4 py-2.5 sm:px-5" style={{ borderColor: COLORS.border }}>
						<div className="relative w-full sm:w-auto sm:min-w-47.5">
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search meetings..."
								className="w-full rounded-[9px] border py-1.5 pl-7 pr-2.5 text-[12.5px] outline-none"
								style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.text }}
							/>
							<svg className="absolute left-2 top-1/2 h-3.25 w-3.25 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2">
								<circle cx="11" cy="11" r="8" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
						</div>

						<select value={filterAdvisor} onChange={(e) => setFilterAdvisor(e.target.value)} className="w-full rounded-[9px] border px-2.5 py-1.5 text-[12.5px] sm:w-auto" style={{ borderColor: COLORS.border }}>
							<option value="">All Advisors</option>
							{advisorOptions.map((a) => (
								<option key={a} value={a}>{a}</option>
							))}
						</select>

						<select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="w-full rounded-[9px] border px-2.5 py-1.5 text-[12.5px] sm:w-auto" style={{ borderColor: COLORS.border }}>
							<option value="">All Locations</option>
							{locationOptions.map((l) => (
								<option key={l} value={l}>{l}</option>
							))}
						</select>

						<select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="w-full rounded-[9px] border px-2.5 py-1.5 text-[12.5px] sm:w-auto" style={{ borderColor: COLORS.border }}>
							<option value="">All Types</option>
							{typeOptions.map((t) => (
								<option key={t} value={t}>{t}</option>
							))}
						</select>

						<select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full rounded-[9px] border px-2.5 py-1.5 text-[12.5px] sm:w-auto" style={{ borderColor: COLORS.border }}>
							<option value="">All Meetings</option>
							<option value="today">Today</option>
							<option value="upcoming">Upcoming</option>
							<option value="past">Past</option>
						</select>

						<div className="h-5 w-px" style={{ background: COLORS.border }}></div>
						<div className="flex gap-1">
							<button onClick={() => setView('list')} className="rounded-lg border px-3 py-1 text-xs font-semibold" style={{ borderColor: view === 'list' ? COLORS.teal : COLORS.border, background: view === 'list' ? COLORS.tealTint : COLORS.card, color: view === 'list' ? COLORS.tealDeep : COLORS.textMuted }}>
								List
							</button>
							<button onClick={() => setView('cal')} className="rounded-lg border px-3 py-1 text-xs font-semibold" style={{ borderColor: view === 'cal' ? COLORS.teal : COLORS.border, background: view === 'cal' ? COLORS.tealTint : COLORS.card, color: view === 'cal' ? COLORS.tealDeep : COLORS.textMuted }}>
								Calendar
							</button>
						</div>

						<div className="ml-auto flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-end">
							<span className="text-xs" style={{ color: COLORS.textMuted }}>
								<strong style={{ color: COLORS.teal }}>{counts.today} today</strong> · <strong style={{ color: COLORS.text }}>{counts.upcoming} upcoming</strong>
							</span>
							<button onClick={() => setShowSchedule(true)} className="rounded-[9px] border-none px-3.5 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.22)' }}>
								Schedule Meeting
							</button>
						</div>
					</div>

					{todayMeetings.length > 0 && (
						<div className="border-b px-4 py-2.5 sm:px-5" style={{ background: COLORS.tealTint, borderColor: 'rgba(47,125,121,.22)' }}>
							<div className="flex flex-wrap items-center justify-between gap-2">
								<div className="text-[13px] font-bold" style={{ color: COLORS.tealDeep }}>
									{todayMeetings.length} meeting{todayMeetings.length !== 1 ? 's' : ''} today
								</div>
								<div className="flex flex-wrap gap-1.5">
									{todayMeetings.map((m) => (
										<button key={m.id} onClick={() => openPrep(m)} className="rounded-lg border px-2 py-0.5 text-[11px] font-bold" style={{ background: (TYPE_COLORS[m.type] || TYPE_COLORS.Consultation).bg, color: (TYPE_COLORS[m.type] || TYPE_COLORS.Consultation).color, borderColor: 'rgba(0,0,0,.06)' }}>
											{m.time} · {m.client}
										</button>
									))}
								</div>
							</div>
						</div>
					)}

					{view === 'list' ? (
						<div className="min-h-0 flex-1 overflow-y-auto bg-[#F7F5F2]">
							<div className="sticky top-0 z-10 hidden border-b bg-white px-5 py-2.5 lg:grid lg:grid-cols-[80px_1.1fr_1fr_130px_130px_110px] lg:gap-3" style={{ borderColor: COLORS.border }}>
								{['Time', 'Client', 'Advisor · Location', 'Type', 'Status', 'Action'].map((h) => (
									<div key={h} className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted }}>{h}</div>
								))}
							</div>

							<div className="px-4 pb-6 sm:px-5">
								{grouped.length === 0 && <div className="py-16 text-center text-sm" style={{ color: COLORS.textMuted }}>No meetings match your filters.</div>}
								{grouped.map((group) => (
									<div key={group.key}>
										<div className="px-0 py-2 text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>
											<span className="inline-flex h-2 w-2 rounded-full align-middle" style={{ background: group.color, marginRight: 6 }}></span>
											{group.label}
											<span className="ml-2 rounded-full border px-1.5 py-0.5 text-[10px]" style={{ borderColor: COLORS.border, color: COLORS.textMuted }}>{group.items.length}</span>
										</div>

										{group.items.map((m) => {
											const active = activeMeeting && activeMeeting.id === m.id;
											const typeStyle = TYPE_COLORS[m.type] || TYPE_COLORS.Consultation;
											const st = statusPillStyle(m.status);
											return (
												<div key={m.id} className="mb-2 rounded-xl border bg-white px-3 py-3 shadow-sm transition hover:bg-[#FAFAF8] lg:mb-0 lg:rounded-none lg:border-x-0 lg:border-t-0 lg:shadow-none" style={{ borderColor: COLORS.borderSoft, borderLeft: active || isTodayMeeting(m) ? `3px solid ${isTodayMeeting(m) ? COLORS.teal : '#2C5F7F'}` : `3px solid transparent` }}>
													<div className="grid gap-2 lg:grid-cols-[80px_1.1fr_1fr_130px_130px_110px] lg:items-center lg:gap-3">
														<div>
															<div className="text-[13px] font-bold" style={{ color: COLORS.text }}>{m.time}</div>
															<div className="text-[11px]" style={{ color: COLORS.textMuted }}>{m.duration}</div>
														</div>
														<div>
															<div className="text-[13px] font-bold" style={{ color: COLORS.text }}>{m.client}</div>
															<div className="text-[11.5px]" style={{ color: COLORS.textMuted }}>{m.format}</div>
														</div>
														<div className="flex items-center gap-2">
															<div className="flex h-5 w-5 items-center justify-center rounded-md text-[8px] font-extrabold text-white" style={{ background: ADVISOR_COLORS[m.advisor] || COLORS.textMuted }}>
																{m.advisor.split(' ').map((p) => p[0]).join('').slice(0, 2)}
															</div>
															<div>
																<div className="text-[12px]" style={{ color: COLORS.textSec }}>{m.advisor.split(' ')[0]}</div>
																<div className="text-[11px]" style={{ color: COLORS.textMuted }}>{m.location}</div>
															</div>
														</div>
														<div>
															<span className="inline-block rounded-md px-2 py-0.5 text-[11px] font-bold" style={{ background: typeStyle.bg, color: typeStyle.color }}>{m.type}</span>
														</div>
														<div>
															<span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: st.bg, color: st.color, border: st.border ? `1px solid ${st.border}` : 'none' }}>
																{statusLabel(m.status)}
															</span>
														</div>
														<div className="flex gap-1.5">
															{m.status === 'today' && m.format === 'Zoom' && (
																<button onClick={() => joinMeeting(m)} className="rounded-lg border px-2.5 py-1 text-[11px] font-bold text-white" style={{ background: COLORS.teal, borderColor: COLORS.teal }}>Join</button>
															)}
															{m.status !== 'past' && (
																<button onClick={() => openPrep(m, 'shared')} className="rounded-lg border px-2.5 py-1 text-[11px] font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSec }}>Prep</button>
															)}
															<button onClick={() => openPrep(m, 'shared')} className="rounded-lg border px-2.5 py-1 text-[11px] font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSec }}>Notes</button>
														</div>
													</div>
												</div>
											);
										})}
									</div>
								))}
							</div>
						</div>
					) : (
						<div className="min-h-0 flex-1 overflow-y-auto bg-[#F7F5F2] px-4 py-5 sm:px-5">
							<div className="mb-4 flex items-center justify-between">
								<div className="text-base font-bold" style={{ color: COLORS.text }}>{monthTitle}</div>
								<div className="flex gap-1.5">
									<button onClick={() => moveCal(-1)} className="rounded-lg border px-2.5 py-1 text-xs" style={{ borderColor: COLORS.border }}>Prev</button>
									<button onClick={jumpTodayCal} className="rounded-lg border px-2.5 py-1 text-xs font-bold" style={{ borderColor: 'rgba(47,125,121,.2)', color: COLORS.tealDeep, background: COLORS.tealTint }}>Today</button>
									<button onClick={() => moveCal(1)} className="rounded-lg border px-2.5 py-1 text-xs" style={{ borderColor: COLORS.border }}>Next</button>
								</div>
							</div>
							<div className="grid grid-cols-7 overflow-hidden rounded-[14px] border bg-white" style={{ borderColor: COLORS.border, boxShadow: cardShadow }}>
								{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
									<div key={d} className="border-b py-2 text-center text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted, borderColor: COLORS.border }}>{d}</div>
								))}
								{calendarCells.map((cell, idx) => {
									const isToday = cell.iso === '2026-04-15';
									return (
										<div key={`${cell.iso || 'o'}-${idx}`} className="min-h-21 border-b border-r p-1.5 last:border-r-0" style={{ borderColor: COLORS.borderSoft, background: cell.inMonth ? (isToday ? COLORS.tealTint : COLORS.card) : '#FAF9F7' }}>
											{cell.inMonth && (
												<>
													{isToday ? (
														<div className="mb-1 inline-flex h-5.5 w-5.5 items-center justify-center rounded-full text-[11px] font-extrabold text-white" style={{ background: COLORS.teal }}>{cell.dayNum}</div>
													) : (
														<div className="mb-1 text-xs font-bold" style={{ color: COLORS.text }}>{cell.dayNum}</div>
													)}
													{cell.events.slice(0, 3).map((event) => {
														const tc = TYPE_COLORS[event.type] || TYPE_COLORS.Consultation;
														return (
															<div key={`${event.id}-evt`} className="mb-0.5 cursor-pointer truncate rounded px-1 py-0.5 text-[10px] font-semibold" style={{ background: tc.bg, color: tc.color }} onClick={() => openPrep(event)}>
																{event.time} {event.client.split(' ')[0]}
															</div>
														);
													})}
													{cell.events.length > 3 && <div className="text-[9px]" style={{ color: COLORS.textMuted }}>+{cell.events.length - 3} more</div>}
												</>
											)}
										</div>
									);
								})}
							</div>
						</div>
					)}
				</div>

				{isPrepPanelOpen && activeMeeting && (
					<div className="w-full border-t bg-white xl:w-95 xl:shrink-0 xl:border-l xl:border-t-0" style={{ borderColor: COLORS.border }}>
						<div className="border-b px-4 py-4 sm:px-5" style={{ background: COLORS.navy, borderColor: COLORS.border }}>
							<div className="mb-1 flex items-center justify-between gap-3 text-sm font-bold text-white">
								<span>Meeting Prep</span>
								<button onClick={closePrepPanel} className="rounded-md border px-2 py-0.5 text-[11px] font-bold" style={{ borderColor: 'rgba(255,255,255,.35)', color: '#fff', background: 'rgba(255,255,255,.08)' }}>Close</button>
							</div>
							<div className="text-lg font-extrabold text-white">{activeMeeting.client}</div>
							<div className="text-xs" style={{ color: 'rgba(255,255,255,.55)' }}>{activeMeeting.date} · {activeMeeting.time} · {activeMeeting.duration}</div>
							<div className="mt-2 flex flex-wrap gap-1.5">
								<span className="rounded-full px-2 py-0.5 text-[10px] font-extrabold" style={{ background: `${(TYPE_COLORS[activeMeeting.type] || TYPE_COLORS.Consultation).bg}44`, color: '#ffffff' }}>{activeMeeting.type}</span>
								<span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.7)' }}>{activeMeeting.format}</span>
								<span className="rounded-full px-2 py-0.5 text-[10px] font-bold" style={{ background: 'rgba(255,255,255,.12)', color: 'rgba(255,255,255,.7)' }}>{activeMeeting.location}</span>
							</div>
						</div>

						<div className="max-h-none overflow-visible px-4 py-4 sm:px-5 xl:max-h-[calc(100vh-160px)] xl:overflow-y-auto">
							<div className="mb-4">
								<div className="mb-2 border-b pb-1.5 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted, borderColor: COLORS.borderSoft }}>Meeting Details</div>
								<div className="grid grid-cols-2 gap-0">
									{[
										['Date', activeMeeting.date],
										['Time', activeMeeting.time],
										['Duration', activeMeeting.duration],
										['Format', activeMeeting.format],
										['Advisor', activeMeeting.advisor],
										['Location', activeMeeting.location],
									].map(([k, v]) => (
										<div key={k} className="border-b py-2" style={{ borderColor: COLORS.borderSoft }}>
											<div className="text-[10px] font-extrabold uppercase tracking-[0.06em]" style={{ color: COLORS.textMuted }}>{k}</div>
											<div className="text-[13px] font-semibold" style={{ color: COLORS.text }}>{v}</div>
										</div>
									))}
								</div>
							</div>

							<div className="mb-4">
								<div className="mb-2 border-b pb-1.5 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted, borderColor: COLORS.borderSoft }}>Client Snapshot</div>
								<div className="grid grid-cols-2 gap-0">
									{[
										['FFS Score', activeMeeting.ffs > 0 ? `${activeMeeting.ffs} / 100` : 'Not scored'],
										['Tier', activeMeeting.tier],
										['Meeting Type', activeMeeting.type],
										['Has Notes', activeMeeting.notes ? 'Yes' : 'No'],
									].map(([k, v]) => (
										<div key={k} className="border-b py-2" style={{ borderColor: COLORS.borderSoft }}>
											<div className="text-[10px] font-extrabold uppercase tracking-[0.06em]" style={{ color: COLORS.textMuted }}>{k}</div>
											<div className="text-[13px] font-semibold" style={{ color: COLORS.text }}>{v}</div>
										</div>
									))}
								</div>
							</div>

							<div className="mb-4">
								<div className="mb-2 border-b pb-1.5 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted, borderColor: COLORS.borderSoft }}>Suggested Talking Points</div>
								{activeMeeting.talking.length === 0 ? (
									<div className="text-[12.5px]" style={{ color: COLORS.textMuted }}>Past meeting - no prep needed.</div>
								) : (
									<div className="space-y-1.5">
										{activeMeeting.talking.map((point, idx) => (
											<div key={point} className="flex items-start gap-2 rounded-lg border-l-2 px-2.5 py-2" style={{ background: COLORS.tealTint, borderColor: COLORS.teal }}>
												<div className="text-[10px] font-extrabold" style={{ color: COLORS.teal }}>{idx + 1}</div>
												<div className="text-[12.5px]" style={{ color: COLORS.tealDeep }}>{point}</div>
											</div>
										))}
									</div>
								)}
							</div>

							<div className="mb-4">
								<div className="mb-2 border-b pb-1.5 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted, borderColor: COLORS.borderSoft }}>Pre-Meeting Checklist</div>
								{activeMeeting.checklist.length === 0 ? (
									<div className="text-[12.5px]" style={{ color: COLORS.textMuted }}>No checklist for past meetings.</div>
								) : (
									<div className="space-y-1">
										{activeMeeting.checklist.map((item, idx) => (
											<label key={item} className="flex items-start gap-2 py-0.5">
												<input type="checkbox" checked={Boolean(checklistState[idx])} onChange={() => toggleChecklist(idx)} className="mt-0.5" style={{ accentColor: COLORS.teal }} />
												<span className="text-[12.5px]" style={{ color: COLORS.textSec }}>{item}</span>
											</label>
										))}
									</div>
								)}
							</div>

							<div>
								<div className="mb-2 border-b pb-1.5 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted, borderColor: COLORS.borderSoft }}>Meeting Notes</div>
								<div className="mb-2 flex gap-1.5">
									<button onClick={() => setNoteTab('shared')} className="flex-1 rounded-lg px-2 py-1 text-[11.5px] font-bold" style={{ background: noteTab === 'shared' ? COLORS.teal : COLORS.card, color: noteTab === 'shared' ? '#fff' : COLORS.textSec, border: noteTab === 'shared' ? 'none' : `1.5px solid ${COLORS.border}` }}>Shared with Advisor</button>
									<button onClick={() => setNoteTab('internal')} className="flex-1 rounded-lg px-2 py-1 text-[11.5px] font-bold" style={{ background: noteTab === 'internal' ? '#5B4A8B' : COLORS.card, color: noteTab === 'internal' ? '#fff' : COLORS.textSec, border: noteTab === 'internal' ? 'none' : `1.5px solid ${COLORS.border}` }}>RM Only</button>
								</div>
								<div className="mb-2 rounded-md px-2 py-1 text-[11px]" style={{ background: noteTab === 'shared' ? COLORS.tealTint : '#F3EFFA', color: noteTab === 'shared' ? COLORS.tealDeep : '#5B4A8B' }}>
									{noteTab === 'shared' ? 'Advisor can see these notes' : 'Internal note - RM only'}
								</div>
								<textarea value={draftNote} onChange={(e) => setDraftNote(e.target.value)} className="min-h-20 w-full resize-y rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.text }} />
								<div className="mt-2 flex gap-2">
									<button onClick={saveNotes} className="rounded-lg border-none px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.teal }}>Save Notes</button>
									<button className="rounded-lg border px-3 py-1.5 text-xs font-semibold" style={{ borderColor: COLORS.border, color: COLORS.textSec }}>Send Reminder</button>
								</div>
							</div>

							{activeMeeting.status === 'today' && activeMeeting.format === 'Zoom' && (
								<div className="mt-4">
									<button className="w-full rounded-xl border-none px-4 py-3 text-sm font-bold text-white" style={{ background: COLORS.teal, boxShadow: '0 4px 14px rgba(47,125,121,.28)' }}>Join Zoom Meeting</button>
								</div>
							)}
						</div>
					</div>
				)}
			</div>

			{showSchedule && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2B3A]/50 p-4" onClick={() => setShowSchedule(false)}>
					<div className="max-h-[90vh] w-full max-w-125 overflow-y-auto rounded-[18px] bg-white" style={{ boxShadow: '0 24px 60px rgba(0,0,0,.25)' }} onClick={(e) => e.stopPropagation()}>
						<div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: COLORS.border }}>
							<div className="text-[17px] font-bold" style={{ color: COLORS.text }}>Schedule Meeting</div>
							<button className="flex h-7 w-7 items-center justify-center rounded-lg border text-lg" style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.textMuted }} onClick={() => setShowSchedule(false)}>×</button>
						</div>
						<div className="space-y-3.5 px-6 py-5">
							<div className="grid gap-3 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>Client *</label>
									<input value={scheduleForm.client} onChange={(e) => setScheduleForm((p) => ({ ...p, client: e.target.value }))} className="w-full rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg }} placeholder="Client name" />
								</div>
								<div>
									<label className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>Meeting Type *</label>
									<select value={scheduleForm.type} onChange={(e) => setScheduleForm((p) => ({ ...p, type: e.target.value }))} className="w-full rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg }}>
										<option value="">Select type...</option>
										{typeOptions.map((t) => <option key={t} value={t}>{t}</option>)}
									</select>
								</div>
							</div>
							<div className="grid gap-3 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>Date *</label>
									<input type="date" value={scheduleForm.date} onChange={(e) => setScheduleForm((p) => ({ ...p, date: e.target.value }))} className="w-full rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg }} />
								</div>
								<div>
									<label className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>Time *</label>
									<input type="time" value={scheduleForm.time} onChange={(e) => setScheduleForm((p) => ({ ...p, time: e.target.value }))} className="w-full rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg }} />
								</div>
							</div>
							<div className="grid gap-3 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>Duration</label>
									<select value={scheduleForm.duration} onChange={(e) => setScheduleForm((p) => ({ ...p, duration: e.target.value }))} className="w-full rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg }}>
										{['15 min', '30 min', '45 min', '60 min'].map((d) => <option key={d} value={d}>{d}</option>)}
									</select>
								</div>
								<div>
									<label className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>Format</label>
									<select value={scheduleForm.format} onChange={(e) => setScheduleForm((p) => ({ ...p, format: e.target.value }))} className="w-full rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg }}>
										{['Zoom', 'Phone', 'In Person'].map((f) => <option key={f} value={f}>{f}</option>)}
									</select>
								</div>
							</div>
							<div className="grid gap-3 sm:grid-cols-2">
								<div>
									<label className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>Assign Advisor</label>
									<select value={scheduleForm.advisor} onChange={(e) => setScheduleForm((p) => ({ ...p, advisor: e.target.value }))} className="w-full rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg }}>
										<option value="">Angela (RM)</option>
										{advisorOptions.map((a) => <option key={a} value={a}>{a}</option>)}
									</select>
								</div>
								<div>
									<label className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>Location</label>
									<select value={scheduleForm.location} onChange={(e) => setScheduleForm((p) => ({ ...p, location: e.target.value }))} className="w-full rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg }}>
										<option value="">Select location...</option>
										{locationOptions.map((l) => <option key={l} value={l}>{l}</option>)}
									</select>
								</div>
							</div>
							<div>
								<label className="mb-1 block text-[10px] font-extrabold uppercase tracking-[0.08em]" style={{ color: COLORS.textMuted }}>Notes</label>
								<textarea value={scheduleForm.notes} onChange={(e) => setScheduleForm((p) => ({ ...p, notes: e.target.value }))} className="h-16 w-full resize-none rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg }} />
							</div>
							<div className="flex gap-2.5">
								<button onClick={() => setShowSchedule(false)} className="flex-1 rounded-[10px] border px-3 py-2 text-[13px] font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.bg }}>Cancel</button>
								<button onClick={submitSchedule} className="flex-2 rounded-[10px] border-none px-3 py-2 text-[13px] font-bold text-white" style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.22)' }}>Schedule Meeting</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
