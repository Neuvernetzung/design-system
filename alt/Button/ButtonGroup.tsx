import {
  type ButtonGroupProps,
  ButtonGroup as ChakraButtonGroup,
} from "@chakra-ui/react";

export const ButtonGroup = ({ ...props }: ButtonGroupProps) => (
  <ChakraButtonGroup {...props} />
);
