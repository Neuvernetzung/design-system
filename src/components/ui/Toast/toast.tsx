import cn from "classnames";
import type { MouseEventHandler } from "react";

import {
  bgColors,
  borders,
  gaps,
  paddingsEvenly,
  roundings,
  shadows,
  textColors,
} from "../../../styles";
import { IconX } from "@tabler/icons-react";
import { useThemeState } from "../../../theme/useThemeState";
import type {
  Color,
  ExtendedColor,
  SvgType,
  ToastVariant,
} from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { IconButton } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography/Text";

export type ToastProps = {
  message: string;
  color?: Color;
  icon?: SvgType;
  handleClose: MouseEventHandler;
  variant?: ToastVariant;
};

export const variants = (
  color: Color,
  adjustedTextColorState: Record<ExtendedColor, string>
): Record<ToastVariant, VariantProps> => ({
  outline: {
    container: cn(bgColors.white, borders.accent, "border"),
    icon: cn(textColors[color], "flex"),
    text: cn(textColors.accent),
    close: cn(textColors.accent),
  },
  solid: {
    container: cn(bgColors[color]),
    icon: cn(adjustedTextColorState[color], "flex"),
    text: cn(adjustedTextColorState[color]),
    close: cn(adjustedTextColorState[color]),
  },
});

type VariantProps = {
  container: string;
  icon: string;
  text: string;
  close: string;
};

export const Toast = ({
  variant = "outline",
  message,
  handleClose,
  color = "accent",
  icon,
}: ToastProps) => {
  const { adjustedTextColorState } = useThemeState();

  return (
    <div
      role="dialog"
      aria-label={color}
      className={cn(
        "flex w-64 flex-row justify-between items-start",
        roundings.md,
        shadows.lg,
        gaps.xl,
        paddingsEvenly.lg,
        variants(color, adjustedTextColorState)[variant].container
      )}
    >
      <div className={cn("flex flex-row justify-start", gaps.md)}>
        {icon && (
          <div
            className={cn(
              variants(color, adjustedTextColorState)[variant].icon
            )}
          >
            <Icon size="sm" icon={icon} />
          </div>
        )}
        <Text
          size="sm"
          className={cn(
            variants(color, adjustedTextColorState)[variant].text,
            "w-36 break-words overflow-hidden"
          )}
          color="inherit"
        >
          {message}
        </Text>
      </div>
      <IconButton
        size="sm"
        variant="ghost"
        ariaLabel="close-dialog"
        onClick={handleClose}
        color="inherit"
        icon={IconX}
        className={cn(variants(color, adjustedTextColorState)[variant].close)}
      />
    </div>
  );
};

export default typedMemo(Toast);
