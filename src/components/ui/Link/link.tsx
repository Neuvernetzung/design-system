import cn from "classnames";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactElement } from "react";

import { linkStyle } from "../../../styles/link";
import { hrefRegex, pathRegex } from "../../../utils/internal/regex";

export type LinkProps = NextLinkProps & {
  children: ReactElement | string;
  disabled?: boolean;
};

export const Link = ({ as, href, disabled, ...props }: LinkProps) => {
  if (disabled) return <span {...props} />;
  return <NextLink as={as} href={href} {...props} />;
};

export default Link;

export type NativeLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  children?: ReactElement | string;
};

export const NativeLink = ({
  href,
  children,
  className,
  ...props
}: NativeLinkProps) => {
  if (!href)
    return (
      <span className={cn(className)} {...props}>
        {children}
      </span>
    );
  if (hrefRegex.test(href))
    return (
      <NativeLinkInner href={href} className={className}>
        {children}
      </NativeLinkInner>
    );
  if (pathRegex.test(href))
    return (
      <NextLink href={href}>
        <span className={cn(linkStyle, className)} {...props}>
          {children}
        </span>
      </NextLink>
    );
  return (
    <NativeLinkInner href={href} className={className}>
      {children}
    </NativeLinkInner>
  );
};

type NativeLinkInnerProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  children?: ReactElement | string;
};

const NativeLinkInner = ({
  href,
  className,
  children,
  ...props
}: NativeLinkInnerProps) => (
  <a
    href={href}
    rel="noopener noreferrer nofollow"
    className={cn(linkStyle, className)}
    {...props}
  >
    {children}
  </a>
);
