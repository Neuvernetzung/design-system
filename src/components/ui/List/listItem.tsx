import cn from "classnames";
import { LiHTMLAttributes, memo } from "react";

import { textColors } from "../../../styles";

export interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {}

export const ListItem = ({ className, ...props }: ListItemProps) => (
  <li
    className={cn(textColors.accent, "list-item indent-5", className)}
    {...props}
  />
);

export default memo(ListItem);
