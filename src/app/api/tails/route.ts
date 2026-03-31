import { NextResponse } from 'next/server'

const CORE = process.env.CORE_URL || 'http://blackcat_core:8000'
const KEY = process.env.CORE_ADMIN_KEY || ''

export async function GET() {
  try {
    const res = await fetch(`${CORE}/admin/tails`, {
      headers: KEY ? { 'X-Admin-Key': KEY } : {},
      next: { revalidate: 0 },
    })
    if (!res.ok) throw new Error(`tails: ${res.status}`)
    const data = await res.json()
    return NextResponse.json({ live: true, tails: data })
  } catch {
    return NextResponse.json({ live: false, tails: null })
  }
}
