import cn from "classnames";
import { ForwardedRef, forwardRef, LiHTMLAttributes, memo } from "react";

import { textColors } from "../../../styles";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {}

export const ListItem = forwardRef(
  (
    { className, ...props }: ListItemProps,
    ref: ForwardedRef<HTMLLIElement>
  ) => (
    <li
      ref={ref}
      className={cn(
        textColors.accent,
        "pl-2 list-item [&>ul]:pl-5 [&>ol]:pl-5",
        className
      )}
      {...props}
    />
  )
);
ListItem.displayName = "ListItem";

export default memo(ListItem);
