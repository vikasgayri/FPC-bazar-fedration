import { demoStore } from './storage'

/** UI preferences kept in the browser (language). */
export const prefService = {
  getLang: (): 'en' | 'hi' | null => demoStore.get<'en' | 'hi' | null>('lang', null),
  setLang: (l: 'en' | 'hi') => demoStore.set('lang', l),
}
