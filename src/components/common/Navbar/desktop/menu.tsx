import {
  Content as NavigationMenuContent,
  Item as NavigationMenuItem,
  Link as NavigationMenuLink,
  List as NavigationMenuList,
  Root as NavigationMenuRoot,
  Trigger as NavigationMenuTrigger,
  Viewport as NavigationMenuViewport,
} from "@radix-ui/react-navigation-menu";
import { IconChevronDown } from "@tabler/icons-react";
import cn from "classnames";
import Link from "next/link";
import type { RefObject } from "react";

import { gaps, pagePaddings } from "../../../../styles";
import { popoverAnimation } from "../../../../styles/animation";
import { getPopoverContainerStyles } from "../../../../styles/groups";
import { offsetSizes } from "../../../../styles/popper/offset";
import { useThemeStateValue } from "../../../../theme";
import type { Size } from "../../../../types";
import { minSize, smallerSize } from "../../../../utils";
import { Button } from "../../../ui/Button";
import { Tag } from "../../../ui/Tag";
import { Text } from "../../../ui/Typography/Text";
import type { NavItemProps } from "../navbar";
import { NavbarDesktopSubItem } from "./sub";

export type NavigationMenuProps = {
  items: NavItemProps[];
  className?: string;
  listClassName?: string;
  size?: Size;
  textColor?: string;
  navbarRef?: RefObject<HTMLElement>;
};

export const NavigationMenu = ({
  items,
  className,
  listClassName,
  size = "md",
  textColor,
}: NavigationMenuProps) => {
  const pagePadding = useThemeStateValue((v) => v.pagePadding);

  return (
    <NavigationMenuRoot className={className}>
      <NavigationMenuList
        className={cn(
          "flex flex-row items-center justify-start",
          gaps.sm,
          listClassName
        )}
      >
        {items.map(
          (
            {
              disabled,
              child,
              children,
              href,
              external,
              icon,
              tag,
              textColor: _textColor,
              label,
              hideChevron,
              fullWidthPopover,
            },
            i
          ) => (
            <NavigationMenuItem key={`navigation_link_${i}`}>
              {!disabled ? (
                !child && !children ? (
                  <NavigationMenuLink
                    asChild
                    {...(external ? { target: "_blank" } : {})}
                  >
                    <Button
                      as={Link}
                      href={href || "#"}
                      leftIcon={icon}
                      size={minSize(size, "sm")}
                      variant="ghost"
                      disabled={disabled}
                    >
                      <Text className={cn(_textColor || textColor)}>
                        {label}
                      </Text>
                      {tag && (
                        <Tag
                          variant="solid"
                          size={smallerSize(size)}
                          {...tag}
                        />
                      )}
                    </Button>
                  </NavigationMenuLink>
                ) : (
                  <>
                    <NavigationMenuTrigger asChild>
                      <Button
                        leftIcon={icon}
                        {...(!hideChevron
                          ? { rightIcon: IconChevronDown }
                          : {})}
                        variant="ghost"
                        disabled={disabled}
                        size={minSize(size, "sm")}
                        className={cn(_textColor || textColor)}
                      >
                        {label}
                        {tag && (
                          <Tag
                            variant="solid"
                            size={smallerSize(size)}
                            {...tag}
                          />
                        )}
                      </Button>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                      style={{
                        marginTop: !fullWidthPopover
                          ? offsetSizes[size]
                          : undefined,
                      }}
                      className={cn(
                        getPopoverContainerStyles({ size }),
                        fullWidthPopover &&
                          "rounded-none w-screen !max-w-none !border-t-0 !border-x-0",
                        fullWidthPopover && pagePaddings[pagePadding]
                      )}
                    >
                      <ul className={cn("flex flex-col", gaps.md)}>
                        {children && children.length > 0 && (
                          <div
                            className={cn(
                              fullWidthPopover
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
                                : "flex flex-col",
                              gaps.sm
                            )}
                          >
                            {children?.map((child) => (
                              <NavbarDesktopSubItem
                                textColor={_textColor || textColor}
                                key={child.label}
                                {...child}
                              />
                            ))}
                          </div>
                        )}
                        {child}
                      </ul>
                    </NavigationMenuContent>
                  </>
                )
              ) : (
                <Button
                  size={minSize(size, "sm")}
                  leftIcon={icon}
                  variant="ghost"
                  disabled={disabled}
                  className={cn(_textColor || textColor)}
                >
                  {label}
                  {tag && (
                    <Tag variant="solid" size={smallerSize(size)} {...tag} />
                  )}
                </Button>
              )}
            </NavigationMenuItem>
          )
        )}
      </NavigationMenuList>
      <div
        className={cn("absolute top-full left-0 flex w-full justify-center")}
      >
        <NavigationMenuViewport
          className={cn(
            popoverAnimation,
            "relative origin-[top_center]",
            "h-[var(--radix-navigation-menu-viewport-height)]  transition-[width,_height] duration-300"
          )}
        />
      </div>
    </NavigationMenuRoot>
  );
};
