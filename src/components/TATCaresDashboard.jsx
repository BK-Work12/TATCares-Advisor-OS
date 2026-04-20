import React, { useState } from 'react';
import {
  ArrowRight,
  Bell,
  Mail,
  Users,
  FileText,
  LayoutGrid,
  ListTodo,
  CreditCard,
  Lock,
  Menu,
  Search,
  X,
} from 'lucide-react';
import BillingScreen from './BillingScreen';
import ClientWorkspaceScreen from './ClientWorkspaceScreen';
import DashboardScreen from './DashboardScreen';
import ClientListScreen from './ClientListScreen';
import EmailScreen from './EmailScreen';
import MeetingsScreen from './MeetingsScreen';
import NotificationsScreen from './NotificationsScreen';
import PipelineBoardScreen from './PipelineBoardScreen';
import ReportsScreen from './ReportsScreen';
import StrategyLibraryView from './StrategyLibraryView';
import { COLORS } from './tatcaresShared';

const Sidebar = ({ activeScreen, onScreenChange, isOpen, onClose }) => {
  const sections = [
    {
      title: 'Practice',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
        { id: 'pipeline', label: 'Pipeline Board', icon: ListTodo, badge: '26' },
        { id: 'clients', label: 'Client List', icon: Users },
      ],
    },
    {
      title: 'Communication',
      items: [
        { id: 'notifications', label: 'Notifications', icon: Bell, badge: '3' },
        { id: 'email', label: 'Email', icon: Mail },
        { id: 'meetings', label: 'Meetings', icon: FileText, badge: '3' },
      ],
    },
    {
      title: 'Operations',
      items: [
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'reports', label: 'Reports', icon: FileText },
      ],
    },
    {
      title: 'Resources',
      items: [{ id: 'strategy', label: 'Strategy Library', icon: FileText }],
    },
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 lg:hidden ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-55 shrink-0 flex-col text-white transition-transform duration-200 lg:static lg:z-auto lg:w-22 lg:translate-x-0 xl:w-55 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ background: COLORS.sidebarBg }}
      >
      <div
        className="flex items-center justify-between px-4 py-4 lg:px-3 xl:px-4"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}
      >
        <div className="min-w-0 text-lg font-extrabold tracking-tight text-white lg:hidden xl:block">
          TAT<span style={{ color: '#5ECFCA' }}>Cares</span>
        </div>
        <div
          className="rounded-full px-2 py-1 text-[10px] font-bold uppercase lg:hidden xl:block"
          style={{ background: 'rgba(94,207,202,0.15)', color: '#5ECFCA', letterSpacing: '0.08em' }}
        >
          Advisor OS
        </div>
        <div className="hidden lg:flex lg:w-full lg:justify-center xl:hidden">
          <div className="text-base font-extrabold tracking-tight text-white">
            T<span style={{ color: '#5ECFCA' }}>C</span>
          </div>
        </div>
        <button className="lg:hidden" onClick={onClose} aria-label="Close sidebar">
          <X size={18} color="rgba(255,255,255,0.8)" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-2.5 pt-2.5 lg:px-2">
        {sections.map((section) => (
          <div key={section.title}>
            <div
              className="px-2.5 py-3 text-[10px] font-extrabold uppercase lg:hidden xl:block"
              style={{ color: 'rgba(255,255,255,0.22)', letterSpacing: '0.12em' }}
            >
              {section.title}
            </div>
            {section.items.map((item) => {
              const isActive = activeScreen === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onScreenChange(item.id)}
                  className="mb-0.5 flex w-full items-center justify-between rounded-[10px] px-3 py-2 transition lg:justify-center lg:px-2 xl:justify-between xl:px-3"
                  style={{
                    background: isActive ? COLORS.sidebarActive : 'transparent',
                    color: isActive ? '#5ECFCA' : 'rgba(255,255,255,0.5)',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '13px',
                  }}
                  title={item.label}
                >
                  <span className="flex items-center gap-2.5 lg:gap-0 xl:gap-2.5">
                    <Icon size={15} strokeWidth={1.75} />
                    <span className="lg:hidden xl:block">{item.label}</span>
                  </span>
                  {item.badge && (
                    <span
                      className="rounded-full px-1.5 py-0.5 text-[10px] font-extrabold text-white lg:absolute lg:right-2 lg:top-1.5 xl:static"
                      style={{ background: 'rgba(198,61,47,0.9)', minWidth: '20px' }}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      <div
        className="mx-2.5 mb-2 rounded-[10px] px-3 py-2.5 lg:mx-2"
        style={{ background: 'rgba(0,0,0,0.15)' }}
      >
        <div
          className="mb-2 text-[9px] font-extrabold uppercase lg:hidden xl:block"
          style={{ color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}
        >
          Advisor Only
        </div>

        {['Proposal Builder', 'Tax Plan Builder'].map((label) => (
          <div
            key={label}
            className="flex items-center gap-2 py-1 text-[11px] lg:justify-center xl:justify-start"
            style={{ color: 'rgba(255,255,255,0.2)' }}
            title={label}
          >
            <Lock size={13} strokeWidth={1.75} style={{ color: 'rgba(255,255,255,0.2)' }} />
            <span className="lg:hidden xl:block">{label}</span>
          </div>
        ))}
      </div>

      <div className="px-2.5 py-3 lg:px-2" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div
          className="mb-2.5 flex items-center gap-2.5 rounded-xl p-2.5 lg:justify-center lg:px-2 xl:justify-start"
          style={{ background: 'rgba(255,255,255,0.05)' }}
        >
          <div className="flex h-8.5 w-8.5 items-center justify-center rounded-[10px] text-xs font-extrabold" style={{ background: COLORS.teal }}>
            YC
          </div>
          <div className="min-w-0 flex-1 lg:hidden xl:block">
            <div className="text-xs font-bold text-white/85 truncate">Yvonne Hollis-Cobb</div>
            <div className="text-[10px] text-white/30">CPA · Lead Advisor</div>
          </div>
          <div className="h-2 w-2 rounded-full lg:hidden xl:block" style={{ background: '#22C55E', boxShadow: '0 0 0 2px rgba(34,197,94,.25)' }}></div>
        </div>
        <div className="flex items-center justify-around lg:hidden xl:flex">
          <div className="flex-1 text-center">
            <div className="text-[15px] font-extrabold text-white/80 leading-none">24</div>
            <div className="text-[10px] text-white/25 mt-1">Clients</div>
          </div>
          <div className="h-7 w-px bg-white/10"></div>
          <div className="flex-1 text-center">
            <div className="text-[15px] font-extrabold leading-none" style={{ color: '#5ECFCA' }}>
              91%
            </div>
            <div className="text-[10px] text-white/25 mt-1">Renewal</div>
          </div>
          <div className="h-7 w-px bg-white/10"></div>
          <div className="flex-1 text-center">
            <div className="text-[15px] font-extrabold leading-none" style={{ color: '#FF8A7A' }}>
              3
            </div>
            <div className="text-[10px] text-white/25 mt-1">Urgent</div>
          </div>
        </div>
      </div>

      </div>
    </>
  );
};

const TopBar = ({ title, onScreenChange, onOpenSidebar }) => (
  <div className="flex h-14.5 items-center gap-3 px-4 sm:px-5 sm:pl-6" style={{ background: COLORS.topbarBg, borderBottom: `1px solid ${COLORS.topbarBorder}` }}>
    <button
      className="flex h-9 w-9 items-center justify-center rounded-[9px] border lg:hidden"
      style={{ borderColor: COLORS.topbarBorder, color: COLORS.textSec }}
      onClick={onOpenSidebar}
      aria-label="Open sidebar"
    >
      <Menu size={18} />
    </button>

    <div className="min-w-0 text-base font-bold tracking-tight" style={{ color: COLORS.text }}>
      {title}
    </div>
    <div
      className="hidden flex-1 items-center gap-2 rounded-[10px] px-2.5 py-1.75 md:flex md:max-w-95"
      style={{ background: '#ECEAE5', border: `1px solid ${COLORS.topbarBorder}` }}
    >
      <Search size={13} color="#9AA3AE" />
      <input
        type="text"
        placeholder="Search clients, strategies..."
        className="flex-1 border-none bg-transparent text-[12.5px] outline-none"
        style={{ color: COLORS.text }}
      />
      <span className="rounded px-1.5 py-0.5 text-[10px] font-bold" style={{ color: '#9AA3AE', background: '#E2DED8' }}>
        K
      </span>
    </div>
    <div className="ml-auto flex items-center gap-2 sm:gap-2.5">
      <button
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-[9px] border transition"
        style={{ borderColor: COLORS.topbarBorder }}
        onClick={() => onScreenChange('notifications')}
      >
        <Bell size={15} color="#606878" strokeWidth={1.75} />
        <span
          className="absolute -right-1 -top-1 flex h-4.25 min-w-4.25 items-center justify-center rounded-full px-1 text-[9px] font-extrabold text-white"
          style={{ background: COLORS.red, border: '2px solid #F5F3EF' }}
        >
          3
        </span>
      </button>
      <div className="hidden text-xs font-semibold sm:block" style={{ color: '#9AA3AE' }}>
        Apr 15, 2026
      </div>
      <div className="hidden h-5 w-px sm:block" style={{ background: COLORS.topbarBorder }}></div>
      <button
        className="inline-flex items-center gap-2 rounded-[10px] px-3 py-2 text-[12px] font-bold text-white transition sm:px-4 sm:text-[12.5px]"
        style={{ background: COLORS.red, boxShadow: '0 4px 12px rgba(198,61,47,.25)' }}
        onClick={() => onScreenChange('pipeline')}
      >
        <span className="hidden sm:inline">Pipeline Board</span>
        <span className="sm:hidden">Pipeline</span>
        <ArrowRight size={11} strokeWidth={2.5} />
      </button>
    </div>
  </div>
);

export default function TATCaresDashboard() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const handleScreenChange = (screen) => {
    setActiveScreen(screen);
    setIsSidebarOpen(false);
  };

  const handleOpenClientWorkspace = (clientData) => {
    setSelectedClient(clientData);
    setActiveScreen('client');
  };

  const screenTitle =
    activeScreen === 'dashboard'
      ? 'Dashboard'
      : activeScreen === 'clients'
        ? 'Client List'
      : activeScreen === 'client'
        ? 'Client Workspace'
      : activeScreen === 'strategy'
        ? 'Strategy Library'
        : activeScreen.charAt(0).toUpperCase() + activeScreen.slice(1);

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: COLORS.bg }}>
      <Sidebar
        activeScreen={activeScreen}
        onScreenChange={handleScreenChange}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 min-w-0 flex flex-col overflow-hidden">
        <TopBar
          title={screenTitle}
          onScreenChange={handleScreenChange}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        <div className="flex-1 overflow-y-auto" style={{ background: COLORS.bg }}>
          {activeScreen === 'dashboard' && <DashboardScreen onScreenChange={handleScreenChange} />}
          {activeScreen === 'pipeline' && <PipelineBoardScreen onScreenChange={handleScreenChange} />}
          {activeScreen === 'clients' && <ClientListScreen onOpenClientWorkspace={handleOpenClientWorkspace} />}
          {activeScreen === 'notifications' && <NotificationsScreen onScreenChange={handleScreenChange} />}
          {activeScreen === 'email' && <EmailScreen />}
          {activeScreen === 'meetings' && <MeetingsScreen />}
            {activeScreen === 'billing' && <BillingScreen onScreenChange={handleScreenChange} />}
          {activeScreen === 'reports' && <ReportsScreen />}
          {activeScreen === 'strategy' && <StrategyLibraryView />}
          {activeScreen === 'client' && (
            <ClientWorkspaceScreen
              client={selectedClient}
              onBackToPipeline={() => handleScreenChange('pipeline')}
            />
          )}
        </div>
      </div>
    </div>
  );
}
