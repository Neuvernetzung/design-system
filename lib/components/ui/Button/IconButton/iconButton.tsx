/* eslint-disable react/button-has-type */
import cn from "classnames";
import {
  forwardRef,
  memo,
  Ref,
  ElementType,
  ComponentPropsWithoutRef,
  ReactElement,
} from "react";
import { Icon } from "../../Icon";
import { sizes as textSizes } from "../../Typography/Text/text";
import {
  variants,
  colors,
  type Sizes,
  type Colors,
  type Variants,
  styles,
} from "../button";
import { minHeights, roundings, transition, focus } from "../../../../styles";

export const sizes: Sizes = {
  xs: `${roundings.xs} ${minHeights.xs}`,
  sm: `${roundings.sm} ${minHeights.sm}`,
  md: `${roundings.md} ${minHeights.md}`,
  lg: `${roundings.lg} ${minHeights.lg}`,
  xl: `${roundings.xl} ${minHeights.xl}`,
};

export type IconButtonProps<T extends ElementType> =
  ComponentPropsWithoutRef<T> & {
    variant?: keyof Variants;
    color?: keyof Colors;
    size?: keyof Sizes;
    rounded?: boolean;
    icon: ElementType<SVGElement>;
    ariaLabel: string;
    as?: T;
  };

type PolymorphicComponent = <T extends ElementType = "button">(
  props: IconButtonProps<T>
) => ReactElement | null;

export const IconButton: PolymorphicComponent = forwardRef(
  <T extends ElementType>(
    {
      size = "md",
      type = "button",
      variant = "filled",
      color = "accent",
      disabled = false,
      rounded,
      icon,
      ariaLabel,
      className,
      as,
      ...props
    }: IconButtonProps<T>,
    ref: Ref<T>
  ): JSX.Element => {
    const Component = as || "button";

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
          focus[color],
          variants[variant],
          sizes[size],
          textSizes[size],
          !disabled && colors[color]?.base,
          !disabled && colors[color]?.text[variant],
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
