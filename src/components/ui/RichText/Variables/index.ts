import MentionExtension from "@tiptap/extension-mention";
import {
  nodeInputRule,
  nodePasteRule,
  type Range,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import type {
  SuggestionKeyDownProps,
  SuggestionOptions,
  SuggestionProps,
} from "@tiptap/suggestion";
import { create } from "zustand";

import type { EmailVariable } from "../emailEditor";
import { VariableNodeView } from "./NodeView";

const inputRegex = /((?:{{)((?:[^}]+))(?:}}))$/gm;
const pasteRegex = /((?:{{)((?:[^}]+))(?:}}))/gm;

export const VARIABLE_COMPONENT_TAG = "var-comp";

export const replaceMustacheVariables = (htmlString: string) => {
  const replacedString = htmlString.replace(
    pasteRegex,
    (...match) =>
      `<${VARIABLE_COMPONENT_TAG} data-id="${match[2]}"></${VARIABLE_COMPONENT_TAG}>`
  );

  return replacedString;
};

export const variableMenuStore = create<{
  open: boolean;
  range?: Range;
  target?: Element;
}>(() => ({
  open: false,
  range: undefined,
  target: undefined,
}));

const render: SuggestionOptions<EmailVariable>["render"] = () => ({
  onStart: ({ range, editor }: SuggestionProps) => {
    variableMenuStore.setState({
      open: true,
      range,
      target: editor.options.element,
    });
  },
  onKeyDown: ({ event }: SuggestionKeyDownProps) => {
    if (event.key === "Escape") {
      variableMenuStore.setState({
        open: false,
        range: undefined,
        target: undefined,
      });
    }
    return false;
  },
  onExit: () => {
    variableMenuStore.setState({
      open: false,
      range: undefined,
      target: undefined,
    });
  },
});

export const VARIABLE_EXTENSIONS_NAME = "variableExtension";

export const VariablesExtension = MentionExtension.extend({
  name: VARIABLE_EXTENSIONS_NAME,

  draggable: true,

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes(match) {
          return { id: match[2]?.trim() }; // Trim um Whitespace zu entfernen
        },
      }),
    ];
  },

  addPasteRules() {
    return [
      nodePasteRule({
        find: pasteRegex,
        type: this.type,
        getAttributes(match) {
          return { id: match[2]?.trim() }; // Trim um Whitespace zu entfernen
        },
      }),
    ];
  },

  parseHTML() {
    return [
      {
        tag: VARIABLE_COMPONENT_TAG,
      },
    ];
  },

  renderHTML: ({ node }) => `{{${node.attrs.id}}}`,

  addNodeView() {
    return ReactNodeViewRenderer(VariableNodeView);
  },
}).configure({
  suggestion: {
    render,
  },
});
