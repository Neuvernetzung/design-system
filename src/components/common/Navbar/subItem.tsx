import { ChevronRightIcon } from "@heroicons/react/24/outline";
import cn from "classnames";
import isString from "lodash/isString";
import Link from "next/link";
import { FC, ReactElement, SVGProps } from "react";

import {
  bgColorsInteractive,
  gaps,
  paddingsEvenly,
  roundings,
  transition,
  transitionFast,
} from "../../../styles";
import { Heading, Icon, Tag, TagProps, Text } from "../../ui";
import type { NavSubLabelProps } from "./navbar";

type NavbarSubItemProps = {
  disabled?: boolean;
  href?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
  label: string;
  tag?: TagProps;
  subLabel?: NavSubLabelProps;
};

export const NavbarSubItem = ({
  disabled,
  href,
  icon,
  label,
  tag,
  subLabel,
}: NavbarSubItemProps) => {
  const baseClass = cn(
    "flex flex-row items-center justify-between group",
    gaps.md,
    paddingsEvenly.md,
    roundings.md,
    transition
  );

  return (
    <LinkWrap href={href} disabled={disabled}>
      <div
        className={cn(
          baseClass,
          bgColorsInteractive.white,
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
      >
        <div className={cn("flex flex-row", gaps.md)}>
          {icon && (
            <div className="flex">
              <Icon color="accent" icon={icon} />
            </div>
          )}
          <div>
            <div className={cn("flex flex-row items-center", gaps.sm)}>
              <Heading as="h4">{label}</Heading>
              {tag && <Tag variant="solid" size="sm" {...tag} />}
            </div>

            {subLabel && (
              <div
                className={cn(
                  subLabel.hideOnMobile ? "hidden md:flex" : "flex"
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
        </div>
        <Icon
          color="accent"
          icon={ChevronRightIcon}
          className={cn("group-hover:translate-x-1", transitionFast)}
        />
      </div>
    </LinkWrap>
  );
};

type LinkKWrapProps = {
  disabled?: boolean;
  href?: string;
  children: ReactElement;
};

const LinkWrap = ({ disabled, href, children }: LinkKWrapProps) => {
  if (!disabled) return <Link href={href || "#"}>{children}</Link>;

  return children;
};
