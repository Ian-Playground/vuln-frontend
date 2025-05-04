// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-03-13',
  rootDir: './',

  future: {
    compatibilityVersion: 4,
  },


  nitro: {
    preset: 'node-server'
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  /**
   * Manually disable nuxt telemetry.
   * @see [Nuxt Telemetry](https://github.com/nuxt/telemetry) for more information.
   */
  telemetry: true,

  $development: {
    ssr: true,
    devtools: {
      enabled: false,
    },
  },

  $production: {
    ssr: true,
  },

  app: {
    head: {
      title: 'Home',
      titleTemplate: '%s | Vuln Management',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
    },
  },

  routeRules: {
    'auth/verify': { ssr: false }
  },

  css: ['~/assets/css/main.css'],

  /**
   * @see https://v3.nuxtjs.org/api/configuration/nuxt.config#modules
   */
  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@pinia/nuxt',
    'dayjs-nuxt',
    'nuxt-security',
  ],

  image: {
    domains: [
      process.env.APP_URL || 'http://127.0.0.1:8000'
    ],
    alias: {
      api: process.env.APP_URL || 'http://127.0.0.1:8000'
    }
  },

  security: {
    headers: {
      crossOriginEmbedderPolicy: 'unsafe-none',
      crossOriginOpenerPolicy: 'same-origin-allow-popups',
      contentSecurityPolicy: {
        "img-src": ["'self'", "data:", "https://*", process.env.APP_URL || 'http://127.0.0.1:8000'],
      },
    },
  },

  dayjs: {
    locales: ['en'],
    plugins: ['relativeTime', 'utc', 'timezone'],
    defaultLocale: 'en',
    defaultTimezone: process.env.APP_TIMEZONE,
  },

  typescript: {
    strict: true,
  },

  /**
   * @see https://v3.nuxtjs.org/guide/features/runtime-config#exposing-runtime-config
   */
  runtimeConfig: {
    apiLocal: process.env.API_LOCAL_URL || "http://localhost:8000",
    public: {
      apiBase: process.env.APP_URL || "http://localhost:8000",
      apiPrefix: '/api/v1',
    },
  },
})
