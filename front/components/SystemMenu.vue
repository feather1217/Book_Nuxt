<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const info = [
    { name: '行事曆', link: '/date', icon: 'fluent:calendar-date-24-regular' },
    { name: '記事本', link: '/note', icon: 'hugeicons:note-04' },
    { name: '甘特圖', link: '/timeline', icon: 'solar:sort-by-time-linear' },
    { name: '群組', link: '/group', icon: 'mingcute:group-line' },
    { name: '設定', link: '/setting', icon: 'mi:settings' }
]

const drawerCheckbox = ref<HTMLInputElement | null>(null)

function closeDrawer() {
    if (drawerCheckbox.value) drawerCheckbox.value.checked = false
}

// 新增：取得目前路由的中文名稱
const title = computed(() => {
    return info.find(item => route.path.startsWith(item.link))?.name || ''
})
</script>

<template>
    <div class="drawer">
        <input id="my-drawer" type="checkbox" class="drawer-toggle" ref="drawerCheckbox" />
        <div class="drawer-content flex items-center space-x-2">
            <!-- Page content here -->
            <label for="my-drawer" class="btn btn-ghost drawer-button ">
                <Icon name="majesticons:menu-line" size="32" />
            </label>                
            <span class="hidden md:inline text-xl font-bold">{{ title }}</span>
        </div>

        <div class="drawer-side">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-base-200 text-base-content min-h-full w-80 space-y-5 p-0">
                <div class="bg-base-300 px-4 py-2 h-30 flex items-center space-x-3">
                    <div class="avatar">
                        <div class="w-16 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                        </div>
                    </div>
                    <span class="text-2xl font-bold">羽毛毛</span>
                </div>

                <li
                    v-for="item in info"
                    :key="item.name"
                    class="m-3"
                    :class="{ 'bg-base-300 rounded-lg': route.path === item.link }"
                >
                    <NuxtLink
                        :to="item.link"
                        class="flex items-center p-2 rounded-lg transition-all duration-200"
                        @click="closeDrawer"
                    >
                        <Icon :name="item.icon" size="24" class="mr-2" />
                        <span class="hidden md:inline text-xl font-bold">{{ item.name }}</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>
