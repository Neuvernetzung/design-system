import { cn } from "@/utils";
import NextLink from "next/link";
import { AnchorHTMLAttributes, ReactElement } from "react";

import { getLinkStyle } from "../../../../styles/link";
import type { Color, Size } from "../../../../types";
import { Icon } from "../../Icon";
import { IconExternalLink } from "@tabler/icons-react";

export type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href?: string;
  children?: ReactElement | string;
  color?: Color;
  size?: Size;
};

export const Anchor = ({
  href,
  children,
  className,
  color = "accent",
  size = "md",
  ...props
}: AnchorProps) => {
  if (!href)
    return (
      <span className={cn(className)} {...props}>
        {children}
      </span>
    );

  const isExternal = isValidHttpUrl(href);

  return (
    <NextLink
      href={href}
      rel={isExternal ? "noopener noreferrer nofollow" : undefined}
      className={cn(getLinkStyle({ color }), "inline-flex", className)}
      {...props}
    >
      {children}
      {isExternal && (
        <Icon
          size={size}
          icon={IconExternalLink}
          color={color}
          className="!inline"
        />
      )}
    </NextLink>
  );
};

const isValidHttpUrl = (href: string) => {
  try {
    const url = new URL(href);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (err) {
    console.error(err);
    return false;
  }
};
