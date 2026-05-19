type Props = {
  direction?: "up" | "down";
  className?: string;
};

export const Chevron = ({ direction = "up", className = "w-3 h-3" }: Props) => (
  <svg
    className={`inline-block transition-transform ${className} ${direction === "down" ? "rotate-180" : ""}`}
    viewBox="-1 -2 12 10"
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
