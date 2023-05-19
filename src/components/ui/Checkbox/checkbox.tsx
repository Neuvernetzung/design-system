import cn from "classnames";
import isArray from "lodash/isArray";
import isString from "lodash/isString";
import { KeyboardEvent, MouseEvent, ReactNode } from "react";
import {
  Controller,
  FieldError,
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
import type { Colors, Sizes, SvgType } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { Button } from "../Button";
import { FormElement, RequiredRule } from "../Form";
import { labelSizes } from "../Form/formElement";
import { CheckboxIcon } from "./checkboxIcon";
import { requiredInputRule } from "../../../utils/internal/inputRule";
import { useRouter } from "next/router";
import { Locales } from "../../../locales/getText";

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
  icon?: SvgType;
  disabled?: boolean;
  className?: string;
}

type OptionProps = {
  label: ReactNode;
  value: any;
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
  const locale = useRouter().locale as Locales;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: requiredInputRule(required, locale),
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
                },
                i
              ) => {
                const _disabled = singleDisabled ?? disabled;
                const _icon = singleIcon ?? icon;

                return (
                  <CheckboxInner
                    id={`checkbox_${name}_${i}`}
                    key={`checkbox_${name}_${i}`}
                    current={current}
                    value={_value}
                    label={label}
                    disabled={_disabled}
                    size={size}
                    color={color}
                    onChange={onChange}
                    options={options.map((o) => o.value)}
                    icon={_icon}
                    variant={variant}
                    error={error}
                  />
                );
              }
            )}
          </div>
        </FormElement>
      )}
    />
  );
};

const isChecked = (current: string | string[], value: any) =>
  isArray(current) ? current.includes(value) : !!current;

const isIndeterminate = (current: string | string[], options: string[]) => {
  if (!isArray(current)) return false;
  return options.some((o) => current?.find((c) => c === o));
};

const isIndeterminateChecked = (
  current: string | string[],
  options: string[]
) => {
  if (!isArray(current)) return !!current;
  return options.every((o) => current?.find((c) => c === o));
};

const handleChange = (
  current: string | string[],
  options: string[],
  value: any
) => {
  if (options.length <= 1) return !current;
  if (!isArray(current)) return [value];
  if (current.includes(value)) return [...current.filter((v) => v !== value)];
  return [...current, value];
};
const handleChangeIndeterminate = (
  options: string[],
  isIndeterminateChecked: boolean,
  isIndeterminate?: boolean
) => {
  if (isIndeterminateChecked) return [];
  if (isIndeterminate) return [];
  return options;
};

type CheckboxInnerProps = {
  current: string[];
  id?: string;
  label?: ReactNode;
  disabled?: boolean;
  size?: keyof Sizes;
  variant?: keyof CheckboxVariants;
  color?: keyof Colors;
  onChange: (...event: any[]) => void;
  options: string[];
  icon?: SvgType;
  error?: FieldError;
} & CheckboxInnerIndeterminateProps;

type CheckboxInnerIndeterminateProps =
  | {
      allowIndetermination: true;
      value?: any;
    }
  | { allowIndetermination?: false; value: string };

export const CheckboxInner = ({
  current,
  id,
  value,
  label,
  disabled,
  size = "md",
  variant = "default",
  color = "primary",
  onChange,
  options,
  icon,
  error,
  allowIndetermination,
}: CheckboxInnerProps) => {
  const _isIndeterminate = allowIndetermination
    ? isIndeterminate(current, options)
    : undefined;
  const _isChecked = allowIndetermination
    ? isIndeterminateChecked(current, options)
    : isChecked(current, value);
  const _onChange = () =>
    onChange(
      !allowIndetermination
        ? handleChange(current, options, value)
        : handleChangeIndeterminate(options, _isChecked, _isIndeterminate)
    );

  return (
    <div
      key={id}
      role="checkbox"
      aria-checked={
        _isChecked
          ? true
          : allowIndetermination && _isIndeterminate
          ? "mixed"
          : false
      }
      aria-label={
        !allowIndetermination
          ? isString(label)
            ? label
            : value
          : "indeterminationCheckbox"
      }
      aria-disabled={disabled ? true : undefined}
      tabIndex={(() => {
        if (disabled) return -1;
        return 0;
      })()}
      className={cn(
        "w-fit",
        styles.base,
        gapsSmall[size],
        focus[color],
        roundings[size]
      )}
      onClick={(e: MouseEvent) => {
        if (disabled) return;
        e.preventDefault();
        e.stopPropagation();
        _onChange();
      }}
      onKeyDown={(e: KeyboardEvent) => {
        if (disabled) return;
        if (e.key === " " || e.key === "Enter") {
          // " " ist Space
          e.preventDefault();
          e.stopPropagation();
          _onChange();
        }
      }}
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
                (_isChecked || _isIndeterminate) &&
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
                isChecked={_isChecked}
                size={size}
                icon={icon}
                isIndeterminate={_isIndeterminate}
              />
            </span>
          </div>
          {label && (
            <label
              htmlFor={id}
              className={cn(
                !disabled ? styles.label : styles.labelDisabled,
                textColors.accent,
                labelSizes[size]
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
          variant={_isChecked ? "filled" : "outline"}
          color={!error ? color : "danger"}
          size={size}
          as="span"
          className={cn(!disabled ? "cursor-pointer" : "cursor-not-allowed")}
        >
          {label}
        </Button>
      )}
    </div>
  );
};

export default typedMemo(Checkbox);
