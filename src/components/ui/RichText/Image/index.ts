import TiptapImageExtension from "@tiptap/extension-image";
import { mergeAttributes, ReactNodeViewRenderer } from "@tiptap/react";

import { ResizableMediaNodeView } from "./NodeView";

export const ImageExtension = TiptapImageExtension.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: "100%",
        renderHTML: ({ width }) => ({ width }),
      },
      height: {
        default: "auto",
        renderHTML: ({ height }) => ({ height }),
      },
      "data-float": {
        renderHTML: ({ "data-float": dataFloat }) => ({
          "data-float": dataFloat,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "picture img",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { style, "data-float": dataFloat, ...rest } = HTMLAttributes;

    return [
      "picture",
      mergeAttributes(this.options.HTMLAttributes, {
        style,
        "data-float": dataFloat,
      }),
      [
        "img",
        mergeAttributes(rest, {
          draggable: false,
          contenteditable: false,
          "data-float": dataFloat,
        }),
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableMediaNodeView);
  },
});
