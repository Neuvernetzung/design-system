import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactElement } from "react";

export type LinkProps = NextLinkProps & {
  children?: ReactElement | string;
  disabled?: boolean;
};

export const Link = ({ as, href, disabled, ...props }: LinkProps) => {
  if (disabled) return <span {...props} />;
  return <NextLink as={as} href={href} {...props} />;
};

export default Link;
