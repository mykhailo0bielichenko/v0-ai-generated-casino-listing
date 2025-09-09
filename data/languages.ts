import type { Language } from "../types/types"

export const languages: Language[] = [
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
  },
  {
    code: "no",
    name: "Norwegian",
    flag: "🇳🇴",
  },
  {
    code: "sv",
    name: "Swedish",
    flag: "🇸🇪",
  },
  {
    code: "fi",
    name: "Finnish",
    flag: "🇫🇮",
  },
  {
    code: "de",
    name: "German",
    flag: "🇩🇪",
  },
  {
    code: "fr",
    name: "French",
    flag: "🇫🇷",
  },
]

export const getLanguageByCode = (code: string): Language | undefined => {
  return languages.find((lang) => lang.code === code)
}
