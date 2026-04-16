import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Check, Eye, EyeOff, Lock, Mail } from 'lucide-react'

function AuthShell({ title, subtitle, children, footerText, footerLink, footerLinkTo }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-md items-center px-4 py-10">
      <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-lg md:p-8">
        <h2 className="text-2xl font-black tracking-tight text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{subtitle}</p>

        <div className="mt-6 space-y-4">{children}</div>

        <div className="mt-6 text-center text-sm text-slate-500">
          {footerText}{' '}
          <Link to={footerLinkTo} className="font-semibold text-[var(--brand-700)] hover:text-[var(--brand-600)]">
            {footerLink}
          </Link>
        </div>
      </section>
    </div>
  )
}

function fieldClass() {
  return 'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[var(--brand-500)] focus:bg-white'
}

function GoogleLogo() {
  return (
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.64 9.2045C17.64 8.5665 17.5827 7.9525 17.4764 7.36365H9V10.8455H13.8436C13.635 11.9705 13.0009 12.9232 12.0482 13.5614V15.8195H14.9564C16.6582 14.2523 17.64 11.9395 17.64 9.2045Z"
        fill="#4285F4"
      />
      <path
        d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0482 13.5614C11.2423 14.1014 10.2118 14.42 9 14.42C6.65591 14.42 4.67045 12.8364 3.96273 10.71H0.95636V13.0418C2.43727 15.9832 5.48045 18 9 18Z"
        fill="#34A853"
      />
      <path
        d="M3.96273 10.71C3.78273 10.17 3.68045 9.59318 3.68045 9C3.68045 8.40682 3.78273 7.83 3.96273 7.29V4.95818H0.95636C0.347727 6.17091 0 7.54545 0 9C0 10.4545 0.347727 11.8291 0.95636 13.0418L3.96273 10.71Z"
        fill="#FBBC05"
      />
      <path
        d="M9 3.58C10.3227 3.58 11.5118 4.03455 12.4464 4.92727L15.0218 2.35182C13.4632 0.897273 11.4259 0 9 0C5.48045 0 2.43727 2.01682 0.95636 4.95818L3.96273 7.29C4.67045 5.16364 6.65591 3.58 9 3.58Z"
        fill="#EA4335"
      />
    </svg>
  )
}

export function LoginView() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [language, setLanguage] = useState('en')

  const canSignIn = useMemo(() => userId.trim().length > 0 && password.length > 0, [userId, password])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!canSignIn || isLoading || isSuccess) {
      return
    }

    setIsLoading(true)
    window.setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 1100)
  }

  return (
    <div className="tat-login-page flex min-h-screen w-full items-center justify-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-[420px]">
        <section className="rounded-[20px] bg-white px-6 py-8 shadow-[0_18px_38px_rgba(13,17,23,0.08)] sm:px-9 sm:py-10">
          <div className="mx-auto flex h-[52px] w-[52px] items-center justify-center rounded-[14px] bg-[#C63D2F] text-2xl font-bold text-white">
            T
          </div>

          <h1 className="mt-6 text-center text-[22px] font-bold leading-[1.25] tracking-[-0.03em] text-[#0D1117]">
            Smart tax planning,
            <br />
            built around you.
          </h1>

          <p className="mt-3 text-center text-[13px] leading-[1.6] text-[#374151]">
            Your strategy, your score, and your plan
            <br />
            are all waiting for you.
          </p>

          <button type="button" className="tat-google-btn mt-6 flex w-full items-center justify-center gap-2.5 rounded-[10px] border px-4 py-3 text-sm font-semibold text-[#0D1117]">
            <GoogleLogo />
            <span>Login with Google</span>
          </button>

          <div className="tat-divider mt-5 text-center text-[12px] text-[#4B5563]">or sign in with your User ID</div>

          <form className="mt-5" onSubmit={handleSubmit}>
            <label className="block">
              <span className="tat-field-label">USER ID</span>
              <span className="tat-input-wrap mt-1.5 flex items-center gap-2.5 rounded-[10px] border bg-white px-3.5 py-2.5">
                <Mail size={15} className="text-[#4B5563]" strokeWidth={2.2} />
                <input
                  type="text"
                  value={userId}
                  onChange={(event) => setUserId(event.target.value)}
                  placeholder="Your TATCares User ID"
                  className="w-full border-0 bg-transparent text-[14px] text-[#0D1117] outline-none placeholder:text-[#9AA3AF]"
                />
              </span>
            </label>

            <label className="mt-4 block">
              <span className="flex items-center justify-between">
                <span className="tat-field-label">PASSWORD</span>
                <Link to="/forgot-password" className="text-[12px] font-semibold text-[#2F7D79] hover:text-[#1F5E5B]">
                  Forgot?
                </Link>
              </span>
              <span className="tat-input-wrap mt-1.5 flex items-center gap-2.5 rounded-[10px] border bg-white px-3.5 py-2.5">
                <Lock size={15} className="text-[#4B5563]" strokeWidth={2.2} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full border-0 bg-transparent text-[14px] text-[#0D1117] outline-none placeholder:text-[#9AA3AF]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="rounded p-1 text-[#4B5563] transition hover:text-[#2F7D79]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} strokeWidth={2.2} /> : <Eye size={15} strokeWidth={2.2} />}
                </button>
              </span>
            </label>

            <label className="mt-4 inline-flex cursor-pointer items-center gap-2.5 text-[13px] text-[#374151]">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(event) => setKeepSignedIn(event.target.checked)}
                className="tat-checkbox"
              />
              <span>Keep me signed in</span>
            </label>

            <div className="mt-5">
              {!isSuccess && (
                <button
                  type="submit"
                  disabled={!canSignIn || isLoading}
                  className="tat-signin-btn w-full rounded-[12px] px-4 py-3 text-sm font-semibold transition"
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </button>
              )}

              <div
                className={`tat-success-tile flex w-full items-center justify-center gap-2 rounded-[12px] px-4 py-3 text-sm font-semibold text-white ${isSuccess ? 'is-visible' : ''}`}
                role="status"
                aria-live="polite"
              >
                <Check size={16} strokeWidth={2.6} />
                Signed in successfully
              </div>
            </div>

            <a
              href="https://tatcares.com/helpcenter"
              target="_blank"
              rel="noreferrer"
              className="mt-5 block text-center text-[13px] font-bold text-[#2F7D79] hover:text-[#1F5E5B]"
            >
              Get Help Logging In
            </a>

            <div className="mt-2">
              <label htmlFor="language" className="sr-only">
                Language
              </label>
              <select
                id="language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                className="tat-language-select w-full rounded-[10px] border bg-white px-3.5 py-2.5 text-[13px] text-[#374151] outline-none"
              >
                <option value="en">English :us:</option>
                <option value="es">Español :es:</option>
              </select>
            </div>
          </form>
        </section>

        <footer className="mt-6 text-center text-[#4B5563]">
          <p className="text-[12px]">
            <a href="#" className="hover:text-[#374151]">
              Privacy Policy
            </a>{' '}
            ·{' '}
            <a href="#" className="hover:text-[#374151]">
              Terms of Use
            </a>{' '}
            ·{' '}
            <a href="#" className="hover:text-[#374151]">
              Security
            </a>
          </p>
          <p className="mt-2 text-[11px]">2327 Commerce St. Suite #110, Houston, TX 77002</p>
          <p className="mt-1 text-[11px]">© 2026 TATCares · takeawaytax.com</p>
        </footer>
      </div>
    </div>
  )
}

export function SignupView() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Set up your profile to start building strategies and proposals."
      footerText="Already have an account?"
      footerLink="Log in"
      footerLinkTo="/login"
    >
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Full name</span>
        <input type="text" placeholder="Jordan Lee" className={fieldClass()} />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Work email</span>
        <input type="email" placeholder="name@company.com" className={fieldClass()} />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Password</span>
        <input type="password" placeholder="Create a strong password" className={fieldClass()} />
      </label>

      <button
        type="button"
        className="w-full rounded-xl bg-[var(--brand-600)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-700)]"
      >
        Create Account
      </button>
    </AuthShell>
  )
}

export function ForgotPasswordView() {
  return (
    <AuthShell
      title="Reset password"
      subtitle="Enter your email and we will send a secure reset link."
      footerText="Remembered your password?"
      footerLink="Back to login"
      footerLinkTo="/login"
    >
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Email</span>
        <input type="email" placeholder="name@company.com" className={fieldClass()} />
      </label>

      <button
        type="button"
        className="w-full rounded-xl bg-[var(--brand-600)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-700)]"
      >
        Send Reset Link
      </button>
    </AuthShell>
  )
}
