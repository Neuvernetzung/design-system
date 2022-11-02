import cn from "classnames";
import { ElementType, memo } from "react";

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
import { XMarkIcon } from "../../icons";
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
  color: keyof Colors
): Record<keyof ToastVariants, VariantProps> => ({
  outline: {
    container: cn(bgColors.white, borders.accent, "border"),
    icon: cn(textColors[color]),
    text: cn(textColors.accent),
    close: cn(textColors.accent),
  },
  solid: {
    container: cn(bgColors[color]),
    icon: cn(adjustedTextColors[color]),
    text: cn(adjustedTextColors[color]),
    close: cn(adjustedTextColors[color]),
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
}: ToastProps) => (
  <div
    role="dialog"
    aria-label={color}
    className={cn(
      "w-64 flex flex-row overflow-hidden justify-between",
      roundings.md,
      shadows.lg,
      gaps.xl,
      paddingsEvenly.lg,
      variants(color)[variant].container
    )}
  >
    <div className={cn("flex flex-row", gaps.md)}>
      {icon && (
        <div className={cn(variants(color)[variant].icon)}>
          <Icon size="sm" icon={icon} />
        </div>
      )}
      <Text size="sm" className={cn(variants(color)[variant].text)}>
        {message}
      </Text>
    </div>
    <IconButton
      size="sm"
      variant="ghost"
      aria-label="close-dialog"
      onClick={handleClose}
      icon={XMarkIcon}
      className={cn(variants(color)[variant].close)}
    />
  </div>
);

export default memo(Toast);

Toast.defaultProps = {
  variant: "outline",
  color: "accent",
  icon: undefined,
};
