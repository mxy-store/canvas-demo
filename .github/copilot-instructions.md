# Canvas Demo - Copilot 开发指南

## 项目概述

这是一个职位图谱可视化应用，基于 Vue 3 + TypeScript + Vite 构建，使用 Composition API 和 `<script setup>` 语法。项目实现了交互式的职业路径可视化系统，包含搜索、节点选择和连线动画等功能。

## 技术架构

### 技术栈

- **框架**: Vue 3.5+ 使用 `<script setup>` 语法
- **构建工具**: Vite 7+ 提供 HMR 和开发工具支持
- **语言**: TypeScript 5.9+ 严格类型检查 (通过 `vue-tsc`)
- **状态管理**: Pinia (Composition API 模式)
- **路由**: Vue Router 4 (history 模式 + 懒加载)
- **图形渲染**: SVG 动态绘制连接线 (贝塞尔曲线)

### 项目结构

```
src/
  ├── main.ts                    # 应用入口：Pinia + Router 初始化
  ├── App.vue                    # 根组件：RouterView 容器
  ├── router/index.ts            # 路由定义 (非首页懒加载)
  ├── stores/                    # Pinia 状态管理 (Composition API)
  ├── views/
  │   ├── HomeView.vue           # 职位图谱主页 (1047行核心逻辑)
  │   └── AboutView.vue          # 关于页面
  └── components/                # 可复用 UI 组件
      ├── HelloWorld.vue
      ├── TheWelcome.vue
      └── icons/                 # 图标组件集合
```

## 核心功能说明

### 职位图谱可视化 (HomeView.vue)

**数据结构**：7列职业发展路径

- 第1列: 职位 (18项) - 紫色系深渐变
- 第2列: 领域 (8项) - 紫色系中渐变
- 第3列: 任务 (13项) - 紫色系浅渐变
- 第4列: 技能 (10项) - 紫色系最浅渐变
- 第5列: 层级2 (13项) - 粉色系浅渐变
- 第6列: 层级1 (12项) - 粉色系中渐变
- 第7列: 课程 (10项) - 粉色系深渐变

**交互功能**：

1. **节点选择**: 点击任意节点触发递归路径构建，显示完整关联链路
2. **连接线绘制**: SVG 贝塞尔曲线 (粉色虚线 + 圆点标记)
3. **搜索功能**: 实时筛选 + 头部徽章显示匹配数量
4. **独立滚动**: 每列最大高度 500px，独立垂直滚动
5. **层级遮罩**: 头部 z-index(100) > 连线(50) 实现正确遮挡

**关键技术**：

```typescript
// 1. 递归路径构建
buildActivePath(node, visited) {
  visited.add(node.id)
  // 递归收集所有父节点和子节点
}

// 2. SVG 连接线计算
getLinePath(start, end) {
  // 贝塞尔曲线控制点计算
  // 坐标基于 .columns-wrapper 容器
}

// 3. 搜索高亮
hasSearchResults(column) {
  return column.items.some(item =>
    searchResults.value.includes(item.id)
  )
}
```

## 开发规范

### 组件开发

- **必须使用 `<script setup lang="ts">`** - 禁止 Options API
- **路径别名**: `@/` 映射到 `src/` (配置于 `vite.config.ts` 和 `tsconfig.app.json`)
- **路由链接**: 使用 `<RouterLink>` 组件，禁止使用原生 `<a>` 标签
- **组件结构示例**:

  ```vue
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue'
  import type { NodeType } from '@/types'

  const data = ref<NodeType[]>([])
  const filteredData = computed(() => {
    /* ... */
  })

  onMounted(() => {
    /* 初始化逻辑 */
  })
  </script>

  <template>
    <div class="container">
      <!-- 模板内容 -->
    </div>
  </template>

  <style scoped>
  /* 样式使用 scoped 避免污染 */
  </style>
  ```

### 状态管理

- Pinia Store **必须使用 Composition API 风格**
- 模式参考 `stores/counter.ts`:
  ```typescript
  export const useCounterStore = defineStore('counter', () => {
    const state = ref(initialValue)
    const getter = computed(() => /* 计算逻辑 */)
    function action() { /* 操作逻辑 */ }
    return { state, getter, action }
  })
  ```

### 路由配置

- 首页路由: 立即加载 (`component: HomeView`)
- 其他路由: 懒加载 (`component: () => import('../views/AboutView.vue')`)
- 使用 `createWebHistory` 模式 (生产环境需配置服务端路由)

## 开发工作流

### 常用命令 (PowerShell)

```powershell
npm run dev         # 启动开发服务器 (HMR 热更新)
npm run build       # 类型检查 + 生产构建
npm run type-check  # 仅执行类型检查 (不构建)
npm run lint        # 代码检查 (oxlint + ESLint 双重检查)
npm run format      # 代码格式化 (Prettier，仅 src/)
```

### Lint 策略

- **双重检查机制**: oxlint (快速) → ESLint (全面)
- oxlint: 仅检查正确性规则 (`-D correctness`)
- ESLint: Vue Essential + TypeScript 推荐 + Prettier 集成
- ESLint 使用扁平配置格式 (`eslint.config.ts`)
- 忽略目录: `dist/`, `dist-ssr/`, `coverage/`

### 类型检查

- **使用 `vue-tsc --build`** 代替 `tsc` (支持 `.vue` 文件)
- TypeScript 配置分离: `tsconfig.json` 引用 `tsconfig.app.json` 和 `tsconfig.node.json`
- **编辑器要求**: 安装 Volar 扩展以获得 `.vue` 文件类型感知

## 环境要求

### Node 版本

- **必需版本**: Node 20.19.0+ 或 22.12.0+
- 在 `package.json` 中强制执行 - 运行前请检查版本

### Vite 配置

- 开发工具: `vite-plugin-vue-devtools` 已启用 (增强调试)
- 路径别名: `@` 已配置用于简洁导入
- 详见 `vite.config.ts` 查看完整插件配置

## 添加新功能指南

### 基本流程

1. **视图组件** 放入 `src/views/`，**UI组件** 放入 `src/components/`
2. **添加路由** 到 `src/router/index.ts` (非关键路由请使用懒加载)
3. **创建 Store** 在 `src/stores/` (使用 Composition API 模式)
4. **使用路径别名** `@/` 导入所有 src 相对路径
5. **运行类型检查** `npm run type-check` 验证 TypeScript 兼容性

### SVG 连接线开发注意事项

如果需要修改或扩展连接线功能：

1. **坐标计算**: 基于 `.columns-wrapper` 容器的 `getBoundingClientRect()`
2. **Z-Index 层级**: 保持 SVG(50) < 头部(100) < 徽章(150)
3. **Marker 定义**:
   ```html
   <marker
     id="dot"
     markerUnits="userSpaceOnUse"
     markerWidth="10"
     markerHeight="10"
     refX="5"
     refY="5"
   >
     <circle cx="5" cy="5" r="4" fill="none" stroke="#FF6B9D" stroke-width="2" />
   </marker>
   ```
4. **路径样式**: `stroke: #FF6B9D, stroke-width: 2, stroke-dasharray: 5,5`

### 渐变颜色系统

**左侧四列 (紫色系 - 深到浅)**:

- `.header-group1-0`: #8b5cf6 → #7c3aed (最深)
- `.header-group1-1`: #a78bfa → #8b5cf6
- `.header-group1-2`: #c4b5fd → #a78bfa
- `.header-group1-3`: #ddd6fe → #c4b5fd (最浅)

**右侧三列 (粉色系 - 浅到深)**:

- `.header-group2-0`: #fce7f3 → #fbcfe8 (最浅)
- `.header-group2-1`: #fbcfe8 → #f9a8d4
- `.header-group2-2`: #f9a8d4 → #f472b6 (最深)

## 故障排查

### 常见问题

1. **连接线不显示**: 检查 SVG z-index 和容器 overflow 设置
2. **节点点击无反应**: 验证 `buildActivePath` 是否正确收集节点
3. **搜索不工作**: 检查 `searchKeyword` 响应式绑定和 `handleSearch` 触发
4. **渐变色异常**: 确认 CSS 类名是否正确应用到对应列头部
5. **滚动异常**: 检查 `.column-items` 的 `max-height` 和 `overflow-y` 设置

### 调试技巧

- 使用 Vue DevTools 检查组件状态和响应式数据
- 在浏览器控制台检查 SVG DOM 结构和计算样式
- 使用 `console.log(activePath.value)` 追踪节点选择逻辑
- 检查 `.columns-wrapper` 的 `getBoundingClientRect()` 确保坐标正确
