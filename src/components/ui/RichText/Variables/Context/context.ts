import { createContext } from "react";
import type { EmailVariable } from "../../emailEditor";

interface VariablesContextProps {
  variables: EmailVariable[] | undefined;
  parseVariables: boolean;
}

export const VariablesContext = createContext<
  VariablesContextProps | undefined
>(undefined);
