<script setup>
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  project: { type: Object, default: null },
})

const emit = defineEmits(['close'])
const closeButton = ref(null)
let previousOverflow = ''

watch(
  () => props.project,
  async (project) => {
    if (project) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      await nextTick()
      closeButton.value?.focus()
    } else {
      document.body.style.overflow = previousOverflow
    }
  },
)

function onKeydown(event) {
  if (event.key === 'Escape' && props.project) emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.style.overflow = previousOverflow
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="project" class="modal-backdrop" @click.self="emit('close')">
        <section
          class="project-modal tex-noise"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-modal-title"
        >
          <button ref="closeButton" class="modal-close" aria-label="关闭项目详情" @click="emit('close')">
            ×
          </button>

          <header class="modal-head">
            <div class="modal-icon mc-slot">
              <img :src="project.icon" alt="" width="72" height="72" />
            </div>
            <div class="modal-heading">
              <p class="modal-kicker pixel">{{ project.categoryLabel }} · {{ project.period }}</p>
              <h2 id="project-modal-title">{{ project.title }}</h2>
              <p>{{ project.subtitle }}</p>
            </div>
          </header>

          <div class="modal-tags" aria-label="项目技术栈">
            <span v-for="item in project.tech" :key="item">{{ item }}</span>
          </div>

          <div class="modal-section">
            <h3><span class="section-mark"></span>实践内容</h3>
            <ul class="modal-highlights">
              <li v-for="item in project.highlights" :key="item">{{ item }}</li>
            </ul>
          </div>

          <div class="modal-result">
            <span class="pixel">RESULT</span>
            <p>{{ project.outcome }}</p>
          </div>

          <footer class="modal-footer">
            <span class="pixel">ROLE · {{ project.role }}</span>
            <button class="mc-btn" @click="emit('close')">关闭档案</button>
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  padding: 24px;
  background: rgba(5, 8, 6, 0.82);
  backdrop-filter: blur(5px);
}

.project-modal {
  position: relative;
  width: min(720px, 100%);
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  padding: 28px;
  background: #343434;
  box-shadow:
    inset -5px -5px 0 rgba(0, 0, 0, 0.38),
    inset 5px 5px 0 rgba(255, 255, 255, 0.12),
    0 0 0 5px #0c0c0c,
    12px 12px 0 rgba(0, 0, 0, 0.4);
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 0;
  background: #222;
  color: #d8d3c3;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
  box-shadow: inset 0 0 0 2px #555;
}

.modal-close:hover {
  background: #8b3d32;
  color: #fff;
}

.modal-close:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 3px;
}

.modal-head {
  display: flex;
  align-items: center;
  gap: 20px;
  padding-right: 40px;
}

.modal-icon {
  flex: none;
  width: 104px;
  height: 104px;
  display: grid;
  place-items: center;
}

.modal-icon img {
  width: 72px;
  height: 72px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(5px 5px 0 rgba(0, 0, 0, 0.35));
}

.modal-kicker {
  font-size: 8px;
  color: #a5e077;
}

.modal-heading h2 {
  margin-top: 8px;
  font-size: 26px;
  line-height: 1.35;
  color: #f4f1e1;
}

.modal-heading > p:last-child {
  margin-top: 5px;
  font-size: 14px;
  color: #aaa495;
}

.modal-tags {
  margin-top: 22px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.modal-tags span {
  padding: 4px 10px;
  background: #202020;
  color: #a6d96c;
  font-size: 12px;
  box-shadow: inset 0 0 0 2px #485c37;
}

.modal-section {
  margin-top: 24px;
  padding: 18px;
  background: #202020;
  box-shadow:
    inset 3px 3px 0 rgba(0, 0, 0, 0.5),
    inset -3px -3px 0 rgba(255, 255, 255, 0.06);
}

.modal-section h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #ece8d9;
}

.section-mark {
  width: 8px;
  height: 8px;
  background: var(--grass-500);
  box-shadow: 3px 3px 0 #284d19;
}

.modal-highlights {
  margin-top: 12px;
  display: grid;
  gap: 10px;
}

.modal-highlights li {
  position: relative;
  padding-left: 18px;
  color: #c5c0b1;
  font-size: 14px;
  line-height: 1.8;
}

.modal-highlights li::before {
  content: '';
  position: absolute;
  top: 0.72em;
  left: 0;
  width: 6px;
  height: 6px;
  background: #6f8f51;
}

.modal-result {
  margin-top: 16px;
  padding: 14px 18px;
  border-left: 5px solid var(--gold);
  background: rgba(255, 213, 74, 0.07);
}

.modal-result .pixel {
  font-size: 8px;
  color: var(--gold);
}

.modal-result p {
  margin-top: 4px;
  color: #ded8c5;
  font-size: 14px;
}

.modal-footer {
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.modal-footer > .pixel {
  max-width: 60%;
  font-size: 8px;
  color: #8f8a7b;
}

.modal-footer .mc-btn {
  padding: 10px 18px;
  font-size: 13px;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .project-modal,
.modal-leave-active .project-modal {
  transition: transform 0.24s steps(4), opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .project-modal,
.modal-leave-to .project-modal {
  opacity: 0;
  transform: translateY(24px) scale(0.96);
}

@media (max-width: 600px) {
  .modal-backdrop {
    padding: 12px;
  }

  .project-modal {
    max-height: calc(100vh - 24px);
    padding: 20px;
  }

  .modal-head {
    align-items: flex-start;
    gap: 14px;
    padding-right: 28px;
  }

  .modal-icon {
    width: 72px;
    height: 72px;
  }

  .modal-icon img {
    width: 52px;
    height: 52px;
  }

  .modal-heading h2 {
    font-size: 20px;
  }

  .modal-kicker {
    font-size: 7px;
  }

  .modal-footer {
    align-items: flex-start;
    flex-direction: column;
  }

  .modal-footer > .pixel {
    max-width: 100%;
  }
}
</style>
