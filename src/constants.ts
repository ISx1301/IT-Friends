const DEFAULT_LANG = import.meta.env.PUBLIC_DEFAULT_LANG || 'uk';

// const CURRENT_LANG = 

const LOCALE = {
  uk: {
    readMore: 'читати більше >',
    notFoundText: 'На жаль, таку сторінку не знайдено:(',
    btn404: 'На головну'
  },
  en: {
    readMore: 'read more >',
    notFoundText: 'Unfortunately, such page was not found :(',
    btn404: 'To main'
  }
};

export type BgColor = 'white' | 'gray' | 'sand-gradient' | 'mint' | 'transparent' | 'turquoise';


export const BG_CLASSES: Record<BgColor, string> = {
  white: 'bg-white',
  gray: 'bg-gray',                 
  'sand-gradient': 'bg-gradient-to-b from-gradient-from to-gradient-to', 
  mint: 'bg-span-mint',                     
  transparent: 'bg-[transparent]',
  turquoise: 'bg-primary-turquoise'
};

export type Align = 'left' | 'center' | 'right';
export const HEADING_ALIGN_CLASSES: Record<Align, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export type AboutLayout = 'image-left' | 'image-right';
export const ABOUT_LAYOUT_ROW_CLASSES: Record<AboutLayout, string> = {
  'image-left': 'lg:flex-row',
  'image-right': 'lg:flex-row-reverse',
};

export type BadgeBorderColor = 'sand' | 'mint';
export const BADGE_BORDER_CLASSES: Record<BadgeBorderColor, string> = {
  sand: 'border-span-sand',
  mint: 'border-span-mint',
};

export {
  DEFAULT_LANG,
  LOCALE,
}