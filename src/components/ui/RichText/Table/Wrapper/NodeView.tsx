import { autoUpdate, offset, useFloating } from "@floating-ui/react-dom";
import { Portal } from "@radix-ui/react-portal";
import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from "@tiptap/react";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { offsetSizes } from "@/styles/popper/offset";

import { TableMenu } from "./TableMenu";

export const TableWrapperNodeView: FC<NodeViewProps> = ({
  getPos,
  editor,
  node,
  selected,
}) => {
  const { refs, floatingStyles } = useFloating<HTMLDivElement>({
    whileElementsMounted: autoUpdate,
    placement: "bottom-end",
    middleware: [offset({ mainAxis: offsetSizes.md })],
  });

  const [isTableActive, setIsTableActive] = useState(false);

  const calculateActiveStateOfCurrentCell = () => {
    const { from, to } = editor.state.selection;

    const nodeFrom = getPos();
    const nodeTo = nodeFrom + node.nodeSize;

    setIsTableActive(nodeFrom <= from && to <= nodeTo);
  };

  useEffect(() => {
    editor.on("selectionUpdate", calculateActiveStateOfCurrentCell);

    setTimeout(calculateActiveStateOfCurrentCell, 100);

    return () => {
      editor.off("selectionUpdate", calculateActiveStateOfCurrentCell);
    };
  });

  return (
    <NodeViewWrapper ref={refs.setReference}>
      <NodeViewContent />
      {(isTableActive || selected) && (
        <Portal>
          <TableMenu
            ref={refs.setFloating}
            style={floatingStyles}
            editor={editor}
          />
        </Portal>
      )}
    </NodeViewWrapper>
  );
};
