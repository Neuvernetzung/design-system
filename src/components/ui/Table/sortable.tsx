import { Bars2Icon } from "@heroicons/react/24/outline";
import cn from "classnames";

import { paddingsEvenly } from "../../../styles";
import { typedMemo } from "../../../utils/internal";
import { IconButton } from "../Button";
import {
  Sortable,
  SortableItem,
  SortableItemProps,
  SortableProps,
} from "../Sortable";
import {
  SimpleTableCol,
  SimpleTableProps,
  TableBody,
  TableBodyProps,
  TableContainer,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TableRowProps,
} from "./table";

export type SortableTableProps<
  T extends string,
  TId extends string,
  TItem extends Record<string, any>
> = Omit<SimpleTableProps<T>, "items"> & {
  handle?: boolean;
  id: TId;
  items: Array<Record<TId, string> & Partial<Record<T, any>>>;
} & Omit<SortableProps<TItem>, "children" | "itemIds">;

export type SortableTableCol<T> = SimpleTableCol<T>;

export const SortableTableInner = <
  T extends string,
  TId extends string,
  TItem extends Record<string, any>
>({
  items = [],
  handleChange,
  cols = [],
  size = "md",
  divideX,
  id,
  uppercase = true,
  disableHead = false,
  order,
  handle: hasHandle,
}: SortableTableProps<T, TId, TItem>) => (
  <TableContainer size={size}>
    {!disableHead && (
      <TableHead>
        <TableRow divideX={divideX}>
          {hasHandle && (
            <th
              className={cn("w-0", paddingsEvenly[size])}
              aria-label="drag_handle_head"
            />
          )}
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
    <TableBodySortable
      order={order}
      items={items}
      itemIds={items.map((item) => item[id])}
      id={id}
      handleChange={handleChange}
    >
      {(items) =>
        items.map((item, i) => (
          <TableRowSortable
            handle={hasHandle}
            id={item[id]}
            divideX={divideX}
            key={`row_${item[id]}`}
          >
            {({ handle }) => (
              <>
                {hasHandle && (
                  <td className={cn(paddingsEvenly[size])}>
                    <IconButton
                      {...handle}
                      icon={Bars2Icon}
                      variant="ghost"
                      size="sm"
                      ariaLabel={`drag_handle_${item[id]}`}
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
              </>
            )}
          </TableRowSortable>
        ))
      }
    </TableBodySortable>
  </TableContainer>
);

type TableRowSortableProps<THandle extends boolean> = Omit<
  TableRowProps,
  "children"
> &
  SortableItemProps<THandle>;

const TableRowSortable = <THandle extends boolean>(
  props: TableRowSortableProps<THandle>
) => <SortableItem as={TableRow} {...props} />;

type TableBodySortableProps<TItem extends Record<string, any>> = Omit<
  TableBodyProps,
  "children"
> &
  SortableProps<TItem>;

const TableBodySortable = <TItem extends Record<string, any>>(
  props: TableBodySortableProps<TItem>
) => (
  <TableBody>
    <Sortable {...props} />
  </TableBody>
);

export const SortableTable = typedMemo(SortableTableInner);
