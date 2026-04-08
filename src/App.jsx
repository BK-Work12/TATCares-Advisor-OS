import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ForgotPasswordView, LoginView, SignupView } from './components/AuthPages'
import DashboardView from './components/DashboardView'
import Footer from './components/Footer'
import Header from './components/Header'
import ProposalBuilderView from './components/ProposalBuilderView'
import Sidebar from './components/Sidebar'
import StrategyLibraryView from './components/StrategyLibraryView'

const navigation = [
  {
    label: 'Advisor Tools',
    items: [
      { id: 'dashboard', path: '/dashboard', icon: '🏠', title: 'Dashboard' },
      { id: 'pipeline-board', path: '/pipeline-board', icon: '🗂️', title: 'Pipeline Board' },
      { id: 'proposal-builder', path: '/proposal-builder', icon: '📋', title: 'Proposal Builder' },
      { id: 'diagnostics', path: '/diagnostics', icon: '🔍', title: 'Diagnostics' },
      { id: 'tax-plan-builder', path: '/tax-plan-builder', icon: '🧮', title: 'Tax Plan Builder' },
    ],
  },
  {
    label: 'Resources',
    items: [
      { id: 'strategy-library', path: '/strategy-library', icon: '📚', title: 'Strategy Library' },
      { id: 'meetings', path: '/meetings', icon: '📅', title: 'Meetings' },
      { id: 'billing', path: '/billing', icon: '💳', title: 'Billing' },
    ],
  },
  {
    label: 'Portals',
    items: [
      { id: 'client-portal', path: '/client-portal', icon: '👤', title: 'Client Portal' },
      { id: 'support-view', path: '/support-view', icon: '🎧', title: 'Support View' },
    ],
  },
]

const allNavItems = navigation.flatMap((section) =>
  section.items.map((item) => ({
    ...item,
    section: section.label,
  })),
)

function getHeaderConfig(activeItem) {
  const pathConfig = {
    '/support-view': {
      title: 'TATCares OS · Support Portal',
      tag: 'SUPPORT DASHBOARD — Limited Access View',
    },
    '/client-portal': {
      title: 'TATCares OS · Client Portal',
      tag: 'CLIENT WORKSPACE — Secure Shared View',
    },
  }

  if (pathConfig[activeItem.path]) {
    return pathConfig[activeItem.path]
  }

  const areaBySection = {
    'Advisor Tools': 'Advisor Portal',
    Resources: 'Resource Hub',
    Portals: 'Operations Portal',
  }

  const area = areaBySection[activeItem.section] ?? 'Advisor Portal'

  return {
    title: `TATCares OS · ${area}`,
    tag: `${activeItem.title.toUpperCase()} — Internal Access View`,
  }
}

function WorkspacePanel({ item }) {
  return (
    <div className="grid flex-1 gap-6 p-6 md:grid-cols-12 md:p-8">
      <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Main Panel</p>
        <h2 className="mt-2 text-xl font-bold text-slate-900">{item.title} content</h2>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          This section is now route-based. Add each page component to its matching route for a scalable app structure.
        </p>
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
          Current route: {item.path}
        </div>
      </article>

      <aside className="space-y-4 md:col-span-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Progress</p>
          <p className="mt-2 text-2xl font-bold text-slate-900">72%</p>
          <p className="mt-2 text-sm text-slate-600">Proposal completion for current client.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Tasks</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li className="rounded-lg bg-slate-50 px-3 py-2">Review assumptions</li>
            <li className="rounded-lg bg-slate-50 px-3 py-2">Finalize recommendations</li>
            <li className="rounded-lg bg-slate-50 px-3 py-2">Schedule client walkthrough</li>
          </ul>
        </div>
      </aside>
    </div>
  )
}

function App() {
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const loggedInUser = 'Jordan Lee'

  const authHeaderConfig = {
    '/login': {
      pageName: 'Login',
      title: 'TATCares OS · Access Portal',
      tag: 'SECURE AUTHENTICATION — Advisor Access',
    },
    '/signup': {
      pageName: 'Sign Up',
      title: 'TATCares OS · Access Portal',
      tag: 'NEW ACCOUNT SETUP — Advisor Access',
    },
    '/forgot-password': {
      pageName: 'Forgot Password',
      title: 'TATCares OS · Access Portal',
      tag: 'PASSWORD RECOVERY — Secure Reset',
    },
  }

  const isAuthRoute = Boolean(authHeaderConfig[location.pathname])

  const activeItem = useMemo(
    () => allNavItems.find((item) => item.path === location.pathname) ?? allNavItems[0],
    [location.pathname],
  )

  const headerConfig = useMemo(() => getHeaderConfig(activeItem), [activeItem])

  useEffect(() => {
    setSidebarOpen(false)
  }, [location.pathname])

  if (isAuthRoute) {
    const config = authHeaderConfig[location.pathname]

    return (
      <main className="min-h-screen bg-gradient-to-br from-[var(--brand-50)] via-slate-100 to-white">
        <div className="mx-auto flex min-h-screen flex-col overflow-hidden rounded-t-3xl bg-white shadow-xl">
          <Header
            headerTitle={config.title}
            headerTag={config.tag}
            pageName={config.pageName}
            loggedInUser="Guest"
            onOpenSidebar={() => {}}
            showMenuButton={false}
            showUserBadge={false}
          />

          <div className="flex flex-1 items-center justify-center p-6">
            <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route path="/signup" element={<SignupView />} />
              <Route path="/forgot-password" element={<ForgotPasswordView />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--brand-50)] via-slate-100 to-white">
      <div className="mx-auto">
        <div className="grid min-h-[calc(100vh-1.5rem)] rounded-t-3xl bg-white shadow-xl md:min-h-[calc(100vh-3rem)] md:grid-cols-[280px_1fr]">
          <Sidebar navigation={navigation} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <section className="flex min-h-[420px] flex-col bg-slate-50">
            <Header
              headerTitle={headerConfig.title}
              headerTag={headerConfig.tag}
              pageName={activeItem.title}
              loggedInUser={loggedInUser}
              onOpenSidebar={() => setSidebarOpen(true)}
            />

            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              {allNavItems.map((item) => (
                <Route
                  key={item.id}
                  path={item.path}
                  element={
                    item.id === 'dashboard' ? (
                      <DashboardView />
                    ) : item.id === 'proposal-builder' ? (
                      <ProposalBuilderView />
                    ) : item.id === 'strategy-library' ? (
                      <StrategyLibraryView />
                    ) : (
                      <WorkspacePanel item={item} />
                    )
                  }
                />
              ))}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default App
