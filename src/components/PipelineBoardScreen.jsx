import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { COLORS, cardShadow } from './tatcaresShared';

const FILTERS = ['All', 'Needs Action', 'T1', 'T2', 'T3'];

const TIER_STYLES = {
	T1: { badgeBackground: '#EEF3FC', badgeColor: '#2C5F7F' },
	T2: { badgeBackground: '#F3EFFA', badgeColor: '#5B4A8B' },
	T3: { badgeBackground: '#E8F5EE', badgeColor: '#1A7A4A' },
};

const ACTION_STYLES = {
	urgent: {
		background: COLORS.redTint,
		color: COLORS.red,
		borderLeftColor: COLORS.red,
		cardBorderLeft: `3px solid ${COLORS.red}`,
	},
	warn: {
		background: '#FEF9EE',
		color: '#7a5a00',
		borderLeftColor: COLORS.gold,
		cardBorderLeft: `3px solid ${COLORS.gold}`,
	},
	ok: {
		background: COLORS.tealTint,
		color: COLORS.tealDeep,
		borderLeftColor: COLORS.teal,
		cardBorderLeft: `1px solid ${COLORS.border}`,
	},
};

const INITIAL_COLUMNS = [
	{
		id: 'new-leads',
		title: 'New Leads',
		headerBackground: '#F1EFE8',
		headerColor: '#667085',
		badgeBackground: '#98A2B3',
		displayCount: 3,
		cards: [
			{
				name: 'Marcus Johnson',
				initials: 'MJ',
				avatarColor: '#5B4A8B',
				tier: 'T2',
				meta: 'Referral · J. Crawford',
				action: 'Ashley link not sent — follow up now',
				actionTone: 'urgent',
				days: '2d',
				stuck: false,
			},
			{
				name: 'Rachel Torres',
				initials: 'RT',
				avatarColor: '#2C5F7F',
				tier: 'T1',
				meta: 'Google Ads · Self-employed',
				action: 'Ashley link sent · awaiting response',
				actionTone: 'ok',
				days: '1d',
				stuck: false,
			},
			{
				name: 'Brian Wallace',
				initials: 'BW',
				avatarColor: '#1A7A4A',
				tier: 'T3',
				meta: 'Katy Grand Opening · $400K+',
				action: 'Ashley link never sent — 6 days',
				actionTone: 'urgent',
				days: '6d',
				stuck: true,
			},
		],
		showAddLead: true,
	},
	{
		id: 'ashley-qualified',
		title: 'Ashley Qualified',
		headerBackground: '#FEF9EE',
		headerColor: '#7a5a00',
		badgeBackground: '#B8860B',
		displayCount: 2,
		subtitle: 'Book consultation',
		cards: [
			{
				name: 'Tina Brooks',
				initials: 'TB',
				avatarColor: '#B8860B',
				tier: 'T2',
				meta: 'Self-employed · $120K',
				action: 'Consultation not booked — follow up',
				actionTone: 'warn',
				days: '3d',
				stuck: false,
			},
			{
				name: 'Kevin Marsh',
				initials: 'KM',
				avatarColor: '#2C5F7F',
				tier: 'T1',
				meta: 'W-2 + Side Business',
				action: 'Consultation booked · Apr 18',
				actionTone: 'ok',
				days: '1d',
				stuck: false,
			},
		],
	},
	{
		id: 'intake-in-progress',
		title: 'Intake In Progress',
		headerBackground: COLORS.tealTint,
		headerColor: COLORS.tealDeep,
		badgeBackground: COLORS.teal,
		displayCount: 3,
		subtitle: 'Questionnaire + 1040 upload',
		cards: [
			{
				name: 'Sandra Kim',
				initials: 'SK',
				avatarColor: '#B8860B',
				tier: 'T2',
				meta: '80% Complete · 1040 Missing',
				action: '1040 not uploaded — send reminder',
				actionTone: 'warn',
				score: 41,
				scoreColor: COLORS.red,
				days: '5d',
				stuck: true,
			},
			{
				name: 'Lisa Nguyen',
				initials: 'LN',
				avatarColor: '#2C5F7F',
				tier: 'T2',
				meta: 'S-Corp · $185K',
				action: 'No contact in 9 days — churn risk',
				actionTone: 'urgent',
				score: 22,
				scoreColor: COLORS.red,
				days: '9d',
				stuck: true,
			},
			{
				name: 'Omar Patel',
				initials: 'OP',
				avatarColor: '#1A7A4A',
				tier: 'T3',
				meta: 'Business Owner · $320K',
				action: 'Questionnaire sent · awaiting',
				actionTone: 'ok',
				days: '1d',
				stuck: false,
			},
		],
	},
	{
		id: 'advisor-review',
		title: 'Advisor Review',
		headerBackground: COLORS.redTint,
		headerColor: COLORS.red,
		badgeBackground: COLORS.red,
		displayCount: 2,
		subtitle: 'Yvonne · Go / No-Go',
		cards: [
			{
				name: 'Priya Sharma',
				initials: 'PS',
				avatarColor: '#2F7D79',
				tier: 'T2',
				meta: 'MFJ · $158K',
				action: 'Go/No-Go decision needed today',
				actionTone: 'urgent',
				score: 54,
				scoreColor: COLORS.red,
				days: '2d',
				stuck: false,
			},
			{
				name: 'David Okonkwo',
				initials: 'DO',
				avatarColor: '#5B4A8B',
				tier: 'T3',
				meta: 'Multi-Income · Rental · Crypto',
				action: 'Review intake — high complexity',
				actionTone: 'ok',
				score: 38,
				scoreColor: COLORS.red,
				days: '1d',
				stuck: false,
			},
		],
	},
	{
		id: 'proposal-building',
		title: 'Proposal Building',
		headerBackground: '#F3EFFA',
		headerColor: '#5B4A8B',
		badgeBackground: '#5B4A8B',
		displayCount: 2,
		cards: [
			{
				name: 'James Park',
				initials: 'JP',
				avatarColor: '#2F7D79',
				tier: 'T2',
				meta: 'S-Corp · $210K · 3 Strategies',
				action: 'Proposal 90% done · pending review',
				actionTone: 'warn',
				score: 61,
				scoreColor: COLORS.gold,
				days: '4d',
				stuck: true,
			},
			{
				name: 'Angela Reeves',
				initials: 'AR',
				avatarColor: '#1A7A4A',
				tier: 'T3',
				meta: 'Business Owner · $390K',
				action: '2 strategies added · building',
				actionTone: 'ok',
				score: 45,
				scoreColor: COLORS.red,
				days: '2d',
				stuck: false,
			},
		],
	},
	{
		id: 'proposal-sent',
		title: 'Proposal Sent',
		headerBackground: '#EEF3FC',
		headerColor: '#2C5F7F',
		badgeBackground: '#2C5F7F',
		displayCount: 3,
		subtitle: 'Client reviewing',
		cards: [
			{
				name: 'Jordan Crawford',
				initials: 'JC',
				avatarColor: '#1A7A4A',
				tier: 'T3',
				meta: 'Opened 2× · Meeting Today 1PM',
				action: 'Proposal delivery call today',
				actionTone: 'ok',
				score: 68,
				scoreColor: COLORS.gold,
				days: '3d',
				stuck: false,
			},
			{
				name: 'Robert Chen',
				initials: 'RC',
				avatarColor: '#5B4A8B',
				tier: 'T1',
				meta: 'Not Opened · 10 Days',
				action: 'Proposal unopened — call today',
				actionTone: 'urgent',
				score: 79,
				scoreColor: '#1A7A4A',
				days: '10d',
				stuck: true,
			},
			{
				name: 'Nina Foster',
				initials: 'NF',
				avatarColor: '#B8860B',
				tier: 'T2',
				meta: 'Opened · Augusta Rule Question',
				action: 'Respond to Augusta Rule question',
				actionTone: 'ok',
				score: 55,
				scoreColor: COLORS.gold,
				days: '2d',
				stuck: false,
			},
		],
	},
	{
		id: 'active-subscribers',
		title: 'Active Subscribers',
		headerBackground: '#E8F5EE',
		headerColor: '#1A7A4A',
		badgeBackground: '#1A7A4A',
		displayCount: 8,
		subtitle: 'Strategies executing',
		cards: [
			{
				name: 'Carol Williams',
				initials: 'CW',
				avatarColor: '#1A7A4A',
				tier: 'T3',
				meta: '4 Strategies · Renews May 1',
				action: 'On track · check-in Apr 29',
				actionTone: 'ok',
				score: 84,
				scoreColor: '#1A7A4A',
				days: '45d',
				stuck: false,
			},
			{
				name: 'Diane Moore',
				initials: 'DM',
				avatarColor: '#B8860B',
				tier: 'T2',
				meta: 'Score Dropped ↓ · HSA Not Opened',
				action: 'Score dropped to 49 — review needed',
				actionTone: 'warn',
				score: 49,
				scoreColor: COLORS.red,
				days: '18d',
				stuck: true,
			},
		],
		summaryCard: {
			count: 6,
			label: '6 More Active Clients',
			meta: 'Avg FFS 71 · All On Track',
		},
	},
	{
		id: 'renewal-decision',
		title: 'Renewal Decision',
		headerBackground: COLORS.redTint,
		headerColor: COLORS.red,
		badgeBackground: COLORS.red,
		displayCount: 3,
		subtitle: 'Retain or churn',
		cards: [
			{
				name: 'Derek Wilson',
				initials: 'DW',
				avatarColor: '#C63D2F',
				tier: 'T2',
				meta: 'Overdue 14 Days · No Contact',
				action: 'Call today or mark as churned',
				actionTone: 'urgent',
				score: 58,
				scoreColor: COLORS.gold,
				days: '14d',
				stuck: true,
			},
			{
				name: 'Melissa Grant',
				initials: 'MG',
				avatarColor: '#2C5F7F',
				tier: 'T1',
				meta: 'Renewal Apr 20 · 5 Days',
				action: 'Send renewal reminder + progress',
				actionTone: 'warn',
				score: 72,
				scoreColor: COLORS.gold,
				days: '5d',
				stuck: true,
			},
			{
				name: 'Henry Ellis',
				initials: 'HE',
				avatarColor: '#1A7A4A',
				tier: 'T3',
				meta: 'FFS 91 · Freedom Tier',
				action: 'Strong renewal · ask for referral',
				actionTone: 'ok',
				score: 91,
				scoreColor: '#1A7A4A',
				days: '8d',
				stuck: false,
			},
		],
	},
];

function matchesFilter(card, activeFilter) {
	if (activeFilter === 'All') {
		return true;
	}

	if (activeFilter === 'Needs Action') {
		return card.actionTone === 'urgent' || card.actionTone === 'warn';
	}

	return card.tier === activeFilter;
}

function matchesSearch(card, searchValue) {
	if (!searchValue.trim()) {
		return true;
	}

	const query = searchValue.toLowerCase();
	return [card.name, card.meta, card.action].some((value) => value.toLowerCase().includes(query));
}

function PipelineCard({ card, onClick }) {
	const tierStyle = TIER_STYLES[card.tier] || TIER_STYLES.T1;
	const actionStyle = ACTION_STYLES[card.actionTone] || ACTION_STYLES.ok;
	const daysColor = card.stuck ? COLORS.red : COLORS.textMuted;

	return (
		<div
			onClick={onClick}
			className="rounded-xl border bg-white p-3 transition"
			style={{
				borderColor: COLORS.border,
				borderLeft: actionStyle.cardBorderLeft,
				boxShadow: cardShadow,
				cursor: 'pointer',
			}}
		>
			<div className="mb-2 flex flex-wrap items-start justify-between gap-2">
				<div className="flex min-w-0 items-center gap-2">
					<div
						className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-[11px] font-bold text-white"
						style={{ background: card.avatarColor }}
					>
						{card.initials}
					</div>
					<span className="min-w-0 wrap-break-word text-[12.5px] font-bold" style={{ color: COLORS.text }}>
						{card.name}
					</span>
				</div>
				<span
					className="shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-extrabold"
					style={{ background: tierStyle.badgeBackground, color: tierStyle.badgeColor, letterSpacing: '0.04em' }}
				>
					{card.tier}
				</span>
			</div>

			<div className="mb-2 flex flex-wrap items-center gap-1.5" style={{ color: COLORS.textMuted }}>
				<span className="text-[10px] font-semibold">{card.meta}</span>
			</div>

			<div
				className="mb-1.5 rounded-md border-l-2 px-2 py-1.25 text-[11px]"
				style={{
					background: actionStyle.background,
					color: actionStyle.color,
					borderLeftColor: actionStyle.borderLeftColor,
					lineHeight: 1.4,
				}}
			>
				{card.action}
			</div>

			<div className="flex flex-wrap items-center justify-between gap-2">
				{typeof card.score === 'number' ? (
					<div className="flex items-center gap-1.25">
						<div className="h-0.75 w-10 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
							<div
								className="h-full rounded-full"
								style={{ background: card.scoreColor, width: `${card.score}%` }}
							></div>
						</div>
						<span className="text-[11px] font-extrabold" style={{ color: card.scoreColor }}>
							{card.score}
						</span>
					</div>
				) : (
					<span className="text-[11px] font-extrabold" style={{ color: COLORS.textMuted }}>
						No score
					</span>
				)}

				<span className="text-[10px] font-bold" style={{ color: daysColor }}>
					{card.days}
				</span>
			</div>
		</div>
	);
}

export default function PipelineBoardScreen({ onOpenClientWorkspace }) {
	const [activeFilter, setActiveFilter] = useState('All');
	const [searchValue, setSearchValue] = useState('');
	const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
	const [leadForm, setLeadForm] = useState({
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
		annualIncome: '',
		leadSource: '',
		tier: '',
		entityType: '',
		notes: '',
	});
	const [columns, setColumns] = useState(INITIAL_COLUMNS);

	const resetLeadForm = () => {
		setLeadForm({
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			annualIncome: '',
			leadSource: '',
			tier: '',
			entityType: '',
			notes: '',
		});
	};

	const handleOpenAddLead = () => setIsAddLeadOpen(true);

	const handleCloseAddLead = () => {
		setIsAddLeadOpen(false);
		resetLeadForm();
	};

	const handleLeadSubmit = () => {
		const firstName = leadForm.firstName.trim();
		const lastName = leadForm.lastName.trim();

		if (!firstName || !lastName) {
			return;
		}

		const name = `${firstName} ${lastName}`;
		const tier = leadForm.tier || 'T1';
		const initials = `${firstName[0] || ''}${lastName[0] || ''}`.toUpperCase();
		const incomeValue = leadForm.annualIncome || 'Income TBD';
		const sourceValue = leadForm.leadSource || 'Source TBD';
		const tierColor = tier === 'T1' ? '#2C5F7F' : tier === 'T2' ? '#5B4A8B' : '#1A7A4A';

		const newCard = {
			name,
			initials,
			avatarColor: tierColor,
			tier,
			meta: `${incomeValue} · ${sourceValue}`,
			action: 'Just added · send Ashley qualification link',
			actionTone: 'ok',
			days: '0d',
			stuck: false,
		};

		setColumns((prevColumns) =>
			prevColumns.map((column) => {
				if (column.id !== 'new-leads') {
					return column;
				}

				return {
					...column,
					displayCount: column.displayCount + 1,
					cards: [newCard, ...column.cards],
				};
			}),
		);

		handleCloseAddLead();
	};

	const totalCount = columns.reduce((sum, column) => sum + column.displayCount, 0);

	const openClientWorkspace = (card, column) => {
		if (!onOpenClientWorkspace) {
			return;
		}

		onOpenClientWorkspace({
			name: card.name,
			initials: card.initials,
			tier: card.tier,
			stage: column.title,
			status: card.action,
			score: typeof card.score === 'number' ? card.score : null,
			avatarColor: card.avatarColor,
			meta: card.meta,
			days: card.days,
			actionTone: card.actionTone,
		});
	};

	return (
		<div className="flex h-full flex-col" style={{ background: COLORS.bg }}>
			<div
				className="flex flex-col gap-3 border-b px-4 py-3 sm:px-5 lg:flex-row lg:flex-wrap lg:items-center lg:gap-2 lg:py-2.5"
				style={{ background: COLORS.card, borderBottomColor: COLORS.border }}
			>
				<div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center lg:w-auto lg:flex-1 lg:flex-row lg:gap-2">
					<div className="relative w-full sm:flex-1 lg:max-w-50 lg:flex-none">
					<Search
						className="absolute left-2.25 top-1/2 h-3.25 w-3.25 -translate-y-1/2"
						style={{ color: COLORS.textMuted }}
					/>
					<input
						value={searchValue}
						onChange={(event) => setSearchValue(event.target.value)}
						placeholder="Search clients…"
						className="w-full rounded-lg border px-2.5 py-1.5 pl-7 text-[12.5px] outline-none"
						style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.text }}
					/>
				</div>

					<div className="hidden h-4.5 w-px lg:block" style={{ background: COLORS.border }}></div>

					<div className="flex flex-wrap gap-2">
						{FILTERS.map((filter) => {
							const isActive = activeFilter === filter;

							return (
								<button
									key={filter}
									onClick={() => setActiveFilter(filter)}
									className="rounded-lg border-[1.5px] px-3 py-1.25 text-xs font-semibold transition"
									style={{
										background: isActive ? COLORS.redTint : COLORS.card,
										borderColor: isActive ? COLORS.red : COLORS.border,
										color: isActive ? COLORS.red : COLORS.textSec,
										fontWeight: isActive ? 700 : 600,
									}}
								>
									{filter}
								</button>
							);
						})}
					</div>
				</div>

				<div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:ml-auto lg:w-auto lg:flex-row lg:items-center lg:gap-3">
					<span className="text-xs leading-5" style={{ color: COLORS.textMuted }}>
						<strong style={{ color: COLORS.text }}>8</strong> need action &nbsp;·&nbsp;{' '}
						<strong style={{ color: COLORS.text }}>3</strong> renewals due &nbsp;·&nbsp;{' '}
						<strong style={{ color: COLORS.text }}>{totalCount}</strong> total
					</span>
					<button
						onClick={handleOpenAddLead}
						className="inline-flex w-full items-center justify-center gap-1.5 rounded-[9px] border-none px-4 py-1.75 text-xs font-bold text-white sm:w-auto"
						style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.25),0 1px 3px rgba(198,61,47,.15)' }}
					>
						<Plus className="h-2.75 w-2.75" strokeWidth={2.5} />
						Add Lead
					</button>
				</div>
			</div>

			<div className="flex-1 overflow-y-auto px-4 pb-5 pt-4 sm:px-5">
				<div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-start lg:gap-3 lg:overflow-x-auto lg:overflow-y-hidden">
				{columns.map((column) => {
					const filteredCards = column.cards.filter(
						(card) => matchesFilter(card, activeFilter) && matchesSearch(card, searchValue),
					);

					return (
						<div key={column.id} className="flex w-full flex-col lg:max-h-full lg:w-60 lg:shrink-0">
							<div className="rounded-t-xl px-3 py-2.5" style={{ background: column.headerBackground }}>
								<div className="mb-1.5 flex items-center justify-between">
									<span className="text-[12.5px] font-bold" style={{ color: column.headerColor }}>
										{column.title}
									</span>
									<span
										className="rounded-full px-2 py-0.5 text-[10px] font-extrabold text-white"
										style={{ background: column.badgeBackground }}
									>
										{column.displayCount}
									</span>
								</div>
								{column.subtitle && (
									<div className="text-[11px]" style={{ color: COLORS.textMuted }}>
										{column.subtitle}
									</div>
								)}
							</div>

							<div className="flex min-h-20 flex-1 flex-col gap-2 py-2.5 lg:overflow-y-auto">
								{filteredCards.map((card) => (
									<PipelineCard
										key={`${column.id}-${card.name}`}
										card={card}
										onClick={() => openClientWorkspace(card, column)}
									/>
								))}

								{column.id === 'active-subscribers' && activeFilter === 'All' && !searchValue.trim() && column.summaryCard && (
									<div
										className="rounded-xl border bg-white p-3"
										style={{ borderColor: COLORS.border, boxShadow: cardShadow, opacity: 0.7 }}
									>
										<div className="mb-2 flex items-center gap-2">
											<div
												className="flex h-7.5 w-7.5 items-center justify-center rounded-full text-[10px] font-bold text-white"
												style={{ background: COLORS.textMuted }}
											>
												+{column.summaryCard.count}
											</div>
											<span className="text-[12.5px] font-bold" style={{ color: COLORS.textMuted }}>
												{column.summaryCard.label}
											</span>
										</div>
										<div className="text-[10px] font-semibold" style={{ color: COLORS.textMuted }}>
											{column.summaryCard.meta}
										</div>
									</div>
								)}

								{column.showAddLead && (
									<button
										onClick={handleOpenAddLead}
										className="mt-0.5 flex items-center justify-center gap-1.5 rounded-[10px] border-[1.5px] border-dashed px-2 py-2 text-xs"
										style={{ background: 'transparent', borderColor: COLORS.border, color: COLORS.textMuted }}
									>
										<Plus className="h-3 w-3" strokeWidth={2.5} />
										Add Lead
									</button>
								)}
							</div>
						</div>
					);
				})}
				</div>
			</div>

			{isAddLeadOpen && (
				<div
					className="fixed inset-0 z-200 flex items-center justify-center"
					style={{ background: 'rgba(28,43,58,.5)' }}
					onClick={(event) => {
						if (event.target === event.currentTarget) {
							handleCloseAddLead();
						}
					}}
				>
					<div
						className="max-h-[88vh] w-[calc(100vw-24px)] max-w-125 overflow-y-auto rounded-[18px] sm:w-[calc(100vw-40px)]"
						style={{ background: COLORS.card, boxShadow: '0 24px 60px rgba(0,0,0,.25)' }}
					>
						<div
							className="flex items-center justify-between border-b px-6 pb-4 pt-5"
							style={{ borderBottomColor: COLORS.border }}
						>
							<div className="text-[17px] font-bold" style={{ color: COLORS.text }}>
								Add New Lead
							</div>
							<button
								onClick={handleCloseAddLead}
								className="flex h-7 w-7 items-center justify-center rounded-lg border text-lg"
								style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.textMuted }}
							>
								×
							</button>
						</div>

						<div className="px-4 py-5 sm:px-6">
							<div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
								<div>
									<label className="mb-1.25 block text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
										First Name *
									</label>
									<input
										value={leadForm.firstName}
										onChange={(event) => setLeadForm((prev) => ({ ...prev, firstName: event.target.value }))}
										placeholder="First name"
										className="w-full rounded-[10px] border px-3 py-2.25 text-[13px] outline-none"
										style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.text }}
									/>
								</div>
								<div>
									<label className="mb-1.25 block text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
										Last Name *
									</label>
									<input
										value={leadForm.lastName}
										onChange={(event) => setLeadForm((prev) => ({ ...prev, lastName: event.target.value }))}
										placeholder="Last name"
										className="w-full rounded-[10px] border px-3 py-2.25 text-[13px] outline-none"
										style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.text }}
									/>
								</div>
							</div>

							<div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
								<div>
									<label className="mb-1.25 block text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
										Email
									</label>
									<input
										value={leadForm.email}
										onChange={(event) => setLeadForm((prev) => ({ ...prev, email: event.target.value }))}
										placeholder="email@example.com"
										className="w-full rounded-[10px] border px-3 py-2.25 text-[13px] outline-none"
										style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.text }}
									/>
								</div>
								<div>
									<label className="mb-1.25 block text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
										Phone
									</label>
									<input
										value={leadForm.phone}
										onChange={(event) => setLeadForm((prev) => ({ ...prev, phone: event.target.value }))}
										placeholder="(555) 000-0000"
										className="w-full rounded-[10px] border px-3 py-2.25 text-[13px] outline-none"
										style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.text }}
									/>
								</div>
							</div>

							<div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
								<div>
									<label className="mb-1.25 block text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
										Annual Income
									</label>
									<select
										value={leadForm.annualIncome}
										onChange={(event) => setLeadForm((prev) => ({ ...prev, annualIncome: event.target.value }))}
										className="w-full cursor-pointer rounded-[10px] border px-3 py-2.25 text-[13px] outline-none"
										style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.text }}
									>
										<option value="">Select range…</option>
										<option>Under $50K</option>
										<option>$50K–$100K</option>
										<option>$100K–$200K</option>
										<option>$200K–$400K</option>
										<option>$400K+</option>
									</select>
								</div>
								<div>
									<label className="mb-1.25 block text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
										Lead Source
									</label>
									<select
										value={leadForm.leadSource}
										onChange={(event) => setLeadForm((prev) => ({ ...prev, leadSource: event.target.value }))}
										className="w-full cursor-pointer rounded-[10px] border px-3 py-2.25 text-[13px] outline-none"
										style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.text }}
									>
										<option value="">Select…</option>
										<option>Referral</option>
										<option>Google Ads</option>
										<option>Event</option>
										<option>Website</option>
										<option>Social Media</option>
										<option>Walk-in</option>
										<option>Other</option>
									</select>
								</div>
							</div>

							<div className="mb-3.5 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
								<div>
									<label className="mb-1.25 block text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
										Tier Estimate
									</label>
									<select
										value={leadForm.tier}
										onChange={(event) => setLeadForm((prev) => ({ ...prev, tier: event.target.value }))}
										className="w-full cursor-pointer rounded-[10px] border px-3 py-2.25 text-[13px] outline-none"
										style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.text }}
									>
										<option value="">Select tier…</option>
										<option value="T1">T1 · Starter</option>
										<option value="T2">T2 · Planner</option>
										<option value="T3">T3 · Advisor</option>
									</select>
								</div>
								<div>
									<label className="mb-1.25 block text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
										Entity Type
									</label>
									<select
										value={leadForm.entityType}
										onChange={(event) => setLeadForm((prev) => ({ ...prev, entityType: event.target.value }))}
										className="w-full cursor-pointer rounded-[10px] border px-3 py-2.25 text-[13px] outline-none"
										style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.text }}
									>
										<option value="">Select…</option>
										<option>Sole Proprietor</option>
										<option>Single-Member LLC</option>
										<option>S-Corp</option>
										<option>C-Corp</option>
										<option>W-2 Employee</option>
									</select>
								</div>
							</div>

							<div className="mb-5">
								<label className="mb-1.25 block text-[10px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}>
									Notes
								</label>
								<textarea
									value={leadForm.notes}
									onChange={(event) => setLeadForm((prev) => ({ ...prev, notes: event.target.value }))}
									placeholder="Any context about this lead…"
									className="min-h-17.5 w-full resize-y rounded-[10px] border px-3 py-2.25 text-[13px] outline-none"
									style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.text, lineHeight: 1.5 }}
								></textarea>
							</div>

							<div className="flex flex-col gap-2.5 sm:flex-row">
								<button
									onClick={handleCloseAddLead}
									className="flex-1 rounded-[10px] border-[1.5px] px-4 py-2.5 text-[13px] font-bold"
									style={{ background: COLORS.bg, borderColor: COLORS.border, color: COLORS.textSec }}
								>
									Cancel
								</button>
								<button
									onClick={handleLeadSubmit}
									className="rounded-[10px] px-4 py-2.5 text-[13px] font-bold text-white sm:flex-2"
									style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.25),0 1px 3px rgba(198,61,47,.15)' }}
								>
									Add Lead To Pipeline
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}