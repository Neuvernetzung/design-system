export const formatDateInputValue = (value?: Date) =>
  value ? new Date(value).toISOString().slice(0, 10) : "";

export const dateInputValueToDate = (value: string) => {
  if (value.length > 10) return new Date(value.slice(-10)); // Beim Input kann es vorkommen, dass für einen Sekundenbruchteil mehr als 11 Zeichen vorhanden sind, dies würde den Input brechen.
  if (value.length === 0) return; // Wenn Jahreszahl 4 Zeichen beträgt und eine "0" eingetragen wird, würde sonst kurzzeitig v === "" sein und somit auserrorn.

  return new Date(value);
};
