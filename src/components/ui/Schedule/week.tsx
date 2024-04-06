import { DragOverlay } from "@dnd-kit/core";
import { addDays, addWeeks, endOfWeek, startOfWeek, subWeeks } from "date-fns";
import isFunction from "lodash/isFunction";
import { useRef } from "react";
import { weekDays } from "ts-ics";

import { cn } from "@/utils";

import { divides, extendedBgColors, extendedBorders } from "../../../styles";
import { ScrollArea } from "../ScrollArea";
import type { ScheduleDayViewProps, ScheduleProps } from ".";
import { DayScheduleHead, ScheduleDay } from "./day";
import { calcDayRows, ScheduleWeekGrid } from "./DayGrid";
import { DayGridDndContext, useDayGridDraggable } from "./DayGrid/dragAndDrop";
import { DragOverlayEvent } from "./Event";
import { ScheduleHeader } from "./header";
import { useScrollToTime } from "./hooks/useScrollToTime";
import { getThisWeeksEvents } from "./utils/filterEvents";
import { formatTitle } from "./utils/formatTitle";

export type ScheduleWeekViewProps = ScheduleDayViewProps &
  Pick<ScheduleProps, "currentWeekWorkHours">;

export const ScheduleWeekView = ({
  scheduleViewProps,
  calendarProps,
  events,
  rowsEachHour = 2,
  precisionInMinutes = 5,
  showWorkHours,
  currentDayWorkHours,
  currentWeekWorkHours,
  viewEventProps,
  editEventProps,
  onUpdate,
  onCreate,
  disabled,
  disableDrag,
  disableCreate,
}: ScheduleWeekViewProps) => {
  const { setViewing, viewing } = calendarProps;

  const gridContainerRef = useRef<HTMLDivElement>(null);
  const gridInnerRef = useRef<HTMLDivElement>(null);

  const thisWeeksEvents = getThisWeeksEvents(events || [], viewing);

  useScrollToTime({ gridContainerRef, gridInnerRef });

  const rows = calcDayRows({
    return: "columns",
    precisionInMinutes,
  });

  const cols = 7;

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

  return (
    <>
      <ScheduleHeader
        scheduleViewProps={scheduleViewProps}
        calendarProps={calendarProps}
        leftAriaLabel="previous_week"
        leftArrowFunction={() => setViewing(subWeeks(viewing, 1))}
        rightAriaLabel="next_week"
        rightArrowFunction={() => setViewing(addWeeks(viewing, 1))}
        title={formatTitle(
          startOfWeek(viewing, { weekStartsOn: 1 }),
          endOfWeek(viewing, { weekStartsOn: 1 })
        )}
        editEventProps={editEventProps}
        disableCreate={disabled || !isFunction(onCreate) || disableCreate}
      />
      <div
        className={cn(
          "grid grid-cols-7 ml-12 border divide-x divide-opacity-50 dark:divide-opacity-50",
          extendedBorders.filled,
          divides.accent
        )}
      >
        {new Array(7).fill(null).map((_, i) => (
          <DayScheduleHead
            scheduleViewProps={scheduleViewProps}
            setViewing={setViewing}
            key={`week_day_head_${i}`}
            day={addDays(startOfWeek(viewing, { weekStartsOn: 1 }), i)}
          />
        ))}
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
              "grid grid-cols-7 auto-rows-auto ml-12 border-x border-b divide-x divide-opacity-20 dark:divide-opacity-20",
              extendedBgColors.subtile,
              extendedBorders.filled,
              divides.accent
            )}
          >
            {new Array(7).fill(null).map((_, i) => (
              <>
                <ScheduleWeekGrid
                  rowsEachHour={rowsEachHour}
                  workHours={
                    currentWeekWorkHours
                      ? currentWeekWorkHours?.[weekDays[i + 1]]
                      : currentDayWorkHours
                  }
                  dayOfWeek={i + 1}
                  showWorkHours={showWorkHours}
                />
                <ScheduleDay
                  key={`week_day_${i}`}
                  dayOfWeek={i + 1}
                  events={thisWeeksEvents}
                  day={addDays(startOfWeek(viewing, { weekStartsOn: 1 }), i)}
                  precisionInMinutes={precisionInMinutes}
                  viewEventProps={viewEventProps}
                  rows={rows}
                  disableDrag={disabled || !isFunction(onUpdate) || disableDrag}
                  disableCreate={
                    disabled || !isFunction(onCreate) || disableCreate
                  }
                  editEventProps={editEventProps}
                />
              </>
            ))}
          </div>
          <DragOverlay>
            {activeItem ? (
              <DragOverlayEvent
                innerHeight={innerHeight}
                innerWidth={innerWidth}
                precisionInMinutes={precisionInMinutes}
                event={events?.find((event) => event.uid === activeItem)}
                delta={transformDelta}
                cols={cols}
              />
            ) : undefined}
          </DragOverlay>
        </DayGridDndContext>
      </ScrollArea>
    </>
  );
};
