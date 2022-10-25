import cn from "classnames";
import get from "lodash/get";
import { forwardRef, memo, useLayoutEffect, useRef, useState } from "react";

import {
  getInputStyles,
  inputSizes,
  inputVariants,
} from "../../../styles/groups";
import type { InputVariants, Sizes } from "../../../types";
import { FormElement, RequiredRule } from "../Form";
import s from "./input.module.css";
import { InputAddon } from "./InputAddon";
import type { InputAddonProps } from "./InputAddon/inputAddon";
import { InputElement } from "./InputElement";
import type { InputElementProps } from "./InputElement/inputElement";

export const sizes = inputSizes;
export const variants = inputVariants;

export type InputProps = {
  name: string;
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
  formMethods: any;
  required?: RequiredRule;
  disabled?: boolean;
  step?: number;
  className?: string;
};

const styles = {
  containerBase: "flex flex-row relative",
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
      disabled = false,
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
              s.Input,
              getInputStyles({
                size,
                variant,
                error,
                disabled,
                leftAddon,
                rightAddon,
              }),
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
