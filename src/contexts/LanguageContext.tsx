"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  Language,
  Translation,
  isLanguage,
  translations,
} from "../lib/i18n";

type LanguageContextValue = {
  lang: Language;
  setLang: (next: Language) => void;
  toggleLang: () => void;
  t: Translation;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);

  // localStorage is client-only, so the saved choice is restored after mount.
  useEffect(() => {
    const saved = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

    if (isLanguage(saved)) {
      setLangState(saved);
    }
  }, []);

  // Keep <html lang> matching the active language for screen readers.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const persist = useCallback((next: Language) => {
    setLangState(next);

    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // Private browsing or a full quota — the language still applies this session.
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((current) => {
      const next: Language = current === "bn" ? "en" : "bn";

      try {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
      } catch {
        // Same as above: ignore storage failures.
      }

      return next;
    });
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      lang,
      setLang: persist,
      toggleLang,
      t: translations[lang],
    }),
    [lang, persist, toggleLang]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }

  return context;
}
