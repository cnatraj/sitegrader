<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../../convex/_generated/api'
import { useConvexMutation } from '../composables/useConvex.js'
import { useGtag } from '../composables/useGtag.js'
import { useAppConfig } from '../composables/useAppConfig.js'

const { gtag } = useGtag()
gtag('event', 'page_view', { page_title: 'Full Report' })

const { pricing } = useAppConfig()
const router = useRouter()
const route = useRoute()
const email = ref('')
const submitted = ref(false)

const captureLead = useConvexMutation(api.leads.capture)

async function submit() {
  if (!email.value) return
  await captureLead({
    email: email.value,
    reportId: route.query.r || undefined,
  })
  submitted.value = true
}
</script>

<template>
  <div class="page">
    <header class="page-header">
      <RouterLink class="wordmark" to="/" aria-label="HVAC Grader home">
        <span class="mark" aria-hidden="true"></span>
        <span class="name">HVAC Grader</span>
      </RouterLink>
      <button class="back-btn" @click="router.back()">
        <svg
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          class="back-icon"
        >
          <path
            d="M10 12L6 8l4-4"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Back to Report
      </button>
    </header>

    <main class="main">
      <div class="content">
        <div class="badge">
          <span class="badge-dot" aria-hidden="true"></span>
          Almost Ready
        </div>

        <h1 class="headline">
          You're ahead of <span class="accent">90%</span> of<br />HVAC websites
          already.
        </h1>

        <p class="sub">The full report is almost ready.</p>

        <p class="body-text">
          We're putting the finishing touches on the complete audit.
        </p>

        <p class="body-text">
          Drop your email below and you'll be the first to know when it
          launches. We'll also lock in your introductory
          <span class="price-tag">{{ pricing.fullReport }}</span> price.
        </p>

        <div v-if="submitted" class="success">
          <span class="green-dot" aria-hidden="true">●</span>
          You're on the list. We'll email you when it's ready.
        </div>

        <form v-else class="form" @submit.prevent="submit">
          <div class="input-row">
            <div class="input-wrap">
              <svg
                class="input-icon"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="1.5"
                  y="3.5"
                  width="13"
                  height="9"
                  rx="1.5"
                  stroke="currentColor"
                  stroke-width="1.3"
                />
                <path
                  d="M1.5 5.5l6.5 4.5 6.5-4.5"
                  stroke="currentColor"
                  stroke-width="1.3"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                v-model="email"
                type="email"
                placeholder="Your email address"
                required
                autocomplete="email"
              />
            </div>
            <button type="submit" class="submit-btn">Lock my Price →</button>
          </div>
        </form>

        <p class="no-spam">
          <span class="green-dot" aria-hidden="true">●</span>
          No spam. One email when it's ready. That's it.
        </p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  background: var(--bg);
  display: flex;
  flex-direction: column;
}

/* Header */
.page-header {
  background: var(--bg);
  border-bottom: 1px solid var(--hairline);
  padding: 22px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--ink);
  user-select: none;
}
.mark {
  width: 22px;
  height: 22px;
  position: relative;
  display: inline-block;
}
.mark::before,
.mark::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.75px solid var(--ink);
}
.mark::after {
  transform: scale(0.42);
  background: var(--accent);
  border-color: var(--accent);
}
.name {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -0.005em;
}
.back-btn {
  appearance: none;
  border: 0;
  background: transparent;
  font: inherit;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mute);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0;
  transition: color 0.15s ease;
}
.back-btn:hover {
  color: var(--ink);
}
.back-icon {
  width: 14px;
  height: 14px;
}

/* Main content */
.main {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}
.content {
  width: 100%;
  max-width: 660px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  border: 1.5px solid var(--hairline-strong);
  border-radius: 999px;
  padding: 6px 16px 6px 10px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mute);
  align-self: flex-start;
}
.badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}

/* Headline */
.headline {
  font-size: clamp(38px, 5vw, 58px);
  font-weight: 500;
  letter-spacing: -0.03em;
  color: var(--ink);
  line-height: 1.05;
  margin: 0;
}
.accent {
  color: var(--accent);
}

/* Body */
.sub {
  font-size: 17px;
  color: var(--ink);
  margin: 0;
}
.body-text {
  font-size: 16px;
  color: var(--ink-soft);
  line-height: 1.6;
  margin: 0;
}
.price-tag {
  display: inline-block;
  border: 1.5px solid var(--hairline-strong);
  border-radius: 6px;
  padding: 1px 7px;
  font-weight: 500;
  color: var(--ink);
  background: var(--surface);
  font-size: 15px;
}

/* Form */
.form {
  margin-top: 4px;
}
.input-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.input-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 1.5px solid var(--hairline);
  border-radius: 999px;
  padding: 0 20px;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}
.input-wrap:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.1);
}
.input-icon {
  width: 16px;
  height: 16px;
  color: var(--ink-mute);
  flex-shrink: 0;
}
.input-wrap input {
  flex: 1;
  border: 0;
  background: transparent;
  outline: none;
  font: inherit;
  font-size: 16px;
  color: var(--ink);
  padding: 18px 0;
  min-width: 0;
}
.input-wrap input::placeholder {
  color: var(--ink-mute);
}
.submit-btn {
  appearance: none;
  border: 0;
  background: var(--accent);
  color: #ffffff;
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  padding: 18px 28px;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.15s ease;
  flex-shrink: 0;
}
.submit-btn:hover {
  background: var(--accent-hover);
}

/* Footer text */
.no-spam {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-mute);
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
}
.green-dot {
  color: #4a8a5e;
  font-size: 8px;
}

/* Success state */
.success {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: var(--ink-soft);
  padding: 20px 0;
}

@media (max-width: 640px) {
  .page-header {
    padding: 18px 20px;
  }
  .main {
    align-items: flex-start;
    justify-content: flex-start;
    padding: 48px 20px;
  }
  .input-row {
    flex-direction: column;
    align-items: stretch;
  }
  .submit-btn {
    text-align: center;
  }
}
</style>
