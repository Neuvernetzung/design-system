import cn from "classnames";
import NextLink from "next/link";
import { AnchorHTMLAttributes, ReactElement } from "react";

import { linkStyle } from "../../../../styles/link";
import { hrefRegex, pathRegex } from "../../../../utils/internal";
import { Color } from "../../../../types";

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  children?: ReactElement | string;
  color?: Color;
};

export const Anchor = ({
  href,
  children,
  className,
  color = "accent",
  ...props
}: AnchorProps) => {
  if (!href)
    return (
      <span className={cn(className)} {...props}>
        {children}
      </span>
    );
  if (hrefRegex.test(href))
    return (
      <AnchorInner href={href} className={className}>
        {children}
      </AnchorInner>
    );
  if (pathRegex.test(href))
    return (
      <NextLink href={href}>
        <span className={cn(linkStyle({ color }), className)} {...props}>
          {children}
        </span>
      </NextLink>
    );
  return (
    <AnchorInner href={href} className={className}>
      {children}
    </AnchorInner>
  );
};

type AnchorInnerProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  children?: ReactElement | string;
  color?: Color;
};

const AnchorInner = ({
  href,
  className,
  children,
  color = "accent",
  ...props
}: AnchorInnerProps) => (
  <a
    href={href}
    rel="noopener noreferrer nofollow"
    className={cn(linkStyle({ color }), className)}
    {...props}
  >
    {children}
  </a>
);
