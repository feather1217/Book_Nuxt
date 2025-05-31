import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss()
    ],
  },
  devtools: { enabled: true },
   // plugins: [],
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/eslint'
  ],

  
})