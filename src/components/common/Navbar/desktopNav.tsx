import cn from "classnames";

import {
  bgColorsInteractive,
  gaps,
  paddingsEvenly,
  roundings,
  transition,
  transitionFast,
} from "../../../styles";
import { ChevronRightIcon } from "../../../theme/icons";
import { minSize, smallerSize } from "../../../utils";
import { Button } from "../../ui/Button";
import { Icon } from "../../ui/Icon";
import { Link } from "../../ui/Link";
import { Popover, PopoverGroup } from "../../ui/Popover";
import { Tag } from "../../ui/Tag";
import { Text, Heading } from "../../ui/Typography";
import type { NavItemProps, SubNavProps } from "./navbar";

export const DesktopNav = ({ navItems, size = "md" }: SubNavProps) => (
  <div className={cn("flex flex-row items-center", gaps.sm)}>
    {navItems.map(
      ({ label, children, href, tag, disabled, icon }: NavItemProps) => (
        <PopoverGroup key={label}>
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
                      <DesktopSubNav key={child.label} {...child} />
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
        </PopoverGroup>
      )
    )}
  </div>
);

export const DesktopSubNav = ({
  label,
  href,
  subLabel,
  tag,
  disabled,
  icon,
}: NavItemProps) => {
  const baseClass = cn(
    "flex flex-row items-center justify-between group",
    gaps.md,
    paddingsEvenly.md,
    roundings.md,
    transition
  );

  if (!disabled)
    return (
      <Link href={href || "#"}>
        <div
          className={cn(baseClass, bgColorsInteractive.white, "cursor-pointer")}
        >
          <div className={cn("flex flex-row", gaps.md)}>
            {icon && (
              <div className="flex">
                <Icon color="accent" icon={icon} />
              </div>
            )}
            <div>
              <Heading
                as="h4"
                className={cn("flex flex-row items-center", gaps.sm)}
              >
                {label}
                {tag && <Tag variant="solid" size="sm" {...tag} />}
              </Heading>
              <Text size="sm">{subLabel}</Text>
            </div>
          </div>
          <Icon
            color="accent"
            icon={ChevronRightIcon}
            className={cn("group-hover:translate-x-1", transitionFast)}
          />
        </div>
      </Link>
    );

  return (
    <div className={cn(baseClass, "cursor-not-allowed opacity-75")}>
      <div className={cn("flex flex-row", gaps.md)}>
        {icon && (
          <div className="flex">
            <Icon color="accent" icon={icon} />
          </div>
        )}
        <div>
          <Text className={cn("flex flex-row items-center", gaps.sm)}>
            {label}
            {tag && <Tag variant="solid" size="sm" {...tag} />}
          </Text>
          <Text size="sm">{subLabel}</Text>
        </div>
      </div>
      <Icon color="accent" icon={ChevronRightIcon} />
    </div>
  );
};
