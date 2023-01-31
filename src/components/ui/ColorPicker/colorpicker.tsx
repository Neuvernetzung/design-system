import cn from "classnames";
import { useRouter } from "next/router";
import { HexColorPicker } from "react-colorful";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import { getText, Locales } from "../../../locales/getText";
import { getInputStyles } from "../../../styles/groups";
import { Sizes } from "../../../types";
import { colorIsBright } from "../../../utils";
import { typedMemo } from "../../../utils/internal";
import { Variants } from "../Button/button";
import { FormElement, RequiredRule } from "../Form";
import { Popover } from "../Popover";

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

export default typedMemo(ColorPicker);
