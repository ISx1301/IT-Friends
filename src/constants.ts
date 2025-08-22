export const DEFAULT_LANG = import.meta.env.PUBLIC_DEFAULT_LANG || 'uk' as const;
export type Lang = 'uk' | 'en';

export const LOCALE: Record<
  Lang,
  {
    readMore: string;
    notFoundText: string;
    btn404: string;

    ui: {
      callAlt: string;
      telegramAlt: string;
      close: string;
      phoneMenuTitle: string;
      telegramMenuTitle: string;
    };

    phoneMenu: Array<{ label: string; href: string }>;

    onlineForm: {
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
      city: string;
      country: string;
      phone: string;
      itCourse: string;
      wantEnglish: string;
      referral: string;      
      requiredError: string;
      phoneError: string;
    };

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

    formEnglish: {
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
      wantIt: string;
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

    onlineForm: {
      addressTitle: 'Оберіть, будь ласка, що ви хочете вивчати',
      close: 'Закрити',
      tryFree: 'Спробуйте безкоштовний онлайн урок!',
      branchHintEmpty: '',
      sendBtn: 'Надіслати заявку',
      success: 'Форма успішно надіслана! Дякуємо, ми зв’яжемось з вами протягом 24 годин',
      parentName: 'Ім’я батьків*',
      childFirstName: 'Ім’я дитини*',
      childLastName: 'Прізвище дитини*',
      childAge: 'Вік дитини (скільки повних років)*',
      addressStreet: 'Адреса проживання (вулиця)*',
      city: 'Місто*',
      country: 'Країна проживання*',
      phone: 'Телефон для контакту*',
      itCourse: 'Який курс IT хочете спробувати?',
      wantEnglish: 'Чи бажаєте спробувати курси англ. мови додатково?',
      referral: 'Звідки Ви дізнались про нас?',
      requiredError: 'Поле обов’язкове',
      phoneError: 'Введіть номер телефону',
    },

    form: {
      addressTitle: 'Оберіть, будь ласка, зручну для вас адресу:',
      close: 'Закрити',
      tryFree: 'Спробуйте безкоштовний IT урок!',
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

    formEnglish: {
      addressTitle: 'Оберіть, будь ласка, зручну для вас адресу:',
      close: 'Закрити',
      tryFree: 'Спробуйте безкоштовний урок англійської!',
      branchHintEmpty: '',
      sendBtn: 'Надіслати заявку',
      success: 'Форма успішно надіслана! Ми зв’яжемось з вами протягом 24 годин',
      parentName: 'Ім’я батьків*',
      childFirstName: 'Ім’я дитини*',
      childLastName: 'Прізвище дитини*',
      childAge: 'Вік дитини (скільки повних років)*',
      addressStreet: 'Адреса проживання (вулиця)*',
      wantIt: 'Чи бажаєте спробувати IT напрямки додатково',
      phone: 'Телефон для контакту*',
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

    onlineForm: {
      addressTitle: 'Оберіть, будь ласка, що ви хочете вивчати',
      close: 'Закрити',
      tryFree: 'Спробуйте безкоштовний онлайн урок!',
      branchHintEmpty: '',
      sendBtn: 'Надіслати заявку',
      success: 'Форма успішно надіслана! Дякуємо, ми зв’яжемось з вами протягом 24 годин',
      parentName: 'Ім’я батьків*',
      childFirstName: 'Ім’я дитини*',
      childLastName: 'Прізвище дитини*',
      childAge: 'Вік дитини (скільки повних років)*',
      addressStreet: 'Адреса проживання (вулиця)*',
      city: 'Місто*',
      country: 'Країна проживання',
      phone: 'Телефон для контакту*',
      itCourse: 'Який курс IT хочете спробувати?',
      wantEnglish: 'Чи бажаєте спробувати курси англ. мови додатково?',
      referral: 'Звідки Ви дізнались про нас?',
      requiredError: 'Поле обов’язкове',
      phoneError: 'Введіть номер телефону',
    },

    form: {
      addressTitle: 'Please choose the most convenient address:',
      close: 'Close',
      tryFree: 'Try a free IT lesson!',
      branchHintEmpty: '',
      sendBtn: 'Send request',
      success: 'Form submitted! Thank you — we will contact you within 24 hours',
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

    formEnglish: {
      addressTitle: 'Please choose the most convenient address:',
      close: 'Close',
      tryFree: 'Try a free English lesson!',
      branchHintEmpty: '',
      sendBtn: 'Send request',
      success: 'Form submitted! Thank you — we will contact you within 24 hours',
      parentName: 'Parent’s name*',
      childFirstName: 'Child’s first name*',
      childLastName: 'Child’s last name*',
      childAge: 'Child’s age (full years)*',
      addressStreet: 'Адреса проживання (вулиця)*',
      phone: 'Contact phone*',
      wantIt: 'Would you like to try additional IT areas?',
      referral: 'How did you hear about us?',
      requiredError: 'This field is required',
      phoneError: 'Enter a valid phone number',
    },
  },
};

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


export type BranchId =
  | 'borshchahivka'
  | 'kharkivska_poznyaky'
  | 'poznyaky'
  | 'troieshchyna'
  | 'voskresenka'
  | 'online';

export type BranchIdOnline =
  | 'online_it'
  | 'online_eng';
 
export const BRANCH_ORDER: BranchId[] = [
  'borshchahivka',
  'kharkivska_poznyaky',
  'poznyaky',
  'troieshchyna',
  'voskresenka',
  'online'
];

export const BRANCH_ORDER_ONLINE: BranchIdOnline[] = [
  'online_it',
  'online_eng'
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
    online: {
      district: 'Онлайн',
      address: 'Будь-яка точка світу'
    }
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
    online: {
      district: 'Online',
      address: 'Anywhere in the world'
    }
  },
};


export const BRANCHES_ONLINE: Record<
  Lang,
  Record<BranchIdOnline, { district: string; address: string }>
> = {
  uk: {
    online_it: {
      district: 'IT заняття онлайн',
      address: 'Будь-яка точка світу'
    },
    online_eng: {
      district: 'Англійська онлайн',
      address: 'Будь-яка точка світу'      
    }
  },
  en: {
    online_it: {
      district: 'IT lessons online',
      address: 'Anywhere in the world'
    },
    online_eng: {
      district: 'English lessons online',
      address: 'Anywhere in the world'      
    }
  },
};

export const TELEGRAM_LINKS: Record<BranchId, string> = {
  borshchahivka: 'https://t.me/user1',
  kharkivska_poznyaky: 'https://t.me/user2',
  poznyaky: 'https://t.me/user3',
  troieshchyna: 'https://t.me/user4',
  voskresenka: 'https://t.me/user5',
  online: 'https://t.me/user5'
};