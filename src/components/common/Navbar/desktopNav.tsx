import cn from "classnames";

import { gaps } from "../../../styles";
import { minSize, smallerSize } from "../../../utils";
import { Button } from "../../ui/Button";
import { Link } from "../../ui/Link";
import { Popover, PopoverGroup } from "../../ui/Popover";
import { Tag } from "../../ui/Tag";
import type { NavItemProps, SubNavProps } from "./navbar";
import { NavbarSubItem } from "./subItem";

export const DesktopNav = ({ navItems, size = "md" }: SubNavProps) => (
  <PopoverGroup className={cn("flex flex-row items-center", gaps.sm)}>
    {navItems.map(
      ({ label, children, href, tag, disabled, icon }: NavItemProps) => (
        <div key={label}>
          {!disabled ? (
            !children ? (
              <Link href={href || "#"} passHref legacyBehavior>
                <Button
                  leftIcon={icon}
                  as="a"
                  size={minSize(size, "sm")}
                  variant="ghost"
                  disabled={disabled}
                >
                  {label}
                  {tag && (
                    <Tag variant="solid" size={smallerSize(size)} {...tag} />
                  )}
                </Button>
              </Link>
            ) : (
              <Popover
                buttonProps={{
                  leftIcon: icon,
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
                    {children?.map((child) => (
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
