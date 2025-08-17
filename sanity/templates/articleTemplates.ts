import type { Template } from 'sanity'
import { SUPPORTED_LANGS } from '../constants'

export const articleTemplates: Template[] = SUPPORTED_LANGS.map((lang) => ({
  id: `blog-${lang.id}-base`,
  title: `Нова стаття (${lang.title})`,
  schemaType: 'blog',
  value: {
    language: lang.id,
  },
}))
