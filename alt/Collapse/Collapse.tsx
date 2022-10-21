import { Collapse as ChakraCollapse, CollapseProps } from "@chakra-ui/react";

interface ExtendedCollapseProps extends CollapseProps {
  open: boolean;
}

export const Collapse = ({
  open,
  children,
  ...props
}: ExtendedCollapseProps) => (
  <ChakraCollapse in={open} {...props}>
    {children}
  </ChakraCollapse>
);
