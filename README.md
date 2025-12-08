# 职位图谱可视化系统 (Canvas Demo)

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.5+-42b883?style=flat-square&logo=vue.js" alt="Vue 3.5+">
  <img src="https://img.shields.io/badge/TypeScript-5.9+-3178c6?style=flat-square&logo=typescript" alt="TypeScript 5.9+">
  <img src="https://img.shields.io/badge/Vite-7.0+-646cff?style=flat-square&logo=vite" alt="Vite 7.0+">
  <img src="https://img.shields.io/badge/Node-20.19+_|_22.12+-339933?style=flat-square&logo=node.js" alt="Node 20.19+ | 22.12+">
</p>

一个交互式的职业发展路径可视化系统，基于 Vue 3 + TypeScript + Vite 构建，提供直观的职位技能关联图谱展示。

## ✨ 核心特性

- 🎯 **7列职业路径**: 职位 → 领域 → 任务 → 技能 → 层级2 → 层级1 → 课程
- 🔗 **智能连接线**: SVG 贝塞尔曲线动态绘制节点关联关系
- 🔍 **实时搜索**: 支持关键词搜索，匹配结果高亮显示
- 🎨 **渐变设计**: 左侧紫色系深→浅，右侧粉色系浅→深
- 📜 **独立滚动**: 每列独立垂直滚动，支持大量数据展示
- 💫 **流畅交互**: 节点选择、路径追踪、搜索徽章等细节打磨

## 🖥️ 推荐开发环境

### IDE 配置

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

⚠️ **注意**: 如果已安装 Vetur，请先禁用以避免冲突。

### 浏览器扩展

**Chromium 内核浏览器** (Chrome, Edge, Brave 等):

- [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- [开启自定义对象格式化](http://bit.ly/object-formatters)

**Firefox**:

- [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
- [开启自定义对象格式化](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## 🚀 快速开始

### 环境要求

- **Node.js**: 20.19.0+ 或 22.12.0+
- **包管理器**: npm / yarn / pnpm

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 [http://localhost:5173](http://localhost:5173) 查看应用 (如端口被占用将自动使用下一个可用端口)

### 生产构建

```bash
npm run build
```

构建产物将输出到 `dist/` 目录。

### 类型检查

```bash
npm run type-check
```

使用 `vue-tsc` 检查 TypeScript 类型错误。

### 代码检查与格式化

```bash
npm run lint      # 执行 oxlint + ESLint 代码检查
npm run format    # 使用 Prettier 格式化代码
```

## 📦 技术栈

| 技术       | 版本 | 说明                                    |
| ---------- | ---- | --------------------------------------- |
| Vue        | 3.5+ | 使用 Composition API + `<script setup>` |
| TypeScript | 5.9+ | 严格类型检查，增强代码可维护性          |
| Vite       | 7.0+ | 极速 HMR 开发体验                       |
| Vue Router | 4.x  | 单页应用路由管理                        |
| Pinia      | 2.x  | 轻量级状态管理 (Composition API 风格)   |
| ESLint     | 9.x  | 代码质量检查 (扁平配置)                 |
| Prettier   | 3.x  | 代码格式化                              |

## 🏗️ 项目结构

```
canvas-demo/
├── src/
│   ├── main.ts                 # 应用入口
│   ├── App.vue                 # 根组件
│   ├── views/
│   │   ├── HomeView.vue        # 职位图谱主页 (核心功能)
│   │   └── AboutView.vue       # 关于页面
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

## 💡 核心功能说明

### 职位图谱可视化

**数据结构**: 7列 × 多行节点数据

- 列1-4: 紫色系渐变 (职位 → 领域 → 任务 → 技能)
- 列5-7: 粉色系渐变 (层级2 → 层级1 → 课程)

**交互逻辑**:

1. 点击任意节点触发路径追踪
2. 递归构建完整关联链路
3. SVG 动态绘制连接线 (粉色虚线 + 圆点)
4. 头部徽章显示当前列搜索匹配数

### 搜索功能

- 输入关键词实时筛选所有列数据
- 匹配节点高亮显示
- 列头徽章显示匹配数量
- 支持中文、英文、数字搜索

### 连接线系统

- **渲染技术**: SVG `<path>` 贝塞尔曲线
- **样式**: 2px 粉色虚线 (`stroke-dasharray: 5,5`)
- **标记**: 圆点 marker (10x10, 半径4)
- **层级**: z-index 50 (低于头部 100)

## 🎨 设计系统

### 颜色规范

**左侧紫色渐变** (深→浅):

```css
/* 第1列 */ linear-gradient(135deg, #8b5cf6, #7c3aed)
/* 第2列 */ linear-gradient(135deg, #a78bfa, #8b5cf6)
/* 第3列 */ linear-gradient(135deg, #c4b5fd, #a78bfa)
/* 第4列 */ linear-gradient(135deg, #ddd6fe, #c4b5fd)
```

**右侧粉色渐变** (浅→深):

```css
/* 第5列 */ linear-gradient(135deg, #fce7f3, #fbcfe8)
/* 第6列 */ linear-gradient(135deg, #fbcfe8, #f9a8d4)
/* 第7列 */ linear-gradient(135deg, #f9a8d4, #f472b6)
```

### 布局规则

- **容器最大宽度**: 1600px
- **最小宽度**: 1500px
- **列滚动高度**: 500px (超出显示滚动条)
- **头部高度**: 60px (sticky 定位)
- **节点间距**: 8px padding

## 📚 开发指南

### TypeScript 类型支持

TypeScript 默认无法处理 `.vue` 文件的类型信息，因此项目使用 `vue-tsc` 替代 `tsc` 进行类型检查。编辑器需要安装 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 扩展以获得完整的类型感知。

### 路径别名

项目配置了 `@/` 别名映射到 `src/` 目录:

```typescript
import HomeView from '@/views/HomeView.vue'
import { useCounterStore } from '@/stores/counter'
```

### 添加新功能

1. 视图组件放入 `src/views/`
2. UI 组件放入 `src/components/`
3. 在 `src/router/index.ts` 添加路由 (非关键路由使用懒加载)
4. 在 `src/stores/` 创建 Pinia store (Composition API 风格)
5. 运行 `npm run type-check` 验证类型

### 自定义配置

详见 [Vite 配置文档](https://vite.dev/config/)

## 🔧 故障排查

**连接线不显示**:

- 检查 SVG z-index 设置
- 确认 `.columns-wrapper` overflow 配置
- 验证节点坐标计算逻辑

**搜索功能异常**:

- 检查 `searchKeyword` 响应式绑定
- 验证 `handleSearch` 方法触发
- 确认徽章计算逻辑正确

**类型错误**:

- 确保安装 Volar 扩展
- 运行 `npm run type-check` 查看详细错误
- 检查 `tsconfig.json` 配置

## 📄 许可证

[MIT License](LICENSE)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

<p align="center">使用 ❤️ 和 Vue 3 构建</p>
