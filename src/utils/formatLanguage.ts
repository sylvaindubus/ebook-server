const formatLanguage = (lang: string) => {
  switch (lang) {
    case "en":
    case "en-gb":
      return "English"
    case "fr":
    case "fr-fr":
    case "fra":
      return "French"
    default:
      return "-"
  }
}

export default formatLanguage