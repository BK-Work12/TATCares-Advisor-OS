import React, { useMemo, useState } from 'react';
import {
	AlertTriangle,
	Check,
	CheckCircle2,
	Circle,
	Radio,
	Search,
	Users,
} from 'lucide-react';
import { COLORS, cardShadow } from './tatcaresShared';

const TYPE_CONFIG = {
	urgent: {
		label: 'Urgent',
		accent: COLORS.red,
		bg: '#FDEBE8',
		icon: AlertTriangle,
	},
	warn: {
		label: 'Action Needed',
		accent: COLORS.gold,
		bg: '#FFF6DF',
		icon: AlertTriangle,
	},
	activity: {
		label: 'Client Activity',
		accent: '#2C5F7F',
		bg: '#EAF1F8',
		icon: Users,
	},
	system: {
		label: 'System',
		accent: '#5B4A8B',
		bg: '#F0EBFB',
		icon: Radio,
	},
	positive: {
		label: 'Positive',
		accent: COLORS.green,
		bg: '#EAF6EF',
		icon: CheckCircle2,
	},
};

const DEADLINES = [
	{ date: 'Apr 20', title: 'Melissa Grant renewal', sub: 'Q2 subscription payment is due', color: COLORS.red },
	{ date: 'Apr 22', title: 'Jordan Crawford check-in', sub: '60-day strategy plan review', color: COLORS.red },
	{ date: 'Apr 30', title: 'Pinnacle TPA document lock', sub: 'Pending signed actuarial documents', color: COLORS.gold },
	{ date: 'Jun 15', title: 'Q2 estimated tax payment', sub: 'All active clients with withholding', color: COLORS.green },
];

const PREF_OPTIONS = [
	['Client activity alerts', 'clientActivity'],
	['AI score change alerts', 'aiChanges'],
	['Renewal reminders', 'renewals'],
	['Deadline reminders', 'deadlines'],
	['Team activity updates', 'teamUpdates'],
	['Email digest (daily)', 'emailDigest'],
];

const INITIAL_NOTIFICATIONS = [
	{
		id: 'n1',
		dateGroup: 'Today - April 15, 2026',
		minutesAgo: 6,
		type: 'urgent',
		title: 'Payment overdue for Derek Wilson',
		description: 'Annual subscription invoice is 7 days overdue and reminders were not opened.',
		advisor: 'Priya Sharma',
		advisorInitials: 'PS',
		advisorColor: '#2F7D79',
		location: 'Austin',
		client: 'Derek Wilson',
		timeLabel: '8:24 AM',
		unread: true,
		actions: ['Send follow-up email', 'View client'],
	},
	{
		id: 'n2',
		dateGroup: 'Today - April 15, 2026',
		minutesAgo: 12,
		type: 'urgent',
		title: 'Brian Wallace has not been contacted in 30 days',
		description: 'Client completed onboarding but no advisor outreach has been logged since March 15.',
		advisor: 'Ashley Cole',
		advisorInitials: 'AC',
		advisorColor: '#1B3A5C',
		location: 'Denver',
		client: 'Brian Wallace',
		timeLabel: '8:18 AM',
		unread: true,
		actions: ['Send reminder', 'View client'],
	},
	{
		id: 'n3',
		dateGroup: 'Today - April 15, 2026',
		minutesAgo: 20,
		type: 'urgent',
		title: 'Proposal still unopened by Robert Chen',
		description: 'Proposal was sent 4 days ago and has no view activity. Follow-up is recommended.',
		advisor: 'Jordan Price',
		advisorInitials: 'JP',
		advisorColor: '#B8860B',
		location: 'Seattle',
		client: 'Robert Chen',
		timeLabel: '8:10 AM',
		unread: true,
		actions: ['Send follow-up email', 'View email'],
	},
	{
		id: 'n4',
		dateGroup: 'Today - April 15, 2026',
		minutesAgo: 31,
		type: 'warn',
		subtype: 'inactivity',
		title: 'Carol Williams reached 30-day inactivity threshold',
		description: 'No messages, meetings, or updates were recorded since the onboarding handoff.',
		advisor: 'Marcus Hale',
		advisorInitials: 'MH',
		advisorColor: '#5B4A8B',
		location: 'Phoenix',
		client: 'Carol Williams',
		timeLabel: '7:59 AM',
		unread: true,
		actions: ['Send reminder', 'View client'],
	},
	{
		id: 'n5',
		dateGroup: 'Today - April 15, 2026',
		minutesAgo: 39,
		type: 'activity',
		title: 'Omar Patel completed a new signup form',
		description: 'Intake questionnaire submitted with all required tax and business profile details.',
		advisor: 'Priya Sharma',
		advisorInitials: 'PS',
		advisorColor: '#2F7D79',
		location: 'Austin',
		client: 'Omar Patel',
		timeLabel: '7:51 AM',
		unread: true,
		actions: ['View client', 'View meetings'],
	},
	{
		id: 'n6',
		dateGroup: 'Today - April 15, 2026',
		minutesAgo: 48,
		type: 'activity',
		title: 'Sandra Kim uploaded requested documents',
		description: 'W-2 and business income statement are now attached and ready for review.',
		advisor: 'Jordan Price',
		advisorInitials: 'JP',
		advisorColor: '#B8860B',
		location: 'Seattle',
		client: 'Sandra Kim',
		timeLabel: '7:42 AM',
		unread: false,
		actions: ['View client', 'View meeting notes'],
	},
	{
		id: 'n7',
		dateGroup: 'Today - April 15, 2026',
		minutesAgo: 55,
		type: 'system',
		title: 'Reassignment request submitted by Kevin Marsh',
		description: 'Client requested advisor change due to communication preferences.',
		advisor: 'System',
		advisorInitials: 'SY',
		advisorColor: '#5B4A8B',
		location: 'Remote',
		client: 'Kevin Marsh',
		timeLabel: '7:35 AM',
		unread: true,
		actions: ['Approve', 'Deny'],
	},
	{
		id: 'n8',
		dateGroup: 'Today - April 15, 2026',
		minutesAgo: 66,
		type: 'positive',
		title: 'Henry Ellis completed renewal successfully',
		description: 'Subscription renewed with autopay and all account details validated.',
		advisor: 'Ashley Cole',
		advisorInitials: 'AC',
		advisorColor: '#1B3A5C',
		location: 'Denver',
		client: 'Henry Ellis',
		timeLabel: '7:24 AM',
		unread: false,
		actions: ['View client'],
	},
	{
		id: 'n9',
		dateGroup: 'Today - April 15, 2026',
		minutesAgo: 74,
		type: 'warn',
		title: 'Melissa Grant renewal is due in 5 days',
		description: 'No payment method update has been logged yet for the upcoming renewal window.',
		advisor: 'Priya Sharma',
		advisorInitials: 'PS',
		advisorColor: '#2F7D79',
		location: 'Austin',
		client: 'Melissa Grant',
		timeLabel: '7:16 AM',
		unread: true,
		actions: ['Send reminder', 'View client'],
	},
	{
		id: 'n10',
		dateGroup: 'Today - April 15, 2026',
		minutesAgo: 83,
		type: 'system',
		title: 'Bulk document auto-lock completed overnight',
		description: '41 stale documents were locked based on retention policy and compliance settings.',
		advisor: 'System',
		advisorInitials: 'SY',
		advisorColor: '#5B4A8B',
		location: 'Remote',
		client: 'All Clients',
		timeLabel: '7:07 AM',
		unread: false,
		actions: ['View details'],
	},
	{
		id: 'n11',
		dateGroup: 'Yesterday - April 14, 2026',
		minutesAgo: 24 * 60 + 15,
		type: 'warn',
		title: 'Sandra Kim still missing prior-year 1040 document',
		description: 'FFS pre-score is based on partial data and cannot be finalized until upload.',
		advisor: 'Jordan Price',
		advisorInitials: 'JP',
		advisorColor: '#B8860B',
		location: 'Seattle',
		client: 'Sandra Kim',
		timeLabel: '4:38 PM',
		unread: true,
		actions: ['Send reminder', 'View client'],
	},
	{
		id: 'n12',
		dateGroup: 'Yesterday - April 14, 2026',
		minutesAgo: 24 * 60 + 39,
		type: 'warn',
		title: 'Tina Brooks has not booked consultation yet',
		description: 'Onboarding stage completed but no consultation event appears in the calendar.',
		advisor: 'Ashley Cole',
		advisorInitials: 'AC',
		advisorColor: '#1B3A5C',
		location: 'Denver',
		client: 'Tina Brooks',
		timeLabel: '4:14 PM',
		unread: true,
		actions: ['View meetings', 'Send follow-up email'],
	},
	{
		id: 'n13',
		dateGroup: 'Yesterday - April 14, 2026',
		minutesAgo: 24 * 60 + 52,
		type: 'activity',
		title: 'Marcus Johnson booked a strategy meeting',
		description: 'Meeting scheduled for Friday at 2:00 PM and confirmation email was opened.',
		advisor: 'Marcus Hale',
		advisorInitials: 'MH',
		advisorColor: '#5B4A8B',
		location: 'Phoenix',
		client: 'Marcus Johnson',
		timeLabel: '4:01 PM',
		unread: false,
		actions: ['View meetings', 'View client'],
	},
	{
		id: 'n14',
		dateGroup: 'Yesterday - April 14, 2026',
		minutesAgo: 24 * 60 + 61,
		type: 'activity',
		title: 'Jordan Crawford replied to proposal thread',
		description: 'Client requested timeline clarification for filing strategy and contribution plan.',
		advisor: 'Priya Sharma',
		advisorInitials: 'PS',
		advisorColor: '#2F7D79',
		location: 'Austin',
		client: 'Jordan Crawford',
		timeLabel: '3:52 PM',
		unread: false,
		actions: ['View email', 'View client'],
	},
	{
		id: 'n15',
		dateGroup: 'Yesterday - April 14, 2026',
		minutesAgo: 24 * 60 + 78,
		type: 'system',
		title: 'Reassignment request submitted by Rachel Torres',
		description: 'Request cites scheduling conflicts and asks to route client to west-region coverage.',
		advisor: 'System',
		advisorInitials: 'SY',
		advisorColor: '#5B4A8B',
		location: 'Remote',
		client: 'Rachel Torres',
		timeLabel: '3:35 PM',
		unread: true,
		actions: ['Approve', 'Deny'],
	},
	{
		id: 'n16',
		dateGroup: 'Yesterday - April 14, 2026',
		minutesAgo: 24 * 60 + 95,
		type: 'warn',
		subtype: 'inactivity',
		title: 'Kevin Marsh reached 30-day inactivity threshold',
		description: 'No touchpoint has been logged since questionnaire completion.',
		advisor: 'Ashley Cole',
		advisorInitials: 'AC',
		advisorColor: '#1B3A5C',
		location: 'Denver',
		client: 'Kevin Marsh',
		timeLabel: '3:18 PM',
		unread: true,
		actions: ['Send follow-up email', 'View client'],
	},
	{
		id: 'n17',
		dateGroup: 'Yesterday - April 14, 2026',
		minutesAgo: 24 * 60 + 112,
		type: 'activity',
		title: 'Ashley Cole logged routing update for Brian Wallace',
		description: 'Internal handoff note added to align follow-up cadence and open tasks.',
		advisor: 'Ashley Cole',
		advisorInitials: 'AC',
		advisorColor: '#1B3A5C',
		location: 'Denver',
		client: 'Brian Wallace',
		timeLabel: '3:01 PM',
		unread: false,
		actions: ['View details'],
	},
	{
		id: 'n18',
		dateGroup: 'Yesterday - April 14, 2026',
		minutesAgo: 24 * 60 + 128,
		type: 'positive',
		title: 'Jordan Crawford FFS improved by 9 points',
		description: 'Recent income updates and estimated tax optimization increased the score trend.',
		advisor: 'Priya Sharma',
		advisorInitials: 'PS',
		advisorColor: '#2F7D79',
		location: 'Austin',
		client: 'Jordan Crawford',
		timeLabel: '2:45 PM',
		unread: false,
		actions: ['View details', 'View client'],
	},
	{
		id: 'n19',
		dateGroup: 'Yesterday - April 14, 2026',
		minutesAgo: 24 * 60 + 141,
		type: 'warn',
		title: 'Diane Moore documents locked due to inactivity',
		description: 'Client records entered lock status after no activity in document workflow.',
		advisor: 'Jordan Price',
		advisorInitials: 'JP',
		advisorColor: '#B8860B',
		location: 'Seattle',
		client: 'Diane Moore',
		timeLabel: '2:32 PM',
		unread: true,
		actions: ['Send reminder', 'View client'],
	},
	{
		id: 'n20',
		dateGroup: 'Earlier This Week',
		minutesAgo: 2 * 24 * 60 + 38,
		type: 'urgent',
		title: '3 pending reassignment requests need decision',
		description: 'Queue has exceeded SLA and requires approval by end of day.',
		advisor: 'System',
		advisorInitials: 'SY',
		advisorColor: '#5B4A8B',
		location: 'Remote',
		client: 'Multiple Clients',
		timeLabel: 'Apr 13',
		unread: true,
		actions: ['Approve', 'Deny'],
	},
	{
		id: 'n21',
		dateGroup: 'Earlier This Week',
		minutesAgo: 2 * 24 * 60 + 54,
		type: 'activity',
		title: 'Carla Reyes completed a new signup form',
		description: 'All required fields are complete and intake is ready for advisor assignment.',
		advisor: 'Marcus Hale',
		advisorInitials: 'MH',
		advisorColor: '#5B4A8B',
		location: 'Phoenix',
		client: 'Carla Reyes',
		timeLabel: 'Apr 13',
		unread: false,
		actions: ['View client'],
	},
	{
		id: 'n22',
		dateGroup: 'Earlier This Week',
		minutesAgo: 2 * 24 * 60 + 73,
		type: 'system',
		title: 'Advisor profile deactivation flagged for David Reyes',
		description: 'Security review paused account access pending updated compliance documents.',
		advisor: 'System',
		advisorInitials: 'SY',
		advisorColor: '#5B4A8B',
		location: 'Remote',
		client: 'David Reyes',
		timeLabel: 'Apr 13',
		unread: true,
		actions: ['View details'],
	},
	{
		id: 'n23',
		dateGroup: 'Earlier This Week',
		minutesAgo: 3 * 24 * 60 + 22,
		type: 'positive',
		title: 'Marcus Johnson referred a new lead',
		description: 'Referral intake submitted and assigned to regional advisor queue.',
		advisor: 'Marcus Hale',
		advisorInitials: 'MH',
		advisorColor: '#5B4A8B',
		location: 'Phoenix',
		client: 'Marcus Johnson',
		timeLabel: 'Apr 12',
		unread: false,
		actions: ['View client'],
	},
	{
		id: 'n24',
		dateGroup: 'Earlier This Week',
		minutesAgo: 3 * 24 * 60 + 36,
		type: 'warn',
		subtype: 'inactivity',
		title: 'Angela Reeves reached 30-day inactivity threshold',
		description: 'No communication touchpoints were recorded in the last month.',
		advisor: 'Jordan Price',
		advisorInitials: 'JP',
		advisorColor: '#B8860B',
		location: 'Seattle',
		client: 'Angela Reeves',
		timeLabel: 'Apr 12',
		unread: true,
		actions: ['Send follow-up email', 'View client'],
	},
	{
		id: 'n25',
		dateGroup: 'Earlier This Week',
		minutesAgo: 3 * 24 * 60 + 58,
		type: 'warn',
		title: 'Diane Moore FFS dropped after recent profile changes',
		description: 'Change in projected deductions reduced score confidence and raised risk.',
		advisor: 'Jordan Price',
		advisorInitials: 'JP',
		advisorColor: '#B8860B',
		location: 'Seattle',
		client: 'Diane Moore',
		timeLabel: 'Apr 12',
		unread: false,
		actions: ['View details', 'View client'],
	},
	{
		id: 'n26',
		dateGroup: 'Earlier This Week',
		minutesAgo: 3 * 24 * 60 + 74,
		type: 'warn',
		title: 'Thomas Wren has no advisor follow-up in 30 days',
		description: 'Client is still waiting for next planning call and has no outbound contact logged.',
		advisor: 'Priya Sharma',
		advisorInitials: 'PS',
		advisorColor: '#2F7D79',
		location: 'Austin',
		client: 'Thomas Wren',
		timeLabel: 'Apr 12',
		unread: true,
		actions: ['Send reminder', 'View meetings'],
	},
	{
		id: 'n27',
		dateGroup: 'Earlier This Week',
		minutesAgo: 4 * 24 * 60 + 11,
		type: 'urgent',
		title: 'Lisa Nguyen account requires immediate outreach',
		description: 'Support escalated because no advisor response was sent after client request.',
		advisor: 'Ashley Cole',
		advisorInitials: 'AC',
		advisorColor: '#1B3A5C',
		location: 'Denver',
		client: 'Lisa Nguyen',
		timeLabel: 'Apr 11',
		unread: true,
		actions: ['Send follow-up email', 'View client'],
	},
	{
		id: 'n28',
		dateGroup: 'Earlier This Week',
		minutesAgo: 4 * 24 * 60 + 35,
		type: 'system',
		title: 'Reassignment request submitted by Carla Reyes',
		description: 'Client asked for advisor with bilingual support and flexible evening availability.',
		advisor: 'System',
		advisorInitials: 'SY',
		advisorColor: '#5B4A8B',
		location: 'Remote',
		client: 'Carla Reyes',
		timeLabel: 'Apr 11',
		unread: true,
		actions: ['Approve', 'Deny'],
	},
];

const TAB_CONFIG = [
	{ id: 'all', label: 'All' },
	{ id: 'urgent', label: 'Urgent' },
	{ id: 'warn', label: 'Action Needed' },
	{ id: 'activity', label: 'Client Activity' },
	{ id: 'system', label: 'System' },
	{ id: 'positive', label: 'Positive' },
];

function actionButtonStyle(label) {
	const normalized = label.toLowerCase();
	if (normalized === 'approve') {
		return {
			background: '#EAF6EF',
			borderColor: 'rgba(26,122,74,.25)',
			color: COLORS.green,
		};
	}
	if (normalized === 'deny') {
		return {
			background: COLORS.redTint,
			borderColor: 'rgba(198,61,47,.25)',
			color: COLORS.red,
		};
	}
	if (normalized.includes('send')) {
		return {
			background: COLORS.red,
			borderColor: COLORS.red,
			color: '#FFFFFF',
		};
	}
	return {
		background: '#FFFFFF',
		borderColor: COLORS.border,
		color: COLORS.textSec,
	};
}

function toastColor(kind) {
	if (kind === 'success') return { background: '#EAF6EF', color: COLORS.green, border: 'rgba(26,122,74,.28)' };
	if (kind === 'error') return { background: '#FDEBE8', color: COLORS.red, border: 'rgba(198,61,47,.28)' };
	return { background: '#E8F3F1', color: COLORS.tealDeep, border: 'rgba(47,125,121,.28)' };
}

export default function NotificationsScreen({ onScreenChange }) {
	const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
	const [activeTab, setActiveTab] = useState('all');
	const [searchQuery, setSearchQuery] = useState('');
	const [filterAdvisor, setFilterAdvisor] = useState('all');
	const [filterLocation, setFilterLocation] = useState('all');
	const [sortOrder, setSortOrder] = useState('newest');
	const [toast, setToast] = useState(null);
	const [prefs, setPrefs] = useState({
		clientActivity: true,
		aiChanges: true,
		renewals: true,
		deadlines: true,
		teamUpdates: false,
		emailDigest: true,
	});

	const advisorOptions = useMemo(() => {
		const values = new Set(notifications.map((item) => item.advisor));
		return ['all', ...Array.from(values).sort((a, b) => a.localeCompare(b))];
	}, [notifications]);

	const locationOptions = useMemo(() => {
		const values = new Set(notifications.map((item) => item.location));
		return ['all', ...Array.from(values).sort((a, b) => a.localeCompare(b))];
	}, [notifications]);

	const tabCounts = useMemo(() => {
		const counts = { all: notifications.length, urgent: 0, warn: 0, activity: 0, system: 0, positive: 0 };
		notifications.forEach((n) => {
			counts[n.type] += 1;
		});
		return counts;
	}, [notifications]);

	const filteredNotifications = useMemo(() => {
		const query = searchQuery.trim().toLowerCase();
		const priorityValue = { urgent: 1, warn: 2, activity: 3, system: 4, positive: 5 };

		const list = notifications.filter((item) => {
			if (activeTab !== 'all' && item.type !== activeTab) return false;
			if (filterAdvisor !== 'all' && item.advisor !== filterAdvisor) return false;
			if (filterLocation !== 'all' && item.location !== filterLocation) return false;
			if (!query) return true;

			const searchSpace = `${item.title} ${item.description} ${item.client} ${item.advisor} ${item.location}`.toLowerCase();
			return searchSpace.includes(query);
		});

		list.sort((a, b) => {
			if (sortOrder === 'oldest') return b.minutesAgo - a.minutesAgo;
			if (sortOrder === 'priority') return priorityValue[a.type] - priorityValue[b.type] || a.minutesAgo - b.minutesAgo;
			if (sortOrder === 'advisor') return a.advisor.localeCompare(b.advisor) || a.minutesAgo - b.minutesAgo;
			return a.minutesAgo - b.minutesAgo;
		});

		return list;
	}, [activeTab, filterAdvisor, filterLocation, notifications, searchQuery, sortOrder]);

	const groupedNotifications = useMemo(() => {
		const groups = new Map();
		filteredNotifications.forEach((item) => {
			if (!groups.has(item.dateGroup)) groups.set(item.dateGroup, []);
			groups.get(item.dateGroup).push(item);
		});
		return Array.from(groups.entries());
	}, [filteredNotifications]);

	const summaryCounts = useMemo(() => {
		const urgent = notifications.filter((n) => n.type === 'urgent').length;
		const warn = notifications.filter((n) => n.type === 'warn').length;
		const inactivity = notifications.filter((n) => n.subtype === 'inactivity').length;
		const activity = notifications.filter((n) => n.type === 'activity').length;
		const system = notifications.filter((n) => n.type === 'system').length;
		const positive = notifications.filter((n) => n.type === 'positive').length;
		return { urgent, warn, inactivity, activity, system, positive };
	}, [notifications]);

	const advisorSummary = useMemo(() => {
		const map = new Map();
		notifications.forEach((item) => {
			if (item.advisor === 'System') return;
			const current = map.get(item.advisor) || {
				name: item.advisor,
				initials: item.advisorInitials,
				color: item.advisorColor,
				count: 0,
			};
			current.count += 1;
			map.set(item.advisor, current);
		});
		return Array.from(map.values()).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
	}, [notifications]);

	const unreadCount = useMemo(() => notifications.filter((n) => n.unread).length, [notifications]);

	const markRead = (id) => {
		setNotifications((prev) => prev.map((item) => (item.id === id ? { ...item, unread: false } : item)));
	};

	const markAllRead = () => {
		setNotifications((prev) => prev.map((item) => ({ ...item, unread: false })));
		setToast({ kind: 'success', text: 'All notifications marked as read.' });
	};

	const togglePref = (key) => {
		setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const runAction = (label, notificationId) => {
		const normalized = label.toLowerCase();
		markRead(notificationId);

		if (normalized.includes('approve')) {
			setToast({ kind: 'success', text: 'Request approved.' });
			return;
		}
		if (normalized.includes('deny')) {
			setToast({ kind: 'error', text: 'Request denied.' });
			return;
		}
		if (normalized.includes('meeting')) {
			onScreenChange?.('meetings');
			setToast({ kind: 'info', text: 'Opening meetings.' });
			return;
		}
		if (normalized.includes('email') || normalized.includes('follow-up') || normalized.includes('reminder')) {
			onScreenChange?.('email');
			setToast({ kind: 'info', text: 'Opening email composer.' });
			return;
		}
		if (normalized.includes('client')) {
			onScreenChange?.('clients');
			setToast({ kind: 'info', text: 'Opening client workspace.' });
			return;
		}
		setToast({ kind: 'info', text: `${label} completed.` });
	};

	return (
		<div className="flex min-h-full flex-col" style={{ background: COLORS.bg }}>
			<div className="px-4 pt-4 sm:px-6 lg:px-7">
				{toast && (
					<div
						className="mb-3 flex items-center justify-between rounded-xl border px-3.5 py-2 text-sm"
						style={{
							background: toastColor(toast.kind).background,
							color: toastColor(toast.kind).color,
							borderColor: toastColor(toast.kind).border,
						}}
					>
						<span>{toast.text}</span>
						<button className="text-xs font-semibold" onClick={() => setToast(null)}>
							Dismiss
						</button>
					</div>
				)}
			</div>

			<div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4 sm:px-6 lg:overflow-hidden lg:px-7">
				<div
					className="min-h-0 overflow-visible rounded-2xl border bg-white lg:h-full lg:overflow-hidden"
					style={{ borderColor: COLORS.border, boxShadow: cardShadow }}
				>
					<div className="flex min-h-0 flex-col lg:h-full lg:flex-row lg:overflow-hidden">
						<div
							className="min-h-0 flex-1 overflow-visible border-b lg:overflow-hidden lg:border-b-0 lg:border-r"
							style={{ borderColor: COLORS.border }}
						>
							<div className="border-b px-4 py-3 sm:px-5" style={{ borderBottomColor: COLORS.border }}>
								<div className="flex flex-wrap items-center gap-2.5">
									<div
										className="flex w-full items-center gap-2 rounded-xl border px-3 py-2 sm:min-w-55 sm:flex-1"
										style={{ borderColor: COLORS.borderSoft, background: '#FAFAF9' }}
									>
										<Search className="h-4 w-4" style={{ color: COLORS.textMuted }} />
										<input
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											placeholder="Search notifications"
											className="w-full bg-transparent text-sm outline-none placeholder:text-[#A4A9B3]"
										/>
									</div>

									<select
										value={filterAdvisor}
										onChange={(e) => setFilterAdvisor(e.target.value)}
										className="w-full rounded-xl border px-3 py-2 text-sm sm:w-auto"
										style={{ borderColor: COLORS.borderSoft, color: COLORS.textSec }}
									>
										{advisorOptions.map((advisor) => (
											<option key={advisor} value={advisor}>
												{advisor === 'all' ? 'All advisors' : advisor}
											</option>
										))}
									</select>

									<select
										value={filterLocation}
										onChange={(e) => setFilterLocation(e.target.value)}
										className="w-full rounded-xl border px-3 py-2 text-sm sm:w-auto"
										style={{ borderColor: COLORS.borderSoft, color: COLORS.textSec }}
									>
										{locationOptions.map((location) => (
											<option key={location} value={location}>
												{location === 'all' ? 'All locations' : location}
											</option>
										))}
									</select>

									<select
										value={sortOrder}
										onChange={(e) => setSortOrder(e.target.value)}
										className="w-full rounded-xl border px-3 py-2 text-sm sm:w-auto"
										style={{ borderColor: COLORS.borderSoft, color: COLORS.textSec }}
									>
										<option value="newest">Newest first</option>
										<option value="oldest">Oldest first</option>
										<option value="priority">Priority</option>
										<option value="advisor">Advisor</option>
									</select>

									<button
										onClick={markAllRead}
										className="w-full rounded-xl border px-3 py-2 text-sm font-semibold sm:w-auto"
										style={{ borderColor: COLORS.borderSoft, color: COLORS.textSec }}
									>
										Mark all read
									</button>

									<span className="w-full text-xs font-semibold sm:ml-auto sm:w-auto" style={{ color: COLORS.textMuted }}>
										{unreadCount} unread
									</span>
								</div>

								<div className="mt-3 flex gap-4 overflow-x-auto border-b" style={{ borderBottomColor: COLORS.borderSoft }}>
									{TAB_CONFIG.map((tab) => {
										const active = activeTab === tab.id;
										return (
											<button
												key={tab.id}
												onClick={() => setActiveTab(tab.id)}
												className="group -mb-px inline-flex shrink-0 items-center gap-2 border-b-2 pb-2 text-sm font-semibold"
												style={{
													borderBottomColor: active ? COLORS.teal : 'transparent',
													color: active ? COLORS.tealDeep : COLORS.textSec,
												}}
											>
												<span>{tab.label}</span>
												<span
													className="rounded-full px-2 py-0.5 text-[11px] font-bold"
													style={{
														background: active ? COLORS.tealTint : '#F2F4F7',
														color: active ? COLORS.tealDeep : COLORS.textMuted,
													}}
												>
													{tabCounts[tab.id]}
												</span>
											</button>
										);
									})}
								</div>
							</div>

							<div className="max-h-none overflow-visible lg:h-full lg:min-h-0 lg:overflow-y-auto">
								{groupedNotifications.length === 0 && (
									<div className="px-5 py-16 text-center text-sm" style={{ color: COLORS.textMuted }}>
										No notifications match your filters.
									</div>
								)}

								{groupedNotifications.map(([groupLabel, items]) => (
									<div key={groupLabel}>
										<div
											className="sticky top-0 z-10 border-y px-5 py-2 text-[11px] font-bold uppercase tracking-[0.08em]"
											style={{
												background: COLORS.bg,
												borderColor: COLORS.borderSoft,
												color: COLORS.textMuted,
											}}
										>
											{groupLabel}
										</div>

										{items.map((item) => {
											const type = TYPE_CONFIG[item.type];
											const Icon = type.icon;
											return (
												<div
													key={item.id}
													className="relative flex flex-col gap-2.5 border-b px-4 py-3.5 hover:bg-[#FBFAF8] sm:flex-row sm:gap-3.5 sm:px-5"
													style={{
														borderBottomColor: COLORS.borderSoft,
														background: item.unread ? '#FFFCFC' : '#FFFFFF',
													}}
												>
													{item.unread && (
														<span
															className="absolute bottom-0 left-0 top-0 w-0.75 rounded-r"
															style={{ background: type.accent }}
														/>
													)}

													<div
														className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
														style={{ background: type.bg, color: type.accent }}
													>
														<Icon className="h-4 w-4" />
													</div>

													<div className="min-w-0 flex-1">
														<div className="flex flex-col items-start justify-between gap-1.5 sm:flex-row sm:gap-2">
															<p className="text-[14px] font-semibold leading-snug" style={{ color: COLORS.text }}>
																{item.title}
																{item.unread && (
																	<span
																		className="ml-2 inline-block h-2 w-2 rounded-full align-middle"
																		style={{ background: type.accent }}
																	/>
																)}
															</p>
															<span className="shrink-0 text-xs" style={{ color: COLORS.textMuted }}>
																{item.timeLabel}
															</span>
														</div>

														<p className="mt-1 text-[13px] leading-[1.45]" style={{ color: COLORS.textSec }}>
															{item.description}
														</p>

														<div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px]">
															<span
																className="rounded-md border px-2 py-0.5 font-semibold"
																style={{ borderColor: COLORS.border, color: COLORS.textSec }}
															>
																{item.advisor}
															</span>
															<span
																className="rounded-md border px-2 py-0.5 font-semibold"
																style={{ borderColor: COLORS.border, color: COLORS.textSec }}
															>
																{item.location}
															</span>
															<span style={{ color: COLORS.textMuted }}>{item.client}</span>
														</div>

														<div className="mt-2 flex flex-wrap items-center gap-2">
															{item.actions.map((label) => (
																<button
																	key={`${item.id}-${label}`}
																	onClick={() => runAction(label, item.id)}
																	className="rounded-lg border px-2.5 py-1 text-[11px] font-semibold"
																	style={actionButtonStyle(label)}
																>
																	{label}
																</button>
															))}
														</div>
													</div>

													<button
														onClick={() => markRead(item.id)}
														className="mt-0.5 flex h-7 w-7 shrink-0 self-end items-center justify-center rounded-full border sm:self-auto"
														style={{ borderColor: COLORS.borderSoft, color: item.unread ? type.accent : COLORS.textMuted }}
														title={item.unread ? 'Mark as read' : 'Read'}
													>
														{item.unread ? <Circle className="h-3.5 w-3.5" /> : <Check className="h-3.5 w-3.5" />}
													</button>
												</div>
											);
										})}
									</div>
								))}
							</div>
						</div>

						<div
							className="w-full shrink-0 overflow-y-visible border-t lg:w-70 lg:overflow-y-auto lg:border-l lg:border-t-0"
							style={{ background: '#FEFDFC', borderColor: COLORS.borderSoft }}
						>
							<div className="border-b px-4 py-4" style={{ borderBottomColor: COLORS.borderSoft }}>
								<h3 className="text-[13px] font-bold" style={{ color: COLORS.text }}>
									Notification Summary
								</h3>
								<div className="mt-3 space-y-1.5">
									{[
										{ key: 'urgent', label: 'Urgent', count: summaryCounts.urgent, color: COLORS.red },
										{ key: 'warn', label: 'Action Needed', count: summaryCounts.warn, color: COLORS.gold },
										{ key: 'warn', label: '30-Day Inactivity', count: summaryCounts.inactivity, color: COLORS.gold },
										{ key: 'activity', label: 'Client Activity', count: summaryCounts.activity, color: '#2C5F7F' },
										{ key: 'system', label: 'System', count: summaryCounts.system, color: '#5B4A8B' },
										{ key: 'positive', label: 'Positive', count: summaryCounts.positive, color: COLORS.green },
									].map((row) => (
										<button
											key={row.label}
											onClick={() => setActiveTab(row.key)}
											className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-left hover:bg-white"
										>
											<span className="text-[12px] font-medium" style={{ color: COLORS.textSec }}>
												{row.label}
											</span>
											<span className="text-sm font-bold" style={{ color: row.color }}>
												{row.count}
											</span>
										</button>
									))}
								</div>
							</div>

							<div className="border-b px-4 py-4" style={{ borderBottomColor: COLORS.borderSoft }}>
								<h3 className="text-[13px] font-bold" style={{ color: COLORS.text }}>
									By Advisor
								</h3>
								<div className="mt-3 space-y-2">
									{advisorSummary.map((advisor) => (
										<div key={advisor.name} className="flex items-center justify-between">
											<div className="flex min-w-0 items-center gap-2">
												<span
													className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
													style={{ background: advisor.color }}
												>
													{advisor.initials}
												</span>
												<span className="truncate text-[12px]" style={{ color: COLORS.textSec }}>
													{advisor.name}
												</span>
											</div>
											<span className="text-[12px] font-semibold" style={{ color: COLORS.textMuted }}>
												{advisor.count}
											</span>
										</div>
									))}
								</div>
							</div>

							<div className="border-b px-4 py-4" style={{ borderBottomColor: COLORS.borderSoft }}>
								<h3 className="text-[13px] font-bold" style={{ color: COLORS.text }}>
									Upcoming Deadlines
								</h3>
								<div className="mt-3 space-y-2">
									{DEADLINES.map((deadline) => (
										<div key={deadline.title} className="rounded-lg border bg-white px-2.5 py-2" style={{ borderColor: COLORS.borderSoft }}>
											<div className="text-[11px] font-bold" style={{ color: deadline.color }}>
												{deadline.date}
											</div>
											<div className="mt-0.5 text-[12px] font-semibold" style={{ color: COLORS.text }}>
												{deadline.title}
											</div>
											<div className="text-[11px] leading-tight" style={{ color: COLORS.textMuted }}>
												{deadline.sub}
											</div>
										</div>
									))}
								</div>
							</div>

							<div className="px-4 py-4">
								<h3 className="text-[13px] font-bold" style={{ color: COLORS.text }}>
									Notification Preferences
								</h3>
								<div className="mt-2 space-y-1.5">
									{PREF_OPTIONS.map(([label, key]) => (
										<div key={key} className="flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-white">
											<span className="text-[12px]" style={{ color: COLORS.textSec }}>
												{label}
											</span>
											<button
												onClick={() => togglePref(key)}
												className="relative h-5 w-9 rounded-full"
												style={{ background: prefs[key] ? COLORS.teal : COLORS.border }}
											>
												<span
													className="absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all"
													style={{ left: prefs[key] ? '16px' : '2px' }}
												/>
											</button>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
