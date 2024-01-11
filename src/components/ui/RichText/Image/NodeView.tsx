/* eslint-disable @next/next/no-img-element */

import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { type CSSProperties, type FC, useRef, useState } from "react";
import { ImageOptions } from "./Options";
import { cn } from "@/utils";
import { transition } from "@/styles";

export const ResizableMediaNodeView: FC<NodeViewProps> = ({
  node,
  ...nodeViewProps
}) => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const imgRef = useRef<HTMLImageElement>(null);
  const [resizingStyle, setResizingStyle] = useState<
    Pick<CSSProperties, "width"> | undefined
  >();

  return (
    <>
      <NodeViewWrapper
        ref={containerRef}
        draggable
        data-drag-handle
        data-float={node.attrs["data-float"]}
        style={{
          // Weird! Basically tiptap/prose wraps this in a span and the line height causes an annoying buffer.
          lineHeight: "0px",
          textAlign: node.attrs.textAlign,
          float: node.attrs["data-float"],
        }}
      >
        <button
          type="button"
          onClick={() => {
            if (!openSettings) {
              nodeViewProps.editor
                .chain()
                .setNodeSelection(nodeViewProps.getPos())
                .focus()
                .run();
            }
            setOpenSettings(!openSettings);
          }}
          className={cn("hover:opacity-90", transition)}
        >
          <img
            ref={imgRef}
            {...node.attrs}
            data-float={node.attrs["data-float"]}
            alt={node.attrs.alt}
            style={{
              ...resizingStyle,
            }}
          />
        </button>
      </NodeViewWrapper>
      <ImageOptions
        node={node}
        {...nodeViewProps}
        containerRef={containerRef}
        imgRef={imgRef}
        open={openSettings}
        setOpen={setOpenSettings}
        setResizingStyle={setResizingStyle}
        isFigure={false}
      />
    </>
  );
};
