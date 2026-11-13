import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import hi from './hi'
import { prefService } from '@/services/prefService'

const initial = prefService.getLang() ?? (navigator.language?.startsWith('hi') ? 'hi' : 'en')

i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, hi: { translation: hi } },
  lng: initial,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  returnNull: false,
})

const applyLang = (lng: string) => {
  document.documentElement.lang = lng
}
applyLang(initial)
i18n.on('languageChanged', (lng) => {
  applyLang(lng)
  prefService.setLang(lng as 'en' | 'hi')
})

export default i18n
