import cn from "classnames";

import { gaps, pagePaddings } from "../../../styles";
import { ChevronDownIcon } from "../../../theme/icons";
import { minSize, smallerSize } from "../../../utils";
import { Button } from "../../ui/Button";
import { Link } from "../../ui/Link";
import { Popover, PopoverGroup } from "../../ui/Popover";
import { Tag } from "../../ui/Tag";
import type { NavItemProps, SubNavProps } from "./navbar";
import { NavbarSubItem } from "./subItem";

export const DesktopNav = ({
  navItems,
  size = "md",
  navbarRef,
  pagePaddingSize = "md",
}: SubNavProps) => (
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
                {label}
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
                  <div className={cn("flex flex-col", gaps.sm)}>
                    {fullWidthPopover
                      ? child
                      : children?.map((child) => (
                          <NavbarSubItem key={child.label} {...child} />
                        ))}
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
            >
              {label}
              {tag && <Tag variant="solid" size={smallerSize(size)} {...tag} />}
            </Button>
          )}
        </div>
      )
    )}
  </PopoverGroup>
);
