import { DragOverlay, useDroppable } from "@dnd-kit/core";
import { cn, dateInRange } from "@/utils";
import {
  addDays,
  compareAsc,
  endOfMonth,
  getDate,
  getWeek,
  isSameDay,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import isFunction from "lodash/isFunction";
import { useRef, useState } from "react";
import { getEventEnd, type VEvent } from "ts-ics";

import {
  bgColors,
  borders,
  divides,
  extendedBgColors,
  extendedBorders,
  gaps,
  gapsSmall,
  heights,
  paddingsSmallEvenly,
  paddingsXSmall,
  roundings,
  scrollbar,
} from "../../../../styles";
import { Button, IconButton } from "../../Button";
import { Text } from "../../Typography/Text";
import type { ScheduleProps } from "../";
import { DraggableEventSmall, DragOverlayEventSmall } from "../Event";
import type { UseEditEventProps } from "../Event/edit";
import { EventListModal } from "../Event/list";
import type { UseViewEventProps } from "../Event/view";
import {
  MonthGridDndContext,
  useMonthGridDraggable,
} from "../MonthGrid/dragAndDrop";
import { getThisDaysEvents, getThisMonthEvents } from "../utils/filterEvents";
import { IconPlus } from "@tabler/icons-react";
import { ScrollArea } from "../../ScrollArea";

export type ScheduleMonthViewProps = Omit<
  ScheduleProps,
  | "calendarProps"
  | "rowsEachHour"
  | "onDelete"
  | "onCreate"
  | "disableUpdate"
  | "disableDelete"
  | "viewEventProps"
  | "editEventProps"
  | "scheduleViewProps"
> &
  Required<Pick<ScheduleProps, "calendarProps">> & {
    viewEventProps?: UseViewEventProps;
    editEventProps?: UseEditEventProps;
  } & Partial<
    Pick<
      ScheduleProps,
      "viewEventProps" | "editEventProps" | "scheduleViewProps"
    >
  >;

export const ScheduleMonthView = ({
  scheduleViewProps,
  calendarProps,
  events,
  viewEventProps,
  editEventProps,
  eventColor,
  onUpdate,
  disabled,
  disableDrag,
  disableCreate,
}: ScheduleMonthViewProps) => {
  const { setViewing, viewing, calendar } = calendarProps;

  const { setCurrentView } = scheduleViewProps || {};

  const gridInnerRef = useRef<HTMLDivElement>(null);

  const eventsByRows = getThisMonthEvents(events || [], calendar);

  const { sensors, setActiveItem, activeItem } = useMonthGridDraggable();

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-7 ml-12 border divide-x divide-opacity-50 dark:divide-opacity-50",
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
      <ScrollArea className={cn("relative")}>
        <MonthGridDndContext
          onUpdate={onUpdate}
          sensors={sensors}
          setActiveItem={setActiveItem}
          events={events}
          disableDrag={disabled || disableDrag}
        >
          <div
            ref={gridInnerRef}
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
                      isInRange={dateInRange(
                        day,
                        startOfMonth(viewing),
                        endOfMonth(viewing)
                      )}
                      events={eventsByRows[i]}
                      scheduleViewProps={scheduleViewProps}
                      setViewing={setViewing}
                      viewEventProps={viewEventProps}
                      editEventProps={editEventProps}
                      eventColor={eventColor}
                      disableDrag={
                        disabled || !isFunction(onUpdate) || disableDrag
                      }
                      disableCreate={
                        disabled || !isFunction(onUpdate) || disableCreate
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <DragOverlay>
            {activeItem ? (
              <DragOverlayEventSmall
                event={events?.find((event) => event.uid === activeItem)}
              />
            ) : undefined}
          </DragOverlay>
        </MonthGridDndContext>
      </ScrollArea>
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

export type ScheduleMonthDay = Pick<
  ScheduleMonthViewProps,
  | "eventColor"
  | "disableDrag"
  | "disableCreate"
  | "editEventProps"
  | "scheduleViewProps"
> & {
  day: Date;
  isInRange?: boolean;
  events: VEvent[];
  setViewing?: (viewing: Date) => void;
  viewEventProps?: UseViewEventProps;
};

export const ScheduleMonthDay = ({
  day,
  isInRange,
  events,
  setViewing,
  scheduleViewProps,
  viewEventProps,
  eventColor,
  disableDrag,
  disableCreate,
  editEventProps,
}: ScheduleMonthDay) => {
  const { setCurrentView } = scheduleViewProps || {};

  const thisDaysEvents = getThisDaysEvents(events, day)
    .sort((a, b) => compareAsc(a.start.date, b.start.date))
    .map((event) => ({
      event,
      beginsBeforeThisDay: !isSameDay(event.start.date, day),
      endsAfterThisDay: !isSameDay(getEventEnd(event), day),
    }));

  const { isOver, setNodeRef } = useDroppable({ id: day.toISOString() });

  const [allEventsOpen, setAllEventsOpen] = useState<boolean>(false);

  return (
    <>
      <div
        onDoubleClick={() => {
          if (disableCreate) return;
          editEventProps?.setCreate(day);
        }}
        ref={setNodeRef}
        className={cn(
          "flex flex-col h-36 overflow-hidden group",
          gaps.xs,
          paddingsSmallEvenly.md,
          !isInRange ? extendedBgColors.subtile : bgColors.white
        )}
      >
        <div className="flex flex-row justify-between items-center">
          <div className={cn("flex flex-row", gaps.xs)}>
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
            {!disableCreate && editEventProps && (
              <IconButton
                ariaLabel="add_event"
                size="xs"
                variant="subtile"
                className="hidden group-hover:flex"
                icon={IconPlus}
                onClick={() => {
                  if (disableCreate) return;
                  editEventProps?.setCreate(day);
                }}
              />
            )}
          </div>
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
        <ScrollArea disableHorizontal>
          <ol
            className={cn(
              "flex flex-col overflow-y-hidden",
              gapsSmall.sm,
              scrollbar
            )}
          >
            {isOver && (
              <li
                className={cn(
                  "h-10 flex-shrink-0 w-full bg-opacity-20 border-2 border-dashed",
                  borders.primary,
                  roundings.md,
                  bgColors.primary
                )}
              />
            )}
            {thisDaysEvents.map(
              ({ event, beginsBeforeThisDay, endsAfterThisDay }, i) => (
                <DraggableEventSmall
                  key={`event_${event.summary}_${i}`}
                  beginsBeforeThisDay={beginsBeforeThisDay}
                  endsAfterThisDay={endsAfterThisDay}
                  event={event}
                  viewEventProps={viewEventProps}
                  color={eventColor}
                  disableDrag={disableDrag}
                />
              )
            )}
          </ol>
        </ScrollArea>
      </div>
      <EventListModal
        open={allEventsOpen}
        setOpen={setAllEventsOpen}
        events={thisDaysEvents}
        day={day}
        viewEventProps={viewEventProps}
        eventColor={eventColor}
      />
    </>
  );
};
