import { type Editor, Extension, type Range } from "@tiptap/react";
import Suggestion from "@tiptap/suggestion";

import { slashMenuStore } from "./Menu";

const render = () => ({
  onStart: ({ range, editor }: { range: Range; editor: Editor }) => {
    slashMenuStore.setState({
      open: true,
      range,
      target: editor.options.element,
    });
  },
  onKeyDown: ({ event }: { event: KeyboardEvent }) => {
    if (event.key === "Escape") {
      slashMenuStore.setState({
        open: false,
        range: undefined,
        target: undefined,
      });
    }
  },
  onExit: () => {
    slashMenuStore.setState({
      open: false,
      range: undefined,
      target: undefined,
    });
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    render,
  },
});
