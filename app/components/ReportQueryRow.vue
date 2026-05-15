<script setup>
const props = defineProps({
  query: { type: Object, required: true }
})

const rankIsPositive = /^\d+(st|nd|rd|th)$/i.test(props.query.rank)
</script>

<template>
  <button type="button" class="row">
    <span class="source" aria-hidden="true">G</span>
    <span class="title">{{ query.query }}</span>
    <span class="pill pill-red">{{ query.leader }}</span>
    <span :class="['pill', rankIsPositive ? 'pill-green' : 'pill-red']">
      <span v-if="rankIsPositive" class="dot" aria-hidden="true"></span>
      {{ query.rank }}
    </span>
    <span class="pill pill-outline">{{ query.type }}</span>
    <span class="chev" aria-hidden="true">›</span>
  </button>
</template>

<style scoped>
.row {
  appearance: none;
  border: 0;
  background: transparent;
  font: inherit;
  text-align: left;
  display: grid;
  grid-template-columns: auto 1fr auto auto auto 16px;
  align-items: center;
  gap: 18px;
  padding: 18px 4px;
  border-top: 1px solid var(--hairline);
  cursor: pointer;
  color: var(--ink);
  transition: background 0.15s ease;
  width: 100%;
}
.row:last-child {
  border-bottom: 1px solid var(--hairline);
}
.row:hover {
  background: #FFFCF6;
}
.source {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 1px solid var(--hairline);
  display: inline-grid;
  place-items: center;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  color: var(--ink-mute);
}
.title {
  font-size: 15px;
  color: var(--ink);
}
.chev {
  color: var(--ink-mute);
  font-size: 18px;
  line-height: 1;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 13px;
  white-space: nowrap;
}
.pill-red {
  background: #F8E2D7;
  color: var(--accent);
}
.pill-green {
  background: var(--status-green-soft);
  color: #3F7B53;
}
.pill-outline {
  background: transparent;
  border: 1px solid var(--hairline);
  color: var(--ink-soft);
}
.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--status-green);
  display: inline-block;
}

@media (max-width: 900px) {
  .row {
    grid-template-columns: auto 1fr auto;
    row-gap: 8px;
  }
  .row > .pill {
    grid-column: 2 / 4;
  }
}
</style>
