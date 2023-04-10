import cn from "classnames";
import { MouseEventHandler } from "react";

import {
  adjustedTextColors,
  bgColors,
  borders,
  gaps,
  paddingsEvenly,
  roundings,
  shadows,
  textColors,
} from "../../../styles";
import { CrossIcon } from "../../../theme/icons";
import { useThemeState } from "../../../theme/useThemeState";
import { Colors, SvgType } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { IconButton } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type ToastProps = {
  message: string;
  color?: keyof Colors;
  icon?: SvgType;
  handleClose: MouseEventHandler;
  variant?: keyof ToastVariants;
};

export const variants = (
  color: keyof Colors,
  colorState?: Colors
): Record<keyof ToastVariants, VariantProps> => ({
  outline: {
    container: cn(bgColors.white, borders.accent, "border"),
    icon: cn(textColors[color], "flex"),
    text: cn(textColors.accent),
    close: cn(textColors.accent),
  },
  solid: {
    container: cn(bgColors[color]),
    icon: cn(adjustedTextColors(colorState)[color], "flex"),
    text: cn(adjustedTextColors(colorState)[color]),
    close: cn(adjustedTextColors(colorState)[color]),
  },
});

export type ToastVariants = {
  outline: any;
  solid: any;
};

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
  const { colorState } = useThemeState();

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
        variants(color, colorState)[variant].container
      )}
    >
      <div className={cn("flex flex-row justify-start", gaps.md)}>
        {icon && (
          <div className={cn(variants(color, colorState)[variant].icon)}>
            <Icon size="sm" icon={icon} />
          </div>
        )}
        <Text
          size="sm"
          className={cn(
            variants(color, colorState)[variant].text,
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
        icon={CrossIcon}
        className={cn(variants(color, colorState)[variant].close)}
      />
    </div>
  );
};

export default typedMemo(Toast);
