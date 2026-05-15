<script setup>
import { computed } from 'vue'

const props = defineProps({
  score: { type: Object, required: true },
  metrics: { type: Array, required: true }
})

const donutR = 74
const donutCirc = 2 * Math.PI * donutR
const donutOffset = computed(() => donutCirc * (1 - props.score.value / props.score.outOf))
</script>

<template>
  <div class="score-grid">
    <div class="donut-card">
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
          <circle cx="90" cy="90" r="74" fill="none" stroke="#EAE2D2" stroke-width="14" />
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
        <div class="donut-caption">{{ score.caption }}</div>
      </div>
    </div>

    <div v-for="m in metrics" :key="m.label" class="card metric-card">
      <div class="meta-label">{{ m.label }}</div>
      <div class="metric-value-row">
        <span class="metric-value">{{ m.value }}</span>
        <span v-if="m.unit" class="metric-unit">{{ m.unit }}</span>
      </div>
      <div class="metric-note">
        <span v-if="m.notePrefix" class="metric-note-accent">{{ m.notePrefix }}&nbsp;</span>
        <span>{{ m.note }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.score-grid {
  display: grid;
  grid-template-columns: 1.15fr 1fr 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}
.donut-card {
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 14px 4px;
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
  font-family: 'JetBrains Mono', ui-monospace, monospace;
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
  margin: 4px 0 8px;
  line-height: 1.05;
}
.donut-caption {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.45;
  max-width: 220px;
}

.card {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 22px 24px;
}
.metric-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 188px;
}
.meta-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
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
  font-size: 13px;
  line-height: 1.45;
  color: var(--ink-soft);
}
.metric-note-accent {
  color: var(--accent);
  font-weight: 500;
}

@media (max-width: 1100px) {
  .score-grid {
    grid-template-columns: 1fr 1fr;
  }
  .donut-card {
    grid-column: span 2;
  }
}
@media (max-width: 640px) {
  .score-grid {
    grid-template-columns: 1fr;
  }
  .donut-card {
    grid-column: span 1;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
