import cn from "classnames";

import { gaps, paddingsEvenly } from "../../../styles";
import { Button } from "../../ui/Button";
import { Disclosure } from "../../ui/Disclosure";
import { Icon } from "../../ui/Icon";
import { Link } from "../../ui/Link";
import { Tag } from "../../ui/Tag";
import type { NavItemProps, SubNavProps } from "./navbar";
import { NavbarSubItem } from "./subItem";

export const MobileNav = ({ navItems }: SubNavProps) => (
  <div className={cn(paddingsEvenly.md, "min-h-[80vh]")}>
    {navItems.map((navItem) => (
      <MobileNavItem key={navItem.label} {...navItem} />
    ))}
  </div>
);

export const MobileNavItem = ({
  label,
  children,
  href,
  tag,
  disabled,
  icon,
}: NavItemProps) => {
  if (!disabled)
    return (
      <div>
        {children ? (
          <Disclosure
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
                content: children.map((child, i) => (
                  <NavbarSubItem key={`navbar_subitem_${i}`} {...child} />
                )),
              },
            ]}
          />
        ) : (
          <Link href={href || "#"} passHref legacyBehavior>
            <Button as="a" variant="ghost" fullWidth>
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
            </Button>
          </Link>
        )}
      </div>
    );

  return (
    <Button disabled={disabled} variant="ghost" fullWidth>
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
