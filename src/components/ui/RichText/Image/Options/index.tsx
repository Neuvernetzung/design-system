import { autoUpdate, offset, useFloating } from "@floating-ui/react-dom";
import { Portal } from "@radix-ui/react-portal";
import { Root as ToolbarRoot, ToolbarButton } from "@radix-ui/react-toolbar";
import {
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconAlt,
  IconCheck,
  IconFloatLeft,
  IconFloatNone,
  IconFloatRight,
  IconTextCaption,
  IconTrash,
} from "@tabler/icons-react";
import type { NodeViewProps } from "@tiptap/react";
import {
  type CSSProperties,
  type ForwardedRef,
  forwardRef,
  type MouseEventHandler,
  type RefObject,
  useEffect,
  useRef,
} from "react";

import { Tooltip } from "@/components/ui/Tooltip";
import { Text } from "@/components/ui/Typography";
import { bgColors, borders, gaps, gapsSmall } from "@/styles";
import { offsetSizes } from "@/styles/popper/offset";
import { cn } from "@/utils";

import { Button, IconButton } from "../../../Button";
import { InputRaw } from "../../../Input";
import { Popover, usePopover } from "../../../Popover";
import { toolbarClassName } from "../../Menus/bubblemenu";
import { menuGroupClassName } from "../../Menus/menuItem";

const MIN_WIDTH = 64;

type ImageOptionsProps = {
  containerRef: RefObject<HTMLDivElement>;
  imgRef: RefObject<HTMLImageElement>;
  open: boolean;
  setOpen: (value: boolean) => void;
  setResizingStyle: (value: Pick<CSSProperties, "width"> | undefined) => void;
  isFigure: boolean;
} & NodeViewProps;

export const ImageOptions = ({
  containerRef,
  imgRef,
  open,
  setOpen,
  setResizingStyle,
  updateAttributes,
  editor,
  deleteNode,
  node,
  getPos,
  isFigure,
}: ImageOptionsProps) => {
  const altPopoverProps = usePopover();

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
    elements: { reference: imgRef.current },
    middleware: [offset({ mainAxis: offsetSizes.md })],
  });
  const {
    floatingStyles: leftDragStyles,
    refs: { setFloating: setLeftDrag },
  } = useFloating({
    open,
    whileElementsMounted: (...props) =>
      autoUpdate(...props, { animationFrame: true }),
    placement: "left",
    elements: { reference: imgRef.current },
    middleware: [offset({ mainAxis: offsetSizes.md })],
  });
  const {
    floatingStyles: rightDragStyles,
    refs: { setFloating: setRightDrag },
  } = useFloating({
    open,
    whileElementsMounted: (...props) =>
      autoUpdate(...props, { animationFrame: true }),
    placement: "right",
    elements: { reference: imgRef.current },
    middleware: [offset({ mainAxis: offsetSizes.md })],
  });

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current) return;
    event.preventDefault();
    const direction = event.currentTarget.dataset.direction || "--";
    const initialXPosition = event.clientX;
    const currentWidth = imgRef.current.width;
    let newWidth = currentWidth;
    const transform = direction === "w" ? -1 : 1;

    const removeListeners = () => {
      window.removeEventListener("mousemove", mouseMoveHandler);
      window.removeEventListener("mouseup", removeListeners);
      updateAttributes({ width: newWidth });
      setResizingStyle(undefined);
    };

    const mouseMoveHandler = (event: MouseEvent) => {
      newWidth = Math.max(
        currentWidth + transform * (event.clientX - initialXPosition),
        MIN_WIDTH
      );
      setResizingStyle({ width: newWidth });
      // If mouse is up, remove event listeners
      if (!event.buttons) removeListeners();
    };

    window.addEventListener("mousemove", mouseMoveHandler);
    window.addEventListener("mouseup", removeListeners);
  };

  return (
    open && (
      <Portal ref={portalRef}>
        <DragCornerButton
          style={leftDragStyles}
          ref={setLeftDrag}
          onMouseDown={handleMouseDown}
          direction="w"
        />
        <DragCornerButton
          style={rightDragStyles}
          ref={setRightDrag}
          onMouseDown={handleMouseDown}
          direction="e"
        />
        <div style={floatingStyles} ref={refs.setFloating}>
          <ToolbarRoot className={cn("flex", toolbarClassName)}>
            <div className={cn(menuGroupClassName)}>
              <Popover
                size="sm"
                controller={altPopoverProps}
                popoverPortalProps={{ container: portalRef.current }}
                side="top"
                buttonComponent={
                  <ToolbarButton asChild>
                    <IconButton
                      size="xs"
                      variant="ghost"
                      icon={IconAlt}
                      ariaLabel="edit_alt"
                    />
                  </ToolbarButton>
                }
                content={
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      altPopoverProps.close();
                    }}
                    className={cn("flex flex-col", gaps.sm)}
                  >
                    <div className={cn("flex flex-col", gapsSmall.xs)}>
                      <Text size="xs">Alt-Tag</Text>
                      <InputRaw
                        size="sm"
                        defaultValue={node.attrs.alt}
                        onChange={(value) => updateAttributes({ alt: value })}
                      />
                    </div>
                    <Button
                      type="submit"
                      leftIcon={IconCheck}
                      color="primary"
                      size="sm"
                    >
                      Bestätigen
                    </Button>
                  </form>
                }
              />
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
                          .figureToImage()
                          .run();
                      } else {
                        editor
                          .chain()
                          .setNodeSelection(getPos())
                          .focus()
                          .imageToFigure()
                          .run();
                      }
                    }}
                    ariaLabel="edit_caption"
                  />
                </ToolbarButton>
              </Tooltip>
            </div>
            <div className={cn(menuGroupClassName)}>
              <ToolbarButton asChild>
                <IconButton
                  size="xs"
                  variant={
                    editor.isActive({ textAlign: "left" }) ? "subtile" : "ghost"
                  }
                  icon={IconAlignLeft}
                  ariaLabel="align_left"
                  onClick={() => {
                    editor.commands.setTextAlign("left");
                  }}
                />
              </ToolbarButton>
              <ToolbarButton asChild>
                <IconButton
                  size="xs"
                  variant={
                    editor.isActive({ textAlign: "center" })
                      ? "subtile"
                      : "ghost"
                  }
                  icon={IconAlignCenter}
                  ariaLabel="align_center"
                  onClick={() => {
                    editor.commands.setTextAlign("center");
                  }}
                />
              </ToolbarButton>
              <ToolbarButton asChild>
                <IconButton
                  size="xs"
                  variant={
                    editor.isActive({ textAlign: "right" })
                      ? "subtile"
                      : "ghost"
                  }
                  icon={IconAlignRight}
                  ariaLabel="align_right"
                  onClick={() => {
                    editor.commands.setTextAlign("right");
                  }}
                />
              </ToolbarButton>
            </div>
            <div className={cn(menuGroupClassName)}>
              <ToolbarButton asChild>
                <IconButton
                  size="xs"
                  variant={
                    editor.isActive({ "data-float": "left" })
                      ? "subtile"
                      : "ghost"
                  }
                  icon={IconFloatLeft}
                  ariaLabel="float_left"
                  onClick={() => {
                    editor.commands.setFloat("left");
                  }}
                />
              </ToolbarButton>
              <ToolbarButton asChild>
                <IconButton
                  size="xs"
                  variant={
                    editor.isActive({ "data-float": "right" })
                      ? "subtile"
                      : "ghost"
                  }
                  icon={IconFloatRight}
                  ariaLabel="float_right"
                  onClick={() => {
                    editor.commands.setFloat("right");
                  }}
                />
              </ToolbarButton>
              <ToolbarButton asChild>
                <IconButton
                  size="xs"
                  variant={
                    editor.isActive({ "data-float": "none" })
                      ? "subtile"
                      : "ghost"
                  }
                  icon={IconFloatNone}
                  ariaLabel="unset_float"
                  onClick={() => {
                    editor.commands.unsetFloat();
                  }}
                />
              </ToolbarButton>
            </div>
            <ToolbarButton asChild>
              <IconButton
                size="xs"
                variant="ghost"
                icon={IconTrash}
                ariaLabel="Bild löschen"
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

type DragCornerButtonProps = {
  direction: string;
  onMouseDown: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
};

const DragCornerButton = forwardRef(
  (
    { direction, onMouseDown, style }: DragCornerButtonProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      role="button"
      aria-label={`resize_${direction}`}
      tabIndex={0}
      onMouseDown={onMouseDown}
      data-direction={direction}
      style={style}
      className={cn(
        "absolute w-2 h-16 rounded-full border",
        direction === "w" && "left-0 cursor-w-resize",
        direction === "e" && "right-0 cursor-e-resize",
        bgColors.white,
        borders.accent
      )}
    />
  )
);

DragCornerButton.displayName = "DragCornerButton";
