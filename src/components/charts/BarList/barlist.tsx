import cn from "classnames";
import isFunction from "lodash/isFunction";
import Link from "next/link";
import { ReactNode, useMemo } from "react";

import {
  bgColors,
  bgColorsInteractive,
  focusBase,
  focusRing,
  gaps,
  gapsSmall,
  heights,
  paddings,
  roundings,
  textColors,
  transition,
} from "../../../styles";
import { useThemeState } from "../../../theme";
import { Color, Size } from "../../../types";
import { Text } from "../../ui/Typography/Text";

export type BarListItemProps = {
  name: string;
  children?: ReactNode;
  value: number;
  href?: string;
};

export const barListVariants = ["default", "subtile"] as const;

export type BarListVariant = (typeof barListVariants)[number];

export type BarListProps = {
  data: BarListItemProps[];
  sort?: false | "ASC" | "DESC";
  size?: Size;
  color?: Color;
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
  const { adjustedTextColorState } = useThemeState();

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
      {sortedData.map(({ name, value, children, href }, i) => (
        <BarListItemWrapper
          key={`bar_${i}_${name}`}
          href={href}
          size={size}
          color={color}
        >
          <div
            className={cn(
              "flex flex-row items-center",
              gaps[size],
              justifyValue
            )}
          >
            <div className="flex flex-row w-full">
              <div
                className={cn(
                  "relative",
                  roundings[size],
                  heights[size],
                  href ? bgColorsInteractive[color] : bgColors[color],
                  barVariantProps[variant],
                  transition
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
                          variant === "default" && adjustedTextColorState[color]
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
        </BarListItemWrapper>
      ))}
    </div>
  );
};

type BarListItemWrapperProps = { href?: string; children: ReactNode } & Pick<
  BarListProps,
  "size" | "color"
>;

const BarListItemWrapper = ({
  href,
  size = "md",
  color = "primary",
  children,
}: BarListItemWrapperProps) => {
  if (href)
    return (
      <Link
        href={href}
        className={cn(
          focusBase,
          focusRing[color],
          roundings[size],
          transition,
          "hover:bg-black/10 dark:hover:bg-white/10"
        )}
      >
        {children}
      </Link>
    );

  return children;
};
