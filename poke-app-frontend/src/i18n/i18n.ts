import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enFashionTranslation from './locales/en/translation.json'
import srFashionTranslation from './locales/sr/translation.json'

const savedLanguage = localStorage.getItem('language') || 'sr'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: savedLanguage,
  debug: true,

  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: enFashionTranslation,
    },
    sr: {
      translation: srFashionTranslation,
    },
  },
})

export default i18n
