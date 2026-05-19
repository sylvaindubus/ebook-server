import { useMemo, useState } from "react";
import formatLanguage from "../utils/formatLanguage";
import capitalizeWords from "../utils/capitalizeWords";
import { Chevron } from "./Chevron";
import { ScrollButtons } from "./ScrollButtons";
import { Ebook } from "../types";

type Props = {
  ebooks: Ebook[];
};

type SortKey = "author" | "title" | "language";
type SortDir = "asc" | "desc";

const collator = new Intl.Collator("fr", { sensitivity: "base" });

export const App = ({ ebooks }: Props) => {
  const [sortKey, setSortKey] = useState<SortKey>("author");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sortedEbooks = useMemo(() => {
    const copy = [...ebooks];
    copy.sort((a, b) => {
      const cmp = collator.compare(a[sortKey] || "", b[sortKey] || "");
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [ebooks, sortKey, sortDir]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const renderArrow = (key: SortKey) => {
    if (key !== sortKey) return null;
    return <Chevron direction={sortDir === "asc" ? "up" : "down"} />;
  };

  const headerClass = "text-left p-4 md:px-6 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer select-none hover:text-black dark:hover:text-white";
  const headerInnerClass = "inline-flex items-center gap-2 leading-none";

  return (
    <main className="p-4 md:p-8 max-w-[1920px] mx-auto">
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-center dark:text-white text-black">
        Ebooks
      </h1>
      <div className="text-8xl text-center font-medium">~</div>
      <div className="mt-12 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300 dark:border-gray-600">
              <th className={headerClass} onClick={() => handleSort("author")}>
                <span className={headerInnerClass}>Author{renderArrow("author")}</span>
              </th>
              <th className={headerClass} onClick={() => handleSort("title")}>
                <span className={headerInnerClass}>Title{renderArrow("title")}</span>
              </th>
              <th className={`hidden md:table-cell ${headerClass}`} onClick={() => handleSort("language")}>
                <span className={headerInnerClass}>Language{renderArrow("language")}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedEbooks.map((ebook) => {
              const formattedLanguage = formatLanguage(ebook.language);
              const capitalizedAuthor = capitalizeWords(ebook.author);
              return (
                <tr key={ebook.filePath} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                  <td className="p-4 md:px-6 text-gray-900 dark:text-gray-100">{capitalizedAuthor}</td>
                  <td className="p-4 md:px-6">
                    <a
                      href={`/download/${ebook.filePath.split(/[\\/]/).pop()}`}
                      title={`Download ${ebook.title}`}
                      className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {ebook.title}
                    </a>
                  </td>
                  <td className="hidden md:table-cell p-4 md:px-6 text-gray-600 dark:text-gray-400">
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
      <ScrollButtons />
    </main>
  );
};
