import { cn } from "@/utils";
import { useRouter } from "next/router";
import { HexColorPicker } from "react-colorful";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import { getText, type Locale } from "../../../locales/getText";
import { getInputStyles } from "../../../styles/groups";
import type { ButtonVariant, Size } from "../../../types";
import { colorIsBright } from "../../../utils";
import { typedMemo } from "../../../utils/internal";
import {
  patternInputRule,
  requiredInputRule,
} from "../../../utils/internal/inputRule";
import { hexRegex } from "../../../utils/internal/regex/hex";
import { FormElement, RequiredRule } from "../Form";
import { Popover } from "../Popover";

export type ColorPickerProps = {
  required?: RequiredRule;
  label?: string;
  helper?: string;
  size?: Size;
  disabled?: boolean;
  variant?: ButtonVariant;
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
  const locale = useRouter().locale as Locale;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: requiredInputRule(required, locale),
        pattern: patternInputRule(hexRegex, locale),
      }}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <FormElement
          required={required}
          error={error}
          name={name}
          label={label}
          helper={helper}
          size={size}
        >
          <Popover
            ref={ref}
            buttonProps={{
              variant,
              size,
              disabled,
              children:
                value || placeholder || getText(locale).colorpicker_placeholder,
              className: cn(
                "w-full",
                value && (colorIsBright(value) ? "text-white" : "text-black")
              ),
              color: !error ? "accent" : "danger",
              style: {
                backgroundColor: value,
              },
            }}
            content={
              <div className="flex flex-col gap-4 items-center">
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
                  placeholder="#------"
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
