import { type Editor, Extension, type Range } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";

import { slashMenuStore } from "./Menu";

const renderItems = () => ({
  onStart: ({ range }: { range: Range }) => {
    slashMenuStore.setState({ open: true, range });
  },
  onKeyDown: (props: { event: KeyboardEvent }) => {
    if (props.event.key === "Escape") {
      slashMenuStore.setState({ open: false, range: undefined });
    }
  },
  onExit: () => {
    slashMenuStore.setState({ open: false, range: undefined });
  },
});

export const SlashCommand = Extension.create({
  name: "slash-command",
  addOptions() {
    return {
      suggestion: {
        char: "/",
        command: ({
          editor,
          range,
          props,
        }: {
          editor: Editor;
          range: Range;
          props: any;
        }) => {
          props.command({ editor, range });
        },
      },
    };
  },
  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ];
  },
}).configure({
  suggestion: {
    render: renderItems,
  },
});
