import { useContext } from "react";
import { VariablesContext, type VariablesContextProps } from "./context";

export const useVariablesContext = (): VariablesContextProps => {
  const variables = useContext(VariablesContext);

  if (variables === undefined)
    throw new Error(
      "useVariablesContext must be used within a VariablesProvider"
    );

  return variables;
};
