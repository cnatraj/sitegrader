<script setup>
import { computed } from "vue";

const props = defineProps({
  score: { type: Object, required: true },
  metrics: { type: Array, required: true },
  fixCount: { type: Number, default: 0 },
});

const donutR = 74;
const donutCirc = 2 * Math.PI * donutR;
const donutOffset = computed(
  () => donutCirc * (1 - props.score.value / props.score.outOf),
);
</script>

<template>
  <div class="score-hero">
    <div class="hero-top">
      <div class="donut-half">
        <div class="donut">
          <svg viewBox="0 0 180 180" class="donut-svg" aria-hidden="true">
            <defs>
              <linearGradient
                id="donutGradient"
                gradientUnits="userSpaceOnUse"
                x1="25"
                y1="160"
                x2="160"
                y2="25"
              >
                <stop offset="0%" stop-color="#B23414" />
                <stop offset="35%" stop-color="#D85C28" />
                <stop offset="75%" stop-color="#E89540" />
                <stop offset="100%" stop-color="#D9A23F" />
              </linearGradient>
            </defs>
            <circle
              cx="90"
              cy="90"
              r="74"
              fill="none"
              stroke="#EAE2D2"
              stroke-width="14"
            />
            <circle
              cx="90"
              cy="90"
              r="74"
              fill="none"
              stroke="url(#donutGradient)"
              stroke-width="14"
              stroke-linecap="round"
              :stroke-dasharray="donutCirc"
              :stroke-dashoffset="donutOffset"
              transform="rotate(120 90 90)"
            />
          </svg>
          <div class="donut-label">
            <div class="donut-value">{{ score.value }}</div>
            <div class="donut-of">of {{ score.outOf }}</div>
          </div>
        </div>
        <div class="donut-text">
          <div class="meta-label">Online Health</div>
          <div class="donut-verdict">{{ score.verdict }}</div>
        </div>
      </div>
    </div>

    <div class="metrics-row">
      <div v-for="m in metrics" :key="m.label" class="card metric-card">
        <div class="meta-label">{{ m.label }}</div>
        <div class="metric-value-row">
          <span class="metric-value">{{ m.value }}</span>
          <span v-if="m.unit" class="metric-unit">{{ m.unit }}</span>
        </div>

        <div class="metric-note">
          <span v-if="m.notePrefix" class="metric-note-accent"
            >{{ m.notePrefix }}&nbsp;</span
          >
          <span>{{ m.note }}</span>
        </div>
        <div v-if="m.caption" class="metric-caption">{{ m.caption }}</div>
      </div>
      <ReportFixItCard :fix-count="fixCount" :monthly-loss="score.monthlyLoss" />
    </div>
  </div>
</template>

<style scoped>
.score-hero {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.hero-top {
  display: flex;
  align-items: center;
  gap: 16px;
}
.donut-half {
  flex: 0 0 50%;
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 14px 4px;
}
.hero-caption {
  flex: 0 0 50%;
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.6;
}

.metrics-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
.donut {
  position: relative;
  width: 160px;
  height: 160px;
  flex: 0 0 160px;
}
.donut-svg {
  width: 100%;
  height: 100%;
}
.donut-label {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.donut-value {
  font-size: 44px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--ink);
}
.donut-of {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin-top: 6px;
}
.donut-text {
  min-width: 0;
}
.donut-verdict {
  font-size: 30px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ink);
  margin: 4px 0 0;
  line-height: 1.05;
}
.donut-loss {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 14px;
}
.loss-amount {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--accent);
  line-height: 1;
}
.loss-label {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

.card {
  background: #ffffff;
  border-radius: 14px;
  padding: 22px 24px;
}
.metric-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 160px;
}
.meta-label {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin-bottom: 14px;
}
.metric-value-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 14px;
}
.metric-value {
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ink);
  line-height: 1;
}
.metric-unit {
  font-size: 16px;
  color: var(--ink-mute);
  font-weight: 400;
}
.metric-note {
  font-size: 14px;
  line-height: 1.45;
  color: var(--ink-soft);
}
.metric-note-accent {
  color: var(--accent);
  font-weight: 500;
}
.metric-caption {
  line-height: 1.55;
  color: var(--ink-mute);
  margin-top: 10px;
  padding-top: 10px;
  border-top: 1px solid #f0ebe3;
}

@media (max-width: 640px) {
  .hero-top {
    flex-direction: column;
    align-items: flex-start;
  }
  .donut-half,
  .hero-caption {
    flex: none;
    width: 100%;
  }
  .donut {
    width: 120px;
    height: 120px;
    flex: 0 0 120px;
  }
  .donut-value {
    font-size: 34px;
  }
  .metrics-row {
    grid-template-columns: 1fr;
  }
  .metric-card {
    min-height: auto;
  }
}
</style>
