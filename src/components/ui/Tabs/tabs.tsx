import { Tab } from "@headlessui/react";
import cn from "classnames";
import { Fragment, ReactElement, ReactNode } from "react";

import {
  bgColors,
  borders,
  bordersInteractive,
  gaps,
  paddings,
  paddingsX,
  paddingsY,
  roundings,
} from "../../../styles";
import type {
  ButtonVariant,
  Color,
  ExtendedColor,
  Size,
  SvgType,
  TabListVariant,
} from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { Button } from "../Button";

export type TabGroupProps = TabListProps &
  Omit<TabPanelsProps, "items"> & {
    className?: string;
    defaultIndex?: number;
  };

export type TabListProps = {
  items: TabItemProps[];
  listClassName?: string;
  size?: Size;
  color?: Color;
  buttonColor?: ExtendedColor;
  headerStartElement?: ReactElement;
  headerEndElement?: ReactElement;
  tabListVariant?: TabListVariant;
  activeButtonVariant?: ButtonVariant;
  activeButtonColor?: ExtendedColor;
};

export type TabPanelsProps = {
  items: TabItemProps[];
  panelsClassName?: string;
  size?: Size;
  unmount?: boolean;
};

export type TabItemProps = {
  title: string | undefined;
  content: ReactNode | undefined;
  disabled?: boolean;
  className?: string;
  icon?: SvgType;
  isSpace?: boolean;
};

export const Tabs = ({
  items = [],
  className,
  size = "md",
  color,
  panelsClassName,
  listClassName,
  defaultIndex,
  unmount,
  headerStartElement,
  headerEndElement,
  buttonColor,
  tabListVariant,
  activeButtonVariant,
  activeButtonColor,
}: TabGroupProps) => (
  <Tab.Group
    defaultIndex={defaultIndex}
    as="div"
    className={cn("flex flex-col w-full", className)}
  >
    <TabList
      items={items}
      listClassName={listClassName}
      size={size}
      color={color}
      buttonColor={buttonColor}
      headerStartElement={headerStartElement}
      headerEndElement={headerEndElement}
      tabListVariant={tabListVariant}
      activeButtonVariant={activeButtonVariant}
      activeButtonColor={activeButtonColor}
    />
    <TabPanels
      unmount={unmount}
      items={items.filter((item) => !item?.isSpace) as TabItemProps[]}
      panelsClassName={panelsClassName}
      size={size}
    />
  </Tab.Group>
);

export default typedMemo(Tabs);

export const TabGroup: typeof Tab.Group = ({ children, ...props }) => (
  <Tab.Group {...props}>{children}</Tab.Group>
);

TabGroup.displayName = "TabGroup";

type TabListStyleProps = {
  size: Size;
  color: Color;
};

const tabListStyles = ({
  size,
  color,
}: TabListStyleProps): Record<TabListVariant, string> => ({
  default: cn("border-b", borders.accent),
  buttonList: cn(
    "border bg-opacity-50",
    roundings[size],
    bgColors[color],
    borders[color]
  ),
});

export const TabList = ({
  items,
  size = "md",
  listClassName,
  color = "primary",
  headerEndElement,
  headerStartElement,
  buttonColor,
  tabListVariant = "default",
  activeButtonVariant,
  activeButtonColor,
}: TabListProps) => {
  const result = items
    .filter(({ isSpace }) => !isSpace)
    .map((item, index) => ({ ...item, index }));

  items
    .filter(({ isSpace }) => isSpace)
    .forEach((item) => {
      const index = items.indexOf(item);
      if (index !== -1) {
        result.splice(index, 0, { ...item, index: -1 });
      }
    });

  return (
    <Tab.List
      className={cn("flex flex-row justify-between items-center w-full")}
    >
      {({ selectedIndex }) => (
        <div
          className={cn(
            "flex flex-row w-full items-center justify-between",
            tabListStyles({ size, color })[tabListVariant],
            paddingsX[size],
            gaps[size],
            listClassName
          )}
        >
          <div className={cn("flex flex-row items-center w-full", gaps[size])}>
            {headerStartElement && headerStartElement}
            {result.map(({ title, disabled, icon, index, isSpace }) => {
              if (isSpace) return <span className="w-full" />;
              return (
                <TabButton
                  key={`tab_button_${title}`}
                  title={title}
                  disabled={disabled}
                  color={color}
                  buttonColor={buttonColor}
                  size={size}
                  icon={icon}
                  isSelected={selectedIndex === index}
                  tabListVariant={tabListVariant}
                  activeButtonVariant={activeButtonVariant}
                  activeButtonColor={activeButtonColor}
                />
              );
            })}
          </div>
          {headerEndElement && headerEndElement}
        </div>
      )}
    </Tab.List>
  );
};

export type TabButtonProps = {
  isSelected?: boolean;
};

type TabButtonStyleProps = TabListStyleProps & { isSelected?: boolean };

const tabButtonStyles = ({
  color,
  isSelected,
}: TabButtonStyleProps): Record<TabListVariant, string> => ({
  default: cn(
    "-mb-px",
    isSelected && cn("border-b-2", bordersInteractive[color])
  ),
  buttonList: "",
});

export const TabButton = ({
  title,
  disabled,
  color = "primary",
  buttonColor = "accent",
  size = "md",
  className,
  icon,
  isSelected,
  tabListVariant = "default",
  activeButtonVariant,
  activeButtonColor,
}: Omit<TabItemProps, "content"> &
  Pick<
    TabListProps,
    | "color"
    | "size"
    | "buttonColor"
    | "tabListVariant"
    | "activeButtonColor"
    | "activeButtonVariant"
  > &
  TabButtonProps) => (
  <div
    className={cn(
      paddingsY[size],
      tabButtonStyles({ size, color, isSelected })[tabListVariant]
    )}
  >
    <Tab as={Fragment}>
      {({ selected }) => (
        <Button
          size={size}
          variant={!selected ? "ghost" : activeButtonVariant || "filled"}
          disabled={disabled}
          color={!selected ? buttonColor : activeButtonColor || buttonColor}
          className={cn("whitespace-nowrap", className)}
          leftIcon={icon}
        >
          {title}
        </Button>
      )}
    </Tab>
  </div>
);

export const TabPanels = ({
  items,
  size = "md",
  panelsClassName,
  unmount,
}: TabPanelsProps) => (
  <Tab.Panels className={cn(paddings[size], panelsClassName)}>
    {items.map(({ content, className: panelClassName }, i) => (
      <TabPanel
        key={`tab_panel_${i}`}
        content={content}
        className={panelClassName}
        size={size}
        unmount={unmount}
      />
    ))}
  </Tab.Panels>
);

export const TabPanel = ({
  content,
  className,
  unmount,
}: Omit<TabItemProps, "title"> & Pick<TabPanelsProps, "size" | "unmount">) => (
  <Tab.Panel unmount={unmount} className={cn("flex", className)}>
    {content}
  </Tab.Panel>
);
