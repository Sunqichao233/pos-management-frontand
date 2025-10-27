import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { translations, TranslationKey } from "./translations"

type Language = "en" | "zh"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey | string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get saved language from localStorage, default to English
    const saved = localStorage.getItem("app-language")
    return (saved === "zh" || saved === "en") ? saved : "en"
  })

  useEffect(() => {
    // Save language preference to localStorage
    localStorage.setItem("app-language", language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  // Translation function - returns translation or key if not found
  const t = (key: TranslationKey | string): string => {
    return translations[language][key as TranslationKey] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
