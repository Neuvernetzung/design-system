import {
  NodeViewContent,
  type NodeViewProps,
  NodeViewWrapper,
} from "@tiptap/react";
import type { FC } from "react";
import { useEffect, useState } from "react";

import { TableCellMenu } from "./CellMenu";

export const TableCellNodeView: FC<NodeViewProps> = ({
  getPos,
  editor,
  node,
  selected,
}) => {
  const [isCurrentCellActive, setIsCurrentCellActive] = useState(false);

  const calculateActiveStateOfCurrentCell = () => {
    const { from, to } = editor.state.selection;

    const nodeFrom = getPos();
    const nodeTo = nodeFrom + node.nodeSize;

    setIsCurrentCellActive(nodeFrom <= from && to <= nodeTo);
  };

  useEffect(() => {
    editor.on("selectionUpdate", calculateActiveStateOfCurrentCell);

    setTimeout(calculateActiveStateOfCurrentCell, 100);

    return () => {
      editor.off("selectionUpdate", calculateActiveStateOfCurrentCell);
    };
  });

  return (
    <NodeViewWrapper>
      <NodeViewContent as="span" />
      {(isCurrentCellActive || selected) && <TableCellMenu editor={editor} />}
    </NodeViewWrapper>
  );
};
