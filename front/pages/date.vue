<script setup lang="ts">
import { ref } from 'vue'
import type dayjs from 'dayjs'

const selectedDate = ref<dayjs.Dayjs | undefined>()

const handleDateSelect = (date: dayjs.Dayjs) => {
  selectedDate.value = date
}
</script>
<template>
    <section class="flex h-screen">
        <section class="w-3/4">
            <MonthDate @select-date="handleDateSelect"/>
        </section>
        <section class="w-1/4">
            <DayDate :selected-date="selectedDate"/>
        </section>
    </section>
</template>
