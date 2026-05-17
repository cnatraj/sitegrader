<script setup>
defineProps({
  business: { type: Object, required: true },
});
</script>

<template>
  <div class="wrapper">
    <div class="site-pill">
      <span class="icon" aria-hidden="true">
        <svg viewBox="0 0 16 16" fill="none">
          <path
            d="M2 7 L8 2 L14 7 V13 H10 V9 H6 V13 H2 Z"
            stroke="currentColor"
            stroke-width="1.4"
            stroke-linejoin="round"
          />
        </svg>
      </span>
      <div class="pill-text">
        <span class="name">{{ business.name }}</span>
        <span class="url"
          >{{ business.url }}
          <span class="ext" aria-hidden="true">↗</span></span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}
.wrapper > * {
  flex: 0 0 50%;
}
.site-pill {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: #ffffff;
  border-radius: 999px;
  padding: 8px 20px 8px 8px;
}
.icon {
  width: 32px;
  height: 32px;
  flex: 0 0 32px;
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
.pill-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.name {
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.2;
}
.url {
  font-family: "JetBrains Mono", ui-monospace, monospace;
  font-size: 12px;
  color: var(--ink-mute);
  line-height: 1.2;
}
.url .ext {
  margin-left: 2px;
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
  transition: background 0.15s ease;
}
.btn-icon {
  width: 14px;
  height: 14px;
}
.btn-primary {
  background: var(--accent);
  color: #ffffff;
  padding: 11px 22px;
}
.btn-primary:hover {
  background: var(--accent-hover);
}

@media (max-width: 640px) {
  .wrapper {
    flex-direction: column;
    align-items: flex-start;
  }
  .wrapper > * {
    flex: none;
  }
}
</style>
