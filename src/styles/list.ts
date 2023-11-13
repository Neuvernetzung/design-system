import { cn } from "@/utils";

import { paddingsY } from "./paddings";

export const listStyle = cn(
  "pl-5 space-y-2 marker:text-accent-400 dark:marker:text-accent-600", // absichtlich kein list-inside, da sonst bei RichText Editor LI auf neue Zeile gesetzt wird
  paddingsY.md
);
