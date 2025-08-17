// shared
import {globalSettings} from './settings/globalSettings'
import {page} from './pages/pages/page'
import {head} from './shared/head'
import { heroBlogSection } from './sections/heroBlogSection'

// sections
import { heroSectionMainSection } from './sections/heroSection'
import { areasOfStudyMainSection } from './sections/areasOfStudySection'
import {aboutSection} from './sections/aboutSection'
import { peculiaritiesSection } from './sections/peculiaritiesSection'
import { reviewsSection } from './sections/reviewsSection'
import { newSchoolMainSection } from './sections/newSchoolMainSection'
import { teamSection } from './sections/teamSection'
import { accordionSection } from './sections/accordionSection'
import { heroZoomImageSection } from './sections/heroZoomImageSection'
import { generalDescriptionSection } from './sections/generalDescriptionSection'
import { withoutNestedTabsSection } from './sections/withoutNestedTabsSection'
import { withNestedTabsCampsSection } from './sections/withNestedTabsCampsSection'
import { interestingThingsSection } from './sections/interestingThingsSection'
import { offlineAddressesEnglishSection } from './sections/offlineAddressesEnglishSection'
import { videoCampsSection } from './sections/videoCampsSection'

 // helper
import { aboutContentOrderItem } from './sections/aboutSection'

// blog
import { blog } from './blog/blog'
import { postListSection } from './sections/postListSection'

export const schemaTypes = [
  // shared
  page,
  head,
  globalSettings,
  heroZoomImageSection,
  withoutNestedTabsSection,
  interestingThingsSection,
  blog,

  // sections
  heroSectionMainSection,
  areasOfStudyMainSection,
  aboutSection,
  peculiaritiesSection,
  reviewsSection,
  newSchoolMainSection,
  teamSection,
  accordionSection,
  generalDescriptionSection,
  withNestedTabsCampsSection,
  offlineAddressesEnglishSection,
  videoCampsSection,
  heroBlogSection,
  postListSection,

  // helper
  aboutContentOrderItem
]
