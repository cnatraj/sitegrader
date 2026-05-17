import { ConvexClient } from 'convex/browser'

const url = import.meta.env.VITE_CONVEX_URL

if (!url) {
  console.warn('[convex] VITE_CONVEX_URL not set — Convex client will not connect.')
}

export const convexClient = url ? new ConvexClient(url) : null
