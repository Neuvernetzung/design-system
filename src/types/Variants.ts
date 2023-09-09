export const inputVariants = ["outline", "filled", "ghost"] as const;

export type InputVariants = typeof inputVariants;

export type InputVariant = InputVariants[number];

export const buttonVariants = [
  "filled",
  "outline",
  "ghost",
  "subtile",
] as const;

export type ButtonVariants = typeof buttonVariants;

export type ButtonVariant = ButtonVariants[number];

export const checkboxVariants = ["default", "button"] as const;

export type CheckboxVariants = typeof checkboxVariants;

export type CheckboxVariant = CheckboxVariants[number];

export const disclosureVariants = ["button", "border"] as const;

export type DisclosureVariants = typeof disclosureVariants;

export type DisclosureVariant = DisclosureVariants[number];

export const tagVariants = ["outline", "solid", "subtile"] as const;

export type TagVariants = typeof tagVariants;

export type TagVariant = TagVariants[number];

export const toastVariants = ["outline", "solid"] as const;

export type ToastVariants = typeof toastVariants;

export type ToastVariant = ToastVariants[number];

export const radioVariants = ["default", "button"] as const;

export type RadioVariants = typeof radioVariants;

export type RadioVariant = RadioVariants[number];

export const requiredInfoVariants = ["star", "text", "optional"] as const;

export type RequiredInfoVariants = typeof requiredInfoVariants;

export type RequiredInfoVariant = RequiredInfoVariants[number];
