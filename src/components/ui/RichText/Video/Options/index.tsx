import { autoUpdate, offset, useFloating } from "@floating-ui/react-dom";
import { Portal } from "@radix-ui/react-portal";
import { Root as ToolbarRoot, ToolbarButton } from "@radix-ui/react-toolbar";
import { IconTextCaption, IconTrash } from "@tabler/icons-react";
import type { NodeViewProps } from "@tiptap/react";
import { type RefObject, useEffect, useRef } from "react";

import { Tooltip } from "@/components/ui/Tooltip";
import { offsetSizes } from "@/styles/popper/offset";
import { cn } from "@/utils";

import { IconButton } from "../../../Button";
import { toolbarClassName } from "../../Menus/bubblemenu";
import { menuGroupClassName } from "../../Menus/menuItem";

type VideoOptionsProps = {
  containerRef: RefObject<HTMLDivElement>;
  videoRef: RefObject<HTMLVideoElement>;
  open: boolean;
  setOpen: (value: boolean) => void;
  isFigure: boolean;
} & NodeViewProps;

export const VideoOptions = ({
  containerRef,
  videoRef,
  open,
  setOpen,
  editor,
  deleteNode,
  getPos,
  isFigure,
}: VideoOptionsProps) => {
  const portalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node) &&
      portalRef.current &&
      !portalRef.current.contains(e.target as Node)
    ) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  });

  const { floatingStyles, refs } = useFloating({
    open,
    whileElementsMounted: (...props) =>
      autoUpdate(...props, { animationFrame: true }),
    placement: "top",
    elements: { reference: videoRef.current },
    middleware: [offset({ mainAxis: offsetSizes.md })],
  });

  return (
    open && (
      <Portal ref={portalRef}>
        <div style={floatingStyles} ref={refs.setFloating}>
          <ToolbarRoot className={cn("flex", toolbarClassName)}>
            <div className={cn(menuGroupClassName)}>
              <Tooltip
                delay={500}
                size="sm"
                label={
                  isFigure
                    ? "Beschreibung entfernen"
                    : "Beschreibung hinzufügen"
                }
              >
                <ToolbarButton asChild>
                  <IconButton
                    size="xs"
                    variant={isFigure ? "subtile" : "ghost"}
                    icon={IconTextCaption}
                    onClick={() => {
                      if (isFigure) {
                        editor
                          .chain()
                          .setNodeSelection(getPos())
                          .focus()
                          .figureToVideo()
                          .run();
                      } else {
                        editor
                          .chain()
                          .setNodeSelection(getPos())
                          .focus()
                          .videoToFigure()
                          .run();
                      }
                    }}
                    ariaLabel="edit_caption"
                  />
                </ToolbarButton>
              </Tooltip>
            </div>
            <ToolbarButton asChild>
              <IconButton
                size="xs"
                variant="ghost"
                icon={IconTrash}
                ariaLabel="Video löschen"
                onClick={() => {
                  deleteNode();
                }}
              />
            </ToolbarButton>
          </ToolbarRoot>
        </div>
      </Portal>
    )
  );
};
