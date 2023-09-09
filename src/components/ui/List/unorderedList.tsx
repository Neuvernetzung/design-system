import cn from "classnames";
import { ForwardedRef, forwardRef, OlHTMLAttributes } from "react";

import { listStyle } from "../../../styles";
import { typedMemo } from "../../../utils/internal";

export type UnorderedListProps = OlHTMLAttributes<HTMLUListElement> & {};

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

export default typedMemo(UnorderedList);
