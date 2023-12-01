import { Portal } from "@radix-ui/react-portal";
import { IconGripVertical, IconPlus } from "@tabler/icons-react";
import { NodeSelection } from "@tiptap/pm/state";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore - // __serializeForClipboard ist zwar verfügbar, jedoch intern bei prosemirror-view
import { __serializeForClipboard, type EditorView } from "@tiptap/pm/view";
import type { Editor } from "@tiptap/react";
import type { DragEvent, MouseEvent } from "react";
import { create, useStore } from "zustand";

import { paddingsXSmall } from "@/styles";
import { cn } from "@/utils";

import { IconButton } from "../../Button/IconButton";
import { Tooltip } from "../../Tooltip";

export const floatingStore = create(() => ({
  show: false,
  left: 0,
  top: 0,
}));

export function nodeDOMAtCoords(coords: { x: number; y: number }) {
  return document
    .elementsFromPoint(coords.x, coords.y)
    .find(
      (elem: Element) =>
        elem.parentElement?.matches?.(".ProseMirror") ||
        elem.matches(
          [
            "li",
            "p:not(:first-child)",
            "pre",
            "blockquote",
            "h1, h2, h3, h4, h5, h6",
          ].join(", ")
        )
    );
}

function nodePosAtDOM(node: Element, view: EditorView) {
  const boundingRect = node.getBoundingClientRect();

  return view.posAtCoords({
    left: boundingRect.left + 1,
    top: boundingRect.top + 1,
  })?.inside;
}

const handleDragStart = (event: DragEvent, view: EditorView) => {
  view.focus();

  if (!event.dataTransfer) return;

  const node = nodeDOMAtCoords({
    x: event.clientX + 50 + 24,
    y: event.clientY,
  });

  if (!(node instanceof Element)) return;

  const nodePos = nodePosAtDOM(node, view);
  if (nodePos == null || nodePos < 0) return;

  view.dispatch(
    view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))
  );

  const slice = view.state.selection.content();

  const { dom, text } = __serializeForClipboard(view, slice);

  event.dataTransfer.clearData();
  event.dataTransfer.setData("text/html", dom.innerHTML);
  event.dataTransfer.setData("text/plain", text);
  // eslint-disable-next-line no-param-reassign
  event.dataTransfer.effectAllowed = "copyMove";

  event.dataTransfer.setDragImage(node, 0, 0);

  // eslint-disable-next-line no-param-reassign
  view.dragging = { slice, move: event.ctrlKey };
};

function handleClick(event: MouseEvent, view: EditorView) {
  view.focus();

  view.dom.classList.remove("dragging");

  const node = nodeDOMAtCoords({
    x: event.clientX + 50 + 24, // options.dragHandleWidth
    y: event.clientY,
  });

  if (!(node instanceof Element)) return;

  const nodePos = nodePosAtDOM(node, view);
  if (!nodePos) return;

  view.dispatch(
    view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos))
  );
}

type FloatingProps = {
  editor: Editor;
};

export const Floating = ({ editor }: FloatingProps) => {
  const { left, show, top } = useStore(floatingStore);

  const createNodeAfter = (event: MouseEvent) => {
    const node = nodeDOMAtCoords({
      x: event.clientX + 50 + 24,
      y: event.clientY,
    });

    if (!(node instanceof Element)) return;

    const nodePos = nodePosAtDOM(node, editor.view);
    if (nodePos == null || nodePos < 0) return;

    const nodeSize = editor.state.doc.nodeAt(nodePos)?.nodeSize || 0;
    const nodeEnd = nodePos + nodeSize;

    editor
      .chain()
      .insertContentAt(nodeEnd, {
        type: "paragraph",
      })
      .focus()
      .run();
  };

  if (!show) return null;

  return (
    <Portal>
      <div
        aria-hidden={!show}
        data-show={show}
        className={cn(
          "fixed flex flex-row-reverse items-center -translate-x-full",
          paddingsXSmall.md
        )}
        style={{ left, top }}
      >
        <Tooltip label="Ziehen zum verschieben" size="xs" delay={500}>
          <IconButton
            draggable
            className="w-min px-0 aspect-auto cursor-grab"
            onDragStart={(e) => handleDragStart(e, editor.view)}
            onClick={(e) => handleClick(e, editor.view)}
            icon={IconGripVertical}
            ariaLabel="drag_handle"
            size="xs"
            variant="ghost"
          />
        </Tooltip>
        <Tooltip label="Zeile darunter einfügen" size="xs" delay={500}>
          <IconButton
            icon={IconPlus}
            size="xs"
            variant="ghost"
            ariaLabel="add_row"
            onClick={createNodeAfter}
          />
        </Tooltip>
      </div>
    </Portal>
  );
};
