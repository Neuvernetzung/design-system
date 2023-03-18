import cn from "classnames";

import { bgColors, extendedBgColors, roundingsSmall } from "../../../styles";
import { Colors, Sizes } from "../../../types";
import { smallerSize } from "../../../utils";

type ProgressBarProps = {
  size?: keyof Sizes;
  color?: keyof Colors;
  progress: number;
};

const progressBarHeights: Sizes = {
  xs: "h-0.5",
  sm: "h-1",
  md: "h-2",
  lg: "h-3",
  xl: "h-5",
};

export const ProgressBar = ({
  size = "md",
  color = "primary",
  progress,
}: ProgressBarProps) => (
  <div
    className={cn(
      "w-full overflow-hidden",
      progressBarHeights[size],
      roundingsSmall[smallerSize(size)],
      extendedBgColors.filledSubtile
    )}
  >
    <div
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={progress}
      aria-label="progress-bar"
      role="progressbar"
      className={cn("h-full transition-all", bgColors[color])}
      style={{ width: `${progress}%` }}
    />
  </div>
);
