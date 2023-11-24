import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  type DropdownMenuContentProps,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuItemIndicator,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
  type DropdownMenuTriggerProps,
  Root as DropdownMenuRoot,
} from "@radix-ui/react-dropdown-menu";
import { IconCheck, IconPointFilled } from "@tabler/icons-react";
import { cn } from "@/utils/cn";
import Link, { type LinkProps } from "next/link";
import { ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";

import { marginsYSmall, popoverAnimation } from "@/styles";
import {
  getDropdownContainerStyles,
  getDropdownGroupHeaderStyles,
} from "@/styles/groups";
import { offsetSizes } from "@/styles/popper/offset";
import type { Color, Size, SvgType } from "@/types";
import { capSize } from "@/utils";
import { Button, ButtonProps } from "../Button";
import { HorizontalRule } from "../HorizontalRule";
import { Icon } from "../Icon";
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

export type MenuItemBaseProps = {
  children?: ReactNode;
  disabled?: boolean;
};

export type MenuItemAnchorProps = {
  type: "anchor";
  href: string;
  color?: Color;
  icon?: SvgType;
  anchorProps?: LinkProps;
} & MenuItemBaseProps;

export type MenuItemButtonProps = {
  type?: "button";
  onClick: () => void;
  color?: Color;
  icon?: SvgType;
  buttonProps?: ButtonProps;
} & MenuItemBaseProps;

export type MenuItemGroupProps = {
  type: "group";
  items?: MenuItemProps[];
} & MenuItemBaseProps;

export type MenuItemSeparatorProps = {
  type: "separator";
};

export type MenuItemCheckboxProps = {
  type: "checkbox";
  checked: boolean;
  setChecked: (checked: boolean) => void;
  color?: Color;
} & MenuItemBaseProps;

export type MenuItemRadioProps = {
  type: "radio";
  value?: string;
  setValue: (value: string) => void;
  color?: Color;
  options: (MenuItemBaseProps & { value: string })[];
};

export type MenuItemProps =
  | MenuItemAnchorProps
  | MenuItemButtonProps
  | MenuItemGroupProps
  | MenuItemSeparatorProps
  | MenuItemCheckboxProps
  | MenuItemRadioProps;

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

  if (type === "button" || !type) return <MenuItemButton {...props} />;

  if (type === "anchor") return <MenuItemAnchor {...props} />;

  if (type === "separator")
    return <HorizontalRule className={cn(marginsYSmall[size])} />;

  if (type === "group") return <MenuItemGroup {...props} />;

  if (type === "checkbox") return <MenuItemCheckbox {...props} />;

  if (type === "radio") return <MenuItemRadioGroup {...props} />;

  return null;
};

const MenuItemAnchor = ({
  href,
  children,
  color,
  disabled,
  icon,
  size,
}: Omit<MenuItemAnchorProps, "type"> & MenuItemComponentProps) => (
  <DropdownMenuItem asChild>
    <Button
      asChild
      size={capSize(size, "md")}
      disabled={disabled}
      variant="ghost"
      color={color}
      leftIcon={icon}
      className={cn("w-full !justify-start")}
    >
      <Link href={href}>{children}</Link>
    </Button>
  </DropdownMenuItem>
);

const MenuItemButton = ({
  onClick,
  children,
  color,
  disabled,
  icon,
  size,
}: Omit<MenuItemButtonProps, "type"> & MenuItemComponentProps) => (
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

const MenuItemGroup = ({
  items,
  children,
  size,
}: Omit<MenuItemGroupProps, "type"> & MenuItemComponentProps) => (
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

const MenuItemCheckbox = ({
  children,
  color,
  disabled,
  size,
  checked,
  setChecked,
}: Omit<MenuItemCheckboxProps, "type"> & MenuItemComponentProps) => (
  <DropdownMenuCheckboxItem checked={checked} onCheckedChange={setChecked}>
    <Button
      size={capSize(size, "md")}
      disabled={disabled}
      variant="ghost"
      color={color}
      className={cn("w-full !justify-start")}
    >
      <DropdownMenuItemIndicator>
        <Icon icon={IconCheck} size={capSize(size, "md")} />
      </DropdownMenuItemIndicator>
      {children}
    </Button>
  </DropdownMenuCheckboxItem>
);

const MenuItemRadioGroup = ({
  color,
  size,
  value,
  setValue,
  options,
}: Omit<MenuItemRadioProps, "type"> & MenuItemComponentProps) => (
  <DropdownMenuRadioGroup value={value} onValueChange={setValue}>
    {options.map(({ value, children, disabled }) => (
      <DropdownMenuRadioItem
        value={value}
        key={`radio_option_${value}`}
        asChild
      >
        <Button
          size={capSize(size, "md")}
          disabled={disabled}
          variant="ghost"
          color={color}
          className={cn("w-full !justify-start")}
        >
          <DropdownMenuItemIndicator>
            <Icon icon={IconPointFilled} size={capSize(size, "md")} />
          </DropdownMenuItemIndicator>
          {children}
        </Button>
      </DropdownMenuRadioItem>
    ))}
  </DropdownMenuRadioGroup>
);
