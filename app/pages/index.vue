<script setup>
import { ref } from 'vue'
import { api } from '../../convex/_generated/api'

const { gtag } = useGtag()
gtag('event', 'page_view', { page_title: 'Home' })

const query = ref('')
const inputEl = ref(null)
const submitting = ref(false)

const createReport = useConvexMutation(api.reports.create)

const suggestions = [
  { label: 'Is my site ranking on Google?', icon: 'search' },
  { label: "What's broken on my site?", icon: 'warning' },
  { label: 'Am I losing leads online?', icon: 'phone' }
]

function applySuggestion(label) {
  query.value = label
  inputEl.value?.focus()
}

async function onSubmit() {
  if (!query.value || submitting.value) return
  submitting.value = true
  try {
    const reportId = await createReport({ url: query.value })
    await navigateTo(`/processing/${reportId}`)
  } catch (err) {
    submitting.value = false
    console.error('[index] failed to create report', err)
  }
}
</script>

<template>
  <main class="stage">
    <NuxtLink class="wordmark" to="/" aria-label="HVAC Grader home">
      <span class="mark" aria-hidden="true"></span>
      <span class="name">HVAC Grader</span>
    </NuxtLink>

    <div class="panel" data-screen-label="01 Landing">
      <h1 class="headline">Enter your website URL to see your online health score</h1>
      <p class="sub">Find out if your website is winning or losing customers — free, in seconds.</p>

      <form class="search" role="search" @submit.prevent="onSubmit">
        <input
          ref="inputEl"
          v-model="query"
          type="url"
          name="url"
          inputmode="url"
          autocomplete="url"
          autocapitalize="none"
          spellcheck="false"
          placeholder="https://your-hvac-site.com"
          aria-label="Your HVAC website URL"
        />
        <button class="submit" type="submit" aria-label="Run the grader">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M10 4 L10 16 M10 4 L5 9 M10 4 L15 9"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </form>

      <div class="chips" role="group" aria-label="Suggested questions">
        <button
          v-for="s in suggestions"
          :key="s.label"
          type="button"
          class="chip"
          @click="applySuggestion(s.label)"
        >
          <span class="ic" aria-hidden="true">
            <svg v-if="s.icon === 'search'" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.4" />
              <path d="M10.4 10.4 L13.5 13.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
            </svg>
            <svg v-else-if="s.icon === 'warning'" viewBox="0 0 16 16" fill="none">
              <path d="M8 2 L14.5 13.5 L1.5 13.5 Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
              <path d="M8 6.5 V9.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
              <circle cx="8" cy="11.5" r="0.7" fill="currentColor" />
            </svg>
            <svg v-else-if="s.icon === 'phone'" viewBox="0 0 16 16" fill="none">
              <path
                d="M3.2 3.2 C3.2 2.5 3.7 2 4.4 2 H5.6 C6.1 2 6.5 2.3 6.7 2.8 L7.3 4.4 C7.5 4.9 7.3 5.5 6.9 5.8 L6.1 6.4 C6.7 7.7 7.8 8.8 9.1 9.4 L9.7 8.6 C10 8.2 10.6 8 11.1 8.2 L12.7 8.8 C13.2 9 13.5 9.4 13.5 9.9 V11.1 C13.5 11.8 13 12.3 12.3 12.3 C7.3 12.3 3.2 8.2 3.2 3.2 Z"
                stroke="currentColor"
                stroke-width="1.4"
                stroke-linejoin="round"
              />
            </svg>
          </span>
          {{ s.label }}
        </button>
      </div>

      <p class="micro"><span></span>No signup · Report in ~20 seconds</p>
    </div>
  </main>
</template>

<style scoped>
.wordmark {
  position: absolute;
  top: 28px;
  left: 32px;
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
</style>
