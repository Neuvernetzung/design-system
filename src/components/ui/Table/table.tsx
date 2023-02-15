import cn from "classnames";
import get from "lodash/get";
import isString from "lodash/isString";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

import {
  borders,
  divides,
  extendedBgColors,
  paddingsEvenly,
  roundings,
  transition,
} from "../../../styles";
import { ChevronDownIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { typedMemo, updateQuery } from "../../../utils/internal";
import { IconButton } from "../Button";
import { CheckboxInner } from "../Checkbox/checkbox";
import { Text } from "../Typography";

export type SimpleTableProps<T extends string> = {
  items: Array<Partial<Record<T, any>>>;
  size?: keyof Sizes;
  cols: SimpleTableCol<T>[];
  divideX?: boolean;
};

export type DataTableProps<T extends string, K extends string> = Omit<
  SimpleTableProps<T>,
  "items" | "cols"
> &
  DataTablePropsConditional<T, K> & {
    setSort?: (sort: string) => void;
    cols: DataTableCol<T>[];
  };

export type DataTablePropsConditional<T extends string, K extends string> =
  | {
      checkable: true;
      checkedValue: K;
      items: Array<Record<K, string> & Partial<Record<T, any>>>;
    }
  | {
      checkable?: false;
      checkedValue?: never;
      items: Array<Partial<Record<T, any>>>;
    };

export type SimpleTableCol<T> = {
  id: T;
  title: string;
  grow?: boolean;
  shrink?: boolean;
};

export type DataTableCol<T> = SimpleTableCol<T> & {
  sortable?: boolean;
};

export const DataTableInner = <T extends string, K extends string>({
  items,
  cols,
  size = "md",
  setSort,
  checkable,
  checkedValue,
  divideX,
}: DataTableProps<T, K>) => {
  const router = useRouter();

  const [sort, setLocalSort] = useState<string>();
  const [checked, setChecked] = useState<string[]>([]);

  const normalizedSort = sort?.[0] === "-" ? sort.slice(1) : sort;

  const handleSort = (_sort: string) => {
    const __sort = _sort === sort ? `-${_sort}` : _sort;
    setLocalSort(__sort);
    if (!setSort) {
      updateQuery({
        router,
        name: "sort",
        value: __sort,
      });
    } else {
      setSort(__sort);
    }
  };

  return (
    <TableContainer size={size}>
      <TableHead>
        <TableRow divideX={divideX}>
          {checkable && (
            <th className={cn("w-0", paddingsEvenly[size])}>
              <CheckboxInner
                key="checkbox_indeterminate"
                current={checked}
                options={items.map((item) => get(item, checkedValue))}
                allowIndetermination
                onChange={setChecked}
              />
            </th>
          )}
          {cols.map((col) => (
            <TableHeadCell
              key={`head_col_${col.id}`}
              col={col}
              size={size}
              attachment={
                col.sortable && (
                  <IconButton
                    ariaLabel={`sort_${col.id}`}
                    icon={ChevronDownIcon}
                    onClick={() => handleSort(col.id)}
                    className={cn("collapse group-hover:visible", {
                      "!visible": normalizedSort === col.id,
                    })}
                    iconClassName={cn(
                      { "rotate-180": sort === col.id },
                      transition
                    )}
                    variant="ghost"
                    size="xs"
                  />
                )
              }
            />
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item, i) => (
          <TableRow divideX={divideX} key={`row_${i}`}>
            {checkable && (
              <td className={cn(paddingsEvenly[size])}>
                <CheckboxInner
                  key={`checkbox_${i}`}
                  current={checked}
                  value={get(item, checkedValue)}
                  onChange={setChecked}
                  options={items.map((item) => get(item, checkedValue))}
                />
              </td>
            )}
            {cols.map((col) => (
              <TableDataCell
                item={item}
                col={col}
                key={`row_${i}_col_${col.id}`}
                size={size}
              />
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export const SimpleTableInner = <T extends string>({
  items,
  cols,
  size = "md",
  divideX,
}: SimpleTableProps<T>) => (
  <TableContainer size={size}>
    <TableHead>
      <TableRow divideX={divideX}>
        {cols.map((col) => (
          <TableHeadCell key={`head_col_${col.id}`} col={col} size={size} />
        ))}
      </TableRow>
    </TableHead>
    <TableBody>
      {items.map((item, i) => (
        <TableRow divideX={divideX} key={`row_${i}`}>
          {cols.map((col) => (
            <TableDataCell
              item={item}
              col={col}
              key={`row_${i}_col_${col.id}`}
              size={size}
            />
          ))}
        </TableRow>
      ))}
    </TableBody>
  </TableContainer>
);

type TableDataCellProps = {
  item: Record<string, any>;
  col: DataTableCol<string>;
  size?: keyof Sizes;
};

const TableDataCell = ({ item, col, size = "md" }: TableDataCellProps) => {
  const content = get(item, col.id);

  return (
    <td className={cn(paddingsEvenly[size])}>
      {isString(content) ? (
        <Text size={size}>{content}</Text>
      ) : (
        (content as ReactNode)
      )}
    </td>
  );
};

type TableRowProps = {
  divideX?: boolean;
  children: ReactNode;
};

const TableRow = ({ divideX, children }: TableRowProps) => (
  <tr className={cn(divideX && "divide-x", divides.accent)}>{children}</tr>
);

type TableBodyProps = {
  children: ReactNode;
};

const TableBody = ({ children }: TableBodyProps) => (
  <tbody className={cn("divide-y", divides.accent)}>{children}</tbody>
);

type TableHeadCellProps = {
  col: DataTableCol<string>;
  size?: keyof Sizes;
  attachment?: ReactNode;
};

const TableHeadCell = ({
  col,
  size = "md",
  attachment,
}: TableHeadCellProps) => {
  const Component = col.title ? "th" : "td";

  return (
    <Component
      className={cn(
        "group",
        paddingsEvenly[size],
        col.grow && "w-[999rem]", // w-full funktioniert hier nicht.
        col.shrink && "w-0"
      )}
    >
      <div className="flex flex-row gap-1 items-center">
        <Text size={size}>{col.title}</Text>
        {attachment}
      </div>
    </Component>
  );
};

type TableHeadProps = {
  children: ReactNode;
};

const TableHead = ({ children }: TableHeadProps) => (
  <tbody className={cn("text-left", extendedBgColors.filledSubtile)}>
    {children}
  </tbody>
);

type TableContainerProps = {
  size?: keyof Sizes;
  children: ReactNode;
};

const TableContainer = ({ size = "md", children }: TableContainerProps) => (
  <div
    className={cn(
      "overflow-x-auto relative border",
      borders.accent,
      roundings[size]
    )}
  >
    <table className={cn("table-auto w-full divide-y", divides.accent)}>
      {children}
    </table>
  </div>
);

export const DataTable = typedMemo(DataTableInner);
export const SimpleTable = typedMemo(SimpleTableInner);
