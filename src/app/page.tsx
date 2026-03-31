'use client'

import { useEffect, useState, useCallback } from 'react'
import { StatCard } from '@/components/StatCard'
import { TailCard } from '@/components/TailCard'
import { TaskFeed } from '@/components/TaskFeed'
import { Activity, HardDrive, Clock, Zap, Wifi, WifiOff } from 'lucide-react'
import type { TailStatus, Task } from '@/lib/types'

const STATIC_TAILS: TailStatus[] = [
  { id: 'atlas', name: 'ATLAS', role: 'Router & Classifier', status: 'active', lastRun: '2m ago', model: 'qwen3:1.7b' },
  { id: 'neo', name: 'NEO', role: 'Code Generation', status: 'idle', lastRun: 'awaiting sandbox', model: 'qwen3.5:4b' },
  { id: 'pulse', name: 'PULSE', role: 'Web Monitoring', status: 'scheduled', lastRun: '4h ago', model: 'Exa AI' },
  { id: 'research', name: 'RESEARCH', role: 'Business Intelligence', status: 'scheduled', lastRun: '12h ago', model: 'Cerebras Scout' },
  { id: 'scout', name: 'SCOUT', role: 'Talent Pipeline', status: 'scheduled', lastRun: '1d ago', model: 'Groq' },
  { id: 'sentinel', name: 'SENTINEL', role: 'Security & Health', status: 'active', lastRun: '5m ago', model: 'internal' },
  { id: 'herald', name: 'HERALD', role: 'Communications', status: 'idle', lastRun: 'awaiting config', model: 'Gmail + Telegram' },
  { id: 'critic', name: 'CRITIC', role: 'Quality Assurance', status: 'active', lastRun: '15m ago', model: 'internal' },
  { id: 'maestro', name: 'MAESTRO', role: 'Orchestration', status: 'built', lastRun: 'Sprint P', model: 'CrewAI' },
  { id: 'vision', name: 'VISION', role: 'Market Intelligence', status: 'active', lastRun: '1h ago', model: '460 signals' },
  { id: 'vault', name: 'VAULT', role: 'Financial Data', status: 'planned', lastRun: 'Sprint S', model: 'OpenBB' },
]

const STATIC_TASKS: Task[] = [
  { id: '1', tail: 'SENTINEL', action: 'Health check passed \u2014 17 containers healthy', time: '5m ago', status: 'success' },
  { id: '2', tail: 'ATLAS', action: 'Routed 8 requests \u2014 100% classification accuracy', time: '2m ago', status: 'success' },
  { id: '3', tail: 'VISION', action: 'Market data refresh \u2014 460 signals from 17 sources', time: '1h ago', status: 'success' },
  { id: '4', tail: 'PULSE', action: 'Scanned 12 news sources \u2014 3 new signals', time: '4h ago', status: 'success' },
  { id: '5', tail: 'CRITIC', action: 'QC gate: R&D Sweep 13 \u2014 all 10 decisions validated', time: '15m ago', status: 'success' },
  { id: '6', tail: 'SENTINEL', action: 'SSH credential incident detected + auto-fixed', time: '2h ago', status: 'warning' },
  { id: '7', tail: 'SENTINEL', action: 'Disk usage alert: 81% \u2014 above 80% threshold', time: '6h ago', status: 'warning' },
  { id: '8', tail: 'SCOUT', action: 'Talent scan \u2014 47 candidates in pipeline', time: '1d ago', status: 'success' },
]

export default function Dashboard() {
  const [time, setTime] = useState('')
  const [live, setLive] = useState(false)
  const [tails, setTails] = useState<TailStatus[]>(STATIC_TAILS)
  const [tasks, setTasks] = useState<Task[]>(STATIC_TASKS)
  const [health, setHealth] = useState<Record<string, unknown> | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const [sysRes, tailRes, evtRes] = await Promise.allSettled([
        fetch('/api/system').then(r => r.json()),
        fetch('/api/tails').then(r => r.json()),
        fetch('/api/events?hours=24').then(r => r.json()),
      ])
      const sys = sysRes.status === 'fulfilled' ? sysRes.value : null
      const tai = tailRes.status === 'fulfilled' ? tailRes.value : null
      const evt = evtRes.status === 'fulfilled' ? evtRes.value : null

      if (sys?.live) {
        setLive(true)
        setHealth(sys.health || sys.dashboard)
      }
      if (tai?.live && tai.tails) {
        const mapped = (Array.isArray(tai.tails) ? tai.tails : tai.tails?.tails || []).map((t: Record<string, string>) => ({
          id: t.id || t.name?.toLowerCase() || '',
          name: t.name || t.id || '',
          role: t.role || t.description || '',
          status: t.status || 'idle',
          lastRun: t.last_run || t.lastRun || 'unknown',
          model: t.model || '',
        })) as TailStatus[]
        if (mapped.length > 0) setTails(mapped)
      }
      if (evt?.live && evt.events) {
        const mapped = (Array.isArray(evt.events) ? evt.events : evt.events?.events || []).slice(0, 10).map((e: Record<string, string>, i: number) => ({
          id: String(i),
          tail: e.tail || e.source || e.type || 'SYSTEM',
          action: e.message || e.action || e.description || '',
          time: e.time || e.timestamp || '',
          status: (e.level === 'error' ? 'error' : e.level === 'warning' ? 'warning' : 'success') as Task['status'],
        })) as Task[]
        if (mapped.length > 0) setTasks(mapped)
      }
    } catch {
      /* keep static data */
    }
  }, [])

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true,
    }))
    tick()
    const i = setInterval(tick, 1000)
    return () => clearInterval(i)
  }, [])

  useEffect(() => {
    fetchData()
    const i = setInterval(fetchData, 30000)
    return () => clearInterval(i)
  }, [fetchData])

  const activeTails = tails.filter(t => t.status === 'active').length
  const scheduledTails = tails.filter(t => t.status === 'scheduled').length

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-sm text-neutral-500">Phase 2 \u2014 Supervised Autonomy</p>
        </div>
        <div className="text-right flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            {live ? <Wifi className="w-3.5 h-3.5 text-green-500" /> : <WifiOff className="w-3.5 h-3.5 text-neutral-600" />}
            <span className={`text-[11px] ${live ? 'text-green-500' : 'text-neutral-600'}`}>{live ? 'LIVE' : 'STATIC'}</span>
          </div>
          <div>
            <p className="text-sm font-mono text-bc-500">{time}</p>
            <p className="text-xs text-neutral-500">Riyadh (AST)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active Tails" value={`${activeTails}`} sub={`${scheduledTails} scheduled`} icon={<Zap className="w-5 h-5" />} color="amber" />
        <StatCard label="Tasks Today" value="47" sub="+12 from yesterday" icon={<Activity className="w-5 h-5" />} color="green" />
        <StatCard label="Uptime" value="99.9%" sub="Last 30 days" icon={<Clock className="w-5 h-5" />} color="blue" />
        <StatCard label="Disk Usage" value="81%" sub="14 GB free / 75 GB" icon={<HardDrive className="w-5 h-5" />} color="red" />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Tails</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {tails.map(tail => <TailCard key={tail.id} tail={tail} />)}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Recent Activity</h2>
        <TaskFeed tasks={tasks} />
      </div>
    </div>
  )
}
