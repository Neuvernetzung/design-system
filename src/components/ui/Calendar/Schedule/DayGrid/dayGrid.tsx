import cn from "classnames";
import { setHours, setMinutes } from "date-fns";

import { divides, paddingsXSmall } from "../../../../../styles";
import { Text } from "../../../Typography";

export type ScheduleDayGridProps = { rowsEachHour?: number };

export const ScheduleDayGrid = ({ rowsEachHour = 2 }: ScheduleDayGridProps) => {
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
  });

  const date = new Date();

  return (
    <div
      className={cn(
        "h-full col-start-1 col-span-full row-start-1 row-span-full w-full divide-y divide-opacity-20 dark:divide-opacity-20 pointer-events-none",
        divides.accent
      )}
      style={{
        gridTemplateRows: `repeat(${24 * rowsEachHour}, minmax(auto, 1fr))`,
      }}
    >
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
