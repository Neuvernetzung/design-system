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
import { NavbarProps } from "../navbar";

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
      pagePaddingSize = "md",
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
    }: NavbarProps & NavbarContainerProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const navBarInternalRef = useRef<HTMLElement>(null);

    return (
      <div
        ref={mergeRefs([ref, navBarInternalRef])}
        className={cn(
          "flex flex-row items-center justify-between fixed top-0 inset-x-0 w-full border-b",
          extendedBorders[color],
          extendedBgColors[color],
          zIndexes.nav,
          navbarClassName,
          paddingsY[size],
          pagePaddings[pagePaddingSize],
          gaps[gapSize]
        )}
      >
        <NavLogo logo={logo} logoProps={logoProps} textColor={textColor} />
        {startItems && startItems}
        <DesktopItems
          textColor={textColor}
          navbarRef={navBarInternalRef}
          size={size}
          navItems={navItems}
          pagePaddingSize={pagePaddingSize}
          justifyDesktopNav={justifyDesktopNav}
        />
        <div
          className={cn(
            "flex flex-row items-center justify-end",
            gaps[gapSize]
          )}
        >
          {endItems && endItems}
          {allowDarkMode && <ThemeSwitch textColor={textColor} />}
          <MobileNav
            textColor={textColor}
            navbarRef={navBarInternalRef}
            navItems={navItems}
            footer={footer}
            footerClassName={footerClassName}
          />
        </div>
      </div>
    );
  }
);

NavbarContainer.displayName = "navbarContainer";

export default typedMemo(NavbarContainer);
