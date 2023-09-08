import HeadingExtension from "@tiptap/extension-heading";
import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { ProseComponentTag } from "../../../../types";
import { createProseElement } from "../../Prose/prose";

const HeaderComponent = ({ node }: NodeViewProps) => {
  const { attrs } = node;

  return (
    <NodeViewWrapper>
      {createProseElement({
        name: `h${attrs.level}` as ProseComponentTag,
        className: attrs.textAlign,
        children: <NodeViewContent />,
      })}
    </NodeViewWrapper>
  );
};

export const CustomHeading = HeadingExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(HeaderComponent);
  },
});
