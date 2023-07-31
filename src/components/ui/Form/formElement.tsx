import cn from "classnames";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { FieldError, Message, ValidationRule } from "react-hook-form";

import { Locales, getText } from "../../../locales/getText";
import { gapsSmall, textColors, textSizes } from "../../../styles";
import { ExclamationTriangleIcon } from "../../../theme/icons";
import type { Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { Icon } from "../Icon";
import { Text } from "../Typography";
import { smallerSize } from "../../../utils";
import isString from "lodash/isString";

export type FormElementProps = {
  error: FieldError | undefined;
  label?: ReactNode;
  helper?: ReactNode;
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

export const FormElement: FC<FormElementProps> = ({
  error,
  label = null,
  helper = null,
  name,
  size = "md",
  children,
  className,
}: FormElementProps) => {
  const { locale } = useRouter();
  return (
    <span className={cn("flex flex-col gap-0.5", className)}>
      {label && (
        <label
          className={cn(textColors.accent, textSizes[smallerSize(size)])}
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
            {error?.message || getText(locale as Locales).required}
          </Text>
        </span>
      )}
      {helper && isString(helper) ? <Text size="xs">{helper}</Text> : helper}
    </span>
  );
};

export default typedMemo(FormElement);
