export type SectionId =
  | "top"
  | "sayilar"
  | "urunler"
  | "akis"
  | "grup"
  | "ortaklik"
  | "iletisim";

export const SECTION_IDS: SectionId[] = [
  "top",
  "sayilar",
  "urunler",
  "akis",
  "grup",
  "ortaklik",
  "iletisim",
];

export const NAV_IDS: { id: SectionId; navIndex: number }[] = [
  { id: "top", navIndex: 0 },
  { id: "urunler", navIndex: 1 },
  { id: "akis", navIndex: 2 },
  { id: "grup", navIndex: 3 },
  { id: "ortaklik", navIndex: 4 },
  { id: "iletisim", navIndex: 5 },
];

export const SECTION_TO_NAV: Record<SectionId, number> = {
  top: 0,
  sayilar: 0,
  urunler: 1,
  akis: 2,
  grup: 3,
  ortaklik: 4,
  iletisim: 5,
};

export const WHATSAPP_URL = "https://wa.me/905495531654";
export const DEALER_URL = "https://b2b.cappafe.com";
export const ONLINE_STORE_URL = "https://www.cappafe.com.tr";
export const CONTACT_EMAIL = "info@cappafe.com";
export const CONTACT_PHONE_DISPLAY = "0224 362 39 75";
export const CONTACT_PHONE_TEL = "+902243623975";
export const CATALOG_PDF_URL = "/catalog/catalog.pdf";
export const CATALOG_PAGE_COUNT = 60;
export const COMPANY_ADDRESS = {
  line1: "Ovaakça Santral Mh. İstanbul Cd. No:646",
  line2: "Osmangazi / Bursa, Türkiye",
  mapsUrl:
    "https://maps.google.com/?q=Ovaak%C3%A7a+Santral+Mah.+%C4%B0stanbul+Cad.+No:646+Osmangazi+Bursa",
};
