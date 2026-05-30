import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "green" | "outline";
  className?: string;
}

const variants = {
  default: "bg-gray-100 text-gray-700",
  gold: "bg-amber-50 text-[#a07d1a] border border-amber-200",
  green: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  outline: "border border-gray-300 text-gray-600 bg-transparent",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
