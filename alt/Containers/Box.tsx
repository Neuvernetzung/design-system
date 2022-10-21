import { Box as ChakraBox, BoxProps, forwardRef } from "@chakra-ui/react";

export const Box = forwardRef<BoxProps, "div">(({ ...props }, ref) => (
  <ChakraBox ref={ref} {...props} />
));

export type { BoxProps };
