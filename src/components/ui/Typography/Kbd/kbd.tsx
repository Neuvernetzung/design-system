import { ReactNode } from "react";
import type { Size } from "../../../../types";
import {
  bgColors,
  borders,
  paddingsXSmall,
  roundings,
  shadows,
  textSizes,
} from "../../../../styles";
import { cn } from "@/utils";
import { smallerSize } from "../../../../utils";

export type KbdProps = { size?: Size; children: ReactNode };

export const Kbd = ({ size = "md", children }: KbdProps) => (
  <kbd
    className={cn(
      "font-mono border border-b-2",
      bgColors.white,
      borders.accent,
      shadows[smallerSize(size)],
      roundings[size],
      paddingsXSmall[size],
      textSizes[size]
    )}
  >
    {children}
  </kbd>
);
