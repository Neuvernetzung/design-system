import HorizontalRuleExtension from "@tiptap/extension-horizontal-rule";
import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { createProseElement } from "../../Prose/prose";

const HorizontalRuleComponent = () => (
  <NodeViewWrapper>
    {createProseElement({
      name: "hr",
      children: <NodeViewContent />,
    })}
  </NodeViewWrapper>
);

export const CustomHorizontalRule = HorizontalRuleExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(HorizontalRuleComponent);
  },
});
