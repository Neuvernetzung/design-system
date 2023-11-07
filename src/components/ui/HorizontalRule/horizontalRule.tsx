import cn from "classnames";

import { borders } from "../../../styles";

export type HorizontalRuleProps = { className?: string };

export const HorizontalRule = ({ className }: HorizontalRuleProps) => (
  <hr className={cn(borders.accent, className)} />
);
