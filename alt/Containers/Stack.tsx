import { type StackProps, Stack as ChakraStack } from "@chakra-ui/react";

export const Stack = ({ ...props }: StackProps) => <ChakraStack {...props} />;

export type { StackProps };
