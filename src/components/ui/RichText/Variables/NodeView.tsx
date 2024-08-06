/* eslint-disable @next/next/no-img-element */

import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { type FC } from "react";

import { useVariablesContext } from "./Context/useVariableContext";
import { Tag } from "../../Tag";

export const VariableNodeView: FC<NodeViewProps> = ({ node }) => {
  const { parseVariables, values } = useVariablesContext();
  return (
    <NodeViewWrapper className="inline w-fit">
      <Tag size="sm" variant="subtile">
        {parseVariables
          ? values?.find((value) => value.value === node?.attrs.id)?.title ??
            `variable not found`
          : `@${node.attrs.label}`}
      </Tag>
    </NodeViewWrapper>
  );
};
