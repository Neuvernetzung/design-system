import cn from "classnames";
import { memo, OlHTMLAttributes } from "react";

import { listStyle } from "../../../styles";

export interface OrderedListProps extends OlHTMLAttributes<HTMLOListElement> {}

export const OrderedList = ({ className, ...props }: OrderedListProps) => (
  <ol className={cn("list-decimal", listStyle, className)} {...props} />
);

export default memo(OrderedList);
