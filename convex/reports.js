import {
  mutation,
  query,
  internalMutation,
  internalAction,
} from "./_generated/server";
import { v } from "convex/values";
import { api, internal } from "./_generated/api";
import { analysisPrompt } from "./prompt";

// Public: called from the landing page.
export const create = mutation({
  args: { url: v.string() },
  handler: async (ctx, { url }) => {
    const id = await ctx.db.insert("reports", {
      url,
      status: "queued",
      currentStepIndex: 0,
      createdAt: Date.now(),
    });
    // Kick off pipeline steps in parallel — client doesn't wait.
    await ctx.scheduler.runAfter(0, internal.reports.scrapeUrl, { id });
    // await ctx.scheduler.runAfter(0, internal.reports.runPageSpeed, { id });
    return id;
  },
});

// Public: subscribe target for the processing & report pages.
export const byId = query({
  args: { id: v.id("reports") },
  handler: async (ctx, { id }) => ctx.db.get(id),
});

// Internal: action writes the doc through these.
export const setStatus = internalMutation({
  args: {
    id: v.id("reports"),
    status: v.union(
      v.literal("queued"),
      v.literal("scraping"),
      v.literal("scraped"),
      v.literal("analyzing"),
      v.literal("done"),
      v.literal("error"),
    ),
  },
  handler: async (ctx, { id, status }) => {
    await ctx.db.patch(id, { status });
  },
});

export const setScrape = internalMutation({
  args: { id: v.id("reports"), scrapeData: v.any() },
  handler: async (ctx, { id, scrapeData }) => {
    await ctx.db.patch(id, { scrapeData, status: "scraped" });
    // const report = await ctx.db.get(id);
    // if (report?.pageSpeedData) {
    //   await ctx.scheduler.runAfter(0, internal.reports.runAnalysis, { id });
    // }
    await ctx.scheduler.runAfter(0, internal.reports.runAnalysis, { id });
  },
});

export const fail = internalMutation({
  args: { id: v.id("reports"), error: v.string() },
  handler: async (ctx, { id, error }) => {
    await ctx.db.patch(id, { status: "error", error });
  },
});

// const pageSpeedDataValidator = v.object({
//   mobile: v.object({ score: v.number(), lcp: v.number(), cls: v.number(), screenshotId: v.id('_storage') })
// })

// export const setPageSpeed = internalMutation({
//   args: { id: v.id('reports'), pageSpeedData: pageSpeedDataValidator },
//   handler: async (ctx, { id, pageSpeedData }) => {
//     await ctx.db.patch(id, { pageSpeedData })
//     const report = await ctx.db.get(id);
//     if (report?.scrapeData) {
//       await ctx.scheduler.runAfter(0, internal.reports.runAnalysis, { id });
//     }
//   }
// })

export const setAnalysis = internalMutation({
  args: { id: v.id("reports"), analysis: v.any() },
  handler: async (ctx, { id, analysis }) => {
    await ctx.db.patch(id, {
      analysis,
      status: "done",
      completedAt: Date.now(),
    });
  },
});

export const runAnalysis = internalAction({
  args: { id: v.id("reports") },
  handler: async (ctx, { id }) => {
    try {
      const report = await ctx.runQuery(api.reports.byId, { id });
      if (!report) throw new Error("report missing");

      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey)
        throw new Error("ANTHROPIC_API_KEY not set on Convex deployment");

      await ctx.runMutation(internal.reports.setStatus, {
        id,
        status: "analyzing",
      });

      // const { mobile } = report.pageSpeedData
      const userMessage = `URL: ${report.url}

## Website HTML
${report.scrapeData.html}`;
      // ## Mobile Performance (PageSpeed)
      // Score: ${mobile.score} / 100
      // LCP: ${Math.round(mobile.lcp)} ms
      // CLS: ${mobile.cls.toFixed(3)}

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          system: analysisPrompt,
          messages: [{ role: "user", content: userMessage }],
        }),
      });

      if (!res.ok) throw new Error(`Anthropic returned ${res.status}`);

      const body = await res.json();
      const text = body.content?.[0]?.text ?? "";
      console.log(
        "[runAnalysis] raw claude response (first 500 chars):",
        text.slice(0, 500),
      );
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found in Claude response");
      console.log(
        "[runAnalysis] extracted json (first 200 chars):",
        jsonMatch[0].slice(0, 200),
      );
      const analysis = JSON.parse(jsonMatch[0]);
      console.log(
        "[runAnalysis] parsed ok, overall_score:",
        analysis.overall_score,
      );

      await ctx.runMutation(internal.reports.setAnalysis, { id, analysis });
    } catch (e) {
      await ctx.runMutation(internal.reports.fail, {
        id,
        error: String(e?.message ?? e),
      });
    }
  },
});

// function base64ToBlob(dataUrl) {
//   const [header, data] = dataUrl.split(',')
//   const mime = header.match(/:(.*?);/)[1]
//   const binary = atob(data)
//   const bytes = new Uint8Array(binary.length)
//   for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
//   return new Blob([bytes], { type: mime })
// }

// async function fetchPageSpeed(url, strategy, apiKey) {
//   const endpoint = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${strategy}&key=${apiKey}`
//   const res = await fetch(endpoint)
//   if (!res.ok) throw new Error(`PageSpeed ${strategy} returned ${res.status}`)
//   return res.json()
// }

// export const runPageSpeed = internalAction({
//   args: { id: v.id('reports') },
//   handler: async (ctx, { id }) => {
//     try {
//       const report = await ctx.runQuery(api.reports.byId, { id })
//       if (!report) throw new Error('report missing')

//       const apiKey = process.env.PAGESPEED_API_KEY
//       if (!apiKey) throw new Error('PAGESPEED_API_KEY not set on Convex deployment')

//       const mobileData = await fetchPageSpeed(report.url, 'mobile', apiKey)

//       const audits = mobileData.lighthouseResult.audits
//       const score = Math.round((mobileData.lighthouseResult.categories.performance.score ?? 0) * 100)
//       const lcp = audits['largest-contentful-paint']?.numericValue ?? 0
//       const cls = audits['cumulative-layout-shift']?.numericValue ?? 0
//       const screenshotDataUrl = audits['final-screenshot']?.details?.data ?? null

//       const screenshotId = await ctx.storage.store(base64ToBlob(screenshotDataUrl))

//       await ctx.runMutation(internal.reports.setPageSpeed, {
//         id,
//         pageSpeedData: {
//           mobile: { score, lcp, cls, screenshotId }
//         }
//       })
//     } catch (e) {
//       console.error('[runPageSpeed]', e?.message ?? e)
//     }
//   }
// })

// Internal action: hits Firecrawl and stores the result on the report doc.
export const scrapeUrl = internalAction({
  args: { id: v.id("reports") },
  handler: async (ctx, { id }) => {
    try {
      const report = await ctx.runQuery(api.reports.byId, { id });
      if (!report) throw new Error("report missing");

      const apiKey = process.env.FIRECRAWL_API_KEY;
      if (!apiKey)
        throw new Error("FIRECRAWL_API_KEY not set on Convex deployment");

      await ctx.runMutation(internal.reports.setStatus, {
        id,
        status: "scraping",
      });

      const res = await fetch("https://api.firecrawl.dev/v1/scrape", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: report.url,
          formats: ["html"],
        }),
      });

      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.success) {
        const msg =
          body?.error || body?.message || `firecrawl returned ${res.status}`;
        throw new Error(msg);
      }

      await ctx.runMutation(internal.reports.setScrape, {
        id,
        scrapeData: body.data,
      });
    } catch (e) {
      await ctx.runMutation(internal.reports.fail, {
        id,
        error: String(e?.message ?? e),
      });
    }
  },
});
