import OrderedListExtension from "@tiptap/extension-ordered-list";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { createProseElement } from "../../Prose/prose";

const OrderedListComponent = () => (
  <NodeViewWrapper>
    {createProseElement({
      name: "ol",
      children: <NodeViewContent />,
    })}
  </NodeViewWrapper>
);

export const CustomOrderedList = OrderedListExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(OrderedListComponent);
  },
});
