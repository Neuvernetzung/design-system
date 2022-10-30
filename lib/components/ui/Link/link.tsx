import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

export interface LinkProps extends NextLinkProps {
  children: ReactNode;
}

export const Link = ({ as, href, ...props }: LinkProps) => (
  <NextLink as={as} href={href} {...props} />
);

Link.defaultProps = {};

export default Link;
