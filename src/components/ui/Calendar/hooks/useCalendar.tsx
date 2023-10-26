import { Day, useLilius } from "use-lilius";

export type UseCalendar = typeof useCalendar;
export type UseCalendarProps = ReturnType<UseCalendar>;

export type UseCalendarOwnProps = {
  cols?: number;
  defaultValue?: Date[];
  initialView?: Date;
};

export const useCalendar = (props?: UseCalendarOwnProps) =>
  useLilius({
    weekStartsOn: Day.MONDAY,
    numberOfMonths: props?.cols,
    selected: props?.defaultValue,
    viewing: props?.initialView,
  });
