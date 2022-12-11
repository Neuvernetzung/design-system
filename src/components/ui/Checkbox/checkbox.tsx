import cn from "classnames";
import { isString } from "lodash";
import isArray from "lodash/isArray";
import { FC, KeyboardEvent, MouseEvent, ReactNode, SVGProps } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import {
  borders,
  bordersInteractive,
  checkboxSizes,
  extendedBgColors,
  extendedTextColors,
  focus,
  gaps,
  gapsSmall,
  roundings,
  roundingsSmall,
  textColors,
  transition,
} from "../../../styles";
import type { Colors, Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { Button } from "../Button";
import { FormElement, RequiredRule } from "../Form";
import { labelSizes } from "../Form/formElement";
import { CheckboxIcon } from "./checkboxIcon";

export interface CheckboxVariants {
  default: any;
  button: any;
}

export interface CheckboxProps {
  variant?: keyof CheckboxVariants;
  label?: string;
  helper?: any;
  options: OptionProps[];
  required?: RequiredRule;
  size?: keyof Sizes;
  color?: keyof Colors;
  icon?: FC<SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  className?: string;
}

type OptionProps = {
  label: ReactNode;
  value: any;
  disabled?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
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

export const checkedColors: Colors = {
  brand: "bg-brand-500 hover:bg-brand-600 dark:hover:bg-brand-400",
  primary: "bg-primary-500 hover:bg-primary-600 dark:hover:bg-primary-400",
  accent: "bg-accent-500 hover:bg-accent-600 dark:hover:bg-accent-400",
  success: "bg-success-500 hover:bg-success-600 dark:hover:bg-success-400",
  warn: "bg-warn-500 hover:bg-warn-600 dark:hover:bg-warn-400",
  danger: "bg-danger-500 hover:bg-danger-600 dark:hover:bg-danger-400",
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
  const isChecked = (current: string | Array<string>, value: any) =>
    isArray(current) ? current.includes(value) : !!current;

  const handleChange = (current: string | Array<string>, value: any) => {
    if (options.length <= 1) return !current;
    if (!isArray(current)) return [value];
    if (current.includes(value)) return [...current.filter((v) => v !== value)];
    return [...current, value];
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required,
      }}
      render={({
        field: { value: current, onChange },
        fieldState: { error },
      }) => (
        <FormElement
          error={error}
          name={name}
          label={label}
          helper={helper}
          size={size}
        >
          <div className={cn("flex flex-col", gapsSmall[size], className)}>
            {options.map(
              (
                {
                  label,
                  value: _value,
                  disabled: singleDisabled,
                  icon: singleIcon,
                }: OptionProps,
                i
              ) => {
                const _disabled = singleDisabled ?? disabled;
                const _icon = singleIcon ?? icon;

                return (
                  <div
                    role="checkbox"
                    aria-checked={!!isChecked(current, _value)}
                    aria-label={isString(label) ? label : _value}
                    aria-disabled={_disabled ? true : undefined}
                    tabIndex={(() => {
                      if (_disabled) return -1;
                      return 0;
                    })()}
                    key={`checkbox_${name}_${i}`}
                    className={cn(
                      "w-fit",
                      styles.base,
                      gapsSmall[size],
                      focus[color],
                      roundings[size]
                    )}
                    onClick={(e: MouseEvent) => {
                      if (_disabled) return;
                      e.preventDefault();
                      e.stopPropagation();
                      onChange(handleChange(current, _value));
                    }}
                    onKeyDown={(e: KeyboardEvent) => {
                      if (_disabled) return;
                      if (e.key === " " || e.key === "Enter") {
                        // " " ist Space
                        e.preventDefault();
                        e.stopPropagation();
                        onChange(handleChange(current, _value));
                      }
                    }}
                  >
                    {variant === "default" && (
                      <div
                        className={cn("flex flex-row items-center", gaps[size])}
                      >
                        <div
                          className={cn(
                            "aspect-square flex items-center justify-center",
                            roundingsSmall[size],
                            transition,
                            !_disabled ? styles.input : styles.inputDisabled,
                            checkboxSizes[size],
                            bordersInteractive.accent,
                            !_disabled &&
                              isChecked(current, _value) &&
                              `${checkedColors[color]} border-none`,
                            error && styles.inputError
                          )}
                        >
                          <span
                            className={cn(
                              "scale-50",
                              styles.iconWrapper,
                              extendedTextColors.filled
                            )}
                          >
                            <CheckboxIcon
                              isChecked={isChecked(current, _value)}
                              size={size}
                              icon={_icon}
                            />
                          </span>
                        </div>
                        <label
                          htmlFor={`${name}_option_${i}`}
                          className={cn(
                            !_disabled ? styles.label : styles.labelDisabled,
                            textColors.accent,
                            labelSizes[size]
                          )}
                        >
                          {label}
                        </label>
                      </div>
                    )}
                    {variant === "button" && (
                      <Button
                        disabled={_disabled}
                        variant={
                          isChecked(current, _value) ? "filled" : "outline"
                        }
                        color={!error ? color : "danger"}
                        size={size}
                        as="span"
                        className={cn(
                          !_disabled ? "cursor-pointer" : "cursor-not-allowed"
                        )}
                      >
                        {label}
                      </Button>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </FormElement>
      )}
    />
  );
};

export default typedMemo(Checkbox);

Checkbox.defaultProps = {
  helper: undefined,
  required: false,
  size: "md",
  color: "primary",
  className: undefined,
};
