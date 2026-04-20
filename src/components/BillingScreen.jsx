import React, { useEffect, useMemo, useState } from 'react';
import { COLORS, cardShadow } from './tatcaresShared';

const ADVISOR_COLORS = {
	'Yvonne Hollis-Cobb': COLORS.teal,
	'David Reyes': '#5B4A8B',
	'Priya Shankar': '#B8860B',
};

const TIER_META = {
	T1: { label: 'Starter', mrr: 349, bg: '#EEF3FC', color: '#2C5F7F' },
	T2: { label: 'Planner', mrr: 349, bg: '#F3EFFA', color: '#5B4A8B' },
	T3: { label: 'Advisor', mrr: 499, bg: '#E8F5EE', color: COLORS.green },
};

const INITIAL_BILLING = [
	{ id: 1, name: 'Jordan Crawford', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', tier: 'T3', ffs: 68, status: 'active', mrr: 499, renewal: 'Jun 1, 2026', lastPaid: 'Mar 1, 2026', daysOverdue: 0, quarters: 4, notes: 'Top client. Referred 2 leads.' },
	{ id: 2, name: 'Henry Ellis', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', tier: 'T3', ffs: 91, status: 'active', mrr: 499, renewal: 'Jun 15, 2026', lastPaid: 'Mar 15, 2026', daysOverdue: 0, quarters: 5, notes: 'FFS 91. Very engaged.' },
	{ id: 3, name: 'Carol Williams', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', tier: 'T3', ffs: 84, status: 'active', mrr: 499, renewal: 'May 1, 2026', lastPaid: 'Feb 1, 2026', daysOverdue: 0, quarters: 3, notes: '' },
	{ id: 4, name: 'Robert Chen', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', tier: 'T1', ffs: 79, status: 'active', mrr: 349, renewal: 'May 10, 2026', lastPaid: 'Feb 10, 2026', daysOverdue: 0, quarters: 2, notes: '' },
	{ id: 5, name: 'Nina Foster', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', tier: 'T2', ffs: 55, status: 'active', mrr: 349, renewal: 'May 20, 2026', lastPaid: 'Feb 20, 2026', daysOverdue: 0, quarters: 2, notes: '' },
	{ id: 6, name: 'Derek Wilson', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', tier: 'T2', ffs: 58, status: 'overdue', mrr: 349, renewal: 'Mar 1, 2026', lastPaid: 'Dec 1, 2025', daysOverdue: 45, quarters: 3, notes: '3rd reminder sent. Last contact Apr 1.' },
	{ id: 7, name: 'Melissa Grant', advisor: 'Priya Shankar', location: 'Katy', tier: 'T1', ffs: 72, status: 'renewal', mrr: 349, renewal: 'Apr 20, 2026', lastPaid: 'Jan 20, 2026', daysOverdue: 0, quarters: 2, notes: 'Renewal Apr 20. Strong FFS progress.' },
	{ id: 8, name: 'Diane Moore', advisor: 'David Reyes', location: 'Downtown Houston', tier: 'T2', ffs: 49, status: 'renewal', mrr: 349, renewal: 'May 15, 2026', lastPaid: 'Feb 15, 2026', daysOverdue: 0, quarters: 3, notes: 'FFS dropped. Advisor flagged.' },
	{ id: 9, name: 'James Park', advisor: 'Priya Shankar', location: 'Downtown Houston', tier: 'T2', ffs: 61, status: 'active', mrr: 349, renewal: 'Jun 5, 2026', lastPaid: 'Mar 5, 2026', daysOverdue: 0, quarters: 2, notes: '' },
	{ id: 10, name: 'Angela Reeves', advisor: 'Priya Shankar', location: 'Downtown Houston', tier: 'T3', ffs: 45, status: 'active', mrr: 499, renewal: 'Jun 10, 2026', lastPaid: 'Mar 10, 2026', daysOverdue: 0, quarters: 2, notes: '' },
	{ id: 11, name: 'Carla Reyes', advisor: 'Priya Shankar', location: 'Pearland', tier: 'T2', ffs: 63, status: 'active', mrr: 349, renewal: 'May 30, 2026', lastPaid: 'Feb 28, 2026', daysOverdue: 0, quarters: 1, notes: 'New subscriber - Q1 first quarter.' },
	{ id: 12, name: 'David Okonkwo', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', tier: 'T3', ffs: 38, status: 'active', mrr: 499, renewal: 'Jun 20, 2026', lastPaid: 'Mar 20, 2026', daysOverdue: 0, quarters: 1, notes: '' },
	{ id: 13, name: 'Priya Sharma', advisor: 'Priya Shankar', location: 'Katy', tier: 'T2', ffs: 54, status: 'active', mrr: 349, renewal: 'Jun 18, 2026', lastPaid: 'Mar 18, 2026', daysOverdue: 0, quarters: 1, notes: 'Recently onboarded.' },
	{ id: 14, name: 'Thomas Wren', advisor: 'David Reyes', location: 'Downtown Houston', tier: 'T2', ffs: 77, status: 'paused', mrr: 349, renewal: 'N/A', lastPaid: 'Jan 5, 2026', daysOverdue: 0, quarters: 4, notes: 'Paused Apr 2026. Will revisit Q3.' },
	{ id: 15, name: 'Kevin Marsh', advisor: 'David Reyes', location: 'Downtown Houston', tier: 'T1', ffs: 77, status: 'active', mrr: 349, renewal: 'Jun 25, 2026', lastPaid: 'Mar 25, 2026', daysOverdue: 0, quarters: 1, notes: 'Recently activated post-consultation.' },
	{ id: 16, name: 'Jordan Crawford (Pearland)', advisor: 'Priya Shankar', location: 'Pearland', tier: 'T3', ffs: 68, status: 'renewal', mrr: 499, renewal: 'Apr 15, 2026', lastPaid: 'Jan 15, 2026', daysOverdue: 0, quarters: 3, notes: 'Renewal due now.' },
	{ id: 17, name: 'Diane Moore (Legacy)', advisor: 'David Reyes', location: 'Downtown Houston', tier: 'T1', ffs: 41, status: 'overdue', mrr: 349, renewal: 'Mar 20, 2026', lastPaid: 'Dec 20, 2025', daysOverdue: 26, quarters: 2, notes: 'Second overdue notice sent.' },
	{ id: 18, name: 'Carla Nguyen', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', tier: 'T2', ffs: 0, status: 'churned', mrr: 0, renewal: 'N/A', lastPaid: 'Dec 10, 2025', daysOverdue: 0, quarters: 2, notes: 'Churned Jan 2026. Non-responsive.' },
];

function parseRenewalDate(value) {
	if (!value || value === 'N/A') return new Date('2099-01-01');
	const parsed = new Date(value);
	return Number.isNaN(parsed.getTime()) ? new Date('2099-01-01') : parsed;
}

function statusMeta(status, daysOverdue) {
	if (status === 'active') return { label: 'Active', bg: '#E8F5EE', color: COLORS.green };
	if (status === 'overdue') return { label: `Overdue ${daysOverdue}d`, bg: COLORS.redTint, color: COLORS.red };
	if (status === 'renewal') return { label: 'Renewal Due', bg: '#FEF9EE', color: '#7A5A00' };
	if (status === 'paused') return { label: 'Paused', bg: COLORS.bg, color: COLORS.textMuted, border: COLORS.border };
	if (status === 'payment_failed') return { label: 'Payment Failed', bg: COLORS.redTint, color: COLORS.red };
	if (status === 'pending') return { label: 'Pending Payment', bg: '#FEF9EE', color: '#7A5A00' };
	return { label: 'Churned', bg: '#F1F0EF', color: COLORS.textMuted };
}

function formatMoney(amount) {
	return `$${amount.toLocaleString()}`;
}

export default function BillingScreen({ onScreenChange }) {
	const [billingRows, setBillingRows] = useState(INITIAL_BILLING);
	const [search, setSearch] = useState('');
	const [filterAdvisor, setFilterAdvisor] = useState('');
	const [filterLocation, setFilterLocation] = useState('');
	const [filterStatus, setFilterStatus] = useState('');
	const [filterTier, setFilterTier] = useState('');
	const [sort, setSort] = useState('name');
	const [viewAll, setViewAll] = useState(false);
	const [activeBillingId, setActiveBillingId] = useState(null);
	const [noteDraft, setNoteDraft] = useState('');

	const advisorOptions = useMemo(() => Array.from(new Set(billingRows.map((b) => b.advisor))).sort((a, b) => a.localeCompare(b)), [billingRows]);
	const locationOptions = useMemo(() => Array.from(new Set(billingRows.map((b) => b.location))).sort((a, b) => a.localeCompare(b)), [billingRows]);

	const filteredRows = useMemo(() => {
		const query = search.trim().toLowerCase();
		const filtered = billingRows.filter((row) => {
			if (query && !row.name.toLowerCase().includes(query)) return false;
			if (filterAdvisor && row.advisor !== filterAdvisor) return false;
			if (filterLocation && row.location !== filterLocation) return false;
			if (filterStatus && row.status !== filterStatus) return false;
			if (filterTier && row.tier !== filterTier) return false;
			return true;
		});

		return [...filtered].sort((a, b) => {
			if (sort === 'name') return a.name.localeCompare(b.name);
			if (sort === 'renewal') return parseRenewalDate(a.renewal) - parseRenewalDate(b.renewal);
			if (sort === 'overdue') return b.daysOverdue - a.daysOverdue;
			if (sort === 'mrr-desc') return b.mrr - a.mrr;
			if (sort === 'ffs-desc') return b.ffs - a.ffs;
			return 0;
		});
	}, [billingRows, search, filterAdvisor, filterLocation, filterStatus, filterTier, sort]);

	const stats = useMemo(() => {
		const active = filteredRows.filter((r) => r.status === 'active').length;
		const overdueRows = filteredRows.filter((r) => r.status === 'overdue');
		const renewal = filteredRows.filter((r) => r.status === 'renewal').length;
		const churned = filteredRows.filter((r) => r.status === 'churned' || r.status === 'paused').length;
		const mrr = filteredRows.reduce((sum, row) => sum + row.mrr, 0);
		const overdueAmount = overdueRows.reduce((sum, row) => sum + row.mrr, 0);
		const activePct = filteredRows.length > 0 ? Math.round((active / filteredRows.length) * 100) : 0;
		return {
			mrr,
			active,
			overdueCount: overdueRows.length,
			overdueAmount,
			renewal,
			churned,
			activePct,
		};
	}, [filteredRows]);

	const activeBilling = useMemo(() => {
		if (!activeBillingId) return null;
		return billingRows.find((row) => row.id === activeBillingId) || null;
	}, [activeBillingId, billingRows]);

	useEffect(() => {
		setNoteDraft(activeBilling?.notes || '');
	}, [activeBilling]);

	const saveNote = () => {
		if (!activeBilling) return;
		setBillingRows((prev) => prev.map((row) => (row.id === activeBilling.id ? { ...row, notes: noteDraft } : row)));
	};

	const openEmailTab = () => {
		if (onScreenChange) onScreenChange('email');
	};

	return (
		<div className="flex min-h-full flex-col" style={{ background: COLORS.bg }}>
			<div className="flex min-h-0 flex-1 flex-col overflow-visible lg:overflow-hidden xl:flex-row">
				<div className="flex min-h-0 flex-1 flex-col overflow-visible xl:overflow-hidden">
					<div className="flex flex-wrap items-center gap-2 border-b bg-white px-4 py-2.5 sm:px-5" style={{ borderColor: COLORS.border }}>
						<div className="relative w-full sm:w-auto sm:min-w-47.5">
							<input
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search clients..."
								className="w-full rounded-lg border py-1.5 pl-7 pr-2.5 text-[12.5px] outline-none"
								style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.text }}
							/>
							<svg className="absolute left-2 top-1/2 h-3.25 w-3.25 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke={COLORS.textMuted} strokeWidth="2">
								<circle cx="11" cy="11" r="8" />
								<line x1="21" y1="21" x2="16.65" y2="16.65" />
							</svg>
						</div>

						<select value={filterAdvisor} onChange={(e) => setFilterAdvisor(e.target.value)} className="w-full rounded-lg border px-2.5 py-1.5 text-[12.5px] sm:w-auto" style={{ borderColor: COLORS.border }}>
							<option value="">All Advisors</option>
							{advisorOptions.map((advisor) => (
								<option key={advisor} value={advisor}>{advisor}</option>
							))}
						</select>

						<select value={filterLocation} onChange={(e) => setFilterLocation(e.target.value)} className="w-full rounded-lg border px-2.5 py-1.5 text-[12.5px] sm:w-auto" style={{ borderColor: COLORS.border }}>
							<option value="">All Locations</option>
							{locationOptions.map((location) => (
								<option key={location} value={location}>{location}</option>
							))}
						</select>

						<select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="w-full rounded-lg border px-2.5 py-1.5 text-[12.5px] sm:w-auto" style={{ borderColor: COLORS.border }}>
							<option value="">All Statuses</option>
							<option value="active">Active</option>
							<option value="overdue">Overdue</option>
							<option value="renewal">Renewal Due</option>
							<option value="paused">Paused</option>
							<option value="churned">Churned</option>
							<option value="payment_failed">Payment Failed</option>
							<option value="pending">Pending Payment</option>
						</select>

						<select value={filterTier} onChange={(e) => setFilterTier(e.target.value)} className="w-full rounded-lg border px-2.5 py-1.5 text-[12.5px] sm:w-auto" style={{ borderColor: COLORS.border }}>
							<option value="">All Tiers</option>
							<option value="T1">T1</option>
							<option value="T2">T2</option>
							<option value="T3">T3</option>
						</select>

						<select value={sort} onChange={(e) => setSort(e.target.value)} className="w-full rounded-lg border px-2.5 py-1.5 text-[12.5px] sm:w-auto" style={{ borderColor: COLORS.border }}>
							<option value="name">Sort: Name A-Z</option>
							<option value="renewal">Sort: Renewal Date</option>
							<option value="overdue">Sort: Days Overdue</option>
							<option value="mrr-desc">Sort: MRR High-Low</option>
							<option value="ffs-desc">Sort: FFS High-Low</option>
						</select>

						<div className="ml-auto flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end">
							<span className="text-xs" style={{ color: COLORS.textMuted }}>
								<strong style={{ color: COLORS.text }}>{filteredRows.length}</strong> clients · <strong style={{ color: COLORS.green }}>{formatMoney(stats.mrr)}</strong> qtrly
							</span>
							<label className="flex items-center gap-2 rounded-lg border px-2 py-1 text-[12px]" style={{ borderColor: COLORS.border, color: COLORS.textSec }}>
								<input type="checkbox" checked={viewAll} onChange={(e) => setViewAll(e.target.checked)} style={{ accentColor: COLORS.teal }} />
								View all clients (read only)
							</label>
						</div>
					</div>

					<div className="bg-[#F7F5F2] px-4 pb-4 pt-4 sm:px-5">
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
							<div className="rounded-2xl border bg-white p-4" style={{ borderColor: COLORS.border, boxShadow: cardShadow }}>
								<div className="text-[30px] font-extrabold leading-none tracking-[-0.04em]" style={{ color: COLORS.navy }}>{formatMoney(stats.mrr)}</div>
								<div className="mt-1 text-xs font-semibold" style={{ color: COLORS.textMuted }}>Quarterly MRR</div>
								<div className="mt-1 text-[11px] font-semibold" style={{ color: COLORS.green }}>Current filtered view</div>
							</div>

							<div className="rounded-2xl border bg-white p-4" style={{ borderColor: COLORS.border, boxShadow: cardShadow }}>
								<div className="text-[30px] font-extrabold leading-none tracking-[-0.04em]" style={{ color: COLORS.teal }}>{stats.active}</div>
								<div className="mt-1 text-xs font-semibold" style={{ color: COLORS.textMuted }}>Active Subscribers</div>
								<div className="mt-2 h-1 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
									<div className="h-full rounded-full" style={{ width: `${stats.activePct}%`, background: COLORS.teal }}></div>
								</div>
							</div>

							<div className="rounded-2xl border bg-white p-4" style={{ borderColor: COLORS.border, boxShadow: cardShadow }}>
								<div className="text-[30px] font-extrabold leading-none tracking-[-0.04em]" style={{ color: COLORS.red }}>{stats.overdueCount}</div>
								<div className="mt-1 text-xs font-semibold" style={{ color: COLORS.textMuted }}>Overdue Invoices</div>
								<div className="mt-1 text-[11px] font-semibold" style={{ color: COLORS.red }}>{formatMoney(stats.overdueAmount)} at risk</div>
							</div>

							<div className="rounded-2xl border bg-white p-4" style={{ borderColor: COLORS.border, boxShadow: cardShadow }}>
								<div className="text-[30px] font-extrabold leading-none tracking-[-0.04em]" style={{ color: COLORS.gold }}>{stats.renewal}</div>
								<div className="mt-1 text-xs font-semibold" style={{ color: COLORS.textMuted }}>Renewals This Month</div>
								<div className="mt-1 text-[11px] font-semibold" style={{ color: COLORS.gold }}>Needs outreach sequence</div>
							</div>

							<div className="rounded-2xl border bg-white p-4" style={{ borderColor: COLORS.border, boxShadow: cardShadow }}>
								<div className="text-[30px] font-extrabold leading-none tracking-[-0.04em]" style={{ color: '#5B4A8B' }}>{stats.churned}</div>
								<div className="mt-1 text-xs font-semibold" style={{ color: COLORS.textMuted }}>Churned / Paused</div>
								<div className="mt-1 text-[11px] font-semibold" style={{ color: COLORS.textMuted }}>This quarter</div>
							</div>
						</div>
					</div>

					<div className="min-h-0 flex-1 overflow-y-auto bg-[#F7F5F2] px-4 pb-4 sm:px-5">
						<div className="overflow-hidden rounded-2xl border bg-white" style={{ borderColor: COLORS.border, boxShadow: cardShadow }}>
							<div className="hidden border-b px-5 py-2.5 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_1.1fr_1.1fr_0.9fr] md:gap-2" style={{ borderColor: '#F2EEE8' }}>
								{['Client', 'Advisor', 'Plan', 'MRR', 'Renewal', 'Status', 'Actions'].map((heading) => (
									<div key={heading} className="text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted }}>{heading}</div>
								))}
							</div>

							<div className="divide-y" style={{ borderColor: '#F2EEE8' }}>
								{filteredRows.map((row) => {
									const tier = TIER_META[row.tier];
									const status = statusMeta(row.status, row.daysOverdue);
									const initials = row.name.split(' ').map((part) => part[0]).join('').slice(0, 2);
									const advisorInitials = row.advisor.split(' ').map((part) => part[0]).join('').slice(0, 2);
									const advisorColor = ADVISOR_COLORS[row.advisor] || COLORS.textMuted;
									const rowBg = row.status === 'overdue' ? 'rgba(198,61,47,.03)' : COLORS.card;

									return (
										<div key={row.id} className="cursor-pointer px-4 py-3 transition hover:bg-[#FAFAF8] md:px-5" style={{ background: rowBg }} onClick={() => setActiveBillingId(row.id)}>
											<div className="grid gap-3 md:hidden">
												<div className="flex items-center justify-between gap-3">
													<div className="flex items-center gap-2.5">
														<div className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-extrabold text-white" style={{ background: tier.color }}>{initials}</div>
														<div>
															<div className="text-[13px] font-bold" style={{ color: COLORS.text }}>{row.name}</div>
															<div className="text-[11px]" style={{ color: COLORS.textMuted }}>{row.location}</div>
														</div>
													</div>
													<div className="text-right">
														<div className="text-[14px] font-extrabold" style={{ color: COLORS.text }}>{formatMoney(row.mrr)}</div>
														<div className="text-[10px]" style={{ color: COLORS.textMuted }}>per quarter</div>
													</div>
												</div>
												<div className="flex items-center justify-between gap-2">
													<span className="inline-block rounded-md px-2 py-0.5 text-[11px] font-bold" style={{ background: tier.bg, color: tier.color }}>{row.tier} · {tier.label}</span>
													<span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: status.bg, color: status.color, border: status.border ? `1px solid ${status.border}` : 'none' }}>{status.label}</span>
												</div>
											</div>

											<div className="hidden items-center gap-2 md:grid md:grid-cols-[2fr_1fr_1fr_1fr_1.1fr_1.1fr_0.9fr] md:gap-2">
												<div className="flex items-center gap-2.5">
													<div className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-extrabold text-white" style={{ background: tier.color }}>{initials}</div>
													<div>
														<div className="text-[13px] font-bold" style={{ color: COLORS.text }}>{row.name}</div>
														<div className="text-[11px]" style={{ color: COLORS.textMuted }}>{row.location}</div>
													</div>
												</div>

												<div className="flex items-center gap-2">
													<div className="flex h-5 w-5 items-center justify-center rounded-md text-[8px] font-extrabold text-white" style={{ background: advisorColor }}>{advisorInitials}</div>
													<div className="text-[12px]" style={{ color: COLORS.textSec }}>{row.advisor.split(' ')[0]}</div>
												</div>

												<div>
													<span className="inline-block rounded-md px-2 py-0.5 text-[11px] font-bold" style={{ background: tier.bg, color: tier.color }}>{row.tier} · {tier.label}</span>
												</div>

												<div>
													<div className="text-[13px] font-bold" style={{ color: COLORS.text }}>{formatMoney(row.mrr)}</div>
													<div className="text-[11px]" style={{ color: COLORS.textMuted }}>per quarter</div>
												</div>

												<div>
													<div className="text-[12.5px] font-semibold" style={{ color: row.status === 'overdue' ? COLORS.red : COLORS.text }}>{row.renewal}</div>
													<div className="text-[11px]" style={{ color: COLORS.textMuted }}>Last: {row.lastPaid}</div>
												</div>

												<div>
													<span className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: status.bg, color: status.color, border: status.border ? `1px solid ${status.border}` : 'none' }}>
														{status.label}
													</span>
												</div>

												<div className="flex gap-1.5">
													<button className="rounded-lg border px-2.5 py-1 text-[11px] font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSec }} onClick={(e) => { e.stopPropagation(); setActiveBillingId(row.id); }}>Detail</button>
													{!viewAll && row.status === 'overdue' && (
														<button className="rounded-lg border px-2.5 py-1 text-[11px] font-bold" style={{ borderColor: 'rgba(198,61,47,.2)', color: COLORS.red, background: COLORS.redTint }} onClick={(e) => { e.stopPropagation(); openEmailTab(); }}>
															Remind
														</button>
													)}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>

				{activeBilling && (
					<div className="w-full border-t bg-white xl:w-96 xl:shrink-0 xl:border-l xl:border-t-0" style={{ borderColor: COLORS.border }}>
						<div className="border-b px-4 py-4 sm:px-5" style={{ background: COLORS.navy, borderColor: COLORS.border }}>
							<div className="mb-1 flex items-center justify-between gap-2">
								<div className="text-sm font-bold text-white">Billing Detail</div>
								<button className="rounded-lg border px-2 py-0.5 text-[11px] font-bold text-white" style={{ borderColor: 'rgba(255,255,255,.35)', background: 'rgba(255,255,255,.08)' }} onClick={() => setActiveBillingId(null)}>Close</button>
							</div>
							<div className="text-lg font-extrabold text-white">{activeBilling.name}</div>
							<div className="text-xs" style={{ color: 'rgba(255,255,255,.55)' }}>{activeBilling.advisor} · {activeBilling.location}</div>
						</div>

						<div className="max-h-none overflow-visible px-4 py-4 sm:px-5 xl:max-h-[calc(100vh-170px)] xl:overflow-y-auto">
							<div className="mb-4">
								<div className="mb-2 border-b pb-1.5 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted, borderColor: COLORS.borderSoft }}>Subscription Summary</div>
								{[
									['Plan', `${activeBilling.tier} · ${TIER_META[activeBilling.tier].label}`],
									['Quarterly MRR', formatMoney(activeBilling.mrr)],
									['Lifetime Value', formatMoney(activeBilling.mrr * activeBilling.quarters)],
									['Quarters Active', `${activeBilling.quarters}q`],
									['Status', statusMeta(activeBilling.status, activeBilling.daysOverdue).label],
									['Next Renewal', activeBilling.renewal],
									['Last Payment', activeBilling.lastPaid],
									['Days Overdue', activeBilling.daysOverdue > 0 ? `${activeBilling.daysOverdue}d` : '-'],
								].map(([k, v]) => (
									<div key={k} className="flex items-center justify-between border-b py-2" style={{ borderColor: COLORS.borderSoft }}>
										<div className="text-[12.5px]" style={{ color: COLORS.textSec }}>{k}</div>
										<div className="text-[12.5px] font-bold" style={{ color: COLORS.text }}>{v}</div>
									</div>
								))}
							</div>

							<div className="mb-4">
								<div className="mb-2 border-b pb-1.5 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted, borderColor: COLORS.borderSoft }}>RM Actions</div>
								<div className="space-y-2">
									{activeBilling.status === 'overdue' && !viewAll && (
										<button className="w-full rounded-lg border-none px-3 py-2 text-left text-[13px] font-bold text-white" style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.22)' }} onClick={openEmailTab}>
											Send Payment Reminder
										</button>
									)}
									{activeBilling.status === 'renewal' && !viewAll && (
										<button className="w-full rounded-lg border-none px-3 py-2 text-left text-[13px] font-bold text-white" style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.22)' }} onClick={openEmailTab}>
											Send Renewal Reminder
										</button>
									)}
									<button className="w-full rounded-lg border px-3 py-2 text-left text-[13px] font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.card }} onClick={openEmailTab}>
										Send Email
									</button>
									<button className="w-full rounded-lg border px-3 py-2 text-left text-[13px] font-bold" style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.card }}>
										View Client Profile
									</button>
								</div>
							</div>

							<div>
								<div className="mb-2 border-b pb-1.5 text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted, borderColor: COLORS.borderSoft }}>Notes</div>
								<textarea value={noteDraft} onChange={(e) => setNoteDraft(e.target.value)} className="h-20 w-full resize-none rounded-[10px] border px-3 py-2 text-[13px] outline-none" style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.text }} />
								<button className="mt-2 rounded-lg border-none px-3 py-1.5 text-xs font-bold text-white" style={{ background: COLORS.teal }} onClick={saveNote}>
									Save Note
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}