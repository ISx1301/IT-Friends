import { sanityClient } from 'sanity:client'
import { DEFAULT_LANG } from '@/constants'

export const query = async <T>(groq: string, params: Record<string, unknown> = {}) =>
  sanityClient.fetch<T>(groq, { fallbackLang: DEFAULT_LANG, ...params })
