import cn from "classnames";
import {
  FC,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  ReactElement,
  ReactNode,
  SVGProps,
  useRef,
  useState,
} from "react";

import {
  bgColors,
  gaps,
  paddingsY,
  pagePaddings,
  zIndexes,
} from "../../../styles";
import { CrossIcon, MenuIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { mergeRefs } from "../../../utils/internal";
import { IconButton } from "../../ui/Button";
import { Link } from "../../ui/Link";
import type { TagProps } from "../../ui/Tag";
import { ThemeSwitch } from "../ThemeSwitch";
import { DesktopNav } from "./desktopNav";
import { MobileNav } from "./mobileNav";

export type NavItemProps = {
  label: string;
  tag?: TagProps;
  subLabel?: NavSubLabelProps;
  children?: NavItemProps[];
  href?: string;
  disabled?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
  hideChevron?: boolean;
} & NavFullPopoverProps;

type NavFullPopoverProps =
  | {
      fullWidthPopover?: true;
      child: ReactNode;
    }
  | { fullWidthPopover?: false; child?: never };

export type NavSubLabelProps = {
  children: string | ReactElement;
  hideOnMobile?: boolean;
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
  navbarRef?: MutableRefObject<HTMLElement | null>;
  pagePaddingSize?: keyof Sizes;
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

    const navBarInternalRef = useRef<HTMLElement>(null);

    return (
      <div
        ref={mergeRefs([ref, navBarInternalRef])}
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
            <DesktopNav
              navbarRef={navBarInternalRef}
              size={size}
              navItems={navItems}
              pagePaddingSize={pagePaddingSize}
            />
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
        {mobileNavOpen && (
          <div className={cn(bgColors.white)}>
            <MobileNav navItems={navItems} />
          </div>
        )}
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
