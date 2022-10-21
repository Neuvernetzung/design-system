import {
  Popover as ChakraPopover,
  PopoverContent,
  PopoverProps,
  PopoverTrigger,
} from "@chakra-ui/react";
import { ReactElement } from "react";

import { useColorModeValue } from "../../utils";

interface ExtendedPopoverProps extends PopoverProps {
  button: ReactElement;
  children: string | ReactElement;
}

export const Popover = ({
  button,
  trigger,
  placement = "bottom-start",
  children,
  ...props
}: ExtendedPopoverProps) => (
  <ChakraPopover trigger={trigger} placement={placement} {...props}>
    <PopoverTrigger>{button}</PopoverTrigger>

    <PopoverContent
      bg={useColorModeValue("gray.50", "gray.900")}
      border={0}
      boxShadow="xl"
      p={4}
      rounded="xl"
      minW="sm"
    >
      {children}
    </PopoverContent>
  </ChakraPopover>
);
