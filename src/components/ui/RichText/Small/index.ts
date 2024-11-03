import { mergeAttributes, Node } from "@tiptap/react";

export interface SmallOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    small: {
      /**
       * Toggle a paragraph
       */
      setSmall: () => ReturnType;
    };
  }
}

export const SmallParagraph = Node.create<SmallOptions>({
  name: "small",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: "block",

  content: "inline*",

  parseHTML() {
    return [{ tag: "small" }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "small",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      0,
    ];
  },

  addCommands() {
    return {
      setSmall:
        () =>
        ({ commands }) =>
          commands.setNode(this.name),
    };
  },
});
