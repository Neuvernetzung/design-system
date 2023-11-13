import { cn } from "@/utils";
import { setHours, setMinutes } from "date-fns";

import { bgColors, divides, paddingsXSmall } from "../../../../styles";
import { Text } from "../../Typography";
import type { ScheduleProps } from "..";

export type ScheduleDayGridProps = Pick<
  ScheduleProps,
  "displayDayTime" | "rowsEachHour"
>;

export const ScheduleDayGrid = ({
  rowsEachHour = 2,
  displayDayTime,
}: ScheduleDayGridProps) => {
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Date();

  return (
    <div
      className={cn(
        "relative h-full col-start-1 col-span-full row-start-1 row-span-full w-full divide-y divide-opacity-20 dark:divide-opacity-20 pointer-events-none",
        divides.accent,
        !displayDayTime && bgColors.white
      )}
      style={{
        gridTemplateRows: `repeat(${24 * rowsEachHour}, minmax(auto, 1fr))`,
      }}
    >
      {displayDayTime && (
        <div
          className={cn("absolute w-full", bgColors.white)}
          style={{
            top: `${(100 / 24) * displayDayTime.start}%`,
            height: `${
              (100 / 24) * (displayDayTime.end - displayDayTime.start)
            }%`,
          }}
        />
      )}
      {new Array(24 * rowsEachHour).fill(null).map((_, i) => (
        <div
          className={cn("h-12 w-full relative")}
          style={{ gridRowStart: i, gridRowEnd: i + 1 }}
          key={i}
        >
          {(i - 1) % rowsEachHour ? (
            <Text
              size="xs"
              color="subtile"
              className={cn(
                "absolute left-0 top-0 -translate-x-full",
                paddingsXSmall.md
              )}
            >
              {timeFormatter.format(
                setHours(setMinutes(date, 0), i / rowsEachHour)
              )}
            </Text>
          ) : null}
        </div>
      ))}
    </div>
  );
};
