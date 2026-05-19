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

// Parse an ISO 8601 duration like "PT5M", "PT1H30M", "PT30S".
// Returns null for invalid input or "PT0S" (cache disabled).
const parseIsoDuration = (input: string): number | null => {
  const match = input.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/)
  if (!match || match[0] === "PT") return null
  const [, h, m, s] = match
  const ms = ((Number(h) || 0) * 3600 + (Number(m) || 0) * 60 + (Number(s) || 0)) * 1000
  return ms > 0 ? ms : null
}

const defaultCacheTtl = process.env.NODE_ENV === "production" ? "PT5M" : "PT0S"
const CACHE_TTL_MS = parseIsoDuration(process.env.CACHE_TTL || defaultCacheTtl)
const cache = new Map<string, { expiresAt: number; ebooks: Ebook[] }>()

export const loadEbooks = async (folderPath: string, options: { skipCache?: boolean } = {}) => {
  if (CACHE_TTL_MS !== null && !options.skipCache) {
    const cached = cache.get(folderPath)
    if (cached && cached.expiresAt > Date.now()) {
      return cached.ebooks
    }
  }

  if (!fs.existsSync(folderPath)) {
    console.error(`Ebooks path does not exist: ${folderPath}`)
    return []
  }

  const paths = fs
    .readdirSync(folderPath)
    .filter((filename) => filename.endsWith(".epub"))
    .map((fileName) => path.join(folderPath, fileName))

  const results = await Promise.allSettled(paths.map(loadEpubMetadata))
  const ebooks = results.filter((r): r is PromiseFulfilledResult<Ebook> => r.status === "fulfilled").map((r) => r.value)

  if (CACHE_TTL_MS !== null) {
    cache.set(folderPath, { expiresAt: Date.now() + CACHE_TTL_MS, ebooks })
  }
  return ebooks
}
