import cn from "classnames";
import { memo, OlHTMLAttributes, forwardRef, ForwardedRef } from "react";

import { listStyle } from "../../../styles";

export interface OrderedListProps extends OlHTMLAttributes<HTMLOListElement> {}

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

export default memo(OrderedList);
