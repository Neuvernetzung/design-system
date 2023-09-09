import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

import {
  extendedBgColors,
  extendedBorders,
  gaps,
  gapsSmall,
  paddingsEvenly,
  scrollbar,
  zIndexes,
} from "../../../../styles";
import { typedMemo } from "../../../../utils/internal";
import type { NavbarProps } from "..";
import { NavLogo } from "../logo";
import { SideNavItem } from "../side/item";
import type { NavbarContainerProps } from "./default";

export type SidenavProps = Omit<
  NavbarProps,
  "startItems" | "endItems" | "justify" | "justifyDesktopNav"
> &
  NavbarContainerProps;

const NavbarSideContainer = forwardRef(
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
      <ul
        className={cn(
          "h-full flex flex-col overflow-y-hidden group-hover:overflow-y-auto",
          scrollbar,
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

export default typedMemo(NavbarSideContainer);
