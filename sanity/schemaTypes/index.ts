// schemaTypes/index.ts
import {globalSettings} from './settings/globalSettings'
import {page} from './pages/pages/page'
import {aboutUsSection} from './sections/aboutUsSection'
import {directionsSection} from './sections/directionsSection'
import {head} from './shared/head'

export const schemaTypes = [
  globalSettings,
  page,
  aboutUsSection,
  directionsSection,
  head,
]
