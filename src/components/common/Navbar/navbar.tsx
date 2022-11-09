import { ReactNode, ElementType, useState } from "react";

import {
  Bars3Icon,
  MoonIcon,
  SunIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { IconButton } from "../../ui/Button";
import { Link } from "../../ui/Link";
import { type TagProps } from "../../ui/Tag";
import { DesktopNav } from "./desktopNav";
import { MobileNav } from "./mobileNav";
import cn from "classnames";
import { zIndexes, paddings, gaps } from "../../../styles";
import { Sizes } from "../../../types";

export type NavItemProps = {
  label: string;
  tag?: TagProps;
  subLabel?: string;
  children?: NavItemProps[];
  href?: string;
  disabled?: boolean;
  icon?: ElementType<SVGElement>;
};

export type NavbarProps = {
  navItems: NavItemProps[];
  logo?: ReactNode;
  logoProps?: LogoProps;
  allowDarkMode?: boolean;
  navbarClassName?: string;
  justifyDesktopNav?: "start" | "center" | "end";
  startItems?: ReactNode;
  endItems?: ReactNode;
  gapSize?: keyof Sizes;
};

type LogoProps = {
  href?: string;
  containerClassName?: string;
};

export type SubNavProps = {
  navItems: NavItemProps[];
};

export const Navbar = ({
  navItems = [],
  logo,
  logoProps,
  allowDarkMode = true,
  navbarClassName,
  justifyDesktopNav = "start",
  startItems,
  endItems,
  gapSize = "md",
}: NavbarProps) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div
      className={cn(
        "sticky bg-accent-100 dark:bg-accent-800 w-full",
        zIndexes.nav,
        navbarClassName
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between border-b border-accent-200 dark:border-accent-700",
          paddings.md,
          gaps[gapSize]
        )}
      >
        <Logo logo={logo} {...logoProps} />
        {startItems && startItems}
        <div
          className={cn("hidden lg:flex w-full flex-1", {
            "justify-start": justifyDesktopNav === "start",
            "justify-center": justifyDesktopNav === "center",
            "justify-end": justifyDesktopNav === "end",
          })}
        >
          <DesktopNav navItems={navItems} />
        </div>
        <div className="flex flex-row items-center justify-end">
          {endItems && endItems}
          {allowDarkMode && (
            <div>
              <IconButton
                icon={true ? MoonIcon : SunIcon}
                aria-label="toggle-dark-mode"
                variant="ghost"
              />
            </div>
          )}
          <div className={cn("flex lg:hidden")}>
            <IconButton
              icon={mobileNavOpen ? XMarkIcon : Bars3Icon}
              variant="ghost"
              aria-label="Toggle Navigation"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            />
          </div>
        </div>
      </div>
      {mobileNavOpen && <MobileNav navItems={navItems} />}
    </div>
  );
};

Navbar.defaultProps = {
  allowDarkMode: true,
  navBarProps: undefined,
  justifyDesktopNav: "start",
  gap: "10",
};

const Logo = ({
  href,
  containerClassName,
  logo,
}: LogoProps & Pick<NavbarProps, "logo">) => {
  return (
    <Link href={href || "/"} legacyBehavior>
      <a
        className={cn(
          "flex flex-row items-center select-none whitespace-nowrap",
          gaps.sm,
          containerClassName
        )}
      >
        {logo}
      </a>
    </Link>
  );
};

Logo.defaultProps = {
  iconProps: undefined,
  text: undefined,
  textProps: undefined,
  href: undefined,
  containerProps: undefined,
};
