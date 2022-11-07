import cn from "classnames";
import { ElementType, memo } from "react";
import { useColorState } from "../../../theme";

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
import { Colors } from "../../../types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type ToastProps = {
  message: string;
  color?: keyof Colors;
  icon?: ElementType<SVGElement>;
  handleClose: Function;
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
  const { colorState } = useColorState();

  return (
    <div
      role="dialog"
      aria-label={color}
      className={cn(
        "flex w-64 flex-row justify-between overflow-hidden",
        roundings.md,
        shadows.lg,
        gaps.xl,
        paddingsEvenly.lg,
        variants(color, colorState)[variant].container
      )}
    >
      <div className={cn("flex flex-row", gaps.md)}>
        {icon && (
          <div className={cn(variants(color, colorState)[variant].icon)}>
            <Icon size="sm" icon={icon} />
          </div>
        )}
        <Text
          size="sm"
          className={cn(variants(color, colorState)[variant].text)}
        >
          {message}
        </Text>
      </div>
      <IconButton
        size="sm"
        variant="ghost"
        aria-label="close-dialog"
        onClick={handleClose}
        icon={XMarkIcon}
        className={cn(variants(color, colorState)[variant].close)}
      />
    </div>
  );
};

export default memo(Toast);

Toast.defaultProps = {
  variant: "outline",
  color: "accent",
  icon: undefined,
};