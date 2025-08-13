// shared
import {globalSettings} from './settings/globalSettings'
import {page} from './pages/pages/page'
import {head} from './shared/head'

// sections
import { heroSectionMainSection } from './sections/heroSection'
import { areasOfStudyMainSection } from './sections/areasOfStudySection'
import {aboutSection} from './sections/aboutSection'
import { peculiaritiesSection } from './sections/peculiaritiesSection'
import { reviewsSection } from './sections/reviewsSection'
import { newSchoolMainSection } from './sections/newSchoolMainSection'
import { teamSection } from './sections/teamSection'
import { accordionSection } from './sections/accordionSection'
 

// helper
import { aboutContentOrderItem } from './sections/aboutSection'

export const schemaTypes = [
  // shared
  page,
  head,
  globalSettings,

  // sections
  heroSectionMainSection,
  areasOfStudyMainSection,
  aboutSection,
  peculiaritiesSection,
  reviewsSection,
  newSchoolMainSection,
  teamSection,
  accordionSection,

  // helper
  aboutContentOrderItem
]
