<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import mockDates from '@/mock/dateevent'

// 日期處理
const today = ref(dayjs())
const Year = computed(() => today.value.year())
const Month = computed(() => today.value.month())

const week = ['一', '二', '三', '四', '五', '六', '日']

const calendarDays = computed(() => {
  const days: { date: dayjs.Dayjs; inCurrentMonth: boolean }[] = []
  const firstDayOfMonth = dayjs(new Date(Year.value, Month.value, 1))
  const dayOfWeek = firstDayOfMonth.day()
  const offsetToMonday = (dayOfWeek + 6) % 7
  const startDay = firstDayOfMonth.subtract(offsetToMonday, 'day')
  const endDay = startDay.add(41, 'day')

  let current = startDay.clone()
  while (current.isBefore(endDay) || current.isSame(endDay, 'day')) {
    days.push({
      date: current,
      inCurrentMonth: current.month() === Month.value,
    })
    current = current.add(1, 'day')
  }

  return days
})

// 月份切換與今日判斷
function prevMonth() {
  today.value = today.value.subtract(1, 'month')
}

function nextMonth() {
  today.value = today.value.add(1, 'month')
}

function isToday(date: dayjs.Dayjs) {
  return date.isSame(dayjs(), 'day')
}

// Event 型別（包含 color）
interface Event {
  _id: number | string
  title: string
  start: string | Date
  end: string | Date
  color: string
}

function isEventStartOnDate(event: Event, date: dayjs.Dayjs) {
  return dayjs(event.start).isSame(date, 'day')
}

function getSpanDays(event: Event) {
  const start = dayjs(event.start)
  const end = dayjs(event.end)
  return Math.min(end.diff(start, 'day') + 1, 42)
}

function getEventOffsetInRow(date: dayjs.Dayjs) {
  return (date.day() + 6) % 7
}
// 事件條垂直堆疊計算
const eventPositions = computed(() => {
  // key: yyyy-mm-dd，value: 此日已使用的事件堆疊索引陣列（事件 _id）
  const positionsMap: Record<string, Array<string | number>> = {}

  // 格式化日期字串
  function dateKey(date: dayjs.Dayjs) {
    return date.format('YYYY-MM-DD')
  }

  // 存放事件ID => 堆疊位置
  const eventPosMap: Record<string | number, number> = {}

  mockDates.forEach(event => {
    // 找事件開始的日期（在 calendarDays 裡）
    const startDay = calendarDays.value.find(d => isEventStartOnDate(event, d.date))
    if (!startDay) return

    const key = dateKey(startDay.date)
    if (!positionsMap[key]) positionsMap[key] = []

    // 找第一個可用位置
    let pos = 0
    while (positionsMap[key][pos]) pos++
    positionsMap[key][pos] = event._id

    eventPosMap[event._id] = pos
  })

  return eventPosMap
})
</script>


<template>
  <section class="h-[100dvh] w-full flex flex-col bg-gray-50">
    <!-- Header -->
    <header class="flex items-center justify-between p-2 bg-white rounded-t-lg">
      <button @click="prevMonth" class="btn btn-ghost text-gray-500 transition">
        <Icon name="fluent:chevron-left-24-regular" size="24" />
      </button>
      <h1 class="text-lg font-bold">
        {{ today.format('YYYY 年 M 月') }}
      </h1>
      <button @click="nextMonth" class="btn btn-ghost text-gray-500 transition">
        <Icon name="fluent:chevron-right-24-regular" size="24" />
      </button>
    </header>

<!-- Calendar -->
<div class="flex-1 grid grid-rows-[auto_1fr]">
  <!-- Weekdays -->
  <div class="grid grid-cols-7 text-center text-sm text-gray-600 font-semibold bg-base-100">
    <div v-for="day in week" :key="day" class="py-2">{{ day }}</div>
  </div>

  <!-- Dates -->
  <div class="relative grid grid-cols-7 grid-rows-6 flex-1 bg-white">
    <!-- Date Cells -->
    <div
      v-for="(day, index) in calendarDays"
      :key="index"
      class="relative border border-base-100 hover:border-gray-200 transition text-sm cursor-pointer"
      :class="[
        day.inCurrentMonth ? 'text-black' : 'text-gray-300',
        isToday(day.date)
          ? 'bg-base-200 text-black font-bold hover:bg-base-300'
          : 'hover:bg-base-300 hover:text-black',
      ]"
      @click="$emit('selectDate', day.date)"
    >
      <div class=" text-center pr-1 pt-0.5 h-[20px]">
        {{ day.date.date() }}
      </div>
    </div>

     <!-- Event Bars -->
  <div v-for="event in mockDates" :key="event._id">
    <div v-if="calendarDays.find(d => isEventStartOnDate(event, d.date))">
      <div
        v-for="startDay in calendarDays.filter(d => isEventStartOnDate(event, d.date))"
        :key="startDay.date.toString()"
        class="absolute h-[18px] text-[10px] text-white rounded px-2 py-0.5 overflow-hidden whitespace-nowrap"
        :style="{
          backgroundColor: event.color || '#3b82f6',
          top: `calc(${Math.floor(calendarDays.findIndex(d =>
            d.date.isSame(startDay.date, 'day')
          ) / 7) * (100 / 6)}% + 1.5rem + ${eventPositions[event._id] * 22}px)`,
          left: `calc(${getEventOffsetInRow(startDay.date) * (100 / 7)}%)`,
          width: `calc(${Math.min(getSpanDays(event), 7 - getEventOffsetInRow(startDay.date)) * (100 / 7)}%)`
        }"
      >
        {{ event.title }}
      </div>
    </div>
  </div>
  </div>
</div>

    
  </section>
</template>
