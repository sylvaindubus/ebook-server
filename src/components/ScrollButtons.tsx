import { Chevron } from "./Chevron";

const buttonClass =
  "p-4 leading-none rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-md text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white active:bg-gray-100 dark:active:bg-gray-700";

export const ScrollButtons = () => (
  <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
    <button type="button" aria-label="Scroll up" className={buttonClass} data-scroll="up">
      <Chevron direction="up" className="block w-4 h-4" />
    </button>
    <button type="button" aria-label="Scroll down" className={buttonClass} data-scroll="down">
      <Chevron direction="down" className="block w-4 h-4" />
    </button>
  </div>
);
