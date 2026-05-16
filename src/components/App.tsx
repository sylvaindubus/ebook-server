import path from "path";
import formatLanguage from "../utils/formatLanguage";
import capitalizeWords from "../utils/capitalizeWords";
import { Ebook } from "../types";

type Props = {
  ebooks: Ebook[];
};

export const App = ({ ebooks }: Props) => (
  <main className="p-8 max-w-[1920px] mx-auto">
    <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-center dark:text-white text-black">
      Ebooks
    </h1>
    <div className="text-8xl text-center font-medium">~</div>
    <div className="mt-12 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b-2 border-gray-300 dark:border-gray-600">
            <th className="text-left px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Auteur</th>
            <th className="text-left px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Titre</th>
            <th className="text-left px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">Langue</th>
          </tr>
        </thead>
        <tbody>
          {ebooks.map((ebook) => {
            const formattedLanguage = formatLanguage(ebook.language);
            const capitalizedAuthor = capitalizeWords(ebook.author);
            return (
              <tr key={ebook.filePath} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <td className="px-6 py-4 text-gray-900 dark:text-gray-100">{capitalizedAuthor}</td>
                <td className="px-6 py-4">
                  <a
                    href={`/download/${path.basename(ebook.filePath)}`}
                    title={`Download ${ebook.title}`}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {ebook.title}
                  </a>
                </td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {formattedLanguage && (
                    <span className="text-sm">{formattedLanguage}</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </main>
);
