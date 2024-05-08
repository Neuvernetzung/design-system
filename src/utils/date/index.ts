import { isAfter, isBefore, isEqual, set } from "date-fns";

export const dateInRange = (date: Date, min: Date, max: Date) =>
  (isEqual(date, min) || isAfter(date, min)) &&
  (isEqual(date, max) || isBefore(date, max));

export const clearTime = (date: Date) =>
  set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
