import express from "express"
import path from "path"
import { renderToString } from "react-dom/server"
import { App } from "./components/App"

import type { Request, Response } from "express"
import { loadEbooks } from "./loader"

const app = express()
const PORT = process.env.PORT || 1455
const EBOOKS_PATH = process.env.EBOOKS_PATH || "/ebooks"

app.use(express.static(path.resolve("public")))

app.get("/", async (_req, res) => {
  const ebooks = await loadEbooks(EBOOKS_PATH)

  const html = renderToString(<App ebooks={ebooks} />)
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Besley&display=swap" rel="stylesheet">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
        <link rel="manifest" href="/site.webmanifest">
        <link href="/styles.css" rel="stylesheet" />
        <title>Ebooks</title>
      </head>
      <body class="font-serif bg-[#e9e7e0]">${html}</body>
    </html>
  `)
})

app.get("/download/:filename", (req: Request<{ filename: string }>, res: Response) => {
  const filename = req.params.filename
  const filePath = path.join(EBOOKS_PATH, filename)

  if (!filePath.startsWith(EBOOKS_PATH)) {
    res.status(400).send("Invalid path")
    return
  }

  res.download(filePath, (err) => {
    if (err) {
      res.status(404).send("File cannot be found")
    }
  })
})

app.listen(PORT, () => console.log(`✅ Listening on http://localhost:${PORT}`))
