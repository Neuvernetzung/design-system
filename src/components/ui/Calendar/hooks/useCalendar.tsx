import { Day, useLilius } from "use-lilius";

export type UseCalendar = typeof useCalendar;
export type UseCalendarProps = ReturnType<UseCalendar>;

type UseCalendarOwnProps = { cols?: number };

export const useCalendar = (props?: UseCalendarOwnProps) =>
  useLilius({ weekStartsOn: Day.MONDAY, numberOfMonths: props?.cols });
