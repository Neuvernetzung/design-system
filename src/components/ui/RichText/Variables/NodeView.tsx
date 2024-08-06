import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { type FC } from "react";

import { Tag } from "../../Tag";
import { useVariablesContext } from "./Context/useVariableContext";

export const VariableNodeView: FC<NodeViewProps> = ({ node }) => {
  const { parseVariables, variables } = useVariablesContext();

  const variable = variables?.[node?.attrs.id];

  return (
    <NodeViewWrapper className="inline w-fit">
      {parseVariables ? (
        <Tag
          size="sm"
          variant="subtile"
          color={!variable ? "danger" : "accent"}
        >
          {variable
            ? variable.value
              ? variable.value
              : variable.title
            : `"unbekannte Variable"`}
        </Tag>
      ) : (
        <Tag
          size="sm"
          variant="subtile"
          color={!variable ? "danger" : "accent"}
        >
          {variable?.title || `unbekannte Variable`}
        </Tag>
      )}
    </NodeViewWrapper>
  );
};
