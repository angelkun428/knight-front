// 点击音效播放工具
// 使用对象池复用 Audio 实例，支持快速连续点击（重新从头播放）

const CLICK_SOUND_URL = '/audio/click_med.mp3'
const POOL_SIZE = 4
const VOLUME = 0.5

const pool = []

function getAudio() {
  for (const a of pool) {
    if (a.paused || a.ended) return a
  }
  if (pool.length < POOL_SIZE) {
    const a = new Audio(CLICK_SOUND_URL)
    a.preload = 'auto'
    pool.push(a)
    return a
  }
  const a = pool[0]
  a.currentTime = 0
  return a
}

export function playClickSound() {
  try {
    const audio = getAudio()
    audio.currentTime = 0
    audio.volume = VOLUME
    const p = audio.play()
    if (p && typeof p.catch === 'function') {
      p.catch(() => {})
    }
  } catch {
    // 静默失败，不影响交互
  }
}
