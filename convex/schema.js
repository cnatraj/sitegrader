import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  reports: defineTable({
    // What the user submitted.
    url: v.string(),

    // Pipeline state — drives the processing page UI and the report-page guard.
    status: v.union(
      v.literal('queued'),
      v.literal('scraping'),
      v.literal('analyzing'),
      v.literal('done'),
      v.literal('error')
    ),

    // Which check in the processing page is "active" right now (0–8 active, 9 = done).
    currentStepIndex: v.number(),

    // Final structured analysis JSON — populated by the action when status flips to 'done'.
    analysis: v.optional(v.any()),

    // Populated only if the pipeline errors out, so we can surface it in the UI.
    error: v.optional(v.string()),

    // Timestamps. Convex auto-adds _creationTime; we keep our own for portability.
    createdAt: v.number(),
    completedAt: v.optional(v.number())
  })
})
