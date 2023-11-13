import {
  Root as ToastRoot,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "@radix-ui/react-toast";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/utils";

import {
  bgColors,
  borders,
  gaps,
  gapsSmall,
  paddingsEvenly,
  roundings,
  shadows,
  textColors,
} from "../../../styles";
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
import { Heading } from "../Typography/Heading";
import { Text } from "../Typography/Text";

export type ToastProps = {
  message: string;
  title?: string;
  color?: Color;
  icon?: SvgType;
  open: boolean;
  setOpen: (open: boolean) => void;
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
  open,
  setOpen,
  color = "accent",
  icon,
  title,
}: ToastProps) => {
  const { adjustedTextColorState } = useThemeState();

  return (
    <ToastRoot
      role="listitem"
      open={open}
      onOpenChange={setOpen}
      className={cn(
        "flex w-64 flex-row justify-between items-start",
        "translate-x-[--radix-toast-swipe-move-x] data-[swipe=cancel]:translate-x-0 opacity-100 data-[swipe=end]:opacity-0 transition-opacity",
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
        <div className={cn("flex flex-col", gapsSmall.sm)}>
          {title && (
            <ToastTitle asChild>
              <Heading
                size="sm"
                className={cn(
                  variants(color, adjustedTextColorState)[variant].text,
                  "w-36 break-words overflow-hidden"
                )}
                color="inherit"
              >
                {title}
              </Heading>
            </ToastTitle>
          )}
          <ToastDescription asChild>
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
          </ToastDescription>
        </div>
      </div>
      <ToastClose asChild>
        <IconButton
          size="sm"
          variant="ghost"
          ariaLabel="close-dialog"
          color="inherit"
          icon={IconX}
          className={cn(variants(color, adjustedTextColorState)[variant].close)}
        />
      </ToastClose>
    </ToastRoot>
  );
};

export default typedMemo(Toast);
