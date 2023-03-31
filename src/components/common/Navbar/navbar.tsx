import cn from "classnames";
import {
  FC,
  ForwardedRef,
  forwardRef,
  MutableRefObject,
  ReactElement,
  ReactNode,
  RefObject,
  SVGProps,
} from "react";
import { adjustedTextColors } from "../../../styles";
import { useThemeState } from "../../../theme";

import { ExtendedColors, Sizes } from "../../../types";
import type { TagProps } from "../../ui/Tag";
import { NavbarContainer, NavbarSideContainer } from "./container";

export type NavItemProps = {
  label: string;
  tag?: TagProps;
  subLabel?: NavSubLabelProps;
  children?: NavItemProps[];
  href?: string;
  disabled?: boolean;
  icon?: FC<SVGProps<SVGSVGElement>>;
  hideChevron?: boolean;
  color?: keyof ExtendedColors;
  textColor?: string;
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
  color?: keyof ExtendedColors;
  footer?: ReactNode;
  footerClassName?: string;
};

export type LogoProps = {
  href?: string;
  containerClassName?: string;
};

export type SubNavProps = Pick<
  NavbarProps,
  "navItems" | "size" | "pagePaddingSize"
> & {
  textColor?: string;
  navbarRef?: MutableRefObject<HTMLElement | null>;
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
      color = "white",
      pagePaddingSize = "md",
      footer,
      footerClassName,
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { colorState } = useThemeState();

    const textColor = adjustedTextColors(colorState)[color];

    return (
      <NavbarContainer
        ref={ref}
        navbarClassName={navbarClassName}
        color={color}
        textColor={textColor}
        size={size}
        gapSize={gapSize}
        pagePaddingSize={pagePaddingSize}
        startItems={startItems}
        allowDarkMode={allowDarkMode}
        endItems={endItems}
        logo={logo}
        logoProps={logoProps}
        navItems={navItems}
        footer={footer}
        footerClassName={footerClassName}
        justifyDesktopNav={justifyDesktopNav}
      />
    );
  }
);

Navbar.displayName = "Navbar";

export const SideNavbar = forwardRef<
  HTMLDivElement,
  Omit<NavbarProps, "justifyDesktopNav" | "startItems" | "endItems"> & {
    sidenavRef?: RefObject<HTMLDivElement>;
  }
>(
  (
    {
      navItems = [],
      logo,
      logoProps,
      allowDarkMode = true,
      navbarClassName,
      gapSize = "md",
      size = "md",
      color = "white",
      pagePaddingSize = "md",
      footer,
      footerClassName,
      sidenavRef,
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { colorState } = useThemeState();

    const textColor = adjustedTextColors(colorState)[color];

    return (
      <>
        <NavbarSideContainer
          ref={sidenavRef}
          color={color}
          textColor={textColor}
          logo={logo}
          logoProps={logoProps}
          navItems={navItems}
          navbarClassName={cn("hidden lg:flex", navbarClassName)}
          gapSize={gapSize}
          size={size}
          footer={footer}
          footerClassName={footerClassName}
        />
        <NavbarContainer
          ref={ref}
          navbarClassName={cn("lg:hidden", navbarClassName)}
          color={color}
          textColor={textColor}
          size={size}
          gapSize={gapSize}
          pagePaddingSize={pagePaddingSize}
          allowDarkMode={allowDarkMode}
          logo={logo}
          logoProps={logoProps}
          navItems={navItems}
          footer={footer}
          footerClassName={footerClassName}
        />
      </>
    );
  }
);

SideNavbar.displayName = "SideNavbar";
