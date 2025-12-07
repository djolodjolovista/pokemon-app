import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import pokemonEn from './locales/en/pokemon.json'
import globalEn from './locales/en/global.json'
import loginEn from './locales/en/login.json'
import navbarEn from './locales/en/navbar.json'
import toastEn from './locales/en/toast.json'
import globalSr from './locales/sr/global.json'
import loginSr from './locales/sr/login.json'
import navbarSr from './locales/sr/navbar.json'
import pokemonSr from './locales/sr/pokemon.json'
import toastSr from './locales/sr/toast.json'

export const resources = {
  en: {
    global: globalEn,
    login: loginEn,
    navbar: navbarEn,
    pokemon: pokemonEn,
    toast: toastEn,
  },
  sr: {
    global: globalSr,
    login: loginSr,
    navbar: navbarSr,
    pokemon: pokemonSr,
    toast: toastSr,
  },
} as const

const savedLanguage = localStorage.getItem('language') || 'sr'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: savedLanguage,
  debug: import.meta.env.DEV,

  interpolation: {
    escapeValue: false,
  },
  resources,
})

export default i18n
