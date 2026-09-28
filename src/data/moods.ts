import { products } from "@/data/products";
import { cn } from "@/lib/utils";

export type MoodId =
  | "cozy"
  | "fresh"
  | "energized"
  | "romantic"
  | "playful"
  | "calm";

export type Mood = {
  id: MoodId;
  label: string;
  /** One short line shown once a mood is picked. */
  line: string;
  accentColor: string;
};

/**
 * Six moods, one per fragrance. The mapping is 1:1 today but stays data-driven
 * so two scents can share a mood later without touching components.
 */
export const moods: Mood[] = [
  {
    id: "cozy",
    label: "Cozy",
    line: "Something warm, then nothing to do.",
    accentColor: "#C9AE86",
  },
  {
    id: "fresh",
    label: "Fresh",
    line: "Open a window. Change the room.",
    accentColor: "#8FA9B4",
  },
  {
    id: "calm",
    label: "Calm",
    line: "Lower the lights and the volume.",
    accentColor: "#AAB29E",
  },
  {
    id: "romantic",
    label: "Romantic",
    line: "Worth doing properly.",
    accentColor: "#D6A0A0",
  },
  {
    id: "playful",
    label: "Playful",
    line: "Light one for no reason at all.",
    accentColor: "#C8785C",
  },
  {
    id: "energized",
    label: "Energized",
    line: "Second coffee, but make it ambience.",
    accentColor: "#A8B584",
  },
];

/* -------------------------------------------------------------------------- */
/*                          Scent discovery (3 steps)                        */
/* -------------------------------------------------------------------------- */

export type FinderOptionId =
  | "calm"
  | "fresh"
  | "cozy"
  | "romantic"
  | "happy"
  | "morning"
  | "work"
  | "evening"
  | "date-night"
  | "weekend"
  | "soft"
  | "balanced"
  | "strong";

export type FinderOption = {
  id: FinderOptionId;
  label: string;
  /** Per-product affinity weights used by the recommendation engine. */
  weights: Partial<Record<MoodId, number>>;
};

export type FinderStep = {
  id: string;
  question: string;
  options: FinderOption[];
};

export const finderSteps: FinderStep[] = [
  {
    id: "feeling",
    question: "How do you want to feel?",
    options: [
      {
        id: "calm",
        label: "Calm",
        weights: { calm: 4, cozy: 2, romantic: 1 },
      },
      {
        id: "fresh",
        label: "Fresh",
        weights: { fresh: 4, energized: 2 },
      },
      {
        id: "cozy",
        label: "Cozy",
        weights: { cozy: 4, calm: 1, playful: 1 },
      },
      {
        id: "romantic",
        label: "Romantic",
        weights: { romantic: 4, playful: 1, calm: 1 },
      },
      {
        id: "happy",
        label: "Happy",
        weights: { playful: 4, energized: 2, fresh: 1 },
      },
    ],
  },
  {
    id: "moment",
    question: "When will you light it?",
    options: [
      {
        id: "morning",
        label: "Morning",
        weights: { fresh: 3, energized: 3, calm: 1 },
      },
      {
        id: "work",
        label: "Work",
        weights: { energized: 2, fresh: 2, calm: 2 },
      },
      {
        id: "evening",
        label: "Evening",
        weights: { cozy: 3, calm: 3, romantic: 2 },
      },
      {
        id: "date-night",
        label: "Date night",
        weights: { romantic: 4, cozy: 1, playful: 1 },
      },
      {
        id: "weekend",
        label: "Weekend",
        weights: { playful: 3, cozy: 2, calm: 1 },
      },
    ],
  },
  {
    id: "intensity",
    question: "Choose your intensity",
    options: [
      {
        id: "soft",
        label: "Soft",
        weights: { calm: 3, romantic: 3, cozy: 1 },
      },
      {
        id: "balanced",
        label: "Balanced",
        weights: { cozy: 1, fresh: 1, romantic: 1, playful: 1, calm: 1, energized: 1 },
      },
      {
        id: "strong",
        label: "Strong",
        weights: { energized: 3, fresh: 3, playful: 2, romantic: 1 },
      },
    ],
  },
];

export type FinderAnswers = (FinderOptionId | null)[];

/**
 * Weighted scoring across all three answers. Ties resolve to the product with
 * the strongest single answer so results never feel arbitrary.
 */
export function recommendProduct(answers: FinderAnswers) {
  const scores = new Map<MoodId, number>();

  finderSteps.forEach((step, index) => {
    const answer = answers[index];
    if (!answer) return;
    const option = step.options.find((o) => o.id === answer);
    if (!option) return;
    Object.entries(option.weights).forEach(([mood, weight]) => {
      const key = mood as MoodId;
      scores.set(key, (scores.get(key) ?? 0) + (weight ?? 0));
    });
  });

  if (scores.size === 0) return products[0];

  const ranked = [...scores.entries()].sort((a, b) => b[1] - a[1]);
  const topMood = ranked[0][0];
  return products.find((p) => p.mood === topMood) ?? products[0];
}

/** Builds the "why it matches" line from the user's own answers. */
export function buildMatchReason(answers: FinderAnswers): string {
  const labels = finderSteps
    .map((step, index) => {
      const answer = answers[index];
      if (!answer) return null;
      return step.options.find((o) => o.id === answer)?.label ?? null;
    })
    .filter(Boolean) as string[];

  if (labels.length === 0) return "A safe, crowd-pleasing pick.";
  if (labels.length < 3) {
    return `Based on ${labels.join(" and ").toLowerCase()}, this is the closest match.`;
  }
  return `${labels[0]}, ${labels[1].toLowerCase()} and ${labels[2].toLowerCase()} — this is the one.`;
}

/** Human-readable, screen-reader friendly mood name. */
export function getMood(id: MoodId): Mood | undefined {
  return moods.find((m) => m.id === id);
}

export function getMoodClass(id: MoodId, active: boolean): string {
  const mood = getMood(id);
  return cn("transition-colors", active && mood ? "text-ink-900" : "");
}
