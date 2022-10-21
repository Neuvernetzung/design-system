import {
  AspectRatio as ChakraAspectRatio,
  AspectRatioProps,
  forwardRef,
} from "@chakra-ui/react";

export const AspectRatio = forwardRef<AspectRatioProps, "div">(
  ({ ...props }, ref) => <ChakraAspectRatio ref={ref} {...props} />
);

export type { AspectRatioProps };
