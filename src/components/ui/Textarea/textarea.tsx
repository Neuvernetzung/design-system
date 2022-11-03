import cn from "classnames";
import get from "lodash/get.js";
import { forwardRef, memo } from "react";

import {
  getInputStyles,
  inputSizes,
  inputVariants,
} from "../../../styles/groups";
import type { InputVariants, Sizes } from "../../../types";
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
  name: string;
  label?: string;
  helper?: any;
  size?: keyof Sizes;
  variant?: keyof InputVariants;
  placeholder?: string;
  formMethods: any;
  required?: RequiredRule;
  maxLength?: MaxLengthRule;
  minLength?: MinLengthRule;
  pattern?: PatternRule;
  showLength?: boolean;
  disabled?: boolean;
  className?: string;
  rows?: number;
};

export const Textarea = forwardRef<HTMLInputElement, TextareaProps>(
  (
    {
      formMethods,
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
    },
    ref
  ) => {
    const { register } = formMethods;
    const error = get(formMethods?.formState?.errors, name);
    const textLength = formMethods?.watch(name)?.length || 0;

    return (
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
            type="textarea"
            ref={ref}
            className={cn(
              getInputStyles({ size, variant, error, disabled }),
              className
            )}
            {...register(name, {
              required,
              maxLength,
              minLength,
              pattern,
            })}
            disabled={disabled}
            placeholder={placeholder}
            rows={rows}
            {...props}
          />
          {maxLength && showLength && (
            <Text
              size="xs"
              color={textLength > maxLength ? "danger" : "accent"}
              className={cn("absolute bottom-2 right-5")}
            >
              {textLength} / {maxLength}
            </Text>
          )}
        </div>
      </FormElement>
    );
  }
);

export default memo(Textarea);

Textarea.displayName = "Textarea";

Textarea.defaultProps = {
  label: undefined,
  helper: undefined,
  size: "md",
  variant: "outline",
  placeholder: undefined,
  required: false,
  maxLength: undefined,
  minLength: undefined,
  pattern: undefined,
  showLength: true,
  disabled: false,
  className: undefined,
  rows: 3,
};
