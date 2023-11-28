import { cn } from "@/utils";

import { borders } from "../../../styles";

export type HorizontalRuleProps = { className?: string };

export const HorizontalRule = ({ className }: HorizontalRuleProps) => (
  <hr className={cn(horizontalRuleClassName, className)} />
);

export const horizontalRuleClassName = borders.accent;
