# 图谱示例 (Canvas Demo)

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5+-42b883?style=flat-square&logo=vue.js" alt="Vue 3.5+">
  <img src="https://img.shields.io/badge/TypeScript-5.9+-3178c6?style=flat-square&logo=typescript" alt="TypeScript 5.9+">
  <img src="https://img.shields.io/badge/Vite-7.0+-646cff?style=flat-square&logo=vite" alt="Vite 7.0+">
  <img src="https://img.shields.io/badge/Node-20.19+_|_22.12+-339933?style=flat-square&logo=node.js" alt="Node 20.19+ | 22.12+">
</p>

## ✨ 核心特性

- 🎯 **7列职业路径**: 职位 → 领域 → 任务 → 技能 → 层级2 → 层级1 → 课程
- 🔗 **智能连接线**: SVG 贝塞尔曲线动态绘制节点关联关系
- 🔍 **实时搜索**: 支持关键词搜索，匹配结果高亮显示
- 📜 **独立滚动**: 每列独立垂直滚动，支持大量数据展示
- 💫 **流畅交互**: 节点选择、路径追踪、搜索徽章等细节打磨

## 🏗️ 项目结构

```
canvas-demo/
├── src/
│   ├── main.ts                 # 应用入口
│   ├── App.vue                 # 根组件
│   ├── views/
│   │   ├── HomeView.vue        # 职位图谱主页 (核心功能)
│   ├── components/             # 可复用组件
│   ├── router/                 # 路由配置
│   ├── stores/                 # Pinia 状态管理
│   └── assets/                 # 静态资源
├── public/                     # 公共资源 (不经过构建)
├── .github/
│   └── copilot-instructions.md # AI 开发指南
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置
├── eslint.config.ts            # ESLint 配置
└── package.json                # 项目依赖
```

**数据结构**: 7列 × 多行节点数据

- 列1-4: 紫色系渐变 (职位 → 领域 → 任务 → 技能)
- 列5-7: 粉色系渐变 (层级2 → 层级1 → 课程)

**交互逻辑**:

1. 点击任意节点触发路径追踪
2. 递归构建完整关联链路
3. SVG 动态绘制连接线 (粉色虚线 + 圆点)
4. 头部徽章显示当前列搜索匹配数

<p align="center">mxy ❤️ 构建</p>
