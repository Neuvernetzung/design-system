import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { type FC } from "react";

import { Tag } from "../../Tag";
import { useVariablesContext } from "./Context/useVariableContext";

export const VariableNodeView: FC<NodeViewProps> = ({ node }) => {
  const { parseVariables, variables } = useVariablesContext();

  const title = variables?.find(
    (variable) => variable.value === node?.attrs.id
  )?.title;

  return (
    <NodeViewWrapper className="inline w-fit">
      {parseVariables ? (
        title ?? `unbekannte Variable`
      ) : (
        <Tag size="sm" variant="subtile" color={!title ? "danger" : "accent"}>
          {title ?? `unbekannte Variable`}
        </Tag>
      )}
    </NodeViewWrapper>
  );
};
