import type { Colors, Sizes } from "../../../types";
import {
  radioSizes,
  focus,
  textColors,
  bordersInteractive,
  radioColors,
  gapsSmall,
  borders,
  extendedBgColors,
} from "../../../styles";
import { memo, ElementType } from "react";
import { RequiredProps, FormElement } from "../Form";
import get from "lodash/get";
import isArray from "lodash/isArray";
import cn from "classnames";
import { labelSizes } from "../Form/formElement";

export const colors: Colors = {
  primary: radioColors.primary,
  accent: radioColors.accent,
  success: radioColors.success,
  warn: radioColors.warn,
  danger: radioColors.danger,
};

export const sizes: Sizes = {
  xs: {
    options: gapsSmall.xs,
    base: gapsSmall.xs,
    input: `${radioSizes.xs} checked:border-4`,
    label: labelSizes.xs,
  },
  sm: {
    options: gapsSmall.sm,
    base: gapsSmall.sm,
    input: `${radioSizes.sm} checked:border-4`,
    label: labelSizes.sm,
  },
  md: {
    options: gapsSmall.md,
    base: gapsSmall.md,
    input: `${radioSizes.md} checked:border-[5px]`,
    label: labelSizes.md,
  },
  lg: {
    options: gapsSmall.lg,
    base: gapsSmall.lg,
    input: `${radioSizes.lg} checked:border-[6px]`,
    label: labelSizes.lg,
  },
  xl: {
    options: gapsSmall.xl,
    base: gapsSmall.xl,
    input: `${radioSizes.xl} checked:border-8`,
    label: labelSizes.xl,
  },
};

export type RadioProps = {
  name: string;
  label?: string;
  helper?: any;
  formMethods: any;
  options: OptionProps[];
  required?: RequiredProps;
  size?: keyof Sizes;
  color?: keyof Colors;
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
  input: `appearance-none cursor-pointer rounded-full border-2 ${bordersInteractive.accent}`,
  inputDisabled: `appearance-none cursor-not-allowed rounded-full border-2 ${borders.accent} ${extendedBgColors.filledSubtile} checked:bg-accent-500`,
  inputError: `${bordersInteractive.danger}`,
  label: "cursor-pointer select-none",
  labelDisabled: "cursor-not-allowed select-none opacity-75",
  iconWrapper:
    "absolute inset-0 p-0.5 pointer-events-none flex items-center justify-center",
};

export const Radio = ({
  name,
  formMethods,
  label,
  helper,
  size = "md",
  color = "primary",
  required,
  options,
  disabled,
  className,
}: RadioProps) => {
  const { register } = formMethods;
  const error = get(formMethods?.formState?.errors, name);

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
          ({ label, value, disabled: singleDisabled }: OptionProps, i) => {
            const _disabled = singleDisabled ?? disabled;

            return (
              <div
                key={`radio_${name}_${i}`}
                className={cn(styles.base, sizes[size]?.base)}
              >
                <input
                  id={`${name}_option_${i}`}
                  value={value}
                  type="radio"
                  disabled={_disabled}
                  className={cn(
                    "peer",
                    focus[color],
                    !_disabled ? styles.input : styles.inputDisabled,
                    sizes[size]?.input,
                    !_disabled && colors[color],
                    error && styles.inputError
                  )}
                  {...(register &&
                    register(name, {
                      required,
                    }))}
                />
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

export default memo(Radio);
