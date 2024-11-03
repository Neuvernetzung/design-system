import {
  Root as TabsRoot,
  TabsContent,
  TabsList,
  TabsProps,
  TabsTrigger,
} from "@radix-ui/react-tabs";
import { cn } from "@/utils";
import type { ReactElement, ReactNode } from "react";
import { useState } from "react";

import {
  bgColors,
  borders,
  bordersInteractive,
  focus,
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
import { Button } from "../Button";

export type TabGroupProps = { items: TabItemProps[] } & Omit<
  TabListProps,
  "items"
> &
  Omit<TabPanelsProps, "items"> & {
    className?: string;
    defaultTab?: string;
    setValue?: (value: string) => void;
  };

export type TabListProps = {
  items: (Omit<TabItemValueProps, "content"> | TabItemSeparatorProps)[];
  listClassName?: string;
  size?: Size;
  color?: Color;
  buttonColor?: ExtendedColor;
  headerStartElement?: ReactElement;
  headerEndElement?: ReactElement;
  tabListVariant?: TabListVariant;
  activeButtonVariant?: ButtonVariant;
  activeButtonColor?: ExtendedColor;
  value?: string;
};

export type TabPanelsProps = {
  items: Omit<TabItemValueProps, "title">[];
  panelsClassName?: string;
  size?: Size;
  unmount?: boolean;
};

export type TabItemValueProps = {
  type?: "tab";
  title: string | undefined;
  value: string;
  content: ReactNode | undefined;
  disabled?: boolean;
  className?: string;
  icon?: SvgType;
};

export type TabItemSeparatorProps = {
  type: "separator";
};

export type TabItemProps = TabItemValueProps | TabItemSeparatorProps;

export const Tabs = ({
  items = [],
  className,
  size = "md",
  color,
  panelsClassName,
  listClassName,
  defaultTab,
  unmount,
  headerStartElement,
  headerEndElement,
  buttonColor,
  tabListVariant,
  activeButtonVariant,
  activeButtonColor,
  value,
  setValue,
}: TabGroupProps) => {
  const [internalValue, setInternalValue] = useState<string>(
    value ||
      (
        items.find(
          (item) => item.type === "tab" || !item.type
        ) as TabItemValueProps
      )?.value
  );
  const tab = setValue ? value : internalValue;

  return (
    <TabsRoot
      defaultValue={defaultTab || internalValue}
      value={tab}
      onValueChange={(v) => {
        if (setValue) {
          setValue?.(v);
        } else setInternalValue(v);
      }}
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
        value={tab}
      />
      <TabPanels
        unmount={unmount}
        items={
          items.filter(
            (item) => item?.type !== "separator"
          ) as TabItemValueProps[]
        }
        panelsClassName={panelsClassName}
        size={size}
      />
    </TabsRoot>
  );
};

export const TabGroup = ({ children, ...props }: TabsProps) => (
  <TabsRoot {...props}>{children}</TabsRoot>
);

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
  value: activeTab,
}: TabListProps) => (
  <TabsList className={cn("flex flex-row justify-between items-center w-full")}>
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
        {items.map((props, i) => {
          if (props.type === "separator")
            return <span key={`tab_separator_${i}`} className="w-full" />;

          if (props.type === "tab" || !props.type)
            return (
              <TabButton
                key={`tab_button_${props.value}`}
                color={color}
                buttonColor={buttonColor}
                size={size}
                tabListVariant={tabListVariant}
                activeButtonVariant={activeButtonVariant}
                activeButtonColor={activeButtonColor}
                isSelected={activeTab === props.value}
                {...props}
              />
            );

          return null;
        })}
      </div>
      {headerEndElement && headerEndElement}
    </div>
  </TabsList>
);

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
  value,
}: Omit<TabItemValueProps, "content"> &
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
    <TabsTrigger value={value} asChild>
      <Button
        size={size}
        variant={!isSelected ? "ghost" : activeButtonVariant || "filled"}
        disabled={disabled}
        color={!isSelected ? buttonColor : activeButtonColor || buttonColor}
        className={cn("whitespace-nowrap", className)}
        leftIcon={icon}
      >
        {title}
      </Button>
    </TabsTrigger>
  </div>
);

export const TabPanels = ({
  items,
  size = "md",
  panelsClassName,
  unmount,
}: TabPanelsProps) => (
  <div className={cn(paddings[size], panelsClassName)}>
    {items.map(({ content, ...props }, i) => (
      <TabPanel key={`tab_panel_${i}`} size={size} unmount={unmount} {...props}>
        {content}
      </TabPanel>
    ))}
  </div>
);

export const TabPanel = ({
  children,
  className,
  value,
}: Omit<TabItemValueProps, "title" | "content"> & {
  children: ReactNode;
} & Pick<TabPanelsProps, "size" | "unmount">) => (
  <TabsContent value={value} className={cn("flex", focus.accent, className)}>
    {children}
  </TabsContent>
);
