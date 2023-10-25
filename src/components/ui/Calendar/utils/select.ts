import { compareAsc, eachDayOfInterval, isSameDay } from "date-fns";

import type { UseCalendarProps } from "../hooks";

export type CalendarSelectProps = {
  day: Date;
  calendarProps: UseCalendarProps;
} & CalendarSelectPropsUnion;

export type CalendarSelectPropsUnion = {
  [K in CalendarSelectType]: {
    selectType: K;
    onChange?: (value: CalendarSelectOnChange[K]) => void;
  };
}[CalendarSelectType];

export type CalendarSelectOnChange = {
  single: Date;
  multiple: Date[];
  range: Date[];
};

export const calendarSelectTypes = ["single", "multiple", "range"] as const;

export type CalendarSelectTypes = typeof calendarSelectTypes;
export type CalendarSelectType = CalendarSelectTypes[number];

export const calendarSelect = ({
  day,
  selectType,
  calendarProps,
  onChange,
}: CalendarSelectProps) => {
  const { toggle, select, selected, isSelected, deselect, selectRange } =
    calendarProps;

  if (selectType === "single") {
    toggle(day, true);
    onChange?.(day);
  }

  if (selectType === "multiple") {
    toggle(day);
    if (isSelected(day)) {
      onChange?.(
        [...selected.filter((v) => !isSameDay(v, day))].sort(compareAsc)
      );
    } else {
      onChange?.([...selected, day].sort(compareAsc));
    }
  }

  if (selectType === "range") {
    const sorted = selected.sort(compareAsc);

    if (sorted.length === 0) {
      select(day);
      return;
    }
    if (sorted.length === 1) {
      if (isSelected(day)) {
        deselect(day);
        onChange?.([]);
        return;
      }
      if (day < sorted[0]) {
        selectRange(day, sorted[0], true);
        onChange?.([day, sorted[0]]);
      } else {
        selectRange(sorted[0], day, true);
        onChange?.([sorted[0], day]);
        return;
      }
    }

    if (isSelected(day)) {
      const range = eachDayOfInterval({ start: sorted[0], end: day });
      const diff = sorted.filter((d) =>
        range.map((a) => a.getTime()).includes(d.getTime())
      );

      selectRange(diff[0], diff[diff.length - 1], true);
      onChange?.([diff[0], diff[diff.length - 1]]);
    } else if (day < sorted[0]) {
      selectRange(day, sorted[sorted.length - 1], true);
      onChange?.([day, sorted[sorted.length - 1]]);
    } else {
      selectRange(sorted[0], day, true);
      onChange?.([sorted[0], day]);
    }
  }
};
