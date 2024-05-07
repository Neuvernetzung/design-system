import { Day, type Returns as LiliusReturns, useLilius } from "use-lilius";

import {
  parseQueryAsArrayOf,
  parseQueryAsIsoDateTime,
  useUrlState,
} from "@/hooks";
import type { Dispatch, SetStateAction } from "react";

export type UseCalendar = typeof useCalendar;
export type UseCalendarProps = ReturnType<UseCalendar>;

export type UseCalendarOwnProps = {
  cols?: number;
  defaultValue?: Date[];
  initialView?: Date;
};

export const useCalendar = (props?: UseCalendarOwnProps): LiliusReturns =>
  useLilius({
    weekStartsOn: Day.MONDAY,
    numberOfMonths: props?.cols,
    selected: props?.defaultValue,
    viewing: props?.initialView,
  });

export type UseUrlCalendarReturns = Omit<
  LiliusReturns,
  "setSelected" | "setViewing"
> & {
  setSelected: Dispatch<SetStateAction<Date[]>>;
  setViewing: Dispatch<SetStateAction<Date>>;
};

export const useUrlCalendar = (
  props?: UseCalendarOwnProps
): UseUrlCalendarReturns => {
  const calendarProps = useLilius({
    weekStartsOn: Day.MONDAY,
    numberOfMonths: props?.cols,
  });

  const [selected, setSelected] = useUrlState("selected", {
    ...parseQueryAsArrayOf(parseQueryAsIsoDateTime),
    history: "replace",
    defaultValue: (props?.defaultValue || []).map((v) =>
      calendarProps.clearTime(v)
    ),
  });

  const [viewing, setViewing] = useUrlState("viewing", {
    ...parseQueryAsIsoDateTime,
    history: "replace",
    defaultValue: props?.initialView || new Date(),
  });

  return {
    ...calendarProps,
    selected,
    setSelected,
    viewing,
    setViewing,
  };
};
