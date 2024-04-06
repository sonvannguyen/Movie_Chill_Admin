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
  },
  // runtimeConfig: {
  //   public: {
  //     BACKEND_AWS_REGION: process.env.BACKEND_AWS_REGION,
  //     BACKEND_AWS_COGNITO_IDENTITY_POOL_ID:
  //       process.env.BACKEND_AWS_COGNITO_IDENTITY_POOL_ID,
  //     HISTORY_TABLE: process.env.HISTORY_TABLE,
  //     MASTER_TABLE: process.env.MASTER_TABLE,
  //     NEWS_TABLE: process.env.NEWS_TABLE,
  //     ALTERNATIVE_DATA_TABLE: process.env.ALTERNATIVE_DATA_TABLE,
  //     FOREST_CREDIT_MARKETPLACE_TABLE:
  //       process.env.FOREST_CREDIT_MARKETPLACE_TABLE,
  //     INTERNAL_CARBON_PRICE_TABLE: process.env.INTERNAL_CARBON_PRICE_TABLE,
  //     // Firebase config
  //     GA_API_KEY: process.env.GA_API_KEY,
  //     GA_AUTH_DOMAIN: process.env.GA_AUTH_DOMAIN,
  //     GA_PROJECT_ID: process.env.GA_PROJECT_ID,
  //     GA_STORAGE_BUCKET: process.env.GA_STORAGE_BUCKET,
  //     GA_MESSAGING_SENDER_ID: process.env.GA_MESSAGING_SENDER_ID,
  //     GA_APP_ID: process.env.GA_APP_ID,
  //     GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
  //   },
  // },
})
