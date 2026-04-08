import { NavLink } from 'react-router-dom'

function Sidebar({ navigation, isOpen, onClose }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-slate-950/45 transition md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed h-[100vh] top-0 inset-y-0 left-0 z-40 w-72 border-r border-slate-800 bg-slate-950 px-5 py-6 text-slate-100 shadow-2xl transition-transform duration-300 md:sticky md:z-auto md:w-auto md:translate-x-0 md:border-r md:px-6 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-start justify-between">
          <div>
            <div className="text-2xl font-black tracking-tight">
              TAT<span className="text-[var(--brand-400)]">Cares</span>
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.22em] text-slate-400">Advisor OS</div>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white md:hidden"
          >
            ✕
          </button>
        </div>

        <nav className="space-y-6">
          {navigation.map((section) => (
            <div key={section.label} className="space-y-2">
              <h2 className="px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                {section.label}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => {
                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition ${
                          isActive
                            ? 'bg-[var(--brand-soft)] text-[var(--brand-100)] ring-1 ring-[var(--brand-ring)]'
                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                        }`
                      }
                    >
                      <span className="text-base" aria-hidden="true">
                        {item.icon}
                      </span>
                      <span>{item.title}</span>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
