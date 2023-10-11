import { Day, useLilius } from "use-lilius";

export type UseCalendar = typeof useCalendar;
export type UseCalendarProps = ReturnType<UseCalendar>;

export const useCalendar = () => useLilius({ weekStartsOn: Day.MONDAY });
