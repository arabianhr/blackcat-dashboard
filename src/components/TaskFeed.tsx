import { clsx } from 'clsx'
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react'
import type { Task } from '@/lib/types'

const ICONS = {
  success: { icon: CheckCircle2, cls: 'text-green-500' },
  warning: { icon: AlertTriangle, cls: 'text-amber-500' },
  error: { icon: XCircle, cls: 'text-red-500' },
}

export function TaskFeed({ tasks }: { tasks: Task[] }) {
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl divide-y divide-neutral-800/50">
      {tasks.map(task => {
        const s = ICONS[task.status]
        const Icon = s.icon
        return (
          <div key={task.id} className="flex items-start gap-3 p-4">
            <Icon className={clsx('w-4 h-4 mt-0.5 shrink-0', s.cls)} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold text-bc-500">{task.tail}</span>
                <span className="text-[11px] text-neutral-600">{task.time}</span>
              </div>
              <p className="text-sm text-neutral-300">{task.action}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
