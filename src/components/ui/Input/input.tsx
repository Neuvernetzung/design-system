import cn from "classnames";
import { useRouter } from "next/router";
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  Ref,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  UseControllerProps,
} from "react-hook-form";

import { type Locale } from "../../../locales/getText";
import { getInputStyles } from "../../../styles/groups";
import type { InputVariant, Size } from "../../../types";
import { mergeRefs, typedMemo } from "../../../utils/internal";
import {
  maxInputRule,
  maxLengthInputRule,
  minInputRule,
  minLengthInputRule,
  patternInputRule,
  requiredInputRule,
  validationInputResult,
} from "../../../utils/internal/inputRule";
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

export type InputProps = RawInputProps & {
  label?: string;
  helper?: ReactNode;
  required?: RequiredRule;
  maxLength?: MaxLengthRule;
  minLength?: MinLengthRule;
  max?: MaxRule;
  min?: MinRule;
  pattern?: PatternRule;
  type?: "text" | "number" | "password" | "url" | "email";
};

const styles = {
  containerBase: "flex flex-row relative",
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
          if (type === "number" && step)
            return validationInputResult(
              (String(value).split(".")[1]?.length || 0) <=
                (String(step).split(".")[1]?.length || 0)
            );
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
          <RawInput
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

const Input = forwardRef(InputInner) as <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(
  props: InputProps &
    UseControllerProps<TFieldValues, TName> & {
      ref?: ForwardedRef<HTMLInputElement>;
    }
) => ReturnType<typeof InputInner>;

export default typedMemo(Input);

export type RawInputProps = HTMLAttributes<HTMLInputElement> & {
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
  onChange?: (...event: unknown[]) => void;
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

export const RawInput = forwardRef(
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
    }: RawInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const leftElementRef = useRef<HTMLDivElement>(null);
    const rightElementRef = useRef<HTMLDivElement>(null);
    const [leftElementWidth, setleftElementWidth] = useState<number>();
    const [rightElementWidth, setRightElementWidth] = useState<number>();
    useEffect(() => {
      setleftElementWidth(leftElementRef?.current?.clientWidth);
      setRightElementWidth(rightElementRef?.current?.clientWidth);
    }, []);

    return (
      <div className={cn(styles.containerBase, containerClassName)}>
        {leftAddon && (
          <InputAddon size={size} variant={variant} isLeft {...leftAddon} />
        )}
        {leftElement && (
          <InputElement
            size={size}
            isLeft
            ref={leftElementRef}
            {...leftElement}
          />
        )}
        <input
          type={type}
          id={id}
          ref={ref}
          value={value}
          onChange={onChange}
          onWheel={(e: any) => e.target?.type === "number" && e.target?.blur()} // damit beim scrollen die zahl nicht versehentlich verändert wird
          className={cn(
            getInputStyles({
              size,
              variant,
              error: !!error,
              disabled,
              leftAddon,
              rightAddon,
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
          <InputAddon size={size} variant={variant} isRight {...rightAddon} />
        )}
        {rightElement && (
          <InputElement
            size={size}
            isRight
            ref={rightElementRef}
            {...rightElement}
          />
        )}
      </div>
    );
  }
);

RawInput.displayName = "RawInput";
