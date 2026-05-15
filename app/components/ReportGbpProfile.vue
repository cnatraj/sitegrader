<script setup>
defineProps({
  profile: { type: Object, required: true } // { name, rating, reviewCount }
})
</script>

<template>
  <div class="gbp-group">
    <h3 class="group-title">Google Business Profile</h3>
    <div class="gbp-row">
      <span class="gbp-avatar" aria-hidden="true">G</span>
      <div class="gbp-text">
        <div class="gbp-name">{{ profile.name }}</div>
        <div class="gbp-meta">
          {{ profile.rating }} <span class="star" aria-hidden="true">★</span> {{ profile.reviewCount }} reviews
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gbp-group {
  margin-bottom: 22px;
}
.group-title {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ink-mute);
  margin: 0 0 14px;
  font-weight: 500;
}
.gbp-row {
  display: flex;
  align-items: center;
  gap: 14px;
}
.gbp-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--accent-tint);
  color: var(--accent);
  display: inline-grid;
  place-items: center;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 15px;
  font-weight: 500;
}
.gbp-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--ink);
  line-height: 1.2;
}
.gbp-meta {
  font-size: 13px;
  color: var(--ink-soft);
  margin-top: 3px;
}
.gbp-meta .star {
  color: var(--status-amber);
}
</style>
