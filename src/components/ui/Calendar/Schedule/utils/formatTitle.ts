import { isSameMonth, isSameYear } from "date-fns";

const dayFormatter = new Intl.DateTimeFormat(undefined, { day: "numeric" });

const dayAndMonthFormatter = new Intl.DateTimeFormat(undefined, {
  day: "numeric",
  month: "long",
});

export const titleFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "long",
});

export const formatTitle = (start: Date, end: Date) => {
  const formattedEnd = titleFormatter.format(end);

  const formattedStart = isSameMonth(start, end)
    ? dayFormatter.format(start)
    : isSameYear(start, end)
    ? dayAndMonthFormatter.format(start)
    : titleFormatter.format(start);

  return `${formattedStart} - ${formattedEnd}`;
};
