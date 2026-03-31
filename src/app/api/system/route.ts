import { NextResponse } from 'next/server'

const CORE = process.env.CORE_URL || 'http://blackcat_core:8000'
const KEY = process.env.CORE_ADMIN_KEY || ''

async function fetchCore(path: string) {
  const res = await fetch(`${CORE}${path}`, {
    headers: KEY ? { 'X-Admin-Key': KEY } : {},
    next: { revalidate: 0 },
  })
  if (!res.ok) throw new Error(`${path}: ${res.status}`)
  return res.json()
}

export async function GET() {
  try {
    const [dashboard, health] = await Promise.allSettled([
      fetchCore('/admin/dashboard'),
      fetchCore('/health'),
    ])
    return NextResponse.json({
      live: true,
      dashboard: dashboard.status === 'fulfilled' ? dashboard.value : null,
      health: health.status === 'fulfilled' ? health.value : null,
    })
  } catch {
    return NextResponse.json({ live: false, dashboard: null, health: null })
  }
}
