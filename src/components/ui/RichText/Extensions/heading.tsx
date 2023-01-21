import {
  NodeViewContent,
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { ProseComponentTags } from "../../../../types";
import { createProseElement } from "../../Prose/prose";
import HeadingExtension from "@tiptap/extension-heading";

const HeaderComponent = ({ node }: NodeViewProps) => {
  const { attrs } = node;
  console.log(node);
  return (
    <NodeViewWrapper>
      {createProseElement({
        name: `h${attrs.level}` as ProseComponentTags,
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
