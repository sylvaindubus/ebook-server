import path from "path"
import formatLanguage from "../utils/formatLanguage"
import { Ebook } from "../types"
import EbookCover from "./EbookCover"

type Props = {
  ebooks: Ebook[]
}

export const App = ({ ebooks }: Props) => (
  <main className="p-8 max-w-[1920px] mx-auto">
    <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-center dark:text-white text-black">Ebooks</h1>
    <div className="text-8xl text-center font-medium">~</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
      {ebooks.map((ebook) => {
        const formattedLanguage = formatLanguage(ebook.language)
        return (
          <div className="flex flex-row items-center p-4 gap-4" key={ebook.filePath}>
            <div className="block w-[100px] flex-shrink-0">
              <EbookCover src={ebook.coverUrl} alt={`Cover of ${ebook.title}`} />
            </div>
            <div className="">
              <p className="italic mb-1">{ebook.author}</p>
              <a href={`/download/${path.basename(ebook.filePath)}`} title={`Download ${ebook.title}`} className="font-bold text-md hover:underline">
                {ebook.title}
              </a>
              {formattedLanguage && <p className="text-sm opacity-50 mt-2">{formattedLanguage}</p>}
            </div>
          </div>
        )
      })}
    </div>
  </main>
)
