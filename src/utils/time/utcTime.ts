import {
  addMinutes,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  subMinutes,
} from "date-fns";

export const utcDateToLocal = (date: Date, offset: number) => {
  const time = `${getHours(date)}:${getMinutes(date)}`;
  const utcTime = utcTimeToLocal(time, offset);

  const [hours, minutes] = utcTime.split(":");
  return setHours(setMinutes(date, Number(minutes)), Number(hours));
};

export const utcTimeToLocal = (time: string, offset: number): string => {
  const [h, m] = time.split(":");

  const localDate = subMinutes(
    setHours(setMinutes(new Date(), Number(m)), Number(h)),
    offset
  );

  const hours = getHours(localDate);
  const minutes = getMinutes(localDate);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

export const localDateToUtc = (date: Date, offset: number) => {
  const time = `${getHours(date)}:${getMinutes(date)}`;
  const utcTime = localTimeToUtc(time, offset);

  const [hours, minutes] = utcTime.split(":");
  return setHours(setMinutes(date, Number(minutes)), Number(hours));
};

export const localTimeToUtc = (time: string, offset: number): string => {
  const [h, m] = time.split(":");

  const utcDate = addMinutes(
    setHours(setMinutes(new Date(), Number(m)), Number(h)),
    offset
  );

  const hours = getHours(utcDate);
  const minutes = getMinutes(utcDate);

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};
