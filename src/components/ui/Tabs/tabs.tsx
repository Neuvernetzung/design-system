import { Tab } from "@headlessui/react";
import cn from "classnames";
import { Fragment, memo, ReactNode } from "react";

import { gaps, paddings } from "../../../styles";
import { Colors, Sizes } from "../../../types";
import { Button } from "../Button";

export type TabGroupProps = TabListProps &
  TabPanelsProps & {
    className?: string;
  };

type TabListProps = {
  items: ItemProps[];
  listClassName?: string;
  size?: keyof Sizes;
  color?: keyof Colors;
};

type TabPanelsProps = {
  items: ItemProps[];
  panelsClassName?: string;
  size?: keyof Sizes;
};

type ItemProps = {
  title: string;
  content: ReactNode;
  disabled?: boolean;
  className?: string;
};

export const Tabs = ({
  items = [],
  className,
  size = "md",
  color,
  panelsClassName,
  listClassName,
}: TabGroupProps) => (
  <Tab.Group as="div" className={cn("flex flex-col w-full", className)}>
    <TabList
      items={items}
      listClassName={listClassName}
      size={size}
      color={color}
    />
    <TabPanels items={items} panelsClassName={panelsClassName} size={size} />
  </Tab.Group>
);

export default memo(Tabs);

export const TabGroup = ({ children, ...props }: any) => (
  <Tab.Group {...props}>{children}</Tab.Group>
);

Tabs.defaultProps = {
  className: undefined,
  panelsClassName: undefined,
  listClassName: undefined,
  size: "md",
  color: "accent",
};

export const TabList = ({
  items,
  size = "md",
  listClassName,
  color,
}: TabListProps) => (
  <Tab.List className={cn("flex flex-row", gaps[size], listClassName)}>
    {items.map(({ title, disabled }: ItemProps) => (
      <TabButton
        key={`tab_button_${title}`}
        title={title}
        disabled={disabled}
        color={color}
        size={size}
      />
    ))}
  </Tab.List>
);

TabList.defaultProps = {
  listClassName: undefined,
  size: "md",
  color: "accent",
};

type StandaloneTabListProps = {
  listClassName?: string;
  size?: keyof Sizes;
  children?: ReactNode;
};

export const StandaloneTabList = ({
  children,
  size = "md",
  listClassName,
}: StandaloneTabListProps) => (
  <Tab.List className={cn("flex flex-row", gaps[size], listClassName)}>
    {children}
  </Tab.List>
);

StandaloneTabList.defaultProps = {
  listClassName: undefined,
  size: "md",
  children: undefined,
};

export const TabButton = ({
  title,
  disabled,
  color = "accent",
  size = "md",
  className,
}: Omit<ItemProps, "content"> & Pick<TabListProps, "color" | "size">) => (
  <Tab as={Fragment}>
    {({ selected }) => (
      <Button
        size={size}
        variant={!selected ? "ghost" : "filled"}
        disabled={disabled}
        color={color}
        className={className}
      >
        {title}
      </Button>
    )}
  </Tab>
);
TabButton.defaultProps = {
  diabled: undefined,
  className: undefined,
};

export const TabPanels = ({
  items,
  size = "md",
  panelsClassName,
}: TabPanelsProps) => (
  <Tab.Panels className={cn(panelsClassName)}>
    {items.map(({ content, className: panelClassName }: ItemProps, i) => (
      <TabPanel
        key={`tab_panel_${i}`}
        content={content}
        className={panelClassName}
        size={size}
      />
    ))}
  </Tab.Panels>
);

TabPanels.defaultProps = {
  panelsClassName: undefined,
  size: "md",
};

const TabPanel = ({
  content,
  className,
  size = "md",
}: Omit<ItemProps, "title"> & Pick<TabPanelsProps, "size">) => (
  <Tab.Panel className={cn("flex", paddings[size], className)}>
    {content}
  </Tab.Panel>
);

TabPanel.defaultProps = {
  size: "md",
  panelClassName: undefined,
};
