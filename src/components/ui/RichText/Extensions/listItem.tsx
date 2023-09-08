import ListItemExtension from "@tiptap/extension-list-item";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { createProseElement } from "../../Prose/prose";

const ListItemComponent = () => (
  <NodeViewWrapper>
    {createProseElement({
      name: "li",
      children: <NodeViewContent />,
    })}
  </NodeViewWrapper>
);

export const CustomListItem = ListItemExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ListItemComponent);
  },
});
