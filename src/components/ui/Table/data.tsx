import cn from "classnames";
import get from "lodash/get";
import { useRouter } from "next/router";
import { useState } from "react";

import { paddingsEvenly, transition } from "../../../styles";
import { IconChevronDown } from "@tabler/icons-react";
import { typedMemo, updateQuery } from "../../../utils/internal";
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
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { disclosureAnimationVariants } from "../Disclosure/disclosure";

export type DataTableProps<
  T extends string,
  K extends string,
  D extends string
> = Omit<SimpleTableProps<T>, "items" | "cols"> &
  DataTablePropsConditional<T, K, D> & {
    setSort?: (sort: string) => void;
    cols: DataTableCol<T>[];
    disclosureValue?: D;
    disclosureClassName?: string;
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

export const DataTableInner = <
  T extends string,
  K extends string,
  D extends string
>({
  items = [],
  cols = [],
  size = "md",
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
  const router = useRouter();

  const [sort, setLocalSort] = useState<string>();

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
    <TableContainer
      size={size}
      disabledBorder={disabledBorder}
      divideY={divideY}
    >
      {!disableHead && (
        <TableHead>
          <TableRow divideX={divideX}>
            {checkable && (
              <th className={cn("w-0", paddingsEvenly[size])}>
                <CheckboxInner
                  id="checkbox_indeterminate"
                  current={checked}
                  disabled={items?.length === 0}
                  options={items?.map((item) => get(item, checkedValue))}
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
                <td className={cn(paddingsEvenly[size])}>
                  <CheckboxInner
                    id={`checkbox_${i}`}
                    current={checked}
                    value={get(item, checkedValue)}
                    onChange={setChecked}
                    options={[
                      ...items.map((item) => get(item, checkedValue)),
                      "",
                    ]}
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
            <LazyMotion features={domAnimation}>
              <AnimatePresence initial={false}>
                {disclosureValue && item[disclosureValue] && (
                  <tr
                    key={`row_${i}_disclosure`}
                    className={disclosureClassName}
                  >
                    <td colSpan={checkable ? cols.length + 1 : cols.length}>
                      <m.span
                        initial="initial"
                        animate={
                          disclosureValue && item[disclosureValue]
                            ? "animate"
                            : "initial"
                        }
                        variants={disclosureAnimationVariants}
                        className="w-full"
                      >
                        {item[disclosureValue]}
                      </m.span>
                    </td>
                  </tr>
                )}
              </AnimatePresence>
            </LazyMotion>
          </>
        ))}
      </TableBody>
    </TableContainer>
  );
};

export const DataTable = typedMemo(DataTableInner);
