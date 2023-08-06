import cn from "classnames";
import { ReactNode, useMemo } from "react";

import {
  adjustedTextColors,
  bgColors,
  gaps,
  gapsSmall,
  heights,
  paddings,
  roundings,
  textColors,
} from "../../../styles";
import { Colors, Sizes } from "../../../types";
import { Text } from "../../ui/Typography/Text";
import isFunction from "lodash/isFunction";
import { useThemeState } from "../../../theme";

export type BarListItemProps = {
  name: string;
  children?: ReactNode;
  value: number;
};

export const barListVariants = ["default", "subtile"] as const;

export type BarListVariant = (typeof barListVariants)[number];

export type BarListProps = {
  data: BarListItemProps[];
  sort?: false | "ASC" | "DESC";
  size?: keyof Sizes;
  color?: keyof Colors;
  showValue?: boolean;
  justifyValue?: "justify-between" | "justify-start";
  formatValue?: (value: number) => string | number;
  variant?: BarListVariant;
};

const barVariantProps: Record<BarListVariant, string> = {
  default: "",
  subtile: "bg-opacity-30 dark:bg-opacity-30",
};

export const BarList = ({
  data = [],
  sort = "DESC",
  size = "md",
  color = "primary",
  showValue = true,
  justifyValue = "justify-between",
  formatValue,
  variant = "default",
}: BarListProps) => {
  const { colorState } = useThemeState();

  const sortedData = useMemo(
    () =>
      sort === "ASC"
        ? data.sort((a, b) => a.value - b.value)
        : sort === "DESC"
        ? data.sort((a, b) => b.value - a.value)
        : data,
    [data, sort]
  );

  const maxValue = useMemo(
    () => Math.max(...data.map(({ value }) => value)),
    [data]
  );

  const isShort = (value: number) => (100 / maxValue) * value < 8;

  return (
    <div className={cn("flex flex-col", gapsSmall[size])}>
      {sortedData.map(({ name, value, children }, i) => (
        <div
          key={`bar_${i}_${name}`}
          className={cn("flex flex-row items-center", gaps[size], justifyValue)}
        >
          <div className="flex flex-row w-full">
            <div
              className={cn(
                "relative",
                roundings[size],
                heights[size],
                bgColors[color],
                barVariantProps[variant]
              )}
              style={{ width: `${(100 / maxValue) * value}%` }}
            >
              <div
                className={cn(
                  "absolute max-w-full inset-y-0 flex items-center"
                )}
              >
                {!isShort(value) &&
                  (children || (
                    <Text
                      size={size}
                      className={cn(
                        paddings[size],
                        variant === "default" &&
                          adjustedTextColors(colorState)[color]
                      )}
                    >
                      {name}
                    </Text>
                  ))}
              </div>
            </div>
            {isShort(value) &&
              (children || (
                <Text
                  size={size}
                  className={cn(paddings[size], textColors.accent)}
                >
                  {name}
                </Text>
              ))}
          </div>
          {showValue && (
            <div>
              <Text size={size} className="whitespace-nowrap">
                {isFunction(formatValue) ? formatValue(value) : value}
              </Text>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
