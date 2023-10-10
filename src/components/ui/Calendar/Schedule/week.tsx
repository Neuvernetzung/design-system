import cn from "classnames";
import { addDays, addWeeks, endOfWeek, startOfWeek, subWeeks } from "date-fns";
import { useRef } from "react";

import {
  divides,
  extendedBgColors,
  extendedBorders,
  scrollbar,
} from "../../../../styles";
import type { ScheduleDayViewProps } from ".";
import { DayScheduleHead, ScheduleDay } from "./day";
import { ScheduleDayGrid, calcDayRows } from "./DayGrid";
import { ScheduleHeader } from "./header";
import { useScrollToTime } from "./hooks/useScrollToTime";
import { getThisWeeksEvents } from "./utils/filterEvents";
import { formatTitle } from "./utils/formatTitle";
import { DayGridDndContext, useDayGridDraggable } from "./DayGrid/dragAndDrop";
import { DragOverlay } from "@dnd-kit/core";
import { DragOverlayEvent } from "./Event";

export type ScheduleWeekViewProps = ScheduleDayViewProps;

export const ScheduleWeekView = ({
  currentView,
  setCurrentView,
  calendarProps,
  events,
  rowsEachHour = 2,
  precisionInMinutes = 5,
  displayDayTime,
  viewEventProps,
  editEventProps,
  onUpdate,
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
        editEventProps={editEventProps}
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
              setCurrentView={setCurrentView}
              setViewing={setViewing}
              key={`week_day_head_${i}`}
              day={addDays(startOfWeek(viewing, { weekStartsOn: 1 }), i)}
            />
          ))}
        </div>
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
        >
          <div
            ref={gridInnerRef}
            className={cn(
              "grid grid-cols-7 auto-rows-auto ml-12 border-x border-b",
              extendedBgColors.subtile,
              extendedBorders.filled
            )}
          >
            <ScheduleDayGrid
              rowsEachHour={rowsEachHour}
              displayDayTime={displayDayTime}
            />

            {new Array(7).fill(null).map((_, i) => (
              <ScheduleDay
                key={`week_day_${i}`}
                dayOfWeek={i + 1}
                events={thisWeeksEvents}
                day={addDays(startOfWeek(viewing, { weekStartsOn: 1 }), i)}
                precisionInMinutes={precisionInMinutes}
                viewEventProps={viewEventProps}
                rows={rows}
              />
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
      </div>
    </>
  );
};
