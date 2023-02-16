import cn from "classnames";
import { ForwardedRef, forwardRef, memo, OlHTMLAttributes } from "react";

import { listStyle } from "../../../styles";

export interface UnorderedListProps
  extends OlHTMLAttributes<HTMLUListElement> {}

export const UnorderedList = forwardRef(
  (
    { className, ...props }: UnorderedListProps,
    ref: ForwardedRef<HTMLUListElement>
  ) => (
    <ul
      ref={ref}
      className={cn("list-disc", listStyle, className)}
      {...props}
    />
  )
);
UnorderedList.displayName = "UnorderedList";

export default memo(UnorderedList);