<script setup>
defineProps({
  subScores: { type: Array, required: true }
})

const ringR = 9
const ringCirc = 2 * Math.PI * ringR
function ringOffset(score, total) {
  return ringCirc * (1 - score / total)
}
</script>

<template>
  <div class="subscores">
    <div v-for="s in subScores" :key="s.label" class="card subscore-card">
      <span :class="['mini-ring', `mini-ring-${s.tone}`]" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.18" stroke-width="3" />
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            stroke-width="3"
            stroke-linecap="round"
            :stroke-dasharray="ringCirc"
            :stroke-dashoffset="ringOffset(s.score, s.total)"
            transform="rotate(-90 12 12)"
          />
        </svg>
      </span>
      <div class="subscore-text">
        <div class="subscore-label">{{ s.label }}</div>
        <div class="subscore-detail">{{ s.detail }}</div>
      </div>
      <div class="subscore-score">{{ s.score }} <span>/ {{ s.total }}</span></div>
    </div>
  </div>
</template>

<style scoped>
.subscores {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
}
.card {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 18px 22px;
}
.subscore-card {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 16px;
}
.mini-ring {
  width: 28px;
  height: 28px;
  display: inline-grid;
  place-items: center;
}
.mini-ring svg {
  width: 100%;
  height: 100%;
}
.mini-ring-red {
  color: var(--accent);
}
.mini-ring-amber {
  color: var(--status-amber);
}
.mini-ring-green {
  color: var(--status-green);
}
.subscore-label {
  font-size: 16px;
  font-weight: 500;
  color: var(--ink);
}
.subscore-detail {
  font-size: 13px;
  color: var(--ink-soft);
  margin-top: 2px;
}
.subscore-score {
  font-size: 18px;
  font-weight: 500;
  color: var(--ink);
}
.subscore-score span {
  color: var(--ink-mute);
  font-weight: 400;
}

@media (max-width: 1100px) {
  .subscores {
    grid-template-columns: 1fr;
  }
}
</style>
