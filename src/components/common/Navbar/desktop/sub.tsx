import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "@/utils";
import isString from "lodash/isString";
import Link from "next/link";
import { ReactElement } from "react";

import { gaps, transitionFast } from "../../../../styles";
import type { ExtendedColor, SvgType } from "../../../../types";
import { Text } from "../../../ui/Typography/Text";
import { Button } from "../../../ui/Button";
import { Heading } from "../../../ui/Typography/Heading";
import { Icon } from "../../../ui/Icon";
import { Tag, type TagProps } from "../../../ui/Tag";
import type { NavSubLabelProps } from "../navbar";

export type NavbarSubItemProps = {
  disabled?: boolean;
  href?: string;
  icon?: SvgType;
  label: string;
  tag?: TagProps;
  subLabel?: NavSubLabelProps;
  color?: ExtendedColor;
  textColor?: string;
  external?: boolean;
};

export const NavbarDesktopSubItem = ({
  disabled,
  href,
  icon,
  label,
  tag,
  subLabel,
  external,
}: NavbarSubItemProps) => (
  <NavLinkWrap href={href} disabled={disabled} external={external}>
    <Button
      leftIcon={icon}
      disabled={disabled}
      variant="ghost"
      className={cn("!justify-start !items-start group")}
    >
      <div
        className={cn(
          "flex flex-row items-center justify-between w-full",
          gaps.md
        )}
      >
        <div className="w-full">
          <div className={cn("flex flex-row items-center", gaps.sm)}>
            <Heading as="h4">{label}</Heading>
            {tag && <Tag variant="solid" size="sm" {...tag} />}
          </div>

          {subLabel && (
            <div
              className={cn(
                subLabel.hideOnMobile ? "hidden md:flex" : "flex",
                "text-left"
              )}
            >
              {isString(subLabel.children) ? (
                <Text size="sm">{subLabel.children}</Text>
              ) : (
                subLabel.children
              )}
            </div>
          )}
        </div>
        <Icon
          icon={IconChevronRight}
          className={cn("group-hover:translate-x-1", transitionFast)}
        />
      </div>
    </Button>
  </NavLinkWrap>
);

type LinkKWrapProps = {
  disabled?: boolean;
  href?: string;
  children: ReactElement;
  external?: boolean;
};

export const NavLinkWrap = ({
  disabled,
  href,
  external,
  children,
}: LinkKWrapProps) => {
  if (!disabled)
    return (
      <li>
        <Link href={href || "#"} {...(external ? { target: "_blank" } : {})}>
          {children}
        </Link>
      </li>
    );

  return <li>{children}</li>;
};
