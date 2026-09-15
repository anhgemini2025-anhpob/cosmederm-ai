import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padded?: boolean;
}

export default function Card({ children, className, padded = true, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white shadow-card border border-black/[0.03]",
        padded && "p-5",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
