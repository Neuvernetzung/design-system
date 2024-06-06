import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from "@tiptap/react";
import { type FC, useRef, useState } from "react";

import { transition } from "@/styles";
import { cn } from "@/utils";

import { VideoOptions } from "../Options";

export const ResizableVideoNodeView: FC<NodeViewProps> = ({
  node,
  ...nodeViewProps
}) => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  const caption = node.lastChild?.text;

  return (
    <>
      <NodeViewWrapper
        ref={containerRef}
        draggable
        data-drag-handle
        style={{
          // Weird! Basically tiptap/prose wraps this in a span and the line height causes an annoying buffer.
          lineHeight: "0px",
        }}
        className="relative group/video"
        as="figure"
      >
        <video
          ref={videoRef}
          {...node.attrs}
          className={cn("group-hover/video:opacity-90", transition)}
        />
        <button
          type="button"
          aria-label="Video Optionen öffnen"
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
      <VideoOptions
        node={node}
        {...nodeViewProps}
        containerRef={containerRef}
        videoRef={videoRef}
        open={openSettings}
        setOpen={setOpenSettings}
        isFigure
      />
    </>
  );
};
