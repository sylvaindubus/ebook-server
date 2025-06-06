import path from "path"
import { Ebook } from "../types"
import Flag from "./Flag"

type Props = {
  ebooks: Ebook[]
}

export const App = ({ ebooks }: Props) => (
  <main className="p-4">
    <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center dark:text-white text-gray-800 mt-4 mb-8">Ebooks</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {ebooks.map((ebook, index) => (
        <div key={index} className="p-4 border rounded-lg shadow-sm">
          <a href={`/download/${path.basename(ebook.filePath)}`} className="font-medium text-sky-500">
            <Flag language={ebook.language} /> {ebook.title}
          </a>
          <p>{ebook.author}</p>
        </div>
      ))}
    </div>
  </main>
)
