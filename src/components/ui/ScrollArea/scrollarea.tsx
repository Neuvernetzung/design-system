import {
  Root as ScrollAreaRoot,
  ScrollAreaCorner,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from "@radix-ui/react-scroll-area";
import type { ReactNode } from "react";

import {
  extendedBgColorsInteractive,
  paddingsSmallEvenly,
  roundings,
} from "@/styles";
import { cn } from "@/utils";

export type ScrollAreaProps = {
  className?: string;
  scrollHideDelay?: number;
  children: ReactNode;
};

const scrollbarClassName = cn(
  "flex select-none touch-none data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5",
  paddingsSmallEvenly.sm
);

const thumbClassName = cn(
  "flex-1 relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-2 before:min-h-2",
  extendedBgColorsInteractive.filled,
  roundings.sm
);

export const ScrollArea = ({
  className,
  children,
  scrollHideDelay = 200,
}: ScrollAreaProps) => (
  <ScrollAreaRoot
    scrollHideDelay={scrollHideDelay}
    className={cn("overflow-hidden", className)}
  >
    <ScrollAreaViewport className="h-full w-full">
      {children}
    </ScrollAreaViewport>
    <ScrollAreaScrollbar
      className={cn(scrollbarClassName)}
      orientation="vertical"
    >
      <ScrollAreaThumb className={cn(thumbClassName)} />
    </ScrollAreaScrollbar>
    <ScrollAreaScrollbar
      className={cn(scrollbarClassName)}
      orientation="horizontal"
    >
      <ScrollAreaThumb className={cn(thumbClassName)} />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
);
