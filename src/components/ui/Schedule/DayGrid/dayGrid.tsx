import { setHours, setMinutes } from "date-fns";
import { useState } from "react";

import { cn } from "@/utils";

import { bgColors, divides, paddingsXSmall } from "../../../../styles";
import { Text } from "../../Typography";
import type { ScheduleProps } from "..";
import { timeStringToHours } from "../utils/time";

export type ScheduleDayGridProps = Pick<
  ScheduleProps,
  "rowsEachHour" | "showWorkHours"
> & {
  workHours?: ScheduleWorkHours;
};

const timeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
});

const DEFAULT_ROWS_EACH_HOUR = 2;

export const ScheduleDayGrid = ({
  rowsEachHour = DEFAULT_ROWS_EACH_HOUR,
  workHours,
  showWorkHours,
}: ScheduleDayGridProps) => (
  <div
    className={cn(
      "relative h-full col-start-1 col-span-full row-start-1 row-span-full w-full divide-y divide-opacity-20 dark:divide-opacity-20 pointer-events-none",
      divides.accent,
      !showWorkHours && bgColors.white
    )}
    style={{
      gridTemplateRows: `repeat(${24 * rowsEachHour}, minmax(auto, 1fr))`,
    }}
  >
    {showWorkHours && <DisplayWorkHours workHours={workHours} />}
    <DayGrid rowsEachHour={rowsEachHour} />
  </div>
);

export type ScheduleWeekGridProps = ScheduleDayGridProps & {
  dayOfWeek: number;
};

export const ScheduleWeekGrid = ({
  rowsEachHour = DEFAULT_ROWS_EACH_HOUR,
  workHours,
  dayOfWeek,
  showWorkHours,
}: ScheduleWeekGridProps) => (
  <div
    className={cn(
      "relative h-full col-span-1 row-start-1 row-span-full w-full divide-y divide-opacity-20 dark:divide-opacity-20 pointer-events-none",
      divides.accent,
      !showWorkHours && bgColors.white
    )}
    style={{
      gridTemplateRows: `repeat(${24 * rowsEachHour}, minmax(auto, 1fr))`,
      gridColumnStart: dayOfWeek ?? 1,
    }}
  >
    {showWorkHours && <DisplayWorkHours workHours={workHours} />}
    <DayGrid rowsEachHour={rowsEachHour} hideTime={(dayOfWeek ?? 1) !== 1} />
  </div>
);

export type ScheduleWorkHour = {
  start: string;
  end: string;
};

export type ScheduleWorkHours = ScheduleWorkHour[];

type DisplayWorkHourProps = {
  workHours?: ScheduleWorkHours;
};

const DisplayWorkHours = ({ workHours }: DisplayWorkHourProps) => {
  if (!workHours || workHours.length === 0) return null;

  return workHours.map((workHour, i) => {
    const start = timeStringToHours(workHour.start);
    const end = timeStringToHours(workHour.end);

    return (
      <div
        key={`workHour_${i}`}
        className={cn("absolute w-full", bgColors.white)}
        style={{
          top: `${(100 / 24) * start}%`,
          height: `${(100 / 24) * (end - start)}%`,
        }}
      />
    );
  });
};

type DayGridProps = Pick<ScheduleProps, "rowsEachHour"> & {
  hideTime?: boolean;
};

const DayGrid = ({
  rowsEachHour = DEFAULT_ROWS_EACH_HOUR,
  hideTime,
}: DayGridProps) => {
  const [date] = useState(new Date());

  return new Array(24 * rowsEachHour).fill(null).map((_, i) => (
    <div
      className={cn("h-12 w-full relative")}
      style={{ gridRowStart: i, gridRowEnd: i + 1 }}
      key={i}
    >
      {!hideTime && (i - 1) % rowsEachHour ? (
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
  ));
};
