// https://nuxt.com/docs/api/configuration/nuxt-config
import { config as loadDotenv } from 'dotenv'

// Convex writes its env vars to .env.local but Nuxt only auto-loads .env.
loadDotenv({ path: '.env.local' })

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-gtag', '@netlify/nuxt'],
  gtag: {
    id: 'G-E7H3CRVBN6',
  },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      convexUrl: process.env.CONVEX_URL
    }
  },
  app: {
    head: {
      title: 'HVAC Grader — Free website health score',
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600&family=JetBrains+Mono:wght@500&display=swap'
        }
      ]
    }
  }
})
