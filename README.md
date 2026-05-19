# 📚 Ebook Server

A simple server-side rendered (SSR) Node.js app using Express and React, displaying a list of `.epub` files from a directory. It reads metadata, renders a minimalistic UI and supports file downloads.

---

## 🚀 Features

- Dynamically lists `.epub` files from a configured directory
- Extracts EPUB metadata (title, author, etc.) using [`epub`](https://www.npmjs.com/package/epub)
- Server-side rendering (SSR) with React (`renderToString`), hydrated on the client for interactive sorting
- In-memory cache of parsed metadata to avoid re-reading every EPUB on each request
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Download endpoint for each file (`/download/:filename`)
- Lightweight Docker setup using `node:24-slim`

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

| Variable      | Description                                                                                      | Required                                            |
| ------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| `EBOOKS_PATH` | Absolute path to the EPUB folder                                                                 | No (default: `./samples`)                           |
| `PORT`        | Port to run the Express server                                                                   | No (default: `1455`)                                |
| `CACHE_TTL`   | In-memory cache TTL for parsed EPUB metadata, as an ISO 8601 duration. Set to `PT0S` to disable. | No (default: `PT5M` in production, disabled in dev) |

## 🐳 Running with Docker

```bash
# Build the image
docker build -t ebook-server .

# Run the container
docker run -p 1455:1455 -v /local/path/to/epubs:/ebooks ebook-server
```

The Docker image sets `NODE_ENV=production` and `CACHE_TTL=PT5M` by default. You can override the cache TTL at runtime:

```bash
docker run -e CACHE_TTL=PT30M -p 1455:1455 -v /local/path/to/epubs:/ebooks ebook-server
```

## 🛣️ TODO / Ideas

- Paginate the list
- Search or filter by title/author

## 📝 License

MIT — free to use and modify.
