import { mergeAttributes } from "@tiptap/core";
import TableRowExtension from "@tiptap/extension-table-row";

export const TableRow = TableRowExtension.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "tr",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },
});
