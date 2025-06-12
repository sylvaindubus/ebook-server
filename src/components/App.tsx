import path from "path"
import formatLanguage from "../utils/formatLanguage"
import { Ebook } from "../types"
import EbookCover from "./EbookCover"

type Props = {
  ebooks: Ebook[]
}

export const App = ({ ebooks }: Props) => (
  <main className="p-8">
    <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-center dark:text-white text-black">Ebooks</h1>
    <hr className="border-t-4 border-black border-double my-8" />
    <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {ebooks.map((ebook) => {
        const formattedLanguage = formatLanguage(ebook.language)
        return (
          <div className="text-center flex flex-col items-center min-h-[300px]" key={ebook.filePath}>
            <a href={`/download/${path.basename(ebook.filePath)}`} title={`Download ${ebook.title}`} className="block w-full">
              <EbookCover src={ebook.coverUrl} alt={`Cover of ${ebook.title}`} />
            </a>
            <div className="p-2">
              <p className="italic">{ebook.author}</p>
              <p className="text-center font-bold text-md">{ebook.title}</p>
              {formattedLanguage && <p className="text-sm opacity-50">{formattedLanguage}</p>}
            </div>
          </div>
        )
      })}
    </div>
  </main>
)
