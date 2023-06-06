import cn from "classnames";
import get from "lodash/get";
import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import { ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";

import {
  borders,
  divides,
  extendedBgColors,
  paddingsLarge,
  paddingsLargeEvenly,
  roundings,
} from "../../../styles";
import { Sizes } from "../../../types";
import { smallerSize } from "../../../utils";
import { typedMemo } from "../../../utils/internal";
import { Text } from "../Typography";

export type SimpleTableProps<T extends string> = {
  items?: Array<Partial<Record<T, any>>>;
  size?: keyof Sizes;
  cols: SimpleTableCol<T>[];
  divideX?: boolean;
  uppercase?: boolean;
  disableHead?: boolean;
  disabledBorder?: boolean;
  hasStripes?: boolean;
  divideY?: boolean;
};

export type SimpleTableCol<T> = {
  id: T;
  title?: string | ReactElement;
  grow?: boolean;
  shrink?: boolean;
  headCellClassName?: string;
  dataCellClassName?: string;
};

export const SimpleTableInner = <T extends string>({
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
              col={col}
              size={size}
              uppercase={uppercase}
              className={col.headCellClassName}
            />
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
              item={item}
              col={col}
              key={`row_${i}_col_${col.id}`}
              size={size}
              className={col.dataCellClassName}
            />
          ))}
        </TableRow>
      ))}
    </TableBody>
  </TableContainer>
);

export type TableDataCellProps = {
  item: Record<string, any>;
  col: SimpleTableCol<string>;
  size?: keyof Sizes;
  className?: string;
};

export const TableDataCell = ({
  item,
  col,
  size = "md",
  className,
}: TableDataCellProps) => {
  const content = get(item, col.id);

  return (
    <td
      className={cn(
        paddingsLarge[size],
        col.grow && "w-[999rem]", // w-full funktioniert hier nicht.
        col.shrink && "w-0",
        className
      )}
    >
      {isString(content) || isNumber(content) ? (
        <Text size={smallerSize(size)}>{content}</Text>
      ) : (
        (content as ReactNode)
      )}
    </td>
  );
};

export type TableRowProps = {
  divideX?: boolean;
  children: ReactNode;
  className?: string;
  hasStripes?: boolean;
  index?: number;
};

export const TableRow = forwardRef(
  (
    {
      divideX,
      children,
      className,
      hasStripes,
      index,
      ...props
    }: TableRowProps,
    ref: ForwardedRef<HTMLTableRowElement>
  ) => (
    <tr
      className={cn(
        divideX && "divide-x",
        divides.accent,
        hasStripes && index && index % 2 && extendedBgColors.subtile,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </tr>
  )
);

TableRow.displayName = "TableRow";

export type TableBodyProps = {
  children: ReactNode;
  divideY?: boolean;
};

export const TableBody = ({ divideY = true, children }: TableBodyProps) => (
  <tbody className={cn(divideY && "divide-y", divides.accent)}>
    {children}
  </tbody>
);

export type TableHeadCellProps = {
  col: SimpleTableCol<string>;
  size?: keyof Sizes;
  attachment?: ReactNode;
  uppercase?: boolean;
  className?: string;
};

export const TableHeadCell = ({
  col,
  size = "md",
  attachment,
  uppercase = true,
  className,
}: TableHeadCellProps) => {
  const Component = col.title ? "th" : "td";

  return (
    <Component
      className={cn(
        "group",
        paddingsLargeEvenly[size],
        col.grow && "w-[999rem]", // w-full funktioniert hier nicht.
        col.shrink && "w-0",
        className
      )}
    >
      <div className="flex flex-row gap-1 items-center">
        <Text
          className={cn("font-medium", uppercase && "uppercase")}
          size={smallerSize(size)}
        >
          {col.title}
        </Text>
        {attachment}
      </div>
    </Component>
  );
};

export type TableHeadProps = {
  children: ReactNode;
};

export const TableHead = ({ children }: TableHeadProps) => (
  <thead className={cn("text-left", extendedBgColors.filledSubtile)}>
    {children}
  </thead>
);

export type TableContainerProps = {
  size?: keyof Sizes;
  children: ReactNode;
  disabledBorder?: boolean;
  divideY?: boolean;
};

export const TableContainer = ({
  size = "md",
  disabledBorder,
  divideY = true,
  children,
}: TableContainerProps) => (
  <div
    className={cn(
      "overflow-x-auto relative",
      !disabledBorder && "border",
      !disabledBorder && borders.accent,
      roundings[size]
    )}
  >
    <table
      className={cn("table-auto w-full", divideY && "divide-y", divides.accent)}
    >
      {children}
    </table>
  </div>
);

export const SimpleTable = typedMemo(SimpleTableInner);
