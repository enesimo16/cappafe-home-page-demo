export type Lang = "tr" | "en" | "de" | "fr" | "es" | "ru" | "ar";

export const LANGS: Lang[] = ["tr", "en", "de", "fr", "es", "ru", "ar"];

export interface ProductItem {
  key: string;
  num: string;
  title: string;
  imageLabel: string;
  cardDesc: string;
  meta: string;
  desc: string;
}

export interface CompanyItem {
  slug: string;
  num: string;
  name: string;
  role: string;
  desc: string;
  linkLabel: string;
  linkHref: string;
}

export interface FlowStepItem {
  step: string;
  tag: string;
  title: string;
  desc: string;
  chips: string[];
  caption: string;
  highlight: string;
}

export interface Dictionary {
  dir: "ltr" | "rtl";
  nav: {
    home: string;
    products: string;
    about: string;
    group: string;
    partner: string;
    contact: string;
    cta: string;
    themeAria: string;
    langAria: string;
    menuAria: string;
  };
  hero: {
    kicker: string;
    typed: [string, string, string, string];
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    dealerCta: string;
    onlineSaleCta: string;
    ticker: string[];
  };
  stats: {
    kicker: string;
    experience: string;
    facility: string;
    staff: string;
    sku: string;
  };
  products: {
    kicker: string;
    title: string;
    hint: string;
    detail: string;
    category: string;
    b2b: string;
    quote: string;
    note: string;
    close: string;
    items: ProductItem[];
  };
  story: {
    kicker: string;
    /** Accent phrases are wrapped in [[double brackets]]. */
    body: string;
    marketsLabel: string;
    markets: string[];
    photoLabels: [string, string, string];
  };
  flow: {
    kicker: string;
    title: string;
    steps: FlowStepItem[];
  };
  group: {
    kicker: string;
    title: string;
    hint: string;
    companies: CompanyItem[];
  };
  partner: {
    kicker: string;
    title: string;
    sub: string;
    badges: string[];
    cta: string;
    formKicker: string;
    formTitle: string;
    back: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    country: string;
    region: string;
    volumes: string[];
    message: string;
    submit: string;
    sent: string;
    tags: string[];
  };
  contact: {
    kicker: string;
    title: string;
    factory: string;
    maps: string;
    formTitle: string;
    formSub: string;
    name: string;
    company: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    send: string;
    sent: string;
    pin: string;
  };
  blog: {
    kicker: string;
    title: string;
    empty: string;
    back: string;
  };
  catalog: {
    kicker: string;
    navLabel: string;
    title: string;
    intro: string;
    download: string;
    pageLabel: string;
    tabLabel: string;
  };
  footer: {
    about: string;
    menu: string;
    contactTitle: string;
    regions: string;
    ukEurope: string;
    rights: string;
  };
  ticker: string[];
  toTopAria: string;
  waAria: string;
}
