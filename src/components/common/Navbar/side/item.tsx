import cn from "classnames";
import Link from "next/link";

import { gaps } from "../../../../styles";
import { Button, Disclosure, Tag, Text } from "../../../ui";
import { NavbarMobileSubItem } from "../mobile/sub";
import type { NavItemProps } from "../navbar";

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
}: NavItemProps) => (
  <div>
    {!children && !child ? (
      <Button
        disabled={disabled}
        size="sm"
        as={Link}
        href={href || "#"}
        variant="ghost"
        fullWidth
        className={cn(textColor)}
        leftIcon={icon}
      >
        <div className={cn("w-full flex items-center justify-start", gaps.sm)}>
          <Text color="inherit">{label}</Text>
          {tag && <Tag variant="solid" size="xs" {...tag} />}
        </div>
      </Button>
    ) : (
      <Disclosure
        size="sm"
        className={cn("border-none", textColor)}
        icon="chevron"
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
            content: fullWidthPopover
              ? child
              : children?.map((child, i) => (
                  <NavbarMobileSubItem
                    key={`navbar_subitem_${i}`}
                    textColor={textColor}
                    {...child}
                  />
                )),
          },
        ]}
      />
    )}
  </div>
);
