import cn from "classnames";

import type { NavbarProps, SubNavProps } from "../navbar";
import { NavigationMenu } from "./menu";

export const DesktopItems = ({
  navItems,
  size = "md",
  navbarRef,
  justifyDesktopNav,
  textColor,
}: SubNavProps & Pick<NavbarProps, "justifyDesktopNav">) => (
  <NavigationMenu
    className={cn("hidden lg:flex w-full flex-1", {
      "justify-start": justifyDesktopNav === "start",
      "justify-center": justifyDesktopNav === "center",
      "justify-end": justifyDesktopNav === "end",
    })}
    items={navItems}
    size={size}
    textColor={textColor}
    navbarRef={navbarRef}
  />
);
