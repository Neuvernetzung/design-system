import {
  DropdownMenuContent,
  type DropdownMenuContentProps,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  type DropdownMenuTriggerProps,
  Root as DropdownMenuRoot,
} from "@radix-ui/react-dropdown-menu";
import cn from "classnames";
import Link from "next/link";
import { ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";

import { marginsYSmall, popoverAnimation } from "../../../styles";
import {
  getDropdownContainerStyles,
  getDropdownGroupHeaderStyles,
} from "../../../styles/groups";
import { offsetSizes } from "../../../styles/popper/offset";
import type { Color, Size, SvgType } from "../../../types";
import { capSize } from "../../../utils";
import { Button, ButtonProps } from "../Button";
import { HorizontalRule } from "../HorizontalRule";
import { Text } from "../Typography";

export type MenuProps = {
  items: MenuItemProps[];
  size?: Size;
  disabled?: boolean;
  dropdownClassName?: string;
  side?: DropdownMenuContentProps["side"];
  align?: DropdownMenuContentProps["align"];
  buttonProps?: ButtonProps;
  buttonComponent?: ReactElement;
  menuTriggerProps?: DropdownMenuTriggerProps;
};

export type MenuItemAnchorProps = {
  type: "anchor";
  href: string;
  color?: Color;
  icon?: SvgType;
};

export type MenuItemButtonProps = {
  type: "button";
  onClick: () => void;
  color?: Color;
  icon?: SvgType;
};

export type MenuItemGroupProps = {
  type: "group";
  items?: MenuItemProps[];
};

export type MenuItemSeparatorProps = {
  type: "separator";
};

export type MenuItemBaseProps = {
  children?: ReactNode;
  disabled?: boolean;
};

export type MenuItemProps = MenuItemBaseProps &
  (
    | MenuItemAnchorProps
    | MenuItemButtonProps
    | MenuItemGroupProps
    | MenuItemSeparatorProps
  );

export type MenuItemComponentProps = { size: Size };

export const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  (
    {
      items,
      disabled,
      size = "sm",
      buttonProps,
      buttonComponent,
      dropdownClassName,
      side = "bottom",
      align = "center",
      menuTriggerProps,
    }: MenuProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => (
    <DropdownMenuRoot>
      <DropdownMenuTrigger
        aria-disabled={disabled}
        disabled={disabled}
        ref={ref}
        asChild
        {...menuTriggerProps}
      >
        {buttonComponent || <Button {...buttonProps} />}
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          side={side}
          align={align}
          sideOffset={offsetSizes[size]}
          className={cn(
            "!w-64",
            getDropdownContainerStyles({ size }),
            dropdownClassName,
            popoverAnimation
          )}
        >
          {items?.map((props: MenuItemProps, i) => (
            <MenuItem key={`menu_option_${i}`} size={size} {...props} />
          ))}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  )
);

Menu.displayName = "Menu";

const MenuItem = (props: MenuItemProps & MenuItemComponentProps) => {
  const { type, size } = props;

  if (type === "button") return <MenuItemButton {...props} />;

  if (type === "anchor") return <MenuItemAnchor {...props} />;

  if (type === "separator")
    return <HorizontalRule className={cn(marginsYSmall[size])} />;

  if (type === "group") return <MenuItemGroup {...props} />;

  return null;
};

const MenuItemButton = ({
  onClick,
  children,
  color,
  disabled,
  icon,
  size,
}: MenuItemBaseProps &
  Omit<MenuItemButtonProps, "type"> &
  MenuItemComponentProps) => (
  <DropdownMenuItem asChild>
    <Button
      size={capSize(size, "md")}
      disabled={disabled}
      variant="ghost"
      color={color}
      className={cn("w-full !justify-start")}
      onClick={onClick}
      leftIcon={icon}
    >
      {children}
    </Button>
  </DropdownMenuItem>
);

const MenuItemAnchor = ({
  href,
  children,
  color,
  disabled,
  icon,
  size,
}: MenuItemBaseProps &
  Omit<MenuItemAnchorProps, "type"> &
  MenuItemComponentProps) => (
  <DropdownMenuItem asChild>
    <Button
      as={Link}
      href={href}
      size={capSize(size, "md")}
      disabled={disabled}
      variant="ghost"
      color={color}
      leftIcon={icon}
      className={cn("w-full !justify-start")}
    >
      {children}
    </Button>
  </DropdownMenuItem>
);

const MenuItemGroup = ({
  items,
  children,
  size,
}: MenuItemBaseProps &
  Omit<MenuItemGroupProps, "type"> &
  MenuItemComponentProps) => (
  <DropdownMenuGroup>
    {children && (
      <DropdownMenuLabel asChild>
        <Text size="xs" className={cn(getDropdownGroupHeaderStyles({ size }))}>
          {children}
        </Text>
      </DropdownMenuLabel>
    )}
    {items?.map((props: MenuItemProps, i) => (
      <MenuItem key={`group-menu-item-${i}`} size={size} {...props} />
    ))}
  </DropdownMenuGroup>
);
