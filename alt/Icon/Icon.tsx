import { forwardRef, Icon as ChakraIcon, IconProps } from "@chakra-ui/react";

interface ExtendedIconProps extends IconProps {
  icon: any;
}

export const Icon = forwardRef<ExtendedIconProps, "svg">(
  ({ icon, fontSize = "24", ...props }, ref) => (
    <ChakraIcon
      as={icon}
      w="6"
      h="6"
      fontSize={fontSize}
      {...props}
      ref={ref}
    />
  )
);
