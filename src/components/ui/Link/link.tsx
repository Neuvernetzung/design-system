import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactElement } from "react";

export interface LinkProps extends NextLinkProps {
  children: ReactElement | string;
  disabled?: boolean;
}

export const Link = ({ as, href, disabled, ...props }: LinkProps) => {
  if (disabled) return <span {...props} />;
  return <NextLink as={as} href={href} {...props} />;
};

Link.defaultProps = { disabled: undefined };

export default Link;
