const formatLanguage = (lang: string) => {
  switch (lang) {
    case "en":
    case "en-gb":
      return "English"
    case "fr":
      return "French"
    default:
      return lang.charAt(0).toUpperCase() + lang.slice(1)
  }
}

export default formatLanguage