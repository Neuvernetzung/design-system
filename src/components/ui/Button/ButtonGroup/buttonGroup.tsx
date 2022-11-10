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
      "group flex flex-row items-center not-first-of-type:rounded-l-none not-last-of-type:rounded-r-none not-last-of-type:border-r-0",
      // es wird not-last-of-type und not-first-of-type verwendet, statt not-first-child und not-last-child,
      // da sonst beim Menü das Item Div als child mitgezählt wird und somit der letzte button nicht das letzte child ist.
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
