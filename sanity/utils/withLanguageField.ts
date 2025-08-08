import { defineField, defineType, SchemaTypeDefinition } from 'sanity'
import { SUPPORTED_LANGS } from '../constants'

const languageField = defineField({
  name: 'language',
  title: 'Language',
  type: 'string',
  options: {
    list: SUPPORTED_LANGS.map(l => ({ title: l.title, value: l.id })),
  },
  hidden: true,
  readOnly: true,
})

export function withLanguageField(
  types: SchemaTypeDefinition[],
  targetNames: string[]
): SchemaTypeDefinition[] {
  return types.map((t) => {
    if (t.type !== 'document' || !targetNames.includes(t.name)) return t

    const fields = Array.isArray((t as any).fields) ? [...(t as any).fields] : []

    if (fields.some((f: any) => f?.name === 'language')) return t

    return defineType({
      ...(t as any),
      fields: [languageField, ...fields],
    })
  })
}