import { Tab } from "@headlessui/react";
import cn from "classnames";
import { FC, Fragment, memo, ReactNode, SVGProps } from "react";

import { gaps, paddings } from "../../../styles";
import { Colors, Sizes } from "../../../types";
import { Button } from "../Button";

export type TabGroupProps = TabListProps &
  TabPanelsProps & {
    className?: string;
    defaultIndex?: number;
  };

export type TabListProps = {
  items: TabItemProps[];
  listClassName?: string;
  size?: keyof Sizes;
  color?: keyof Colors;
};

export type TabPanelsProps = {
  items: TabItemProps[];
  panelsClassName?: string;
  size?: keyof Sizes;
  unmount?: boolean;
};

export type TabItemProps = {
  title: string;
  content: ReactNode;
  disabled?: boolean;
  className?: string;
  icon?: FC<SVGProps<SVGSVGElement>>;
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
    />
    <TabPanels
      unmount={unmount}
      items={items}
      panelsClassName={panelsClassName}
      size={size}
    />
  </Tab.Group>
);

export default memo(Tabs);

export const TabGroup = ({ children, ...props }: any) => (
  <Tab.Group {...props}>{children}</Tab.Group>
);

export const TabList = ({
  items,
  size = "md",
  listClassName,
  color,
}: TabListProps) => (
  <Tab.List className={cn("flex flex-row", gaps[size], listClassName)}>
    {items.map(({ title, disabled, icon }) => (
      <TabButton
        key={`tab_button_${title}`}
        title={title}
        disabled={disabled}
        color={color}
        size={size}
        icon={icon}
      />
    ))}
  </Tab.List>
);

export type StandaloneTabListProps = {
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

export const TabButton = ({
  title,
  disabled,
  color = "accent",
  size = "md",
  className,
  icon,
}: Omit<TabItemProps, "content"> & Pick<TabListProps, "color" | "size">) => (
  <Tab as={Fragment}>
    {({ selected }) => (
      <Button
        size={size}
        variant={!selected ? "ghost" : "filled"}
        disabled={disabled}
        color={color}
        className={className}
        leftIcon={icon}
      >
        {title}
      </Button>
    )}
  </Tab>
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

export type StandaloneTabPanelsProps = {
  panelsClassName?: string;
  size?: keyof Sizes;
  children?: ReactNode;
};

export const StandaloneTabPanels = ({
  children,
  size = "md",
  panelsClassName,
}: StandaloneTabPanelsProps) => (
  <Tab.Panels className={cn("flex flex-row", gaps[size], panelsClassName)}>
    {children}
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
