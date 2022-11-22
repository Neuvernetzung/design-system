import { RadioGroup } from "@headlessui/react";
import cn from "classnames";
import { type ElementType, type ReactElement, memo } from "react";
import { Controller } from "react-hook-form";

import {
  borders,
  bordersInteractive,
  extendedBgColors,
  focus,
  gapsSmall,
  radioSizes,
  roundings,
  textColors,
} from "../../../styles";
import type { Colors, Sizes } from "../../../types";
import { Button } from "../Button";
import { FormElement, RequiredRule } from "../Form";
import { labelSizes } from "../Form/formElement";

export const checkedColors: Colors = {
  primary:
    "border-primary-500 dark:border-primary-500 hover:border-primary-600 dark:hover:border-primary-400",
  accent:
    "border-accent-500 dark:border-accent-500 hover:border-accent-600 dark:hover:border-accent-400",
  success:
    "border-success-500 dark:border-success-500 hover:border-success-600 dark:hover:border-success-400",
  warn: "border-warn-500 dark:border-warn-500 hover:border-warn-600 dark:hover:border-warn-400",
  danger:
    "border-danger-500 dark:border-danger-500 hover:border-danger-600 dark:hover:border-danger-400",
};

export const radioBorderSizes: Sizes = {
  xs: " border-4",
  sm: "border-4",
  md: "border-[5px]",
  lg: "border-[6px]",
  xl: "border-8",
};

export interface RadioVariants {
  default: any;
  button: any;
}

export type RadioProps = {
  name: string;
  variant?: keyof RadioVariants;
  label?: string;
  helper?: any;
  formMethods: any;
  options: OptionProps[];
  required?: RequiredRule;
  size?: keyof Sizes;
  color?: keyof Colors;
  disabled?: boolean;
  className?: string;
};

type OptionProps = {
  label: ReactElement | string;
  value: any;
  disabled?: boolean;
  icon?: ElementType<SVGElement>;
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

export const Radio = ({
  name,
  formMethods,
  label,
  helper,
  size = "md",
  color = "primary",
  variant = "default",
  required,
  options,
  disabled,
  className,
}: RadioProps) => (
  <Controller
    control={formMethods.control}
    name={name}
    rules={{
      required,
    }}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <FormElement
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
            ({ label, value, disabled: singleDisabled }: OptionProps, i) => {
              const _disabled = singleDisabled ?? disabled;

              return (
                <RadioGroup.Option
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
                        <>
                          <span
                            className={cn(
                              "aspect-square flex",
                              !_disabled ? styles.input : styles.inputDisabled,
                              radioSizes[size],
                              checked && radioBorderSizes[size],
                              !_disabled && checked
                                ? checkedColors[color]
                                : bordersInteractive.accent,
                              checked && radioBorderSizes[size],
                              error && styles.inputError
                            )}
                          />
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
                        </>
                      )}
                      {variant === "button" && (
                        <Button
                          disabled={_disabled}
                          variant={checked ? "filled" : "outline"}
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

export default memo(Radio);

Radio.defaultProps = {
  variant: "default",
  helper: undefined,
  required: false,
  size: "md",
  color: "primary",
  className: undefined,
};
