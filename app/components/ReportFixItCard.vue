<script setup>
defineProps({
  fixCount: { type: Number, default: 0 },
  monthlyLoss: { type: String, default: '' }
})
</script>

<template>
  <div class="fix-card">
    <div class="eyebrow">
      <span class="dot" aria-hidden="true"></span>
      Your Fix-It Plan
    </div>
    <p class="headline">
      A {{ fixCount }}-step plan to recover an estimated
      <span class="accent">{{ monthlyLoss }}/mo</span>.
    </p>
    <div class="price-row">
      <span class="price">$19.99</span>
      <span class="price-note">one-time</span>
    </div>
    <button type="button" class="btn" @click="navigateTo('/fullReport')">
      Unlock the full plan
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.fix-card {
  background: #1A1714;
  border-radius: 16px;
  padding: 24px 26px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.eyebrow {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  gap: 8px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}
.headline {
  font-size: 20px;
  font-weight: 500;
  color: #FFFFFF;
  line-height: 1.35;
  margin: 0;
}
.accent {
  color: var(--accent);
}
.price-row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.price {
  font-size: 40px;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: #FFFFFF;
  line-height: 1;
}
.price-note {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  letter-spacing: 0.06em;
}
.btn {
  appearance: none;
  border: 0;
  background: var(--accent);
  color: #FFFFFF;
  font: inherit;
  font-size: 15px;
  font-weight: 500;
  padding: 14px 20px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  width: 100%;
  transition: background 0.15s ease;
  margin-top: auto;
}
.btn svg {
  width: 16px;
  height: 16px;
}
.btn:hover {
  background: var(--accent-hover);
}
</style>
