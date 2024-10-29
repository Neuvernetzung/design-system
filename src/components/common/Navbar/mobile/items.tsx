import Link from "next/link";

import { Button, DisclosureGroup, Icon, Tag } from "@/components/ui";
import { gaps, paddingsEvenly, scrollbar } from "@/styles";
import { cn } from "@/utils";

import type { NavbarProps, NavItemProps } from "../navbar";
import { NavbarMobileSubItem } from "./sub";

export const MobileNavItems = ({ navItems }: Pick<NavbarProps, "navItems">) => (
  <ul className={cn("h-full overflow-y-auto", scrollbar, paddingsEvenly.md)}>
    {navItems.map((navItem) => (
      <MobileNavItem key={navItem.label} {...navItem} />
    ))}
  </ul>
);

export const MobileNavItem = ({
  label,
  children,
  href,
  tag,
  disabled,
  icon,
  defaultOpen,
  child,
  external,
}: NavItemProps) => {
  if (!disabled)
    return (
      <li>
        {!children && !child ? (
          <Button variant="ghost" className="w-full" asChild>
            <Link
              href={href || "#"}
              {...(external ? { target: "_blank" } : {})}
            >
              {icon && (
                <div className="flex">
                  <Icon color="accent" icon={icon} />
                </div>
              )}
              <div
                className={cn(
                  "w-full flex items-center justify-start",
                  gaps.sm
                )}
              >
                {label}
                {tag && <Tag variant="solid" size="sm" {...tag} />}
              </div>
            </Link>
          </Button>
        ) : (
          <DisclosureGroup
            className="border-none"
            items={[
              {
                title: (
                  <div className={cn("flex flex-row", gaps.xs)}>
                    {icon && (
                      <div className="flex">
                        <Icon color="accent" icon={icon} />
                      </div>
                    )}
                    {label}
                    {tag && <Tag variant="solid" size="sm" {...tag} />}
                  </div>
                ),
                defaultOpen,
                content: (
                  <>
                    {children?.map((child, i) => (
                      <NavbarMobileSubItem
                        key={`navbar_subitem_${i}`}
                        {...child}
                      />
                    ))}
                    {child}
                  </>
                ),
              },
            ]}
          />
        )}
      </li>
    );

  return (
    <Button disabled={disabled} variant="ghost" className="w-full">
      {icon && (
        <div className="flex">
          <Icon color="accent" icon={icon} />
        </div>
      )}
      <div className={cn("w-full flex items-center justify-start", gaps.sm)}>
        {label}
        {tag && <Tag variant="solid" size="sm" {...tag} />}
      </div>
    </Button>
  );
};
