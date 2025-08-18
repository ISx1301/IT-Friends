import React, { useCallback, useMemo } from 'react'
import { Box, Button, Card, Flex, Stack, Text, TextInput } from '@sanity/ui'
import type { SlugInputProps } from 'sanity'
import { set, unset, setIfMissing, useFormValue } from 'sanity'

type SlugValue = { _type?: 'slug'; current?: string }

const basicSlugify = (input: string) =>
  input
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

const getByPath = (obj: any, path: string | undefined): any => {
  if (!obj || !path) return undefined
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
}

function Prefix({ text }: { text?: string }) {
  if (!text) return null
  return (
    <Box
      padding={3}
      style={{
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 1,
      }}
    >
      <Text size={2} style={{ 
        color: 'var(--card-muted-fg-color)' }}
      >{text}</Text>
    </Box>
  )
}

export function PrefixedSlugInput(props: SlugInputProps) {
  const { value, onChange, schemaType, readOnly } = props

  const doc = useFormValue([]) as Record<string, any> | undefined
  const langFromLanguage = useFormValue(['language']) as string | undefined
  const langFromHidden = useFormValue(['__i18n_lang']) as string | undefined

  const lang = langFromLanguage ?? langFromHidden
  const prefix = lang ? `${lang}` : undefined

  const slugVal = (value as SlugValue | undefined)?.current ?? ''
  const maxLength =
    (schemaType.options as any)?.maxLength != null
      ? Number((schemaType.options as any)?.maxLength)
      : 96

  const source = (schemaType.options as any)?.source as
    | string
    | ((doc: any, ctx?: any) => string)
    | undefined

  const externalSlugify = (schemaType.options as any)?.slugify as
    | ((input: string) => string)
    | undefined

  const shown = useMemo(() => {
    if (!prefix) return slugVal
    return slugVal.replace(/^([a-z]{2,3}(?:-[A-Z]{2})?\/)/, '')
  }, [slugVal, prefix])

  const commit = useCallback(
    (nextBare: string) => {
      const next = nextBare || ''
      onChange([
        setIfMissing({ _type: 'slug' }),
        next ? set({ _type: 'slug', current: next }) : unset(),
      ])
    },
    [onChange]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    commit(e.currentTarget.value)
  }

  const handleGenerate = () => {
    let baseInput = ''
    if (typeof source === 'string') {
      baseInput = (getByPath(doc, source) as string | undefined) ?? ''
    } else if (typeof source === 'function') {
      try {
        baseInput = source(doc ?? {}, { parentPath: [], parent: doc }) ?? ''
      } catch {
        baseInput = ''
      }
    } else {
      baseInput = shown
    }

    const raw = (externalSlugify ? externalSlugify(baseInput) : basicSlugify(baseInput)) || ''
    const nextBare = raw.slice(0, maxLength)
    commit(nextBare)
  }

  return (
    <Stack space={3}>
      <Flex gap={2} align="center">
        <Card flex={1}>
          <TextInput
            value={shown}
            prefix={<Prefix text={prefix} />}
            readOnly={readOnly}
            onChange={handleChange}
            placeholder={(schemaType.options as any)?.placeholder}
          />
        </Card>
        <Button
          mode="ghost"
          text="Generate"
          disabled={readOnly}
          onClick={handleGenerate}
        />
      </Flex>

      {schemaType.description && (
        <Text size={1} muted>
          {schemaType.description}
        </Text>
      )}
    </Stack>
  )
}
