import { useState } from 'react';
const stats = [
  { label: 'Assigned Clients', value: 5, color: 'bg-[#1B2A4A]' },
  { label: 'Meetings Today', value: 3, color: 'bg-[#0E7C86]' },
  { label: 'Open Tasks', value: 5, color: 'bg-[#C8972A]' },
  { label: 'Overdue Invoice', value: 1, color: 'bg-[#C0392B]' },
]

const initialTaskItems = [
  {
    id: 1,
    title: 'Send Sandra Kim meeting confirmation + Zoom link',
    priority: 'High',
    due: 'Today',
    done: false,
  },
  {
    id: 2,
    title: 'Upload Derek Wilson signed agreement',
    priority: 'High',
    due: 'Today',
    done: false,
  },
  {
    id: 3,
    title: 'Schedule Priya Sharma 30-day check-in',
    priority: 'Medium',
    due: 'Apr 3',
    done: false,
  },
  {
    id: 4,
    title: 'Add notes from Marcus Johnson discovery call',
    done: true,
  },
]

const canDoItems = [
  'View client list & details',
  'Add meeting notes',
  'Schedule meetings',
  'Upload documents',
  'View diagnostics',
  'View strategy library',
]

const advisorOnlyItems = ['Build proposals', 'Edit tax plans', 'View billing', 'Move pipeline stages']

function DashboardView() {
  const [taskItems, setTaskItems] = useState(initialTaskItems)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskPriority, setNewTaskPriority] = useState('Medium')
  const openTasks = taskItems.filter((task) => !task.done).length

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false)
    setNewTaskTitle('')
    setNewTaskPriority('Medium')
  }

  const handleAddTask = (event) => {
    event.preventDefault()

    if (!newTaskTitle.trim()) {
      return
    }

    const nextId = taskItems.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1
    const newTask = {
      id: nextId,
      title: newTaskTitle.trim(),
      priority: newTaskPriority,
      due: 'Today',
      done: false,
    }

    setTaskItems((prevTasks) => [newTask, ...prevTasks])
    handleCloseAddModal()
  }

  const handleMarkDone = (taskId) => {
    setTaskItems((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, done: true } : task
      )
    )
  }

  const meetingCount = 3
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())

  return (
    <div className="flex-1 p-6 md:p-8">
      <h2 className="text-xl font-black text-slate-900">Good morning, Support Team 👋</h2>
      <p className="mt-1 text-xs text-slate-500 md:text-sm">
        {todayLabel} · {openTasks} open tasks · {meetingCount} meetings today
      </p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className={`${stat.color} rounded-xl p-4 text-white`}>
            <div className="text-3xl font-black">{stat.value}</div>
            <div className="mt-1 text-[11px] uppercase tracking-[0.06em] text-white/80">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-3">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h3 className="text-sm font-bold text-slate-900">📋 My Tasks</h3>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="rounded-full bg-[var(--brand-600)] px-3 py-1 text-[11px] font-semibold text-white hover:bg-[var(--brand-700)]"
            >
              + Add
            </button>
          </div>

          <div>
            {taskItems.map((task) => {
              const priorityClass =
                task.priority === 'High'
                  ? 'text-[#C0392B]'
                  : task.priority === 'Low'
                    ? 'text-emerald-700'
                    : 'text-[#C8972A]'

              const priorityDot =
                task.priority === 'High' ? '🔴' : task.priority === 'Low' ? '🟢' : '🟡'

              return (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 border-b border-slate-100 px-4 py-3 last:border-b-0 ${
                    task.done ? 'opacity-40' : ''
                  }`}
                >
                  {!task.done ? (
                    <div className="h-5 w-5 shrink-0 rounded border-2 border-slate-300" />
                  ) : (
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-emerald-700 bg-emerald-700 text-[10px] text-white">
                      ✓
                    </div>
                  )}

                  <div className={`flex-1 ${task.done ? 'line-through' : ''}`}>
                    <p className="text-sm text-slate-800">{task.title}</p>
                    {!task.done ? (
                      <p className={`mt-1 text-[11px] ${priorityClass}`}>
                        {priorityDot} {task.priority} · Due: {task.due}
                      </p>
                    ) : (
                      <p className="mt-1 text-[11px] text-slate-400">Completed</p>
                    )}
                  </div>

                  {!task.done && (
                    <button
                      type="button"
                      onClick={() => handleMarkDone(task.id)}
                      className="rounded border border-slate-300 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:border-slate-400"
                    >
                      Done
                    </button>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-4 py-3">
            <h3 className="text-sm font-bold text-slate-900">🔐 My Access Level</h3>
          </div>
          <div className="space-y-2 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-700">Can Do</p>
            {canDoItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-slate-700">
                <span className="text-emerald-700">✓</span>
                <span>{item}</span>
              </div>
            ))}

            <p className="pt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">Advisor-Only</p>
            {advisorOnlyItems.map((item) => (
              <div key={item} className="flex items-center gap-2 text-xs text-slate-400">
                <span>🔒</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-slate-900">Add New Task</h3>
                <p className="mt-1 text-xs text-slate-500">Create a task and set its priority.</p>
              </div>
              <button
                type="button"
                onClick={handleCloseAddModal}
                className="rounded-lg px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTask} className="space-y-4">
              <div>
                <label htmlFor="taskTitle" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Task Title
                </label>
                <input
                  id="taskTitle"
                  value={newTaskTitle}
                  onChange={(event) => setNewTaskTitle(event.target.value)}
                  placeholder="Enter task title"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[var(--brand-500)] focus:ring-2 focus:ring-[var(--brand-200)]"
                  autoFocus
                />
              </div>

              <div>
                <label htmlFor="taskPriority" className="mb-1 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
                  Priority
                </label>
                <select
                  id="taskPriority"
                  value={newTaskPriority}
                  onChange={(event) => setNewTaskPriority(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-[var(--brand-500)] focus:ring-2 focus:ring-[var(--brand-200)]"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCloseAddModal}
                  className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-600 hover:border-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[var(--brand-600)] px-3 py-2 text-xs font-semibold text-white hover:bg-[var(--brand-700)]"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardView
