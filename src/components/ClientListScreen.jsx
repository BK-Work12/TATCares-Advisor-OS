import React, { useEffect, useMemo, useState } from 'react';
import { MessageSquare, MoreVertical, Search } from 'lucide-react';
import { COLORS, cardShadow } from './tatcaresShared';

const STAGE_COLORS = {
  'New Lead': { bg: '#F1EFE8', color: '#667085' },
  'Ashley Qualified': { bg: '#FEF9EE', color: '#7a5a00' },
  'Intake In Progress': { bg: COLORS.tealTint, color: COLORS.tealDeep },
  'Advisor Review': { bg: COLORS.redTint, color: COLORS.red },
  'Proposal Building': { bg: '#F3EFFA', color: '#5B4A8B' },
  'Proposal Sent': { bg: '#EEF3FC', color: '#2C5F7F' },
  'Active Subscriber': { bg: '#E8F5EE', color: COLORS.green },
  'Renewal Decision': { bg: COLORS.redTint, color: COLORS.red },
};

const TIER_COLORS = {
  T1: { bg: '#EEF3FC', color: '#2C5F7F' },
  T2: { bg: '#F3EFFA', color: '#5B4A8B' },
  T3: { bg: '#E8F5EE', color: COLORS.green },
};

const INITIAL_CLIENTS = [
  { id: 1, name: 'Jordan Crawford', email: 'jordan@example.com', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', stage: 'Active Subscriber', ffs: 68, tier: 'T3', status: 'Active', daysInactive: 0, renewal: 'Jun 1' },
  { id: 2, name: 'Sandra Kim', email: 'sandra@example.com', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', stage: 'Intake In Progress', ffs: 41, tier: 'T2', status: 'Active', daysInactive: 5, renewal: '' },
  { id: 3, name: 'Derek Wilson', email: 'derek@example.com', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', stage: 'Renewal Decision', ffs: 58, tier: 'T2', status: 'Active', daysInactive: 14, renewal: 'Apr 1' },
  { id: 4, name: 'Henry Ellis', email: 'henry@example.com', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', stage: 'Active Subscriber', ffs: 91, tier: 'T3', status: 'Active', daysInactive: 0, renewal: 'Jun 15' },
  { id: 5, name: 'Nina Foster', email: 'nina@example.com', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', stage: 'Proposal Sent', ffs: 55, tier: 'T2', status: 'Active', daysInactive: 2, renewal: '' },
  { id: 6, name: 'Marcus Johnson', email: 'marcus@example.com', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', stage: 'New Lead', ffs: 0, tier: 'T2', status: 'Pending', daysInactive: 2, renewal: '' },
  { id: 7, name: 'Rachel Torres', email: 'rachel@example.com', advisor: 'David Reyes', location: 'Downtown Houston', stage: 'New Lead', ffs: 0, tier: 'T1', status: 'Pending', daysInactive: 1, renewal: '' },
  { id: 8, name: 'Brian Wallace', email: 'brian@example.com', advisor: 'David Reyes', location: 'Downtown Houston', stage: 'New Lead', ffs: 0, tier: 'T3', status: 'Pending', daysInactive: 6, renewal: '' },
  { id: 9, name: 'Tina Brooks', email: 'tina@example.com', advisor: 'David Reyes', location: 'Downtown Houston', stage: 'Ashley Qualified', ffs: 0, tier: 'T2', status: 'Pending', daysInactive: 3, renewal: '' },
  { id: 10, name: 'Kevin Marsh', email: 'kevin@example.com', advisor: 'David Reyes', location: 'Downtown Houston', stage: 'Ashley Qualified', ffs: 0, tier: 'T1', status: 'Active', daysInactive: 1, renewal: '' },
  { id: 11, name: 'Lisa Nguyen', email: 'lisa@example.com', advisor: 'David Reyes', location: 'Downtown Houston', stage: 'Intake In Progress', ffs: 22, tier: 'T2', status: 'Active', daysInactive: 9, renewal: '' },
  { id: 12, name: 'Omar Patel', email: 'omar@example.com', advisor: 'Priya Shankar', location: 'Katy', stage: 'Intake In Progress', ffs: 0, tier: 'T3', status: 'Active', daysInactive: 1, renewal: '' },
  { id: 13, name: 'Priya Sharma', email: 'priya@example.com', advisor: 'Priya Shankar', location: 'Katy', stage: 'Advisor Review', ffs: 54, tier: 'T2', status: 'Active', daysInactive: 2, renewal: '' },
  { id: 14, name: 'David Okonkwo', email: 'david@example.com', advisor: 'Priya Shankar', location: 'Katy', stage: 'Advisor Review', ffs: 38, tier: 'T3', status: 'Active', daysInactive: 1, renewal: '' },
  { id: 15, name: 'James Park', email: 'james@example.com', advisor: 'Priya Shankar', location: 'Downtown Houston', stage: 'Proposal Building', ffs: 61, tier: 'T2', status: 'Active', daysInactive: 4, renewal: '' },
  { id: 16, name: 'Angela Reeves', email: 'angela@example.com', advisor: 'Priya Shankar', location: 'Downtown Houston', stage: 'Proposal Building', ffs: 45, tier: 'T3', status: 'Active', daysInactive: 2, renewal: '' },
  { id: 17, name: 'Robert Chen', email: 'robert@example.com', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', stage: 'Proposal Sent', ffs: 79, tier: 'T1', status: 'Active', daysInactive: 10, renewal: '' },
  { id: 18, name: 'Carol Williams', email: 'carol@example.com', advisor: 'Yvonne Hollis-Cobb', location: 'Katy', stage: 'Active Subscriber', ffs: 84, tier: 'T3', status: 'Active', daysInactive: 0, renewal: 'May 1' },
  { id: 19, name: 'Diane Moore', email: 'diane@example.com', advisor: 'David Reyes', location: 'Downtown Houston', stage: 'Active Subscriber', ffs: 49, tier: 'T2', status: 'Active', daysInactive: 18, renewal: 'May 15' },
  { id: 20, name: 'Melissa Grant', email: 'melissa@example.com', advisor: 'Priya Shankar', location: 'Katy', stage: 'Renewal Decision', ffs: 72, tier: 'T1', status: 'Active', daysInactive: 5, renewal: 'Apr 20' },
  { id: 21, name: 'Thomas Wren', email: 'thomas@example.com', advisor: 'David Reyes', location: 'Downtown Houston', stage: 'Active Subscriber', ffs: 77, tier: 'T2', status: 'Inactive', daysInactive: 45, renewal: '' },
  { id: 22, name: 'Carla Reyes', email: 'carla@example.com', advisor: 'Priya Shankar', location: 'Pearland', stage: 'Active Subscriber', ffs: 63, tier: 'T2', status: 'Active', daysInactive: 7, renewal: 'May 30' },
];

function initials(name) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function ffsColor(score) {
  if (score >= 75) return COLORS.green;
  if (score >= 55) return COLORS.gold;
  if (score > 0) return COLORS.red;
  return COLORS.textMuted;
}

export default function ClientListScreen({ onOpenClientWorkspace }) {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [search, setSearch] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const [stage, setStage] = useState('');
  const [tier, setTier] = useState('');
  const [sort, setSort] = useState('name');
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClientId, setMenuClientId] = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeMenu = () => setMenuOpen(false);
    window.addEventListener('click', closeMenu);
    return () => window.removeEventListener('click', closeMenu);
  }, [menuOpen]);

  const activeMenuClient = useMemo(
    () => clients.find((client) => client.id === menuClientId) || null,
    [clients, menuClientId]
  );

  const openMenu = (event, clientId) => {
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    setMenuClientId(clientId);
    setMenuPos({
      top: rect.bottom + window.scrollY + 6,
      left: Math.max(12, Math.min(rect.left + window.scrollX - 155, window.innerWidth - 240)),
    });
    setMenuOpen(true);
  };

  const handleQuickMessage = (event, client) => {
    event.stopPropagation();
    onOpenClientWorkspace?.(client);
  };

  const handleMenuAction = (action) => {
    if (!activeMenuClient) return;

    if (action === 'message') {
      onOpenClientWorkspace?.(activeMenuClient);
    }

    if (action === 'view') {
      onOpenClientWorkspace?.(activeMenuClient);
    }

    if (action === 'toggle-status') {
      setClients((prev) =>
        prev.map((client) =>
          client.id === activeMenuClient.id
            ? { ...client, status: client.status === 'Active' ? 'Inactive' : 'Active' }
            : client
        )
      );
    }

    if (action === 'delete') {
      const ok = window.confirm(`Delete ${activeMenuClient.name}?`);
      if (ok) {
        setClients((prev) => prev.filter((client) => client.id !== activeMenuClient.id));
      }
    }

    setMenuOpen(false);
  };

  const filteredClients = useMemo(() => {
    const filtered = clients.filter((client) => {
      const query = search.toLowerCase().trim();
      const matchesSearch =
        !query ||
        client.name.toLowerCase().includes(query) ||
        client.email.toLowerCase().includes(query);
      const matchesAdvisor = !advisor || client.advisor === advisor;
      const matchesLocation = !location || client.location === location;
      const matchesStatus = !status || client.status === status;
      const matchesStage = !stage || client.stage === stage;
      const matchesTier = !tier || client.tier === tier;

      return matchesSearch && matchesAdvisor && matchesLocation && matchesStatus && matchesStage && matchesTier;
    });

    filtered.sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      if (sort === 'ffs-desc') return b.ffs - a.ffs;
      if (sort === 'ffs-asc') return a.ffs - b.ffs;
      if (sort === 'inactive') return b.daysInactive - a.daysInactive;

      if (sort === 'stage') {
        const order = [
          'New Lead',
          'Ashley Qualified',
          'Intake In Progress',
          'Advisor Review',
          'Proposal Building',
          'Proposal Sent',
          'Active Subscriber',
          'Renewal Decision',
        ];
        return order.indexOf(a.stage) - order.indexOf(b.stage);
      }

      return 0;
    });

    return filtered;
  }, [advisor, clients, location, search, sort, stage, status, tier]);

  return (
    <div className="relative h-full overflow-hidden px-4 pb-5 pt-4 sm:px-5 lg:px-6 lg:pt-5">
      <div
        className="flex h-full flex-col overflow-hidden rounded-2xl border"
        style={{ background: COLORS.card, borderColor: COLORS.border, boxShadow: cardShadow }}
      >
        <div
          className="flex shrink-0 flex-wrap items-center gap-2 border-b px-4 py-3.5 lg:px-6"
          style={{ borderBottomColor: COLORS.border }}
        >
          <div className="relative min-w-0 w-full sm:max-w-65 sm:flex-1">
            <Search
              size={13}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2"
              color={COLORS.textMuted}
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search clients..."
              className="w-full rounded-[9px] border bg-transparent py-1.75 pl-8 pr-2.5 text-[12.5px] outline-none"
              style={{ borderColor: COLORS.border, color: COLORS.text }}
            />
          </div>

          <div className="hidden h-5 w-px lg:block" style={{ background: COLORS.border }}></div>

          <select
            value={advisor}
            onChange={(e) => setAdvisor(e.target.value)}
            className="w-full rounded-[9px] border bg-white px-2.5 py-1.75 text-[12.5px] outline-none sm:w-auto"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
          >
            <option value="">All Advisors</option>
            <option value="Yvonne Hollis-Cobb">Yvonne Hollis-Cobb</option>
            <option value="David Reyes">David Reyes</option>
            <option value="Priya Shankar">Priya Shankar</option>
          </select>

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-[9px] border bg-white px-2.5 py-1.75 text-[12.5px] outline-none sm:w-auto"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
          >
            <option value="">All Locations</option>
            <option value="Katy">Katy</option>
            <option value="Downtown Houston">Downtown Houston</option>
            <option value="Pearland">Pearland</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full rounded-[9px] border bg-white px-2.5 py-1.75 text-[12.5px] outline-none sm:w-auto"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            className="w-full rounded-[9px] border bg-white px-2.5 py-1.75 text-[12.5px] outline-none sm:w-auto"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
          >
            <option value="">All Stages</option>
            <option value="New Lead">New Lead</option>
            <option value="Ashley Qualified">Ashley Qualified</option>
            <option value="Intake In Progress">Intake In Progress</option>
            <option value="Advisor Review">Advisor Review</option>
            <option value="Proposal Building">Proposal Building</option>
            <option value="Proposal Sent">Proposal Sent</option>
            <option value="Active Subscriber">Active Subscriber</option>
            <option value="Renewal Decision">Renewal Decision</option>
          </select>

          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="w-full rounded-[9px] border bg-white px-2.5 py-1.75 text-[12.5px] outline-none sm:w-auto"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
          >
            <option value="">All Tiers</option>
            <option value="T1">T1</option>
            <option value="T2">T2</option>
            <option value="T3">T3</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full rounded-[9px] border bg-white px-2.5 py-1.75 text-[12.5px] outline-none sm:w-auto"
            style={{ borderColor: COLORS.border, color: COLORS.text }}
          >
            <option value="name">Sort: Name A-Z</option>
            <option value="name-desc">Sort: Name Z-A</option>
            <option value="ffs-desc">Sort: FFS High-Low</option>
            <option value="ffs-asc">Sort: FFS Low-High</option>
            <option value="stage">Sort: Pipeline Stage</option>
            <option value="inactive">Sort: Days Inactive</option>
          </select>

          <div className="w-full text-[12px] sm:ml-auto sm:w-auto" style={{ color: COLORS.textMuted }}>
            <strong style={{ color: COLORS.text }}>{filteredClients.length}</strong> clients
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#F7F5F2]">
          <div className="overflow-x-auto">
            <div style={{ minWidth: '980px' }}>
              <div
                className="grid grid-cols-[2.2fr_1fr_1.15fr_1fr_.75fr_1fr_1fr_.7fr] gap-2 border-b px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-widest lg:px-6"
                style={{ borderBottomColor: COLORS.border, color: COLORS.textMuted }}
              >
                <div>Client</div>
                <div>Advisor</div>
                <div>Stage</div>
                <div>FFS</div>
                <div>Tier</div>
                <div>Location</div>
                <div>Status</div>
                <div>Actions</div>
              </div>

              {filteredClients.map((client) => {
                const stageStyle = STAGE_COLORS[client.stage] || { bg: COLORS.bg, color: COLORS.textMuted };
                const tierStyle = TIER_COLORS[client.tier] || TIER_COLORS.T1;
                const advisorTone =
                  client.advisor === 'Yvonne Hollis-Cobb' ? COLORS.teal : client.advisor === 'David Reyes' ? '#5B4A8B' : '#B8860B';
                const statusClass =
                  client.status === 'Active'
                    ? { bg: '#E8F5EE', color: COLORS.green }
                    : client.status === 'Pending'
                      ? { bg: '#FEF9EE', color: '#7a5a00' }
                      : { bg: COLORS.bg, color: COLORS.textMuted };

                return (
                  <div
                    key={client.id}
                    className="grid cursor-pointer grid-cols-[2.2fr_1fr_1.15fr_1fr_.75fr_1fr_1fr_.7fr] items-center gap-2 border-b bg-white px-4 py-3 transition hover:bg-[#FAFAF8] lg:px-6"
                    style={{ borderBottomColor: COLORS.borderSoft }}
                    onClick={() => onOpenClientWorkspace?.(client)}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] text-[11px] font-extrabold"
                          style={{ background: tierStyle.bg, color: tierStyle.color }}
                        >
                          {initials(client.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="truncate text-[13px] font-bold" style={{ color: COLORS.text }}>
                            {client.name}
                          </div>
                          <div className="truncate text-[11.5px]" style={{ color: COLORS.textMuted }}>
                            {client.email}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex min-w-0 items-center gap-1.5">
                      <div
                        className="flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-md text-[8px] font-extrabold text-white"
                        style={{ background: advisorTone }}
                      >
                        {initials(client.advisor)}
                      </div>
                      <span className="truncate text-[12px]" style={{ color: COLORS.textSec }}>
                        {client.advisor.split(' ')[0]}
                      </span>
                    </div>

                    <div>
                      <span
                        className="inline-block whitespace-nowrap rounded-md px-2 py-1 text-[11px] font-bold"
                        style={{ background: stageStyle.bg, color: stageStyle.color }}
                      >
                        {client.stage}
                      </span>
                    </div>

                    <div>
                      {client.ffs > 0 ? (
                        <div className="flex items-center gap-1.5">
                          <div className="h-0.75 w-11 overflow-hidden rounded-full" style={{ background: COLORS.border }}>
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${client.ffs}%`, background: ffsColor(client.ffs) }}
                            ></div>
                          </div>
                          <span className="text-[11.5px] font-extrabold" style={{ color: ffsColor(client.ffs) }}>
                            {client.ffs}
                          </span>
                        </div>
                      ) : (
                        <span className="text-[12px]" style={{ color: COLORS.textMuted }}>
                          -
                        </span>
                      )}
                    </div>

                    <div>
                      <span
                        className="inline-block rounded-md px-2 py-1 text-[11px] font-bold"
                        style={{ background: tierStyle.bg, color: tierStyle.color }}
                      >
                        {client.tier}
                      </span>
                    </div>

                    <div className="truncate text-[12px]" style={{ color: COLORS.textSec }}>
                      {client.location}
                    </div>

                    <div>
                      <span
                        className="inline-block rounded-full px-2.5 py-1 text-[11px] font-bold"
                        style={{ background: statusClass.bg, color: statusClass.color }}
                      >
                        {client.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg border"
                        style={{ borderColor: COLORS.border, background: COLORS.bg }}
                        onClick={(e) => handleQuickMessage(e, client)}
                        title="Message client"
                      >
                        <MessageSquare size={13} color={COLORS.textMuted} />
                      </button>
                      <button
                        className="flex h-7 w-7 items-center justify-center rounded-lg border"
                        style={{ borderColor: COLORS.border, background: COLORS.bg }}
                        onClick={(e) => openMenu(e, client.id)}
                        title="More actions"
                      >
                        <MoreVertical size={13} color={COLORS.textMuted} />
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredClients.length === 0 && (
                <div className="px-5 py-12 text-center text-[13px]" style={{ color: COLORS.textMuted }}>
                  No clients match your filters.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {menuOpen && activeMenuClient && (
        <div
          className="fixed z-50 min-w-50 overflow-hidden rounded-xl border"
          style={{
            top: `${menuPos.top}px`,
            left: `${menuPos.left}px`,
            background: COLORS.card,
            borderColor: COLORS.border,
            boxShadow: '0 8px 24px rgba(31,41,55,.12)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="border-b px-3.5 py-2.5 text-[12px] font-bold"
            style={{ borderBottomColor: COLORS.borderSoft, color: COLORS.text }}
          >
            {activeMenuClient.name}
          </div>

          <button
            className="block w-full px-3.5 py-2.25 text-left text-[13px]"
            style={{ color: COLORS.textSec }}
            onClick={() => handleMenuAction('message')}
          >
            Message client
          </button>

          <button
            className="block w-full px-3.5 py-2.25 text-left text-[13px]"
            style={{ color: COLORS.textSec }}
            onClick={() => handleMenuAction('view')}
          >
            View / Edit Profile
          </button>

          <button
            className="block w-full px-3.5 py-2.25 text-left text-[13px]"
            style={{ color: COLORS.textSec }}
            onClick={() => handleMenuAction('toggle-status')}
          >
            {activeMenuClient.status === 'Active' ? 'Set Inactive' : 'Set Active'}
          </button>

          <div style={{ height: '1px', background: COLORS.borderSoft }}></div>

          <button
            className="block w-full px-3.5 py-2.25 text-left text-[13px]"
            style={{ color: COLORS.red }}
            onClick={() => handleMenuAction('delete')}
          >
            Delete client record
          </button>
        </div>
      )}
    </div>
  );
}
