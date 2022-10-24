import type { Colors, Sizes } from "../../../types";
import {
  checkboxSizes,
  roundingsSmall,
  textColors,
  bordersInteractive,
  checkboxColors,
  gapsSmall,
  extendedTextColors,
  borders,
  extendedBgColors,
} from "../../../styles";
import { memo, ElementType } from "react";
import { RequiredProps, FormElement } from "../Form";
import get from "lodash/get";
import isArray from "lodash/isArray";
import cn from "classnames";
import { labelSizes } from "../Form/formElement";
import { CheckboxIcon } from "./checkboxIcon";

export const colors: Colors = {
  primary: checkboxColors.primary,
  accent: checkboxColors.accent,
  success: checkboxColors.success,
  warn: checkboxColors.warn,
  danger: checkboxColors.danger,
};

export const sizes: Sizes = {
  xs: {
    options: gapsSmall.xs,
    base: gapsSmall.xs,
    input: `${checkboxSizes.xs} ${roundingsSmall.xs}`,
    label: labelSizes.xs,
  },
  sm: {
    options: gapsSmall.sm,
    base: gapsSmall.sm,
    input: `${checkboxSizes.sm} ${roundingsSmall.sm}`,
    label: labelSizes.sm,
  },
  md: {
    options: gapsSmall.md,
    base: gapsSmall.md,
    input: `${checkboxSizes.md} ${roundingsSmall.md}`,
    label: labelSizes.md,
  },
  lg: {
    options: gapsSmall.lg,
    base: gapsSmall.lg,
    input: `${checkboxSizes.lg} ${roundingsSmall.lg}`,
    label: labelSizes.lg,
  },
  xl: {
    options: gapsSmall.xl,
    base: gapsSmall.xl,
    input: `${checkboxSizes.xl} ${roundingsSmall.xl}`,
    label: labelSizes.xl,
  },
};

export type CheckboxProps = {
  name: string;
  label?: string;
  helper?: any;
  formMethods: any;
  options: OptionProps[];
  required?: RequiredProps;
  size?: keyof Sizes;
  color?: keyof Colors;
  icon?: ElementType<SVGElement>;
  disabled?: boolean;
  className?: string;
};

type OptionProps = {
  label: string;
  value: any;
  disabled?: boolean;
  icon?: ElementType<SVGElement>;
};

const styles = {
  base: "flex flex-row items-center",
  input: `appearance-none cursor-pointer border-2 checked:border-none ${bordersInteractive.accent}`,
  inputDisabled: `appearance-none cursor-not-allowed border-2 checked:border-none ${borders.accent} ${extendedBgColors.filledSubtile} checked:bg-accent-500`,
  label: "cursor-pointer select-none",
  labelDisabled: "cursor-not-allowed select-none opacity-75",
  iconWrapper:
    "absolute inset-0 p-0.5 pointer-events-none flex items-center justify-center",
};

export const Checkbox = ({
  name,
  formMethods,
  label,
  helper,
  size = "md",
  color = "primary",
  icon,
  required,
  options,
  disabled,
  className,
}: CheckboxProps) => {
  const { register, watch } = formMethods;
  const error = get(formMethods?.formState?.errors, name);
  const values = watch(name);

  const isChecked = (value: any) =>
    isArray(values) ? values.includes(value) : !!values;

  return (
    <FormElement
      error={error}
      name={name}
      label={label}
      helper={helper}
      size={size}
    >
      <div className={cn("flex flex-col", sizes[size]?.options, className)}>
        {options.map(
          (
            {
              label,
              value,
              disabled: singleDisabled,
              icon: singleIcon,
            }: OptionProps,
            i
          ) => {
            const _disabled = singleDisabled ?? disabled;
            const _icon = singleIcon ?? icon;

            return (
              <div
                key={`checkbox_${name}_${i}`}
                className={cn(styles.base, sizes[size]?.base)}
              >
                <div className="relative flex">
                  <input
                    id={`${name}_option_${i}`}
                    value={value}
                    type="checkbox"
                    disabled={_disabled}
                    className={cn(
                      "peer",
                      !_disabled ? styles.input : styles.inputDisabled,
                      sizes[size]?.input,
                      !_disabled && colors[color]
                    )}
                    {...(register &&
                      register(name, {
                        required,
                      }))}
                  />
                  <span
                    className={cn(
                      "hidden peer-checked:block",
                      styles.iconWrapper,
                      extendedTextColors.accentReverse
                    )}
                  >
                    <CheckboxIcon
                      isChecked={isChecked(value)}
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
                    sizes[size]?.label
                  )}
                >
                  {label}
                </label>
              </div>
            );
          }
        )}
      </div>
    </FormElement>
  );
};

export default memo(Checkbox);
