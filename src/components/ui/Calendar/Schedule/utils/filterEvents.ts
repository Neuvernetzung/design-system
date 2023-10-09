import { isSameDay, isSameWeek, isWithinInterval } from "date-fns";
import { getEventEnd, type VEvent } from "ts-ics";

export const getThisDaysEvents = (events: VEvent[], dayDate: Date) =>
  events.filter(
    (event) =>
      isSameDay(event.start.date, dayDate) ||
      isSameDay(getEventEnd(event), dayDate) ||
      isWithinInterval(dayDate, {
        start: event.start.date,
        end: getEventEnd(event),
      })
  ) || [];

export const getThisWeeksEvents = (events: VEvent[], weekDate: Date) =>
  events.filter(
    (event) =>
      isSameWeek(event.start.date, weekDate, { weekStartsOn: 1 }) ||
      isSameWeek(getEventEnd(event), weekDate, { weekStartsOn: 1 }) ||
      isWithinInterval(weekDate, {
        start: event.start.date,
        end: getEventEnd(event),
      })
  ) || [];

export const getThisMonthEvents = (events: VEvent[], calendar: Date[][][]) =>
  calendar[0].map((row) => getThisWeeksEvents(events, row[0]));
