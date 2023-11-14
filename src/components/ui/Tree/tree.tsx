import { cn } from "@/utils";
import { FC, ReactNode } from "react";

import {
  borderSizesLargeB,
  borderSizesLargeL,
  BorderVariant,
  extendedBorders,
  heights,
  paddingsX,
  paddingsXSmall,
  roundingsBottom,
} from "../../../styles";
import type { Size } from "../../../types";
import {
  Disclosure,
  DisclosureGroupProps,
  DisclosureItemProps,
} from "../Disclosure";

export type TreeItemProps<TItem extends {} = {}> = {
  className?: string;
  items?: TreeItemProps<TItem>[];
  children?: ReactNode;
} & TItem;

export type TreeProps<TItem extends {} = {}> = Omit<
  DisclosureGroupProps,
  "items"
> & {
  items: TreeItemProps<TItem>[];
  depth?: number;
  borderVariant?: BorderVariant;
  disabledBorder?: boolean;
  Item?: FC<{
    size?: Size;
    children: string | ReactNode;
    item: Omit<TreeItemProps<TItem>, "items">;
  }>;
};

const getDepthStyles = (depth: number) => {
  const depths: Record<number, { border: string }> = {
    0: { border: "" },
    1: { border: extendedBorders.accent },
    2: { border: extendedBorders.filled },
    3: { border: extendedBorders.filledSubtile },
  };

  if (depth <= 3) return depths[depth];
  return depths[3];
};

const borderVariants: Record<BorderVariant, string> = {
  dashed: "border-dashed",
  dotted: "border-dotted",
  solid: "border-solid",
  double: "border-double",
  hidden: "border-hidden",
};

export const Tree = <TItem extends {} = {}>({
  items,
  size = "md",
  className,
  groupClassName,
  depth = 0,
  borderVariant = "solid",
  disabledBorder,
  Item,
  ...props
}: TreeProps<TItem>) => {
  const depthStyles = getDepthStyles(depth);

  const ItemWrapper = Item || "div";

  return (
    <div className={cn("flex flex-col w-full", groupClassName)}>
      {items.map(({ items: subItems, ...item }, i) => (
        <div key={`disclosure_${i}`} className={cn("flex flex-row")}>
          {depth !== 0 && !disabledBorder && (
            <span
              className={cn(
                "flex flex-row",
                i + 1 >= items?.length && heights[size],
                paddingsX[size]
              )}
            >
              {i + 1 < items?.length && (
                <span
                  className={cn(
                    borderSizesLargeL[size],
                    depthStyles.border,
                    borderVariants[borderVariant]
                  )}
                />
              )}
              <span
                className={cn(
                  i + 1 >= items?.length
                    ? cn(
                        "h-1/2 rounded-br-none",
                        borderSizesLargeL[size],
                        borderSizesLargeB[size],
                        roundingsBottom[size],
                        paddingsXSmall[size],
                        depthStyles.border,
                        borderVariants[borderVariant]
                      )
                    : cn(
                        "h-1/2",
                        borderSizesLargeB[size],
                        paddingsXSmall[size],
                        depthStyles.border,
                        borderVariants[borderVariant]
                      )
                )}
              />
            </span>
          )}
          <ItemWrapper
            size={size}
            item={item}
            className={cn("w-full", item.className)}
          >
            {item.children && item.children}
            {subItems && (
              <div className={cn("h-full relative")}>
                <Tree
                  {...props}
                  disabledBorder={disabledBorder}
                  Item={Item}
                  borderVariant={borderVariant}
                  depth={depth + 1}
                  size={size}
                  items={subItems}
                  groupClassName={groupClassName}
                />
              </div>
            )}
          </ItemWrapper>
        </div>
      ))}
    </div>
  );
};

export type TreeDisclosureProps = TreeProps<
  Omit<DisclosureItemProps, "content">
>;

const TreeDisclosureItem: TreeDisclosureProps["Item"] = ({
  size,
  item,
  children,
  ...props
}) => (
  <Disclosure
    className="w-full"
    size={size}
    panelClassName="px-0"
    {...item}
    {...props}
    content={children}
    variant="button"
  />
);

export const TreeDisclosure = ({ ...props }: TreeDisclosureProps) => (
  <Tree Item={TreeDisclosureItem} {...props} />
);
