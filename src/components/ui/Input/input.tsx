import cn from "classnames";
import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
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

export const sizes = inputSizes;
export const variants = inputVariants;

export type InputProps = HTMLAttributes<HTMLInputElement> & {
  type?: "text" | "number" | "password" | "url";
  label?: string;
  helper?: any;
  size?: keyof Sizes;
  variant?: keyof InputVariants;
  placeholder?: string;
  leftAddon?: Pick<InputAddonProps, "className" | "children">;
  rightAddon?: Pick<InputAddonProps, "className" | "children">;
  leftElement?: Pick<
    InputElementProps,
    "className" | "children" | "pointerEvents"
  >;
  rightElement?: Pick<
    InputElementProps,
    "className" | "children" | "pointerEvents"
  >;
  required?: RequiredRule;
  maxLength?: MaxLengthRule;
  minLength?: MinLengthRule;
  max?: MaxRule;
  min?: MinRule;
  pattern?: PatternRule;
  disabled?: boolean;
  step?: number;
  className?: string;
  containerClassName?: string;
  inputClassName?: string;
  value?: string;
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
    step = 1,
    className,
    containerClassName,
    inputClassName,
    ...props
  }: InputProps & UseControllerProps<TFieldValues, TName>,
  ref: Ref<HTMLInputElement>
) => {
  const leftElementRef: any = useRef(null);
  const rightElementRef: any = useRef(null);
  const [leftElementWidth, setleftElementWidth] = useState();
  const [rightElementWidth, setRightElementWidth] = useState();
  useEffect(() => {
    setleftElementWidth(leftElementRef?.current?.clientWidth);
    setRightElementWidth(rightElementRef?.current?.clientWidth);
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required,
        maxLength,
        minLength,
        max,
        min,
        pattern,
        validate: (value) => {
          if (type === "number" && step)
            return (
              (value.toString().split(".")[1]?.length || 0) <=
              (step.toString().split(".")[1]?.length || 0)
            );
          return true;
        },
      }}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <FormElement
          error={error}
          name={name}
          label={label}
          helper={helper}
          size={size}
          className={className}
        >
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
              id={name}
              ref={ref}
              value={value}
              onChange={onChange}
              onWheel={(e: any) =>
                e.target?.type === "number" && e.target?.blur()
              } // damit beim scrollen die zahl nicht versehentlich verändert wird
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
              <InputAddon
                size={size}
                variant={variant}
                isRight
                {...rightAddon}
              />
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
