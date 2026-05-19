import { EPub } from "epub"
import fs from "fs"
import path from "path"

import { Ebook } from "./types"

export const loadEpubMetadata = async (filePath: string): Promise<Ebook> => {
  const epub = new EPub(filePath)
  await epub.parse()

  return {
    title: epub.metadata.title || path.basename(filePath),
    author: epub.metadata.creator || "N/A",
    language: epub.metadata.language || "N/A",
    filePath,
  }
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
