import 'server-only'
import type { Locale } from '@/i18n.config'

const dictionaries = {
  en: () => import('@/dictionaries/en.json').then(module => module.default),
  he: () => import('@/dictionaries/he.json').then(module => module.default),
  zh_hans: () => import('@/dictionaries/zh_hans.json').then(module => module.default),
  zh_hant: () => import('@/dictionaries/zh_hant.json').then(module => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
