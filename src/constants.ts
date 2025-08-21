export const DEFAULT_LANG = import.meta.env.PUBLIC_DEFAULT_LANG || 'uk' as const;
export type Lang = 'uk' | 'en';

// ====== Локализация общих строк и формы ======
export const LOCALE: Record<
  Lang,
  {
    readMore: string;
    notFoundText: string;
    btn404: string;

    // UI-тексты для кнопок/заголовков в интерфейсе (добавлено)
    ui: {
      callAlt: string;
      telegramAlt: string;
      close: string;
      phoneMenuTitle: string;
      telegramMenuTitle: string;
    };

    // Пункты phone-меню (кнопки-звонки) — массив, чтобы легко переводить (добавлено)
    phoneMenu: Array<{ label: string; href: string }>;

    form: {
      addressTitle: string;
      close: string;
      tryFree: string;
      branchHintEmpty: string;
      sendBtn: string;
      success: string;
      parentName: string;
      childFirstName: string;
      childLastName: string;
      childAge: string;
      addressStreet: string;
      phone: string;
      itCourse: string;
      wantEnglish: string;
      referral: string;
      requiredError: string;
      phoneError: string;
    };
  }
> = {
  uk: {
    readMore: 'читати більше >',
    notFoundText: 'На жаль, таку сторінку не знайдено:(',
    btn404: 'На головну',

    ui: {
      callAlt: 'Зателефонувати',
      telegramAlt: 'Telegram',
      close: 'Закрити',
      phoneMenuTitle: 'Оберіть, будь ласка, напрямок, який цікавить:',
      telegramMenuTitle: 'Оберіть, будь ласка, зручну для вас адресу:',
    },

    phoneMenu: [
      { label: 'Онлайн навчання',      href: 'tel:+38067' },
      { label: 'IT школа',             href: 'tel:+38067' },
      { label: 'Англійська для дітей', href: 'tel:+38098' },
      { label: 'IT табори',            href: 'tel:+38093' },
      { label: 'Франшиза',             href: 'tel:+38050' },
    ],

    form: {
      addressTitle: 'Оберіть, будь ласка, зручну для вас адресу:',
      close: 'Закрити',
      tryFree: 'Спробуйте безкоштовний урок!',
      branchHintEmpty: '',
      sendBtn: 'Надіслати заявку',
      success:
        'Форма успішно надіслана! Дякуємо, ми зв’яжемось з вами протягом 24 годин',
      parentName: 'Ім’я батьків*',
      childFirstName: 'Ім’я дитини*',
      childLastName: 'Прізвище дитини*',
      childAge: 'Вік дитини (скільки повних років)*',
      addressStreet: 'Адреса проживання (вулиця)*',
      phone: 'Телефон для контакту*',
      itCourse: 'Який курс IT хочете спробувати?',
      wantEnglish: 'Чи бажаєте спробувати курси англ. мови додатково?',
      referral: 'Звідки Ви дізнались про нас?',
      requiredError: 'Поле обов’язкове',
      phoneError: 'Введіть номер телефону',
    },
  },

  en: {
    readMore: 'read more >',
    notFoundText: 'Unfortunately, such page was not found :(',
    btn404: 'To main',

    ui: {
      callAlt: 'Call',
      telegramAlt: 'Telegram',
      close: 'Close',
      phoneMenuTitle: 'Please choose the track you are interested in:',
      telegramMenuTitle: 'Please choose the most convenient address:',
    },

    phoneMenu: [
      { label: 'Online learning',  href: 'tel:+38067' },
      { label: 'IT school',        href: 'tel:+38067' },
      { label: 'English for kids', href: 'tel:+38098' },
      { label: 'IT camps',         href: 'tel:+38093' },
      { label: 'Franchise',        href: 'tel:+38050' },
    ],

    form: {
      addressTitle: 'Please choose the most convenient address:',
      close: 'Close',
      tryFree: 'Try a free lesson!',
      branchHintEmpty: '',
      sendBtn: 'Send request',
      success:
        'Form submitted! Thank you — we will contact you within 24 hours',
      parentName: 'Parent’s name*',
      childFirstName: 'Child’s first name*',
      childLastName: 'Child’s last name*',
      childAge: 'Child’s age (full years)*',
      addressStreet: 'Home address (street)*',
      phone: 'Contact phone*',
      itCourse: 'Which IT course would you like to try?',
      wantEnglish: 'Would you like to try English classes as well?',
      referral: 'How did you hear about us?',
      requiredError: 'This field is required',
      phoneError: 'Enter a valid phone number',
    },
  },
};

// ====== Цвета фона секций ======
export type BgColor =
  | 'white'
  | 'gray'
  | 'sand-gradient'
  | 'mint'
  | 'transparent'
  | 'turquoise';

export const BG_CLASSES: Record<BgColor, string> = {
  white: 'bg-white',
  gray: 'bg-gray',
  'sand-gradient': 'bg-gradient-to-b from-gradient-from to-gradient-to',
  mint: 'bg-span-mint',
  transparent: 'bg-[transparent]',
  turquoise: 'bg-primary-turquoise',
};

// ====== Выравнивание заголовков ======
export type Align = 'left' | 'center' | 'right';
export const HEADING_ALIGN_CLASSES: Record<Align, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

// ====== Лейауты about-секции ======
export type AboutLayout = 'image-left' | 'image-right';
export const ABOUT_LAYOUT_ROW_CLASSES: Record<AboutLayout, string> = {
  'image-left': 'lg:flex-row',
  'image-right': 'lg:flex-row-reverse',
};

// ====== Цвет рамки баджей ======
export type BadgeBorderColor = 'sand' | 'mint';
export const BADGE_BORDER_CLASSES: Record<BadgeBorderColor, string> = {
  sand: 'border-span-sand',
  mint: 'border-span-mint',
};

// ====== Филиалы (кнопки выбора адреса) ======
export type BranchId =
  | 'borshchahivka'
  | 'kharkivska_poznyaky'
  | 'poznyaky'
  | 'troieshchyna'
  | 'voskresenka';

export const BRANCH_ORDER: BranchId[] = [
  'borshchahivka',
  'kharkivska_poznyaky',
  'poznyaky',
  'troieshchyna',
  'voskresenka',
];

export const BRANCHES: Record<
  Lang,
  Record<BranchId, { district: string; address: string }>
> = {
  uk: {
    borshchahivka: { district: 'ЖМ Борщагівка', address: 'Б-р, Кольцова 14' },
    kharkivska_poznyaky: {
      district: 'ЖМ Харківська-Позняки',
      address: 'Вул. Кошиця 9Б',
    },
    poznyaky: { district: 'ЖМ Позняки', address: 'Пр-т, Григоренка 16' },
    troieshchyna: {
      district: 'ЖМ Троєщина',
      address: 'Пр-т, Маяковського 91в',
    },
    voskresenka: {
      district: 'ЖМ Воскресенка',
      address: 'Вул. Курнатовського 22',
    },
  },
  en: {
    borshchahivka: { district: 'Borshchahivka District', address: 'Kolt­sova Blvd 14' },
    kharkivska_poznyaky: {
      district: 'Kharkivska–Pozniaky',
      address: 'Koshytsia St 9B',
    },
    poznyaky: { district: 'Pozniaky District', address: 'Hryhorenka Ave 16' },
    troieshchyna: {
      district: 'Troyeshchyna District',
      address: 'Mayakovskoho Ave 91v',
    },
    voskresenka: {
      district: 'Voskresenka District',
      address: 'Kurnatovskoho St 22',
    },
  },
};

// ====== Телеграм-ссылки по филиалам (добавлено) ======
export const TELEGRAM_LINKS: Record<BranchId, string> = {
  borshchahivka: 'https://t.me/user1',
  kharkivska_poznyaky: 'https://t.me/user2',
  poznyaky: 'https://t.me/user3',
  troieshchyna: 'https://t.me/user4',
  voskresenka: 'https://t.me/user5',
};
