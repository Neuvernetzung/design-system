import { isSameDay } from "date-fns";
import { getEventEnd, type VEvent } from "ts-ics";

export const getThisDaysEvents = (events: VEvent[], day: Date) =>
  events.filter(
    (event) =>
      isSameDay(event.start.date, day) || isSameDay(getEventEnd(event), day)
  ) || [];
