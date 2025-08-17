const DEFAULT_LANG = "uk";
const LOCALE = {
  uk: {
    readMore: "читати більше >",
    notFoundText: "На жаль, таку сторінку не знайдено:(",
    btn404: "На головну"
  },
  en: {
    readMore: "read more >",
    notFoundText: "Unfortunately, such page was not found :(",
    btn404: "To main"
  }
};
const BG_CLASSES = {
  white: "bg-white",
  gray: "bg-gray",
  "sand-gradient": "bg-gradient-to-b from-gradient-from to-gradient-to",
  mint: "bg-span-mint",
  transparent: "bg-[transparent]",
  turquoise: "bg-primary-turquoise"
};
const HEADING_ALIGN_CLASSES = {
  left: "text-left",
  center: "text-center",
  right: "text-right"
};
const ABOUT_LAYOUT_ROW_CLASSES = {
  "image-left": "lg:flex-row",
  "image-right": "lg:flex-row-reverse"
};
const BADGE_BORDER_CLASSES = {
  sand: "border-span-sand",
  mint: "border-span-mint"
};

export { ABOUT_LAYOUT_ROW_CLASSES as A, BG_CLASSES as B, DEFAULT_LANG as D, HEADING_ALIGN_CLASSES as H, LOCALE as L, BADGE_BORDER_CLASSES as a };
