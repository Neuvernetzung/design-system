import ParagraphExtension from "@tiptap/extension-paragraph";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { ProseComponentTags } from "../../../../types";
import { createProseElement } from "../../Prose/prose";

const ParagraphComponent = ({ node }: NodeViewProps) => {
  const { attrs } = node;

  return (
    <NodeViewWrapper>
      {createProseElement({
        name: ProseComponentTags.P,
        className: attrs.textAlign,
        children: <NodeViewContent />,
      })}
    </NodeViewWrapper>
  );
};

export const CustomParagraph = ParagraphExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(ParagraphComponent);
  },
});
