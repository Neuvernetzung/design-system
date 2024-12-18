import { cn } from "@/utils";
import Link from "next/link";

import { gaps, gapsSmall, paddingsEvenly } from "../../../../styles";
import { Button } from "../../../ui/Button";
import { DisclosureGroup } from "../../../ui/Disclosure";
import { Tag } from "../../../ui/Tag";
import { Text } from "../../../ui/Typography/Text";
import { NavbarMobileSubItem } from "../mobile/sub";
import type { NavItemProps } from "../navbar";
import type { SidenavProps } from "../container";

export const SideNavItems = ({
  gapSize = "md",
  size = "md",
  navItems,
  textColor,
}: Pick<SidenavProps, "gapSize" | "size" | "navItems" | "textColor">) => (
  <ul
    className={cn(
      "h-full flex flex-col",
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
);

export const SideNavItem = ({
  label,
  children,
  href,
  tag,
  disabled,
  icon,
  fullWidthPopover,
  defaultOpen,
  child,
  textColor = "black",
  external,
}: NavItemProps) => (
  <li>
    {!children && !child ? (
      <Button
        disabled={disabled}
        size="md"
        variant="ghost"
        className={cn("w-full", textColor)}
        leftIcon={icon}
        asChild
      >
        <Link href={href || "#"} {...(external ? { target: "_blank" } : {})}>
          <div
            className={cn("w-full flex items-center justify-start", gaps.sm)}
          >
            <Text color="inherit">{label}</Text>
            {tag && <Tag variant="solid" size="xs" {...tag} />}
          </div>
        </Link>
      </Button>
    ) : (
      <DisclosureGroup
        size="md"
        className={cn(textColor)}
        icon="chevron"
        variant="button"
        buttonProps={{ leftIcon: icon, className: cn(textColor) }}
        items={[
          {
            title: (
              <div className={cn("flex flex-row items-center", gaps.xs)}>
                <Text color="inherit">{label}</Text>
                {tag && <Tag variant="solid" size="xs" {...tag} />}
              </div>
            ),
            defaultOpen,
            content: fullWidthPopover ? (
              child
            ) : (
              <ul>
                {children?.map((child, i) => (
                  <NavbarMobileSubItem
                    key={`navbar_subitem_${i}`}
                    textColor={textColor}
                    {...child}
                  />
                ))}
              </ul>
            ),
          },
        ]}
      />
    )}
  </li>
);
