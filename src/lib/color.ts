/** Converts a 6-digit hex colour to an rgba() string. */
export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  if ([r, g, b].some(Number.isNaN)) return `rgba(23, 22, 20, ${alpha})`;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Mixes a hex colour towards white (amount 0–1). */
export function lighten(hex: string, amount: number): string {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const channels = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16));
  const mixed = channels.map((c) => Math.round(c + (255 - c) * amount));
  return `#${mixed.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}
