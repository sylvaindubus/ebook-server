import { Chevron } from "./Chevron";

const OVERLAP_PX = 40;

const scrollByViewport = (direction: "up" | "down") => {
  const delta = (window.innerHeight - OVERLAP_PX) * (direction === "down" ? 1 : -1);
  window.scrollBy({ top: delta, left: 0, behavior: "auto" });
};

const buttonClass =
  "w-12 h-12 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-md text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white active:bg-gray-100 dark:active:bg-gray-700";

export const ScrollButtons = () => (
  <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
    <button type="button" aria-label="Scroll up" className={buttonClass} onClick={() => scrollByViewport("up")}>
      <Chevron direction="up" className="w-4 h-4" />
    </button>
    <button type="button" aria-label="Scroll down" className={buttonClass} onClick={() => scrollByViewport("down")}>
      <Chevron direction="down" className="w-4 h-4" />
    </button>
  </div>
);
