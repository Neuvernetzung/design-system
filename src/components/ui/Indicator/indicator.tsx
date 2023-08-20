import cn from "classnames";
import { ReactNode } from "react";

import { bgColors, paddingsSmall } from "../../../styles";
import { useThemeState } from "../../../theme";
import { Colors } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { Text } from "../Typography";

export type IndicatorProps = {
  color?: keyof Colors;
  value?: string | number;
  children: ReactNode;
};

const Indicator = ({ color = "primary", value, children }: IndicatorProps) => {
  const { adjustedTextColorState } = useThemeState();

  return (
    <div className="relative">
      <span
        className={cn(
          "absolute flex items-center justify-center right-0 top-0 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none",

          !value && "aspect-square",
          bgColors[color],
          paddingsSmall.sm,
          adjustedTextColorState[color]
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
