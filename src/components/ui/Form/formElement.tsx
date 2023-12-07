import { cn } from "@/utils/cn";
import isString from "lodash/isString";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import type { FieldError, Message, ValidationRule } from "react-hook-form";

import { getText, type Locale } from "@/locales/getText";
import { gapsSmall, textColors, textSizes } from "@/styles";
import { useThemeStateValue } from "@/theme";
import { IconAlertTriangle } from "@tabler/icons-react";
import type { RequiredInfoVariant, Size } from "@/types";
import { smallerSize } from "@/utils";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type FormElementProps = {
  error: FieldError | undefined;
  required: RequiredRule | undefined;
  label?: ReactNode;
  helper?: ReactNode;
  name: string;
  size?: Size;
  children: ReactNode;
  className?: string;
};

export type RequiredRule = Message | ValidationRule<boolean>;
export type MaxLengthRule = ValidationRule<number>;
export type MinLengthRule = ValidationRule<number>;
export type MaxRule = ValidationRule<number | string>;
export type MinRule = ValidationRule<number | string>;
export type PatternRule = ValidationRule<RegExp>;

const requiredSymbols = (
  locale: Locale
): Record<RequiredInfoVariant, string> => ({
  star: "*",
  text: getText(locale as Locale).requiredInfo,
  optional: "",
});
const optionalSymbols = (
  locale: Locale
): Record<RequiredInfoVariant, string> => ({
  star: "",
  text: "",
  optional: getText(locale as Locale).optionalInfo,
});

export const FormElement: FC<FormElementProps> = ({
  error,
  required,
  label = null,
  helper = null,
  name,
  size = "md",
  children,
  className,
}: FormElementProps) => {
  const { locale } = useRouter();
  const requiredInfoVariant = useThemeStateValue(
    (state) => state.requiredInfoVariant
  );

  return (
    <span className={cn("flex flex-col gap-0.5", className)}>
      {label && (
        <label
          className={cn(textColors.accent, textSizes[smallerSize(size)])}
          htmlFor={name}
        >
          {label}
          {required
            ? ` ${requiredSymbols(locale as Locale)[requiredInfoVariant]}`
            : ` ${optionalSymbols(locale as Locale)[requiredInfoVariant]}`}
        </label>
      )}
      {children}
      {error && (
        <span className={cn("flex flex-row items-center", gapsSmall.md)}>
          <Icon icon={IconAlertTriangle} color="danger" size="xs" />
          <Text size="xs" color="danger">
            {error?.message || getText(locale as Locale).required}
          </Text>
        </span>
      )}
      {helper && isString(helper) ? <Text size="xs">{helper}</Text> : helper}
    </span>
  );
};
