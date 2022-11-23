import cn from "classnames";
import isArray from "lodash/isArray";
import { FC, SVGProps } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import {
  borders,
  bordersInteractive,
  checkboxColors,
  checkboxSizes,
  extendedBgColors,
  extendedTextColors,
  focus,
  gapsSmall,
  roundingsSmall,
  textColors,
} from "../../../styles";
import type { Colors, Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { FormElement, RequiredRule } from "../Form";
import { labelSizes } from "../Form/formElement";
import { CheckboxIcon } from "./checkboxIcon";

export interface CheckboxProps {
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
  label: string;
  value: any;
  disabled?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
};

const styles = {
  base: "flex flex-row items-center",
  input: `appearance-none cursor-pointer border-2 checked:border-none ${bordersInteractive.accent}`,
  inputDisabled: `appearance-none cursor-not-allowed border-2 checked:border-none ${borders.accent} ${extendedBgColors.filledSubtile} checked:bg-accent-500`,
  inputError: `${bordersInteractive.danger}`,
  label: "cursor-pointer select-none",
  labelDisabled: "cursor-not-allowed select-none opacity-75",
  iconWrapper:
    "absolute inset-0 p-0.5 pointer-events-none flex items-center justify-center",
};

export const Checkbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
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

  return (
    <Controller
      control={control}
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
                    key={`checkbox_${name}_${i}`}
                    className={cn(styles.base, gapsSmall[size])}
                  >
                    <div className="relative flex">
                      <input
                        id={`${name}_option_${i}`}
                        value={_value}
                        type="checkbox"
                        // checked={
                        //   isArray(value)
                        //     ? value.includes(_value)
                        //     : value === _value
                        // }
                        disabled={_disabled}
                        onChange={onChange}
                        className={cn(
                          "peer",
                          focus[color],
                          !_disabled ? styles.input : styles.inputDisabled,
                          checkboxSizes[size],
                          roundingsSmall[size],
                          !_disabled && checkboxColors[color],
                          error && styles.inputError
                        )}
                      />
                      <span
                        className={cn(
                          "hidden peer-checked:flex scale-50",
                          styles.iconWrapper,
                          extendedTextColors.filled
                        )}
                      >
                        <CheckboxIcon
                          isChecked={isChecked(value, _value)}
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
