import { cn } from "../../lib/utils";
import type { HTMLAttributes } from "react";

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-100 bg-white shadow-sm p-6 dark:border-gray-700 dark:bg-gray-950",
        className
      )}
      {...props}
    />
  );
}
