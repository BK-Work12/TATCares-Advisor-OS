import React, { useState } from 'react';
import { COLORS } from './tatcaresShared';

export default function MeetingsScreen() {
	const [selectedMeetingId, setSelectedMeetingId] = useState('jordan');
	const [actionItems, setActionItems] = useState([
		{ id: 1, text: 'Send HSA account setup instructions to Jordan', done: true },
		{ id: 2, text: 'Update DBP contribution to $120K in scenario modeler', done: false },
		{ id: 3, text: 'Send Q2 check-in calendar invite for Apr 22', done: false },
		{
			id: 4,
			text: 'Confirm Pinnacle TPA plan document ETA - follow up if not received by May 5',
			done: false,
		},
	]);

	const meetings = [
		{
			id: 'jordan',
			section: 'Today - Apr 15, 2026 - 3 meetings',
			time: '1:00 PM',
			duration: '45 min',
			barColor: COLORS.red,
			name: 'Jordan Crawford',
			type: 'Proposal delivery - 2024 tax plan',
			tags: [
				{ label: 'Starting soon', bg: COLORS.redTint, color: COLORS.red },
				{ label: 'T3 - FFS 68', bg: '#E8F5EE', color: COLORS.green },
			],
			now: true,
		},
		{
			id: 'sandra',
			section: 'Today - Apr 15, 2026 - 3 meetings',
			time: '9:00 AM',
			duration: '30 min',
			barColor: COLORS.gold,
			name: 'Sandra Kim',
			type: 'Q1 strategy review',
			tags: [{ label: 'Completed', bg: '#FEF9EE', color: '#7a5a00' }],
			now: true,
		},
		{
			id: 'marcus',
			section: 'Today - Apr 15, 2026 - 3 meetings',
			time: '3:30 PM',
			duration: '30 min',
			barColor: '#5B4A8B',
			name: 'Marcus Johnson',
			type: 'Discovery call - new prospect',
			tags: [{ label: 'Upcoming', bg: COLORS.bg, color: COLORS.textMuted }],
			now: false,
		},
		{
			id: 'priya',
			section: 'Tomorrow - Apr 16',
			time: '10:00 AM',
			duration: '45 min',
			barColor: COLORS.teal,
			name: 'Priya Sharma',
			type: 'Go / No-Go review - intake complete',
			tags: [
				{ label: 'Action needed', bg: '#FEF9EE', color: '#7a5a00' },
				{ label: 'T2 - FFS 54', bg: '#F3EFFA', color: '#5B4A8B' },
			],
			now: false,
		},
		{
			id: 'kevin',
			section: 'Tomorrow - Apr 16',
			time: '2:00 PM',
			duration: '30 min',
			barColor: '#2C5F7F',
			name: 'Kevin Marsh',
			type: 'Initial consultation - Ashley qualified',
			tags: [{ label: 'Upcoming', bg: COLORS.bg, color: COLORS.textMuted }],
			now: false,
		},
	];

	const meetingSections = [...new Set(meetings.map((m) => m.section))];
	const selectedMeeting = meetings.find((m) => m.id === selectedMeetingId) || meetings[0];

	const toggleItem = (id) => {
		setActionItems((prev) => prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item)));
	};

	return (
		<div className="flex-1 overflow-y-auto xl:flex xl:min-h-0 xl:overflow-hidden" style={{ background: COLORS.bg }}>
			<div
				className="w-full xl:min-h-0 xl:w-95 xl:shrink-0 xl:overflow-y-auto"
				style={{ borderBottom: `1px solid ${COLORS.border}`, borderRight: `1px solid ${COLORS.border}` }}
			>
				{meetingSections.map((section) => (
					<div key={section}>
						<div
							className="sticky top-0 z-10 px-4 py-2.5 text-[10px] font-extrabold uppercase sm:px-5"
							style={{
								letterSpacing: '0.12em',
								color: COLORS.textMuted,
								background: COLORS.bg,
								borderBottom: `1px solid ${COLORS.border}`,
							}}
						>
							{section}
						</div>
						{meetings
							.filter((meeting) => meeting.section === section)
							.map((meeting) => {
								const selected = selectedMeetingId === meeting.id;
								return (
									<button
										key={meeting.id}
										onClick={() => setSelectedMeetingId(meeting.id)}
										className="flex w-full flex-col gap-3 border-b px-4 py-3.5 text-left transition sm:px-5 sm:py-4 lg:flex-row lg:items-start lg:gap-3"
										style={{
											borderBottomColor: COLORS.border,
											background: selected ? COLORS.tealTint : COLORS.card,
											borderLeft: meeting.now
												? `3px solid ${meeting.barColor}`
												: selected
												? `3px solid ${COLORS.teal}`
												: '3px solid transparent',
										}}
									>
										<div className="flex items-start gap-3 lg:flex-1">
											<div className="min-w-14 shrink-0 text-left lg:text-right">
												<div
													className="text-xs font-bold"
													style={{ color: meeting.now ? COLORS.red : COLORS.textMuted }}
												>
													{meeting.time}
												</div>
												<div className="mt-0.5 text-[10px]" style={{ color: COLORS.textMuted }}>
													{meeting.duration}
												</div>
											</div>
											<div className="mt-0.5 h-10 w-0.75 shrink-0 rounded" style={{ background: meeting.barColor }}></div>
											<div className="min-w-0 flex-1">
											<div className="text-[13px] font-bold" style={{ color: COLORS.text }}>
												{meeting.name}
											</div>
											<div className="text-[11.5px] mt-0.5" style={{ color: COLORS.textSec }}>
												{meeting.type}
											</div>
											<div className="flex gap-1.5 mt-1.5 flex-wrap">
												{meeting.tags.map((tag) => (
													<span
														key={tag.label}
														className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg"
														style={{ background: tag.bg, color: tag.color }}
													>
														{tag.label}
													</span>
												))}
											</div>
											</div>
										</div>
									</button>
								);
							})}
					</div>
				))}

				<div
					className="px-4 py-2.5 text-[10px] font-extrabold uppercase sm:px-5"
					style={{
						letterSpacing: '0.12em',
						color: COLORS.textMuted,
						background: COLORS.bg,
						borderBottom: `1px solid ${COLORS.border}`,
					}}
				>
					Past meetings
				</div>

				{[{ d: 'Apr 1', n: 'Sandra Kim', t: 'Onboarding call - intake walkthrough' }, { d: 'Mar 3', n: 'Jordan Crawford', t: '30-day plan check-in - S-Corp confirmed' }].map((m) => (
					<div key={m.d + m.n} className="border-b px-4 py-3.5 opacity-70 sm:px-5" style={{ borderBottomColor: COLORS.border }}>
						<div className="text-xs font-bold" style={{ color: COLORS.textMuted }}>
							{m.d}
						</div>
						<div className="text-[13px] font-bold mt-0.5" style={{ color: COLORS.text }}>
							{m.n}
						</div>
						<div className="text-[11.5px]" style={{ color: COLORS.textSec }}>
							{m.t}
						</div>
					</div>
				))}
			</div>

			<div className="flex-1 xl:min-h-0 xl:overflow-y-auto" style={{ background: COLORS.card, borderColor: COLORS.border }}>
				<div className="px-4 pb-5 pt-6 sm:px-6 lg:px-7" style={{ borderBottom: `1px solid ${COLORS.border}` }}>
					<div className="mb-4 flex flex-col gap-3.5 sm:flex-row sm:items-center">
						<div
							className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold text-white"
							style={{ background: '#1A7A4A' }}
						>
							{selectedMeeting.name
								.split(' ')
								.map((part) => part[0])
								.join('')
								.slice(0, 2)
								.toUpperCase()}
						</div>
						<div className="min-w-0">
							<div>
								<span className="text-lg font-bold tracking-tight" style={{ color: COLORS.text }}>
									{selectedMeeting.name}
								</span>
								<span
									className="mt-2 inline-block rounded-lg px-2 py-0.5 text-[10px] font-extrabold sm:ml-2 sm:mt-0"
									style={{ background: '#E8F5EE', color: COLORS.green }}
								>
									T3 - Advisor
								</span>
								<span
									className="mt-2 inline-block rounded-lg px-2 py-0.5 text-[10px] font-extrabold sm:ml-2 sm:mt-0"
									style={{ background: COLORS.redTint, color: COLORS.red }}
								>
									Starting soon - 1:00 PM
								</span>
							</div>
							<div className="text-xs mt-1" style={{ color: COLORS.textSec }}>
								Proposal delivery - 45 min - Apr 15, 2026 - Zoom
							</div>
						</div>
					</div>

					<div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
						{[
							{ n: '68', l: 'FFS Score', c: COLORS.teal },
							{ n: '$78,572', l: 'Savings proposed', c: COLORS.text },
							{ n: '3', l: 'Strategies selected', c: COLORS.text },
						].map((stat) => (
							<div key={stat.l} className="rounded-[10px] px-3.5 py-3" style={{ background: COLORS.bg }}>
								<div className="text-base font-extrabold" style={{ color: stat.c }}>
									{stat.n}
								</div>
								<div
									className="text-[10px] font-bold uppercase mt-0.5"
									style={{ color: COLORS.textMuted, letterSpacing: '0.06em' }}
								>
									{stat.l}
								</div>
							</div>
						))}
					</div>

					<div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
						<button
							className="rounded-[10px] px-4 py-2 text-xs font-bold text-white sm:w-auto"
							style={{ background: COLORS.teal }}
						>
							Join Zoom
						</button>
						<button
							className="rounded-[10px] px-4 py-2 text-xs font-bold border-[1.5px]"
							style={{ borderColor: COLORS.border, color: COLORS.textSec }}
						>
							View proposal
						</button>
						<button
							className="rounded-[10px] border-[1.5px] px-4 py-2 text-xs font-bold"
							style={{ borderColor: COLORS.border, color: COLORS.textSec }}
						>
							View tax plan
						</button>
					</div>
				</div>

				<div className="px-4 py-5 sm:px-6 lg:px-7">
					<div className="text-[13px] font-bold mb-2.5" style={{ color: COLORS.text }}>
						Pre-meeting brief
					</div>
					<div
						className="rounded-xl px-4 py-3.5 mb-4"
						style={{ background: COLORS.tealTint, border: '1px solid rgba(47,125,121,.2)' }}
					>
						<div className="text-xs font-bold mb-2" style={{ color: COLORS.tealDeep }}>
							What Yvonne needs to know before this call
						</div>
						{[
							['Jordan\'s mindset', 'Opened the proposal twice today and focused on strategy and savings sections.'],
							['Goal of this call', 'Walk through the 3-strategy stack and get verbal approval to proceed to payment.'],
							['Watch for', 'He may ask about increasing the DBP to $120K based on updated income.'],
							['HSA gap', 'HSA still not opened. Raise this as the easiest immediate win.'],
						].map(([label, value]) => (
							<div key={label} className="flex flex-col gap-1.5 border-b py-2 last:border-b-0 sm:flex-row sm:gap-2.5" style={{ borderColor: COLORS.border }}>
								<div className="min-w-30 text-xs font-bold" style={{ color: COLORS.textMuted }}>
									{label}
								</div>
								<div className="text-[12.5px]" style={{ color: COLORS.textSec }}>
									{value}
								</div>
							</div>
						))}
					</div>

					<div className="text-[13px] font-bold mb-2.5" style={{ color: COLORS.text }}>
						Meeting notes
					</div>
					<textarea
						className="min-h-22.5 w-full rounded-[10px] border px-3.5 py-3 text-[13px] outline-none"
						style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.card }}
						defaultValue="Jordan confirmed approval of all 3 strategies. Wants to explore increasing DBP to $120K. HSA follow-up email sent."
					></textarea>
				</div>

				<div className="px-4 pb-7 sm:px-6 lg:px-7">
					<div className="text-[13px] font-bold mt-4 mb-2.5" style={{ color: COLORS.text }}>
						Action items from this meeting
					</div>
					<div>
						{actionItems.map((item) => (
							<div key={item.id} className="flex items-start gap-2.5 border-b py-2 last:border-b-0" style={{ borderColor: COLORS.border }}>
								<button
									onClick={() => toggleItem(item.id)}
									className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-[5px] border-[1.5px] text-[10px] font-extrabold"
									style={{
										borderColor: item.done ? COLORS.teal : COLORS.border,
										background: item.done ? COLORS.teal : COLORS.card,
										color: '#fff',
									}}
								>
									{item.done ? '✓' : ''}
								</button>
								<span
									className="text-[13px]"
									style={{
										color: item.done ? COLORS.textMuted : COLORS.textSec,
										textDecoration: item.done ? 'line-through' : 'none',
									}}
								>
									{item.text}
								</span>
							</div>
						))}
					</div>

					<div className="text-[13px] font-bold mt-5 mb-2.5" style={{ color: COLORS.text }}>
						Past meetings with Jordan
					</div>
					{[
						{
							d: 'Mar 3, 2026 - 60 min - Zoom',
							t: '30-day plan check-in',
							n: 'S-Corp election confirmed approved by IRS. Pinnacle TPA engaged for DBP.',
						},
						{
							d: 'Jan 15, 2026 - 45 min - Zoom',
							t: 'Onboarding + plan activation',
							n: 'Reviewed all 5 strategies. Jordan paid Q1 subscription and plan activated.',
						},
					].map((past) => (
						<div
							key={past.d}
							className="rounded-xl px-4 py-3.5 mb-2.5"
							style={{ background: COLORS.bg, border: `1px solid ${COLORS.border}` }}
						>
							<div className="text-[11px] font-bold" style={{ color: COLORS.textMuted }}>
								{past.d}
							</div>
							<div className="text-[13px] font-bold mt-0.5" style={{ color: COLORS.text }}>
								{past.t}
							</div>
							<div className="text-xs mt-1" style={{ color: COLORS.textSec }}>
								{past.n}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}