import { isSameDay, isSameWeek } from "date-fns";
import { getEventEnd, type VEvent } from "ts-ics";

export const getThisDaysEvents = (events: VEvent[], dayDate: Date) =>
  events.filter(
    (event) =>
      isSameDay(event.start.date, dayDate) ||
      isSameDay(getEventEnd(event), dayDate)
  ) || [];

export const getThisWeeksEvents = (events: VEvent[], weekDate: Date) =>
  events.filter(
    (event) =>
      isSameWeek(event.start.date, weekDate, { weekStartsOn: 1 }) ||
      isSameWeek(getEventEnd(event), weekDate, { weekStartsOn: 1 })
  ) || [];
