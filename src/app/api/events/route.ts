import { NextResponse } from 'next/server'

const CORE = process.env.CORE_URL || 'http://blackcat_core:8000'
const KEY = process.env.CORE_ADMIN_KEY || ''

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const hours = searchParams.get('hours') || '24'
  try {
    const res = await fetch(`${CORE}/admin/events?hours=${hours}`, {
      headers: KEY ? { 'X-Admin-Key': KEY } : {},
      next: { revalidate: 0 },
    })
    if (!res.ok) throw new Error(`events: ${res.status}`)
    const data = await res.json()
    return NextResponse.json({ live: true, events: data })
  } catch {
    return NextResponse.json({ live: false, events: null })
  }
}
