import { cn } from "@/utils";
import { ForwardedRef, forwardRef, OlHTMLAttributes } from "react";

import { listStyle } from "../../../styles";

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
