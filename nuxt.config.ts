// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'

export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "@/assets/scss/colors.scss" as *;
            @use "@/assets/scss/classes.scss" as *;
          `,
        },
      },
    },
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
  components: [
    { path: '~/components/common', extensions: ['.vue'] },
    { path: '~/components/dashboard', extensions: ['.vue'] },
    { path: '~/components/movie', extensions: ['.vue'] },
    '~/components',
  ],
  app: {
    baseURL: '/',
    head: {
      link: [{ rel: 'icon', type: 'image/png', href: '/icon.png' }],
    },
  },
})
