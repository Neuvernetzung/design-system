import { cn } from "@/utils";
import {
  type ForwardedRef,
  forwardRef,
  type ReactElement,
  type ReactNode,
  type RefObject,
} from "react";

import { useThemeState } from "../../../theme";
import type { ExtendedColor, Size, SvgType } from "../../../types";
import type { TagProps } from "../../ui/Tag";
import { NavbarContainer, NavbarSideContainer } from "./container";

export type NavItemProps = {
  label: string;
  tag?: TagProps;
  subLabel?: NavSubLabelProps;
  children?: NavItemProps[];
  child?: ReactNode;
  fullWidthPopover?: boolean;
  href?: string;
  external?: boolean;
  disabled?: boolean;
  icon?: SvgType;
  hideChevron?: boolean;
  color?: ExtendedColor;
  textColor?: string;
  defaultOpen?: boolean;
};

export type NavSubLabelProps = {
  children: string | ReactElement;
  hideOnMobile?: boolean;
};

export type NavbarProps = {
  navItems: NavItemProps[];
  logo?: ReactNode;
  logoProps?: LogoProps;
  allowDarkMode?: boolean | "desktop" | "mobile";
  navbarClassName?: string;
  justifyDesktopNav?: "start" | "center" | "end";
  startItems?: ReactNode;
  endItems?: ReactNode;
  gapSize?: Size;
  size?: Size;
  color?: ExtendedColor;
  footer?: ReactNode;
  footerClassName?: string;
  mobileNavClassName?: string;
};

export type LogoProps = {
  href?: string;
  containerClassName?: string;
};

export type SubNavProps = Pick<NavbarProps, "navItems" | "size"> & {
  textColor?: string;
  navbarRef?: RefObject<HTMLElement>;
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
      footer,
      footerClassName,
      mobileNavClassName,
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { adjustedTextColorState } = useThemeState();

    const textColor = adjustedTextColorState[color];

    return (
      <NavbarContainer
        ref={ref}
        navbarClassName={navbarClassName}
        color={color}
        textColor={textColor}
        size={size}
        gapSize={gapSize}
        startItems={startItems}
        allowDarkMode={allowDarkMode}
        endItems={endItems}
        logo={logo}
        logoProps={logoProps}
        navItems={navItems}
        footer={footer}
        footerClassName={footerClassName}
        justifyDesktopNav={justifyDesktopNav}
        mobileNavClassName={mobileNavClassName}
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
      footer,
      footerClassName,
      sidenavRef,
      mobileNavClassName,
    },
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { adjustedTextColorState } = useThemeState();

    const textColor = adjustedTextColorState[color];

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
          allowDarkMode={allowDarkMode}
          logo={logo}
          logoProps={logoProps}
          navItems={navItems}
          footer={footer}
          footerClassName={footerClassName}
          mobileNavClassName={mobileNavClassName}
        />
      </>
    );
  }
);

SideNavbar.displayName = "SideNavbar";
