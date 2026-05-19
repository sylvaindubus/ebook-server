import { hydrateRoot } from "react-dom/client";
import { App } from "./components/App";
import { Ebook } from "./types";

declare global {
  interface Window {
    __INITIAL_DATA__: { ebooks: Ebook[] };
  }
}

const { ebooks } = window.__INITIAL_DATA__;
hydrateRoot(document.getElementById("root")!, <App ebooks={ebooks} />);
