/* eslint-disable react/button-has-type */
import cn from "classnames";
import isString from "lodash/isString";
import { ElementType, ForwardedRef, forwardRef } from "react";

import {
  extendedFocuses,
  minHeights,
  roundings,
  textSizes,
  transition,
} from "../../../../styles";
import { useThemeState } from "../../../../theme/useThemeState";
import {
  ButtonVariant,
  ExtendedColor,
  FocusVariant,
  Size,
  SvgType,
} from "../../../../types";
import { typedMemo } from "../../../../utils/internal";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "../../../../utils/internal/polymorphic";
import { Icon } from "../../Icon";
import { Spinner, useLoadingState } from "../../Loading/loading";
import {
  buttonBaseStyles,
  buttonVariantStyles,
  getButtonColorStyle,
} from "../button";

const IconButtonDefaultElement = "button";

export type IconButtonOwnProps = {
  variant?: ButtonVariant;
  color?: ExtendedColor;
  size?: Size;
  focus?: FocusVariant;
  rounded?: boolean;
  icon: SvgType;
  disabled?: boolean;
  loadingId?: string;
  iconClassName?: string;
  ariaLabel: string;
  type?: "button" | "submit" | "reset";
  children?: undefined;
};

export type IconButtonProps<
  T extends ElementType = typeof IconButtonDefaultElement
> = PolymorphicPropsWithRef<IconButtonOwnProps, T>;

export const IconButton: PolymorphicForwardRefExoticComponent<
  IconButtonOwnProps,
  typeof IconButtonDefaultElement
> = forwardRef(
  <T extends ElementType = typeof IconButtonDefaultElement>(
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
      loadingId,
      className,
      iconClassName,
      as,
      ...props
    }: PolymorphicPropsWithoutRef<IconButtonOwnProps, T>,
    ref: ForwardedRef<Element>
  ) => {
    const Component: ElementType = as || IconButtonDefaultElement;

    const { adjustedTextColorState } = useThemeState();

    const loadingState = useLoadingState((state) => state);
    const isLoading = isString(loadingState) && loadingState === loadingId;

    const _disabled = disabled || isLoading;

    return (
      <Component
        ref={ref}
        type={type}
        disabled={_disabled}
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
      </Component>
    );
  }
);

export default typedMemo(IconButton);

IconButton.displayName = "IconButton";
