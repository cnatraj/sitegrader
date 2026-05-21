<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "../../../convex/_generated/api";
import { useConvexQuery } from "../../composables/useConvex.js";
import { useGtag } from "../../composables/useGtag.js";

const { gtag } = useGtag();
gtag("event", "page_view", { page_title: "Processing" });

const route = useRoute();
const router = useRouter();
const reportId = computed(() => route.params.id);
const siteLabel = computed(() => "your business");

const {
  data: report,
  pending,
  error,
} = useConvexQuery(api.reports.byId, () => ({ id: reportId.value }));

watch(pending, (val) => {
  console.log("[processing] pending:", val);
});

watch(error, (val) => {
  if (val) console.error("[processing] subscription error:", val);
});

const STATUS_MAP = {
  queued: { floor: 0, ceiling: 0 },
  scraping: { floor: 1, ceiling: 2 },
  scraped: { floor: 3, ceiling: 6 },
  analyzing: { floor: 7, ceiling: 8 },
  done: { floor: 9, ceiling: 9 },
  error: { floor: 0, ceiling: 0 },
};

watch(report, (val) => {
  if (!val) return;
  console.log("[processing] report update:", {
    status: val.status,
    error: val.error,
    hasAnalysis: !!val.analysis,
    hasScrape: !!val.scrapeData,
  });
  // timer is the only thing that advances currentIndex — no floor snapping
});

const checks = [
  { label: "Finding your website", emoji: "🔍" },
  { label: "Reading your website content", emoji: "📄" },
  { label: "Scanning your content and site structure", emoji: "⚡" },
  { label: "Checking for phone numbers and contact options", emoji: "📞" },
  { label: "Looking for reviews and trust signals", emoji: "🛡️" },
  { label: "Checking your local presence and service areas", emoji: "📍" },
  { label: "Scanning for technical issues", emoji: "🔧" },
  { label: "Running AI analysis on your results", emoji: "🤖" },
  { label: "Calculating your score", emoji: "📊" },
];

const stepMs = 3000;
const currentIndex = ref(0);
let timer = null;

const allDone = computed(() => currentIndex.value >= checks.length);

watch(allDone, (val) => {
  if (val) router.push(`/report/${reportId.value}`);
});

onMounted(() => {
  timer = setInterval(() => {
    const status = report.value?.status ?? "queued";
    const ceiling =
      status === "done" ? checks.length : (STATUS_MAP[status]?.ceiling ?? 0);
    if (currentIndex.value < ceiling) {
      currentIndex.value += 1;
    }
  }, stepMs);
});

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>

<template>
  <main class="processing-stage">
    <div class="processing-panel">
      <p class="status-badge"><span></span>Running Grader</p>
      <h1 class="processing-headline">
        Analyzing {{ siteLabel }}<span class="ellipsis">…</span>
      </h1>
      <p class="processing-eta">This usually takes less than a minute.</p>

      <div v-if="!allDone" class="step-card">
        <span class="card-spinner" aria-hidden="true"></span>
        <span class="card-emoji" aria-hidden="true">{{
          checks[currentIndex].emoji
        }}</span>
        <p class="card-label">{{ checks[currentIndex].label }}</p>
        <p class="card-step">
          Step {{ String(currentIndex + 1).padStart(2, "0") }} of
          {{ String(checks.length).padStart(2, "0") }}
        </p>
      </div>

      <div v-else class="step-card done-card">
        <button
          type="button"
          class="view-report"
          @click="router.push(`/report/${reportId}`)"
        >
          View your report →
        </button>
      </div>

      <div class="progress-dots" aria-hidden="true">
        <span
          v-for="(_, i) in checks"
          :key="i"
          :class="[
            'dot',
            i < currentIndex
              ? 'dot-done'
              : i === currentIndex && !allDone
                ? 'dot-active'
                : 'dot-pending',
          ]"
        ></span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.processing-stage {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: start center;
  padding: 110px 24px 80px;
}

.processing-panel {
  width: 100%;
  max-width: 640px;
  text-align: center;
}

.status-badge {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #8e867c;
  text-transform: uppercase;
  margin: 0 0 22px;
}
.status-badge span {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #c2410c;
  margin-right: 8px;
  transform: translateY(-1px);
  box-shadow: 0 0 0 3px rgba(194, 65, 12, 0.12);
}

.processing-headline {
  font-size: clamp(28px, 4vw, 44px);
  line-height: 1.05;
  letter-spacing: -0.028em;
  font-weight: 500;
  margin: 0 auto 12px;
  text-wrap: balance;
  color: #1a1714;
}
.processing-headline .ellipsis {
  color: #8e867c;
  margin-left: 2px;
}
.processing-eta {
  font-size: 15px;
  color: #8e867c;
  margin: 0 0 32px;
}

/* Step card */
.step-card {
  position: relative;
  background: #ffffff;
  border-radius: 20px;
  padding: 36px 40px 32px;
  text-align: left;
  min-height: 210px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.card-spinner {
  position: absolute;
  top: 28px;
  right: 28px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #c2410c;
  border-top-color: transparent;
  animation: spin 0.9s linear infinite;
  flex-shrink: 0;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
.card-emoji {
  font-size: 52px;
  line-height: 1;
  display: block;
  margin-bottom: 20px;
}
.card-label {
  font-size: 26px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: #1a1714;
  line-height: 1.2;
  margin: 0 0 10px;
}
.card-step {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8e867c;
  margin: 0;
}

/* Done card */
.done-card {
  align-items: center;
  justify-content: center;
}
.view-report {
  appearance: none;
  border: 0;
  background: #c2410c;
  color: #fff;
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  padding: 16px 32px;
  border-radius: 999px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    transform 0.15s ease;
}
.view-report:hover {
  background: #9a3309;
}
.view-report:active {
  transform: scale(0.98);
}

/* Progress dots */
.progress-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.dot {
  height: 4px;
  width: 36px;
  border-radius: 999px;
  transition: background 0.3s ease;
}
.dot-done {
  background: #1a1714;
}
.dot-active {
  background: #c2410c;
}
.dot-pending {
  background: #e0d9cf;
}

@media (max-width: 560px) {
  .processing-stage {
    padding: 80px 18px 40px;
  }
  .step-card {
    padding: 28px 28px 26px;
    min-height: 180px;
  }
  .card-label {
    font-size: 22px;
  }
  .dot {
    width: 24px;
  }
}
</style>
