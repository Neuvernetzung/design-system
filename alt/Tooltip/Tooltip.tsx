import { type TooltipProps, Tooltip as ChakraTooltip } from "@chakra-ui/react";

export const Tooltip = ({ placement = "top", ...props }: TooltipProps) => (
  <ChakraTooltip placement={placement} {...props} />
);
