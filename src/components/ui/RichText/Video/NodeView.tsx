import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { type FC, useRef, useState } from "react";
import { VideoOptions } from "./Options";
import { cn } from "@/utils";
import { transition } from "@/styles";

export const ResizableVideoNodeView: FC<NodeViewProps> = ({
  node,
  ...nodeViewProps
}) => {
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

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
          className={cn("hover:opacity-90 w-full", transition)}
        >
          <video ref={videoRef} {...node.attrs} />
        </button>
      </NodeViewWrapper>
      <VideoOptions
        node={node}
        {...nodeViewProps}
        containerRef={containerRef}
        videoRef={videoRef}
        open={openSettings}
        setOpen={setOpenSettings}
        isFigure={false}
      />
    </>
  );
};
