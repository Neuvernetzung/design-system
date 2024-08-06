import { useMemo } from "react";
import { VariablesContext } from "./context";
import { EmailVariables } from "@/utils/template/renderEmailTemplate";

export function VariablesContextProvider({
  children,
  parseVariables,
  variables,
}: {
  children: React.ReactNode;
  parseVariables?: boolean;
  variables: EmailVariables;
}) {
  const providerValue = useMemo(
    () => ({ variables, parseVariables }),
    [variables, parseVariables]
  );

  return (
    <VariablesContext.Provider value={providerValue}>
      {children}
    </VariablesContext.Provider>
  );
}
