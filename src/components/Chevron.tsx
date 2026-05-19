type Props = {
  direction?: "up" | "down";
  className?: string;
};

export const Chevron = ({ direction = "up", className = "inline-block w-3 h-3" }: Props) => (
  <svg
    className={className}
    viewBox="-1 -2 12 10"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={direction === "down" ? "M1 1 L5 5 L9 1" : "M1 5 L5 1 L9 5"} />
  </svg>
);
