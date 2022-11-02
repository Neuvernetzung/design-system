import { ReactNode } from "react";

import { Notify } from "../ui/Notify";

type OverlayProviderProps = {
  children: ReactNode;
};

export const OverlayProvider = ({ children }: OverlayProviderProps) => (
  <>
    <Notify />
    {children}
  </>
);
