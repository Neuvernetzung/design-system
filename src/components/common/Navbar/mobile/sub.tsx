import cn from "classnames";
import { gaps } from "../../../../styles";
import { NavbarSubItemProps, NavLinkWrap } from "../desktop/sub";
import { Text, Tag, Button } from "../../../ui";
import { isString } from "lodash";

export const NavbarMobileSubItem = ({
  disabled,
  href,
  icon,
  label,
  tag,
  subLabel,
  textColor,
}: NavbarSubItemProps) => (
  <NavLinkWrap href={href} disabled={disabled}>
    <Button
      as={!disabled ? "span" : "button"}
      variant="ghost"
      fullWidth
      leftIcon={icon}
      disabled={disabled}
      className={cn(textColor, "!justify-start")}
    >
      <div>
        <div className={cn("flex flex-row items-center", gaps.sm)}>
          <Text color="inherit" size="sm">
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
