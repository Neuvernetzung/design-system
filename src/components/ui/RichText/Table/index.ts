import { AnyExtension } from "@tiptap/core";
import { TableCell } from "./Cell";
import { TableRow } from "./Row";
import { Table } from "./Table";
import { TableWrapper } from "./Wrapper";
import { TableHeader } from "./Header";

export const TableExtensions: AnyExtension[] = [
  TableWrapper,
  Table.configure({
    resizable: false,
  }),
  TableCell,
  TableHeader,
  TableRow,
];
