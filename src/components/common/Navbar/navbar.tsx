import cn from "classnames";
import {
  FC,
  ForwardedRef,
  forwardRef,
  ReactNode,
  SVGProps,
  useState,
} from "react";

import { gaps, paddingsY, pagePaddings, zIndexes } from "../../../styles";
import { CrossIcon, MenuIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { IconButton } from "../../ui/Button";
import { Link } from "../../ui/Link";
import type { TagProps } from "../../ui/Tag";
import { ThemeSwitch } from "../ThemeSwitch";
import { DesktopNav } from "./desktopNav";
import { MobileNav } from "./mobileNav";

export type NavItemProps = {
  label: string;
  tag?: TagProps;
  subLabel?: string;
  children?: NavItemProps[];
  href?: string;
  disabled?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
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
  size?: keyof Sizes;
  pagePaddingSize?: keyof Sizes;
};

type LogoProps = {
  href?: string;
  containerClassName?: string;
};

export type SubNavProps = {
  navItems: NavItemProps[];
  size?: keyof Sizes;
};

export const Navbar = forwardRef<HTMLDivElement, NavbarProps>(
  (
    {
      navItems = [],
      logo,
      logoProps,
      allowDarkMode = true,
      navbarClassName,
      justifyDesktopNav = "start",
      startItems,
      endItems,
      gapSize = "md",
      size = "md",
      pagePaddingSize = "md",
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    return (
      <div
        ref={ref}
        className={cn(
          "fixed top-0 inset-x-0 bg-accent-100 dark:bg-accent-800 w-full",
          zIndexes.nav,
          navbarClassName
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between border-b border-accent-200 dark:border-accent-700",
            paddingsY[size],
            pagePaddings[pagePaddingSize],
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
            <DesktopNav size={size} navItems={navItems} />
          </div>
          <div
            className={cn(
              "flex flex-row items-center justify-end",
              gaps[gapSize]
            )}
          >
            {endItems && endItems}
            {allowDarkMode && <ThemeSwitch />}
            <div className={cn("flex lg:hidden")}>
              <IconButton
                icon={mobileNavOpen ? CrossIcon : MenuIcon}
                variant="ghost"
                ariaLabel="Toggle Navigation"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
              />
            </div>
          </div>
        </div>
        {mobileNavOpen && <MobileNav navItems={navItems} />}
      </div>
    );
  }
);

Navbar.displayName = "Navbar";

const Logo = ({
  href,
  containerClassName,
  logo,
}: LogoProps & Pick<NavbarProps, "logo">) => (
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

Logo.defaultProps = {
  href: undefined,
  containerClassName: undefined,
};
