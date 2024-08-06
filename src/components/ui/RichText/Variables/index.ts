import MentionExtension from "@tiptap/extension-mention";
import { markInputRule, ReactNodeViewRenderer } from "@tiptap/react";

import { VariableNodeView } from "./NodeView";

const inputRegex = /(?:^|\s)((?:{{)((?:[^}]+))(?:}}))$/gm;

export const VariablesExtension = MentionExtension.extend({
  name: "variableExtension",

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ];
  },

  parseHTML() {
    return [
      {
        tag: "variable-component",
      },
    ];
  },

  renderHTML: ({ node }) => `{{${node.attrs.id}}}`,

  addNodeView() {
    return ReactNodeViewRenderer(VariableNodeView);
  },
});
