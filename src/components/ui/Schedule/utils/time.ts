export const timeStringToHours = (time: string) => {
  const [hours, minutes] = time.split(":");

  return Number(hours || 0) + Number(minutes || 0) / 60;
};
