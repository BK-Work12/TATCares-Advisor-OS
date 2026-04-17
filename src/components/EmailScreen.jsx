import React, { useMemo, useState } from 'react';
import { ChevronLeft, Mail, Plus, Search, Send, Lock, X } from 'lucide-react';
import { COLORS, cardShadow } from './tatcaresShared';

const TEMPLATES = [
  {
    label: 'Ashley Qualification',
    subject: 'Your next step with TATCares - 3 quick questions',
    body:
      'Hi [First Name],\n\nThank you for your interest in TATCares. Please complete this quick qualifier:\n[Ashley Qualification Link]\n\nAngela Bernard\nRelationship Manager, TakeAway Tax',
  },
  {
    label: '1040 Upload Reminder',
    subject: 'One last step - please upload your prior year return',
    body:
      'Hi [First Name],\n\nYou are almost done with your intake. We are waiting on your prior year 1040.\n\nUpload it here: [Upload Link]\n\nAngela Bernard\nRelationship Manager, TakeAway Tax',
  },
  {
    label: 'Consultation Confirmation',
    subject: 'Your TATCares consultation is confirmed',
    body:
      'Hi [First Name],\n\nYour consultation is confirmed.\n\nDate: [Date]\nTime: [Time]\nZoom Link: [Link]\n\nAngela Bernard\nRelationship Manager, TakeAway Tax',
  },
  {
    label: 'Renewal Reminder',
    subject: 'Your TATCares subscription renews soon',
    body:
      'Hi [First Name],\n\nYour TATCares subscription renews on [Renewal Date].\n\nIf you have any questions, please reply.\n\nAngela Bernard\nRelationship Manager, TakeAway Tax',
  },
];

const THREADS = [
  {
    id: 't1',
    folder: 'inbox',
    client: 'Sandra Kim',
    email: 'sandra@example.com',
    advisor: 'Yvonne Hollis-Cobb',
    location: 'Katy',
    tier: 'T2',
    subject: '1040 upload - your intake is almost done',
    unread: true,
    ts: 1,
    messages: [
      {
        from: 'Angela',
        to: 'Sandra Kim',
        date: 'Apr 14 · 10:00 AM',
        body: 'Hi Sandra,\n\nYou are almost done with intake. Please upload your prior year 1040.\n\nAngela Bernard',
      },
      {
        from: 'Sandra Kim',
        to: 'Angela',
        date: 'Today, 9:30 AM',
        body: 'I am having trouble locating the 2023 return. Can I upload 2022 first?',
      },
    ],
  },
  {
    id: 't2',
    folder: 'inbox',
    client: 'Marcus Johnson',
    email: 'marcus@example.com',
    advisor: 'Yvonne Hollis-Cobb',
    location: 'Katy',
    tier: 'T2',
    subject: 'Your discovery call is confirmed - today at 3:30 PM',
    unread: true,
    ts: 2,
    messages: [
      {
        from: 'Angela',
        to: 'Marcus Johnson',
        date: 'Apr 14 · 3:00 PM',
        body: 'Your discovery call is confirmed for today at 3:30 PM. Zoom Link: [Link]',
      },
      {
        from: 'Marcus Johnson',
        to: 'Angela',
        date: 'Today, 8:00 AM',
        body: 'Thank you. I will be on the call at 3:30 PM.',
      },
    ],
  },
  {
    id: 't3',
    folder: 'inbox',
    client: 'Tina Brooks',
    email: 'tina@example.com',
    advisor: 'Yvonne Hollis-Cobb',
    location: 'Katy',
    tier: 'T2',
    subject: 'Schedule your TATCares consultation',
    unread: true,
    ts: 3,
    messages: [
      {
        from: 'Angela',
        to: 'Tina Brooks',
        date: 'Apr 12 · 9:00 AM',
        body: 'Are any of these times available for your consultation?',
      },
      {
        from: 'Tina Brooks',
        to: 'Angela',
        date: 'Yesterday, 4:15 PM',
        body: 'Can we do next week? Monday morning works.',
      },
    ],
  },
  {
    id: 't4',
    folder: 'inbox',
    client: 'Kevin Marsh',
    email: 'kevin@example.com',
    advisor: 'David Reyes',
    location: 'Downtown Houston',
    tier: 'T1',
    subject: 'Consultation confirmed - April 18 at 10 AM',
    unread: false,
    ts: 4,
    messages: [
      {
        from: 'Angela',
        to: 'Kevin Marsh',
        date: 'Apr 13 · 11:00 AM',
        body: 'Your consultation with David Reyes is confirmed.',
      },
    ],
  },
  {
    id: 'ta1',
    folder: 'advisor-threads',
    readonly: true,
    client: 'Jordan Crawford',
    email: 'jordan@example.com',
    advisor: 'Yvonne Hollis-Cobb',
    location: 'Katy',
    tier: 'T3',
    subject: 'Re: Your 2024 TATCares tax strategy proposal',
    unread: true,
    ts: 1,
    messages: [
      {
        from: 'Yvonne Hollis-Cobb',
        to: 'Jordan Crawford',
        date: 'Apr 13 · 2:30 PM',
        body: 'Your strategy proposal is ready and available in your portal.',
      },
      {
        from: 'Jordan Crawford',
        to: 'Yvonne Hollis-Cobb',
        date: 'Today, 8:14 AM',
        body: 'Question on DBP contribution based on higher Q1 income.',
      },
    ],
  },
  {
    id: 'ta2',
    folder: 'advisor-threads',
    readonly: true,
    client: 'Nina Foster',
    email: 'nina@example.com',
    advisor: 'Yvonne Hollis-Cobb',
    location: 'Katy',
    tier: 'T2',
    subject: 'Re: 2024 Tax Strategy Proposal - Augusta Rule question',
    unread: false,
    ts: 2,
    messages: [
      {
        from: 'Nina Foster',
        to: 'Yvonne Hollis-Cobb',
        date: 'Apr 13 · 9:30 AM',
        body: 'Question about required documentation for Augusta Rule.',
      },
    ],
  },
  {
    id: 'ts1',
    folder: 'sent',
    client: 'Rachel Torres',
    email: 'rachel@example.com',
    advisor: 'David Reyes',
    location: 'Downtown Houston',
    tier: 'T1',
    subject: 'Your next step with TATCares - 3 quick questions',
    unread: false,
    ts: 1,
    messages: [
      {
        from: 'Angela',
        to: 'Rachel Torres',
        date: 'Apr 14 · 9:00 AM',
        body: 'Please complete the qualifier when you have a chance.',
      },
    ],
  },
  {
    id: 'ts2',
    folder: 'sent',
    client: 'Carla Reyes',
    email: 'carla@example.com',
    advisor: 'Priya Shankar',
    location: 'Pearland',
    tier: 'T2',
    subject: 'Welcome to TATCares - your next steps',
    unread: false,
    ts: 2,
    messages: [
      {
        from: 'Angela',
        to: 'Carla Reyes',
        date: 'Apr 10 · 10:00 AM',
        body: 'Welcome to TATCares. I am here to make your onboarding smooth.',
      },
    ],
  },
];

const ADVISOR_COLORS = {
  'Yvonne Hollis-Cobb': COLORS.teal,
  'David Reyes': '#5B4A8B',
  'Priya Shankar': COLORS.gold,
};

const TIER_BG = { T1: '#EEF3FC', T2: '#F3EFFA', T3: '#E8F5EE' };
const TIER_COLOR = { T1: '#2C5F7F', T2: '#5B4A8B', T3: '#1A7A4A' };

function initials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function uiDateNow() {
  return 'Just now';
}

export default function EmailScreen() {
  const [threads, setThreads] = useState(THREADS);
  const [folder, setFolder] = useState('inbox');
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [advisorFilter, setAdvisorFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [search, setSearch] = useState('');
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeTo, setComposeTo] = useState('');
  const [composeCc, setComposeCc] = useState('');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [toast, setToast] = useState('');

  const filteredThreads = useMemo(() => {
    const q = search.toLowerCase();
    const list = threads
      .filter((thread) => {
        if (thread.folder !== folder) return false;
        if (advisorFilter && thread.advisor !== advisorFilter) return false;
        if (locationFilter && thread.location !== locationFilter) return false;
        if (q && !thread.client.toLowerCase().includes(q) && !thread.subject.toLowerCase().includes(q)) return false;
        return true;
      })
      .slice();

    list.sort((a, b) => {
      if (sortBy === 'newest') return a.ts - b.ts;
      if (sortBy === 'oldest') return b.ts - a.ts;
      if (sortBy === 'unread') return Number(b.unread) - Number(a.unread);
      if (sortBy === 'name') return a.client.localeCompare(b.client);
      return 0;
    });

    return list;
  }, [threads, folder, advisorFilter, locationFilter, sortBy, search]);

  const activeThread = useMemo(
    () => threads.find((thread) => thread.id === activeThreadId) || null,
    [threads, activeThreadId],
  );

  const inboxUnread = useMemo(
    () => threads.filter((thread) => thread.folder === 'inbox' && thread.unread).length,
    [threads],
  );

  const visibleUnread = filteredThreads.filter((thread) => thread.unread).length;
  const detailViewOpen = composeOpen || Boolean(activeThread);

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(''), 2200);
  };

  const openCompose = (preThread = null) => {
    setActiveThreadId(null);
    setReplyOpen(false);
    setComposeOpen(true);
    setComposeTo(preThread ? preThread.email : '');
    setComposeCc('');
    setComposeSubject('');
    setComposeBody('');
  };

  const openThread = (threadId) => {
    setComposeOpen(false);
    setReplyOpen(false);
    setActiveThreadId(threadId);

    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              unread: false,
            }
          : thread,
      ),
    );
  };

  const sendReply = () => {
    if (!activeThread || activeThread.readonly || !replyText.trim()) return;

    setThreads((prev) =>
      prev.map((thread) => {
        if (thread.id !== activeThread.id) return thread;
        return {
          ...thread,
          messages: [
            ...thread.messages,
            {
              from: 'Angela',
              to: thread.client,
              date: uiDateNow(),
              body: replyText.trim(),
            },
          ],
        };
      }),
    );

    setReplyText('');
    setReplyOpen(false);
    showToast('Reply sent');
  };

  const sendCompose = () => {
    if (!composeTo.trim() || !composeBody.trim()) return;
    const newThread = {
      id: `n-${Date.now()}`,
      folder: 'sent',
      client: composeTo,
      email: composeTo,
      advisor: 'Yvonne Hollis-Cobb',
      location: 'Katy',
      tier: 'T1',
      subject: composeSubject.trim() || '(No subject)',
      unread: false,
      ts: 0,
      messages: [
        {
          from: 'Angela',
          to: composeTo,
          date: uiDateNow(),
          body: composeBody,
        },
      ],
    };

    setThreads((prev) => [newThread, ...prev]);
    setFolder('sent');
    setComposeOpen(false);
    showToast('Email sent');
  };

  const applyTemplate = (template) => {
    setComposeSubject(template.subject);
    setComposeBody(template.body);
  };

  return (
    <div className="flex h-full min-h-0 flex-1 overflow-hidden">
      <div
        className={`${detailViewOpen ? 'hidden lg:flex' : 'flex'} w-full shrink-0 flex-col border-r sm:w-[22rem] lg:w-80`}
        style={{ borderColor: COLORS.border, background: COLORS.card }}
      >
        <div className="shrink-0 border-b px-3.5 pb-2.5 pt-3" style={{ borderColor: COLORS.border }}>
          <button
            onClick={() => openCompose(null)}
            className="mb-2.5 flex w-full items-center justify-center gap-1.5 rounded-[10px] px-3 py-2 text-[13px] font-bold text-white"
            style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.25)' }}
          >
            <Plus size={12} strokeWidth={2.5} />
            Compose New Email
          </button>
          <div className="relative">
            <Search
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2"
              style={{ color: COLORS.textMuted }}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search emails..."
              className="w-full rounded-lg border py-1.5 pl-7 pr-2.5 text-[12.5px] outline-none"
              style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.text }}
            />
          </div>
        </div>

        <div className="shrink-0 border-b px-3.5 py-2" style={{ borderColor: COLORS.border }}>
          <div className="grid grid-cols-2 gap-1.5 sm:flex sm:flex-wrap">
          <select
            value={advisorFilter}
            onChange={(event) => setAdvisorFilter(event.target.value)}
              className="min-w-0 rounded-lg border px-2 py-1.5 text-[11.5px] outline-none sm:flex-1"
            style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.card }}
          >
            <option value="">All Advisors</option>
            <option value="Yvonne Hollis-Cobb">Yvonne Hollis-Cobb</option>
            <option value="David Reyes">David Reyes</option>
            <option value="Priya Shankar">Priya Shankar</option>
          </select>
          <select
            value={locationFilter}
            onChange={(event) => setLocationFilter(event.target.value)}
              className="min-w-0 rounded-lg border px-2 py-1.5 text-[11.5px] outline-none sm:flex-1"
            style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.card }}
          >
            <option value="">All Locations</option>
            <option value="Katy">Katy</option>
            <option value="Downtown Houston">Downtown Houston</option>
            <option value="Pearland">Pearland</option>
          </select>
          <select
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
              className="col-span-2 min-w-0 rounded-lg border px-2 py-1.5 text-[11.5px] outline-none sm:col-span-1 sm:w-auto"
            style={{ borderColor: COLORS.border, color: COLORS.text, background: COLORS.card }}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="unread">Unread</option>
            <option value="name">Name A-Z</option>
          </select>
          </div>
        </div>

        <div className="flex shrink-0 border-b" style={{ borderColor: COLORS.border }}>
          {[
            { id: 'inbox', label: 'Inbox' },
            { id: 'advisor-threads', label: 'Advisor Threads', readonly: true },
            { id: 'sent', label: 'Sent' },
          ].map((tab) => {
            const active = folder === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setFolder(tab.id);
                  setActiveThreadId(null);
                  setComposeOpen(false);
                }}
                className="flex flex-1 flex-col items-center gap-0.5 border-b-2 px-1.5 py-2"
                style={{
                  borderBottomColor: active ? COLORS.teal : 'transparent',
                  color: active ? COLORS.tealDeep : COLORS.textMuted,
                  fontWeight: active ? 700 : 600,
                }}
              >
                <span className="flex items-center gap-1 text-[11px]">
                  {tab.label}
                  {tab.id === 'inbox' && inboxUnread > 0 && (
                    <span
                      className="rounded-full px-1.5 py-[1px] text-[9px] font-extrabold text-white"
                      style={{ background: COLORS.red }}
                    >
                      {inboxUnread}
                    </span>
                  )}
                </span>
                {tab.readonly && (
                  <span
                    className="rounded px-1.5 py-[1px] text-[9px] font-bold"
                    style={{ background: '#EEF3FC', color: '#2C5F7F' }}
                  >
                    View Only
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredThreads.length === 0 ? (
            <div className="px-4 py-8 text-center text-[13px]" style={{ color: COLORS.textMuted }}>
              No emails match your filters.
            </div>
          ) : (
            filteredThreads.map((thread) => {
              const isActive = activeThreadId === thread.id;
              const advisorColor = ADVISOR_COLORS[thread.advisor] || COLORS.textMuted;
              const lastMessage = thread.messages[thread.messages.length - 1];
              return (
                <button
                  key={thread.id}
                  className="w-full border-b px-3.5 py-3 text-left"
                  style={{
                    borderColor: COLORS.borderSoft,
                    background: isActive ? COLORS.tealTint : thread.unread ? '#FFFCFC' : 'transparent',
                  }}
                  onClick={() => openThread(thread.id)}
                >
                  <div className="flex items-start gap-2">
                    <div className="mt-1 w-2 shrink-0">
                      {thread.unread ? (
                        <span className="block h-[7px] w-[7px] rounded-full" style={{ background: COLORS.red }}></span>
                      ) : null}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center justify-between gap-2">
                        <span
                          className="truncate text-[13px]"
                          style={{ color: COLORS.text, fontWeight: thread.unread ? 700 : 600 }}
                        >
                          {thread.client}
                        </span>
                        <span className="text-[10px]" style={{ color: COLORS.textMuted }}>
                          {lastMessage.date.split('·')[0].trim()}
                        </span>
                      </div>
                      <div className="mb-1 truncate text-[12px]" style={{ color: COLORS.textSec }}>
                        {thread.subject}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span
                          className="flex h-3.5 w-3.5 items-center justify-center rounded text-[7px] font-extrabold text-white"
                          style={{ background: advisorColor }}
                        >
                          {initials(thread.advisor)}
                        </span>
                        <span className="text-[10.5px]" style={{ color: COLORS.textMuted }}>
                          {thread.advisor.split(' ')[0]}
                        </span>
                        <span style={{ color: COLORS.border }}>·</span>
                        <span className="text-[10.5px]" style={{ color: COLORS.textMuted }}>
                          {thread.location}
                        </span>
                        <span
                          className="rounded px-1.5 py-[1px] text-[9px] font-bold"
                          style={{ background: TIER_BG[thread.tier], color: TIER_COLOR[thread.tier] }}
                        >
                          {thread.tier}
                        </span>
                        {thread.readonly && (
                          <span
                            className="rounded px-1.5 py-[1px] text-[9px] font-bold"
                            style={{ background: '#EEF3FC', color: '#2C5F7F' }}
                          >
                            View Only
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>

        <div className="shrink-0 border-t px-3.5 py-2 text-[11px]" style={{ borderColor: COLORS.borderSoft, color: COLORS.textMuted }}>
          {filteredThreads.length} thread{filteredThreads.length !== 1 ? 's' : ''}
          {folder === 'inbox' && visibleUnread > 0 ? ` · ${visibleUnread} unread` : ''}
        </div>
      </div>

      <div className={`${detailViewOpen ? 'flex' : 'hidden lg:flex'} min-w-0 flex-1 flex-col overflow-hidden`}>
        {!composeOpen && activeThread && (
          <>
            <div className="shrink-0 border-b px-4 py-3.5 sm:px-5 lg:px-5.5" style={{ borderColor: COLORS.border, background: COLORS.card }}>
              <div className="mb-2 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <button
                    onClick={() => {
                      setActiveThreadId(null);
                      setReplyOpen(false);
                    }}
                    className="mb-2 inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold lg:hidden"
                    style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.bg }}
                  >
                    <ChevronLeft size={12} />
                    Back to Inbox
                  </button>
                  <h3
                    className="mb-1 truncate text-[15px] font-bold"
                    style={{ color: COLORS.text, letterSpacing: '-0.02em' }}
                  >
                    {activeThread.subject}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="flex items-center gap-1.5 rounded-md border px-2 py-0.75 text-[11.5px]"
                      style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.textSec }}
                    >
                      <span
                        className="flex h-3.5 w-3.5 items-center justify-center rounded text-[7px] font-extrabold text-white"
                        style={{ background: ADVISOR_COLORS[activeThread.advisor] || COLORS.textMuted }}
                      >
                        {initials(activeThread.advisor)}
                      </span>
                      {activeThread.advisor}
                    </span>
                    <span className="text-[11.5px]" style={{ color: COLORS.textMuted }}>
                      {activeThread.location}
                    </span>
                    <span className="text-[11.5px]" style={{ color: COLORS.textMuted }}>
                      {activeThread.messages.length} messages
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap justify-end gap-1.5">
                  {!activeThread.readonly && (
                    <button
                      onClick={() => setReplyOpen((prev) => !prev)}
                      className="rounded-lg border px-3.5 py-1.5 text-[12px] font-bold"
                      style={{ borderColor: 'rgba(47,125,121,.2)', background: COLORS.tealTint, color: COLORS.tealDeep }}
                    >
                      Reply
                    </button>
                  )}
                  <button
                    onClick={() => openCompose(activeThread)}
                    className="rounded-lg border px-3.5 py-1.5 text-[12px] font-semibold"
                    style={{ borderColor: COLORS.border, background: COLORS.card, color: COLORS.textSec }}
                  >
                    Forward
                  </button>
                </div>
              </div>

              {activeThread.readonly && (
                <div
                  className="rounded-lg border px-3 py-2 text-[12px] font-semibold"
                  style={{ background: '#EEF3FC', borderColor: 'rgba(44,95,127,.15)', color: '#2C5F7F' }}
                >
                  <Lock size={12} className="mr-1 inline" />
                  This is a client-advisor thread. You can read it but cannot reply.
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 lg:px-5.5" style={{ background: COLORS.bg }}>
              {activeThread.messages.map((message, index) => {
                const isRm = message.from === 'Angela';
                const isAdvisor = message.from === activeThread.advisor;
                const avatarBg = isRm
                  ? COLORS.teal
                  : isAdvisor
                    ? ADVISOR_COLORS[activeThread.advisor] || '#5B4A8B'
                    : '#5B4A8B';
                const avatarText = isRm ? 'AB' : initials(message.from);

                return (
                  <div key={`${message.date}-${index}`} className="mb-5">
                    <div className="mb-2.5 flex items-center gap-2.5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white"
                        style={{ background: avatarBg }}
                      >
                        {avatarText}
                      </span>
                      <div>
                        <div className="text-[13px] font-bold" style={{ color: COLORS.text }}>
                          {isRm ? 'Angela Bernard, RM' : message.from}
                        </div>
                        <div className="text-[11px]" style={{ color: COLORS.textMuted }}>
                          {message.date} · To: {message.to}
                        </div>
                      </div>
                    </div>
                    <div
                      className="ml-2 rounded-xl border px-3.5 py-3 text-[13px] leading-[1.7] whitespace-pre-line sm:ml-10 sm:px-4.5 sm:py-3.5"
                      style={{ borderColor: COLORS.border, background: COLORS.card, color: COLORS.textSec }}
                    >
                      {message.body}
                    </div>
                  </div>
                );
              })}
            </div>

            {replyOpen && !activeThread.readonly && (
              <div className="shrink-0 border-t px-4 py-3.5 sm:px-5 lg:px-5.5" style={{ borderColor: COLORS.border, background: COLORS.card }}>
                <div className="mb-2 flex items-center gap-2">
                  <span
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-extrabold text-white"
                    style={{ background: COLORS.teal }}
                  >
                    AB
                  </span>
                  <span className="text-[12px]" style={{ color: COLORS.textMuted }}>
                    Replying as Angela Bernard, Relationship Manager
                  </span>
                </div>
                <textarea
                  value={replyText}
                  onChange={(event) => setReplyText(event.target.value)}
                  placeholder="Write your reply..."
                  className="mb-2.5 h-22 w-full resize-none rounded-[10px] border px-3.5 py-2.5 text-[13px] leading-[1.6] outline-none"
                  style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.text }}
                />
                <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={() => openCompose(activeThread)}
                    className="rounded-lg border px-3 py-1.25 text-[12px] font-semibold"
                    style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.textSec }}
                  >
                    Use Template
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setReplyOpen(false);
                        setReplyText('');
                      }}
                      className="rounded-lg border px-3.5 py-1.5 text-[12px] font-semibold"
                      style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.textSec }}
                    >
                      Cancel
                    </button>
                    <button
                      onClick={sendReply}
                      className="rounded-lg px-4.5 py-1.5 text-[12px] font-bold text-white"
                      style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.25)' }}
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {composeOpen && (
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="flex shrink-0 items-center justify-between border-b px-4 py-3.5 sm:px-5 lg:px-5.5" style={{ borderColor: COLORS.border, background: COLORS.card }}>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setComposeOpen(false)}
                  className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[11px] font-semibold lg:hidden"
                  style={{ borderColor: COLORS.border, color: COLORS.textSec, background: COLORS.bg }}
                >
                  <ChevronLeft size={12} />
                  Back
                </button>
                <h3 className="text-[15px] font-bold" style={{ color: COLORS.text }}>
                  New Message
                </h3>
              </div>
              <button
                onClick={() => setComposeOpen(false)}
                className="hidden rounded-lg border px-3 py-1.25 text-[12px] lg:block"
                style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.textSec }}
              >
                Discard
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3.5 py-4 sm:px-5 sm:py-5 lg:px-5.5" style={{ background: COLORS.bg }}>
              <div
                className="mx-auto w-full max-w-180 rounded-2xl border px-3.5 py-4 sm:px-6 sm:py-5"
                style={{ borderColor: COLORS.border, background: COLORS.card, boxShadow: cardShadow }}
              >
                <div className="flex items-center gap-3 border-b py-2" style={{ borderColor: COLORS.borderSoft }}>
                  <span className="w-13 text-[11px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.06em' }}>
                    To
                  </span>
                  <input
                    value={composeTo}
                    onChange={(event) => setComposeTo(event.target.value)}
                    placeholder="Client email or name..."
                    className="flex-1 border-none bg-transparent text-[13px] outline-none"
                    style={{ color: COLORS.text }}
                  />
                </div>

                <div className="flex items-center gap-3 border-b py-2" style={{ borderColor: COLORS.borderSoft }}>
                  <span className="w-13 text-[11px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.06em' }}>
                    CC
                  </span>
                  <input
                    value={composeCc}
                    onChange={(event) => setComposeCc(event.target.value)}
                    placeholder="CC (optional)..."
                    className="flex-1 border-none bg-transparent text-[13px] outline-none"
                    style={{ color: COLORS.text }}
                  />
                </div>

                <div className="flex items-center gap-3 border-b py-2" style={{ borderColor: COLORS.borderSoft }}>
                  <span className="w-13 text-[11px] font-extrabold uppercase" style={{ color: COLORS.textMuted, letterSpacing: '0.06em' }}>
                    Subject
                  </span>
                  <input
                    value={composeSubject}
                    onChange={(event) => setComposeSubject(event.target.value)}
                    placeholder="Subject line..."
                    className="flex-1 border-none bg-transparent text-[13px] outline-none"
                    style={{ color: COLORS.text }}
                  />
                </div>

                <div className="border-b py-2.5" style={{ borderColor: COLORS.borderSoft }}>
                  <div
                    className="mb-2 text-[10px] font-extrabold uppercase"
                    style={{ color: COLORS.textMuted, letterSpacing: '0.08em' }}
                  >
                    RM Templates
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {TEMPLATES.map((template) => (
                      <button
                        key={template.label}
                        onClick={() => applyTemplate(template)}
                        className="rounded-[7px] border px-2.5 py-1 text-[11px] font-semibold"
                        style={{ borderColor: COLORS.border, background: COLORS.bg, color: COLORS.textSec }}
                      >
                        {template.label}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={composeBody}
                  onChange={(event) => setComposeBody(event.target.value)}
                  placeholder="Write your message..."
                  className="min-h-50 w-full resize-none border-none bg-transparent pt-3.5 text-[13px] leading-[1.7] outline-none"
                  style={{ color: COLORS.text }}
                />

                <div className="flex flex-col gap-2.5 border-t pt-3 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: COLORS.borderSoft }}>
                  <span className="text-[12px]" style={{ color: COLORS.textMuted }}>
                    Sending as Angela Bernard, RM
                  </span>
                  <button
                    onClick={sendCompose}
                    className="inline-flex items-center gap-2 rounded-[10px] px-6 py-2.25 text-[13px] font-bold text-white"
                    style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.25)' }}
                  >
                    <Send size={13} />
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {!composeOpen && !activeThread && (
          <div className="hidden flex-1 flex-col items-center justify-center gap-3 lg:flex" style={{ background: COLORS.bg }}>
            <Mail size={44} style={{ color: COLORS.textMuted }} strokeWidth={1.5} />
            <h3 className="text-[15px] font-bold" style={{ color: COLORS.text }}>
              Select a thread to read
            </h3>
            <p className="max-w-70 text-center text-[13px] leading-[1.6]" style={{ color: COLORS.textMuted }}>
              Choose a thread from the left, or compose a new message.
            </p>
            <button
              onClick={() => openCompose(null)}
              className="mt-1 rounded-[10px] px-5 py-2.25 text-[13px] font-bold text-white"
              style={{ background: COLORS.red, boxShadow: '0 4px 14px rgba(198,61,47,.25)' }}
            >
              Compose New Email
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div
          className="pointer-events-none fixed bottom-4 left-3 right-3 z-50 inline-flex items-center justify-between gap-2 rounded-xl px-4 py-2.5 text-[13px] font-bold text-white sm:bottom-6 sm:left-auto sm:right-6"
          style={{ background: COLORS.teal, boxShadow: '0 4px 14px rgba(31,41,55,.2)' }}
        >
          <span>{toast}</span>
          <button className="pointer-events-auto" onClick={() => setToast('')}>
            <X size={14} />
          </button>
        </div>
      )}
    </div>
  );
}