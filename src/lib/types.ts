export interface TailStatus {
  id: string
  name: string
  role: string
  status: 'active' | 'scheduled' | 'idle' | 'built' | 'planned' | 'error'
  lastRun: string
  model: string
}

export interface Task {
  id: string
  tail: string
  action: string
  time: string
  status: 'success' | 'warning' | 'error'
}

export interface SystemHealth {
  containers: number
  disk: { used: number; total: number; percent: number }
  memory: { used: number; total: number }
  uptime: number
  phase: number
}
