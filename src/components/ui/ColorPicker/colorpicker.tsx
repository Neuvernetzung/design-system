import { memo } from "react";
import { HexColorPicker } from "react-colorful";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";
import { Sizes } from "../../../types";
import { RequiredRule, FormElement } from "../Form";
import cn from "classnames";
import { Variants } from "../Button/button";
import { Popover } from "../Popover";
import { colorIsBright } from "../../../utils";
import { getInputStyles } from "../../../styles/groups";
import { getText, Locales } from "../../../locales/getText";
import { useRouter } from "next/router";

export type ColorPickerProps = {
  required?: RequiredRule;
  label?: string;
  helper?: string;
  size?: keyof Sizes;
  disabled?: boolean;
  variant?: keyof Variants;
  placeholder?: string;
};

export const ColorPicker = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  control,
  name,
  required,
  label,
  helper,
  size = "md",
  disabled = false,
  variant = "outline",
  placeholder,
}: ColorPickerProps & UseControllerProps<TFieldValues, TName>) => {
  const { locale } = useRouter();

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
          <Popover
            buttonProps={{
              variant,
              size,
              disabled,
              children:
                value ||
                placeholder ||
                getText(locale as Locales).colorpicker_placeholder,
              className: cn(
                "w-full",
                colorIsBright(value) ? "text-white" : "text-black"
              ),
              style: {
                backgroundColor: value,
              },
            }}
            content={
              <div className="flex flex-col gap-4">
                <HexColorPicker color={value} onChange={onChange} />
                <input
                  type="text"
                  className={cn(
                    getInputStyles({
                      size: "md",
                      variant: "outline",
                      disabled,
                      error: !!error,
                    })
                  )}
                  value={value}
                  onChange={onChange}
                />
              </div>
            }
          />
        </FormElement>
      )}
    />
  );
};

export default memo(ColorPicker);
