type Props = {
  direction?: "up" | "down";
};

export const Chevron = ({ direction = "up" }: Props) => (
  <svg
    className={`inline-block ml-1 w-3 h-3 transition-transform ${direction === "down" ? "rotate-180" : ""}`}
    viewBox="0 0 10 6"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M1 5 L5 1 L9 5" />
  </svg>
);
