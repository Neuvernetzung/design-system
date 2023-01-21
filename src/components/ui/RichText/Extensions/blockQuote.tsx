import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { ProseComponentTags } from "../../../../types";
import { createProseElement } from "../../Prose/prose";
import BlockQuoteExtension from "@tiptap/extension-blockquote";

const BlockQuoteComponent = () => (
  <NodeViewWrapper>
    {createProseElement({
      name: ProseComponentTags.BLOCKQUOTE,
      children: <NodeViewContent />,
    })}
  </NodeViewWrapper>
);

export const CustomBlockQuote = BlockQuoteExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(BlockQuoteComponent);
  },
});
