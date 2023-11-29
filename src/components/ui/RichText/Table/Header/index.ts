import { mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import TableHeaderExtension from "@tiptap/extension-table-header";

import { TableCellNodeView } from "../Cell/NodeView";

export const TableHeader = TableHeaderExtension.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "th",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TableCellNodeView, {
      as: "th",
      className: "relative",
    });
  },
});
