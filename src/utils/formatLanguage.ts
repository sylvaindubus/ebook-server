import capitalizeWords from "./capitalizeWords"

const formatLanguage = (lang: string) => {
  switch (lang) {
    case "en":
    case "en-gb":
      return "English"
    case "fr":
      return "French"
    default:
      return capitalizeWords(lang)
  }
}

export default formatLanguage