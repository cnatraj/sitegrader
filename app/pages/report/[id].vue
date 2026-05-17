<script setup>
import { computed } from "vue";
import { api } from "../../../convex/_generated/api";

const { pricing } = useAppConfig()

const route = useRoute();
const { data: report, pending } = useConvexQuery(api.reports.byId, () => ({
  id: route.params.id,
}));

const analysis = computed(() => report.value?.analysis ?? null);

const business = computed(() => ({
  name: analysis.value?.business_name ?? report.value?.url ?? "—",
  url: report.value?.url ?? "",
}));

const score = computed(() => ({
  value: analysis.value?.overall_score ?? 0,
  outOf: 100,
  verdict: analysis.value?.grade_label ?? "—",
  caption: analysis.value?.ai_visibility_summary ?? "",
  monthlyLoss: analysis.value?.estimated_monthly_loss ?? null,
}));

const metrics = computed(() => [
  {
    label: "Est. Monthly Loss",
    value: analysis.value?.estimated_monthly_loss ?? "—",
    note: "Estimated revenue lost from missed online leads",
    caption: analysis.value?.ai_visibility_summary ?? "",
  },
]);

function tone(s, max) {
  const r = s / max;
  if (r >= 0.75) return "green";
  if (r >= 0.5) return "amber";
  return "red";
}

const subScores = computed(() => {
  if (!analysis.value) return [];
  const c = analysis.value.categories;
  return [
    {
      label: "Conversion",
      detail: c.conversion.label,
      score: c.conversion.score,
      total: c.conversion.max,
      tone: tone(c.conversion.score, c.conversion.max),
    },
    {
      label: "Technical",
      detail: c.technical.label,
      score: c.technical.score,
      total: c.technical.max,
      tone: tone(c.technical.score, c.technical.max),
    },
    {
      label: "Content",
      detail: c.content.label,
      score: c.content.score,
      total: c.content.max,
      tone: tone(c.content.score, c.content.max),
    },
    {
      label: "Trust",
      detail: c.trust.label,
      score: c.trust.score,
      total: c.trust.max,
      tone: tone(c.trust.score, c.trust.max),
    },
    {
      label: "Local",
      detail: c.local.label,
      score: c.local.score,
      total: c.local.max,
      tone: tone(c.local.score, c.local.max),
    },
  ];
});

function toGroups(cat) {
  return [
    {
      title: cat.label,
      items: cat.items.map((item) => ({
        label: item.label,
        description: item.explanation,
        sub: `${item.points_earned} / ${item.points_max} pts`,
        passed: item.pass,
      })),
    },
  ];
}

const sections = computed(() => {
  if (!analysis.value) return [];
  const c = analysis.value.categories;
  return [
    {
      key: "conversion",
      title: "Conversion Signals",
      description: "Does your site turn visitors into calls and bookings?",
      cat: c.conversion,
    },
    {
      key: "technical",
      title: "Technical Health",
      description: "How fast and accessible is your site on mobile?",
      cat: c.technical,
    },
    {
      key: "content",
      title: "Content Depth",
      description:
        "Does your site give AI enough to read, cite, and recommend?",
      cat: c.content,
    },
    {
      key: "trust",
      title: "Trust Signals",
      description: "Can customers and AI systems verify your business is real?",
      cat: c.trust,
    },
    {
      key: "local",
      title: "Local Presence",
      description: "Do you show up when someone searches near you?",
      cat: c.local,
    },
  ];
});

const failCount = computed(() => {
  if (!analysis.value) return 0;
  return Object.values(analysis.value.categories)
    .flatMap((c) => c.items)
    .filter((i) => !i.pass).length;
});

const reportDate = computed(() =>
  new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }),
);
</script>

<template>
  <div v-if="pending" class="state-screen">Connecting…</div>

  <div v-else-if="report?.status === 'error'" class="state-screen error">
    Something went wrong: {{ report.error }}
  </div>

  <div v-else-if="!analysis" class="state-screen">Analysis not ready yet.</div>

  <div v-else class="report">
    <ReportHeader :date="reportDate" />

    <section class="hero">
      <div class="hero-inner">
        <ReportSiteIdentity :business="business" />
        <ReportScoreHero
          :score="score"
          :metrics="metrics"
          :fix-count="failCount"
        />
        <ReportSubScoreRow :sub-scores="subScores" />
      </div>
    </section>

    <main class="content">
      <div class="content-inner">
        <!-- <ReportTeaserCta :fix-count="failCount" /> -->

        <ReportSection
          v-for="s in sections"
          :key="s.key"
          :title="s.title"
          :description="s.description"
          :count="`${s.cat.score} / ${s.cat.max}`"
        >
          <ReportChecklistCard :groups="toGroups(s.cat)" />
        </ReportSection>

        <ReportCtaBanner
          :business-name="business.name"
          :date="reportDate"
        />
      </div>
    </main>

    <div class="sticky-bar">
      <span class="sticky-label">Get Your Full Fix Plan</span>
      <button
        type="button"
        class="sticky-btn"
        @click="navigateTo({ path: '/fullReport', query: { r: route.params.id } })"
      >
        {{ pricing.fullReport }} →
      </button>
    </div>
  </div>
</template>

<style scoped>
.state-screen {
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-size: 17px;
  color: var(--ink-soft);
}
.state-screen.error {
  color: var(--accent);
}

.report {
  min-height: 100vh;
  background: var(--bg);
}

.hero {
  background: var(--cream);
}
.hero-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 40px 28px;
}

.content {
  background: var(--bg);
}
.content-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

.sticky-bar {
  display: none;
}

@media (max-width: 640px) {
  .hero-inner,
  .content-inner {
    padding-left: 20px;
    padding-right: 20px;
  }

  .report {
    padding-bottom: 76px;
  }

  .sticky-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #1a1714;
    padding: 14px 20px;
    z-index: 100;
  }
  .sticky-label {
    font-size: 15px;
    font-weight: 500;
    color: #ffffff;
  }
  .sticky-btn {
    appearance: none;
    border: 0;
    background: var(--accent);
    color: #ffffff;
    font: inherit;
    font-size: 15px;
    font-weight: 500;
    padding: 10px 20px;
    border-radius: 999px;
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease;
  }
  .sticky-btn:hover {
    background: var(--accent-hover);
  }
}
</style>
