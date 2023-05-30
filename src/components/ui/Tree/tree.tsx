import cn from "classnames";
import { typedMemo } from "../../../utils/internal";
import {
  Disclosure,
  DisclosureGroupProps,
  DisclosureItemProps,
} from "../Disclosure";
import {
  BorderVariant,
  borderSizesLargeB,
  borderSizesLargeL,
  extendedBorders,
  gapsSmall,
  heights,
  paddingsXSmall,
  roundingsBottom,
} from "../../../styles";

export type TreeItemProps = Omit<DisclosureItemProps, "content"> &
  (
    | {
        items: TreeItemProps[];
        content?: never;
      }
    | { items?: never; content: DisclosureItemProps["content"] }
  );

export type TreeProps = Omit<DisclosureGroupProps, "items"> & {
  items: TreeItemProps[];
  depth?: number;
  borderVariant?: BorderVariant;
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

const Tree = ({
  items,
  variant = "button",
  size = "md",
  className,
  groupClassName,
  depth = 0,
  borderVariant = "solid",
  ...props
}: TreeProps) => {
  const depthStyles = getDepthStyles(depth);

  return (
    <div className={cn("flex flex-col w-full", groupClassName)}>
      {items.map(({ items: subItems, ...item }, i) => (
        <div
          key={`disclosure_${i}`}
          className={cn("flex flex-row", gapsSmall[size])}
        >
          {depth !== 0 && (
            <span
              className={cn(
                "flex flex-row",
                i + 1 >= items?.length && heights[size]
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
          <Disclosure
            className="w-full"
            size={size}
            panelClassName="pr-0"
            {...item}
            {...props}
            content={
              subItems ? (
                <div className={cn("h-full relative !pr-0")}>
                  <Tree
                    {...props}
                    borderVariant={borderVariant}
                    depth={depth + 1}
                    variant={variant}
                    size={size}
                    items={subItems}
                    groupClassName={groupClassName}
                  />
                </div>
              ) : (
                item.content
              )
            }
            variant={variant}
          />
        </div>
      ))}
    </div>
  );
};

export default typedMemo(Tree);
