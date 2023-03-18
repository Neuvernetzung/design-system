import cn from "classnames";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { Message, ValidationRule } from "react-hook-form";

import { getText } from "../../../locales/getText";
import { gapsSmall, textColors } from "../../../styles";
import { ExclamationTriangleIcon } from "../../../theme/icons";
import type { Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";
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
export type MaxLengthRule = ValidationRule<number>;
export type MinLengthRule = ValidationRule<number>;
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
}: FormElementProps) => {
  const { locale }: any = useRouter();
  return (
    <span className={cn("flex flex-col gap-0.5", className)}>
      {label && (
        <label
          className={cn(textColors.accent, labelSizes[size])}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className={cn("flex flex-row items-center", gapsSmall.md)}>
          <Icon icon={ExclamationTriangleIcon} color="danger" size="xs" />
          <Text size="xs" color="danger">
            {error?.message || getText(locale).required}
          </Text>
        </span>
      )}
      {helper && <Text size="xs">{helper}</Text>}
    </span>
  );
};

export default typedMemo(FormElement);
