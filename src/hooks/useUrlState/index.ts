import {
  createParser,
  parseAsArrayOf,
  parseAsBoolean,
  parseAsFloat,
  parseAsHex,
  parseAsInteger,
  parseAsIsoDateTime,
  parseAsJson,
  parseAsString,
  parseAsStringEnum,
  parseAsTimestamp,
  useQueryState as useNuqs,
  type UseQueryStateOptions,
} from "nuqs";
import { useEffect, useState } from "react";

export {
  parseAsArrayOf as parseQueryAsArrayOf,
  parseAsBoolean as parseQueryAsBoolean,
  parseAsFloat as parseQueryAsFloat,
  parseAsHex as parseQueryAsHex,
  parseAsInteger as parseQueryAsInteger,
  parseAsIsoDateTime as parseQueryAsIsoDateTime,
  parseAsJson as parseQueryAsJson,
  parseAsString as parseQueryAsString,
  parseAsStringEnum as parseQueryAsStringEnum,
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

  return [state, setQueryState] as [T, typeof setQueryState];
};

export function parseQueryAsStringConst<Const extends string>(
  validValues: readonly Const[]
) {
  return createParser({
    parse: (query: string) => {
      const asConst = query as unknown as Const;
      if (validValues.includes(asConst)) {
        return asConst;
      }
      return null;
    },
    serialize: (value: Const) => value.toString(),
  });
}
