import { Menu as HeadlessMenu } from "@headlessui/react";
import type { Placement } from "@popperjs/core";
import cn from "classnames";
import {
  FC,
  ForwardedRef,
  forwardRef,
  ReactNode,
  SVGProps,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

import { gapsSmall, textColors } from "../../../styles";
import {
  getDropdownContainerStyles,
  getDropdownGroupHeaderStyles,
  getDropdownGroupStyles,
  getDropDownOptionsStyles,
} from "../../../styles/groups";
import { popperOffset } from "../../../styles/popper/offset";
import { Colors, Sizes } from "../../../types";
import { capSize } from "../../../utils";
import { typedMemo } from "../../../utils/internal";
import { mergeRefs } from "../../../utils/internal/mergeRefs";
import { Button, ButtonProps, IconButton, IconButtonProps } from "../Button";
import { Icon } from "../Icon";
import { Text } from "../Typography";

export type MenuProps = {
  items: MenuItemProps[];
  size?: keyof Sizes;
  disabled?: boolean;
  dropdownClassName?: string;
  placement?: Placement;
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
      items?: MenuItemProps[];
      href?: never;
      onClick?: never;
      icon?: never;
    }
  | ({
      items?: never;
      icon?: FC<SVGProps<SVGSVGElement>>;
    } & OptionalFunctionProps);

export type MenuItemProps = {
  children?: ReactNode;
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
      buttonType = "button",
      dropdownClassName,
      placement = "bottom-end",
    }: MenuProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    const [referenceElement, setReferenceElement] =
      useState<HTMLElement | null>(null);
    const [popperElement, setPopperElement] =
      useState<HTMLElement | null>(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      placement,
      modifiers: [{ name: "offset", options: { offset: popperOffset } }],
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
        {createPortal(
          <HeadlessMenu.Items
            ref={setPopperElement}
            className={cn(
              "!w-64",
              getDropdownContainerStyles({ size }),
              dropdownClassName
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
                }: MenuItemProps,
                i
              ) => {
                if (_items && _items.length !== 0)
                  return (
                    <div className={cn(getDropdownGroupStyles({ size }))}>
                      {children && (
                        <Text
                          size="xs"
                          className={cn(getDropdownGroupHeaderStyles({ size }))}
                        >
                          {children}
                        </Text>
                      )}
                      {_items?.map(
                        (
                          {
                            children: _children,
                            disabled: _disabled,
                            href: _href,
                            onClick: _onClick,
                            icon: _icon,
                            color: _color,
                          }: MenuItemProps,
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
                              className={({ active }: { active?: boolean }) =>
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
                    className={({ active }: { active?: boolean }) =>
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
          </HeadlessMenu.Items>,
          document?.body
        )}
      </HeadlessMenu>
    );
  }
);

export default typedMemo(Menu);

Menu.displayName = "Menu";
