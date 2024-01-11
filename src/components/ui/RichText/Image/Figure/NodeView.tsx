/* eslint-disable @next/next/no-img-element */

import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from "@tiptap/react";
import { type CSSProperties, type FC, useRef, useState } from "react";

import { transition } from "@/styles";
import { cn } from "@/utils";

import { ImageOptions } from "../Options";

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

  const caption = node.lastChild?.text;

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
        className="relative group/image"
        as="figure"
      >
        <img
          ref={imgRef}
          {...node.attrs}
          alt={node.attrs.alt}
          style={{
            ...resizingStyle,
          }}
          className={cn("group-hover/image:opacity-90", transition)}
        />
        <button
          type="button"
          aria-label="open_figure_settings"
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
          className={cn("absolute inset-0 bottom-[32px]")}
        />
        <NodeViewContent
          as="figcaption"
          data-placeholder={
            !caption ? "Beschreibung hinzufügen ..." : undefined
          }
          className={cn(
            `before:content-[attr(data-placeholder)] before:float-left before:text-accent-500 before:opacity-80 before:pointer-events-none before:h-0`
          )}
        />
      </NodeViewWrapper>
      <ImageOptions
        node={node}
        {...nodeViewProps}
        containerRef={containerRef}
        imgRef={imgRef}
        open={openSettings}
        setOpen={setOpenSettings}
        setResizingStyle={setResizingStyle}
        isFigure
      />
    </>
  );
};
