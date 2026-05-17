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
      v.literal('scraped'),
      v.literal('analyzing'),
      v.literal('done'),
      v.literal('error')
    ),

    // Which check in the processing page is "active" right now (0–8 active, 9 = done).
    currentStepIndex: v.number(),

    // Raw Firecrawl payload (markdown + metadata + ...). Loose shape on purpose.
    scrapeData: v.optional(v.any()),

    // Final structured analysis JSON — populated by the action when status flips to 'done'.
    analysis: v.optional(v.any()),

    // Populated only if the pipeline errors out, so we can surface it in the UI.
    error: v.optional(v.string()),

    // PageSpeed Insights results — populated in parallel with scraping.
    pageSpeedData: v.optional(v.object({
      mobile: v.object({ score: v.number(), lcp: v.number(), cls: v.number(), screenshotId: v.id('_storage') })
    })),

    // Timestamps. Convex auto-adds _creationTime; we keep our own for portability.
    createdAt: v.number(),
    completedAt: v.optional(v.number())
  }),

  leads: defineTable({
    email: v.string(),
    reportId: v.optional(v.id('reports')),
    createdAt: v.number(),
  }),
})
