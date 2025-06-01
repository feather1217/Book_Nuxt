<template>
  <section class="h-[90vh] max-w-3xl mx-auto flex flex-col bg-gray-50 rounded-lg shadow-md">
    <!-- Header -->
    <header class="flex items-center justify-between px-4 py-2 bg-white rounded-t-lg border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-700">{{ displayDate.format('YYYY年M月D日') }} 日程表</h2>
    </header>

    <div class="flex flex-1 bg-white rounded-b-lg overflow-hidden border border-gray-200">
      <!-- 時間軸 -->
      <div class="w-14 bg-base-100 border-r border-gray-200 select-none">
        <div v-for="hour in 24" :key="hour" class="h-14 leading-[56px] text-xs text-gray-500 text-right pr-2">
          {{ hour - 1 < 10 ? '0' + (hour - 1) : hour - 1 }}:00
        </div>
      </div>

      <!-- 事件容器 (有垂直滾動條) -->
      <div
        class="relative flex-1 overflow-y-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        style="max-height: calc(90vh - 3.5rem);"  
      >
        <!-- 時間格線 -->
        <div v-for="hour in 24" :key="'line-' + hour" class="absolute left-0 right-0 border-t border-gray-200"
          :style="{ top: (hour - 1) * 56 + 'px' }"
        ></div>

        <!-- 事件塊 -->
        <div
          v-for="event in events"
          :key="event._id"
  class="absolute left-2 right-2 text-white rounded-md px-2 py-1 shadow-md cursor-pointer hover:brightness-90 transition-all"
  :style="{ ...getEventStyle(event), backgroundColor: event.color }"
          :title="`${event.title} (${event.start} - ${event.end})`"
        >
          {{ event.title }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import dayjs from 'dayjs'
import mockDates from '@/mock/dateevent'

const props = defineProps<{
  selectedDate?: dayjs.Dayjs
}>()

// 如果沒有選擇日期，使用當天
const displayDate = computed(() => props.selectedDate || dayjs())

// 篩選當天的事件
const events = computed(() => {
  return mockDates.filter(event => {
    const eventDate = dayjs(event.start)
    return eventDate.isSame(displayDate.value, 'day')
  }).map(event => ({
    _id: event._id,
    title: event.title,
    start: dayjs(event.start).format('HH:mm'),
    end: dayjs(event.end).format('HH:mm'),
    color: event.color
  }))
})

const hourHeight = 56 // 1小時高度 px

function timeToDecimal(t: string) {
  const [hh, mm] = t.split(':').map(Number)
  return hh + mm / 60
}

function getEventStyle(event: { start: string; end: string }) {
  const startDecimal = timeToDecimal(event.start)
  const endDecimal = timeToDecimal(event.end)
  const duration = endDecimal - startDecimal

  return {
    top: `${startDecimal * hourHeight}px`,
    height: `${duration * hourHeight}px`,
  }
}
</script>

<style scoped>
/* 滾動條美化 */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: #d1d5db #f3f4f6;
}

.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 3px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 3px;
  border: none;
}
</style>
