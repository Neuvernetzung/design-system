import { ForwardedRef, forwardRef, ReactNode } from "react";

import { ScrollArea } from "@/components/ui";
import { cn } from "@/utils";

import {
  extendedBgColors,
  extendedBorders,
  gaps,
  paddingsEvenly,
  zIndexes,
} from "../../../../styles";
import { NavLogo } from "../logo";
import type { NavbarProps } from "../navbar";
import { SideNavItems } from "../side/items";
import type { NavbarContainerProps } from "./default";

export type SidenavProps = Omit<NavbarProps, "justify" | "justifyDesktopNav"> &
  NavbarContainerProps;

export const NavbarSideContainer = forwardRef(
  (
    {
      logo,
      logoProps,
      navItems = [],
      navbarClassName,
      gapSize = "md",
      size = "md",
      footer,
      footerClassName,
      color = "white",
      textColor,
      startItems,
      endItems,
    }: SidenavProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <NavbarSideWrapper
      ref={ref}
      className={navbarClassName}
      color={color}
      gapSize={gapSize}
    >
      {logo && (
        <div className={cn(paddingsEvenly[size])}>
          <NavLogo logo={logo} logoProps={logoProps} textColor={textColor} />
        </div>
      )}
      <ScrollArea className="h-full">
        {startItems}
        <SideNavItems
          navItems={navItems}
          gapSize={gapSize}
          size={size}
          textColor={textColor}
        />
        {endItems}
      </ScrollArea>
      {footer && (
        <div
          className={cn("flex w-full", paddingsEvenly[size], footerClassName)}
        >
          {footer}
        </div>
      )}
    </NavbarSideWrapper>
  )
);

NavbarSideContainer.displayName = "navbarSideContainer";

export type NavbarSideWrapperProps = {
  className?: string;
  children: ReactNode;
} & Pick<SidenavProps, "gapSize" | "color">;

export const NavbarSideWrapper = forwardRef(
  (
    {
      className,
      gapSize = "md",
      color = "white",
      children,
    }: NavbarSideWrapperProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <nav
      aria-label="Main Navigation"
      ref={ref}
      className={cn(
        "group left-0 inset-y-0 fixed h-full w-64 flex-col overflow-hidden border-r",
        gaps[gapSize],
        zIndexes.nav,
        extendedBorders[color],
        extendedBgColors[color],
        className
      )}
    >
      {children}
    </nav>
  )
);

NavbarSideWrapper.displayName = "NavbarSideWrapper";
