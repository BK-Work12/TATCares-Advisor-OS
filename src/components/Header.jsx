function Header({
  headerTitle,
  headerTag,
  pageName,
  loggedInUser,
  onOpenSidebar,
  showMenuButton = true,
  showUserBadge = true,
}) {
  return (
    <header className="border-b border-slate-700 bg-[#1B2A4A] px-4 py-4 text-[11px] tracking-[0.08em] text-white/70 md:px-8">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {showMenuButton && (
            <button
              type="button"
              aria-label="Open menu"
              onClick={onOpenSidebar}
              className="rounded-md border border-white/25 px-2 py-1 text-xs text-white/90 hover:bg-white/10 md:hidden"
            >
              ☰
            </button>
          )}

          <div className="leading-tight">
            <p className="font-semibold text-white/90">
              TAT<span className="text-[var(--brand-400)]">Cares</span> OS
            </p>
            <p className="text-[10px] uppercase text-white/70">{pageName}</p>
          </div>
        </div>

        {showUserBadge && (
          <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5">
            <span aria-hidden="true">👤</span>
            <span className="text-[10px] font-semibold uppercase text-white/90">{loggedInUser}</span>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col items-start gap-2 border-t border-white/10 pt-3 md:flex-row md:items-center md:justify-between">
        <span className="font-semibold text-white/90">{headerTitle}</span>
        <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.08em] text-white/85">
          {headerTag}
        </span>
      </div>
    </header>
  )
}

export default Header
