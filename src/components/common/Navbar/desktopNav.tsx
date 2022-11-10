import { ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  bgColorsInteractive,
  gaps,
  paddingsEvenly,
  roundings,
  transition,
  transitionFast,
} from "../../../styles";
import { Button } from "../../ui/Button";
import { Icon } from "../../ui/Icon";
import { Link } from "../../ui/Link";
import { Popover } from "../../ui/Popover";
import { Tag } from "../../ui/Tag";
import { Text } from "../../ui/Typography/Text";
import type { NavItemProps, SubNavProps } from "./navbar";
import cn from "classnames";

export const DesktopNav = ({ navItems }: SubNavProps) => (
  <div className={cn("flex flex-row items-center", gaps.sm)}>
    {navItems.map(
      ({ label, children, href, tag, disabled, icon }: NavItemProps) => (
        <div key={label}>
          {!disabled ? (
            !children ? (
              <Link href={href || "#"} passHref legacyBehavior>
                <Button
                  leftIcon={icon}
                  as="a"
                  variant="ghost"
                  disabled={disabled}
                >
                  {label}
                  {tag && <Tag variant="solid" size="sm" {...tag} />}
                </Button>
              </Link>
            ) : (
              <Popover
                buttonProps={{
                  leftIcon: icon,
                  variant: "ghost",
                  disabled: disabled,
                  children: (
                    <>
                      {label}
                      {tag && <Tag variant="solid" size="sm" {...tag} />}
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
            <Button leftIcon={icon} variant="ghost" disabled={disabled}>
              {label}
              {tag && <Tag variant="solid" size="sm" {...tag} />}
            </Button>
          )}
        </div>
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
              <Text className={cn("flex flex-row items-center", gaps.sm)}>
                {label}
                {tag && <Tag variant="solid" size="sm" {...tag} />}
              </Text>
              <Text fontSize="sm">{subLabel}</Text>
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
          <Text fontSize="sm">{subLabel}</Text>
        </div>
      </div>
      <Icon color="accent" icon={ChevronRightIcon} />
    </div>
  );
};
