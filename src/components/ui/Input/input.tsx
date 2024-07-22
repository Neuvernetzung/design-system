import { useRouter } from "next/router";
import {
  type ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  type ReactNode,
  type Ref,
  useRef,
} from "react";
import {
  Controller,
  type FieldPath,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";

import { useRefDimensions } from "@/hooks";
import { cn } from "@/utils";

import { type Locale } from "../../../locales/getText";
import {
  getInputStyles,
  inputContainerClassName,
} from "../../../styles/groups";
import type { InputVariant, Size } from "../../../types";
import { mergeRefs } from "../../../utils/internal";
import {
  maxInputRule,
  maxLengthInputRule,
  minInputRule,
  minLengthInputRule,
  patternInputRule,
  requiredInputRule,
  validationInputResult,
} from "../../../utils/internal/inputRule";
import { snapToStep, valueOf } from "../../../utils/internal/number/decimal";
import {
  FormElement,
  MaxLengthRule,
  MaxRule,
  MinLengthRule,
  MinRule,
  PatternRule,
  RequiredRule,
} from "../Form";
import { InputAddon } from "./InputAddon";
import type { InputAddonProps } from "./InputAddon/inputAddon";
import { InputElement } from "./InputElement";
import type { InputElementProps } from "./InputElement/inputElement";

export type InputProps = InputRawProps & {
  label?: string;
  helper?: ReactNode;
  required?: RequiredRule;
  maxLength?: MaxLengthRule;
  minLength?: MinLengthRule;
  max?: MaxRule;
  min?: MinRule;
  pattern?: PatternRule;
  type?:
    | "text"
    | "number"
    | "password"
    | "url"
    | "email"
    | "tel"
    | "date"
    | "datetime-local";
};

export const InputInner = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>(
  {
    name,
    type = "text",
    label,
    helper,
    size = "md",
    leftAddon,
    rightAddon,
    leftElement,
    rightElement,
    control,
    required = false,
    maxLength,
    minLength,
    max,
    min,
    pattern,
    disabled = false,
    variant = "outline",
    step,
    className,
    containerClassName,
    inputClassName,
    ...props
  }: InputProps & UseControllerProps<TFieldValues, TName>,
  ref: Ref<HTMLInputElement>
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
        max: maxInputRule(max, locale),
        min: minInputRule(min, locale),
        pattern: patternInputRule(pattern, locale),
        validate: (value) => {
          if (type === "number" && step) {
            if (value === undefined || value === null) return true;
            return validationInputResult(
              valueOf(value) === Number(snapToStep(value, step)),
              `Die nötige Abstufung ist ${step}`
            );
          }
          return true;
        },
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
          className={className}
        >
          <InputRaw
            containerClassName={containerClassName}
            leftAddon={leftAddon}
            size={size}
            variant={variant}
            leftElement={leftElement}
            type={type}
            id={name}
            ref={mergeRefs([ref, controllerRef])}
            value={value}
            onChange={onChange}
            error={!!error}
            disabled={disabled}
            rightAddon={rightAddon}
            inputClassName={inputClassName}
            rightElement={rightElement}
            step={step}
            {...props}
          />
        </FormElement>
      )}
    />
  );
};

export const Input = forwardRef(InputInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: InputProps &
    UseControllerProps<TFieldValues, TName> & {
      ref?: ForwardedRef<HTMLInputElement>;
    }
) => ReturnType<typeof InputInner>;

export type InputRawProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "size" | "pattern" | "required"
> & {
  containerClassName?: string;
  leftAddon?: Pick<InputAddonProps, "children" | "className">;
  size?: Size;
  variant?: InputVariant;
  leftElement?: Pick<
    InputElementProps,
    "children" | "className" | "pointerEvents"
  >;
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  rightAddon?: Pick<InputAddonProps, "children" | "className">;
  inputClassName?: string;
  rightElement?: Pick<
    InputElementProps,
    "children" | "className" | "pointerEvents"
  >;
  step?: number;
  type?: HTMLInputElement["type"];
};

export const InputRaw = forwardRef(
  (
    {
      containerClassName,
      leftAddon,
      leftElement,
      id,
      type = "text",
      size = "md",
      variant = "outline",
      value,
      onChange,
      error,
      disabled = false,
      rightAddon,
      inputClassName,
      rightElement,
      step,
      ...props
    }: InputRawProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const leftElementRef = useRef<HTMLDivElement>(null);
    const rightElementRef = useRef<HTMLDivElement>(null);
    const { width: leftElementWidth } = useRefDimensions(leftElementRef);
    const { width: rightElementWidth } = useRefDimensions(rightElementRef);

    return (
      <div className={cn(inputContainerClassName, containerClassName)}>
        {leftAddon && (
          <InputAddon
            size={size}
            variant={variant}
            type="left"
            {...leftAddon}
          />
        )}
        {leftElement && (
          <InputElement
            size={size}
            type="left"
            ref={leftElementRef}
            {...leftElement}
          />
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onWheel={(e: any) => e.target?.type === "number" && e.target?.blur()} // damit beim scrollen die zahl nicht versehentlich verändert wird
          className={cn(
            getInputStyles({
              size,
              variant,
              error: !!error,
              disabled,
              leftAddon: !!leftAddon,
              rightAddon: !!rightAddon,
            }),
            inputClassName
          )}
          style={{
            paddingLeft: leftElement && leftElementWidth,
            paddingRight: rightElement && rightElementWidth,
          }}
          step={step}
          disabled={disabled}
          {...props}
        />

        {rightAddon && (
          <InputAddon
            size={size}
            variant={variant}
            type="right"
            {...rightAddon}
          />
        )}
        {rightElement && (
          <InputElement
            size={size}
            type="right"
            ref={rightElementRef}
            {...rightElement}
          />
        )}
      </div>
    );
  }
);

InputRaw.displayName = "InputRaw";
