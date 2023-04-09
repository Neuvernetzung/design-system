import cn from "classnames";
import { useState } from "react";

import { bgColors, gaps, paddingsEvenly, scrollbar } from "../../../../styles";
import { CrossIcon, MenuIcon } from "../../../../theme/icons";
import { Button } from "../../../ui/Button";
import { Disclosure } from "../../../ui/Disclosure";
import { Icon } from "../../../ui/Icon";
import { Tag } from "../../../ui/Tag";
import { IconButton } from "../../../ui";
import type { NavbarProps, NavItemProps, SubNavProps } from "../navbar";
import { NavbarMobileSubItem } from "./sub";
import Link from "next/link";
import { useRefDimensions } from "../../../../utils/internal";

export const MobileNav = ({
  navItems,
  navbarRef,
  footer,
  footerClassName,
  textColor,
}: SubNavProps & Pick<NavbarProps, "footer" | "footerClassName">) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navbarHeight = useRefDimensions(navbarRef).height;

  const calcHeight = () => {
    if (!navbarHeight) return "100vh";

    return `calc(100vh - ${navbarHeight}px)`;
  };

  return (
    <>
      <div className={cn("flex lg:hidden")}>
        <IconButton
          className={cn(textColor)}
          icon={mobileNavOpen ? CrossIcon : MenuIcon}
          variant="ghost"
          ariaLabel="Toggle Navigation"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
        />
      </div>
      {mobileNavOpen && (
        <div
          className={cn(
            bgColors.white,
            "fixed inset-x-0 flex flex-col justify-between lg:hidden"
          )}
          style={{ top: navbarHeight, height: calcHeight() }}
        >
          <div
            className={cn(
              "h-full overflow-y-auto",
              scrollbar,
              paddingsEvenly.md
            )}
          >
            {navItems.map((navItem) => (
              <MobileNavItem key={navItem.label} {...navItem} />
            ))}
          </div>
          {footer && (
            <div
              className={cn(
                "flex w-full",
                paddingsEvenly.md,
                textColor,
                footerClassName
              )}
            >
              {footer}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export const MobileNavItem = ({
  label,
  children,
  href,
  tag,
  disabled,
  icon,
  fullWidthPopover,
  defaultOpen,
  child,
}: NavItemProps) => {
  if (!disabled)
    return (
      <div>
        {!children && !child ? (
          <Button as={Link} href={href || "#"} variant="ghost" fullWidth>
            {icon && (
              <div className="flex">
                <Icon color="accent" icon={icon} />
              </div>
            )}
            <div
              className={cn("w-full flex items-center justify-start", gaps.sm)}
            >
              {label}
              {tag && <Tag variant="solid" size="sm" {...tag} />}
            </div>
          </Button>
        ) : (
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
                defaultOpen,
                content: fullWidthPopover
                  ? child
                  : children?.map((child, i) => (
                      <NavbarMobileSubItem
                        key={`navbar_subitem_${i}`}
                        {...child}
                      />
                    )),
              },
            ]}
          />
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