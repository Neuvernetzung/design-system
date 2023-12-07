import { cn } from "@/utils";
import { ForwardedRef, forwardRef, OlHTMLAttributes } from "react";

import { listStyle } from "../../../styles";

export type OrderedListProps = OlHTMLAttributes<HTMLOListElement>;

export const OrderedList = forwardRef(
  (
    { className, ...props }: OrderedListProps,
    ref: ForwardedRef<HTMLOListElement>
  ) => (
    <ol ref={ref} className={cn(orderedListClassName, className)} {...props} />
  )
);
OrderedList.displayName = "OrderedList";

export const orderedListClassName = cn("list-decimal", listStyle);
