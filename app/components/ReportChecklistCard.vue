<script setup>
defineProps({
  intro: { type: Object, default: null }, // { title, text }
  groups: { type: Array, required: true } // [{ title, items: [{ label, description, sub, passed }] }]
})
</script>

<template>
  <div class="card">
    <div v-if="intro" class="card-intro">
      <div v-if="intro.title" class="intro-label">{{ intro.title }}</div>
      <p v-if="intro.text" class="intro-text">{{ intro.text }}</p>
    </div>

    <slot name="top" />

    <div v-for="g in groups" :key="g.title" class="group">
      <h3 class="group-title">{{ g.title }}</h3>
      <button
        v-for="item in g.items"
        :key="item.label"
        type="button"
        class="item"
      >
        <span :class="['indicator', item.passed ? 'pass' : 'fail']" aria-hidden="true">
          <svg v-if="item.passed" viewBox="0 0 16 16" fill="none">
            <path d="M3 8.5 L6.5 12 L13 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <svg v-else viewBox="0 0 16 16" fill="none">
            <path d="M4 4 L12 12 M12 4 L4 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
          </svg>
        </span>
        <div class="text">
          <div class="label">{{ item.label }}</div>
          <div v-if="item.description" class="description">{{ item.description }}</div>
          <div v-if="item.sub" class="sub">{{ item.sub }}</div>
        </div>
        <span class="chev" aria-hidden="true">›</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  background: #FFFFFF;
  border: 1px solid var(--hairline);
  border-radius: 14px;
  padding: 26px 28px;
}
.card-intro {
  padding-bottom: 18px;
}
.intro-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin-bottom: 10px;
}
.intro-text {
  font-size: 14px;
  line-height: 1.55;
  color: var(--ink-soft);
  margin: 0;
}

.group + .group {
  margin-top: 22px;
}
.group-title {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin: 0 0 6px;
  font-weight: 500;
}

.item {
  appearance: none;
  border: 0;
  background: transparent;
  font: inherit;
  text-align: left;
  width: 100%;
  display: grid;
  grid-template-columns: 18px 1fr 16px;
  align-items: start;
  gap: 14px;
  padding: 14px 0;
  border-top: 1px solid var(--hairline);
  cursor: pointer;
  transition: background 0.15s ease;
}
.item:hover {
  background: #FFFCF6;
}
.indicator {
  width: 18px;
  height: 18px;
  display: inline-grid;
  place-items: center;
  margin-top: 2px;
}
.indicator svg {
  width: 16px;
  height: 16px;
}
.indicator.pass {
  color: var(--status-green);
}
.indicator.fail {
  color: var(--accent);
}

.text {
  min-width: 0;
}
.label {
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.3;
}
.description {
  font-size: 13px;
  color: var(--ink-soft);
  line-height: 1.5;
  margin-top: 4px;
}
.sub {
  font-size: 13px;
  color: var(--ink-mute);
  margin-top: 4px;
}

.chev {
  color: var(--ink-mute);
  font-size: 18px;
  line-height: 1;
  align-self: center;
}
</style>
