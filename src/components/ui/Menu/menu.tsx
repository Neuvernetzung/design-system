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
import Link, { type LinkProps } from "next/link";
import {
  ForwardedRef,
  forwardRef,
  ReactElement,
  ReactNode,
  RefObject,
} from "react";

import { marginsYSmall } from "@/styles";
import {
  getDropdownContainerStyles,
  getDropdownGroupHeaderStyles,
  getDropdownPadding,
} from "@/styles/groups";
import { offsetSizes } from "@/styles/popper/offset";
import type { Color, Size, SvgType } from "@/types";
import { capSize } from "@/utils";
import { cn } from "@/utils/cn";

import { Button, type ButtonProps } from "../Button";
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
  menuContentProps?: DropdownMenuContentProps;
  containerRef?: RefObject<HTMLElement>;
  beforeChildren?: ReactNode;
  afterChildren?: ReactNode;
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

export type MenuItemCustomProps = { type: "custom" } & Omit<
  MenuItemBaseProps,
  "disabled"
>;

export type MenuItemProps =
  | MenuItemAnchorProps
  | MenuItemButtonProps
  | MenuItemGroupProps
  | MenuItemSeparatorProps
  | MenuItemCheckboxProps
  | MenuItemRadioProps
  | MenuItemCustomProps;

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
      containerRef,
      menuContentProps,
      beforeChildren,
      afterChildren,
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
      <DropdownMenuPortal container={containerRef?.current || undefined}>
        <DropdownMenuContent
          side={side}
          align={align}
          sideOffset={offsetSizes[size]}
          className={cn(
            "!w-64",
            getDropdownContainerStyles({ size }),
            dropdownClassName
          )}
          {...menuContentProps}
        >
          {beforeChildren && (
            <div className={cn(getDropdownPadding(size))}>{beforeChildren}</div>
          )}
          <ul className={cn(getDropdownPadding(size))}>
            <MenuItems items={items} size={size} />
          </ul>
          {afterChildren && (
            <div className={cn(getDropdownPadding(size))}>{afterChildren}</div>
          )}
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  )
);

Menu.displayName = "Menu";

export const MenuItems = ({
  items,
  size = "sm",
}: Pick<MenuProps, "items" | "size">) =>
  items?.map((props, i) => (
    <li key={`menu_option_${i}`}>
      <MenuItem size={size} {...props} />
    </li>
  ));

const MenuItem = (props: MenuItemProps & MenuItemComponentProps) => {
  const { type, size } = props;

  if (type === "button" || !type) return <MenuItemButton {...props} />;

  if (type === "anchor") return <MenuItemAnchor {...props} />;

  if (type === "separator")
    return <HorizontalRule className={cn(marginsYSmall[size])} />;

  if (type === "group") return <MenuItemGroup {...props} />;

  if (type === "checkbox") return <MenuItemCheckbox {...props} />;

  if (type === "radio") return <MenuItemRadioGroup {...props} />;

  if (type === "custom") return <MenuItemCustom {...props} />;

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
    <MenuItems items={items || []} size={size} />
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

const MenuItemCustom = ({
  children,
}: Omit<MenuItemCustomProps, "type"> &
  Omit<MenuItemComponentProps, "size">) => (
  <DropdownMenuItem>{children}</DropdownMenuItem>
);
