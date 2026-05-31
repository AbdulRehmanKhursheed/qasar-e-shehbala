import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "jewel" | "royal" | "outline" | "onDark";
  className?: string;
}

const variants = {
  default: "bg-ink/5 text-ink",
  jewel: "bg-jewel/10 text-jewel border border-jewel/20",
  royal: "bg-royal/10 text-royal border border-royal/20",
  outline: "border border-ink/15 text-ink/70 bg-transparent",
  onDark: "border border-ivory/20 text-ivory/85 bg-ivory/5",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
