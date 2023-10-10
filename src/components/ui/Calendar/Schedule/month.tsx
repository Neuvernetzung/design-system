import cn from "classnames";
import {
  addDays,
  addMonths,
  compareAsc,
  endOfMonth,
  getDate,
  getWeek,
  isSameDay,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import isFunction from "lodash/isFunction";
import { useState } from "react";
import { getEventEnd, type VEvent } from "ts-ics";

import {
  bgColors,
  divides,
  extendedBgColors,
  extendedBorders,
  gaps,
  gapsSmall,
  heights,
  paddingsSmallEvenly,
  paddingsXSmall,
  scrollbar,
} from "../../../../styles";
import { Button } from "../../Button";
import { Text } from "../../Typography";
import type { ScheduleProps } from ".";
import { EventSmall } from "./Event";
import { ScheduleHeader, type ScheduleHeaderProps } from "./header";
import { getThisDaysEvents, getThisMonthEvents } from "./utils/filterEvents";
import { formatTitle } from "./utils/formatTitle";
import type { UseViewEventProps } from "./Event/view";
import { EventListModal } from "./Event/list";
import type { UseEditEventProps } from "./Event/edit";

export type ScheduleMonthViewProps = Omit<
  ScheduleProps,
  "calendarProps" | "rowsEachHour" | "onDelete" | "onUpdate" | "onCreate"
> &
  Required<Pick<ScheduleProps, "calendarProps">> &
  Pick<ScheduleHeaderProps, "currentView" | "setCurrentView"> & {
    viewEventProps?: UseViewEventProps;
    editEventProps?: UseEditEventProps;
  };

export const ScheduleMonthView = ({
  currentView,
  setCurrentView,
  calendarProps,
  events,
  viewEventProps,
  editEventProps,
}: ScheduleMonthViewProps) => {
  const { setViewing, viewing, calendar, inRange } = calendarProps;

  const eventsByRows = getThisMonthEvents(events || [], calendar);

  return (
    <>
      <ScheduleHeader
        currentView={currentView}
        setCurrentView={setCurrentView}
        calendarProps={calendarProps}
        leftAriaLabel="previous_week"
        leftArrowFunction={() => setViewing(subMonths(viewing, 1))}
        rightAriaLabel="next_week"
        rightArrowFunction={() => setViewing(addMonths(viewing, 1))}
        title={formatTitle(startOfMonth(viewing), endOfMonth(viewing))}
        editEventProps={editEventProps}
      />
      <div className={cn("overflow-y-scroll relative", scrollbar)}>
        <div
          className={cn(
            "sticky z-[1] top-0 grid grid-cols-7 ml-12 border divide-x divide-opacity-50 dark:divide-opacity-50",
            extendedBorders.filled,
            divides.accent
          )}
        >
          {new Array(7).fill(null).map((_, i) => (
            <MonthScheduleHead
              key={`week_day_head_${i}`}
              day={addDays(startOfWeek(viewing, { weekStartsOn: 1 }), i)}
            />
          ))}
        </div>
        <div
          className={cn(
            "grid grid-cols-1 ml-12 border-x border-b divide-y divide-opacity-50 dark:divide-opacity-50",
            divides.accent,
            extendedBorders.filled
          )}
        >
          {calendar[0].map((row, i) => (
            <div className="relative" key={`month_week_${i}`}>
              {isFunction(setCurrentView) ? (
                <Button
                  size="xs"
                  color="subtile"
                  variant="ghost"
                  onClick={() => {
                    setCurrentView?.("week");
                  }}
                  className={cn(
                    "absolute left-0 top-0 -translate-x-full",
                    paddingsXSmall.md
                  )}
                >
                  {getWeek(row[0])}
                </Button>
              ) : (
                <Text
                  size="xs"
                  color="subtile"
                  className={cn(
                    "absolute left-0 top-0 -translate-x-full",
                    paddingsXSmall.md
                  )}
                >
                  {getWeek(row[0])}
                </Text>
              )}
              <div
                className={cn(
                  "grid grid-cols-7 relative h-full divide-x divide-opacity-50 dark:divide-opacity-50",
                  divides.accent
                )}
              >
                {row.map((day, j) => (
                  <ScheduleMonthDay
                    key={`month_week_${i}_day_${j}`}
                    day={day}
                    isInRange={inRange(
                      day,
                      startOfMonth(viewing),
                      endOfMonth(viewing)
                    )}
                    events={eventsByRows[i]}
                    setCurrentView={setCurrentView}
                    setViewing={setViewing}
                    viewEventProps={viewEventProps}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export type MonthScheduleHeadProps = { day: Date };

export const MonthScheduleHead = ({ day }: MonthScheduleHeadProps) => {
  const dayTitleFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
  });

  return (
    <div
      className={cn(
        "flex justify-center items-center",
        bgColors.white,
        heights.md
      )}
    >
      <Text size="sm">{dayTitleFormatter.format(day)}</Text>
    </div>
  );
};

export type ScheduleMonthDay = {
  day: Date;
  isInRange?: boolean;
  events: VEvent[];
  setViewing?: (viewing: Date) => void;
  viewEventProps?: UseViewEventProps;
} & Pick<ScheduleHeaderProps, "setCurrentView">;

export const ScheduleMonthDay = ({
  day,
  isInRange,
  events,
  setViewing,
  setCurrentView,
  viewEventProps,
}: ScheduleMonthDay) => {
  const thisDaysEvents = getThisDaysEvents(events, day)
    .sort((a, b) => compareAsc(a.start.date, b.start.date))
    .map((event) => ({
      event,
      beginsBeforeThisDay: !isSameDay(event.start.date, day),
      endsAfterThisDay: !isSameDay(getEventEnd(event), day),
    }));

  const [allEventsOpen, setAllEventsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className={cn(
          "h-full flex flex-col aspect-video overflow-hidden",
          gaps.xs,
          paddingsSmallEvenly.md,
          !isInRange ? extendedBgColors.subtile : bgColors.white
        )}
      >
        <div className="flex flex-row justify-between items-center">
          {thisDaysEvents.length > 0 && (
            <Button
              size="xs"
              variant="subtile"
              onClick={() => {
                setAllEventsOpen(true);
              }}
              aria-label={`open_modal_${day}`}
            >
              {thisDaysEvents.length}
            </Button>
          )}
          {isFunction(setCurrentView) ? (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setCurrentView("day");
                setViewing?.(day);
              }}
              color={
                isToday(day) ? "primary" : !isInRange ? "subtile" : "accent"
              }
            >
              {getDate(day)}
            </Button>
          ) : (
            <Text
              size="sm"
              color={
                isToday(day) ? "primary" : !isInRange ? "subtile" : "accent"
              }
            >
              {getDate(day)}
            </Text>
          )}
        </div>
        <div
          className={cn(
            "flex flex-col overflow-y-hidden hover:overflow-y-auto overflow-x-hidden",
            gapsSmall.sm,
            scrollbar
          )}
        >
          {thisDaysEvents.map(
            ({ event, beginsBeforeThisDay, endsAfterThisDay }, i) => (
              <EventSmall
                key={`event_${event.summary}_${i}`}
                beginsBeforeThisDay={beginsBeforeThisDay}
                endsAfterThisDay={endsAfterThisDay}
                event={event}
                viewEventProps={viewEventProps}
              />
            )
          )}
        </div>
      </div>
      <EventListModal
        open={allEventsOpen}
        setOpen={setAllEventsOpen}
        events={thisDaysEvents}
        day={day}
        viewEventProps={viewEventProps}
      />
    </>
  );
};
