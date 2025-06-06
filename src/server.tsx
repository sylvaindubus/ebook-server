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
        <link href="/styles.css" rel="stylesheet" />
        <title>Ebooks</title>
      </head>
      <body class="font-serif">${html}</body>
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
