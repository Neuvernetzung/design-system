import cn from "classnames";
import { addDays, getHours, getMinutes, isToday, subDays } from "date-fns";
import { useRef } from "react";

import {
  bgColors,
  borders,
  extendedBgColors,
  extendedBorders,
  gapsXSmall,
  heights,
  paddingsXSmall,
  paddingsYSmall,
  scrollbar,
} from "../../../../styles";
import { Text } from "../../Typography";
import type { ScheduleProps } from ".";
import { layoutDayEvents, ScheduleDayGrid } from "./DayGrid";
import { Event } from "./Event";
import { ScheduleHeader, type ScheduleHeaderProps } from "./header";
import { useScrollToTime } from "./hooks/useScrollToTime";
import { getThisDaysEvents } from "./utils/filterEvents";
import { titleFormatter } from "./utils/formatTitle";

export type ScheduleDayViewProps = Omit<ScheduleProps, "calendarProps"> &
  Required<Pick<ScheduleProps, "calendarProps">> &
  Pick<ScheduleHeaderProps, "currentView" | "setCurrentView"> & {
    precisionInMinutes?: number;
  };

export const ScheduleDayView = ({
  currentView,
  setCurrentView,
  calendarProps,
  events,
  rowsEachHour = 2,
  precisionInMinutes = 5,
}: ScheduleDayViewProps) => {
  const { setViewing, viewing } = calendarProps;

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridInnerRef = useRef<HTMLDivElement>(null);

  useScrollToTime({ gridContainerRef, gridInnerRef });

  return (
    <>
      <ScheduleHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
        calendarProps={calendarProps}
        leftAriaLabel="previous_day"
        leftArrowFunction={() => setViewing(subDays(viewing, 1))}
        rightAriaLabel="next_day"
        rightArrowFunction={() => setViewing(addDays(viewing, 1))}
        title={titleFormatter.format(viewing)}
      />
      <div
        ref={gridContainerRef}
        className={cn("overflow-y-scroll relative", scrollbar)}
      >
        <div
          className={cn(
            "sticky z-[1] top-0 grid grid-cols-1 ml-12 border divide-x divide-opacity-50 dark:divide-opacity-50",
            extendedBorders.filled
          )}
        >
          <DayScheduleHead day={viewing} />
        </div>
        <div
          ref={gridInnerRef}
          className={cn(
            "grid grid-cols-1 grid-rows-1 ml-12 border",
            extendedBgColors.subtile,
            extendedBorders.filled
          )}
        >
          <ScheduleDayGrid rowsEachHour={rowsEachHour} />
          <ScheduleDay
            events={events}
            day={viewing}
            precisionInMinutes={precisionInMinutes}
          />
        </div>
      </div>
    </>
  );
};

export type DayScheduleHeadProps = { day: Date };

export const DayScheduleHead = ({ day }: DayScheduleHeadProps) => {
  const dayTitleFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const today = isToday(day);

  return (
    <div
      className={cn(
        "flex justify-center items-center",
        bgColors.white,
        heights.md
      )}
    >
      <Text color={today ? "primary" : "accent"} size="sm">
        {dayTitleFormatter.format(day)}
      </Text>
    </div>
  );
};

export type ScheduleDayProps = Pick<
  ScheduleDayViewProps,
  "events" | "precisionInMinutes"
> & {
  dayOfWeek?: number;
  day: Date;
};

export const ScheduleDay = ({
  events,
  precisionInMinutes,
  day,
  dayOfWeek,
}: ScheduleDayProps) => {
  const { layout, rows } = layoutDayEvents(
    getThisDaysEvents(events || [], day),
    day,
    {
      return: "columns",
      precisionInMinutes,
    }
  );

  return (
    <ol
      className={cn(
        "grid col-span-1 row-span-1 row-start-1 relative",
        paddingsXSmall.md,
        gapsXSmall.md
      )}
      style={{
        gridColumnStart: dayOfWeek ?? 1,
        gridTemplateRows: `repeat(${rows}, minmax(0px, 1fr)) auto`,
        gridTemplateColumns: `repeat(auto, minmax(0px, 1fr))`,
      }}
    >
      {isToday(day) ? (
        <span
          className={cn("absolute w-full h-px", bgColors.primary)}
          style={{
            top: `${
              (100 / 24) * (getHours(new Date()) + getMinutes(new Date()) / 60)
            }%`,
          }}
        >
          <span
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 h-2 w-2 border rounded-full",
              bgColors.white,
              borders.primary
            )}
          />
        </span>
      ) : null}
      {layout.map(
        (
          { event, width, start, end, beginsBeforeThisDay, endsAfterThisDay },
          i
        ) => (
          <li
            key={`${event.uid}-${i}`}
            className={cn(
              "w-full",
              paddingsYSmall.md,
              beginsBeforeThisDay && "!pt-0",
              endsAfterThisDay && "!pb-0"
            )}
            style={{
              gridRowStart: start,
              gridRowEnd: end,
              gridColumn: `span ${width}`,
            }}
          >
            <Event
              beginsBeforeThisDay={beginsBeforeThisDay}
              endsAfterThisDay={endsAfterThisDay}
              event={event}
            />
          </li>
        )
      )}
    </ol>
  );
};
