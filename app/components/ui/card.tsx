import { cn } from "../../lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-200 bg-white shadow-sm p-6 dark:border-gray-800 dark:bg-gray-950",
        className
      )}
      {...props}
    />
  );
}
