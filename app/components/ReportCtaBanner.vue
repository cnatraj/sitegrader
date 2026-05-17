<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useGtag } from '../composables/useGtag.js'
import { useAppConfig } from '../composables/useAppConfig.js'

const props = defineProps({
  businessName: { type: String, default: '' },
  date: { type: String, default: '' },
  totalScore: { type: Number, default: 0 },
})

const { pricing } = useAppConfig()
const { gtag } = useGtag()
const route = useRoute()
const router = useRouter()

function goToFullReport() {
  gtag('event', 'cta_click', {
    button_location: 'cta_banner',
    report_price: pricing.fullReport,
    report_id: route.params.id,
    total_score: props.totalScore,
  })
  router.push({ path: '/fullReport', query: { r: route.params.id } })
}
</script>

<template>
  <div class="banner">
    <div class="panel-left">
      <div class="eyebrow">
        Order Summary
        <span class="sep">—</span>
      </div>
      <h2 class="headline">Your full fix-it plan, itemized.</h2>
      <p class="body-text">
        The free report tells you what's broken. The full report tells you
        exactly what to do.
      </p>
      <div class="h-divider" aria-hidden="true"></div>
      <div class="price-row">
        <span class="price-label">Total · One-Time</span>
        <span class="price">{{ pricing.fullReport }}</span>
      </div>
    </div>

    <div class="v-divider" aria-hidden="true"></div>

    <div class="panel-right">
      <div class="badge">One-Time</div>
      <p class="trust-text">
        No subscription. No upsells. Pay once, keep the report
        <span class="accent">forever</span>.
      </p>
      <button type="button" class="cta-btn" @click="goToFullReport">
        Get the full report
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <p class="guarantee">
        <span class="green-dot" aria-hidden="true">●</span>
        100% Money Back Guaranteed.
      </p>
    </div>
  </div>
</template>

<style scoped>
.banner {
  display: grid;
  grid-template-columns: 1fr 1px 360px;
  background: var(--cream);
  border-radius: 18px;
  margin: 56px 0 80px;
  overflow: hidden;
}

.panel-left {
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.panel-right {
  padding: 36px 40px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.eyebrow {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mute);
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.sep {
  color: var(--ink-mute);
}

.headline {
  font-size: 28px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--ink);
  line-height: 1.15;
  margin: 0;
}
.body-text {
  font-size: 15px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin: 0;
  max-width: 480px;
}

.h-divider {
  height: 1px;
  background: repeating-linear-gradient(
    to right,
    #d0c9bf 0px,
    #d0c9bf 5px,
    transparent 5px,
    transparent 11px
  );
  margin-top: auto;
}
.price-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}
.price-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mute);
}
.price {
  font-size: 36px;
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--ink);
  line-height: 1;
}

.v-divider {
  background: repeating-linear-gradient(
    to bottom,
    #d0c9bf 0px,
    #d0c9bf 5px,
    transparent 5px,
    transparent 11px
  );
  margin: 24px 0;
}

.badge {
  display: inline-flex;
  align-self: flex-start;
  border: 1.5px solid var(--accent);
  color: var(--accent);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 5px 10px;
  border-radius: 6px;
}
.trust-text {
  font-size: 16px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.45;
  margin: 0;
}
.accent {
  color: var(--accent);
}

.cta-btn {
  appearance: none;
  border: 0;
  background: var(--accent);
  color: #ffffff;
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  padding: 16px 24px;
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
.cta-btn svg {
  width: 16px;
  height: 16px;
}
.cta-btn:hover {
  background: var(--accent-hover);
}

.guarantee {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mute);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin: 0;
}
.green-dot {
  color: #4a8a5e;
  font-size: 8px;
}

@media (max-width: 900px) {
  .banner {
    grid-template-columns: 1fr;
  }
  .v-divider {
    height: 1px;
    width: auto;
    background: repeating-linear-gradient(
      to right,
      #d0c9bf 0px,
      #d0c9bf 5px,
      transparent 5px,
      transparent 11px
    );
    margin: 0 40px;
  }
  .panel-left,
  .panel-right {
    padding: 28px 28px;
  }
  .headline {
    font-size: 24px;
  }
}
</style>
