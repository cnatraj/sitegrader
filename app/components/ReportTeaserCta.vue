<script setup>
import { useRouter } from 'vue-router'
import { useAppConfig } from '../composables/useAppConfig.js'

defineProps({
  fixCount: { type: Number, default: 0 }
})
const { pricing } = useAppConfig()
const router = useRouter()
</script>

<template>
  <div class="teaser">
    <div class="teaser-left">
      <span class="teaser-label">Want the full fix list?</span>
      <span class="teaser-sub">{{ fixCount }} issues · personalized action plan · takes 35 sec</span>
    </div>
    <button type="button" class="teaser-btn" @click="router.push('/fullReport')">
      Get Full Report — {{ pricing.fullReport }}
      <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.teaser {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  background: #FFFFFF;
  border-radius: 14px;
  padding: 20px 28px;
  margin-bottom: 16px;
}
.teaser-left {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.teaser-label {
  font-size: 17px;
  font-weight: 500;
  color: var(--ink);
}
.teaser-sub {
  font-size: 13px;
  color: var(--ink-soft);
}
.teaser-btn {
  appearance: none;
  border: 0;
  background: var(--accent);
  color: #FFFFFF;
  font: inherit;
  font-size: 15px;
  font-weight: 500;
  padding: 12px 22px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;
  flex-shrink: 0;
}
.teaser-btn svg {
  width: 16px;
  height: 16px;
}
.teaser-btn:hover {
  background: var(--accent-hover);
}

@media (max-width: 640px) {
  .teaser {
    flex-direction: column;
    align-items: flex-start;
    padding: 18px 20px;
  }
  .teaser-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
