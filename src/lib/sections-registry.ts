// shared 
import AboutSection from '@components/sharedSections/AboutSection.astro';
import AccordionSection from '@components/sharedSections/AccordionSection.astro';
import GeneralDescriptionSection from '@components/sharedSections/GeneralDescriptionSection.astro';
import HeroZoomImageSection from '@components/sharedSections/HeroZoomImageSection.astro';
import InterestingThingsSection from '@components/sharedSections/InterestingThingsSection.astro';
import PeculiaritiesSection from '@components/sharedSections/PeculiaritiesSection.astro';
import ReviewsSection from '@components/sharedSections/ReviewsSection.astro';
import TeamSection from '@components/sharedSections/TeamSection.astro';
import WithoutNestedTabsSection from '@components/sharedSections/WithoutNestedTabsSection.astro';

// static

// blog
import HeroBlogSection from '@components/staticSections/blog/HeroBlogSection.astro';
import PostContentSection from '@components/staticSections/blog/PostContentSection.astro';
import PostListSection from '@components/staticSections/blog/PostListSection.astro';
import RelatedPostsSection from '@components/staticSections/blog/RelatedPostsSection.astro';

// camps
import VideoCampsSection from '@components/staticSections/camps/VideoCampsSection.astro';
import WithNestedTabsCampsSection from '@components/staticSections/camps/WithNestedTabsCampsSection.astro';

// english
import OfflineAddressesEnglishSection from '@components/staticSections/english/OfflineAddressesEnglishSection.astro';

// main
import AreasOfStudyMainSection from '@components/staticSections/main/AreasOfStudyMainSection.astro';
import HeroSectionMainSection from '@components/staticSections/main/HeroSectionMainSection.astro';
import NewSchoolMainSection from '@components/staticSections/main/NewSchoolMainSection.astro';


export const sectionsRegistry: Record<string, any> = {
  // shared
  aboutSection: AboutSection,
  accordionSection: AccordionSection,
  generalDescriptionSection: GeneralDescriptionSection,
  heroZoomImageSection: HeroZoomImageSection,
  interestingThingsSection: InterestingThingsSection,
  peculiaritiesSection: PeculiaritiesSection,
  reviewsSection: ReviewsSection,
  teamSection: TeamSection,
  withoutNestedTabsSection: WithoutNestedTabsSection,

  // blog
  heroBlogSection: HeroBlogSection,
  postContentSection: PostContentSection,
  postListSection: PostListSection,
  relatedPostsSection: RelatedPostsSection,

  // camps
  videoCampsSection: VideoCampsSection,
  withNestedTabsCampsSection: WithNestedTabsCampsSection,

  // english
  offlineAddressesEnglishSection: OfflineAddressesEnglishSection,

  // main
  areasOfStudyMainSection: AreasOfStudyMainSection,
  heroSectionMainSection: HeroSectionMainSection,
  newSchoolMainSection: NewSchoolMainSection,
};