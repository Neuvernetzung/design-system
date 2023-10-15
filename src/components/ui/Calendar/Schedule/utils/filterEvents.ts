import { isSameDay, isSameWeek, isWithinInterval } from "date-fns";
import { getEventEnd, type VEvent } from "ts-ics";

export const getThisDaysEvents = (events: VEvent[], dayDate: Date) =>
  events.filter((event) => {
    const start = event.start.date;
    const end = getEventEnd(event);

    return (
      isSameDay(start, dayDate) ||
      isSameDay(end, dayDate) ||
      isWithinInterval(dayDate, {
        start: start > end ? end : start,
        end: end < start ? start : end,
      })
    );
  }) || [];

export const getThisWeeksEvents = (events: VEvent[], weekDate: Date) =>
  events.filter((event) => {
    const start = event.start.date;
    const end = getEventEnd(event);

    return (
      isSameWeek(start, weekDate, { weekStartsOn: 1 }) ||
      isSameWeek(end, weekDate, { weekStartsOn: 1 }) ||
      isWithinInterval(weekDate, {
        start: start > end ? end : start,
        end: end < start ? start : end,
      })
    );
  }) || [];

export const getThisMonthEvents = (events: VEvent[], calendar: Date[][][]) =>
  calendar[0].map((row) => getThisWeeksEvents(events, row[0]));
