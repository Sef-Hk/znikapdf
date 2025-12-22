// src/lib/rateLimit.ts
import { getRedis } from './redis'

type RateLimitResult =
  | { ok: true; limit: number; remaining: number; resetSec: number; total: number }
  | { ok: false; limit: number; remaining: 0; resetSec: number; total: number }

const LUA_FIXED_WINDOW = `
  local current = redis.call("INCR", KEYS[1])
  if tonumber(current) == 1 then
    redis.call("EXPIRE", KEYS[1], ARGV[1])
  end
  local ttl = redis.call("TTL", KEYS[1])
  return { current, ttl }
`

export async function rateLimitFixedWindow(opts: {
  key: string
  limit: number
  windowSec: number
}) {
  const redis = getRedis()
  if (!redis) {
    // Si Redis pas configuré: on n’empêche pas (ou tu peux choisir de bloquer).
    return {
      ok: true,
      limit: opts.limit,
      remaining: opts.limit,
      resetSec: opts.windowSec,
      total: 0,
    } as const
  }

  // (count, ttl)
  const res = (await redis.eval(LUA_FIXED_WINDOW, 1, opts.key, String(opts.windowSec))) as [
    number,
    number,
  ]

  const total = Number(res?.[0] ?? 0)
  const resetSec = Math.max(Number(res?.[1] ?? opts.windowSec), 0)
  const remaining = Math.max(opts.limit - total, 0)

  if (total > opts.limit) {
    return { ok: false, limit: opts.limit, remaining: 0, resetSec, total } as const
  }

  return { ok: true, limit: opts.limit, remaining, resetSec, total } as const
}
