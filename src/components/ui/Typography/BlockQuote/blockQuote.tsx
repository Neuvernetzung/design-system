import cn from "classnames";
import { BlockquoteHTMLAttributes } from "react";

import { borders, paddings } from "../../../../styles";
import { typedMemo } from "../../../../utils/internal";

export type BlockQuoteProps = BlockquoteHTMLAttributes<HTMLQuoteElement> & {};

export const BlockQuote = ({ className, ...props }: BlockQuoteProps) => (
  <blockquote
    className={cn("italic border-l-4", borders.accent, paddings.md, className)}
    {...props}
  />
);

export default typedMemo(BlockQuote);
