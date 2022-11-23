import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import {
  getInputStyles,
  inputSizes,
  inputVariants,
} from "../../../styles/groups";
import type { InputVariants, Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import {
  FormElement,
  MaxLengthRule,
  MinLengthRule,
  PatternRule,
  RequiredRule,
} from "../Form";
import { Text } from "../Typography";

export const sizes = inputSizes;
export const variants = inputVariants;

export type TextareaProps = {
  label?: string;
  helper?: any;
  size?: keyof Sizes;
  variant?: keyof InputVariants;
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
) => (
  <Controller
    control={control}
    name={name}
    rules={{
      required,
      maxLength,
      minLength,
      pattern,
    }}
    render={({ field: { value, onChange }, fieldState: { error } }) => (
      <FormElement
        error={error}
        name={name}
        label={label}
        helper={helper}
        size={size}
      >
        <div className="relative">
          <textarea
            id={name}
            ref={ref}
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
          {maxLength && showLength && (
            <Text
              size="xs"
              color={(value?.length || 0) > maxLength ? "danger" : "accent"}
              className={cn("absolute bottom-2 right-5")}
            >
              {value?.length || 0} / {maxLength}
            </Text>
          )}
        </div>
      </FormElement>
    )}
  />
);

const Textarea = forwardRef(TextareaInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: TextareaProps &
    UseControllerProps<TFieldValues, TName> & {
      ref?: ForwardedRef<HTMLTextAreaElement>;
    }
) => ReturnType<typeof TextareaInner>;

export default typedMemo(Textarea);
