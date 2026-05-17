<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../../../convex/_generated/api'
import { useConvexQuery } from '../../composables/useConvex.js'
import { useGtag } from '../../composables/useGtag.js'

const { gtag } = useGtag()
gtag('event', 'page_view', { page_title: 'Processing' })

const route = useRoute()
const router = useRouter()
const reportId = computed(() => route.params.id)
const siteLabel = computed(() => 'your business')

const { data: report, pending, error } = useConvexQuery(api.reports.byId, () => ({ id: reportId.value }))

watch(pending, (val) => {
  console.log('[processing] pending:', val)
})

watch(error, (val) => {
  if (val) console.error('[processing] subscription error:', val)
})

watch(report, (val) => {
  if (!val) return
  console.log('[processing] report update:', { status: val.status, error: val.error, hasAnalysis: !!val.analysis, hasScrape: !!val.scrapeData, hasPageSpeed: !!val.pageSpeedData })
  if (val.status === 'done') {
    router.push(`/report/${reportId.value}`)
  }
})

const checks = [
  { label: 'Finding your website', emoji: '🔍' },
  { label: 'Reading your website content', emoji: '📄' },
  { label: 'Testing your page speed on mobile', emoji: '⚡' },
  { label: 'Checking for phone numbers and contact options', emoji: '📞' },
  { label: 'Looking for reviews and trust signals', emoji: '🛡️' },
  { label: 'Checking your local presence and service areas', emoji: '📍' },
  { label: 'Scanning for technical issues', emoji: '🔧' },
  { label: 'Running AI analysis on your results', emoji: '🤖' },
  { label: 'Calculating your score', emoji: '📊' }
]

const stepMs = 1400
const currentIndex = ref(0)
let timer = null

const allDone = computed(() => currentIndex.value >= checks.length)

function stepStatus(i) {
  if (i < currentIndex.value) return 'done'
  if (i === currentIndex.value) return 'active'
  return 'pending'
}

onMounted(() => {
  timer = setInterval(() => {
    if (currentIndex.value < checks.length) {
      currentIndex.value += 1
    } else {
      clearInterval(timer)
      timer = null
    }
  }, stepMs)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <main class="processing-stage">
    <div class="processing-panel">
      <p class="status-badge"><span></span>Running Grader</p>
      <h1 class="processing-headline">
        Analyzing {{ siteLabel }}<span class="ellipsis">…</span>
      </h1>

      <ul class="checklist">
        <li
          v-for="(c, i) in checks"
          :key="c.label"
          :class="['check-row', stepStatus(i)]"
        >
          <span class="indicator" aria-hidden="true">
            <svg v-if="stepStatus(i) === 'done'" class="check-svg" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8.5 L6.5 12 L13 5"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <span v-else-if="stepStatus(i) === 'active'" class="spinner"></span>
          </span>
          <span class="emoji" aria-hidden="true">{{ c.emoji }}</span>
          <span class="label">{{ c.label }}</span>
        </li>
      </ul>

      <button
        v-if="allDone"
        type="button"
        class="view-report"
        @click="router.push(`/report/${reportId}`)"
      >
        View report
      </button>
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
  max-width: 720px;
  text-align: center;
}

.status-badge {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #8E867C;
  text-transform: uppercase;
  margin: 0 0 22px;
}
.status-badge span {
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #C2410C;
  margin-right: 8px;
  transform: translateY(-1px);
  box-shadow: 0 0 0 3px rgba(194, 65, 12, 0.12);
}

.processing-headline {
  font-size: clamp(32px, 4.2vw, 50px);
  line-height: 1.05;
  letter-spacing: -0.028em;
  font-weight: 500;
  margin: 0 auto 64px;
  text-wrap: balance;
  color: #1A1714;
}
.processing-headline .ellipsis {
  color: #8E867C;
  margin-left: 2px;
}

.checklist {
  list-style: none;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
  text-align: left;
  width: fit-content;
}

.check-row {
  display: grid;
  grid-template-columns: 24px 24px auto;
  align-items: center;
  gap: 28px;
}

.indicator {
  width: 24px;
  height: 24px;
  display: inline-grid;
  place-items: center;
}
.check-svg {
  width: 18px;
  height: 18px;
  color: #4A8A5E;
}
.spinner {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #C2410C;
  border-top-color: transparent;
  animation: spin 0.9s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.emoji {
  font-size: 18px;
  line-height: 1;
  display: inline-block;
  width: 24px;
  text-align: center;
}

.label {
  font-size: 17px;
  line-height: 1.4;
  color: #B5AFA6;
}

.check-row.done .label {
  color: #8E867C;
}
.check-row.active .label {
  color: #1A1714;
  font-weight: 500;
}
.check-row.pending .label {
  color: #B5AFA6;
}
.check-row.pending .emoji {
  opacity: 0.45;
}

.view-report {
  appearance: none;
  border: 0;
  background: #C2410C;
  color: #fff;
  font: inherit;
  font-size: 15px;
  font-weight: 500;
  padding: 14px 28px;
  border-radius: 999px;
  cursor: pointer;
  margin-top: 48px;
  transition: background 0.15s ease, transform 0.15s ease;
}
.view-report:hover {
  background: #9A3309;
}
.view-report:active {
  transform: scale(0.98);
}

@media (max-width: 560px) {
  .processing-stage {
    padding: 96px 18px 40px;
  }
  .processing-headline {
    font-size: 28px;
    margin-bottom: 48px;
  }
  .checklist {
    gap: 22px;
  }
  .check-row {
    grid-template-columns: 20px 20px auto;
    gap: 18px;
  }
  .label {
    font-size: 15px;
  }
}
</style>
