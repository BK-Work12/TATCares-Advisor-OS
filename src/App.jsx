import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600">
          React + Tailwind
        </p>
        <h1 className="mb-3 text-3xl font-bold text-slate-900">Project ready</h1>
        <p className="mb-6 text-slate-600">
          Tailwind is installed and working. Edit{' '}
          <span className="rounded bg-slate-100 px-2 py-1 font-mono text-sm">src/App.jsx</span>{' '}
          to start building.
        </p>

        <button
          type="button"
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-500"
          onClick={() => setCount((value) => value + 1)}
        >
          Count is {count}
        </button>
      </div>
    </main>
  )
}

export default App
