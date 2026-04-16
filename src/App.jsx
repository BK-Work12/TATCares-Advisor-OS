import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ForgotPasswordView, LoginView, SignupView } from './components/AuthPages'
import Footer from './components/Footer'
import ProposalBuilderView from './components/ProposalBuilderView'
import StrategyLibraryView from './components/StrategyLibraryView'
import TATCaresDashboard from './components/TATCaresDashboard'

function App() {
  const location = useLocation()

  const isAuthRoute = ['/login', '/signup', '/forgot-password'].includes(location.pathname)

  if (isAuthRoute) {
    return (
      <main className="min-h-screen bg-[#F7F5F2]">
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="/forgot-password" element={<ForgotPasswordView />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<TATCaresDashboard />} />
        <Route path="/proposal-builder" element={<ProposalBuilderView />} />
        <Route path="/strategy-library" element={<StrategyLibraryView />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
