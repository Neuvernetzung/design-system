import { cn } from "@/utils";
import { BlockquoteHTMLAttributes } from "react";

import { borders, paddings } from "../../../../styles";

export type BlockQuoteProps = BlockquoteHTMLAttributes<HTMLQuoteElement> & {};

export const BlockQuote = ({ className, ...props }: BlockQuoteProps) => (
  <blockquote
    className={cn("italic border-l-4", borders.accent, paddings.md, className)}
    {...props}
  />
);
