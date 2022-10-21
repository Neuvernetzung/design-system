import {
  type LinkProps as ChakraLinkProps,
  Link as ChakraLink,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface LinkProps extends ChakraLinkProps {
  disabled?: boolean;
}

export const Link = ({ href, children, disabled, ...props }: LinkProps) => {
  if (!href || disabled)
    return (
      <ChakraLink
        {...props}
        {...(disabled && { cursor: "not-allowed", opacity: "60%" })}
        disabled
      >
        {children}
      </ChakraLink>
    );

  return (
    <NextLink href={href} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  );
};

Link.defaultProps = {
  disabled: false,
};
