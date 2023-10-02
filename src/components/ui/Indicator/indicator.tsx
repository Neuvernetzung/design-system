import cn from "classnames";
import type { ReactNode } from "react";

import { bgColors, paddingsSmallEvenly } from "../../../styles";
import { useThemeState } from "../../../theme";
import type { Color, Size } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { Text } from "../Typography";

export type IndicatorProps = {
  color?: Color;
  value?: string | number;
  size?: Size;
  children?: ReactNode;
  className?: string;
  wrapperClassName?: string;
};

const Indicator = ({
  color = "primary",
  value,
  size = "md",
  className,
  wrapperClassName,
  children,
}: IndicatorProps) => {
  const { adjustedTextColorState } = useThemeState();

  return (
    <div className={cn("relative", wrapperClassName)}>
      <span
        className={cn(
          "absolute flex items-center justify-center right-0 top-0 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none",
          !value && "aspect-square",
          bgColors[color],
          paddingsSmallEvenly[size],
          adjustedTextColorState[color],
          className
        )}
      >
        <Text color="inherit" size="xs">
          {value}
        </Text>
      </span>
      {children}
    </div>
  );
};

Indicator.displayName = "indicator";

export default typedMemo(Indicator);
