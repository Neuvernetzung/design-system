import { FormElement, RequiredProps } from "../Form";
import {
  minHeights,
  roundings,
  paddings,
  focus,
  transition,
  placeholder,
  textColors,
  bgColors,
  extendedBgColors,
  extendedBgColorsInteractive,
  bordersInteractive,
  roundingsLeft,
  roundingsRight,
  borders,
} from "../../../styles";
import { memo, forwardRef, useRef, useLayoutEffect, useState } from "react";
import cn from "classnames";
import s from "./input.module.css";
import get from "lodash/get";
import { sizes as textSizes } from "../Typography/Text/text";
import type { Sizes } from "../../../types";
import type { InputAddonProps } from "./InputAddon/inputAddon";
import { InputAddon } from "./InputAddon";
import type { InputElementProps } from "./InputElement/inputElement";
import { InputElement } from "./InputElement";

export const sizes: Sizes = {
  xs: `${paddings.xs} ${minHeights.xs} ${textSizes.xs}`,
  sm: `${paddings.sm} ${minHeights.sm} ${textSizes.sm}`,
  md: `${paddings.md} ${minHeights.md} ${textSizes.md}`,
  lg: `${paddings.lg} ${minHeights.lg} ${textSizes.lg}`,
  xl: `${paddings.xl} ${minHeights.xl} ${textSizes.xl}`,
};

export type InputProps = {
  name: string;
  label?: string;
  helper?: any;
  size?: keyof Sizes;
  variant?: keyof Variants;
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
  formMethods: any;
  required?: RequiredProps;
  disabled?: boolean;
  step?: number;
  className?: string;
};

export const variants: Variants = {
  outline: {
    base: `${bgColors.accent} border ${placeholder.outline}`,
    default: `${bordersInteractive.accent}`,
    error: `${bordersInteractive.danger}`,
    disabled: `${borders.accent} ${extendedBgColors.filledSubtile}`,
  },
  filled: {
    base: ``,
    default: `${extendedBgColorsInteractive.filled}`,
    error: `${extendedBgColorsInteractive.danger} ${placeholder.filledError}`,
    disabled: `${extendedBgColors.filled}`,
  },
};

export type Variants = {
  outline: StateVariant;
  filled: StateVariant;
};

type StateVariant = {
  base: string;
  default: string;
  error: string;
  disabled: string;
};

const styles = {
  containerBase: "flex flex-row relative",
  inputBase: `outline-none w-full ${textColors.accent}`,
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      helper,
      size = "md",
      leftAddon,
      rightAddon,
      leftElement,
      rightElement,
      formMethods,
      required,
      disabled,
      variant = "outline",
      step = 1,
      className,
      ...props
    }: InputProps,
    ref
  ) => {
    const { register } = formMethods;
    const error = get(formMethods?.formState?.errors, name);

    const leftElementRef: any = useRef(null);
    const rightElementRef: any = useRef(null);
    const [leftElementWidth, setleftElementWidth] = useState();
    const [rightElementWidth, setRightElementWidth] = useState();
    useLayoutEffect(() => {
      setleftElementWidth(leftElementRef?.current?.clientWidth),
        setRightElementWidth(rightElementRef?.current?.clientWidth);
    }, []);

    return (
      <FormElement
        error={error}
        name={name}
        label={label}
        helper={helper}
        size={size}
      >
        <div className={cn(styles.containerBase)}>
          {leftAddon && (
            <InputAddon size={size} variant={variant} isLeft {...leftAddon} />
          )}
          {leftElement && (
            <InputElement
              size={size}
              variant={variant}
              isLeft
              ref={leftElementRef}
              {...leftElement}
            />
          )}
          <input
            id={name}
            ref={ref}
            className={cn(
              styles.inputBase,
              s.Input,
              transition,
              !error ? focus.accent : focus.danger,
              variants[variant].base,
              sizes[size],
              !error
                ? !disabled && variants[variant]?.default
                : variants[variant]?.error,
              !leftAddon && !rightAddon && roundings[size],
              !leftAddon && roundingsLeft[size],
              !rightAddon && roundingsRight[size],
              disabled && `cursor-not-allowed ${variants[variant]?.disabled}`,
              className
            )}
            style={{
              paddingLeft: leftElement && leftElementWidth,
              paddingRight: rightElement && rightElementWidth,
            }}
            {...register(name, {
              required,
            })}
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
              variant={variant}
              isRight
              ref={rightElementRef}
              {...rightElement}
            />
          )}
        </div>
      </FormElement>
    );
  }
);

Input.defaultProps = {
  label: undefined,
  helper: undefined,
  leftAddon: undefined,
  rightAddon: undefined,
  leftElement: undefined,
  rightElement: undefined,
  required: false,
};

export default memo(Input);
