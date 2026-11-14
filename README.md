# 坤的世界 · KUN'S WORLD
一个像素风个人主页
![预览](images/preview.jpg)
## 📖 项目简介

「坤的世界」是一个充满像素游戏氛围的个人作品集网站，把个人信息、技能栈和项目成果用 Minecraft 的视觉语言重新包装——头像、技能、项目都变成了"物品"和"成就"，底部的物品栏就是导航栏。

技术栈：**Vue 3** + **Vite**，纯前端，零后端依赖。

## ✨ 项目亮点

- 🎮 **Minecraft 像素风 UI** — 全局像素字体、方块阴影、噪点纹理，还原游戏界面质感
- 🧊 **等距立方体组件** — 用纯 CSS 实现的 3D 方块（McCube），可自定义顶面/侧面颜色
- 📦 **物品栏导航** — 底部固定 4 格物品栏，分别对应首页/关于我/擅长领域/我的成果，点击即跳转
- 🔊 **点击音效** — 所有可交互元素点击时播放 Minecraft 风格音效，对象池复用支持快速连点
- 🗂️ **项目详情弹窗** — 点击项目卡片弹出详情，支持 ESC 关闭、点击遮罩关闭、背景滚动锁定
- 📋 **一键复制联系方式** — 邮箱、电话点击即复制到剪贴板，并提示"已复制到背包"
- 🏆 **成就与荣誉折叠面板** — 可展开收起的荣誉列表
- 📱 **响应式适配** — 适配桌面、平板、手机多端浏览
## 🚀 本地运行
```bash
# 安装依赖
npm install
# 启动开发服务器
npm run dev
# 构建生产版本
npm run build
## 📁 目录结构
```
knight-front/
├── src/
│   ├── components/
│   │   ├── Hotbar.vue        # 底部物品栏导航
│   │   ├── McCube.vue        # 等距立方体组件
│   │   ├── ModuleCard.vue    # 模块卡片容器
│   │   └── ProjectModal.vue  # 项目详情弹窗
│   ├── utils/
│   │   └── sound.js          # 点击音效工具
│   ├── styles/
│   │   └── global.css        # 全局样式与变量
│   ├── App.vue               # 主页面
│   └── main.js               # 入口文件
├── public/
│   ├── images/               # 物品图标
│   └── audio/                # 音效文件
├── images/
│   └── preview.jpg           # README 预览图
├── index.html
├── package.json
└── vite.config.js
