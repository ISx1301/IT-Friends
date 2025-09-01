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


export const BRANCH_ORDER_OFFLINE: Exclude<BranchId, 'online'>[] = [
  'borshchahivka',
  'kharkivska_poznyaky',
  'poznyaky',
  'troieshchyna',
  'voskresenka',
];

export type DirectionKey =
  | 'online_eng'
  | 'online_it'
  | 'it_school'
  | 'english_kids'
  | 'it_camps'
  | 'franchise';

export const DIRECTION_OPTIONS: Record<Lang, Array<{ key: DirectionKey; label: string }>> = {
  uk: [
    { key: 'online_eng',   label: 'Англійська онлайн' },
    { key: 'online_it',    label: 'IT онлайн' },
    { key: 'it_school',    label: 'IT школа' },
    { key: 'english_kids', label: 'Англійська для дітей' },
    { key: 'it_camps',     label: 'IT табори' },
    { key: 'franchise',    label: 'Франшиза' },
  ],
  en: [
    { key: 'online_eng',   label: 'English online' },
    { key: 'online_it',    label: 'IT online' },
    { key: 'it_school',    label: 'IT school' },
    { key: 'english_kids', label: 'English for kids' },
    { key: 'it_camps',     label: 'IT camps' },
    { key: 'franchise',    label: 'Franchise' },
  ],
};

export const PHONE_LINKS: Record<BranchId, Array<{ label: string; href: string }>> = {
  borshchahivka:       [{ label: 'Борщагівка',         href: 'tel:+380971409292' }],
  kharkivska_poznyaky: [{ label: 'Кошиця/Позняки',     href: 'tel:+380982617975' }],
  poznyaky:            [{ label: 'Григоренка',         href: 'tel:+380984409447' }],
  troieshchyna:        [{ label: 'Троєщина',           href: 'tel:+380964296130' }],
  voskresenka:         [{ label: 'Воскресенка',        href: 'tel:+380989005905' }],
  online: [
    { label: 'IT онлайн',         href: 'tel:+380956217034' },
    { label: 'Англійська онлайн', href: 'tel:+380989631223' },
  ],
};

export const TELEGRAM_BRANCH_LINKS: Record<
  Exclude<BranchId, 'online'>, string
> = {
  borshchahivka:       'https://t.me/itfriends_borshchagivka',
  kharkivska_poznyaky: 'https://t.me/itfriendskosh',
  poznyaky:            'https://t.me/itfriendsrigorenko',
  troieshchyna:        'https://t.me/ITFRIENDSTroieschyna',
  voskresenka:         'https://t.me/itfriendsvoskresenka',
};

export const TELEGRAM_ONLINE_LINKS: Record<'online_it' | 'online_eng', string> = {
  online_it:  'https://t.me/Online_it_friends',
  online_eng: 'https://t.me/eng0friends',
};