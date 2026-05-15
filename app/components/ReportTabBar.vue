<script setup>
defineProps({
  tabs: { type: Array, required: true },
  active: { type: String, required: true },
  meta: { type: String, default: '' }
})
</script>

<template>
  <div class="tabs-bar">
    <div class="tabs">
      <button
        v-for="t in tabs"
        :key="t.key"
        type="button"
        :class="['tab', { 'tab-active': active === t.key }]"
      >
        <span class="tab-label">{{ t.label }}</span>
        <span class="tab-count">{{ t.count }}</span>
      </button>
    </div>
    <div v-if="meta" class="tabs-meta">{{ meta }}</div>
  </div>
</template>

<style scoped>
.tabs-bar {
  max-width: 1280px;
  margin: 0 auto;
  padding: 24px 40px 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  flex-wrap: wrap;
}
.tabs {
  display: inline-flex;
  align-items: center;
  gap: 28px;
}
.tab {
  appearance: none;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 15px;
  color: var(--ink-mute);
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0 14px;
  cursor: pointer;
  position: relative;
}
.tab-count {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  background: #FFFFFF;
  border: 1px solid var(--hairline);
  border-radius: 999px;
  padding: 2px 9px;
  color: var(--ink-soft);
}
.tab-active {
  color: var(--ink);
  font-weight: 500;
}
.tab-active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--accent);
  border-radius: 2px;
}
.tabs-meta {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mute);
  padding-bottom: 14px;
}

@media (max-width: 640px) {
  .tabs-bar {
    padding-left: 20px;
    padding-right: 20px;
  }
  .tabs {
    gap: 20px;
    overflow-x: auto;
  }
  .tabs-meta {
    display: none;
  }
}
</style>
