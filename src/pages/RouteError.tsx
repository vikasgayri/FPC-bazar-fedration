import { isRouteErrorResponse, useRouteError } from 'react-router-dom'
import { RotateCcw, TriangleAlert } from 'lucide-react'
import { adminService } from '@/services/adminService'

/**
 * Friendly error screen for any route. Most demo-time crashes come from browser data
 * saved by an older build, so the main action resets the local demo data and reloads.
 */
export default function RouteError() {
  const err = useRouteError()
  const msg = isRouteErrorResponse(err) ? `${err.status} ${err.statusText}` : err instanceof Error ? err.message : String(err)
  if (import.meta.env.DEV) console.error(err)
  return (
    <div className="grid min-h-screen place-items-center bg-cream-50 px-5">
      <div className="max-w-md rounded-[1.75rem] bg-white p-8 text-center shadow-lift">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-saffron-100 text-saffron-600">
          <TriangleAlert className="h-7 w-7" />
        </span>
        <h1 className="mt-5 font-display text-2xl text-navy-900">Something went wrong</h1>
        <p className="mt-2 text-sm text-ink-soft">This usually happens when demo data saved in your browser is from an older version of the site. Resetting it fixes the page.</p>
        <button
          onClick={() => {
            adminService.resetDemoData()
            window.location.assign('/')
          }}
          className="btn-primary mt-6"
        >
          <RotateCcw className="h-4 w-4" /> Reset demo data &amp; reload
        </button>
        {import.meta.env.DEV && <p className="mt-5 break-words rounded-xl bg-cream-50 p-3 text-left font-mono text-[11px] text-ink-mute">{msg}</p>}
      </div>
    </div>
  )
}
