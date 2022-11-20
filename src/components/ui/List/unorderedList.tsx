import cn from "classnames";
import { memo, OlHTMLAttributes } from "react";

import { listStyle } from "../../../styles";

export interface UnorderedListProps
  extends OlHTMLAttributes<HTMLUListElement> {}

export const UnorderedList = ({ className, ...props }: UnorderedListProps) => (
  <ul className={cn("list-disc", listStyle, className)} {...props} />
);

export default memo(UnorderedList);
