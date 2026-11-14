<script setup>
defineProps({
  top: { type: String, default: '#7cb342' },
  side: { type: String, default: '#8b5a2b' },
  size: { type: Number, default: 120 },
})
</script>

<template>
  <div class="mc-cube" :style="{ '--s': size + 'px', '--top': top, '--side': side }">
    <div class="face face-top"></div>
    <div class="face face-left"></div>
    <div class="face face-right"></div>
  </div>
</template>

<style scoped>
.mc-cube {
  position: relative;
  width: var(--s);
  height: calc(var(--s) * 1.1547);
  flex: none;
}

.face {
  position: absolute;
  inset: 0;
  background-image: var(--noise);
  background-size: 32px 32px;
  background-blend-mode: overlay;
}

.face-top {
  background-color: var(--top);
  clip-path: polygon(50% 0%, 100% 25%, 50% 50%, 0% 25%);
  filter: brightness(1.14);
}

.face-left {
  background-color: var(--side);
  background-image:
    var(--noise),
    linear-gradient(180deg, var(--top) 0 12%, var(--side) 12% 100%);
  background-blend-mode: overlay, normal;
  clip-path: polygon(0% 25%, 50% 50%, 50% 100%, 0% 75%);
  filter: brightness(0.76);
}

.face-right {
  background-color: var(--side);
  background-image:
    var(--noise),
    linear-gradient(180deg, var(--top) 0 12%, var(--side) 12% 100%);
  background-blend-mode: overlay, normal;
  clip-path: polygon(50% 50%, 100% 25%, 100% 75%, 50% 100%);
  filter: brightness(0.95);
}
</style>
