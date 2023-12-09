import { useMemo } from "react";

import type { SelectOptionProps, SelectOptionValueProps } from "../Option";
import type { SelectValue } from "../select";

export const useFlatSelectOptions = <TValue extends SelectValue = SelectValue>(
  options: SelectOptionProps<TValue>[]
) => useMemo(() => getFlatSelectOptions(options), [options]);

export const getFlatSelectOptions = <TValue extends SelectValue = SelectValue>(
  options: SelectOptionProps<TValue>[],
  result: number = 0
) => {
  const valueOptions: SelectOptionValueProps<TValue>[] = [];
  const indexedOptions: SelectOptionProps<TValue>[] = [];
  let newResult = result || 0;

  options.forEach((option) => {
    if (option.type === "group") {
      const groupOptions = getFlatSelectOptions(option.options, newResult);

      valueOptions.push(...groupOptions.valueOptions);
      indexedOptions.push({ ...option, options: groupOptions.indexedOptions });
      newResult = groupOptions.result;
    }

    if (option.type === "separator") {
      indexedOptions.push({ ...option });
    }

    if (option.type === "value" || option.type === undefined) {
      valueOptions.push(option);
      indexedOptions.push({ ...option, index: newResult });
      newResult += 1;
    }
  });

  return { valueOptions, indexedOptions, result: newResult };
};
