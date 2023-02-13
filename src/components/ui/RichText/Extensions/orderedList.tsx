import OrderedListExtension from "@tiptap/extension-ordered-list";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { ProseComponentTags } from "../../../../types";
import { createProseElement } from "../../Prose/prose";

const OrderedListComponent = () => (
  <NodeViewWrapper>
    {createProseElement({
      name: ProseComponentTags.OL,
      children: <NodeViewContent />,
    })}
  </NodeViewWrapper>
);

export const CustomOrderedList = OrderedListExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(OrderedListComponent);
  },
});
