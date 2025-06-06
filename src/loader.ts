import EPub from "epub"
import fs from "fs"
import path from "path"

import { Ebook } from "./types"

export const loadEpubMetadata = (filePath: string): Promise<Ebook> => {
  return new Promise((resolve, reject) => {
    const epub = new EPub(filePath)

    epub.on("error", (err) => {
      reject(err)
    })

    epub.on("end", () => {
      const metadata: Ebook = {
        title: epub.metadata.title || path.basename(filePath),
        author: epub.metadata.creator || "N/A",
        language: epub.metadata.language || "N/A",
        filePath,
      }

      return resolve(metadata)
    })

    epub.parse()
  })
}

export const loadEbooks = async (folderPath: string) => {
  if (!fs.existsSync(folderPath)) {
    console.error(`Ebooks path does not exist: ${folderPath}`)
    return []
  }

  const paths = fs
    .readdirSync(folderPath)
    .filter((filename) => filename.endsWith(".epub"))
    .map((fileName) => path.join(folderPath, fileName))

  const results = await Promise.allSettled(paths.map(loadEpubMetadata))

  return results.filter((r): r is PromiseFulfilledResult<Ebook> => r.status === "fulfilled").map((r) => r.value)
}
