import {
  RadioGroupItem,
  RadioGroupProps,
  Root as RadioGroupRoot,
} from "@radix-ui/react-radio-group";
import cn from "classnames";
import { useRouter } from "next/router";
import type { ReactNode } from "react";
import type {
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import type { Locale } from "../../../locales/getText";
import {
  borders,
  bordersInteractive,
  extendedBgColors,
  focus,
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
  orientation?: RadioGroupProps["orientation"];
};

export type RadioOptionProps = {
  label: ReactNode;
  value: string;
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
  orientation = "vertical",
}: RadioProps & UseControllerProps<TFieldValues, TName>) => {
  const locale = useRouter().locale as Locale;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: requiredInputRule(required, locale),
      }}
      render={({
        field: { value: checkedValue, onChange, ref },
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
          <RadioGroupRoot
            value={checkedValue}
            onValueChange={onChange}
            disabled={disabled}
            orientation={orientation}
            className={cn(
              "flex",
              orientation === "horizontal" ? "flex-row" : "flex-col",
              gapsSmall[size],
              className
            )}
          >
            {options.map(({ label, value, disabled: singleDisabled }, i) => {
              const _disabled = singleDisabled ?? disabled;
              const isChecked = value === checkedValue;

              return (
                <div
                  ref={ref}
                  key={value}
                  className={cn(
                    "w-fit",
                    styles.base,
                    gapsSmall[size],
                    focus[color],
                    roundings[size]
                  )}
                >
                  {variant === "default" && (
                    <>
                      <RadioGroupItem
                        disabled={_disabled}
                        value={value}
                        aria-label={value}
                        id={`${name}_option_${i}`}
                        className={cn(
                          "aspect-square flex rounded-full",
                          focus[color],
                          radioSizes[size]
                        )}
                      >
                        <span
                          className={cn(
                            "w-full h-full",
                            transition,
                            !_disabled ? styles.input : styles.inputDisabled,
                            isChecked && radioBorderSizes[size],
                            !_disabled && isChecked
                              ? bordersInteractive[color]
                              : bordersInteractive.accent,
                            error && styles.inputError
                          )}
                        />
                      </RadioGroupItem>
                      <label
                        htmlFor={`${name}_option_${i}`}
                        className={cn(
                          !_disabled ? styles.label : styles.labelDisabled,
                          textColors.accent,
                          textSizes[size]
                        )}
                      >
                        {label}
                      </label>
                    </>
                  )}
                  {variant === "button" && (
                    <RadioGroupItem
                      disabled={_disabled}
                      value={value}
                      aria-label={value}
                      asChild
                    >
                      <Button
                        disabled={_disabled}
                        variant={isChecked ? "filled" : "outline"}
                        color={!error ? color : "danger"}
                        size={size}
                        className={cn(
                          !_disabled ? "cursor-pointer" : "cursor-not-allowed"
                        )}
                      >
                        {label}
                      </Button>
                    </RadioGroupItem>
                  )}
                </div>
              );
            })}
          </RadioGroupRoot>
        </FormElement>
      )}
    />
  );
};

export default typedMemo(Radio);
