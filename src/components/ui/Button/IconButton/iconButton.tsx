/* eslint-disable react/button-has-type */
import cn from "classnames";
import isString from "lodash/isString";
import { ElementType, ForwardedRef, forwardRef } from "react";
import type {
  PolymorphicForwardRefExoticComponent,
  PolymorphicPropsWithoutRef,
  PolymorphicPropsWithRef,
} from "react-polymorphic-types";

import {
  focusBg,
  focusRing,
  minHeights,
  roundings,
  textSizes,
  transition,
} from "../../../../styles";
import { useThemeState } from "../../../../theme/useThemeState";
import {
  Colors,
  ExtendedColors,
  Focuses,
  Sizes,
  SvgType,
} from "../../../../types";
import { typedMemo } from "../../../../utils/internal";
import { Icon } from "../../Icon";
import { Spinner, useLoadingState } from "../../Loading/loading";
import type { Variants } from "../button";
import { colors, styles, variants } from "../button";

export const focuses: Focuses = {
  ring: focusRing,
  bg: focusBg,
};

const IconButtonDefaultElement = "button";

export type IconButtonOwnProps = {
  variant?: keyof Variants;
  color?: keyof (Colors & Pick<ExtendedColors, "light" | "dark" | "inherit">);
  size?: keyof Sizes;
  focus?: keyof Focuses;
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
    ref: ForwardedRef<any>
  ) => {
    const Component = as || IconButtonDefaultElement;

    const { colorState } = useThemeState();

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
          styles.base,
          transition,
          focuses[focus][color],
          variants[variant],
          roundings[size],
          minHeights[size],
          textSizes[size],
          !_disabled && colors(color, colorState)?.base,
          _disabled && colors(color, colorState)?.disabled,
          colors(color, colorState)?.text[variant],
          { [styles.rounded]: rounded },
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
