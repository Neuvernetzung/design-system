import {
  Button as ChakraButton,
  ButtonProps,
  forwardRef,
} from "@chakra-ui/react";

export const Button = forwardRef<ButtonProps, "button">(({ ...props }, ref) => (
  <ChakraButton {...props} ref={ref} />
));
