import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const create = mutation({
  args: { url: v.string() },
  handler: async (ctx, { url }) => {
    const id = await ctx.db.insert('reports', {
      url,
      status: 'queued',
      currentStepIndex: 0,
      createdAt: Date.now()
    })
    return id
  }
})
