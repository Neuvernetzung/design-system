import LinkExtension from "@tiptap/extension-link";
import { mergeAttributes } from "@tiptap/react";

import { linkStyle } from "../../../../styles/link";

export const CustomLink = LinkExtension.extend({
  renderHTML({ HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: linkStyle({}),
      }),
      0,
    ];
  }, // Link ist ein Marker und kann somit keine Komponente rendern. Somit werden hier von Hand die Linkstyles eingefügt.
}).configure({
  openOnClick: false,
});
