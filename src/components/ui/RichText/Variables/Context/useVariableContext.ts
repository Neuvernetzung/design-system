import { useContext } from "react";
import { VariablesContext } from "./context";

export const useVariablesContext = () => {
  const variables = useContext(VariablesContext);

  if (variables === undefined)
    throw new Error(
      "useVariablesContext must be used within a VariablesProvider"
    );

  return variables;
};
