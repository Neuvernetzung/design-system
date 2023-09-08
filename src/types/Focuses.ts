export const focusesVariants = ["ring", "bg"] as const;

export type FocusVariants = typeof focusesVariants;

export type FocusVariant = FocusVariants[number];
