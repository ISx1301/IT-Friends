// Shared Schemas
import { head } from './shared/head';
import { header } from './shared/header';
import { footer } from './shared/footer';

// Page Schemas
import homePage from './pages/home/homePage'; // Default export for document type

// Home Page Section Schemas 
import { heroSection } from './pages/home/heroSection';
import { directionsSection } from './pages/home/directionsSection';
import { aboutUsSection } from './pages/home/aboutUsSection';
import { featuresSection } from './pages/home/featuresSection';
import { reviewsSection } from './pages/home/reviewsSection';
import { newSchoolSection } from './pages/home/newSchoolSection';
import { teamSection } from './pages/home/teamSection';
import { faqSection } from './pages/home/faqSection';

// TODO: process of creation links
/**
 * page entity - если пустое поле slug, ошибка валидации, 
 * или можна заполнить вручную (и валидировать RegExp, формат slug)
 * 
 * https://regex101.com/ - курс regexp
 * 
 * главная страница - селект в Главных настройках 
 * ...или - поле switch/checkbox, является ли страница главной на любой странице (проверить, среди всех других)
 * Задача: разобраться с Санити, есть ли глобальное состояние (global state) (if not - local storage / session storage)
 */

export const schemaTypes = [
  // Shared
  head,
  header,
  footer,

  // Pages
  homePage,

  // Home Page Sections
  heroSection,
  directionsSection,
  aboutUsSection,
  featuresSection,
  reviewsSection,
  newSchoolSection,
  teamSection,
  faqSection,
];