import { ChevronRightIcon } from "@heroicons/react/24/outline";
import cn from "classnames";
import isString from "lodash/isString";
import Link from "next/link";
import { ReactElement } from "react";

import { gaps, transitionFast } from "../../../../styles";
import { ExtendedColors, SvgType } from "../../../../types";
import { Button, Heading, Icon, Tag, TagProps, Text } from "../../../ui";
import type { NavSubLabelProps } from "../navbar";

export type NavbarSubItemProps = {
  disabled?: boolean;
  href?: string;
  icon?: SvgType;
  label: string;
  tag?: TagProps;
  subLabel?: NavSubLabelProps;
  color?: keyof ExtendedColors;
  textColor?: string;
};

export const NavbarDesktopSubItem = ({
  disabled,
  href,
  icon,
  label,
  tag,
  subLabel,
}: NavbarSubItemProps) => (
  <NavLinkWrap href={href} disabled={disabled}>
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
          icon={ChevronRightIcon}
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
};

export const NavLinkWrap = ({ disabled, href, children }: LinkKWrapProps) => {
  if (!disabled) return <Link href={href || "#"}>{children}</Link>;

  return children;
};
