import { isEqual } from "date-fns";

export const isBetweenRange = (
  day: Date,
  selected: Date[],
  isSelected: (value: Date) => boolean
) =>
  isSelected(day) &&
  !isEqual(day, selected[0]) &&
  !isEqual(day, selected[selected.length - 1]);

export const isRangeStart = (
  day: Date,
  selected: Date[],
  isSelected: (value: Date) => boolean
) => isSelected(day) && !isEqual(day, selected[selected.length - 1]);

export const isRangeEnd = (
  day: Date,
  selected: Date[],
  isSelected: (value: Date) => boolean
) => isSelected(day) && !isEqual(day, selected[0]);
