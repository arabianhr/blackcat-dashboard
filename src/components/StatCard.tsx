import { clsx } from 'clsx'

const COLORS = {
  amber: { bg: 'bg-amber-500/10', text: 'text-amber-500', border: 'border-amber-500/20' },
  green: { bg: 'bg-green-500/10', text: 'text-green-500', border: 'border-green-500/20' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/20' },
  red: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/20' },
}

interface StatCardProps {
  label: string
  value: string
  sub: string
  icon: React.ReactNode
  color: keyof typeof COLORS
}

export function StatCard({ label, value, sub, icon, color }: StatCardProps) {
  const c = COLORS[color]
  return (
    <div className={clsx('bg-neutral-900/50 border rounded-xl p-4', c.border)}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-neutral-500 uppercase tracking-wide">{label}</span>
        <div className={clsx('p-1.5 rounded-lg', c.bg, c.text)}>{icon}</div>
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-neutral-500 mt-1">{sub}</p>
    </div>
  )
}
