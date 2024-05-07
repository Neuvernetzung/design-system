import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsHex,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsJson,
  parseAsNumberLiteral,
  parseAsString,
  parseAsStringEnum,
  parseAsStringLiteral,
  parseAsTimestamp,
  useQueryState as useNuqs,
  type UseQueryStateOptions,
} from "nuqs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export {
  parseAsArrayOf as parseQueryAsArrayOf,
  parseAsBoolean as parseQueryAsBoolean,
  parseAsFloat as parseQueryAsFloat,
  parseAsHex as parseQueryAsHex,
  parseAsInteger as parseQueryAsInteger,
  parseAsIsoDateTime as parseQueryAsIsoDateTime,
  parseAsJson as parseQueryAsJson,
  parseAsNumberLiteral as parseQueryAsNumberLiteral,
  parseAsString as parseQueryAsString,
  parseAsStringEnum as parseQueryAsStringEnum,
  parseAsStringLiteral as parseQueryAsStringLiteral,
  parseAsTimestamp as parseQueryAsTimestamp,
};

export const useUrlState = <T = string>(
  key: string,
  options: UseQueryStateOptions<T> & { defaultValue?: T } = {
    parse: (v) => v as unknown as T,
    serialize: String,
  }
) => {
  const [queryState, setQueryState] = useNuqs<T>(key, options);

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const state = isFirstRender ? options?.defaultValue : queryState || undefined;

  return [state, setQueryState] as [T, Dispatch<SetStateAction<T>>];
};
