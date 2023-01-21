import {
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { ProseComponentTags } from "../../../../types";
import { createProseElement } from "../../Prose/prose";
import HorizontalRuleExtension from "@tiptap/extension-horizontal-rule";

const HorizontalRuleComponent = () => (
  <NodeViewWrapper>
    {createProseElement({
      name: ProseComponentTags.HR,
      children: <NodeViewContent />,
    })}
  </NodeViewWrapper>
);

export const CustomHorizontalRule = HorizontalRuleExtension.extend({
  addNodeView() {
    return ReactNodeViewRenderer(HorizontalRuleComponent);
  },
});
