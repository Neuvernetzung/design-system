import { cn } from "@/utils";
import { ForwardedRef, forwardRef, LiHTMLAttributes } from "react";

import { textColors } from "@/styles";

export type ListItemProps = LiHTMLAttributes<HTMLLIElement> & {};

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
