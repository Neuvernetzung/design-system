import get from "lodash/get";
import { ReactElement } from "react";

import { Size } from "@/types";

import {
  TableBody,
  type TableBodyOptions,
  type TableCellProps,
  TableContainer,
  type TableContainerOptions,
  TableDataCell,
  TableHead,
  TableHeadCell,
  type TableHeadOptions,
  TableRow,
  type TableRowOptions,
} from "./components";

export type SimpleTableProps<T extends string> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items?: Array<Partial<Record<T, any>>>;
  size?: Size;
  cols: SimpleTableCol<T>[];
  disableHead?: boolean;
  disabledBorder?: boolean;
  divideY?: boolean;
} & TableContainerOptions &
  TableBodyOptions &
  TableRowOptions &
  TableHeadOptions;

export type SimpleTableCol<T> = {
  id: T;
  title?: string | ReactElement;

  headCellClassName?: string;
  dataCellClassName?: string;
} & TableCellProps;

export const SimpleTable = <T extends string>({
  items = [],
  cols,
  size = "md",
  divideX,
  uppercase = true,
  disableHead = false,
  disabledBorder = false,
  hasStripes = false,
  divideY = true,
}: SimpleTableProps<T>) => (
  <TableContainer disabledBorder={disabledBorder} size={size} divideY={divideY}>
    {!disableHead && (
      <TableHead>
        <TableRow divideX={divideX}>
          {cols.map((col) => (
            <TableHeadCell
              key={`head_col_${col.id}`}
              grow={col.grow}
              shrink={col.shrink}
              size={size}
              uppercase={uppercase}
              className={col.headCellClassName}
            >
              {col.title}
            </TableHeadCell>
          ))}
        </TableRow>
      </TableHead>
    )}
    <TableBody divideY={divideY}>
      {items.map((item, i) => (
        <TableRow
          divideX={divideX}
          key={`row_${i}`}
          index={i}
          hasStripes={hasStripes}
        >
          {cols.map((col) => (
            <TableDataCell
              grow={col.grow}
              shrink={col.shrink}
              key={`row_${i}_col_${col.id}`}
              size={size}
              className={col.dataCellClassName}
            >
              {get(item, col.id)}
            </TableDataCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </TableContainer>
);
