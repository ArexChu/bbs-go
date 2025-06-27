const ssr = process.env.NUXT_SSR === 'false' ? false : true
const serverURL = import.meta.env.SERVER_URL || 'http://localhost:8082'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  ssr: ssr,
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    // https://color-mode.nuxtjs.org/#configuration
    '@nuxtjs/color-mode',
    '@element-plus/nuxt',
    ['nuxt-lazy-load', {
      images: true,
      videos: true,
      audios: true,
      iframes: true,
      native: true,
      directiveOnly: false,

      // Default image must be in the public folder
      // defaultImage: '/images/default-image.jpg',

      // To remove class set value to false
      loadingClass: 'isLoading',
      loadedClass: 'isLoaded',
      appendClass: 'lazyLoad',

      observerConfig: {
        // See IntersectionObserver documentation
      },
    }],
    '@nuxtjs/i18n',
  ],

  plugins: [
  ],

  elementPlus: {
    defaultLocale: 'zh-cn',
  },

  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    storageKey: 'bbsgo-color-mode',
    classPrefix: 'theme-',
    classSuffix: '',
  },

  imports: {
    dirs: [
      'apis',
      'stores',
    ],
  },

  app: {
    head: {
      title: 'BBS-GO',
      htmlAttrs: { class: 'theme-light has-navbar-fixed-top' },
      script: [
        {
          src: 'https://hm.baidu.com/hm.js?79b8ff82974d0769ef5c629e4cd46629',
          type: 'text/javascript',
          async: true
        }
      ]
    },
  },

  css: [
    '~/assets/css/index.scss',
  ],

  nitro: {
    routeRules: {
      '/api/**': {
        proxy: `${serverURL}/api/**`,
      },
      '/admin/**': {
        proxy: `${serverURL}/admin/**`,
      },
    },
  },

  // @ts-ignore
  i18n: {
    langDir: '../src/locales/',
    locales: [
      { code: 'en-US', language: 'en-US', file: "en-US.js" },
      { code: 'zh-CN', language: 'zh-CN', file: "zh-CN.js" }
    ],
    defaultLocale: 'en-US',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    lazy: false,
  },
})