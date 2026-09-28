import { cn } from "@/lib/utils";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-4 transition-transform duration-300", className)}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h13M13 6.5 18.5 12 13 17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
