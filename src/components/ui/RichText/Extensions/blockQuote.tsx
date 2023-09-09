import BlockQuoteExtension from "@tiptap/extension-blockquote";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { createProseElement } from "../../Prose/prose";

const BlockQuoteComponent = () => (
  <NodeViewWrapper>
    {createProseElement({
      name: "blockquote",
      children: <NodeViewContent />,
    })}
  </NodeViewWrapper>
);

export const CustomBlockQuote = BlockQuoteExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockQuoteComponent);
  },
});
