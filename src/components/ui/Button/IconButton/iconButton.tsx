import { Slot, Slottable } from "@radix-ui/react-slot";
import { ForwardedRef, forwardRef, HTMLAttributes, ReactElement } from "react";

import { cn } from "@/utils";

import {
  extendedFocuses,
  minHeights,
  roundings,
  textSizes,
  transition,
} from "../../../../styles";
import { useThemeStateValue } from "../../../../theme/useThemeState";
import {
  ButtonVariant,
  ExtendedColor,
  FocusVariant,
  Size,
  SvgType,
} from "../../../../types";
import { Icon } from "../../Icon";
import { Spinner } from "../../Loading/loading";
import {
  buttonBaseStyles,
  buttonVariantStyles,
  getButtonColorStyle,
} from "../button";

export type IconButtonProps = HTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  color?: ExtendedColor;
  size?: Size;
  focus?: FocusVariant;
  rounded?: boolean;
  icon: SvgType;
  disabled?: boolean;
  isLoading?: boolean;
  iconClassName?: string;
  ariaLabel: string;
  type?: "button" | "submit" | "reset";
} & IconButtonAsChildProps;

type IconButtonAsChildProps =
  | { asChild?: false; children?: never }
  | { asChild: true; children: ReactElement };

export const IconButton = forwardRef(
  (
    {
      size = "md",
      type = "button",
      variant = "filled",
      color = "accent",
      focus = "ring",
      disabled = false,
      rounded,
      icon,
      ariaLabel,
      isLoading,
      className,
      iconClassName,
      asChild,
      children,
      ...props
    }: IconButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const Component = asChild ? Slot : "button";

    const adjustedTextColorState = useThemeStateValue(
      (v) => v.adjustedTextColorState
    );

    const _disabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        type={type}
        disabled={_disabled}
        aria-disabled={_disabled}
        aria-label={ariaLabel}
        className={cn(
          "aspect-square",
          buttonBaseStyles.base,
          transition,
          extendedFocuses[focus][color],
          buttonVariantStyles[variant],
          roundings[size],
          minHeights[size],
          textSizes[size],
          !_disabled &&
            getButtonColorStyle(color, adjustedTextColorState)?.base,
          _disabled &&
            getButtonColorStyle(color, adjustedTextColorState)?.disabled,
          getButtonColorStyle(color, adjustedTextColorState)?.text[variant],
          { [buttonBaseStyles.rounded]: rounded },
          className
        )}
        {...props}
      >
        {!isLoading ? (
          <Icon size={size} icon={icon} className={iconClassName} />
        ) : (
          <Spinner size={size} />
        )}
        <Slottable>{children}</Slottable>
      </Component>
    );
  }
);

IconButton.displayName = "IconButton";
