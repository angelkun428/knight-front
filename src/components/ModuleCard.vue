<script setup>
import McCube from './McCube.vue'

defineProps({
  index: { type: String, default: '01' },
  title: { type: String, default: '模块标题' },
  en: { type: String, default: 'MODULE' },
  top: { type: String, default: '#7cb342' },
  side: { type: String, default: '#8b5a2b' },
  note: { type: String, default: '已生成' },
})
</script>

<template>
  <section class="module tex-noise">
    <header class="module-head">
      <McCube :size="32" :top="top" :side="side" />
      <div class="head-text">
        <h2>{{ title }}</h2>
        <span class="en pixel">{{ en }}</span>
      </div>
      <span class="note">{{ note }}</span>
      <span class="index pixel">{{ index }}</span>
    </header>

    <div class="module-body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.module {
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-height: 300px;
  padding: 18px;
  background: var(--stone-600);
  box-shadow:
    inset -4px -4px 0 rgba(0, 0, 0, 0.4),
    inset 4px 4px 0 rgba(255, 255, 255, 0.1),
    0 0 0 4px var(--ink),
    0 10px 0 rgba(0, 0, 0, 0.35);
  transition: transform 0.16s steps(2);
}

.module:hover {
  transform: translateY(-4px);
}

.module-head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.head-text {
  min-width: 0;
}

.head-text h2 {
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: #f3f0e2;
}

.head-text .en {
  display: block;
  margin-top: 2px;
  font-size: 8px;
  color: #9c9c9c;
}

.note {
  margin-left: auto;
  padding: 3px 8px;
  font-size: 11px;
  color: #d8d3c3;
  background: #2e2e2e;
  box-shadow: inset 0 0 0 2px #4a4a4a;
  white-space: nowrap;
}

.index {
  font-size: 18px;
  color: #6d6d6d;
}

.module-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 18px;
  background: #202020;
  box-shadow:
    inset 3px 3px 0 rgba(0, 0, 0, 0.5),
    inset -3px -3px 0 rgba(255, 255, 255, 0.06);
}

@media (max-width: 720px) {
  .note {
    display: none;
  }
}
</style>
