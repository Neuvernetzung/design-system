import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { TableWrapperNodeView } from "./NodeView";

export const TableWrapper = Node.create({
  name: "table-wrapper",
  group: "block",
  content: "table",

  parseHTML() {
    return [{ tag: "table-wrapper" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["table-wrapper", mergeAttributes(HTMLAttributes), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TableWrapperNodeView, {
      as: "div",
      className: "relative",
    }); // Kann evtl. ersetzt werden wenn https://github.com/ueberdosis/tiptap/pull/3984 released ist. Somit wäre es möglich eine NodeView direkt in Table zu verwenden
  },
});
