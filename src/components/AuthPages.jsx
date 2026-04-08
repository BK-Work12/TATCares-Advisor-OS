import { Link } from 'react-router-dom'

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

export function LoginView() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to access your advisor workspace and active client plans."
      footerText="Need an account?"
      footerLink="Sign up"
      footerLinkTo="/signup"
    >
      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Email</span>
        <input type="email" placeholder="name@company.com" className={fieldClass()} />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-semibold text-slate-700">Password</span>
        <input type="password" placeholder="Enter your password" className={fieldClass()} />
      </label>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 text-slate-600">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
          Remember me
        </label>
        <Link to="/forgot-password" className="font-semibold text-[var(--brand-700)] hover:text-[var(--brand-600)]">
          Forgot password?
        </Link>
      </div>

      <button
        type="button"
        className="w-full rounded-xl bg-[var(--brand-600)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-700)]"
      >
        Log In
      </button>
    </AuthShell>
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
