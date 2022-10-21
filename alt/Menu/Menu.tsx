import {
  forwardRef,
  Menu as ChakraMenu,
  MenuButton,
  MenuDivider as ChakraMenuDivider,
  MenuGroup as ChakraMenuGroup,
  MenuGroupProps,
  MenuItem as ChakraMenuItem,
  MenuItemProps,
  MenuList,
  MenuProps,
} from "@chakra-ui/react";
import { FC, ReactElement, ReactNode } from "react";

import { Button } from "../Button";

interface ExtendedMenuProps extends Omit<MenuProps, "children"> {
  title: string;
  button: ButtonProps;
  items: ItemProps[];
}

type ButtonProps = {
  component?: FC | any;
  content: string | ReactNode;
  buttonProps?: any;
};

interface ItemProps extends MenuItemProps {
  icon?: ReactElement;
  command?: string;
  content?: any;
  onClick?: any;
  title?: any;
  items?: any;
  isDivider?: boolean;
  isGroup?: boolean;
}

interface GroupProps extends MenuGroupProps {
  title: string;
  items: ItemProps[];
}

export const Menu = ({
  title,
  button,
  items = [],
  ...props
}: ExtendedMenuProps) => (
  <ChakraMenu {...props}>
    <MenuButton
      as={button?.component || Button}
      aria-label={title}
      {...button?.buttonProps}
    >
      {button?.content || title}
    </MenuButton>
    <MenuList>
      {items.map(
        (
          {
            icon,
            command,
            content,
            onClick,
            title,
            items,
            isDivider,
            isGroup,
            ...itemProps
          },
          i
        ) => {
          if (isDivider) return <MenuDivider />;
          if (isGroup) return <MenuGroup title={title} items={items} />;
          return (
            <MenuItem
              key={`menuitem_${i}`}
              icon={icon}
              command={command}
              content={content}
              onClick={onClick}
              {...itemProps}
            />
          );
        }
      )}
    </MenuList>
  </ChakraMenu>
);

Menu.defaultProps = {};

const MenuGroup = forwardRef<GroupProps, "div">(
  ({ title, items = [] }, ref) => (
    <ChakraMenuGroup title={title} ref={ref}>
      {items?.map((item: ItemProps, i) => {
        if (item?.isDivider) return <MenuDivider />;
        return <MenuItem key={`menuitem_${i}`} {...item} />;
      })}
    </ChakraMenuGroup>
  )
);

const MenuItem = forwardRef<Omit<ItemProps, "isGroup" | "isDivider">, "div">(
  ({ icon, command, onClick, content, color, ...itemProps }, ref) => (
    <ChakraMenuItem
      ref={ref}
      icon={icon || undefined}
      command={command}
      onClick={onClick}
      color={color}
      {...itemProps}
    >
      {content}
    </ChakraMenuItem>
  )
);

MenuItem.defaultProps = {
  icon: undefined,
  command: undefined,
  content: undefined,
  onClick: undefined,
};

const MenuDivider = () => <ChakraMenuDivider borderColor="gray.300" />;
