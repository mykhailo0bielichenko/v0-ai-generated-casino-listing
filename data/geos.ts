import type { Geo } from "../types/types"
import { getLanguageByCode } from "./languages"

export const geos: Geo[] = [
  {
    country: "Norway",
    countryCode: "NO",
    regulations: ["Norwegian Gaming Authority", "EU regulations"],
    currency: "NOK",
    language: getLanguageByCode("no")!,
  },
  {
    country: "Canada",
    countryCode: "CA",
    regulations: ["Provincial gaming authorities", "FINTRAC"],
    currency: "CAD",
    language: getLanguageByCode("en")!,
  },
  {
    country: "New Zealand",
    countryCode: "NZ",
    regulations: ["Department of Internal Affairs", "AUSTRAC"],
    currency: "NZD",
    language: getLanguageByCode("en")!,
  },
  {
    country: "Germany",
    countryCode: "DE",
    regulations: ["Glücksspielstaatsvertrag", "EU regulations"],
    currency: "EUR",
    language: getLanguageByCode("de")!,
  },
  {
    country: "Finland",
    countryCode: "FI",
    regulations: ["Finnish Gaming Authority", "EU regulations"],
    currency: "EUR",
    language: getLanguageByCode("fi")!,
  },
]

export const getGeoByCountryCode = (countryCode: string): Geo | undefined => {
  return geos.find((geo) => geo.countryCode === countryCode)
}
