import { clsx } from 'clsx'
import type { TailStatus } from '@/lib/types'

const STATUS = {
  active: { dot: 'bg-green-500', label: 'Active', cls: 'text-green-400' },
  scheduled: { dot: 'bg-blue-500', label: 'Scheduled', cls: 'text-blue-400' },
  idle: { dot: 'bg-neutral-500', label: 'Idle', cls: 'text-neutral-400' },
  built: { dot: 'bg-amber-500', label: 'Built', cls: 'text-amber-400' },
  planned: { dot: 'bg-neutral-600', label: 'Planned', cls: 'text-neutral-500' },
  error: { dot: 'bg-red-500', label: 'Error', cls: 'text-red-400' },
}

export function TailCard({ tail }: { tail: TailStatus }) {
  const s = STATUS[tail.status] || STATUS.idle
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 hover:border-neutral-700 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-bold text-white">{tail.name}</h3>
        <div className="flex items-center gap-1.5">
          <div className={clsx('w-2 h-2 rounded-full', s.dot, tail.status === 'active' && 'animate-pulse')} />
          <span className={clsx('text-[11px] font-medium', s.cls)}>{s.label}</span>
        </div>
      </div>
      <p className="text-xs text-neutral-500 mb-3">{tail.role}</p>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-neutral-600">{tail.model}</span>
        <span className="text-neutral-500">{tail.lastRun}</span>
      </div>
    </div>
  )
}
