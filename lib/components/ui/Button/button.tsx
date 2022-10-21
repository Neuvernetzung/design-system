/* eslint-disable react/button-has-type */
import cn from "classnames";
import { colorIsBright, getThemeColors } from "../../../utils";
import { ButtonHTMLAttributes, forwardRef, memo } from "react";

export const variants: Variants = {
  filled: "",
  outline:
    "bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10 border",
  ghost:
    "bg-opacity-0 dark:bg-opacity-0 hover:bg-opacity-10 dark:hover:bg-opacity-10",
};

type Variants = { filled: string; outline: string; ghost: string };

const realColors = {
  "primary-500": getThemeColors("primary")[500],
  "accent-500": getThemeColors("accent")[500],
  "green-500": getThemeColors("green")[500],
  "yellow-500": getThemeColors("yellow")[500],
  "red-500": getThemeColors("red")[500],
};

export const colors: Colors = {
  primary: {
    base: "bg-primary-500 hover:bg-primary-600 border-primary-500 ring-primary-500",
    text: {
      filled: colorIsBright(realColors["primary-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-primary-500",
      ghost: "text-primary-500",
    },
  },
  accent: {
    base: "bg-accent-600 dark:bg-accent-300 hover:bg-accent-700 dark:hover:bg-accent-200 border-accent-600 dark:border-accent-300 ring-accent-600 dark:ring-accent-300",
    text: {
      filled: colorIsBright(realColors["accent-500"])
        ? "text-accent-50 dark:text-accent-900"
        : "text-accent-900 dark:text-accent-50",
      outline: "text-accent-600 dark:text-accent-300",
      ghost: "text-accent-600 dark:text-accent-300",
    },
  },
  success: {
    base: "bg-green-500 hover:bg-green-600 border-green-500 ring-green-500",
    text: {
      filled: colorIsBright(realColors["green-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-green-500",
      ghost: "text-green-500",
    },
  },
  warn: {
    base: "bg-yellow-500 hover:bg-yellow-600 border-yellow-500 ring-yellow-500",
    text: {
      filled: colorIsBright(realColors["yellow-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-yellow-500",
      ghost: "text-yellow-500",
    },
  },
  danger: {
    base: "bg-red-500 hover:bg-red-600 border-red-500 ring-red-500",
    text: {
      filled: colorIsBright(realColors["red-500"])
        ? "text-accent-50"
        : "text-accent-900",
      outline: "text-red-500",
      ghost: "text-red-500",
    },
  },
};

type Colors = {
  primary: ColorProps;
  accent: ColorProps;
  success: ColorProps;
  warn: ColorProps;
  danger: ColorProps;
};

type ColorProps = {
  base: string;
  text: Variants;
};

export const sizes: Sizes = {
  xs: "py-0.5 px-2",
  sm: "py-1 px-4",
  md: "py-2 px-6",
  lg: "py-3 px-8",
  xl: "py-4 px-12",
};

type Sizes = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export const styles = {
  base: "appearance-none inline-block prose prose-sm rounded-md h-min",
  focus: "focus:outline-none focus-visible:ring focus-visible:ring-opacity-20",
  transition: "transition duration-300 ease-in-out",
  disabled: "bg-gray-200 cursor-not-allowed",
  fullWidth: "w-full",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof Variants;
  color?: keyof Colors;
  size?: keyof Sizes;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      size = "md",
      type = "button",
      variant = "filled",
      color = "accent",
      disabled = false,
      fullWidth,
      className,
      ...props
    },
    ref
  ): JSX.Element => {
    const classes = cn(
      styles.base,
      styles.transition,
      styles.focus,
      variants[variant],
      sizes[size],
      !disabled && colors[color]?.base,
      !disabled && colors[color]?.text[variant],
      disabled && styles.disabled,
      { [styles.fullWidth]: fullWidth },
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={classes}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default memo(Button);

Button.displayName = "Button";
Button.defaultProps = {
  variant: "filled",
  color: "accent",
  size: "md",
  fullWidth: false,
};
