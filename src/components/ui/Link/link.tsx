import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactElement } from "react";

export interface LinkProps extends NextLinkProps {
  children: ReactElement;
  disabled?: boolean;
}

export const Link = ({ as, href, disabled, ...props }: LinkProps) => {
  if (disabled) return props.children;
  return <NextLink as={as} href={href} {...props} />;
};

Link.defaultProps = { disabled: undefined };

export default Link;
