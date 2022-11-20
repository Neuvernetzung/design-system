import cn from "classnames";
import { BlockquoteHTMLAttributes, memo } from "react";

import { borders, paddings } from "../../../styles";

export interface BlockQuoteProps
  extends BlockquoteHTMLAttributes<HTMLQuoteElement> {}

export const BlockQuote = ({ className, ...props }: BlockQuoteProps) => (
  <blockquote
    className={cn("italic border-l-4", borders.accent, paddings.md, className)}
    {...props}
  />
);

export default memo(BlockQuote);
