import { DragOverlay } from "@dnd-kit/core";
import { getHours, getMinutes, isToday, setHours } from "date-fns";
import isFunction from "lodash/isFunction";
import { MouseEvent, useRef } from "react";

import { cn } from "@/utils";

import {
  bgColors,
  borders,
  extendedBgColors,
  extendedBorders,
  gapsXSmall,
  heights,
  paddingsXSmall,
  paddingsYSmall,
} from "../../../../styles";
import { Color } from "../../../../types";
import { Button } from "../../Button";
import { ScrollArea } from "../../ScrollArea";
import { Text } from "../../Typography/Text";
import type { ScheduleProps } from "../";
import {
  calcDayRows,
  DEFAULT_PRECISION_IN_MINUTES,
  ScheduleDayGrid,
  useLayoutDayEvents,
} from "../DayGrid";
import { DayGridDndContext, useDayGridDraggable } from "../DayGrid/dragAndDrop";
import { DraggableEvent, DragOverlayEvent } from "../Event";
import type { UseViewEventProps } from "../Event/view";
import { useScrollToTime } from "../hooks/useScrollToTime";
import { getThisDaysEvents } from "../utils/filterEvents";

export type ScheduleDayViewProps = Omit<
  ScheduleProps,
  | "calendarProps"
  | "onDelete"
  | "disableUpdate"
  | "disableDelete"
  | "viewEventProps"
  | "editEventProps"
  | "scheduleViewProps"
  | "currentWeekWorkHours"
> &
  Required<Pick<ScheduleProps, "calendarProps">> &
  Partial<
    Pick<
      ScheduleProps,
      "viewEventProps" | "editEventProps" | "scheduleViewProps"
    >
  > & {
    precisionInMinutes?: number;
  };

export const ScheduleDayView = ({
  scheduleViewProps,
  calendarProps,
  events,
  rowsEachHour = 2,
  precisionInMinutes = DEFAULT_PRECISION_IN_MINUTES,
  showWorkHours,
  currentDayWorkHours,
  viewEventProps,
  editEventProps,
  eventColor,
  onUpdate,
  onCreate,
  disabled,
  disableDrag,
  disableCreate,
}: ScheduleDayViewProps) => {
  const { viewing } = calendarProps;

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridInnerRef = useRef<HTMLDivElement>(null);

  const rows = calcDayRows({
    return: "columns",
    precisionInMinutes,
  });

  const cols = 1;

  const {
    innerHeight,
    modifiers,
    sensors,
    setActiveItem,
    innerWidth,
    activeItem,
    setTransformDelta,
    transformDelta,
  } = useDayGridDraggable({
    gridInnerRef,
    cols,
    rows,
  });

  useScrollToTime({ gridContainerRef, gridInnerRef });

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 border ml-12 divide-x divide-opacity-50 dark:divide-opacity-50",
          extendedBorders.filled
        )}
      >
        <DayScheduleHead day={viewing} scheduleViewProps={scheduleViewProps} />
      </div>
      <ScrollArea ref={gridContainerRef} className={cn("relative")}>
        <DayGridDndContext
          innerHeight={innerHeight}
          modifiers={modifiers}
          sensors={sensors}
          setActiveItem={setActiveItem}
          innerWidth={innerWidth}
          precisionInMinutes={precisionInMinutes}
          onUpdate={onUpdate}
          events={events}
          setTransformDelta={setTransformDelta}
          cols={cols}
          disableDrag={disabled || disableDrag}
        >
          <div
            ref={gridInnerRef}
            className={cn(
              "grid grid-cols-1 grid-rows-1 ml-12 border-x border-b",
              extendedBgColors.subtile,
              extendedBorders.filled
            )}
          >
            <ScheduleDayGrid
              rowsEachHour={rowsEachHour}
              workHours={currentDayWorkHours}
              showWorkHours={showWorkHours}
            />
            <ScheduleDay
              events={events}
              day={viewing}
              precisionInMinutes={precisionInMinutes}
              viewEventProps={viewEventProps}
              eventColor={eventColor}
              rows={rows}
              disableDrag={disabled || !isFunction(onUpdate) || disableDrag}
              disableCreate={disabled || !isFunction(onCreate) || disableCreate}
              editEventProps={editEventProps}
            />
          </div>
          <DragOverlay>
            {activeItem ? (
              <DragOverlayEvent
                innerHeight={innerHeight}
                innerWidth={innerWidth}
                cols={cols}
                precisionInMinutes={precisionInMinutes}
                event={events?.find((event) => event.uid === activeItem)}
                delta={transformDelta}
              />
            ) : undefined}
          </DragOverlay>
        </DayGridDndContext>
      </ScrollArea>
    </>
  );
};

export type DayScheduleHeadProps = {
  day: Date;
  setViewing?: (viewing: Date) => void;
} & Partial<Pick<ScheduleProps, "scheduleViewProps">>;

export const DayScheduleHead = ({
  day,
  scheduleViewProps,
  setViewing,
}: DayScheduleHeadProps) => {
  const { setCurrentView } = scheduleViewProps || {};

  const dayTitleFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const today = isToday(day);

  return (
    <div
      className={cn(
        "relative flex justify-center items-center",
        bgColors.white,
        heights.md
      )}
    >
      {isFunction(setCurrentView) ? (
        <Button
          onClick={() => {
            setCurrentView?.("day");
            setViewing?.(day);
          }}
          variant="ghost"
          color={today ? "primary" : "accent"}
          size="sm"
        >
          {dayTitleFormatter.format(day)}
        </Button>
      ) : (
        <Text color={today ? "primary" : "accent"} size="sm">
          {dayTitleFormatter.format(day)}
        </Text>
      )}
    </div>
  );
};

export type ScheduleDayProps = Pick<
  ScheduleDayViewProps,
  | "events"
  | "precisionInMinutes"
  | "disableDrag"
  | "disableCreate"
  | "editEventProps"
> & {
  dayOfWeek?: number;
  day: Date;
  viewEventProps?: UseViewEventProps;
  eventColor?: Color;
  rows: number;
};

export const ScheduleDay = ({
  events,
  precisionInMinutes,
  day,
  dayOfWeek,
  viewEventProps,
  eventColor,
  rows,
  disableDrag,
  disableCreate,
  editEventProps,
}: ScheduleDayProps) => {
  const layout = useLayoutDayEvents(getThisDaysEvents(events || [], day), day, {
    return: "columns",
    precisionInMinutes,
  });

  return (
    <div
      className="col-span-1 row-span-1 row-start-1 relative"
      style={{ gridColumnStart: dayOfWeek ?? 1 }}
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
      <ol
        onDoubleClick={(e: MouseEvent<HTMLOListElement>) => {
          if (disableCreate) return;
          const rect = e.currentTarget.getBoundingClientRect();
          const y = e.clientY - rect.top; //y position within the element.
          const hours = Math.min(Math.max((1 / rect.height) * y * 24, 0), 24); // Muss nicht gerundet werden, da setHours nur volle Stunde setzt.

          editEventProps?.setCreate(setHours(day, hours));
        }}
        className={cn("grid h-full", paddingsXSmall.md, gapsXSmall.md)}
        style={{
          gridTemplateRows: `repeat(${rows}, minmax(0px, 1fr)) auto`,
          gridTemplateColumns: `repeat(auto, minmax(0px, 1fr))`,
        }}
      >
        {layout.map(
          (
            {
              event,
              width,
              start,
              end,
              beginsBeforeThisDay,
              endsAfterThisDay,
              isReverse,
            },
            i
          ) => (
            <li
              key={`${event.uid}-${i}`}
              className={cn(
                "w-full truncate",
                paddingsYSmall.md,
                beginsBeforeThisDay && (isReverse ? "!pb-0" : "!pt-0"),
                endsAfterThisDay && (isReverse ? "!pt-0" : "!pb-0")
              )}
              style={{
                gridRowStart: start,
                gridRowEnd: end,
                gridColumn: `span ${width}`,
              }}
            >
              <DraggableEvent
                beginsBeforeThisDay={beginsBeforeThisDay}
                endsAfterThisDay={endsAfterThisDay}
                isReverse={isReverse}
                event={event}
                viewEventProps={viewEventProps}
                color={eventColor}
                disableDrag={disableDrag}
              />
            </li>
          )
        )}
      </ol>
    </div>
  );
};
