import isNumber from "lodash/isNumber";
import isString from "lodash/isString";
import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from "react";

import {
  bgColors,
  borders,
  divides,
  extendedBgColors,
  gapsSmall,
  paddingsLarge,
  paddingsLargeEvenly,
  roundings,
} from "@/styles";
import type { Size } from "@/types";
import { smallerSize } from "@/utils";
import { cn } from "@/utils/cn";

import { Text } from "../../Typography/Text";

export type TableCellProps = {
  grow?: boolean;
  shrink?: boolean;
};

export type TableDataCellProps = {
  size?: Size;
  className?: string;
  children?: ReactNode;
} & TableCellProps &
  ComponentPropsWithoutRef<"td">;

export const TableDataCell = forwardRef(
  (
    {
      grow,
      shrink,
      size = "md",
      className,
      children,
      ...props
    }: TableDataCellProps,
    ref: ForwardedRef<HTMLTableCellElement>
  ) => (
    <td
      ref={ref}
      className={cn(
        paddingsLarge[size],
        grow && "w-[999rem]", // w-full funktioniert hier nicht.
        shrink && "w-0",
        className
      )}
      {...props}
    >
      {isString(children) || isNumber(children) ? (
        <Text size={smallerSize(size)}>{children}</Text>
      ) : (
        children
      )}
    </td>
  )
);

TableDataCell.displayName = "TableDataCell";

export type TableRowOptions = { divideX?: boolean; hasStripes?: boolean };

export type TableRowProps = {
  children: ReactNode;
  className?: string;
  index?: number;
} & TableRowOptions &
  ComponentPropsWithoutRef<"tr">;

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

export type TableBodyOptions = {
  divideY?: boolean;
};

export type TableBodyProps = {
  children: ReactNode;
} & TableBodyOptions &
  ComponentPropsWithoutRef<"tbody">;

export const TableBody = forwardRef(
  (
    { divideY = true, children, ...props }: TableBodyProps,
    ref: ForwardedRef<HTMLTableSectionElement>
  ) => (
    <tbody
      ref={ref}
      className={cn(divideY && "divide-y", divides.accent, bgColors.white)}
      {...props}
    >
      {children}
    </tbody>
  )
);

TableBody.displayName = "TableBody";

export type TableHeadOptions = {
  uppercase?: boolean;
};

export type TableHeadCellProps = {
  size?: Size;
  attachment?: ReactNode;
  className?: string;
  children: ReactNode | undefined;
} & TableHeadOptions &
  TableCellProps &
  ComponentPropsWithoutRef<"th">;

export const TableHeadCell = forwardRef(
  (
    {
      grow,
      shrink,
      children,
      size = "md",
      attachment,
      uppercase = true,
      className,
      ...props
    }: TableHeadCellProps,
    ref: ForwardedRef<HTMLTableCellElement>
  ) => {
    const Component = children ? "th" : "td";

    return (
      <Component
        ref={ref}
        className={cn(
          "group",
          paddingsLargeEvenly[size],
          grow && "w-[999rem]", // w-full funktioniert hier nicht.
          shrink && "w-0",
          className
        )}
        {...props}
      >
        <div className={cn("flex flex-row items-center", gapsSmall[size])}>
          <Text
            className={cn("font-medium", uppercase && "uppercase")}
            size={smallerSize(size)}
          >
            {children}
          </Text>
          {attachment}
        </div>
      </Component>
    );
  }
);

TableHeadCell.displayName = "TableHeadCell";

export type TableHeadProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<"thead">;

export const TableHead = forwardRef(
  (
    { children, ...props }: TableHeadProps,
    ref: ForwardedRef<HTMLTableSectionElement>
  ) => (
    <thead
      ref={ref}
      className={cn("text-left", extendedBgColors.filledSubtile)}
      {...props}
    >
      {children}
    </thead>
  )
);

TableHead.displayName = "TableHead";

export type TableContainerOptions = {
  disabledBorder?: boolean;
};

export type TableContainerProps = {
  size?: Size;
  children: ReactNode;
} & TableContainerOptions &
  TableBodyOptions &
  ComponentPropsWithoutRef<"table">;

export const TableContainer = forwardRef(
  (
    {
      size = "md",
      disabledBorder,
      divideY = true,
      children,
      ...props
    }: TableContainerProps,
    ref: ForwardedRef<HTMLTableElement>
  ) => (
    <div
      className={cn(
        "overflow-x-auto relative",
        !disabledBorder && "border",
        !disabledBorder && borders.accent,
        roundings[size]
      )}
    >
      <table
        ref={ref}
        className={cn(
          "table-auto w-full",
          divideY && "divide-y",
          divides.accent
        )}
        {...props}
      >
        {children}
      </table>
    </div>
  )
);

TableContainer.displayName = "TableContainer";
