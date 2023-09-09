import { RadioGroup } from "@headlessui/react";
import cn from "classnames";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import type { Locale } from "../../../locales/getText";
import {
  borders,
  bordersInteractive,
  extendedBgColors,
  focus,
  gaps,
  gapsSmall,
  radioSizes,
  roundings,
  textColors,
  textSizes,
  transition,
} from "../../../styles";
import type { Color, RadioVariant, Size } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { requiredInputRule } from "../../../utils/internal/inputRule";
import { Button } from "../Button";
import { FormElement, RequiredRule } from "../Form";

export const checkedColors: Record<Color, string> = {
  brand:
    "border-brand-500 dark:border-brand-500 hover:border-brand-600 dark:hover:border-brand-400",
  primary:
    "border-primary-500 dark:border-primary-500 hover:border-primary-600 dark:hover:border-primary-400",
  accent:
    "border-accent-500 dark:border-accent-500 hover:border-accent-600 dark:hover:border-accent-400",
  success:
    "border-success-500 dark:border-success-500 hover:border-success-600 dark:hover:border-success-400",
  warn: "border-warn-500 dark:border-warn-500 hover:border-warn-600 dark:hover:border-warn-400",
  danger:
    "border-danger-500 dark:border-danger-500 hover:border-danger-600 dark:hover:border-danger-400",
  white:
    "border-white dark:border-white hover:border-accent-100 dark:hover:border-accent-100",
  black:
    "border-black dark:border-black hover:border-accent-900 dark:hover:border-accent-900",
};

export const radioBorderSizes: Record<Size, string> = {
  xs: "border-4",
  sm: "border-4",
  md: "border-[5px]",
  lg: "border-[6px]",
  xl: "border-8",
};

export type RadioProps = {
  variant?: RadioVariant;
  label?: string;
  helper?: ReactNode;
  options: RadioOptionProps[];
  required?: RequiredRule;
  size?: Size;
  color?: Color;
  disabled?: boolean;
  className?: string;
};

export type RadioOptionProps = {
  label: ReactNode;
  value: any;
  disabled?: boolean;
};

const styles = {
  base: "flex flex-row items-center",
  input: `appearance-none cursor-pointer rounded-full border-2`,
  inputDisabled: `appearance-none cursor-not-allowed rounded-full border-2 ${borders.accent} ${extendedBgColors.filledSubtile}`,
  inputError: `${bordersInteractive.danger}`,
  label: "cursor-pointer select-none",
  labelDisabled: "cursor-not-allowed select-none opacity-75",
  iconWrapper:
    "absolute inset-0 p-0.5 pointer-events-none flex items-center justify-center",
};

export const Radio = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  helper,
  size = "md",
  color = "primary",
  variant = "default",
  required,
  options,
  disabled,
  className,
}: RadioProps & UseControllerProps<TFieldValues, TName>) => {
  const locale = useRouter().locale as Locale;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: requiredInputRule(required, locale),
      }}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <FormElement
          required={required}
          error={error}
          name={name}
          label={label}
          helper={helper}
          size={size}
        >
          <RadioGroup
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={cn("flex flex-col", gapsSmall[size], className)}
          >
            {options.map(
              (
                { label, value, disabled: singleDisabled }: RadioOptionProps,
                i
              ) => {
                const _disabled = singleDisabled ?? disabled;

                return (
                  <RadioGroup.Option
                    ref={ref}
                    id={`${name}_option_${i}`}
                    key={value}
                    disabled={_disabled}
                    value={value}
                    className={cn(
                      "w-fit",
                      styles.base,
                      gapsSmall[size],
                      focus[color],
                      roundings[size]
                    )}
                  >
                    {({ checked }) => (
                      <>
                        {variant === "default" && (
                          <div
                            className={cn(
                              "flex flex-row items-center",
                              gaps[size]
                            )}
                          >
                            <span
                              className={cn(
                                "aspect-square flex",
                                transition,
                                !_disabled
                                  ? styles.input
                                  : styles.inputDisabled,
                                radioSizes[size],
                                checked && radioBorderSizes[size],
                                !_disabled && checked
                                  ? checkedColors[color]
                                  : bordersInteractive.accent,
                                error && styles.inputError
                              )}
                            />
                            <label
                              htmlFor={`${name}_option_${i}`}
                              className={cn(
                                !_disabled
                                  ? styles.label
                                  : styles.labelDisabled,
                                textColors.accent,
                                textSizes[size]
                              )}
                            >
                              {label}
                            </label>
                          </div>
                        )}
                        {variant === "button" && (
                          <Button
                            disabled={_disabled}
                            variant={checked ? "filled" : "outline"}
                            color={!error ? color : "danger"}
                            size={size}
                            as="span"
                            className={cn(
                              !_disabled
                                ? "cursor-pointer"
                                : "cursor-not-allowed"
                            )}
                          >
                            {label}
                          </Button>
                        )}
                      </>
                    )}
                  </RadioGroup.Option>
                );
              }
            )}
          </RadioGroup>
        </FormElement>
      )}
    />
  );
};

export default typedMemo(Radio);
