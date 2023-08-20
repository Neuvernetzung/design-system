import cn from "classnames";
import { MouseEventHandler } from "react";

import {
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
import { Colors, ExtendedColors, SvgType } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { IconButton } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";
import { m } from "framer-motion";

export type ToastProps = {
  message: string;
  color?: keyof Colors;
  icon?: SvgType;
  handleClose: MouseEventHandler;
  variant?: keyof ToastVariants;
};

export const variants = (
  color: keyof Colors,
  adjustedTextColorState: ExtendedColors
): Record<keyof ToastVariants, VariantProps> => ({
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
  const { adjustedTextColorState } = useThemeState();

  return (
    <m.div
      initial={{ y: 5, opacity: 0 }}
      animate={{ y: 0, opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
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
        icon={CrossIcon}
        className={cn(variants(color, adjustedTextColorState)[variant].close)}
      />
    </m.div>
  );
};

export default typedMemo(Toast);
