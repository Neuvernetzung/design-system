import { forwardRef, HTMLAttributes, memo } from "react";
import cn from "classnames";

export const sizes: Sizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "sm:text-2xl text-xl",
  "3xl": "sm:text-3xl text-2xl",
  "4xl": "md:text-4xl text-3xl",
  "5xl": "lg:text-5xl md:text-4xl text-3xl",
  "6xl": "lg:text-6xl md:text-5xl text-4xl",
};

type Sizes = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
  "4xl": string;
  "5xl": string;
  "6xl": string;
};

export const colors = {
  primary: "text-primary-500",
  accent: "text-accent-800 dark:text-accent-100",
  light: "text-accent-100",
  dark: "text-accent-800",
  success: "text-green-500",
  warn: "text-yellow-500",
  danger: "text-red-500",
};

type Colors = {
  primary: string;
  accent: string;
  success: string;
  warn: string;
  danger: string;
};

export const tagMap: TagMap = {
  xs: "h6",
  sm: "h5",
  md: "h4",
  lg: "h3",
  xl: "h2",
  "2xl": "h2",
  "3xl": "h2",
  "4xl": "h1",
  "5xl": "h1",
  "6xl": "h1",
};

type TagMap = Record<keyof Sizes, keyof JSX.IntrinsicElements>;

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  size?: keyof Sizes;
  color?: keyof Colors;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({
    size = "md",
    color = "accent",
    as,
    className,
    children,
  }: HeadingProps) => {
    const Component: keyof JSX.IntrinsicElements = as || tagMap[size];

    return (
      <Component
        className={cn("font-heading", sizes[size], colors[color], className)}
      >
        {children}
      </Component>
    );
  }
);

export default memo(Heading);
