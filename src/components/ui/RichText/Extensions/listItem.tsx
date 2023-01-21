import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { ProseComponentTags } from "../../../../types";
import { createProseElement } from "../../Prose/prose";
import ListItemExtension from "@tiptap/extension-list-item";

const ListItemComponent = () => (
  <NodeViewWrapper>
    {createProseElement({
      name: ProseComponentTags.LI,
      children: <NodeViewContent />,
    })}
  </NodeViewWrapper>
);

export const CustomListItem = ListItemExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ListItemComponent);
  },
});
