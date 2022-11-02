import { Menu as HeadlessMenu } from "@headlessui/react";
import cn from "classnames";
import {
  ElementType,
  ForwardedRef,
  forwardRef,
  memo,
  ReactNode,
  useState,
} from "react";
import { mergeRefs } from "react-merge-refs";
import { usePopper } from "react-popper";

import { gapsSmall, textColors } from "../../../styles";
import {
  getDropdownContainerStyles,
  getDropdownGroupHeaderStyles,
  getDropdownGroupStyles,
  getDropDownOptionsStyles,
} from "../../../styles/groups";
import { Colors, Sizes } from "../../../types";
import { capSize } from "../../../utils";
import { Button, ButtonProps, IconButton, IconButtonProps } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type MenuProps = {
  items: ItemProps[];
  size?: keyof Sizes;
  disabled?: boolean;
  itemsClassName?: string;
} & MenuButtonProps;

type MenuButtonProps =
  | {
      buttonType: "button";
      buttonProps: ButtonProps;
    }
  | {
      buttonType: "icon";
      buttonProps: IconButtonProps;
    };

type OptionalFunctionProps =
  | { href: string; onClick?: never }
  | { href?: never; onClick: Function };

type OptionalItemProps =
  | {
      children: string;
      items?: ItemProps[];
      href?: never;
      onClick?: never;
      icon?: never;
    }
  | ({
      children: ReactNode;
      items?: never;
      icon?: ElementType<SVGElement>;
    } & OptionalFunctionProps);

export type ItemProps = {
  disabled?: boolean;
  color?: keyof Colors;
} & OptionalItemProps;

export const Menu = forwardRef<HTMLButtonElement, MenuProps>(
  (
    {
      items,
      disabled,
      size = "md",
      buttonProps,
      buttonType,
      itemsClassName,
    }: MenuProps,
    ref: ForwardedRef<Element>
  ) => {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement: "bottom-end",
    });

    const ButtonComponent = { icon: IconButton, button: Button };

    return (
      <HeadlessMenu>
        <HeadlessMenu.Button
          ref={mergeRefs([ref, setReferenceElement])}
          disabled={disabled}
          as={ButtonComponent[buttonType]}
          {...buttonProps}
        />

        <HeadlessMenu.Items
          ref={setPopperElement}
          className={cn(
            "w-64",
            getDropdownContainerStyles({ size }),
            itemsClassName
          )}
          style={styles.popper}
          {...attributes.popper}
        >
          {items?.map(
            (
              {
                children,
                disabled,
                items: _items,
                href,
                onClick,
                icon,
                color,
              }: ItemProps,
              i
            ) => {
              if (_items && _items.length !== 0)
                return (
                  <div className={cn(getDropdownGroupStyles({ size }))}>
                    <Text
                      size="xs"
                      className={cn(getDropdownGroupHeaderStyles({ size }))}
                    >
                      {children}
                    </Text>
                    {_items?.map(
                      (
                        {
                          children: _children,
                          disabled: _disabled,
                          href: _href,
                          onClick: _onClick,
                          icon: _icon,
                          color: _color,
                        }: ItemProps,
                        _i
                      ) => {
                        const asProps: any = _href
                          ? { as: "a", href: _href }
                          : _onClick
                          ? { as: "button", onClick: _onClick }
                          : { as: "div" };

                        return (
                          <HeadlessMenu.Item
                            {...asProps}
                            key={`menu_option_${_i}`}
                            disabled={_disabled}
                            className={({ active }) =>
                              cn(
                                getDropDownOptionsStyles({
                                  size,
                                  active,
                                  disabled: _disabled,
                                })
                              )
                            }
                          >
                            <div
                              className={cn(
                                "flex flex-row items-center",
                                gapsSmall[capSize(size, "md")],
                                _color && textColors[_color]
                              )}
                            >
                              {_icon && (
                                <Icon
                                  color={_color}
                                  icon={_icon}
                                  size={capSize(size, "md")}
                                />
                              )}
                              {_children}
                            </div>
                          </HeadlessMenu.Item>
                        );
                      }
                    )}
                  </div>
                );
              if (_items?.length === 0) return null;

              const asProps: any = href
                ? { as: "a", href }
                : onClick
                ? { as: "button", onClick }
                : { as: "div" };

              return (
                <HeadlessMenu.Item
                  {...asProps}
                  key={`menu_option_${i}`}
                  disabled={disabled}
                  className={({ active }) =>
                    cn(
                      getDropDownOptionsStyles({
                        size,
                        active,
                        disabled,
                      })
                    )
                  }
                >
                  <div
                    className={cn(
                      "flex flex-row items-center",
                      gapsSmall[capSize(size, "md")],
                      color && textColors[color]
                    )}
                  >
                    {icon && (
                      <Icon
                        color={color}
                        icon={icon}
                        size={capSize(size, "md")}
                      />
                    )}
                    {children}
                  </div>
                </HeadlessMenu.Item>
              );
            }
          )}
        </HeadlessMenu.Items>
      </HeadlessMenu>
    );
  }
);

export default memo(Menu);

Menu.displayName = "Menu";

Menu.defaultProps = {
  size: "md",
  disabled: false,
  itemsClassName: undefined,
};
