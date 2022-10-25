import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

const ButtonGroup = ({ className, children, ...props }: ButtonGroupProps) => (
  <div
    role="group"
    className={cn(
      "group flex flex-row items-center not-first:rounded-l-none not-last:rounded-r-none not-last:border-r-0",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default ButtonGroup;

ButtonGroup.defaultProps = {
  className: undefined,
  children: undefined,
};
