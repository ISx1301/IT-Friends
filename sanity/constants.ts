export enum LOCALE {
  Uk = 'uk',
  En = 'en',
}

// ! NOTICE: first is default
export const SUPPORTED_LANGS: { id: LOCALE; title: string }[] = [
  { id: LOCALE.Uk, title: 'Ukrainian' },
  { id: LOCALE.En, title: 'English' },
]

export const localizedSchemaTypes = ['globalSettings', 'page'];
