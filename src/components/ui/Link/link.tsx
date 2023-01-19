import cn from "classnames";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactElement } from "react";
import { focus } from "../../../styles";

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

export interface NativeLinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: ReactElement | string;
}

export const NativeLink = ({
  href,
  children,
  className,
  ...props
}: NativeLinkProps) => (
  <a
    href={href}
    className={cn("underline", focus.accent, className)}
    {...props}
  >
    {children}
  </a>
);

NativeLink.defaultProps = {
  href: null,
  children: undefined,
};
