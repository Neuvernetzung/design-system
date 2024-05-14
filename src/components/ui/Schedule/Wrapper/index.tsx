import { divides, gaps, paddingsEvenly } from "@/styles";
import { cn } from "@/utils";
import { ScheduleProps } from "..";
import { Calendar } from "../../Calendar";
import { isThisDaysEvent } from "../utils/filterEvents";
import { isSameMonth, isSameYear } from "date-fns";
import { getEventEnd } from "ts-ics";
import { ReactNode } from "react";

export type ScheduleWrapperProps = Pick<
  ScheduleProps,
  "className" | "hideSideCalendar" | "calendarProps" | "events"
> & { children: ReactNode };

export const ScheduleWrapper = ({
  calendarProps,
  className,
  hideSideCalendar,
  events = [],
  children,
}: ScheduleWrapperProps) => {
  const { setViewing } = calendarProps;

  return (
    <div
      className={cn(
        "flex flex-row lg:divide-x",
        gaps.xs,
        divides.accent,
        className
      )}
    >
      {!hideSideCalendar && (
        <div className="w-64 hidden lg:block">
          <Calendar
            onChange={setViewing}
            calendarProps={calendarProps}
            dayHasIndicator={(day) =>
              events.some((e) =>
                isThisDaysEvent(e.start.date, getEventEnd(e), day)
              )
            }
            monthHasIndicator={(month) =>
              events.some((e) => isSameMonth(e.start.date, month))
            }
            yearHasIndicator={(year) =>
              events.some((e) => isSameYear(e.start.date, year))
            }
          />
        </div>
      )}
      <div
        className={cn("flex flex-col w-full max-h-[80vh]", paddingsEvenly.md)}
      >
        {children}
      </div>
    </div>
  );
};
