'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import { LayoutDashboard, ListTodo, Activity, HeartPulse, Settings, Cat } from 'lucide-react'

const NAV = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/tasks', label: 'Tasks', icon: ListTodo },
  { href: '/tails', label: 'Tails', icon: Activity },
  { href: '/health', label: 'Health', icon: HeartPulse },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-56 bg-neutral-900/50 border-r border-neutral-800 flex flex-col">
      <div className="p-5 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-bc-500/20 rounded-lg flex items-center justify-center">
            <Cat className="w-5 h-5 text-bc-500" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-wide">Black Cat</h1>
            <p className="text-[10px] text-neutral-500 uppercase tracking-widest">Autonomous</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-bc-500/10 text-bc-500'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <div className="bg-neutral-800/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-bc-500 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-bc-500">Phase 2</span>
          </div>
          <p className="text-[11px] text-neutral-500">Day 3 of 14 \u2192 Phase 3</p>
          <div className="mt-2 h-1.5 bg-neutral-700 rounded-full overflow-hidden">
            <div className="h-full bg-bc-500/60 rounded-full" style={{ width: '21%' }} />
          </div>
        </div>
      </div>
    </aside>
  )
}
