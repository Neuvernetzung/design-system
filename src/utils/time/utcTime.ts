import {
  addMinutes,
  getHours,
  getMinutes,
  setHours,
  setMinutes,
  subMinutes,
} from "date-fns";

export const utcTimeToLocal = (
  time: string | undefined,
  offset: number
): string | undefined => {
  if (!time) return time;
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

export const localTimeToUtc = (
  time: string | undefined | null,
  offset: number
): string | undefined | null => {
  if (!time) return time;
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
