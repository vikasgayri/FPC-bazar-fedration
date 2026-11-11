import { useTranslation } from 'react-i18next'
import { useCallback } from 'react'
import type { LText, Lang } from '@/types'
import { lt } from '@/utils/format'

/** i18n helper: `t` for UI strings, `L` for bilingual content objects. */
export function useLang() {
  const { t, i18n } = useTranslation()
  const lang = (i18n.language?.startsWith('hi') ? 'hi' : 'en') as Lang
  const L = useCallback((x: LText | undefined) => lt(x, lang), [lang])
  const setLang = (l: Lang) => i18n.changeLanguage(l)
  return { t, L, lang, setLang, isHi: lang === 'hi' }
}
