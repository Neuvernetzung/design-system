import cn from "classnames";
import { addDays, addWeeks, endOfWeek, startOfWeek, subWeeks } from "date-fns";
import { useRef } from "react";

import {
  divides,
  extendedBgColors,
  extendedBorders,
  scrollbar,
} from "../../../../styles";
import type { ScheduleProps } from ".";
import { DayScheduleHead, ScheduleDay } from "./day";
import { ScheduleDayGrid } from "./DayGrid";
import { ScheduleHeader, type ScheduleHeaderProps } from "./header";
import { useScrollToTime } from "./hooks/useScrollToTime";
import { getThisWeeksEvents } from "./utils/filterEvents";
import { formatTitle } from "./utils/formatTitle";

export type ScheduleWeekViewProps = Omit<ScheduleProps, "calendarProps"> &
  Required<Pick<ScheduleProps, "calendarProps">> &
  Pick<ScheduleHeaderProps, "currentView" | "setCurrentView"> & {
    precisionInMinutes?: number;
  };

export const ScheduleWeekView = ({
  currentView,
  setCurrentView,
  calendarProps,
  events,
  rowsEachHour = 2,
  precisionInMinutes = 5,
}: ScheduleWeekViewProps) => {
  const { setViewing, viewing } = calendarProps;

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridInnerRef = useRef<HTMLDivElement>(null);

  const thisWeeksEvents = getThisWeeksEvents(events || [], viewing);

  useScrollToTime({ gridContainerRef, gridInnerRef });

  return (
    <>
      <ScheduleHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
        calendarProps={calendarProps}
        leftAriaLabel="previous_week"
        leftArrowFunction={() => setViewing(subWeeks(viewing, 1))}
        rightAriaLabel="next_week"
        rightArrowFunction={() => setViewing(addWeeks(viewing, 1))}
        title={formatTitle(
          startOfWeek(viewing, { weekStartsOn: 1 }),
          endOfWeek(viewing, { weekStartsOn: 1 })
        )}
      />

      <div
        ref={gridContainerRef}
        className={cn("overflow-y-scroll relative", scrollbar)}
      >
        <div
          className={cn(
            "sticky z-[1] top-0 grid grid-cols-7 ml-12 border divide-x divide-opacity-50 dark:divide-opacity-50",
            extendedBorders.filled,
            divides.accent
          )}
        >
          {new Array(7).fill(null).map((_, i) => (
            <DayScheduleHead
              key={`week_day_head_${i}`}
              day={addDays(startOfWeek(viewing, { weekStartsOn: 1 }), i)}
            />
          ))}
        </div>
        <div
          ref={gridInnerRef}
          className={cn(
            "grid grid-cols-7 auto-rows-auto ml-12 border",
            extendedBgColors.subtile,
            extendedBorders.filled
          )}
        >
          <ScheduleDayGrid rowsEachHour={rowsEachHour} />

          {new Array(7).fill(null).map((_, i) => (
            <ScheduleDay
              key={`week_day_${i}`}
              dayOfWeek={i + 1}
              events={thisWeeksEvents}
              day={addDays(startOfWeek(viewing, { weekStartsOn: 1 }), i)}
              precisionInMinutes={precisionInMinutes}
            />
          ))}
        </div>
      </div>
    </>
  );
};
