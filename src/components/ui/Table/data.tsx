import { IconChevronDown } from "@tabler/icons-react";
import get from "lodash/get";

import { cn } from "@/utils";

import { paddingsEvenly, transition } from "../../../styles";
import { IconButton } from "../Button";
import { CheckboxInner } from "../Checkbox/checkbox";
import {
  SimpleTableCol,
  SimpleTableProps,
  TableBody,
  TableContainer,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "./table";

export type DataTableProps<
  T extends string,
  K extends string,
  D extends string
> = Omit<SimpleTableProps<T>, "items" | "cols"> &
  DataTablePropsConditional<T, K, D> & {
    disclosureValue?: D;
    disclosureClassName?: string;
    cols: DataTableCol<T>[];
  } & DataTableSortableProps;

export type DataTableSortableProps =
  | {
      sort: string | undefined;
      setSort: (sort: string) => void;
    }
  | {
      sort?: never;
      setSort?: never;
    };

export type DataTablePropsConditional<
  T extends string,
  K extends string,
  D extends string
> =
  | {
      checkable: true;
      checkedValue: K;
      checked: string[];
      setChecked: (checked: string[]) => void;
      items: Array<
        Record<K, string> & Partial<Record<T, any>> & Partial<Record<D, any>>
      >;
    }
  | {
      checkable?: false;
      checkedValue?: never;
      checked?: never;
      setChecked?: never;
      items: Array<Partial<Record<T, any>> & Partial<Record<D, any>>>;
    };

export type DataTableCol<T> = SimpleTableCol<T> & {
  sortable?: boolean;
};

export const DataTable = <
  T extends string,
  K extends string,
  D extends string
>({
  items = [],
  cols = [],
  size = "md",
  sort,
  setSort,
  checkable,
  checkedValue,
  divideX,
  uppercase = true,
  disableHead = false,
  disclosureValue,
  disclosureClassName,
  checked,
  setChecked,
  hasStripes = false,
  disabledBorder = false,
  divideY = true,
}: DataTableProps<T, K, D>) => {
  const normalizedSort = sort?.[0] === "-" ? sort.slice(1) : sort;

  const handleSort = (_sort: string) => {
    const __sort = _sort === sort ? `-${_sort}` : _sort;

    setSort?.(__sort);
  };

  return (
    <TableContainer
      size={size}
      disabledBorder={disabledBorder}
      divideY={divideY}
    >
      {!disableHead && (
        <TableHead>
          <TableRow divideX={divideX}>
            {checkable && (
              <th
                className={cn("w-0", paddingsEvenly[size])}
                aria-label="check-all"
              >
                <CheckboxInner
                  id="checkbox_indeterminate"
                  disabled={items?.length === 0}
                  checked={
                    checked.length > 0
                      ? items.every((item) =>
                          checked.find(
                            (value) => value === get(item, checkedValue)
                          )
                        )
                        ? true
                        : "indeterminate"
                      : false
                  }
                  setChecked={(value) => {
                    if (value === true) {
                      setChecked(items.map((item) => get(item, checkedValue)));
                    } else setChecked([]);
                  }}
                />
              </th>
            )}
            {cols.map((col) => (
              <TableHeadCell
                key={`head_col_${col.id}`}
                col={col}
                size={size}
                uppercase={uppercase}
                className={col.headCellClassName}
                attachment={
                  col.sortable && (
                    <IconButton
                      ariaLabel={`sort_${col.id}`}
                      icon={IconChevronDown}
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
      )}
      <TableBody divideY={divideY}>
        {items.map((item, i) => (
          <>
            <TableRow
              divideX={divideX}
              key={`row_${i}`}
              index={i}
              hasStripes={hasStripes}
            >
              {checkable && (
                <td
                  className={cn(paddingsEvenly[size])}
                  aria-label={`check-item-${i}`}
                >
                  <CheckboxInner
                    id={`checkbox_${i}`}
                    checked={checked.includes(get(item, checkedValue))}
                    setChecked={(value) => {
                      if (value === true) {
                        setChecked([...checked, get(item, checkedValue)]);
                      } else
                        setChecked(
                          checked.filter((v) => v !== get(item, checkedValue))
                        );
                    }}
                  />
                </td>
              )}
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
            {disclosureValue && item[disclosureValue] && (
              <tr key={`row_${i}_disclosure`} className={disclosureClassName}>
                <td colSpan={checkable ? cols.length + 1 : cols.length}>
                  <span className="w-full">{item[disclosureValue]}</span>
                </td>
              </tr>
            )}
          </>
        ))}
      </TableBody>
    </TableContainer>
  );
};
