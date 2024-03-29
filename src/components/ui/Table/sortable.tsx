import { IconGripVertical } from "@tabler/icons-react";
import { cn } from "@/utils";

import { paddingsEvenly } from "@/styles";
import { mergeRefs } from "@/utils/internal";
import { IconButton } from "../Button";
import { DragIndicator, SortableProps } from "../Sortable";
import {
  AnySortableItem,
  handleDragEnd,
} from "../Sortable/utils/handleDragEnd";
import {
  SimpleTableCol,
  SimpleTableProps,
  TableBody,
  TableContainer,
  TableDataCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TableRowProps,
} from "./table";
import { useSortableProps } from "../Sortable/utils/useSortableProps";
import { DndContext, DragOverlay, UniqueIdentifier } from "@dnd-kit/core";
import { handleDragStart } from "../Sortable/utils/handleDragStart";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { createPortal } from "react-dom";
import type { Size } from "@/types";
import { DragOverlay as DragOverlayComponent } from "../Sortable/Overlay";
import { ForwardedRef, forwardRef } from "react";

export type SortableTableProps<
  T extends string,
  TId extends string,
  TItem extends AnySortableItem
> = Omit<SimpleTableProps<T>, "items"> & {
  handle?: boolean;
  indicator?: boolean;
  id?: TId;
  items: Array<Record<TId, string> & Partial<Record<T, any>>>;
} & Omit<SortableProps<TItem>, "children" | "itemIds">;

export type SortableTableCol<T> = SimpleTableCol<T>;

export const SortableTable = <
  T extends string,
  TId extends string,
  TItem extends AnySortableItem
>({
  items = [],
  handleChange,
  cols = [],
  size = "md",
  divideX = false,
  id = "id" as TId,
  uppercase = true,
  disableHead = false,
  order,
  handle,
  indicator,
  hasStripes = false,
  disabledBorder = false,
  divideY = false,
}: SortableTableProps<T, TId, TItem>) => {
  const {
    internalItems,
    setInternalItemIds,
    setInternalItems,
    sensors,
    internalItemIds,
    activeIndex,
    setActiveIndex,
    activeItem,
  } = useSortableProps({ items, itemIds: items.map((item) => item[id]) });

  return (
    <DndContext
      sensors={sensors}
      onDragStart={(e) =>
        handleDragStart(e, { internalItemIds, setActiveIndex })
      }
      onDragEnd={(e) =>
        handleDragEnd(e, {
          handleChange,
          id,
          internalItemIds,
          internalItems,
          items,
          setActiveIndex,
          setInternalItemIds,
          setInternalItems,
          order,
        })
      }
    >
      <TableContainer
        size={size}
        disabledBorder={disabledBorder}
        divideY={divideY}
      >
        {!disableHead && (
          <TableHead>
            <TableRow divideX={divideX}>
              {handle && (
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
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={internalItemIds}
        >
          <TableBody divideY={divideY}>
            {internalItems.map((item, i) => (
              <SortableTableRow
                id={item[id]}
                key={`row_${item[id]}`}
                divideX={divideX}
                hasStripes={hasStripes}
                index={i}
                handle={handle}
                indicator={indicator}
                size={size}
              >
                {cols.map((col) => (
                  <TableDataCell
                    item={item}
                    col={col}
                    key={`row_${item[id]}_col_${col.id}`}
                    size={size}
                    className={col.dataCellClassName}
                  />
                ))}
              </SortableTableRow>
            ))}
          </TableBody>
        </SortableContext>
        {createPortal(
          <DragOverlay>
            {activeItem !== undefined && activeIndex !== undefined ? (
              <DragOverlayComponent handle={handle} itemCount={1} size={size} />
            ) : null}
          </DragOverlay>,
          document.body
        )}
      </TableContainer>
    </DndContext>
  );
};

type SortableTableRowProps = TableRowProps & {
  id: UniqueIdentifier;
  handle?: boolean;
  indicator?: boolean;
  size: Size;
};

const SortableTableRow = forwardRef(
  (
    {
      id,
      handle,
      indicator,
      size,
      children,
      className,
      ...props
    }: SortableTableRowProps,
    ref: ForwardedRef<HTMLTableRowElement>
  ) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id });

    const style = {
      transform: CSS.Translate.toString(transform),
      transition,
    };

    if (indicator && isDragging)
      return (
        <DragIndicator
          setNodeRef={mergeRefs([ref, setNodeRef])}
          style={style}
          asChild
          key={`drag_indicator_${id}`}
        >
          <tr>
            <td colSpan={100} />
          </tr>
        </DragIndicator>
      );

    return (
      <TableRow
        ref={mergeRefs([ref, setNodeRef])}
        style={style}
        {...(handle ? {} : { ...attributes })}
        {...(handle ? {} : { ...listeners })}
        className={cn(isDragging && "opacity-50", className)}
        {...props}
      >
        <td className={cn(paddingsEvenly[size])}>
          <IconButton
            {...(handle ? { ...attributes } : {})}
            {...(handle ? { ...listeners } : {})}
            icon={IconGripVertical}
            variant="ghost"
            size="sm"
            ariaLabel={`drag_handle_${id}`}
          />
        </td>
        {children}
      </TableRow>
    );
  }
);

SortableTableRow.displayName = "SortableTableRow";
