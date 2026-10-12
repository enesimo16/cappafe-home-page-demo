"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useSyncExternalStore } from "react";
import { DICTIONARIES, LANGS, type Dictionary, type Lang } from "@/lib/i18n";

const STORAGE_KEY = "cappafe_lang";
const listeners = new Set<() => void>();

function isLang(value: string | null): value is Lang {
  return value !== null && (LANGS as string[]).includes(value);
}

/** Best-effort match of the visitor's browser language against our supported list. */
function detectBrowserLang(): Lang {
  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const raw of candidates) {
    const code = raw?.toLowerCase().split("-")[0] ?? "";
    if (isLang(code)) return code;
  }
  return "tr";
}

function getSnapshot(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : detectBrowserLang();
  } catch {
    return "tr";
  }
}

function getServerSnapshot(): Lang {
  return "tr";
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function applyDocumentLang(lang: Lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = DICTIONARIES[lang].dir;
}

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLang = useCallback((next: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
    applyDocumentLang(next);
    listeners.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    applyDocumentLang(lang);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: DICTIONARIES[lang] }), [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
