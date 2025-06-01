<script setup lang="ts">

</script>

<template>
  <div class="flex flex-col min-h-screen space-y-5 p-2">
    <!-- Sticky Header -->
    <header class="sticky top-0 z-50 bg-base-100">
      <SystemMenu />
    </header>

    <!-- Slot content -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- Footer -->
    <footer>
      <!-- 可以加點內容 -->
    </footer>
  </div>
</template>