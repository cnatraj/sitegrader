<script setup>
import { computed } from 'vue'
import { api } from '../../convex/_generated/api'
import { useConvexQuery } from '../composables/useConvex.js'

const { data, error, pending } = useConvexQuery(api.ping.get)

const formatted = computed(() => {
  if (pending.value) return 'connecting…'
  if (error.value) return `error: ${error.value.message ?? error.value}`
  if (!data.value) return 'no data'
  return JSON.stringify(data.value)
})
</script>

<template>
  <main class="wrap">
    <div class="panel">
      <p class="label">Convex health check</p>
      <pre class="value">{{ formatted }}</pre>
    </div>
  </main>
</template>

<style scoped>
.wrap {
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 32px;
}
.panel {
  background: #FFFFFF;
  border: 1px solid var(--hairline);
  border-radius: 14px;
  padding: 32px;
  min-width: 320px;
  text-align: center;
}
.label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin: 0 0 14px;
}
.value {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 14px;
  color: var(--ink);
  margin: 0;
}
</style>
