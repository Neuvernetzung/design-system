import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { ProseComponentTags } from "../../../../types";
import { createProseElement } from "../../Prose/prose";
import BulletListExtension from "@tiptap/extension-bullet-list";

const BulletListComponent = () => (
  <NodeViewWrapper>
    {createProseElement({
      name: ProseComponentTags.UL,
      children: <NodeViewContent />,
    })}
  </NodeViewWrapper>
);

export const CustomBulletList = BulletListExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BulletListComponent);
  },
});
