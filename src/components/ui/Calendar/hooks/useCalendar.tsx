import {
  parseQueryAsArrayOf,
  parseQueryAsIsoDateTime,
  useUrlState,
} from "@/hooks";
import { useState } from "react";
import { weekDays } from "ts-ics";
import { UseCalendarBaseReturns, useCalendarBase } from "./useCalendarBase";
import { Day } from "date-fns";
import { clearTime } from "@/utils/date";

export type UseCalendar = typeof useCalendar;
export type UseCalendarProps = ReturnType<UseCalendar>;

export type UseCalendarOwnProps = {
  cols?: number;
  defaultValue?: Date[];
  initialViewing?: Date;
};

export type UseUrlCalendarReturns = UseCalendarBaseReturns;

export const useCalendar = (
  props?: UseCalendarOwnProps
): UseCalendarBaseReturns => {
  const [selected, setSelected] = useState<Date[]>(
    props?.defaultValue?.map(clearTime) || []
  );

  const [viewing, setViewing] = useState<Date>(
    props?.initialViewing || new Date()
  );

  const calendarProps = useCalendarBase({
    weekStartsOn: weekDays.indexOf("MO") as Day,
    numberOfMonths: props?.cols,
    selected,
    setSelected,
    viewing,
    setViewing,
  });

  return calendarProps;
};

export const useUrlCalendar = (
  props?: UseCalendarOwnProps
): UseUrlCalendarReturns => {
  const [selected, setSelected] = useUrlState("selected", {
    ...parseQueryAsArrayOf(parseQueryAsIsoDateTime),
    history: "replace",
    defaultValue: (props?.defaultValue || []).map((v) => clearTime(v)),
  });

  const [initialViewing] = useState(new Date()); // Muss mit useState verwendet werden, sonst rerendert defaultValue ewig bei useUrlState

  const [viewing, setViewing] = useUrlState("viewing", {
    ...parseQueryAsIsoDateTime,
    history: "replace",
    defaultValue: props?.initialViewing || initialViewing,
  });

  const calendarProps = useCalendarBase({
    viewing,
    setViewing,
    weekStartsOn: weekDays.indexOf("MO") as Day,
    numberOfMonths: props?.cols,
    selected,
    setSelected,
  });

  return calendarProps;
};
