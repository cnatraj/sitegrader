<script setup>
defineProps({
  date: { type: String, required: true }
})
</script>

<template>
  <header class="page-header">
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
  justify-content: flex-end;
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
