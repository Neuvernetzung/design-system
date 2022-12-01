import cn from "classnames";
import { LiHTMLAttributes, memo, forwardRef, ForwardedRef } from "react";

import { textColors } from "../../../styles";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {}

export const ListItem = forwardRef(
  (
    { className, ...props }: ListItemProps,
    ref: ForwardedRef<HTMLLIElement>
  ) => (
    <li
      ref={ref}
      className={cn(textColors.accent, "list-item indent-5", className)}
      {...props}
    />
  )
);
ListItem.displayName = "ListItem";

export default memo(ListItem);
