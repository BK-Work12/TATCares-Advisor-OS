import React from 'react';
import { COLORS } from './tatcaresShared';

export default function BillingScreen() {
	const kpis = [
		{
			label: 'Q2 revenue (projected)',
			value: '$41,160',
			delta: '↑ 18% vs Q1',
			deltaColor: COLORS.green,
			iconBg: '#E8F5EE',
			icon: (
				<svg viewBox="0 0 24 24" style={{ stroke: COLORS.green }} className="w-4 h-4 fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
					<line x1="12" y1="1" x2="12" y2="23" />
					<path d="M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
				</svg>
			),
		},
		{
			label: 'Active subscriptions',
			value: '24',
			delta: '↑ 3 new this quarter',
			deltaColor: COLORS.green,
			iconBg: COLORS.tealTint,
			icon: (
				<svg viewBox="0 0 24 24" style={{ stroke: COLORS.teal }} className="w-4 h-4 fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
					<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
					<circle cx="9" cy="7" r="4" />
					<path d="M23 21v-2a4 4 0 00-3-3.87" />
					<path d="M16 3.13a4 4 0 010 7.75" />
				</svg>
			),
		},
		{
			label: 'Outstanding balance',
			value: '$349',
			valueColor: COLORS.red,
			delta: '1 overdue · Derek Wilson',
			deltaColor: COLORS.red,
			iconBg: COLORS.redTint,
			icon: (
				<svg viewBox="0 0 24 24" style={{ stroke: COLORS.red }} className="w-4 h-4 fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="8" x2="12" y2="12" />
					<line x1="12" y1="16" x2="12.01" y2="16" />
				</svg>
			),
		},
		{
			label: 'Renewal rate',
			value: '91%',
			delta: '21 of 23 renewed this year',
			deltaColor: COLORS.green,
			iconBg: '#FEF9EE',
			icon: (
				<svg viewBox="0 0 24 24" style={{ stroke: COLORS.gold }} className="w-4 h-4 fill-none stroke-2 stroke-linecap-round stroke-linejoin-round">
					<polyline points="23 4 23 10 17 10" />
					<path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" />
				</svg>
			),
		},
	];

	const subscriptions = [
		{ initials: 'DW', avatar: COLORS.red, client: 'Derek Wilson', tierMeta: 'T2 · Planner', tier: 'T2', tierBg: '#F3EFFA', tierColor: '#5B4A8B', amount: '$349', status: 'Overdue 14d', statusBg: COLORS.redTint, statusColor: COLORS.red, renewal: 'Was Apr 1', renewalColor: COLORS.red, action: 'Send reminder', actionColor: COLORS.red, actionBorder: COLORS.red, overdue: true },
		{ initials: 'MG', avatar: '#2C5F7F', client: 'Melissa Grant', tierMeta: 'T1 · Starter', tier: 'T1', tierBg: '#EEF3FC', tierColor: '#2C5F7F', amount: '$349', status: 'Due in 5 days', statusBg: '#FEF9EE', statusColor: COLORS.gold, renewal: 'Apr 20', renewalColor: COLORS.gold, action: 'Send reminder' },
		{ initials: 'HE', avatar: '#1A7A4A', client: 'Henry Ellis', tierMeta: 'T3 · Advisor', tier: 'T3', tierBg: '#E8F5EE', tierColor: COLORS.green, amount: '$349', status: 'Due in 8 days', statusBg: '#FEF9EE', statusColor: COLORS.gold, renewal: 'Apr 23', renewalColor: COLORS.gold, action: 'View' },
		{ initials: 'JC', avatar: '#1A7A4A', client: 'Jordan Crawford', tierMeta: 'T3 · Advisor', tier: 'T3', tierBg: '#E8F5EE', tierColor: COLORS.green, amount: '$349', status: 'Active', statusBg: '#E8F5EE', statusColor: COLORS.green, renewal: 'Jul 1', renewalColor: COLORS.text, action: 'View' },
		{ initials: 'CW', avatar: COLORS.teal, client: 'Carol Williams', tierMeta: 'T3 · Advisor', tier: 'T3', tierBg: '#E8F5EE', tierColor: COLORS.green, amount: '$349', status: 'Active', statusBg: '#E8F5EE', statusColor: COLORS.green, renewal: 'May 1', renewalColor: COLORS.text, action: 'View' },
		{ initials: 'TN', avatar: COLORS.teal, client: 'Tom Nguyen', tierMeta: 'T2 · Planner', tier: 'T2', tierBg: '#F3EFFA', tierColor: '#5B4A8B', amount: '$349', status: 'Active', statusBg: '#E8F5EE', statusColor: COLORS.green, renewal: 'Jun 1', renewalColor: COLORS.text, action: 'View' },
		{ initials: 'RC', avatar: '#5B4A8B', client: 'Robert Chen', tierMeta: 'T1 · Starter', tier: 'T1', tierBg: '#EEF3FC', tierColor: '#2C5F7F', amount: '$349', status: 'Active', statusBg: '#E8F5EE', statusColor: COLORS.green, renewal: 'May 15', renewalColor: COLORS.text, action: 'View' },
	];

	const revenueHistory = [
		{ quarter: 'Q4 2025', width: '67%', amount: '$27,920', amountColor: COLORS.textSec },
		{ quarter: 'Q1 2026', width: '83%', amount: '$34,900', amountColor: COLORS.textSec },
		{ quarter: 'Q2 2026 (current)', width: '100%', amount: '$41,160', amountColor: COLORS.teal, barColor: COLORS.teal, active: true },
	];

	const renewals = [
		{ client: 'Derek Wilson', date: 'Overdue — Apr 1', amount: '$349', color: COLORS.red, tag: 'Overdue', tagBg: COLORS.redTint, tagColor: COLORS.red },
		{ client: 'Melissa Grant', date: 'Apr 20 · 5 days', amount: '$349', color: COLORS.textMuted, tag: 'Due soon', tagBg: '#FEF9EE', tagColor: '#7a5a00' },
		{ client: 'Henry Ellis', date: 'Apr 23 · 8 days', amount: '$349', color: COLORS.textMuted, tag: 'Due soon', tagBg: '#FEF9EE', tagColor: '#7a5a00' },
		{ client: 'Carol Williams', date: 'May 1', amount: '$349', color: COLORS.textMuted, tag: 'On track', tagBg: COLORS.tealTint, tagColor: COLORS.tealDeep },
		{ client: 'Robert Chen', date: 'May 15', amount: '$349', color: COLORS.textMuted, tag: 'On track', tagBg: COLORS.tealTint, tagColor: COLORS.tealDeep },
	];

	const tierRevenue = [
		{ label: 'T1 Starter', dot: '#2C5F7F', meta: '$349/qtr · 8 clients', count: '8', countColor: '#2C5F7F', total: '$2,792/qtr' },
		{ label: 'T2 Planner', dot: '#5B4A8B', meta: '$349/qtr · 10 clients', count: '10', countColor: '#5B4A8B', total: '$3,490/qtr' },
		{ label: 'T3 Advisor', dot: COLORS.green, meta: '$349/qtr · 6 clients', count: '6', countColor: COLORS.green, total: '$2,094/qtr' },
	];

	return (
		<div style={{ backgroundColor: COLORS.bg }} className="min-h-screen overflow-y-auto p-4 sm:p-5 lg:p-7">
			<div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
				{kpis.map((kpi) => (
					<div
						key={kpi.label}
						style={{
							backgroundColor: COLORS.card,
							borderColor: COLORS.border,
							boxShadow: '0 1px 3px rgba(31,41,55,0.04), 0 4px 16px rgba(31,41,55,0.04)',
						}}
						className="border rounded-[14px] p-4 flex items-start justify-between gap-3"
					>
						<div>
							<div className="text-[11px] font-bold uppercase tracking-[0.08em] mb-1.5" style={{ color: COLORS.textMuted }}>
								{kpi.label}
							</div>
							<div className="text-[26px] font-extrabold leading-none tracking-[-0.03em]" style={{ color: kpi.valueColor || COLORS.text }}>
								{kpi.value}
							</div>
							<div className="text-[11px] font-semibold mt-1" style={{ color: kpi.deltaColor }}>
								{kpi.delta}
							</div>
						</div>
						<div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0" style={{ background: kpi.iconBg }}>
							{kpi.icon}
						</div>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
				<div>
					<div
						style={{
							backgroundColor: COLORS.card,
							borderColor: COLORS.border,
							boxShadow: '0 1px 3px rgba(31,41,55,0.04), 0 4px 16px rgba(31,41,55,0.04)',
						}}
						className="border rounded-[18px] overflow-hidden mb-4"
					>
						<div className="flex flex-col gap-2 border-b px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5" style={{ borderColor: '#F0ECE5' }}>
							<span className="text-[14px] font-bold tracking-[-0.01em]" style={{ color: COLORS.text }}>Active subscriptions</span>
							<div className="flex flex-wrap items-center gap-2">
								<span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg" style={{ background: COLORS.redTint, color: COLORS.red }}>1 overdue</span>
								<span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg" style={{ background: '#FEF9EE', color: '#7a5a00' }}>3 renewing soon</span>
							</div>
						</div>

						<div className="overflow-x-auto">
						<table className="w-full min-w-180 border-collapse text-[12.5px]">
							<thead>
								<tr style={{ background: COLORS.bg, borderBottom: `1px solid #F0ECE5` }}>
									{['Client', 'Tier', 'Amount', 'Status', 'Next renewal', 'Action'].map((heading) => (
										<th key={heading} className="px-4 py-2.5 text-left text-[10px] font-extrabold uppercase tracking-widest" style={{ color: COLORS.textMuted }}>
											{heading}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{subscriptions.map((row) => (
									<tr
										key={row.client}
										className="border-b transition cursor-pointer hover:opacity-95"
										style={{ borderColor: '#F0ECE5', background: row.overdue ? 'rgba(198,61,47,.03)' : COLORS.card }}
									>
										<td className="px-4 py-3 align-middle">
											<div className="flex items-center gap-2.5">
												<div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: row.avatar }}>
													{row.initials}
												</div>
												<div>
													<div className="text-[13px] font-bold" style={{ color: COLORS.text }}>{row.client}</div>
													<div className="text-[11px]" style={{ color: COLORS.textMuted }}>{row.tierMeta}</div>
												</div>
											</div>
										</td>
										<td className="px-4 py-3 align-middle">
											<span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg" style={{ background: row.tierBg, color: row.tierColor }}>
												{row.tier}
											</span>
										</td>
										<td className="px-4 py-3 align-middle text-[13px] font-bold" style={{ color: COLORS.text }}>{row.amount}</td>
										<td className="px-4 py-3 align-middle">
											<span className="text-[10px] font-extrabold px-2 py-0.5 rounded-lg" style={{ background: row.statusBg, color: row.statusColor }}>
												{row.status}
											</span>
										</td>
										<td className="px-4 py-3 align-middle text-[12.5px] font-semibold" style={{ color: row.renewalColor }}>{row.renewal}</td>
										<td className="px-4 py-3 align-middle">
											<button
												className="rounded-[10px] px-3 py-1.5 text-[11.5px] font-bold border-[1.5px]"
												style={{
													background: COLORS.card,
													borderColor: row.actionBorder || COLORS.border,
													color: row.actionColor || COLORS.textSec,
												}}
											>
												{row.action}
											</button>
										</td>
									</tr>
								))}
								<tr style={{ opacity: 0.6 }}>
									<td colSpan={6} className="text-center px-4 py-3 text-[12px]" style={{ color: COLORS.textMuted }}>
										+ 17 more active subscribers · avg renewal rate 91%
									</td>
								</tr>
							</tbody>
						</table>
						</div>
					</div>

					<div
						style={{
							backgroundColor: COLORS.card,
							borderColor: COLORS.border,
							boxShadow: '0 1px 3px rgba(31,41,55,0.04), 0 4px 16px rgba(31,41,55,0.04)',
						}}
						className="border rounded-[18px] overflow-hidden"
					>
						<div className="flex flex-col gap-1.5 border-b px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:px-5" style={{ borderColor: '#F0ECE5' }}>
							<span className="text-[14px] font-bold tracking-[-0.01em]" style={{ color: COLORS.text }}>Quarterly revenue</span>
							<span className="text-[12px]" style={{ color: COLORS.textSec }}>$349/quarter per client</span>
						</div>
						<div>
							{revenueHistory.map((row) => (
								<div key={row.quarter} className="border-b px-4 py-2.5 last:border-b-0 sm:px-5" style={{ borderColor: '#F0ECE5' }}>
									<div className="text-[12px] font-bold mb-1.5" style={{ color: row.active ? COLORS.text : COLORS.textMuted }}>
										{row.quarter}
									</div>
									<div className="flex items-center gap-2.5">
										<div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: COLORS.border }}>
											<div className="h-full rounded-full" style={{ width: row.width, background: row.barColor || COLORS.teal }}></div>
										</div>
										<div className="min-w-13 text-right text-[13px] font-extrabold" style={{ color: row.amountColor }}>
											{row.amount}
										</div>
									</div>
								</div>
							))}
							<div className="px-4 py-3 sm:px-5" style={{ background: COLORS.tealTint, color: COLORS.tealDeep }}>
								<span className="text-[12px] leading-normal">
									At 24 active clients × $349 = <strong>$8,376/month</strong> recurring revenue. Full year run rate: <strong>$100,512</strong>.
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="xl:sticky xl:top-4 xl:self-start">
					<div
						style={{
							backgroundColor: COLORS.card,
							borderColor: COLORS.border,
							boxShadow: '0 1px 3px rgba(31,41,55,0.04), 0 4px 16px rgba(31,41,55,0.04)',
						}}
						className="border rounded-[18px] overflow-hidden mb-4"
					>
						<div className="border-b px-4 py-3.5 sm:px-5" style={{ borderColor: '#F0ECE5' }}>
							<span className="text-[14px] font-bold tracking-[-0.01em]" style={{ color: COLORS.text }}>Upcoming renewals</span>
						</div>
						<div>
							{renewals.map((row) => (
								<div key={row.client} className="flex items-center justify-between gap-3 border-b px-4 py-2.5 last:border-b-0 sm:px-5" style={{ borderColor: '#F0ECE5' }}>
									<div>
										<div className="text-[12.5px] font-semibold" style={{ color: row.color === COLORS.red ? COLORS.red : COLORS.text }}>{row.client}</div>
										<div className="text-[11px]" style={{ color: row.color }}>{row.date}</div>
									</div>
									<div className="text-right">
										<div className="text-[13px] font-bold" style={{ color: row.tag === 'Overdue' ? COLORS.red : COLORS.teal }}>{row.amount}</div>
										<span className="mt-0.5 inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-lg" style={{ background: row.tagBg, color: row.tagColor }}>
											{row.tag}
										</span>
									</div>
								</div>
							))}
						</div>
					</div>

					<div
						style={{
							backgroundColor: COLORS.card,
							borderColor: COLORS.border,
							boxShadow: '0 1px 3px rgba(31,41,55,0.04), 0 4px 16px rgba(31,41,55,0.04)',
						}}
						className="border rounded-[18px] overflow-hidden"
					>
						<div className="border-b px-4 py-3.5 sm:px-5" style={{ borderColor: '#F0ECE5' }}>
							<span className="text-[14px] font-bold tracking-[-0.01em]" style={{ color: COLORS.text }}>Revenue by tier</span>
						</div>
						<div style={{ paddingBottom: '4px' }}>
							{tierRevenue.map((row) => (
								<div key={row.label} className="flex items-center justify-between gap-3 border-b px-4 py-3 last:border-b-0 sm:px-5" style={{ borderColor: '#F0ECE5' }}>
									<div>
										<div className="flex items-center gap-2">
											<div className="w-2.5 h-2.5 rounded-[3px]" style={{ background: row.dot }}></div>
											<span className="text-[12.5px]" style={{ color: COLORS.textSec }}>{row.label}</span>
										</div>
										<div className="text-[11px] mt-0.5" style={{ color: COLORS.textMuted }}>{row.meta}</div>
									</div>
									<div className="text-right">
										<div className="text-[14px] font-extrabold" style={{ color: row.countColor }}>{row.count}</div>
										<div className="text-[11px]" style={{ color: COLORS.textMuted }}>{row.total}</div>
									</div>
								</div>
							))}
						</div>
						<div className="px-4 py-3.5 text-center sm:px-5" style={{ background: COLORS.navy }}>
							  <div className="text-[10px] font-extrabold uppercase tracking-widest mb-1" style={{ color: 'rgba(255,255,255,.4)' }}>
								Total quarterly revenue
							</div>
							<div className="text-[26px] font-extrabold tracking-[-0.03em]" style={{ color: '#5ECFCA' }}>
								$8,376
							</div>
							<div className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,.4)' }}>
								$100,512 annualized
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}