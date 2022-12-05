/* eslint-disable react/button-has-type */
import cn from "classnames";
import isString from "lodash/isString";
import {
  ElementType,
  FC,
  ForwardedRef,
  forwardRef,
  memo,
  SVGProps,
} from "react";
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
import { useColorState } from "../../../../theme";
import { Colors, Focuses, Sizes } from "../../../../types";
import { Icon } from "../../Icon";
import { Spinner, useLoadingState } from "../../Loading/loading";
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
  icon: FC<SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  loadingId?: string;
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
      loadingId,
      className,
      as,
      ...props
    }: PolymorphicPropsWithoutRef<IconButtonOwnProps, T>,
    ref: ForwardedRef<any>
  ) => {
    const Component = as || IconButtonDefaultElement;

    const { colorState } = useColorState();

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
          <Icon size={size} icon={icon} />
        ) : (
          <Spinner size={size} />
        )}
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
