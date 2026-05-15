import { ConvexClient } from 'convex/browser'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()
  const url = config.public.convexUrl

  if (!url) {
    console.warn('[convex] CONVEX_URL not set — Convex client will not connect.')
    return
  }

  const client = new ConvexClient(url)

  return {
    provide: {
      convex: client
    }
  }
})
