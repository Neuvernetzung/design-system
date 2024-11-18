import {
  areIntervalsOverlapping,
  getHours,
  getMinutes,
  isAfter,
  isBefore,
  isSameDay,
} from "date-fns";
import { useMemo } from "react";
import { getEventEnd, type VEvent } from "ts-ics";

type DayLayout = {
  event: VEvent;
  width: number;
  left: number;
  start: number;
  height: number;
  end: number;
  beginsBeforeThisDay?: boolean;
  endsAfterThisDay?: boolean;
  isReverse?: boolean;
};

type DayLayoutWithoutTime = Pick<DayLayout, "event" | "width" | "left">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const dayLayoutReturnTypes = ["columns", "percent"] as const;
type DayLayoutReturnTypes = typeof dayLayoutReturnTypes;
type DayLayoutReturnType = DayLayoutReturnTypes[number];

type DayLayoutEventOptionProps = {
  return: DayLayoutReturnType;
  precisionInMinutes?: number;
};

const intervalOverlapping = (a: VEvent, b: VEvent) =>
  areIntervalsOverlapping(
    { start: a.start.date, end: getEventEnd(a) },
    { start: b.start.date, end: getEventEnd(b) }
  );

export const DEFAULT_PRECISION_IN_MINUTES = 15;

export const calcDayRows = (options?: DayLayoutEventOptionProps) =>
  options?.return === "columns"
    ? totalRows(options?.precisionInMinutes || DEFAULT_PRECISION_IN_MINUTES)
    : 1;

export const useLayoutDayEvents = (
  events: VEvent[],
  day: Date,
  options?: DayLayoutEventOptionProps
) =>
  useMemo(() => {
    const layout: DayLayoutWithoutTime[] = [];
    let highestColumns = 0;

    let columns: DayLayoutWithoutTime[][] = [];

    let lastEventEnding: Date | null = null;

    // Sort it by starting time, and then by ending time.
    const sortedEvents = events.sort((a, b) => {
      if (a.start.date < b.start.date) return -1;
      if (a.start.date > b.start.date) return 1;
      if (getEventEnd(a) < getEventEnd(b)) return -1;
      if (getEventEnd(a) > getEventEnd(b)) return 1;
      return 0;
    });

    // Iterate over the sorted array
    sortedEvents.forEach((currentEvent) => {
      if (
        lastEventEnding !== null &&
        !isBefore(currentEvent.start.date, lastEventEnding)
      ) {
        layout.push(...packEvents(columns).flat());
        if (columns.length > highestColumns) highestColumns = columns.length;
        columns = [];
        lastEventEnding = null;
      }

      let placed = false;
      for (let i = 0; i < columns.length; i += 1) {
        const col = columns[i];
        if (!intervalOverlapping(col[col.length - 1]?.event, currentEvent)) {
          col.push({ event: currentEvent, width: 1, left: 0 });
          placed = true;
          break;
        }
      }

      if (!placed) {
        columns.push([{ event: currentEvent, width: 1, left: 0 }]);
      }

      if (
        lastEventEnding === null ||
        isAfter(getEventEnd(currentEvent), lastEventEnding)
      ) {
        lastEventEnding = getEventEnd(currentEvent);
      }
    });

    if (columns.length > 0) {
      layout.push(...packEvents(columns).flat());
      if (columns.length > highestColumns) highestColumns = columns.length;
    }

    const finalLayout = layout
      .map((item) => setStartAndEndOfEvent(item, day, highestColumns, options))
      .filter((e) => e.height !== 0); // Wenn ein Event um 0 Uhr Endet oder started, dann kommt Layout durcheinander.

    return finalLayout;
  }, [events, day, options]);

const packEvents = (columns: DayLayoutWithoutTime[][]) => {
  const n = columns.length;
  return columns.map((col, i) =>
    col.map((item) => ({
      ...item,
      left: i / n,
      width: 1 / n,
    }))
  );
};

const HOURS_A_DAY = 24;

const totalRows = (precisionInMinutes: number) =>
  HOURS_A_DAY * (60 / precisionInMinutes);

const calcRow = (timeInHours: number, options?: DayLayoutEventOptionProps) =>
  options?.return === "columns"
    ? Math.ceil(
        Math.min(timeInHours, HOURS_A_DAY) *
          (60 / (options?.precisionInMinutes || DEFAULT_PRECISION_IN_MINUTES))
      ) + 1
    : (1 / HOURS_A_DAY) * Math.min(timeInHours, HOURS_A_DAY);

const setStartAndEndOfEvent = (
  { event, width, left }: DayLayoutWithoutTime,
  day: Date,
  highestColumns: number,
  options?: DayLayoutEventOptionProps
): DayLayout => {
  const isReverse = event.start.date > getEventEnd(event);

  const beginsBeforeThisDay = !isSameDay(event.start.date, day);
  const startTime = beginsBeforeThisDay
    ? isReverse
      ? HOURS_A_DAY
      : 0
    : getHours(event.start.date) + getMinutes(event.start.date) / 60;

  const endDate = getEventEnd(event);

  const endsAfterThisDay = !isSameDay(endDate, day);
  const endTime = endsAfterThisDay
    ? isReverse
      ? 0
      : HOURS_A_DAY
    : getHours(endDate) + getMinutes(endDate) / 60;

  const start = calcRow(startTime, options);

  const end = calcRow(endTime, options);

  return {
    width: options?.return === "columns" ? width * highestColumns : width,
    left: options?.return === "columns" ? left * highestColumns : left,
    event,
    start,
    end,
    height: end - start,
    beginsBeforeThisDay,
    endsAfterThisDay,
    isReverse,
  };
};
