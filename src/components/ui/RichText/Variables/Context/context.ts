import { EmailVariables } from "@/utils/template/renderEmailTemplate";
import { createContext } from "react";

interface VariablesContextProps {
  variables: EmailVariables | undefined;
  parseVariables?: boolean;
}

export const VariablesContext = createContext<
  VariablesContextProps | undefined
>(undefined);
