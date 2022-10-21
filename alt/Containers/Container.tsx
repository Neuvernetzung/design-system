import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";

export const Container = ({ ...props }: ContainerProps) => (
  <ChakraContainer {...props} />
);
