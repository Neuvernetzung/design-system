import cn from "classnames";
import { ForwardedRef, forwardRef, useRef } from "react";

import {
  extendedBgColors,
  extendedBorders,
  gaps,
  paddingsY,
  pagePaddings,
  zIndexes,
} from "../../../../styles";
import { mergeRefs, typedMemo } from "../../../../utils/internal";
import { ThemeSwitch } from "../../ThemeSwitch";
import { DesktopItems } from "../desktop/items";
import { NavLogo } from "../logo";
import { MobileNav } from "../mobile/nav";
import type { NavbarProps } from "../navbar";
import { useThemeStateValue } from "../../../../theme";

export type NavbarContainerProps = {
  textColor?: string;
};

const NavbarContainer = forwardRef(
  (
    {
      navbarClassName,
      color = "white",
      textColor = "text-black",
      size = "md",
      gapSize = "md",
      logo,
      logoProps,
      startItems,
      endItems,
      allowDarkMode = true,
      navItems,
      justifyDesktopNav,
      footer,
      footerClassName,
      mobileNavClassName,
    }: NavbarProps & NavbarContainerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const navBarInternalRef = useRef<HTMLElement>(null);

    const pagePadding = useThemeStateValue((state) => state.pagePadding);

    return (
      <nav
        aria-label="Main Navigation"
        ref={mergeRefs([ref, navBarInternalRef])}
        className={cn(
          "flex flex-row items-center justify-between fixed top-0 inset-x-0 w-full border-b",
          extendedBorders[color],
          extendedBgColors[color],
          zIndexes.nav,
          navbarClassName,
          paddingsY[size],
          pagePaddings[pagePadding],
          gaps[gapSize]
        )}
      >
        <div
          className={cn(
            "flex flex-row items-center justify-start",
            gaps[gapSize]
          )}
        >
          <NavLogo logo={logo} logoProps={logoProps} textColor={textColor} />
          {startItems && startItems}
        </div>
        <DesktopItems
          textColor={textColor}
          navbarRef={navBarInternalRef}
          size={size}
          navItems={navItems}
          justifyDesktopNav={justifyDesktopNav}
        />
        <div
          className={cn(
            "flex flex-row items-center justify-end",
            gaps[gapSize]
          )}
        >
          {endItems && endItems}
          {allowDarkMode && (
            <span
              className={cn(
                allowDarkMode === "mobile" && "block md:hidden",
                allowDarkMode === "desktop" && "hidden md:block"
              )}
            >
              <ThemeSwitch size={size} textColor={textColor} />
            </span>
          )}
          <MobileNav
            textColor={textColor}
            navbarRef={navBarInternalRef}
            navItems={navItems}
            footer={footer}
            footerClassName={footerClassName}
            mobileNavClassName={mobileNavClassName}
          />
        </div>
      </nav>
    );
  }
);

NavbarContainer.displayName = "navbarContainer";

export default typedMemo(NavbarContainer);
