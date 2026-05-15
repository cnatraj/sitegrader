<script setup>
defineProps({
  fixCount: { type: Number, default: 0 },
  highlightLabel: { type: String, default: 'AI Site Builder' },
  buttonLabel: { type: String, default: 'Rebuild my website' }
})
</script>

<template>
  <div class="cta">
    <div class="cta-text">
      <div class="cta-eyebrow">
        <span>HVAC Grader</span>
        <span class="dot">·</span>
        <span class="pro">Pro</span>
      </div>
      <p class="cta-headline">
        Fix all <span class="accent">{{ fixCount }} issues</span> with
        <span class="accent">{{ highlightLabel }}</span>
        — in 35 seconds.
      </p>
    </div>
    <button type="button" class="cta-button">
      <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1.6 L9.85 5.6 L14.2 6.15 L11 9.05 L11.85 13.3 L8 11.15 L4.15 13.3 L5 9.05 L1.8 6.15 L6.15 5.6 Z" />
      </svg>
      {{ buttonLabel }}
    </button>
  </div>
</template>

<style scoped>
.cta {
  background: #1A1714;
  border-radius: 18px;
  padding: 36px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  margin: 56px 0 80px;
}
.cta-eyebrow {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.55);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 14px;
}
.cta-eyebrow .dot {
  color: var(--accent);
}
.cta-eyebrow .pro {
  color: rgba(255, 255, 255, 0.85);
}
.cta-headline {
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: #FFFFFF;
  margin: 0;
  max-width: 600px;
  text-wrap: balance;
}
.cta-headline .accent {
  color: var(--accent);
}
.cta-button {
  appearance: none;
  border: 0;
  background: var(--accent);
  color: #FFFFFF;
  font: inherit;
  font-size: 15px;
  font-weight: 500;
  padding: 14px 24px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background 0.15s ease, transform 0.15s ease;
  white-space: nowrap;
}
.cta-button svg {
  width: 14px;
  height: 14px;
}
.cta-button:hover {
  background: var(--accent-hover);
}
.cta-button:active {
  transform: scale(0.98);
}

@media (max-width: 900px) {
  .cta {
    flex-direction: column;
    align-items: flex-start;
    padding: 28px 24px;
  }
  .cta-headline {
    font-size: 24px;
  }
}
</style>
