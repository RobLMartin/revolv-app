import { cn } from "./cn";

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-950",
        className
      )}
      {...props}
    />
  );
}
