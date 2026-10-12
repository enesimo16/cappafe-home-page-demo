import type { Dictionary, Lang } from "./types";
import { tr } from "./tr";
import { en } from "./en";
import { de } from "./de";
import { fr } from "./fr";
import { es } from "./es";
import { ru } from "./ru";
import { ar } from "./ar";

export const DICTIONARIES: Record<Lang, Dictionary> = { tr, en, de, fr, es, ru, ar };

export { LANGS } from "./types";
export type { Dictionary, Lang, ProductItem, CompanyItem, FlowStepItem } from "./types";
