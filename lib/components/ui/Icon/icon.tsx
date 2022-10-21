import { forwardRef, memo, HTMLAttributes, FC, ElementType } from "react";
import cn from "classnames";

export const sizes: Sizes = {
  xs: "h-4 w-4",
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-10 w-10",
};

type Sizes = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
};

export const colors: Colors = {
  inherit: "text-inherit",
  primary: "text-primary-500",
  accent: "text-accent-800 dark:text-accent-100",
  success: "text-green-500",
  warn: "text-yellow-500",
  danger: "text-red-500",
};

type Colors = {
  inherit: string;
  primary: string;
  accent: string;
  success: string;
  warn: string;
  danger: string;
};

export interface IconProps extends HTMLAttributes<HTMLElement> {
  size?: keyof Sizes;
  color?: keyof Colors;
  icon: ElementType<SVGElement>;
  className?: string;
}

export const Icon = forwardRef<HTMLElement, IconProps>(
  ({ size = "md", icon, color = "inherit", className }) => {
    const IconWrapper: ElementType = icon;

    return (
      <IconWrapper className={cn(sizes[size], colors[color], className)} />
    );
  }
);

Icon.defaultProps = {
  size: "md",
  color: "inherit",
};

export default memo(Icon);
