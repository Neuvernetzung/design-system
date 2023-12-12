import { cn } from "@/utils";
import { useRouter } from "next/router";
import { ForwardedRef, forwardRef, ReactNode } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import type { Locale } from "../../../locales/getText";
import { getInputStyles } from "../../../styles/groups";
import type { InputVariant, Size } from "../../../types";
import { mergeRefs } from "../../../utils/internal";
import {
  maxLengthInputRule,
  minLengthInputRule,
  patternInputRule,
  requiredInputRule,
} from "../../../utils/internal/inputRule";
import {
  FormElement,
  MaxLengthRule,
  MinLengthRule,
  PatternRule,
  RequiredRule,
} from "../Form";
import { Text } from "../Typography";

export type TextareaProps = {
  label?: string;
  helper?: ReactNode;
  size?: Size;
  variant?: InputVariant;
  placeholder?: string;
  required?: RequiredRule;
  maxLength?: MaxLengthRule;
  minLength?: MinLengthRule;
  pattern?: PatternRule;
  showLength?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
};

export const TextareaInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  {
    control,
    name,
    required = false,
    maxLength,
    minLength,
    pattern,
    showLength,
    className,
    disabled = false,
    label,
    helper,
    size = "md",
    placeholder,
    variant = "outline",
    rows = 3,
    ...props
  }: TextareaProps & UseControllerProps<TFieldValues, TName>,
  ref: ForwardedRef<HTMLTextAreaElement>
) => {
  const locale = useRouter().locale as Locale;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: requiredInputRule(required, locale),
        maxLength: maxLengthInputRule(maxLength, locale),
        minLength: minLengthInputRule(minLength, locale),
        pattern: patternInputRule(pattern, locale),
      }}
      render={({
        field: { value, onChange, ref: controllerRef },
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
          <div className="relative">
            <textarea
              id={name}
              ref={mergeRefs([ref, controllerRef])}
              value={value}
              onChange={onChange}
              className={cn(
                getInputStyles({ size, variant, error: !!error, disabled }),
                className
              )}
              disabled={disabled}
              placeholder={placeholder}
              rows={rows}
              {...props}
            />
            {showLength && (
              <Text
                size="xs"
                color={
                  maxLength && (value?.length || 0) > maxLength
                    ? "danger"
                    : "accent"
                }
                className={cn("absolute bottom-2 right-5 pointer-events-none")}
              >
                {value?.length || 0}
                {maxLength ? ` / ${maxLength}` : ""}
              </Text>
            )}
          </div>
        </FormElement>
      )}
    />
  );
};

export const Textarea = forwardRef(TextareaInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: TextareaProps &
    UseControllerProps<TFieldValues, TName> & {
      ref?: ForwardedRef<HTMLTextAreaElement>;
    }
) => ReturnType<typeof TextareaInner>;
