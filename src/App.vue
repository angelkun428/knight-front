<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import McCube from './components/McCube.vue'
import ModuleCard from './components/ModuleCard.vue'
import Hotbar from './components/Hotbar.vue'
import ProjectModal from './components/ProjectModal.vue'

const nav = [
  { id: 'home', label: '首页' },
  { id: 'profile', label: '关于我' },
  { id: 'skills', label: '擅长领域' },
  { id: 'works', label: '我的成果' },
]

const intentRoles = ['前端开发', 'Java 后端', 'Python 开发', 'AIGC 应用', '软件测试']

const skills = [
  {
    name: 'Vue',
    category: '前端开发',
    icon: '/images/emerald.png',
    description: '课程项目中使用 Vue 完成组件化页面布局、数据展示与基础交互，能够独立开发普通业务页面。',
  },
  {
    name: 'Element Plus',
    category: '组件库',
    icon: '/images/diamond.png',
    description: '熟练使用 Element Plus 组件库提升开发效率，结合 Vue 完成数据展示、页面交互和样式修改。',
  },
  {
    name: 'Java',
    category: '后端开发',
    icon: '/images/iron-ingot.png',
    description: '能够编写 Java 业务代码，具备 JavaEE 与面向对象基础，参与过多项校内 Java 全栈项目。',
  },
  {
    name: 'Spring Boot',
    category: '后端框架',
    icon: '/images/furnace.png',
    description: '使用 Spring Boot 开发业务接口，处理参数校验、异常与业务逻辑，并配合前端完成接口联调。',
  },
  {
    name: 'Python',
    category: '数据处理',
    icon: '/images/pickaxe.png',
    description: '会编写简单的数据处理脚本，在数学建模竞赛中完成脏数据处理、统计计算与模型仿真。',
  },
  {
    name: 'MySQL',
    category: '数据库',
    icon: '/images/chest.png',
    description: '熟悉 MySQL，能够编写常用 SQL 语句，完成建表及增删改查，为项目提供业务数据存储。',
  },
  {
    name: 'HarmonyOS',
    category: 'ArkTS / ArkUI',
    icon: '/images/bell.png',
    description: '毕业设计中使用 ArkTS、ArkUI 开发鸿蒙端页面与交互，完成资源化信息匹配系统。',
  },
  {
    name: 'AIGC',
    category: '提示词与内容校验',
    icon: '/images/golden-apple.png',
    description: '参与蓝桥杯 AIGC 专项赛，实践提示词编写调试、生成内容筛选校验与人工二次调整。',
  },
  {
    name: '软件测试',
    category: '手动测试',
    icon: '/images/crafting-table.png',
    description: '具备基础手动测试思路，能复现问题、记录 Bug，并在开发后主动验证完整业务流程。',
  },
]

const projects = [
  {
    id: 'harmony-os',
    category: 'dev',
    categoryLabel: '毕业设计',
    period: '2025.09 — 2026.06',
    icon: '/images/bell.png',
    title: '资源化信息匹配系统',
    subtitle: '鸿蒙 HarmonyOS 前后端分离项目',
    summary: '独立完成需求梳理、鸿蒙端页面、后端接口、数据存储与业务流程自测。',
    tech: ['ArkTS', 'ArkUI', 'Spring Boot', 'MySQL'],
    role: '独立开发',
    highlights: [
      '梳理基础需求，独立完成各业务模块的编码实现。',
      '使用 ArkTS、ArkUI 构建鸿蒙端页面与交互，使用 Spring Boot 实现后端业务接口。',
      '使用 MySQL 存储项目业务数据，反复走查业务流程，发现问题后持续修改完善。',
    ],
    outcome: '完整走完小型项目从需求分析、开发实现到功能自测的整套流程。',
  },
  {
    id: 'java-fullstack',
    category: 'dev',
    categoryLabel: '课程实训',
    period: '在校期间',
    icon: '/images/furnace.png',
    title: 'Java 全栈课程项目',
    subtitle: '多项校内全栈开发实践',
    summary: '完成后端接口、数据库操作、接口文档与前后端联调，并主动进行功能自测。',
    tech: ['Java', 'Spring Boot', 'MySQL', '接口联调'],
    role: '后端开发 / 联调',
    highlights: [
      '使用 Spring Boot 编写后端接口，处理参数校验和异常。',
      '编写 SQL 操作 MySQL 数据库，完成业务数据的增删改查。',
      '整理简易接口说明，与前端同学对接调试，复现并解决传参错误、返回格式不符等问题。',
      '功能完成后手动跑通业务流程，进行基础自测，保障基础流程正常运行。',
    ],
    outcome: '完成多项校内 Java 全栈项目，积累接口开发、数据库操作和团队协作经验。',
  },
  {
    id: 'vue-pages',
    category: 'dev',
    categoryLabel: '课程项目',
    period: '在校期间',
    icon: '/images/emerald.png',
    title: 'Vue 业务页面开发',
    subtitle: '组件化前端页面与接口数据展示',
    summary: '使用 Vue 与 Element Plus 完成页面布局、数据展示、基础交互和接口对接。',
    tech: ['Vue', 'Element Plus', 'HTML'],
    role: '前端开发',
    highlights: [
      '采用组件化方式完成页面布局、数据展示和基础交互。',
      '使用 Element Plus 提升开发效率，对接后端接口并处理页面状态。',
      '通过调试工具定位并解决页面显示异常、数据回显失败等常见问题。',
    ],
    outcome: '具备独立完成普通业务页面开发和样式修改的实践经验。',
  },
  {
    id: 'math-modeling',
    category: 'contest',
    categoryLabel: '学科竞赛',
    period: '2023.02 — 2024.02',
    icon: '/images/pickaxe.png',
    title: '全国大学生数学建模竞赛',
    subtitle: '模型搭建与 Python 数据处理',
    summary: '负责模型搭建和原始数据处理，与团队协作完成求解、论文、图表和结果核对。',
    tech: ['Python', '数据处理', '统计计算', '模型仿真'],
    role: '模型与数据',
    highlights: [
      '负责模型搭建与原始数据处理，使用 Python 清洗脏数据。',
      '完成统计计算、模型仿真与求解，持续排查异常数据和不符合预期的结果。',
      '与队友分工协作，共同完成论文撰写、图表整理和结果核对。',
    ],
    outcome: '获得 2024 年全国大学生数学建模竞赛奖项，锻炼了复杂问题拆解与团队协作能力。',
  },
  {
    id: 'aigc-contest',
    category: 'contest',
    categoryLabel: '团队参赛',
    period: '蓝桥杯专项赛',
    icon: '/images/golden-apple.png',
    title: 'AIGC 数字内容创意设计',
    subtitle: '蓝桥杯 AIGC 数字内容创意设计专项赛',
    summary: '全程参与创作构思、提示词调试、素材生成筛选，以及人工修改与整合。',
    tech: ['AIGC', '提示词调试', '内容审核', '二次创作'],
    role: '内容创作 / 校验',
    highlights: [
      '团队参与蓝桥杯 AIGC 专项赛，全程参与从创作思路到最终作品的过程。',
      '编写并反复调整提示词，生成、筛选图片和文字素材。',
      '对 AI 输出进行人工审核、手动修改与二次整合，不直接照搬生成结果。',
    ],
    outcome: '形成“AI 辅助 + 人工校验”的内容创作实践认知，理解人工审核与二次调整的重要性。',
  },
]

const honors = [
  { year: '2022', text: '北京邮电大学世纪学院校内二等奖学金' },
  { year: '2023', text: '北京邮电大学世纪学院校内三等奖学金' },
  { year: '2024', text: '全国大学生数学建模竞赛奖项' },
  { year: '2024', text: '北京邮电大学世纪学院校内三等奖学金' },
  { year: 'CERT', text: '华为云技术精髓入门级开发者认证' },
]

const projectFilters = [
  { id: 'all', label: '全部', count: 5 },
  { id: 'dev', label: '开发项目', count: 3 },
  { id: 'contest', label: '竞赛实践', count: 2 },
]

const active = ref('home')
const selectedSkill = ref(0)
const projectFilter = ref('all')
const selectedProject = ref(null)
const showHonors = ref(false)
const toast = ref('')

const currentSkill = computed(() => skills[selectedSkill.value])
const filteredProjects = computed(() =>
  projectFilter.value === 'all'
    ? projects
    : projects.filter((project) => project.category === projectFilter.value),
)

let sectionObserver = null
let revealObserver = null
let toastTimer = null
let projectTrigger = null

function go(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function showToast(message) {
  toast.value = message
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => {
    toast.value = ''
  }, 2200)
}

async function copyText(text, label) {
  try {
    if (!navigator.clipboard) throw new Error('Clipboard API unavailable')
    await navigator.clipboard.writeText(text)
    showToast(`${label}已复制到背包`)
  } catch {
    showToast(`复制失败，请手动复制${label}`)
  }
}

function openProject(project, event) {
  projectTrigger = event.currentTarget
  selectedProject.value = project
}

function closeProject() {
  selectedProject.value = null
  nextTick(() => projectTrigger?.focus())
}

onMounted(() => {
  sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) active.value = entry.target.id
      })
    },
    { rootMargin: '-45% 0px -50% 0px' },
  )
  nav.forEach((item) => {
    const el = document.getElementById(item.id)
    if (el) sectionObserver.observe(el)
  })

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08 },
  )
  document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el))
})

onUnmounted(() => {
  sectionObserver?.disconnect()
  revealObserver?.disconnect()
  clearTimeout(toastTimer)
})
</script>

<template>
  <div class="app">
    <header class="topbar">
      <div class="topbar-inner">
        <a class="brand" href="#home" @click.prevent="go('home')">
          <McCube :size="24" top="#7cb342" side="#8b5a2b" />
          <span class="brand-text">
            <strong>坤的世界</strong>
            <em class="pixel">KUN'S WORLD</em>
          </span>
        </a>

        <nav class="nav" aria-label="页面导航">
          <button
            v-for="item in nav"
            :key="item.id"
            class="nav-item"
            :class="{ active: active === item.id }"
            @click="go(item.id)"
          >
            {{ item.label }}
          </button>
        </nav>

        <div class="server">
          <span class="dot"></span>
          <span class="pixel">OPEN TO WORK</span>
        </div>
      </div>
    </header>

    <main>
      <section id="home" class="hero">
        <div class="sun" aria-hidden="true"></div>
        <div class="cloud cloud-a" aria-hidden="true"></div>
        <div class="cloud cloud-b" aria-hidden="true"></div>
        <div class="cloud cloud-c" aria-hidden="true"></div>

        <div class="hero-inner">
          <div class="hero-copy">
            <span class="badge pixel">SOFTWARE ENGINEERING · 2026</span>
            <h1 class="hero-title">坤的世界</h1>
            <p class="hero-en pixel">KUN · PORTFOLIO</p>
            <p class="hero-desc">
              软件工程应届生，聚焦 Vue 前端与 Java 后端，也做过鸿蒙、Python 数据处理与 AIGC 实践。欢迎进入我的世界，查看我的技能背包与项目成果。
            </p>
            <div class="hero-actions">
              <button class="mc-btn" @click="go('profile')">认识我</button>
              <button class="mc-btn ghost" @click="go('works')">查看成果</button>
            </div>
            <div class="hero-contact">
              <p class="hero-contact-title">想认识我？</p>
              <div class="hero-contact-links">
                <a
                  href="https://github.com/angelkun428"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="pixel">GITHUB</span>
                  <span>github.com/angelkun428</span>
                </a>
                <button type="button" @click="copyText('lmk171700145@163.com', '邮箱')">
                  <span class="pixel">MAIL</span>
                  <span>lmk171700145@163.com</span>
                </button>
                <button type="button" @click="copyText('15776964352', '电话')">
                  <span class="pixel">TEL</span>
                  <span>15776964352</span>
                </button>
              </div>
            </div>
            <ul class="hero-stats">
              <li><span class="pixel">MAJOR</span><strong>软件工程</strong></li>
              <li><span class="pixel">ROLE</span><strong>前端 / 后端</strong></li>
              <li><span class="pixel">STATUS</span><strong>开放求职</strong></li>
            </ul>
          </div>

          <div class="hero-art" aria-hidden="true">
            <div class="big-cube">
              <McCube :size="240" top="#7cb342" side="#8b5a2b" />
            </div>
            <img class="float-item c1" src="/images/diamond.png" alt="" />
            <img class="float-item c2" src="/images/golden-apple.png" alt="" />
            <img class="float-item c3" src="/images/emerald.png" alt="" />
          </div>
        </div>

        <div class="ground" aria-hidden="true"></div>
      </section>

      <section class="world">
        <div class="section-inner">
          <div class="world-head reveal">
            <p class="kicker pixel">WORLD INDEX</p>
            <h2 class="world-title">世界区块</h2>
            <p class="world-desc">角色、技能与项目数据已加载，点击物品即可查看详情。</p>
          </div>

          <div class="modules">
            <ModuleCard
              id="profile"
              class="span-7 reveal"
              index="01"
              title="个人基础信息"
              en="PLAYER PROFILE"
              top="#7cb342"
              side="#8b5a2b"
              note="角色已加载"
            >
              <div class="profile-main">
                <div class="identity">
                  <div class="name-line">
                    <h3>坤</h3>
                    <span class="level pixel">LV.22</span>
                  </div>
                  <p class="identity-role">软件工程 · 2026 届应届毕业生</p>
                  <div class="identity-tags">
                    <span>男</span>
                    <span>22 岁</span>
                    <span class="available">开放求职</span>
                  </div>
                </div>
              </div>

              <p class="profile-bio">
                做过 Java 后端、Vue 前端课程项目，也独立完成鸿蒙毕业设计。习惯开发后主动自测，遇到问题一步步拆解排查，重视团队协作与结果核对。
              </p>

              <div class="education-card">
                <div class="education-icon mc-slot">
                  <img src="/images/oak-log.png" alt="" />
                </div>
                <div>
                  <p class="education-time pixel">2022.07 — 2026.06</p>
                  <h3>北京邮电大学世纪学院</h3>
                  <p>软件工程专业 · 多次获得校级奖学金</p>
                </div>
              </div>
              <p class="courses">
                主修课程：Java、Python、MySQL、算法与数据结构、软件工程、HTML 网页开发等。
              </p>

              <div class="intent-block">
                <p class="block-label pixel">QUEST LOG · 求职意向</p>
                <div class="intent-tags">
                  <span v-for="role in intentRoles" :key="role">{{ role }}</span>
                </div>
              </div>

              <div class="contact-row">
                <button @click="copyText('15776964352', '电话')">
                  <span class="contact-label pixel">TEL</span>
                  <span>15776964352</span>
                  <span class="copy-icon" aria-hidden="true"></span>
                </button>
                <button @click="copyText('lmk171700145@163.com', '邮箱')">
                  <span class="contact-label pixel">MAIL</span>
                  <span>lmk171700145@163.com</span>
                  <span class="copy-icon" aria-hidden="true"></span>
                </button>
              </div>

              <div class="honors-block">
                <button
                  class="honors-toggle"
                  :aria-expanded="showHonors"
                  aria-controls="honors-list"
                  @click="showHonors = !showHonors"
                >
                  <span>
                    <img src="/images/golden-apple.png" alt="" />
                    成就与荣誉
                    <span class="honor-count pixel">5</span>
                  </span>
                  <span class="toggle-text">{{ showHonors ? '收起' : '展开' }} {{ showHonors ? '−' : '+' }}</span>
                </button>
                <div id="honors-list" class="honors-panel" :class="{ open: showHonors }">
                  <div class="honors-inner">
                    <ul>
                      <li v-for="honor in honors" :key="`${honor.year}-${honor.text}`">
                        <span class="pixel">{{ honor.year }}</span>
                        <p>{{ honor.text }}</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="xp-bar">
                <span class="xp-lv pixel">LV.22</span>
                <div class="xp-track"><div class="xp-fill"></div></div>
                <span class="xp-num pixel">KEEP LEARNING</span>
              </div>
            </ModuleCard>

            <ModuleCard
              id="skills"
              class="span-5 reveal"
              style="--delay: 90ms"
              index="02"
              title="擅长领域介绍"
              en="SKILL INVENTORY"
              top="#ffd54a"
              side="#b98a1f"
              note="9 项技能"
            >
              <div class="skills-panel">
                <div class="skill-grid" role="group" aria-label="技能物品栏">
                  <button
                    v-for="(skill, index) in skills"
                    :key="skill.name"
                    class="skill-slot"
                    :class="{ active: selectedSkill === index }"
                    :aria-label="`查看${skill.name}技能详情`"
                    :aria-pressed="selectedSkill === index"
                    @click="selectedSkill = index"
                  >
                    <span class="skill-key pixel">{{ index + 1 }}</span>
                    <img :src="skill.icon" :alt="skill.name" />
                    <span class="skill-name">{{ skill.name }}</span>
                  </button>
                </div>

                <Transition name="skill-detail" mode="out-in">
                  <div :key="currentSkill.name" class="skill-detail" aria-live="polite">
                    <div class="skill-detail-head">
                      <span class="skill-indicator"></span>
                      <h3>{{ currentSkill.name }}</h3>
                      <span>{{ currentSkill.category }}</span>
                    </div>
                    <p>{{ currentSkill.description }}</p>
                  </div>
                </Transition>

                <p class="slot-note">
                  <span class="pixel">9 / 9</span>
                  点击物品，查看技能详情
                </p>
              </div>
            </ModuleCard>

            <ModuleCard
              id="works"
              class="span-12 reveal"
              style="--delay: 160ms"
              index="03"
              title="我的成果"
              en="PROJECT SHOWCASE"
              top="#4fe3d0"
              side="#2a8f86"
              note="5 项经历"
            >
              <div class="project-filters" role="group" aria-label="筛选项目类型">
                <button
                  v-for="filter in projectFilters"
                  :key="filter.id"
                  :class="{ active: projectFilter === filter.id }"
                  :aria-pressed="projectFilter === filter.id"
                  @click="projectFilter = filter.id"
                >
                  {{ filter.label }}
                  <span class="pixel">{{ filter.count }}</span>
                </button>
              </div>

              <TransitionGroup tag="div" name="project-list" class="project-grid">
                <button
                  v-for="project in filteredProjects"
                  :key="project.id"
                  type="button"
                  class="project-card"
                  :aria-label="`查看${project.title}详情`"
                  @click="openProject(project, $event)"
                >
                  <span class="project-visual">
                    <span class="project-type">{{ project.categoryLabel }}</span>
                    <img :src="project.icon" alt="" loading="lazy" />
                    <span class="project-open-hint pixel">OPEN +</span>
                  </span>
                  <span class="project-info">
                    <span class="project-period pixel">{{ project.period }}</span>
                    <span class="project-title">{{ project.title }}</span>
                    <span class="project-summary">{{ project.summary }}</span>
                    <span class="tech-tags">
                      <span v-for="item in project.tech.slice(0, 3)" :key="item">{{ item }}</span>
                      <span v-if="project.tech.length > 3">+{{ project.tech.length - 3 }}</span>
                    </span>
                    <span class="project-link">查看项目档案 <span aria-hidden="true">→</span></span>
                  </span>
                </button>
              </TransitionGroup>

              <p class="slot-note">
                <span class="pixel">{{ filteredProjects.length }} / 5</span>
                点击展示框，打开完整项目档案
              </p>
            </ModuleCard>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">
          <McCube :size="24" top="#7cb342" side="#8b5a2b" />
          <div>
            <strong>坤的世界</strong>
            <span class="pixel">A MINECRAFT-INSPIRED PORTFOLIO</span>
          </div>
        </div>
        <div class="footer-meta">
          <span class="pixel">SEED: KUN-2026</span>
          <span>Built with Vue 3 · © 2026 坤</span>
        </div>
      </div>
    </footer>

    <Hotbar :active="active" @select="go" />
    <ProjectModal :project="selectedProject" @close="closeProject" />

    <Transition name="toast">
      <div v-if="toast" class="toast" role="status">
        <span class="toast-dot"></span>
        {{ toast }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

.topbar {
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(20, 20, 20, 0.95);
  border-bottom: 4px solid #0a0a0a;
  box-shadow: 0 4px 0 rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6px);
}

.topbar-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 10px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: inherit;
  text-decoration: none;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.25;
}

.brand-text strong {
  font-size: 16px;
  letter-spacing: 0.06em;
}

.brand-text em {
  font-style: normal;
  font-size: 8px;
  color: #9a9a9a;
}

.nav {
  display: flex;
  gap: 4px;
  margin-left: auto;
}

.nav-item {
  padding: 10px 14px;
  border: 0;
  background: transparent;
  color: #cfc9b8;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.12s, color 0.12s;
}

.nav-item:hover {
  color: #fff;
  background: #303030;
}

.nav-item.active {
  color: #10240f;
  background: var(--grass-500);
  box-shadow:
    inset -3px -3px 0 rgba(0, 0, 0, 0.22),
    inset 3px 3px 0 rgba(255, 255, 255, 0.32);
}

.nav-item:focus-visible,
.mc-btn:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 4px;
}

.server {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 8px;
  color: #a5e077;
  white-space: nowrap;
}

.dot {
  width: 8px;
  height: 8px;
  background: #7cff6b;
  box-shadow: 0 0 10px #7cff6b;
  animation: blink 2.4s steps(2) infinite;
}

@keyframes blink {
  50% {
    opacity: 0.3;
  }
}

.hero {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 72px 0 0;
  background: linear-gradient(180deg, var(--sky-1) 0%, var(--sky-2) 55%, var(--sky-3) 100%);
}

.sun {
  position: absolute;
  top: 64px;
  right: 12%;
  width: 64px;
  height: 64px;
  background: #ffe98a;
  box-shadow:
    0 0 0 5px rgba(255, 255, 255, 0.55),
    0 0 48px rgba(255, 236, 140, 0.85);
}

.cloud {
  position: absolute;
  width: 64px;
  height: 18px;
  background: #fff;
  opacity: 0.92;
  box-shadow:
    40px -18px 0 #fff,
    96px 0 0 #fff,
    152px -18px 0 #fff,
    200px 0 0 #fff;
}

.cloud-a {
  top: 110px;
  left: -8%;
  animation: drift 64s linear infinite;
}

.cloud-b {
  top: 240px;
  left: 40%;
  scale: 0.7;
  opacity: 0.8;
  animation: drift 88s linear infinite;
}

.cloud-c {
  top: 60px;
  left: 62%;
  scale: 1.2;
  opacity: 0.7;
  animation: drift 110s linear infinite;
}

@keyframes drift {
  from {
    translate: -20vw 0;
  }
  to {
    translate: 120vw 0;
  }
}

.hero-inner {
  position: relative;
  z-index: 2;
  max-width: 1180px;
  min-height: 480px;
  margin: 0 auto;
  padding: 8px 24px 0;
  display: grid;
  grid-template-columns: 1.08fr 0.92fr;
  align-items: center;
  gap: 32px;
}

.hero-copy {
  padding-bottom: 48px;
}

.badge {
  display: inline-block;
  padding: 8px 12px;
  font-size: 8px;
  letter-spacing: 0.12em;
  color: #eaf6e2;
  background: rgba(12, 28, 16, 0.45);
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.45);
}

.hero-title {
  margin-top: 20px;
  font-size: clamp(46px, 6.4vw, 82px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: 0.04em;
  color: transparent;
  background: linear-gradient(180deg, #f2fae0 0%, #a6d96c 48%, #5f9f3c 100%);
  -webkit-background-clip: text;
  background-clip: text;
  filter: drop-shadow(4px 4px 0 rgba(24, 52, 16, 0.35));
}

.hero-en {
  margin-top: 10px;
  font-size: 11px;
  letter-spacing: 0.28em;
  color: rgba(15, 40, 24, 0.65);
}

.hero-desc {
  margin-top: 18px;
  max-width: 500px;
  font-size: 16px;
  line-height: 1.9;
  color: #143a44;
}

.hero-actions {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.hero-stats {
  margin-top: 32px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-stats li {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.32);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.55);
}

.hero-stats .pixel {
  font-size: 7px;
  color: rgba(14, 44, 60, 0.6);
}

.hero-stats strong {
  font-size: 13px;
  color: #10323f;
}

.hero-contact {
  margin-top: 24px;
  max-width: 520px;
  padding: 14px;
  background: rgba(20, 40, 18, 0.32);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.35);
}

.hero-contact-title {
  margin-bottom: 10px;
  font-size: 13px;
  font-weight: 900;
  color: #eaf6e2;
  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.35);
}

.hero-contact-links {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.hero-contact-links a,
.hero-contact-links button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border: 0;
  color: #12303b;
  text-align: left;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.34);
  box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.6);
  font-size: 13px;
  cursor: pointer;
  transition: background 0.12s, transform 0.08s steps(2);
}

.hero-contact-links a:hover,
.hero-contact-links button:hover {
  background: rgba(255, 255, 255, 0.58);
  transform: translateX(4px);
}

.hero-contact-links a:focus-visible,
.hero-contact-links button:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 3px;
}

.hero-contact-links .pixel {
  flex: none;
  width: 58px;
  font-size: 8px;
  color: rgba(14, 44, 60, 0.75);
}

.hero-contact-links span:last-child {
  overflow-wrap: anywhere;
}

.hero-art {
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 400px;
  padding-bottom: 40px;
}

.big-cube {
  animation: bob 5.2s ease-in-out infinite;
  filter: drop-shadow(20px 22px 0 rgba(20, 60, 30, 0.14));
}

@keyframes bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

.float-item {
  position: absolute;
  width: 58px;
  height: 58px;
  object-fit: contain;
  image-rendering: pixelated;
  animation: bob 4s ease-in-out infinite;
  filter: drop-shadow(6px 8px 0 rgba(20, 60, 30, 0.14));
}

.c1 {
  top: 8%;
  right: 6%;
  animation-delay: -1.2s;
}

.c2 {
  top: 46%;
  left: 2%;
  width: 48px;
  height: 48px;
  animation-delay: -2.4s;
}

.c3 {
  right: 14%;
  bottom: 22%;
  width: 42px;
  height: 42px;
  animation-delay: -0.6s;
}

.ground {
  position: relative;
  z-index: 1;
  height: 76px;
  background: linear-gradient(180deg, #7cb342 0 12px, #6aa838 12px 16px, #8b5a2b 16px 100%);
  box-shadow: inset 0 -10px 0 rgba(0, 0, 0, 0.18);
}

.ground::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: var(--noise);
  background-size: 48px 48px;
  opacity: 0.45;
  mix-blend-mode: overlay;
}

.ground::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 16px;
  background-image: repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.08) 0 24px, transparent 24px 48px);
}

.world {
  padding: 72px 0 88px;
  background-color: var(--stone-700);
  background-image: var(--noise);
  background-size: 96px 96px;
  background-blend-mode: overlay;
}

.section-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

.world-head {
  margin-bottom: 32px;
}

.kicker {
  font-size: 9px;
  letter-spacing: 0.25em;
  color: #8a8a8a;
}

.world-title {
  margin-top: 8px;
  font-size: 28px;
  font-weight: 900;
  letter-spacing: 0.06em;
  color: #f1eedd;
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.45);
}

.world-desc {
  margin-top: 6px;
  font-size: 14px;
  color: #a9a394;
}

.modules {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 26px;
}

.span-7 {
  grid-column: span 7;
}

.span-5 {
  grid-column: span 5;
}

.span-12 {
  grid-column: span 12;
}

.modules > * {
  scroll-margin-top: 100px;
}

.reveal {
  opacity: 0;
  translate: 0 24px;
  transition:
    opacity 0.5s ease var(--delay, 0ms),
    translate 0.5s steps(5) var(--delay, 0ms);
}

.reveal.is-visible {
  opacity: 1;
  translate: 0 0;
}

/* 个人基础信息 */
.profile-main {
  display: flex;
  align-items: center;
  gap: 20px;
}

.identity {
  min-width: 0;
  flex: 1;
}

.name-line {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.name-line h3 {
  font-size: 30px;
  line-height: 1.2;
  color: #f4f1e1;
  letter-spacing: 0.08em;
}

.level {
  padding: 4px 7px;
  background: #2d461f;
  color: #b6e983;
  font-size: 8px;
  box-shadow: inset 0 0 0 2px #52783a;
}

.identity-role {
  margin-top: 8px;
  color: #b9b3a3;
  font-size: 14px;
}

.identity-tags {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.identity-tags span {
  padding: 2px 8px;
  background: #292929;
  color: #aaa495;
  font-size: 11px;
  box-shadow: inset 0 0 0 2px #414141;
}

.identity-tags .available {
  color: #b9ef88;
  box-shadow: inset 0 0 0 2px #4d7138;
}

.profile-bio {
  margin-top: 18px;
  color: #c0baaa;
  font-size: 13px;
  line-height: 1.9;
}

.education-card {
  margin-top: 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px;
  background: #292929;
  box-shadow: inset 0 0 0 2px #3f3f3f;
}

.education-icon {
  flex: none;
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
}

.education-icon img {
  width: 42px;
  height: 42px;
  image-rendering: pixelated;
}

.education-time {
  font-size: 7px;
  color: #8f8a7b;
}

.education-card h3 {
  margin-top: 4px;
  font-size: 16px;
  color: #ece8d9;
}

.education-card p:last-child {
  margin-top: 2px;
  font-size: 12px;
  color: #a9a394;
}

.courses {
  margin-top: 10px;
  color: #8f8a7b;
  font-size: 12px;
  line-height: 1.8;
}

.intent-block {
  margin-top: 16px;
}

.block-label {
  font-size: 8px;
  color: #a5e077;
}

.intent-tags {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.intent-tags span {
  padding: 4px 9px;
  background: #303d27;
  color: #c6d9b5;
  font-size: 11px;
  box-shadow: inset 0 0 0 2px #46583a;
}

.contact-row {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 8px;
}

.contact-row button {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 10px;
  border: 0;
  background: #181818;
  color: #d4cebd;
  font-size: 11px;
  cursor: pointer;
  box-shadow:
    inset 2px 2px 0 rgba(0, 0, 0, 0.55),
    inset -2px -2px 0 rgba(255, 255, 255, 0.07);
}

.contact-row button:hover {
  color: #b9ef88;
  background: #22291d;
}

.contact-row button > span:nth-child(2) {
  min-width: 0;
  overflow-wrap: anywhere;
}

.contact-label {
  flex: none;
  font-size: 7px;
  color: #7f9670;
}

.copy-icon {
  position: relative;
  flex: none;
  width: 10px;
  height: 10px;
  margin-left: auto;
  border: 2px solid currentColor;
  opacity: 0.65;
}

.copy-icon::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  width: 7px;
  height: 7px;
  border: 2px solid currentColor;
  background: #181818;
}

.honors-block {
  margin-top: 16px;
}

.honors-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 10px;
  border: 0;
  background: #2a2a2a;
  color: #d8d3c3;
  font-size: 12px;
  cursor: pointer;
  box-shadow: inset 0 0 0 2px #444;
}

.honors-toggle:hover {
  background: #333;
}

.honors-toggle > span:first-child {
  display: flex;
  align-items: center;
  gap: 8px;
}

.honors-toggle img {
  width: 26px;
  height: 26px;
  image-rendering: pixelated;
}

.honor-count {
  padding: 1px 5px;
  background: #594c20;
  color: var(--gold);
  font-size: 7px;
}

.toggle-text {
  color: #8f8a7b;
  font-size: 11px;
}

.honors-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s ease;
}

.honors-panel.open {
  grid-template-rows: 1fr;
}

.honors-inner {
  overflow: hidden;
}

.honors-inner ul {
  padding: 8px 10px 2px;
  display: grid;
  gap: 6px;
}

.honors-inner li {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 5px 8px;
  background: #252525;
}

.honors-inner li > span {
  flex: none;
  min-width: 34px;
  padding-top: 3px;
  color: var(--gold);
  font-size: 7px;
}

.honors-inner li p {
  color: #aaa495;
  font-size: 11px;
  line-height: 1.7;
}

.xp-bar {
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.xp-lv,
.xp-num {
  flex: none;
  font-size: 7px;
  color: #8f8a7b;
}

.xp-track {
  flex: 1;
  height: 12px;
  overflow: hidden;
  background: #121212;
  box-shadow:
    inset 2px 2px 0 rgba(0, 0, 0, 0.6),
    inset -2px -2px 0 rgba(255, 255, 255, 0.06);
}

.xp-fill {
  width: 72%;
  height: 100%;
  background: repeating-linear-gradient(90deg, #81bd4d 0 12px, #6aa83d 12px 16px);
  background-size: 32px 100%;
  animation: xp-move 2.4s linear infinite;
}

@keyframes xp-move {
  to {
    background-position: 32px 0;
  }
}

/* 技能物品栏 */
.skills-panel {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.skill-slot {
  position: relative;
  aspect-ratio: 1 / 1;
  min-width: 0;
  padding: 7px 4px 5px;
  border: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  background: #141414;
  color: #8f8a7b;
  cursor: pointer;
  box-shadow:
    inset 3px 3px 0 rgba(0, 0, 0, 0.6),
    inset -3px -3px 0 rgba(255, 255, 255, 0.07);
  transition: background 0.12s, box-shadow 0.12s, color 0.12s;
}

.skill-slot img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(3px 3px 0 rgba(0, 0, 0, 0.3));
  transition: transform 0.14s steps(2);
}

.skill-slot:hover,
.skill-slot.active {
  color: #d7e8c6;
  background: #20281b;
  box-shadow:
    inset 0 0 0 2px #5d883d,
    inset 3px 3px 0 rgba(0, 0, 0, 0.45);
}

.skill-slot:hover img,
.skill-slot.active img {
  transform: translateY(-4px) scale(1.06);
}

.skill-slot.active img {
  animation: selected-item 1.8s steps(4) infinite;
}

@keyframes selected-item {
  50% {
    transform: translateY(-6px) scale(1.06);
  }
}

.skill-slot:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 3px;
}

.skill-key {
  position: absolute;
  top: 3px;
  left: 5px;
  font-size: 7px;
  color: #777;
}

.skill-name {
  max-width: 100%;
  overflow: hidden;
  color: inherit;
  font-size: 10px;
  line-height: 1.4;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.skill-detail {
  min-height: 132px;
  margin-top: 16px;
  padding: 14px;
  background: #191919;
  box-shadow:
    inset 2px 2px 0 rgba(0, 0, 0, 0.5),
    inset -2px -2px 0 rgba(255, 255, 255, 0.06);
}

.skill-detail-head {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-indicator {
  width: 8px;
  height: 8px;
  background: var(--gold);
  box-shadow: 2px 2px 0 #6b5515;
}

.skill-detail-head h3 {
  color: #ece8d9;
  font-size: 16px;
}

.skill-detail-head > span:last-child {
  margin-left: auto;
  color: #8f8a7b;
  font-size: 10px;
}

.skill-detail > p {
  margin-top: 10px;
  color: #aaa495;
  font-size: 12px;
  line-height: 1.85;
}

.skill-detail-enter-active,
.skill-detail-leave-active {
  transition: opacity 0.14s, transform 0.14s steps(2);
}

.skill-detail-enter-from {
  opacity: 0;
  transform: translateX(12px);
}

.skill-detail-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

.slot-note {
  margin-top: auto;
  padding-top: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #6f6a5e;
}

.slot-note .pixel {
  font-size: 8px;
  color: #8f8a7b;
}

/* 项目成果 */
.project-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
}

.project-filters button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 12px;
  border: 0;
  background: #292929;
  color: #aaa495;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: inset 0 0 0 2px #444;
}

.project-filters button:hover {
  color: #fff;
  background: #363636;
}

.project-filters button.active {
  background: var(--grass-600);
  color: #fff;
  box-shadow:
    inset -3px -3px 0 rgba(0, 0, 0, 0.25),
    inset 3px 3px 0 rgba(255, 255, 255, 0.2);
}

.project-filters button .pixel {
  padding: 1px 4px;
  background: rgba(0, 0, 0, 0.25);
  font-size: 7px;
}

.project-grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.project-card {
  min-width: 0;
  padding: 0;
  border: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #292929;
  color: inherit;
  text-align: left;
  cursor: pointer;
  box-shadow:
    inset -3px -3px 0 rgba(0, 0, 0, 0.35),
    inset 3px 3px 0 rgba(255, 255, 255, 0.08),
    0 0 0 3px #151515;
  transition: transform 0.16s steps(2), box-shadow 0.16s;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow:
    inset -3px -3px 0 rgba(0, 0, 0, 0.35),
    inset 3px 3px 0 rgba(255, 255, 255, 0.08),
    0 0 0 3px #608c3f,
    0 8px 0 rgba(0, 0, 0, 0.3);
}

.project-card:focus-visible {
  outline: 3px solid var(--gold);
  outline-offset: 4px;
}

.project-visual {
  position: relative;
  height: 142px;
  display: grid;
  place-items: center;
  overflow: hidden;
  background-color: #181818;
  background-image:
    linear-gradient(45deg, #1d1d1d 25%, transparent 25%),
    linear-gradient(-45deg, #1d1d1d 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #1d1d1d 75%),
    linear-gradient(-45deg, transparent 75%, #1d1d1d 75%);
  background-size: 24px 24px;
  background-position: 0 0, 0 12px, 12px -12px, -12px 0;
  box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.35);
}

.project-visual img {
  width: 82px;
  height: 82px;
  object-fit: contain;
  image-rendering: pixelated;
  filter: drop-shadow(7px 7px 0 rgba(0, 0, 0, 0.35));
  transition: transform 0.18s steps(3);
}

.project-card:hover .project-visual img {
  transform: translateY(-6px) scale(1.1);
}

.project-type {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 1;
  padding: 3px 7px;
  background: #334629;
  color: #c5e2a9;
  font-size: 10px;
  box-shadow: 0 0 0 2px #101010;
}

.project-open-hint {
  position: absolute;
  right: 8px;
  bottom: 8px;
  color: #626262;
  font-size: 7px;
  transition: color 0.15s;
}

.project-card:hover .project-open-hint {
  color: #b9ef88;
}

.project-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 14px;
}

.project-period {
  color: #8f8a7b;
  font-size: 7px;
}

.project-title {
  margin-top: 7px;
  color: #f0ecdd;
  font-size: 17px;
  font-weight: 900;
  line-height: 1.45;
}

.project-summary {
  margin-top: 8px;
  color: #aaa495;
  font-size: 12px;
  line-height: 1.8;
}

.tech-tags {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tech-tags > span {
  padding: 2px 6px;
  background: #202020;
  color: #9db18b;
  font-size: 10px;
  box-shadow: inset 0 0 0 1px #414141;
}

.project-link {
  margin-top: auto;
  padding-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #a5e077;
  font-size: 11px;
  font-weight: 700;
}

.project-link > span {
  font-size: 18px;
  transition: transform 0.15s steps(2);
}

.project-card:hover .project-link > span {
  transform: translateX(4px);
}

.project-list-enter-active,
.project-list-leave-active,
.project-list-move {
  transition: opacity 0.2s, transform 0.22s steps(3);
}

.project-list-enter-from,
.project-list-leave-to {
  opacity: 0;
  transform: translateY(14px) scale(0.97);
}

.project-list-leave-active {
  position: absolute;
  pointer-events: none;
}

.site-footer {
  padding: 34px 0 116px;
  background: #171717;
  border-top: 4px solid #0a0a0a;
}

.footer-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-brand strong {
  display: block;
  font-size: 15px;
  letter-spacing: 0.06em;
}

.footer-brand .pixel {
  display: block;
  margin-top: 4px;
  font-size: 7px;
  color: #7d7d7d;
}

.footer-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  font-size: 12px;
  color: #7d7d7d;
}

.footer-meta .pixel {
  font-size: 7px;
  color: #6a6a6a;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 94px;
  z-index: 150;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 16px;
  background: #182414;
  color: #d9edc7;
  font-size: 13px;
  box-shadow:
    0 0 0 3px #0b0f09,
    inset 0 0 0 2px #4b6b39;
  transform: translateX(-50%);
}

.toast-dot {
  width: 8px;
  height: 8px;
  background: #91d15d;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.18s, translate 0.18s steps(2);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  translate: 0 10px;
}

@media (max-width: 1100px) {
  .project-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 980px) {
  .hero-inner {
    grid-template-columns: 1fr;
    min-height: auto;
  }

  .hero-copy {
    padding-bottom: 24px;
  }

  .hero-art {
    min-height: 300px;
    padding-bottom: 32px;
  }

  .big-cube {
    scale: 0.78;
  }

  .span-7,
  .span-5 {
    grid-column: span 12;
  }

  .skill-slot img {
    width: 62px;
    height: 62px;
  }
}

@media (max-width: 720px) {
  .topbar-inner {
    padding: 8px 16px;
    gap: 12px;
  }

  .brand-text strong {
    font-size: 14px;
  }

  .brand-text em,
  .server {
    display: none;
  }

  .nav {
    gap: 0;
  }

  .nav-item {
    padding: 8px;
    font-size: 12px;
  }

  .hero {
    padding-top: 48px;
  }

  .hero-title {
    font-size: 42px;
  }

  .hero-en {
    font-size: 8px;
  }

  .hero-desc {
    font-size: 14px;
  }

  .section-inner {
    padding: 0 16px;
  }

  .world {
    padding: 48px 0 64px;
  }

  .profile-main {
    align-items: flex-start;
  }

  .name-line h3 {
    font-size: 25px;
  }

  .contact-row {
    grid-template-columns: 1fr;
  }

  .footer-meta {
    align-items: flex-start;
  }
}

@media (max-width: 640px) {
  .project-grid {
    grid-template-columns: 1fr;
  }

  .project-visual {
    height: 154px;
  }

  .skill-slot img {
    width: 48px;
    height: 48px;
  }

  .skill-detail-head > span:last-child {
    width: 100%;
    margin-left: 16px;
  }

  .xp-num {
    display: none;
  }
}

@media (max-width: 420px) {
  .brand-text {
    display: none;
  }

  .nav {
    width: 100%;
    justify-content: space-between;
  }

  .profile-main {
    gap: 14px;
  }

  .identity-role {
    font-size: 12px;
  }

  .education-card {
    align-items: flex-start;
  }

  .education-card h3 {
    font-size: 14px;
  }

  .skill-grid {
    gap: 7px;
  }

  .skill-slot {
    padding-right: 2px;
    padding-left: 2px;
  }

  .skill-name {
    font-size: 9px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    translate: none;
    transition: none;
  }
}
</style>
