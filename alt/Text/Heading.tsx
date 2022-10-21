import { type HeadingProps, Heading as ChakraHeading } from "@chakra-ui/react";

export const Heading = ({ colorScheme = "gray", ...props }: HeadingProps) => (
  <ChakraHeading {...props} />
);

export type { HeadingProps };
