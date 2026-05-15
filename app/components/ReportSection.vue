<script setup>
defineProps({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  count: { type: String, default: '' }
})
</script>

<template>
  <section class="section">
    <aside class="intro">
      <h2 class="intro-title">{{ title }}</h2>
      <p v-if="description" class="intro-text">{{ description }}</p>
      <div v-if="count" class="count-pill">{{ count }}</div>
    </aside>
    <div class="body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.section {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.4fr);
  gap: 48px;
  padding: 64px 0;
  border-top: 1px solid var(--hairline);
}
.section:first-of-type {
  border-top: 0;
  padding-top: 48px;
}

.intro-title {
  font-size: 22px;
  font-weight: 500;
  letter-spacing: -0.015em;
  color: var(--ink);
  line-height: 1.15;
  margin: 0 0 12px;
  text-wrap: balance;
}
.intro-text {
  font-size: 14px;
  color: var(--ink-soft);
  line-height: 1.5;
  margin: 0 0 22px;
  max-width: 280px;
}
.count-pill {
  display: inline-block;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 12px;
  color: var(--ink-soft);
  background: #FFFFFF;
  border: 1px solid var(--hairline);
  border-radius: 999px;
  padding: 6px 14px;
}

.body {
  min-width: 0;
}

@media (max-width: 1100px) {
  .section {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 48px 0;
  }
}
</style>
