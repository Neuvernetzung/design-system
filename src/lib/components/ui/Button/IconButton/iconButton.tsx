/* eslint-disable react/button-has-type */
import cn from "classnames";
import { ElementType, ForwardedRef, forwardRef, memo } from "react";
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
  transition,
} from "../../../../styles";
import { Colors, Focuses, Sizes } from "../../../../types";
import { Icon } from "../../Icon";
import { sizes as textSizes } from "../../Typography/Text/text";
import type { Variants } from "../button";
import { colors, styles, variants } from "../button";

export const focuses: Focuses = {
  ring: focusRing,
  bg: focusBg,
};

const IconButtonDefaultElement = "button";

type ConditionalButtonProps =
  | {
      ariaLabel: string;
      type?: "button" | "submit" | "reset";
    }
  | { ariaLabel?: string; type?: never };

export type IconButtonOwnProps = {
  variant?: keyof Variants;
  color?: keyof Colors;
  size?: keyof Sizes;
  focus?: keyof Focuses;
  rounded?: boolean;
  icon: ElementType<SVGElement>;
  disabled?: boolean;
} & ConditionalButtonProps;

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
      className,
      as,
      ...props
    }: PolymorphicPropsWithoutRef<IconButtonOwnProps, T>,
    ref: ForwardedRef<Element>
  ) => {
    const Component = as || IconButtonDefaultElement;

    return (
      <Component
        ref={ref}
        type={type}
        disabled={disabled}
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
          !disabled && colors(color)?.base,
          !disabled && colors(color)?.text[variant],
          disabled && styles.disabled,
          { [styles.rounded]: rounded },
          className
        )}
        {...props}
      >
        <Icon size={size} icon={icon} />
      </Component>
    );
  }
);

export default memo(IconButton);

IconButton.displayName = "IconButton";

IconButton.defaultProps = {
  variant: "filled",
  color: "accent",
  size: "md",
  rounded: false,
  as: undefined,
};
