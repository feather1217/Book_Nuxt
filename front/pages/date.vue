<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import mockDates from '@/mock/dateevent'
import type { Color } from '@/models/Date'
import type Group from '@/models/Group'

const selectedDate = ref<dayjs.Dayjs | undefined>()
const showModal = ref(false)

// 獲取群組列表
const groups = computed(() => {
  const uniqueGroups = new Set(
    mockDates
      .filter(event => event.group)
      .map(event => event.group)
  )
  return Array.from(uniqueGroups) as Group[]
})

// 新事件表單數據
const newEvent = ref({
  title: '',
  start: '',
  end: '',
  remark: '',
  all_day: false,
  group_id: null as number | null,
  color: '#2196F3' as Color
})

const handleDateSelect = (date: dayjs.Dayjs) => {
  selectedDate.value = date
}

function openNewEventModal() {
  const defaultStartTime = selectedDate.value?.hour(9).minute(0).second(0) || dayjs().hour(9).minute(0).second(0)
  const defaultEndTime = defaultStartTime.add(1, 'hour')
  
  newEvent.value = {
    title: '',
    start: defaultStartTime.format('YYYY-MM-DDTHH:mm'),
    end: defaultEndTime.format('YYYY-MM-DDTHH:mm'),
    remark: '',
    all_day: false,
    group_id: null,
    color: '#2196F3'
  }
  showModal.value = true
}

function handleSubmit() {
  const newId = Math.max(...mockDates.map(d => Number(d._id))) + 1
  const event = {
    _id: newId,
    title: newEvent.value.title,
    start: new Date(newEvent.value.start),
    end: new Date(newEvent.value.end),
    remark: newEvent.value.remark,
    all_day: newEvent.value.all_day,
    group_id: newEvent.value.group_id,
    color: newEvent.value.color,
    group: groups.value.find(g => g._id === newEvent.value.group_id)
  }
  
  mockDates.push(event)
  showModal.value = false
}
</script>
<template>
  <div class="h-screen">
    <div class="flex h-full">
      <div class="w-3/4">
        <MonthDate 
          :events="mockDates"
          @select-date="handleDateSelect"
        />
      </div>
      <div class="w-1/4">
        <DayDate 
          :events="mockDates"
          :selected-date="selectedDate"
        />
      </div>
    </div>

    <!-- 新增事件按鈕 -->
    <button 
      class="fixed right-8 bottom-8 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary-focus transition-colors"
      @click="openNewEventModal"
    >
      <Icon name="ic:baseline-add" size="24" class="mx-auto" />
    </button>

    <!-- 新增事件模態框 -->
    <dialog :open="showModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg mb-4">新增事件</h3>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- 標題 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">標題</span>
            </label>
            <input 
              v-model="newEvent.title"
              type="text" 
              class="input input-bordered" 
              required
            />
          </div>

          <!-- 全天事件 -->
          <div class="form-control">
            <label class="label cursor-pointer">
              <span class="label-text">全天事件</span>
              <input 
                v-model="newEvent.all_day"
                type="checkbox" 
                class="checkbox" 
              />
            </label>
          </div>

          <!-- 時間 -->
          <div class="grid grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">開始時間</span>
              </label>
              <input 
                v-model="newEvent.start"
                :type="newEvent.all_day ? 'date' : 'datetime-local'"
                class="input input-bordered" 
                required
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">結束時間</span>
              </label>
              <input 
                v-model="newEvent.end"
                :type="newEvent.all_day ? 'date' : 'datetime-local'"
                class="input input-bordered" 
                required
              />
            </div>
          </div>

          <!-- 備註 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">備註</span>
            </label>
            <textarea 
              v-model="newEvent.remark"
              class="textarea textarea-bordered" 
              rows="3"
            ></textarea>
          </div>

          <!-- 群組選擇 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">群組</span>
            </label>
            <select 
              v-model="newEvent.group_id"
              class="select select-bordered w-full"
            >
              <option :value="null">無</option>
              <option 
                v-for="group in groups" 
                :key="group._id"
                :value="group._id"
              >
                {{ group.name }}
              </option>
            </select>
          </div>

          <!-- 顏色選擇 -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">顏色</span>
            </label>
            <input 
              v-model="newEvent.color"
              type="color" 
              class="input input-bordered h-12 w-full" 
            />
          </div>

          <!-- 按鈕 -->
          <div class="modal-action">
            <button type="button" class="btn" @click="showModal = false">取消</button>
            <button type="submit" class="btn btn-primary">確認</button>
          </div>
        </form>
      </div>
      
      <form method="dialog" class="modal-backdrop">
        <button @click="showModal = false">close</button>
      </form>
    </dialog>
  </div>
</template>
