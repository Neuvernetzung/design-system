import cn from "classnames";
import { HTMLAttributes, ReactNode } from "react";

export type ButtonGroupProps = HTMLAttributes<HTMLDivElement> & {
  className?: string;
  direction?: "horizontal" | "vertical";
  children?: ReactNode;
  reverse?: boolean;
};

const ButtonGroup = ({
  className,
  direction,
  reverse,
  children,
  ...props
}: ButtonGroupProps) => (
  <div
    role="group"
    className={cn(
      "group flex items-stretch",
      direction === "horizontal" &&
        cn(
          reverse ? "flex-row-reverse" : "flex-row",
          "not-first-of-type:rounded-l-none not-last-of-type:rounded-r-none not-last-of-type:border-r-0"
        ),
      direction === "vertical" &&
        cn(
          reverse ? "flex-col-reverse" : "flex-col",
          "not-first-of-type:rounded-t-none not-last-of-type:rounded-b-none not-last-of-type:border-b-0"
        ),
      // es wird not-last-of-type und not-first-of-type verwendet, statt not-first-child und not-last-child,
      // da sonst beim Menü das Item Div als child mitgezählt wird und somit der letzte button nicht das letzte child ist.
      // Items Stretch um Elemente in der Höhe aneinander anzupassen, Children Button darf kein h-min oder h-auto etc. aufweisen.
      className
    )}
    {...props}
  >
    {children}
  </div>
);

export default ButtonGroup;
