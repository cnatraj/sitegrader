import { mutation } from './_generated/server'
import { v } from 'convex/values'

export const capture = mutation({
  args: {
    email: v.string(),
    reportId: v.optional(v.id('reports')),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert('leads', {
      email: args.email,
      reportId: args.reportId,
      createdAt: Date.now(),
    })
  },
})
