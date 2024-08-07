import type { EmailVariables } from "@/utils/template/renderEmailTemplate";
import { createContext } from "react";

export type VariablesContextProps = {
  variables: EmailVariables | undefined;
  parseVariables?: boolean;
};

export const VariablesContext = createContext<
  VariablesContextProps | undefined
>(undefined);
