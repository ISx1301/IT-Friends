import React, {useCallback, useMemo} from 'react'
import {Box, Button, Card, Flex, Stack, Text, TextInput} from '@sanity/ui'
import type {SlugInputProps} from 'sanity'
import {set, unset, setIfMissing, useFormValue} from 'sanity'

type SlugValue = {_type?: 'slug'; current?: string}

const basicSlugify = (input: string) =>
  (input || '')
    .toString()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9/]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .replace(/\/{2,}/g, '/')

const LOCALE_SEGMENT = /^\/?([a-z]{2,3}(?:-[A-Z]{2})?)\//

const getByPath = (obj: any, path: string | undefined): any => {
  if (!obj || !path) return undefined
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj)
}

function Prefix({text}: {text?: string}) {
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
      <Text size={2} style={{color: 'var(--card-muted-fg-color)'}}>
        {text}
      </Text>
    </Box>
  )
}

export function PrefixedSlugInput(props: SlugInputProps) {
  const {value, onChange, schemaType, readOnly} = props

  const doc = useFormValue([]) as Record<string, any> | undefined
  const langFromLanguage = useFormValue(['language']) as string | undefined
  const langFromHidden = useFormValue(['__i18n_lang']) as string | undefined
  const lang = langFromLanguage ?? langFromHidden

  const prefix = lang ? `/${lang}` : undefined

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
    if (!slugVal) return ''
    const withoutLocale = slugVal.replace(LOCALE_SEGMENT, '/')
    return withoutLocale
  }, [slugVal])

  const collapseSlashes = (s: string) => s.replace(/\/{2,}/g, '/')

  const buildStored = useCallback(
    (nextBare: string, {collapse = false}: {collapse?: boolean} = {}) => {
      let tail = nextBare || ''
      if (!tail.startsWith('/')) tail = `/${tail}`

      if (LOCALE_SEGMENT.test(tail)) {
        return collapse ? collapseSlashes(tail) : tail
      }

      if (lang) {
        const normalizedTail = tail.replace(/^\/+/, '')
        const full = `/${lang}/${normalizedTail}`
        return collapse ? collapseSlashes(full) : full
      }

      return collapse ? collapseSlashes(tail) : tail
    },
    [lang]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.currentTarget.value
    const withLeadingSlash = raw.startsWith('/') ? raw : `/${raw}`
    const full = buildStored(withLeadingSlash, {collapse: false})
    onChange([
      setIfMissing({_type: 'slug'}),
      set({_type: 'slug', current: full}),
    ])
  }

  const handleBlur = () => {
  const current = (value as SlugValue | undefined)?.current ?? ''
    if (!current) return
    const normalized = buildStored(current, {collapse: true})
    if (normalized !== current) {
      onChange([
        setIfMissing({_type: 'slug'}),
        set({_type: 'slug', current: normalized}),
      ])
    }
  }

  const handleGenerate = () => {
    let baseInput = ''
    if (typeof source === 'string') {
      baseInput = (getByPath(doc, source) as string | undefined) ?? ''
    } else if (typeof source === 'function') {
      try {
        baseInput = source(doc ?? {}, {parentPath: [], parent: doc}) ?? ''
      } catch {
        baseInput = ''
      }
    } else {
      baseInput = shown
    }

    const raw = (externalSlugify ? externalSlugify(baseInput) : basicSlugify(baseInput)) || ''
    const full = buildStored(raw, {collapse: true})
    const clipped = full.slice(0, maxLength)
    onChange([
      setIfMissing({_type: 'slug'}),
      set({_type: 'slug', current: clipped}),
    ])
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
            onBlur={handleBlur}
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
