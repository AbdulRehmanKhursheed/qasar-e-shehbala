import { cn } from "@/lib/utils";

interface GeometricMotifProps {
  className?: string;
}

export function GeometricMotif({ className }: GeometricMotifProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.8"
      className={cn("opacity-70", className)}
      aria-hidden="true"
    >
      <polygon points="50,3 97,50 50,97 3,50" />
      <polygon points="16,16 84,16 84,84 16,84" />
      <circle cx="50" cy="50" r="26" />
      <circle cx="50" cy="50" r="17" />
      <polygon points="50,24 68,50 50,76 32,50" />
      <circle cx="50" cy="50" r="3.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
