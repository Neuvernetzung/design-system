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
    };
  },

  renderHTML({ HTMLAttributes }) {
    const { style } = HTMLAttributes;

    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, {
        style,
      }),
      [
        "img",
        mergeAttributes(HTMLAttributes, {
          draggable: false,
          contenteditable: false,
        }),
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableMediaNodeView);
  },
});
