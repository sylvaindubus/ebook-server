type Props = {
  language: string
}

const Flag = ({ language }: Props) => {
  switch (language) {
    case "en":
    case "en-gb":
      return (
        <span role="img" aria-label="English">
          🇬🇧
        </span>
      )
    case "fr":
      return (
        <span role="img" aria-label="French">
          🇫🇷
        </span>
      )
    default:
      return null
  }
}

export default Flag
