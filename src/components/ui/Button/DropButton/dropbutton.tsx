import { Slot } from "@radix-ui/react-slot";
import { ReactNode } from "react";

import {
  extendedBgColorsInteractive,
  extendedBorders,
  extendedTextColors,
  minHeights,
  paddings,
  roundings,
  transition,
} from "@/styles";
import type { ExtendedColor, Size } from "@/types";
import { cn } from "@/utils";

import { Button } from "..";
import { buttonBaseStyles } from "../button";

export type DropButtonProps = {
  asChild?: boolean;
  color?: ExtendedColor;
  size?: Size;
  disabled?: boolean;
  children: ReactNode;
  className?: string;
};

export const DropButton = ({
  asChild,
  color = "accent",
  size = "md",
  disabled,
  className,
  ...props
}: DropButtonProps) => {
  const Component = asChild ? Slot : Button;
  return (
    <Component
      className={cn(
        "border-2 border-dashed bg-opacity-0 hover:bg-opacity-10",
        buttonBaseStyles,
        transition,
        extendedTextColors[color],
        extendedBgColorsInteractive[color],
        extendedBorders[color],
        paddings[size],
        roundings[size],
        minHeights[size],
        disabled && "cursor-not-allowed",
        className
      )}
      {...props}
    />
  );
};
