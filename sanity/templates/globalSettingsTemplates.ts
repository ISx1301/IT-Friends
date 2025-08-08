import { SUPPORTED_LANGS } from '../constants'

export const globalSettingsTemplates = SUPPORTED_LANGS.map((lang) => ({
  id: `globalSettings-${lang.id}-base`,
  title: `Налаштування (${lang.title})`,
  schemaType: 'globalSettings',
  value: () => ({
    language: lang.id,
  }),
}))