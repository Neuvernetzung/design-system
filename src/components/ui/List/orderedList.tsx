import cn from "classnames";
import { ForwardedRef, forwardRef, OlHTMLAttributes } from "react";

import { listStyle } from "../../../styles";
import { typedMemo } from "../../../utils/internal";

export type OrderedListProps = OlHTMLAttributes<HTMLOListElement> & {};

export const OrderedList = forwardRef(
  (
    { className, ...props }: OrderedListProps,
    ref: ForwardedRef<HTMLOListElement>
  ) => (
    <ol
      ref={ref}
      className={cn("list-decimal", listStyle, className)}
      {...props}
    />
  )
);
OrderedList.displayName = "OrderedList";

export default typedMemo(OrderedList);
