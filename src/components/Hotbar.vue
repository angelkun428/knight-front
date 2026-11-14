<script setup>
defineProps({
  active: { type: String, default: 'home' },
})

const emit = defineEmits(['select'])

const slots = [
  { id: 'home', label: '首页', icon: '/images/oak-log.png' },
  { id: 'profile', label: '关于我', icon: '/images/apple.png' },
  { id: 'skills', label: '擅长领域', icon: '/images/emerald.png' },
  { id: 'works', label: '我的成果', icon: '/images/chest.png' },
]
</script>

<template>
  <nav class="hotbar-wrap" aria-label="快捷导航">
    <div class="hotbar">
      <button
        v-for="(slot, i) in slots"
        :key="i"
        class="slot"
        :class="{ active: slot.id === active }"
        :data-label="slot.label"
        :aria-label="slot.id ? `前往${slot.label}` : slot.label"
        :disabled="!slot.id"
        @click="slot.id && emit('select', slot.id)"
      >
        <span class="num pixel">{{ i + 1 }}</span>
        <img v-if="slot.icon" :src="slot.icon" alt="" width="32" height="32" />
      </button>
    </div>
  </nav>
</template>

<style scoped>
.hotbar-wrap {
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  z-index: 70;
}

.hotbar {
  display: flex;
  gap: 4px;
  padding: 4px;
  background: #232323;
  box-shadow:
    0 0 0 3px #0d0d0d,
    0 6px 0 rgba(0, 0, 0, 0.4);
}

.slot {
  position: relative;
  width: 48px;
  height: 48px;
  padding: 0;
  border: 0;
  display: grid;
  place-items: center;
  background: #1a1a1a;
  color: inherit;
  box-shadow:
    inset 3px 3px 0 rgba(0, 0, 0, 0.6),
    inset -3px -3px 0 rgba(255, 255, 255, 0.09);
  cursor: pointer;
}

.slot:disabled {
  cursor: default;
}

.slot img {
  width: 32px;
  height: 32px;
  object-fit: contain;
  image-rendering: pixelated;
  transition: transform 0.14s steps(2);
}

.slot:not(:disabled):hover img,
.slot.active img {
  transform: translateY(-4px) scale(1.08);
}

.slot.active {
  box-shadow:
    inset 0 0 0 3px #efefef,
    inset 3px 3px 0 rgba(0, 0, 0, 0.5);
}

.num {
  position: absolute;
  top: 2px;
  left: 4px;
  z-index: 1;
  font-size: 7px;
  color: #b0b0b0;
  text-shadow: 1px 1px 0 #000;
}

.slot::after {
  content: attr(data-label);
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 5px 8px;
  font-size: 12px;
  white-space: nowrap;
  color: #f4f1e1;
  background: #121212;
  box-shadow: 0 0 0 2px #4a4a4a;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.12s, transform 0.12s;
}

.slot:hover::after,
.slot:focus-visible::after {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

.slot:focus-visible {
  outline: 2px solid var(--gold);
  outline-offset: 3px;
}

@media (max-width: 760px) {
  .hotbar-wrap {
    bottom: 10px;
    transform: translateX(-50%) scale(0.78);
  }
}

@media (max-width: 400px) {
  .hotbar-wrap {
    transform: translateX(-50%) scale(0.64);
  }
}
</style>
