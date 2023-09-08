import BulletListExtension from "@tiptap/extension-bullet-list";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { createProseElement } from "../../Prose/prose";

const BulletListComponent = () => (
  <NodeViewWrapper>
    {createProseElement({
      name: "ul",
      children: <NodeViewContent />,
    })}
  </NodeViewWrapper>
);

export const CustomBulletList = BulletListExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BulletListComponent);
  },
});
