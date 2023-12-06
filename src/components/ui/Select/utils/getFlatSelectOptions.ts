import { useMemo } from "react";

import type { SelectOptionProps, SelectOptionValueProps } from "../Option";

export const useFlatSelectOptions = (options: SelectOptionProps[]) =>
  useMemo(() => getFlatSelectOptions(options), [options]);

export const getFlatSelectOptions = (
  options: SelectOptionProps[],
  result: number = 0
) => {
  const valueOptions: SelectOptionValueProps[] = [];
  const indexedOptions: SelectOptionProps[] = [];
  let newResult = result || 0;

  options.forEach((option) => {
    if (option.type === "group") {
      const groupOptions = getFlatSelectOptions(option.options, newResult);

      valueOptions.push(...groupOptions.valueOptions);
      indexedOptions.push({ ...option, options: groupOptions.indexedOptions });
      newResult = groupOptions.result;
    }

    if (option.type === "value" || option.type === undefined) {
      valueOptions.push(option);
      indexedOptions.push({ ...option, index: newResult });
      newResult += 1;
    }
  });

  return { valueOptions, indexedOptions, result: newResult };
};
