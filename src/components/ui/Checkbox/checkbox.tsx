import {
  CheckboxIndicator,
  CheckedState,
  Root as CheckboxRoot,
} from "@radix-ui/react-checkbox";
import { cn } from "@/utils";
import isArray from "lodash/isArray";
import { useRouter } from "next/router";
import type { ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";
import type {
  FieldError,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import type { Locale } from "../../../locales/getText";
import {
  borders,
  bordersInteractive,
  checkboxSizes,
  extendedBgColors,
  extendedBgColorsInteractive,
  extendedTextColors,
  focus,
  gaps,
  gapsSmall,
  roundings,
  roundingsSmall,
  textColors,
  textSizes,
  transition,
} from "../../../styles";
import type { CheckboxVariant, Color, Size, SvgType } from "../../../types";
import { requiredInputRule } from "../../../utils/internal/inputRule";
import { Button } from "../Button";
import { FormElement, RequiredRule } from "../Form";
import { CheckboxIcon } from "./checkboxIcon";

export type CheckboxProps = {
  variant?: CheckboxVariant;
  label?: string;
  helper?: ReactNode;
  options: OptionProps[];
  required?: RequiredRule;
  size?: Size;
  color?: Color;
  icon?: SvgType;
  disabled?: boolean;
  className?: string;
};

type OptionProps = {
  label: ReactNode;
  value: boolean | number | string;
  disabled?: boolean;
  icon?: SvgType;
};

const styles = {
  base: "flex flex-row items-center",
  input: `appearance-none cursor-pointer border-2`,
  inputDisabled: `appearance-none cursor-not-allowed border-2 ${borders.accent} ${extendedBgColors.filledSubtile}`,
  inputError: `${bordersInteractive.danger}`,
  label: "cursor-pointer select-none",
  labelDisabled: "cursor-not-allowed select-none opacity-75",
  iconWrapper: "pointer-events-none flex items-center justify-center",
};

export const Checkbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  variant = "default",
  name,
  control,
  label,
  helper,
  size = "md",
  color = "primary",
  icon,
  required,
  options,
  disabled,
  className,
}: CheckboxProps & UseControllerProps<TFieldValues, TName>) => {
  const locale = useRouter().locale as Locale;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: requiredInputRule(required, locale),
      }}
      render={({
        field: { value: values, onChange, ref },
        fieldState: { error },
      }) => (
        <FormElement
          required={required}
          error={error}
          name={name}
          label={label}
          helper={helper}
          size={size}
        >
          <div className={cn("flex flex-col", gapsSmall[size], className)}>
            {options.map(
              (
                { label, value, disabled: singleDisabled, icon: singleIcon },
                i
              ) => (
                <CheckboxRaw
                  ref={ref}
                  id={`checkbox_${name}_${i}`}
                  key={`checkbox_${name}_${i}`}
                  label={label}
                  disabled={singleDisabled ?? disabled}
                  size={size}
                  color={color}
                  icon={singleIcon ?? icon}
                  variant={variant}
                  error={error}
                  checked={isArray(values) ? values.includes(value) : !!values}
                  setChecked={() => {
                    if (options.length <= 1) {
                      onChange(!values);
                      return;
                    }
                    if (!isArray(values)) {
                      onChange([value]);
                      return;
                    }
                    if (values.includes(value)) {
                      onChange([
                        ...values.filter(
                          (v: boolean | number | string) => v !== value
                        ),
                      ]);
                      return;
                    }
                    onChange([...values, value]);
                  }}
                />
              )
            )}
          </div>
        </FormElement>
      )}
    />
  );
};

type CheckboxInnerProps = {
  id?: string;
  label?: ReactNode;
  disabled?: boolean;
  size?: Size;
  variant?: CheckboxVariant;
  color?: Color;
  icon?: SvgType;
  error?: FieldError;
  checked: CheckedState;
  setChecked: (value: CheckedState) => void;
  defaultValue?: boolean;
};

export const CheckboxRaw = forwardRef(
  (
    {
      id,
      label,
      disabled,
      size = "md",
      variant = "default",
      color = "primary",
      icon,
      error,
      setChecked,
      checked,
      defaultValue,
    }: CheckboxInnerProps,

    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <CheckboxRoot
      checked={checked}
      onCheckedChange={setChecked}
      defaultChecked={defaultValue}
      ref={ref}
      key={id}
      disabled={disabled}
      className={cn(
        "w-fit",
        styles.base,
        gapsSmall[size],
        focus[color],
        roundings[size]
      )}
    >
      {variant === "default" && (
        <div className={cn("flex flex-row items-center", gaps[size])}>
          <div
            className={cn(
              "aspect-square flex items-center justify-center",
              roundingsSmall[size],
              transition,
              !disabled ? styles.input : styles.inputDisabled,
              checkboxSizes[size],
              bordersInteractive.accent,
              !disabled &&
                checked &&
                `${extendedBgColorsInteractive[color]} border-none`,
              error && styles.inputError
            )}
          >
            <CheckboxIndicator
              className={cn(
                "scale-50",
                styles.iconWrapper,
                extendedTextColors.filled
              )}
            >
              <CheckboxIcon
                checked={checked === true}
                size={size}
                icon={icon}
                indeterminate={checked === "indeterminate"}
              />
            </CheckboxIndicator>
          </div>
          {label && (
            <label
              htmlFor={id}
              className={cn(
                !disabled ? styles.label : styles.labelDisabled,
                textColors.accent,
                textSizes[size]
              )}
            >
              {label}
            </label>
          )}
        </div>
      )}
      {variant === "button" && (
        <Button
          disabled={disabled}
          variant={checked ? "filled" : "outline"}
          color={!error ? color : "danger"}
          size={size}
          asChild
          className={cn(!disabled ? "cursor-pointer" : "cursor-not-allowed")}
        >
          <span>{label}</span>
        </Button>
      )}
    </CheckboxRoot>
  )
);

CheckboxRaw.displayName = "CheckboxRaw";
