import { Extension } from "@tiptap/core";
import { Plugin } from "@tiptap/pm/state";

import { floatingStore, nodeDOMAtCoords } from "./NodeView";

function absoluteRect(node: Element) {
  const data = node.getBoundingClientRect();

  return {
    top: data.top,
    left: data.left,
    width: data.width,
  };
}

const DragHandle = () => {
  function hideDragHandle() {
    floatingStore.setState({ show: false });
  }

  function showDragHandle() {
    floatingStore.setState({ show: true });
  }

  return new Plugin({
    props: {
      handleDOMEvents: {
        mousemove: (view, event) => {
          if (!view.editable) {
            return;
          }

          const node = nodeDOMAtCoords({
            x: event.clientX + 50,
            y: event.clientY,
          });

          if (!(node instanceof Element) || node.matches("ul, ol")) {
            hideDragHandle();
            return;
          }

          const compStyle = window.getComputedStyle(node);
          const lineHeight = parseInt(compStyle.lineHeight, 10);
          const paddingTop = parseInt(compStyle.paddingTop, 10);

          const rect = absoluteRect(node);

          rect.top += (lineHeight - 24) / 2;
          rect.top += paddingTop;
          // Li markers
          if (node.matches("ul:not([data-type=taskList]) li, ol li")) {
            rect.left -= 24;
          }
          rect.width = 0;

          floatingStore.setState({
            top: rect.top,
            left: rect.left - rect.width,
          });

          showDragHandle();
        },
        keydown: () => {
          hideDragHandle();
        },
        mousewheel: () => {
          hideDragHandle();
        },
        // dragging class is used for CSS
        dragstart: (view) => {
          view.dom.classList.add("dragging");
        },
        drop: (view) => {
          view.dom.classList.remove("dragging");
        },
        dragend: (view) => {
          view.dom.classList.remove("dragging");
        },
      },
    },
  });
};

export const FloatingExtension = Extension.create({
  name: "floatingMenu",

  addProseMirrorPlugins() {
    return [DragHandle()];
  },
});
