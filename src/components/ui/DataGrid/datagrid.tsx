import cn from "classnames";
import get from "lodash/get";
import { memo } from "react";
import {
  borders,
  divides,
  extendedBgColors,
  paddingsEvenly,
  roundings,
} from "../../../styles";
import { Sizes } from "../../../types";
import { Text } from "../Typography";

export type DataGridProps = {
  items: Array<unknown>;
  cols: string[];
  size?: keyof Sizes;
};

export const DataGrid = ({ items, cols, size = "md" }: DataGridProps) => (
  <div
    className={cn(
      "overflow-x-auto relative border",
      borders.accent,
      roundings[size]
    )}
  >
    <table className={cn("table-auto w-full divide-y", divides.accent)}>
      <thead className={cn("text-left", extendedBgColors.filledSubtile)}>
        <tr>
          {cols.map((col) => (
            <th key={`head_col_${col}`} className={cn(paddingsEvenly[size])}>
              <Text size={size}>{col}</Text>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cn("divide-y", divides.accent)}>
        {items.map((item, i) => (
          <tr key={`row_${i}`}>
            {cols.map((col) => (
              <td
                key={`row_${i}_col_${col}`}
                className={cn(paddingsEvenly[size])}
              >
                <Text size={size}>{get(item, col)}</Text>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default memo(DataGrid);
