import React, { useState } from 'react';
import { AlertTriangle, Calendar, Eye, SlidersHorizontal, Zap } from 'lucide-react';
import { COLORS } from './tatcaresShared';

export default function NotificationsScreen() {
	const [activeFilter, setActiveFilter] = useState('All');
	const [prefs, setPrefs] = useState({
		clientActivity: true,
		aiChanges: true,
		renewals: true,
		deadlines: true,
		teamUpdates: false,
		emailDigest: true,
	});

	const filterButtons = [
		{ label: 'All', count: '14' },
		{ label: 'Urgent', count: '3' },
		{ label: 'Client activity', count: '4', type: 'teal' },
		{ label: 'Alerts', count: '4' },
		{ label: 'Deadlines', count: '2' },
		{ label: 'AI insights', count: '3', type: 'plum' },
		{ label: 'Team' },
	];

	const dateGroups = [
		{
			label: 'Today — April 15, 2026',
			items: [
				{
					name: 'Derek Wilson',
					initials: 'DW',
					avatar: COLORS.red,
					headline: 'Q1 renewal payment is 14 days overdue',
					detail:
						'Payment of $349 was due Apr 1. No response to email follow-up. Client is at high churn risk. Call or mark as churned today.',
					time: '9:00 AM',
					tag: 'Urgent',
					tagType: 'red',
					type: 'urgent',
					unread: true,
					actions: [
						{ label: 'Call Derek now', style: 'red' },
						{ label: 'View client profile', style: 'gray' },
						{ label: 'Mark as churned', style: 'gray' },
					],
				},
				{
					name: 'AI · Priya Sharma',
					initials: 'PS',
					avatar: COLORS.teal,
					headline: 'Financial Freedom Score dropped from 71 → 54',
					detail:
						'Updated income data increased projected year-end income. Score moved from On Track to At Risk. Strategy review recommended before next check-in.',
					time: '8:42 AM',
					tag: 'AI insight',
					tagType: 'plum',
					type: 'ai',
					unread: true,
					actions: [
						{ label: 'Open diagnostics', style: 'teal' },
						{ label: 'Schedule review call', style: 'gold' },
						{ label: 'View FFS score', style: 'gray' },
					],
				},
				{
					name: 'Jordan Crawford',
					initials: 'JC',
					avatar: '#1A7A4A',
					headline: 'opened the 2024 proposal · viewed for 4 min 12 sec',
					detail:
						'Jordan viewed the proposal twice in the last hour and focused on strategy and savings sections. Delivery call is at 1:00 PM.',
					time: '8:14 AM',
					tag: 'Client activity',
					tagType: 'blue',
					type: 'activity',
					unread: true,
					actions: [
						{ label: 'View proposal', style: 'teal' },
						{ label: 'View meeting notes', style: 'gray' },
					],
				},
			],
		},
		{
			label: 'Yesterday — April 14, 2026',
			items: [
				{
					name: 'Sandra Kim',
					initials: 'SK',
					avatar: '#B8860B',
					headline: 'completed the strategy questionnaire (80% · 1040 still missing)',
					detail:
						'Questionnaire complete except prior-year return. FFS pre-score is currently based on partial data only.',
					time: '4:38 PM',
					tag: 'Client activity',
					tagType: 'blue',
					type: 'activity',
					unread: true,
					actions: [
						{ label: 'Send 1040 reminder', style: 'teal' },
						{ label: 'View questionnaire', style: 'gray' },
					],
				},
				{
					name: 'Lisa Nguyen',
					initials: 'LN',
					avatar: '#2C5F7F',
					headline: 'no advisor contact in 30 days · at risk of disengagement',
					detail:
						'Client completed questionnaire on Mar 15 but has not been contacted since. Churn risk is increasing.',
					time: '9:00 AM',
					tag: 'Action needed',
					tagType: 'gold',
					type: 'warn',
					unread: true,
					actions: [
						{ label: 'Send follow-up', style: 'gold' },
						{ label: 'View profile', style: 'gray' },
					],
				},
			],
		},
		{
			label: 'Earlier this week',
			items: [
				{
					name: 'AI · Jordan Crawford',
					initials: 'JC',
					avatar: '#1A7A4A',
					headline: 'Q1 income updated · year-end projection revised upward',
					detail:
						'Q1 actual income came in higher than projected. Defined benefit contribution limit may be increased.',
					time: 'Apr 12',
					tag: 'AI insight',
					tagType: 'plum',
					type: 'ai',
					unread: false,
					actions: [
						{ label: 'Update tax plan', style: 'teal' },
						{ label: 'Open scenario modeler', style: 'gray' },
					],
				},
			],
		},
	];

	const iconForType = (type) => {
		if (type === 'urgent') return <AlertTriangle className="w-2.5 h-2.5" />;
		if (type === 'warn') return <Calendar className="w-2.5 h-2.5" />;
		if (type === 'activity') return <Eye className="w-2.5 h-2.5" />;
		return <Zap className="w-2.5 h-2.5" />;
	};

	const typeColor = (type) => {
		if (type === 'urgent') return COLORS.red;
		if (type === 'warn') return COLORS.gold;
		if (type === 'activity') return '#2C5F7F';
		return '#5B4A8B';
	};

	const tagStyle = (tagType) => {
		if (tagType === 'red') return { background: COLORS.redTint, color: COLORS.red };
		if (tagType === 'gold') return { background: '#FEF9EE', color: '#7a5a00' };
		if (tagType === 'plum') return { background: '#F3EFFA', color: '#5B4A8B' };
		if (tagType === 'blue') return { background: '#EEF3FC', color: '#2C5F7F' };
		return { background: COLORS.tealTint, color: COLORS.tealDeep };
	};

	const actionStyle = (style) => {
		if (style === 'red') return { background: COLORS.redTint, color: COLORS.red, borderColor: 'rgba(198,61,47,.25)' };
		if (style === 'teal') return { background: COLORS.tealTint, color: COLORS.tealDeep, borderColor: 'rgba(47,125,121,.25)' };
		if (style === 'gold') return { background: '#FEF9EE', color: '#7a5a00', borderColor: 'rgba(184,134,11,.25)' };
		return { background: COLORS.bg, color: COLORS.textMuted, borderColor: COLORS.border };
	};

	const togglePref = (key) => setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

	return (
		<div className="h-full flex flex-col" style={{ background: COLORS.bg }}>
			<div
				className="flex flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:flex-wrap lg:items-center lg:gap-2.5 lg:px-7"
				style={{ background: COLORS.card, borderBottom: `1px solid ${COLORS.border}` }}
			>
				<div className="flex flex-wrap gap-2.5">
					{filterButtons.map((f) => {
						const active = activeFilter === f.label;
						return (
							<button
								key={f.label}
								onClick={() => setActiveFilter(f.label)}
								className="inline-flex items-center gap-1.5 rounded-lg border-[1.5px] px-3.5 py-1.5 text-xs font-semibold"
								style={{
									borderColor: active ? COLORS.red : COLORS.border,
									background: active ? COLORS.redTint : COLORS.card,
									color: active ? COLORS.red : COLORS.textSec,
								}}
							>
								{f.label}
								{f.count && (
									<span
										className="min-w-4 rounded-full px-1.5 py-0.5 text-center text-[9px] font-extrabold text-white"
										style={{ background: f.type === 'teal' ? COLORS.teal : f.type === 'plum' ? '#5B4A8B' : COLORS.red }}
									>
										{f.count}
									</span>
								)}
							</button>
						);
					})}
				</div>
				<div className="flex w-full flex-wrap items-center gap-2.5 lg:ml-auto lg:w-auto lg:justify-end">
					<button className="text-xs font-bold" style={{ color: COLORS.textMuted }}>
						Oldest first
					</button>
					<button
						className="inline-flex items-center gap-1.5 text-[11.5px] font-bold px-3 py-1.5 rounded-lg border-[1.5px]"
						style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.card }}
					>
						<SlidersHorizontal className="w-3 h-3" />
						Preferences
					</button>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto xl:flex xl:min-h-0 xl:overflow-hidden">
				<div className="min-w-0 xl:min-h-0 xl:flex-1 xl:overflow-y-auto">
					{dateGroups.map((group) => (
						<div key={group.label}>
							<div
								className="sticky top-0 z-10 px-4 py-2.5 text-[10px] font-extrabold uppercase sm:px-6"
								style={{
									letterSpacing: '0.12em',
									color: COLORS.textMuted,
									background: COLORS.bg,
									borderBottom: `1px solid ${COLORS.border}`,
								}}
							>
								{group.label}
							</div>
							{group.items.map((item, idx) => (
								<div
									key={`${item.name}-${idx}`}
									className="relative flex flex-col gap-3 border-b px-4 py-4 sm:px-6 lg:flex-row lg:items-start lg:gap-3.5"
									style={{
										borderBottomColor: COLORS.border,
										background: item.unread ? '#FFFEFE' : COLORS.card,
										borderLeft: item.unread ? `3px solid ${typeColor(item.type)}` : '3px solid transparent',
									}}
								>
									<div className="flex items-start gap-3 sm:gap-3.5 lg:flex-1">
										<div
											className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
											style={{ background: item.unread ? typeColor(item.type) : 'transparent' }}
										></div>

										<div className="relative shrink-0">
											<div
												className="flex h-9.5 w-9.5 items-center justify-center rounded-full text-[13px] font-bold text-white"
												style={{ background: item.avatar, opacity: item.unread ? 1 : 0.7 }}
											>
												{item.initials}
											</div>
											<div
												className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full text-white"
												style={{ background: typeColor(item.type), border: `2px solid ${COLORS.card}` }}
											>
												{iconForType(item.type)}
											</div>
										</div>

										<div className="min-w-0 flex-1">
											<div className="text-[13px] font-bold leading-[1.4]" style={{ color: COLORS.text }}>
												{item.name}{' '}
												<span className="font-normal" style={{ color: COLORS.textSec }}>
													— {item.headline}
												</span>
											</div>
											<div className="mt-1 text-xs leading-normal" style={{ color: COLORS.textSec }}>
												{item.detail}
											</div>
											<div className="mt-2 flex flex-wrap items-center gap-2">
												{item.actions.map((a) => (
													<button
														key={a.label}
														className="rounded-lg border-[1.5px] px-3 py-1 text-[11.5px] font-bold"
														style={actionStyle(a.style)}
													>
														{a.label}
													</button>
												))}
											</div>
										</div>
									</div>

									<div className="flex min-w-0 flex-row items-center justify-between gap-3 pl-5.5 sm:pl-13.75 lg:min-w-18 lg:shrink-0 lg:flex-col lg:items-end lg:justify-start lg:pl-0">
										<span className="text-[11px]" style={{ color: COLORS.textMuted }}>
											{item.time}
										</span>
										<span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md" style={tagStyle(item.tagType)}>
											{item.tag}
										</span>
									</div>
								</div>
							))}
						</div>
					))}
				</div>

				<div
					className="w-full border-t xl:min-h-0 xl:w-75 xl:shrink-0 xl:overflow-y-auto xl:border-l xl:border-t-0"
					style={{ borderColor: COLORS.border, background: COLORS.card }}
				>
					<div className="border-b px-4 py-4.5 sm:px-5" style={{ borderColor: COLORS.border }}>
						<div className="text-[13px] font-bold mb-3" style={{ color: COLORS.text }}>
							Summary
						</div>
						{[
							{ label: 'Urgent', count: 3, icon: AlertTriangle, color: COLORS.red },
							{ label: 'Action needed', count: 4, icon: Calendar, color: COLORS.gold },
							{ label: 'Client activity', count: 4, icon: Eye, color: '#2C5F7F' },
							{ label: 'AI insights', count: 3, icon: Zap, color: '#5B4A8B' },
							{ label: 'Deadlines', count: 2, icon: Calendar, color: COLORS.gold },
						].map((s) => {
							const Icon = s.icon;
							return (
								<div
									key={s.label}
									className="flex items-center justify-between py-2 border-b last:border-b-0"
									style={{ borderColor: COLORS.border }}
								>
									<div className="flex items-center gap-2">
										<div className="flex h-6.5 w-6.5 items-center justify-center rounded-[7px] text-white" style={{ background: s.color }}>
											<Icon className="w-3 h-3" />
										</div>
										<span className="text-[12.5px]" style={{ color: COLORS.textSec }}>
											{s.label}
										</span>
									</div>
									<span className="text-sm font-extrabold" style={{ color: s.color }}>
										{s.count}
									</span>
								</div>
							);
						})}
					</div>

					<div className="border-b px-4 py-4.5 sm:px-5" style={{ borderColor: COLORS.border }}>
						<div className="text-[13px] font-bold mb-3" style={{ color: COLORS.text }}>
							Upcoming deadlines
						</div>
						{[
							{ d: 'Apr 20', t: 'Melissa Grant renewal', s: 'Q2 subscription · $349', c: COLORS.red },
							{ d: 'Apr 22', t: 'Jordan Crawford check-in', s: '60-day plan review call', c: COLORS.red },
							{ d: 'Apr 30', t: 'DBP document — Pinnacle TPA', s: 'Jordan Crawford · actuarial plan', c: COLORS.gold },
							{ d: 'Jun 15', t: 'Q2 estimated tax payments', s: 'All active clients with withholding', c: COLORS.green },
						].map((d) => (
							<div key={d.t} className="flex items-start gap-2.5 py-2 border-b last:border-b-0" style={{ borderColor: COLORS.border }}>
								<div className="mt-0.5 min-w-10.5 text-[11px] font-extrabold" style={{ color: d.c }}>
									{d.d}
								</div>
								<div>
									<div className="text-[12.5px] font-semibold" style={{ color: COLORS.text }}>
										{d.t}
									</div>
									<div className="text-[11.5px]" style={{ color: COLORS.textMuted }}>
										{d.s}
									</div>
								</div>
							</div>
						))}
					</div>

					<div className="px-4 py-4.5 sm:px-5">
						<div className="text-[13px] font-bold mb-3" style={{ color: COLORS.text }}>
							Notification preferences
						</div>
						{[
							['Client activity alerts', 'clientActivity'],
							['AI score change alerts', 'aiChanges'],
							['Renewal reminders', 'renewals'],
							['Deadline reminders', 'deadlines'],
							['Team activity updates', 'teamUpdates'],
							['Email digest (daily)', 'emailDigest'],
						].map(([label, key]) => (
							<div key={key} className="flex items-center justify-between py-2 border-b last:border-b-0" style={{ borderColor: COLORS.border }}>
								<span className="text-[12.5px]" style={{ color: COLORS.textSec }}>
									{label}
								</span>
								<button
									onClick={() => togglePref(key)}
									className="relative h-4 w-7.5 rounded-full"
									style={{ background: prefs[key] ? COLORS.teal : COLORS.border }}
								>
									<span
										className="absolute top-0.5 w-3 h-3 rounded-full bg-white"
										style={{ left: prefs[key] ? '16px' : '2px', transition: 'left .2s' }}
									></span>
								</button>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}