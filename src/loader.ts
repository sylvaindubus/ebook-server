import EPub from "epub"
import fs from "fs"
import path from "path"

import { Ebook } from "./types"

export const findCoverImage = (epub: EPub): Promise<{ data: Buffer; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const manifestEntries = Object.entries(epub.manifest)

    // 1. First, try to find an image with "cover" in the ID or href
    const coverImageEntry = manifestEntries.find(([id, item]) => {
      const type = item["media-type"] || item.mediaType
      const href = item.href?.toLowerCase?.() || ""
      return type?.startsWith("image/") && (id.toLowerCase().includes("cover") || href.includes("cover"))
    })

    if (coverImageEntry) {
      const [coverId] = coverImageEntry
      return epub.getImage(coverId, (err, data, mimeType) => {
        if (err || !data) return reject(new Error("Failed to get cover image"))
        return resolve({ data, mimeType })
      })
    }

    // 2. Otherwise, try to find a reasonable fallback image (e.g., from /images/)
    const fallbackImageEntry = manifestEntries.find(([_, item]) => {
      const type = item["media-type"] || item.mediaType
      const href = item.href?.toLowerCase?.() || ""
      return type?.startsWith("image/") && href.includes("/images/")
    })

    if (fallbackImageEntry) {
      const [imgId] = fallbackImageEntry
      return epub.getImage(imgId, (err, data, mimeType) => {
        if (err || !data) return reject(new Error("Failed to get fallback image"))
        return resolve({ data, mimeType })
      })
    } else {
      reject(new Error("No image found"))
    }
  })
}

export const loadEpubMetadata = (filePath: string): Promise<Ebook> => {
  return new Promise((resolve, reject) => {
    const epub = new EPub(filePath)

    epub.on("error", (err) => {
      reject(err)
    })

    epub.on("end", async () => {
      let coverUrl: string | undefined
      try {
        const { data, mimeType } = await findCoverImage(epub)
        coverUrl = `data:${mimeType};base64,${data.toString("base64")}`
      } catch {
        coverUrl = undefined
      }

      const metadata: Ebook = {
        title: epub.metadata.title || path.basename(filePath),
        author: epub.metadata.creator || "N/A",
        language: epub.metadata.language || "N/A",
        filePath,
        coverUrl,
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
