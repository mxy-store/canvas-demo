<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'

// 数据结构定义 - 添加 children 关联
interface ColumnItem {
  id: string
  label: string
  children?: string[] // 关联下一列的子节点 ID
}

interface Column {
  title: string
  key: string
  items: ColumnItem[]
}

// 职位图谱数据 - 建立层级关联关系（增加数据量，优化关联关系）
const columns = ref<Column[]>([
  {
    title: '岗位名称',
    key: 'position',
    items: [
      { id: 'p1', label: '汽车维修服务', children: ['d1', 'd2'] },
      { id: 'p2', label: '配件服务', children: ['d3'] },
      { id: 'p3', label: '汽车美容工', children: ['d1', 'd4'] },
      { id: 'p4', label: '汽车车身整形修复工', children: ['d2', 'd3'] },
      { id: 'p5', label: '汽车车身涂装修复工', children: ['d3', 'd6'] },
      { id: 'p6', label: '汽车电器维修工', children: ['d5'] },
      { id: 'p7', label: '汽车玻璃修复工', children: ['d1'] },
      { id: 'p8', label: '汽车检测员', children: ['d4', 'd5', 'd7'] },
      { id: 'p9', label: '汽车装配工', children: ['d2'] },
      { id: 'p10', label: '汽车改装技师', children: ['d6', 'd8'] },
      { id: 'p11', label: '新能源汽车维修工', children: ['d5', 'd7'] },
      { id: 'p12', label: '汽车钣金技师', children: ['d3'] },
      { id: 'p13', label: '汽车质检专员', children: ['d4'] },
      { id: 'p14', label: '汽车喷漆调色师', children: ['d3', 'd6'] },
      { id: 'p15', label: '汽车底盘维修工', children: ['d1', 'd2'] },
      { id: 'p16', label: '汽车空调维修工', children: ['d5'] },
      { id: 'p17', label: '智能网联汽车调试员', children: ['d7', 'd8'] },
      { id: 'p18', label: '汽车营销服务', children: [] },
    ],
  },
  {
    title: '工作领域',
    key: 'domain',
    items: [
      {
        id: 'd1',
        label: '使用工、夹、量具和仪表、检修设备、维护、修理和调试汽车及特种车辆',
        children: ['t1', 't2', 't7'],
      },
      {
        id: 'd2',
        label: '使用专用工具、设备和装配线装配、调试汽车部件、总成或整车',
        children: ['t3', 't9'],
      },
      {
        id: 'd3',
        label: '汽车车身修复、涂装及美容护理工作',
        children: ['t4', 't10'],
      },
      {
        id: 'd4',
        label: '汽车性能检测、故障诊断及质量评估',
        children: ['t1', 't5', 't11'],
      },
      {
        id: 'd5',
        label: '汽车电气系统安装、检测与维修',
        children: ['t6', 't12'],
      },
      {
        id: 'd6',
        label: '汽车改装设计与零部件升级改造',
        children: ['t8', 't4'],
      },
      {
        id: 'd7',
        label: '新能源汽车动力系统检测与维护',
        children: ['t5', 't11', 't13'],
      },
      {
        id: 'd8',
        label: '智能网联汽车系统集成与调试',
        children: ['t12', 't13'],
      },
    ],
  },
  {
    title: '工作任务',
    key: 'task',
    items: [
      {
        id: 't1',
        label: '使用工、夹、量具和仪表进行汽车及特种车辆的发动机、底盘、车身、电气等总成检查',
        children: ['s1', 's2'],
      },
      {
        id: 't2',
        label: '使用工具对汽车各系统及零部件检测与诊断',
        children: ['s2', 's3'],
      },
      {
        id: 't3',
        label: '汽车零部件装配、调试及质量检验',
        children: ['s4'],
      },
      {
        id: 't4',
        label: '车身钣金修复、打磨及喷漆作业',
        children: ['s3', 's7'],
      },
      {
        id: 't5',
        label: '汽车电控系统故障码读取与分析',
        children: ['s2', 's5'],
      },
      {
        id: 't6',
        label: '汽车电路图识读与电气设备维修',
        children: ['s5', 's8'],
      },
      {
        id: 't7',
        label: '汽车定期保养与维护作业',
        children: ['s1', 's4'],
      },
      {
        id: 't8',
        label: '汽车改装方案设计与实施',
        children: ['s6', 's9'],
      },
      {
        id: 't9',
        label: '汽车总成拆装与调整',
        children: ['s1', 's4'],
      },
      {
        id: 't10',
        label: '汽车表面缺陷修复与美容护理',
        children: ['s7'],
      },
      {
        id: 't11',
        label: '综合性能检测与数据分析',
        children: ['s2', 's10'],
      },
      {
        id: 't12',
        label: '车载电子系统编程与配置',
        children: ['s5', 's8', 's10'],
      },
      {
        id: 't13',
        label: '新能源电池系统检测与维护',
        children: ['s10'],
      },
    ],
  },
  {
    title: '技能描述',
    key: 'skill',
    items: [
      { id: 's1', label: '使用工具对汽车各系统及零部件检测与诊断', children: ['l2_1', 'l2_8'] },
      { id: 's2', label: '汽车电控系统故障诊断与排除', children: ['l2_2', 'l2_3', 'l2_7'] },
      { id: 's3', label: '车身钣金修复与表面处理技术', children: ['l2_4'] },
      { id: 's4', label: '汽车零部件装配与调整技能', children: ['l2_5', 'l2_8'] },
      { id: 's5', label: '汽车电气系统检修与维护', children: ['l2_3', 'l2_7', 'l2_11'] },
      { id: 's6', label: '汽车改装设计与性能优化', children: ['l2_6', 'l2_10'] },
      { id: 's7', label: '汽车涂装工艺与调色技术', children: ['l2_4', 'l2_9'] },
      { id: 's8', label: '车载网络通信与编程', children: ['l2_11'] },
      { id: 's9', label: '汽车动力系统升级改造', children: ['l2_6', 'l2_12'] },
      { id: 's10', label: '新能源汽车技术应用', children: ['l2_12', 'l2_13'] },
    ],
  },
  {
    title: '二级节点名称',
    key: 'level2',
    items: [
      { id: 'l2_1', label: '世界技能大赛', children: ['l1_1', 'l1_8'] },
      { id: 'l2_2', label: '课中错题2：认识车身含磨料及其种类', children: ['l1_2'] },
      { id: 'l2_3', label: '课中错题3：认识车身非金属料及其种类', children: ['l1_3'] },
      { id: 'l2_4', label: '汽车钣金工艺实训', children: ['l1_1', 'l1_4', 'l1_10'] },
      { id: 'l2_5', label: '汽车装配技术规范', children: ['l1_2', 'l1_9'] },
      { id: 'l2_6', label: '汽车改装案例分析', children: ['l1_5'] },
      { id: 'l2_7', label: '汽车电路故障排查', children: ['l1_3', 'l1_6'] },
      { id: 'l2_8', label: '发动机维修基础', children: ['l1_1', 'l1_7'] },
      { id: 'l2_9', label: '汽车涂装工艺标准', children: ['l1_10'] },
      { id: 'l2_10', label: '汽车性能改装技术', children: ['l1_5', 'l1_11'] },
      { id: 'l2_11', label: '汽车电子系统诊断', children: ['l1_6', 'l1_12'] },
      { id: 'l2_12', label: '新能源汽车原理', children: ['l1_11', 'l1_12'] },
      { id: 'l2_13', label: '智能网联汽车技术', children: ['l1_12'] },
    ],
  },
  {
    title: '一级节点名称',
    key: 'level1',
    items: [
      {
        id: 'l1_1',
        label: '项目1：汽车行走的艺术-车身结构大揭秘 1.1设动论-认识车身基本技术',
        children: ['c1', 'c6'],
      },
      {
        id: 'l1_2',
        label: '项目1：汽车行走的艺术-车身结构大揭秘 1.2艺术跟踪-认识车身大有乾坤',
        children: ['c1'],
      },
      {
        id: 'l1_3',
        label: '项目2：汽车电气系统原理与检修 2.1电路基础知识',
        children: ['c3'],
      },
      {
        id: 'l1_4',
        label: '项目2：汽车电气系统原理与检修 2.2常见电气故障诊断',
        children: ['c2', 'c3'],
      },
      {
        id: 'l1_5',
        label: '项目3：汽车改装技术与实践 3.1改装法规与安全',
        children: ['c4', 'c7'],
      },
      {
        id: 'l1_6',
        label: '项目3：汽车改装技术与实践 3.2性能优化方案',
        children: ['c4'],
      },
      {
        id: 'l1_7',
        label: '项目4：汽车维护保养实务 4.1定期保养项目',
        children: ['c2'],
      },
      {
        id: 'l1_8',
        label: '项目4：汽车维护保养实务 4.2故障排除与应急处理',
        children: ['c2', 'c5'],
      },
      {
        id: 'l1_9',
        label: '项目5：汽车装配工艺 5.1装配流程与质量控制',
        children: ['c1', 'c2'],
      },
      {
        id: 'l1_10',
        label: '项目5：汽车装配工艺 5.2表面处理与防护技术',
        children: ['c6'],
      },
      {
        id: 'l1_11',
        label: '项目6：新能源汽车技术 6.1动力电池技术',
        children: ['c7', 'c8'],
      },
      {
        id: 'l1_12',
        label: '项目6：新能源汽车技术 6.2智能驾驶辅助系统',
        children: ['c8'],
      },
    ],
  },
  {
    title: '课程名称',
    key: 'course',
    items: [
      { id: 'c1', label: '汽车车身初级维修', children: [] },
      { id: 'c2', label: '汽车维修技术', children: [] },
      { id: 'c3', label: '汽车电气设备构造与维修', children: [] },
      { id: 'c4', label: '汽车改装技术', children: [] },
      { id: 'c5', label: '汽车检测与诊断技术', children: [] },
      { id: 'c6', label: '汽车钣金与喷漆', children: [] },
      { id: 'c7', label: '新能源汽车技术基础', children: [] },
      { id: 'c8', label: '智能网联汽车概论', children: [] },
      { id: 'c9', label: '汽车发动机构造与维修', children: [] },
      { id: 'c10', label: '汽车底盘构造与维修', children: [] },
    ],
  },
])

// 显示连线开关
const showConnections = ref(true)

// 搜索关键词
const searchKeyword = ref('')

// 搜索结果高亮
const searchResults = ref<Set<string>>(new Set())

// 当前选中的节点
const selectedNode = ref<string | null>(null)

// 激活的路径（所有相关联的节点）
const activePath = ref<Set<string>>(new Set())

// 搜索节点
const handleSearch = () => {
  searchResults.value.clear()

  if (!searchKeyword.value.trim()) {
    return
  }

  const keyword = searchKeyword.value.toLowerCase().trim()

  // 在所有列中搜索匹配的节点
  for (const column of columns.value) {
    for (const item of column.items) {
      if (item.label.toLowerCase().includes(keyword)) {
        searchResults.value.add(item.id)
      }
    }
  }
}

// 清空搜索
const clearSearch = () => {
  searchKeyword.value = ''
  searchResults.value.clear()
}

// 判断节点是否在搜索结果中
const isInSearchResults = (itemId: string) => {
  return searchResults.value.has(itemId)
}

// 获取每列的搜索结果数量
const getColumnSearchCount = (column: Column) => {
  return column.items.filter((item) => searchResults.value.has(item.id)).length
}

// 判断列是否有搜索结果
const hasSearchResults = (column: Column) => {
  return getColumnSearchCount(column) > 0
}

// 选择节点
const selectNode = (itemId: string) => {
  if (selectedNode.value === itemId) {
    // 取消选中
    selectedNode.value = null
    activePath.value.clear()
  } else {
    // 选中新节点
    selectedNode.value = itemId
    buildActivePath(itemId)
  }

  nextTick(() => {
    drawConnections()
  })
}

// 构建激活路径（递归查找所有子节点）
const buildActivePath = (nodeId: string) => {
  activePath.value.clear()
  activePath.value.add(nodeId)

  const queue = [nodeId]

  while (queue.length > 0) {
    const currentId = queue.shift()!

    // 在所有列中查找当前节点
    for (const column of columns.value) {
      const item = column.items.find((i) => i.id === currentId)
      if (item && item.children) {
        for (const childId of item.children) {
          if (!activePath.value.has(childId)) {
            activePath.value.add(childId)
            queue.push(childId)
          }
        }
      }
    }
  }
}

// 判断节点是否在激活路径中
const isInActivePath = (itemId: string) => {
  return activePath.value.has(itemId)
}

// 判断节点是否被选中
const isSelectedNode = (itemId: string) => {
  return selectedNode.value === itemId
}

// 连线数据
interface Connection {
  fromId: string
  toId: string
  fromEl: HTMLElement | null
  toEl: HTMLElement | null
}

const connectionLines = ref<Connection[]>([])

// 绘制连线
const drawConnections = () => {
  connectionLines.value = []

  if (!showConnections.value || !selectedNode.value) {
    return
  }

  // 遍历所有激活的节点，找出父子关系
  for (const nodeId of Array.from(activePath.value)) {
    // 找到这个节点
    for (const column of columns.value) {
      const item = column.items.find((i) => i.id === nodeId)
      if (item && item.children) {
        // 为每个子节点创建连线
        for (const childId of item.children) {
          if (activePath.value.has(childId)) {
            const fromEl = document.querySelector(`[data-id="${nodeId}"]`) as HTMLElement
            const toEl = document.querySelector(`[data-id="${childId}"]`) as HTMLElement

            if (fromEl && toEl) {
              connectionLines.value.push({
                fromId: nodeId,
                toId: childId,
                fromEl,
                toEl,
              })
            }
          }
        }
      }
    }
  }
}

// 计算连线路径
const getLinePath = (connection: Connection) => {
  if (!connection.fromEl || !connection.toEl) return ''

  const container = document.querySelector('.columns-container')
  if (!container) return ''

  const containerRect = container.getBoundingClientRect()
  const fromRect = connection.fromEl.getBoundingClientRect()
  const toRect = connection.toEl.getBoundingClientRect()

  // 起点：从元素右侧中心
  const x1 = fromRect.right - containerRect.left
  const y1 = fromRect.top + fromRect.height / 2 - containerRect.top

  // 终点：到元素左侧中心
  const x2 = toRect.left - containerRect.left
  const y2 = toRect.top + toRect.height / 2 - containerRect.top

  // 使用更平滑的贝塞尔曲线（减小弯曲程度）
  const dx = x2 - x1
  const cp1x = x1 + dx * 0.3 // 从 0.5 改为 0.3，减小弯曲
  const cp1y = y1
  const cp2x = x1 + dx * 0.7 // 从 0.5 改为 0.7，减小弯曲
  const cp2y = y2

  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2}`
}

// 监听滚动事件，重新绘制连线
const handleScroll = () => {
  if (showConnections.value && selectedNode.value) {
    drawConnections()
  }
}

// 组件挂载后绘制连线并添加滚动监听
onMounted(() => {
  nextTick(() => {
    const scrollContainers = document.querySelectorAll('.column-items')
    scrollContainers.forEach((container) => {
      container.addEventListener('scroll', handleScroll)
    })
  })
})

// 监听开关变化，重新绘制连线
watch(showConnections, () => {
  nextTick(() => {
    drawConnections()
  })
})
</script>

<template>
  <main class="career-map-container">
    <!-- 顶部标签页 - 居中显示 -->
    <div class="tabs-header">
      <div class="tabs-wrapper">
        <button class="tab active">图谱</button>
      </div>

      <!-- 搜索框 -->
      <div class="search-box">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜索节点..."
          class="search-input"
          @input="handleSearch"
          @keyup.enter="handleSearch"
        />
        <button v-if="searchKeyword" class="clear-btn" @click="clearSearch">×</button>
      </div>

      <div class="mode-toggle">
        <span>显示连线:</span>
        <label class="switch">
          <input v-model="showConnections" type="checkbox" />
          <span class="slider"></span>
        </label>
      </div>
    </div>

    <!-- 多列布局 - 添加包裹层以限制连线范围 -->
    <div class="columns-wrapper">
      <div class="columns-container">
        <!-- SVG 连线层 - 放在列容器内部 -->
        <svg v-if="showConnections" class="connection-lines">
          <defs>
            <!-- 圆点标记替代箭头 -->
            <marker
              id="dot-marker"
              markerWidth="10"
              markerHeight="10"
              refX="5"
              refY="5"
              markerUnits="userSpaceOnUse"
            >
              <circle cx="5" cy="5" r="4" fill="#FF6B9D" />
            </marker>
          </defs>
          <path
            v-for="(connection, index) in connectionLines"
            :key="`${connection.fromId}-${connection.toId}-${index}`"
            :d="getLinePath(connection)"
            stroke="#FF6B9D"
            stroke-width="2"
            stroke-dasharray="5,3"
            fill="none"
            marker-end="url(#dot-marker)"
            class="connection-path"
          />
        </svg>
        <!-- 前四列（岗位、领域、任务、技能）整体 -->
        <div class="column-group column-group-left">
          <div
            v-for="(column, idx) in columns.slice(0, 4)"
            :key="column.key"
            :class="['column', `column-group1-${idx}`]"
          >
            <div :class="['column-header', `header-group1-${idx}`]">
              {{ column.title }}
              <span v-if="hasSearchResults(column)" class="search-result-badge">
                {{ getColumnSearchCount(column) }}
              </span>
            </div>
            <div class="column-items">
              <div
                v-for="item in column.items"
                :key="item.id"
                :data-id="item.id"
                :class="[
                  'column-item',
                  {
                    selected: isSelectedNode(item.id),
                    active: isInActivePath(item.id),
                    inactive: selectedNode && !isInActivePath(item.id),
                    'search-highlight': isInSearchResults(item.id),
                  },
                ]"
                @click="selectNode(item.id)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>

        <!-- 后三列（二级节点、一级节点、课程）整体 -->
        <div class="column-group column-group-right">
          <div
            v-for="(column, idx) in columns.slice(4, 7)"
            :key="column.key"
            :class="['column', `column-group2-${idx}`]"
          >
            <div :class="['column-header', `header-group2-${idx}`]">
              {{ column.title }}
              <span v-if="hasSearchResults(column)" class="search-result-badge">
                {{ getColumnSearchCount(column) }}
              </span>
            </div>
            <div class="column-items">
              <div
                v-for="item in column.items"
                :key="item.id"
                :data-id="item.id"
                :class="[
                  'column-item',
                  {
                    selected: isSelectedNode(item.id),
                    active: isInActivePath(item.id),
                    inactive: selectedNode && !isInActivePath(item.id),
                    'search-highlight': isInSearchResults(item.id),
                  },
                ]"
                @click="selectNode(item.id)"
              >
                {{ item.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.career-map-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 顶部标签页 */
.tabs-header {
  max-width: 1600px;
  width: fit-content;
  min-width: 1500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
  position: relative;
}

/* 列包裹层 - 限制连线范围 */
.columns-wrapper {
  max-width: 1600px;
  width: fit-content;
  min-width: 1500px;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.columns-container {
  position: relative;
  z-index: 1;
  isolation: isolate;
  display: flex;
  gap: 40px;
  align-items: flex-start;
  margin: 0 auto;
}

.tabs-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.tab {
  background: transparent;
  border: none;
  color: white;
  font-size: 22px;
  padding: 10px 30px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s;
  font-weight: bold;
}

/* 搜索框 */
.search-box {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.search-input {
  width: 200px;
  padding: 8px 30px 8px 12px;
  border: none;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  font-size: 14px;
  outline: none;
  transition: all 0.3s;
}

.search-input:focus {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
}

.search-input::placeholder {
  color: #999;
}

.clear-btn {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: #666;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;
}

.clear-btn:hover {
  color: #333;
}

.mode-toggle {
  position: absolute;
  right: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-size: 14px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.3);
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #4caf50;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* 列组容器 */
.column-group {
  display: flex;
  gap: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  overflow: visible;
  background: transparent;
  padding: 0;
  position: relative;
  z-index: auto;
}

/* 左侧四列组 */
.column-group-left {
  border-radius: 12px;
  padding: 0;
}

/* 右侧三列组 */
.column-group-right {
  border-radius: 12px;
  padding: 0;
}

/* 单列 */
.column {
  flex-shrink: 0;
  width: 200px;
  background: transparent;
  overflow: hidden;
  border-radius: 0;
  position: relative;
  z-index: auto;
}

/* 第一组第一列 - 左边圆角 */
.column-group1-0 {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

/* 第一组第四列 - 右边圆角 */
.column-group1-3 {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

/* 第二组第一列 - 左边圆角 */
.column-group2-0 {
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
}

/* 第二组第三列 - 右边圆角 */
.column-group2-2 {
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
}

.column-header {
  color: white;
  padding: 15px 12px;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(139, 127, 255, 0.2);
  position: sticky;
  top: 0;
  z-index: 100;
  background: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* 搜索结果徽章 */
.search-result-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  background: rgba(245, 158, 11, 0.9);
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* 第一组头部渐变 - 紫色系从深到浅（左到右） */
.header-group1-0 {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.header-group1-1 {
  background: linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%);
}

.header-group1-2 {
  background: linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%);
}

.header-group1-3 {
  background: linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 100%);
}

/* 第二组头部渐变 - 粉色系从浅到深（左到右） */
.header-group2-0 {
  background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
}

.header-group2-1 {
  background: linear-gradient(135deg, #fbcfe8 0%, #f9a8d4 100%);
}

.header-group2-2 {
  background: linear-gradient(135deg, #f9a8d4 0%, #f472b6 100%);
}

.column-items {
  max-height: 500px;
  overflow-y: auto;
  padding: 8px;
  position: relative;
  z-index: 2;
  background: white;
}

/* 滚动条样式 */
.column-items::-webkit-scrollbar {
  width: 6px;
}

.column-items::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.column-items::-webkit-scrollbar-thumb {
  background: #c7c7c7;
  border-radius: 3px;
}

.column-items::-webkit-scrollbar-thumb:hover {
  background: #a0a0a0;
}

/* 列表项 */
.column-item {
  padding: 12px 10px;
  margin-bottom: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 13px;
  line-height: 1.4;
  background: white;
  border: 1px solid transparent;
  color: #999;
}

.column-item:hover {
  background: #f8f8ff;
  border-color: #e0e0ff;
}

/* 激活状态（在连线路径中） */
.column-item.active {
  color: #333;
  background: white;
  border-color: #d0d0ff;
}

/* 选中状态 */
.column-item.selected {
  background: linear-gradient(135deg, #8b7fff 0%, #a78bfa 100%);
  color: white;
  font-weight: 500;
  border-color: #8b7fff;
  box-shadow: 0 2px 8px rgba(139, 127, 255, 0.4);
}

/* 非激活状态（有选中节点但不在路径中） */
.column-item.inactive {
  opacity: 0.3;
  color: #ccc;
}

/* 搜索高亮状态 */
.column-item.search-highlight {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: white;
  font-weight: 500;
  border-color: #f59e0b;
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
  animation: highlight-pulse 1.5s ease-in-out infinite;
}

@keyframes highlight-pulse {
  0%,
  100% {
    box-shadow: 0 2px 8px rgba(245, 158, 11, 0.4);
  }
  50% {
    box-shadow: 0 4px 16px rgba(245, 158, 11, 0.6);
  }
}

/* SVG 连线层 */
.connection-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 50;
  overflow: visible;
}

.connection-path {
  opacity: 0.85;
  transition: all 0.3s ease;
  filter: drop-shadow(0 1px 2px rgba(255, 107, 157, 0.3));
}

.connection-path:hover {
  opacity: 1;
  stroke-width: 2.5;
  filter: drop-shadow(0 2px 4px rgba(255, 107, 157, 0.5));
}

/* 响应式 */
@media (max-width: 1200px) {
  .column {
    width: 180px;
  }

  .columns-container {
    gap: 25px;
  }

  .column-group {
    gap: 0;
  }
}
</style>
