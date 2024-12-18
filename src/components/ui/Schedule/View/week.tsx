import { DragOverlay } from "@dnd-kit/core";
import { addDays, startOfWeek } from "date-fns";
import isFunction from "lodash/isFunction";
import { useRef } from "react";
import { weekDays } from "ts-ics";

import { cn } from "@/utils";

import { divides, extendedBgColors, extendedBorders } from "../../../../styles";
import { ScrollArea } from "../../ScrollArea";
import type { ScheduleProps } from "../";
import { DayScheduleHead, ScheduleDay, ScheduleDayViewProps } from "./day";
import {
  calcDayRows,
  DEFAULT_PRECISION_IN_MINUTES,
  ScheduleWeekGrid,
} from "../DayGrid";
import { DayGridDndContext, useDayGridDraggable } from "../DayGrid/dragAndDrop";
import { DragOverlayEvent } from "../Event";
import { useScrollToTime } from "../hooks/useScrollToTime";
import { getThisWeeksEvents } from "../utils/filterEvents";

export type ScheduleWeekViewProps = ScheduleDayViewProps &
  Pick<ScheduleProps, "currentWeekWorkHours">;

export const ScheduleWeekView = ({
  scheduleViewProps,
  calendarProps,
  events,
  rowsEachHour = 2,
  precisionInMinutes = DEFAULT_PRECISION_IN_MINUTES,
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
                  key={`week_day_${i}_grid`}
                  rowsEachHour={rowsEachHour}
                  workHours={
                    currentWeekWorkHours
                      ? currentWeekWorkHours?.[weekDays[(i + 1) % 7]] // %7 da Index 7 bei einem Array von einer länge 7 nicht erfasst werden kann, maximal 6
                      : currentDayWorkHours
                  }
                  dayOfWeek={i + 1}
                  showWorkHours={showWorkHours}
                />
                <ScheduleDay
                  key={`week_day_${i}_day`}
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
                  gridHeight={innerHeight}
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
