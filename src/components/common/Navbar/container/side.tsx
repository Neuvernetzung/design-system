import { ForwardedRef, forwardRef } from "react";

import { ScrollArea } from "@/components/ui";
import { cn } from "@/utils";

import {
  extendedBgColors,
  extendedBorders,
  gaps,
  gapsSmall,
  paddingsEvenly,
  zIndexes,
} from "../../../../styles";
import type { NavbarProps } from "..";
import { NavLogo } from "../logo";
import { SideNavItem } from "../side/item";
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
    <nav
      aria-label="Main Navigation"
      ref={ref}
      className={cn(
        "group left-0 inset-y-0 fixed h-full w-64 flex-col overflow-hidden border-r",
        gaps[gapSize],
        zIndexes.nav,
        extendedBorders[color],
        extendedBgColors[color],
        navbarClassName
      )}
    >
      {logo && (
        <div className={cn(paddingsEvenly[size])}>
          <NavLogo logo={logo} {...logoProps} textColor={textColor} />
        </div>
      )}
      <ScrollArea className="h-full">
        {startItems}
        <ul
          className={cn(
            "h-full flex flex-col",
            gapsSmall[gapSize],
            paddingsEvenly[size]
          )}
        >
          {navItems.map((navItem, i) => (
            <SideNavItem
              key={`sidenav_item_${i}`}
              textColor={textColor}
              {...navItem}
            />
          ))}
        </ul>
        {endItems}
      </ScrollArea>
      {footer && (
        <div
          className={cn("flex w-full", paddingsEvenly[size], footerClassName)}
        >
          {footer}
        </div>
      )}
    </nav>
  )
);

NavbarSideContainer.displayName = "navbarSideContainer";
