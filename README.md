# 📚 Ebook Server

A simple server-side rendered (SSR) Node.js app using Express and React, displaying a list of `.epub` files from a directory. It reads metadata, renders a minimalistic UI and supports file downloads.

---

## 🚀 Features

- Dynamically lists `.epub` files from a configured directory
- Extracts EPUB metadata (title, author, etc.) using [`epub`](https://www.npmjs.com/package/epub)
- Server-side rendering (SSR) with React (`renderToString`)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Download endpoint for each file (`/download/:filename`)
- Lightweight Docker setup using `node:20-slim`

---

## 🧪 Development

```bash
# Install dependencies
npm ci

# Start in dev mode (with hot reload)
npm run dev

# Visit:
http://localhost:1455
```

## ⚙️ Environment Variables

Adjust the environment variables if necessary:

| Variable    | Description                      | Required              |
| ----------- | -------------------------------- | --------------------- |
| EBOOKS_PATH | Absolute path to the EPUB folder | ❌ (default: /ebooks) |
| PORT        |  Port to run the Express server  | ❌ (default: 5000)    |

## 🐳 Running with Docker

```bash
# Build the image
docker build -t ebook-server .

# Run the container
docker run -p 1455:1455 -v /local/path/to/epubs:/ebooks ebook-server
```

## 🛣️ TODO / Ideas

- Display cover images
- Paginate the list
- Search or filter by title/author

## 📝 License

MIT — free to use and modify.
