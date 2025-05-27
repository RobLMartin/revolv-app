import * as React from "react";

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const base =
      "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none";
    const variants = {
      default:
        "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-100 dark:text-slate-900",
      outline:
        "border border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:hover:bg-slate-800",
    } as const;
    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
