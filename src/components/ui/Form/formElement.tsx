import cn from "classnames";
import { FC, memo, ReactNode } from "react";
import { Message, ValidationRule } from "react-hook-form";

import { gapsSmall, textColors } from "../../../styles";
import { ExclamationTriangleIcon } from "../../../theme/icons";
import type { Sizes } from "../../../types";
import { Icon } from "../Icon";
import { Text } from "../Typography";
import { sizes as textSizes } from "../Typography/Text/text";

export type FormElementProps = {
  error: any;
  label?: any;
  helper?: any;
  name: string;
  size?: keyof Sizes;
  children: ReactNode;
  className?: string;
};

export type RequiredRule = Message | ValidationRule<boolean>;
export type MaxLengthRule = ValidationRule<number | string>;
export type MinLengthRule = ValidationRule<number | string>;
export type MaxRule = ValidationRule<number | string>;
export type MinRule = ValidationRule<number | string>;
export type PatternRule = ValidationRule<RegExp>;

export const labelSizes: Sizes = {
  xs: textSizes.xs,
  sm: textSizes.xs,
  md: textSizes.sm,
  lg: textSizes.md,
  xl: textSizes.md,
};

export const FormElement: FC<FormElementProps> = ({
  error,
  label = null,
  helper = null,
  name,
  size = "md",
  children,
  className,
}: FormElementProps) => (
  <div className={cn("flex flex-col gap-0.5", className)}>
    {label && (
      <label className={cn(textColors.accent, labelSizes[size])} htmlFor={name}>
        {label}
      </label>
    )}
    {children}
    {error && (
      <span className={cn("flex flex-row items-center", gapsSmall.md)}>
        <Icon icon={ExclamationTriangleIcon} color="danger" size="xs" />
        <Text size="xs" color="danger">
          {error?.message}
        </Text>
      </span>
    )}
    {helper && <Text size="xs">{helper}</Text>}
  </div>
);

FormElement.defaultProps = {
  label: null,
  helper: null,
  size: "md",
  className: undefined,
};

export default memo(FormElement);
