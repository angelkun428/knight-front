import { createApp } from 'vue'
import App from './App.vue'
import './styles/global.css'
import { playClickSound } from './utils/sound'


const CLICK_SELECTOR = 'button, a, [role="button"], .modal-backdrop'
document.addEventListener(
  'click',
  (e) => {
    if (e.target.closest(CLICK_SELECTOR)) {
      playClickSound()
    }
  },
  true
)

createApp(App).mount('#app')
