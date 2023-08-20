import cn from "classnames";

import { gaps, pagePaddings } from "../../../../styles";
import { ChevronDownIcon } from "../../../../theme/icons";
import { minSize, smallerSize } from "../../../../utils";
import { Button } from "../../../ui/Button";
import { Link } from "../../../ui/Link";
import { Popover, PopoverGroup } from "../../../ui/Popover";
import { Tag } from "../../../ui/Tag";
import { Text } from "../../../ui";
import type { NavbarProps, NavItemProps, SubNavProps } from "../navbar";
import { NavbarDesktopSubItem } from "./sub";

export const DesktopItems = ({
  navItems,
  size = "md",
  navbarRef,
  pagePaddingSize = "md",
  justifyDesktopNav,
  textColor,
}: SubNavProps & Pick<NavbarProps, "justifyDesktopNav">) => (
  <div
    className={cn("hidden lg:flex w-full flex-1", {
      "justify-start": justifyDesktopNav === "start",
      "justify-center": justifyDesktopNav === "center",
      "justify-end": justifyDesktopNav === "end",
    })}
  >
    <PopoverGroup className={cn("flex flex-row items-center", gaps.sm)}>
      {navItems.map(
        ({
          label,
          children,
          child,
          href,
          tag,
          disabled,
          icon,
          hideChevron,
          fullWidthPopover,
        }: NavItemProps) => (
          <div key={label}>
            {!disabled ? (
              !child && !children ? (
                <Button
                  as={Link}
                  href={href || "#"}
                  leftIcon={icon}
                  size={minSize(size, "sm")}
                  variant="ghost"
                  disabled={disabled}
                >
                  <Text className={cn(textColor)}>{label}</Text>
                  {tag && (
                    <Tag variant="solid" size={smallerSize(size)} {...tag} />
                  )}
                </Button>
              ) : (
                <Popover
                  panelClassName={cn(
                    fullWidthPopover &&
                      "rounded-none w-screen !max-w-none !border-t-0 !border-x-0",
                    fullWidthPopover && pagePaddings[pagePaddingSize]
                  )}
                  disabledOffset={fullWidthPopover}
                  referenceElement={fullWidthPopover ? navbarRef : undefined}
                  buttonProps={{
                    leftIcon: icon,
                    ...(!hideChevron ? { rightIcon: ChevronDownIcon } : {}),
                    variant: "ghost",
                    disabled,
                    size: minSize(size, "sm"),
                    className: textColor,
                    children: (
                      <>
                        {label}
                        {tag && (
                          <Tag
                            variant="solid"
                            size={smallerSize(size)}
                            {...tag}
                          />
                        )}
                      </>
                    ),
                  }}
                  trigger="hover"
                  content={
                    <div className={cn("flex flex-col", gaps.md)}>
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
                              textColor={textColor}
                              key={child.label}
                              {...child}
                            />
                          ))}
                        </div>
                      )}
                      {child}
                    </div>
                  }
                />
              )
            ) : (
              <Button
                size={minSize(size, "sm")}
                leftIcon={icon}
                variant="ghost"
                disabled={disabled}
                className={cn(textColor)}
              >
                {label}
                {tag && (
                  <Tag variant="solid" size={smallerSize(size)} {...tag} />
                )}
              </Button>
            )}
          </div>
        )
      )}
    </PopoverGroup>
  </div>
);
