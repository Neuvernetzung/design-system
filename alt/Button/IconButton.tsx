import {
  forwardRef,
  IconButton as ChakraIconButton,
  IconButtonProps,
} from "@chakra-ui/react";

export const IconButton = forwardRef<IconButtonProps, "button">(
  (props, ref) => <ChakraIconButton p="1" {...props} ref={ref} />
);
