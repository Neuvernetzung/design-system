import isString from "lodash/isString";

export const parseLocalStorageJson = (localStorage: string | null) =>
  localStorage !== "undefined" &&
  isString(localStorage) &&
  JSON.parse(localStorage);
