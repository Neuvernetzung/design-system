import cn from "classnames";
import Link from "next/link";

import { gaps } from "../../../../styles";
import { Button } from "../../../ui/Button";
import { DisclosureGroup } from "../../../ui/Disclosure";
import { Tag } from "../../../ui/Tag";
import { Text } from "../../../ui/Typography/Text";
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
  external,
}: NavItemProps) => (
  <li>
    {!children && !child ? (
      <Button
        disabled={disabled}
        size="md"
        as={Link}
        href={href || "#"}
        {...(external ? { target: "_blank" } : {})}
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
      <DisclosureGroup
        size="md"
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
