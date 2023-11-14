import { cn } from "@/utils";
import { gaps } from "../../../../styles";
import { NavbarSubItemProps, NavLinkWrap } from "../desktop/sub";
import { Text } from "../../../ui/Typography/Text";
import { Tag } from "../../../ui/Tag";
import { Button } from "../../../ui/Button";
import isString from "lodash/isString";

export const NavbarMobileSubItem = ({
  disabled,
  href,
  icon,
  label,
  tag,
  subLabel,
  textColor,
  external,
}: NavbarSubItemProps) => (
  <NavLinkWrap href={href} disabled={disabled} external={external}>
    <Button
      variant="ghost"
      fullWidth
      leftIcon={icon}
      disabled={disabled}
      className={cn(textColor, "!justify-start")}
      asChild={disabled}
    >
      <div>
        <div className={cn("flex flex-row items-center", gaps.sm)}>
          <Text color="inherit" size="md">
            {label}
          </Text>
          {tag && <Tag variant="solid" size="sm" {...tag} />}
        </div>

        {subLabel && (
          <div
            className={cn(subLabel.hideOnMobile ? "hidden md:flex" : "flex")}
          >
            {isString(subLabel.children) ? (
              <Text color="inherit" size="xs">
                {subLabel.children}
              </Text>
            ) : (
              subLabel.children
            )}
          </div>
        )}
      </div>
    </Button>
  </NavLinkWrap>
);
