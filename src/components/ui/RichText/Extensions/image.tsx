import ImageExtension from "@tiptap/extension-image";
import {
  NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { ProseComponentTags } from "../../../../types";
import { createProseElement } from "../../Prose/prose";

const ImageComponent = ({ node }: NodeViewProps) => {
  const { attrs } = node;

  return (
    <NodeViewWrapper>
      {createProseElement({
        name: ProseComponentTags.IMG,
        attributes: {
          ...attrs,
          containerProps: {
            "data-drag-handle": "",
            draggable: true,
            // contentEditable: false,
          },
        },
      })}
    </NodeViewWrapper>
  );
};

export const CustomImage = ImageExtension.extend({
  draggable: true,
  group: "block",
  addNodeView() {
    return ReactNodeViewRenderer(ImageComponent);
  },
});
