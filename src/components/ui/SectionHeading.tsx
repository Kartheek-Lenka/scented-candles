import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  tone = "light",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow", dark ? "text-cream/70" : "text-stone-400")}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "display-lg max-w-[16ch] text-balance",
          align === "center" && "max-w-[20ch]",
          dark ? "text-cream" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "max-w-prose text-base leading-relaxed sm:text-lg",
            dark ? "text-cream/75" : "text-stone-500",
          )}
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}
