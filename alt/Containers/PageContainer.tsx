import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";

interface PageContainerProps extends ContainerProps {
  navbarHeight?: number;
  footerHeight?: number;
}

export const PageContainer = ({
  footerHeight,
  navbarHeight,
  ...props
}: PageContainerProps) => (
  <ChakraContainer
    as="main"
    maxW="none"
    overflow="hidden"
    display="flex"
    px={{ base: "4", xl: "12" }}
    pt={`calc(36px + ${navbarHeight || 0}px)`}
    minH={`calc(100vh - ${footerHeight || 0}px)`}
    {...props}
  />
);

PageContainer.defaultProps = {
  navbarHeight: undefined,
  footerHeight: undefined,
};
