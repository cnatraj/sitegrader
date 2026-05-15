<script setup>
defineProps({
  business: { type: Object, required: true }
})
</script>

<template>
  <div class="row">
    <div class="site-pill">
      <span class="icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path d="M2 7 L8 2 L14 7 V13 H10 V9 H6 V13 H2 Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
        </svg>
      </span>
      <span class="name">{{ business.name }}</span>
      <span class="url">{{ business.url }} <span class="ext" aria-hidden="true">↗</span></span>
    </div>

    <div class="actions">
      <button type="button" class="btn btn-outline">
        <svg viewBox="0 0 16 16" fill="none" class="btn-icon" aria-hidden="true">
          <path d="M8 2 V11 M4.5 7.5 L8 11 L11.5 7.5 M3 13 H13" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        PDF
      </button>
      <button type="button" class="btn btn-outline">
        <svg viewBox="0 0 16 16" fill="none" class="btn-icon" aria-hidden="true">
          <rect x="3.5" y="7" width="9" height="6.5" rx="1.4" stroke="currentColor" stroke-width="1.4" />
          <path d="M5.5 7 V5 a2.5 2.5 0 0 1 5 0 V7" stroke="currentColor" stroke-width="1.4" />
        </svg>
        Share
      </button>
      <button type="button" class="btn btn-primary">
        <svg viewBox="0 0 16 16" fill="currentColor" class="btn-icon" aria-hidden="true">
          <path d="M8 1.6 L9.85 5.6 L14.2 6.15 L11 9.05 L11.85 13.3 L8 11.15 L4.15 13.3 L5 9.05 L1.8 6.15 L6.15 5.6 Z" />
        </svg>
        Fix in 35 sec
      </button>
    </div>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}
.site-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #FFFFFF;
  border-radius: 999px;
  padding: 8px 20px 8px 8px;
}
.icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--accent-tint);
  color: var(--accent);
  display: inline-grid;
  place-items: center;
}
.icon svg {
  width: 16px;
  height: 16px;
}
.name {
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
}
.url {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 13px;
  color: var(--ink-mute);
}
.url .ext {
  margin-left: 2px;
}

.actions {
  display: inline-flex;
  align-items: center;
  gap: 10px;
}
.btn {
  appearance: none;
  border: 0;
  background: transparent;
  font: inherit;
  font-size: 14px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease;
}
.btn-icon {
  width: 14px;
  height: 14px;
}
.btn-outline {
  background: #FFFFFF;
  border: 1px solid var(--hairline);
  color: var(--ink);
}
.btn-outline:hover {
  border-color: var(--hairline-strong);
}
.btn-primary {
  background: var(--accent);
  color: #FFFFFF;
  padding: 11px 22px;
}
.btn-primary:hover {
  background: var(--accent-hover);
}

@media (max-width: 720px) {
  .row {
    flex-direction: column;
    align-items: stretch;
  }
  .actions {
    justify-content: flex-end;
    flex-wrap: wrap;
  }
}
</style>
