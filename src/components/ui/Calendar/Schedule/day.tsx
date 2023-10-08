import cn from "classnames";
import { addDays, getHours, getMinutes, isToday, subDays } from "date-fns";
import { useRef } from "react";

import {
  bgColors,
  borders,
  extendedBgColors,
  extendedBorders,
  gapsXSmall,
  paddingsXSmall,
  paddingsYSmall,
  scrollbar,
} from "../../../../styles";
import type { ScheduleProps } from ".";
import { layoutDayEvents, ScheduleDayGrid } from "./DayGrid";
import { Event } from "./Event";
import { ScheduleHeader, type ScheduleHeaderProps } from "./header";
import { useScrollToTime } from "./hooks/useScrollToTime";
import { getThisDaysEvents } from "./utils/filterEvents";

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

  const titleFormatter = new Intl.DateTimeFormat(undefined, {
    dateStyle: "full",
  });

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
        className={cn("overflow-y-scroll", scrollbar)}
      >
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
            calendarProps={calendarProps}
            precisionInMinutes={precisionInMinutes}
          />
        </div>
      </div>
    </>
  );
};

export type ScheduleDayProps = Pick<
  ScheduleDayViewProps,
  "calendarProps" | "events" | "precisionInMinutes"
>;

export const ScheduleDay = ({
  calendarProps,
  events,
  precisionInMinutes,
}: ScheduleDayProps) => {
  const { viewing } = calendarProps;

  const { layout, rows } = layoutDayEvents(
    getThisDaysEvents(events || [], viewing),
    viewing,
    {
      return: "columns",
      precisionInMinutes,
    }
  );

  return (
    <ol
      className={cn(
        "grid col-start-1 col-span-1 row-span-1 row-start-1 relative",
        paddingsXSmall.md,
        gapsXSmall.md
      )}
      style={{
        gridTemplateRows: `repeat(${rows}, minmax(0px, 1fr)) auto`,
        gridTemplateColumns: `repeat(auto, minmax(0px, 1fr))`,
      }}
    >
      {isToday(viewing) ? (
        <span
          className={cn("absolute w-full h-px", bgColors.primary)}
          style={{
            top: `${
              (100 / 24) * (getHours(viewing) + getMinutes(viewing) / 60)
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
