import { useCallback, useEffect, useRef, useState } from 'react'

/** Runs an async loader on mount / when deps change. Returns data, loading, error and reload(). */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const alive = useRef(true)

  const run = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fn()
      if (alive.current) setData(res)
    } catch (e) {
      if (alive.current) setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      if (alive.current) setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  useEffect(() => {
    alive.current = true
    run()
    return () => {
      alive.current = false
    }
  }, [run])

  return { data, loading, error, reload: run, setData }
}
