import { mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import TableCellExtension from "@tiptap/extension-table-cell";

import { TableCellNodeView } from "./NodeView";

export const TableCell = TableCellExtension.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "td",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TableCellNodeView, {
      as: "td",
      className: "relative",
    });
  },
});
