import { useMemo } from "react";
import { VariablesContext } from "./context";
import type { EmailVariable } from "../../emailEditor";

export function VariablesContextProvider({
  children,
  parseVariables,
  variables,
}: {
  children: React.ReactNode;
  parseVariables?: boolean;
  variables: EmailVariable[];
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
