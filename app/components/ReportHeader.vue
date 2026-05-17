<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  date: { type: String, required: true }
})
</script>

<template>
  <header class="page-header">
    <RouterLink class="wordmark" to="/" aria-label="HVAC Grader home">
      <span class="mark" aria-hidden="true"></span>
      <span class="name">HVAC Grader</span>
    </RouterLink>
    <div class="stamp">
      <span>Report</span>
      <span class="dot">•</span>
      <span>{{ date }}</span>
    </div>
  </header>
</template>

<style scoped>
.page-header {
  background: #FFFFFF;
  border-bottom: 1px solid var(--hairline);
  padding: 22px 40px;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--ink);
  user-select: none;
}
.mark {
  width: 22px;
  height: 22px;
  position: relative;
  display: inline-block;
}
.mark::before,
.mark::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.75px solid var(--ink);
}
.mark::after {
  transform: scale(0.42);
  background: var(--accent);
  border-color: var(--accent);
}
.name {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.005em;
}
.stamp {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mute);
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.stamp .dot {
  color: var(--accent);
}

@media (max-width: 640px) {
  .page-header {
    padding: 18px 20px;
  }
}
</style>
