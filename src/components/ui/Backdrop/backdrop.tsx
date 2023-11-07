import cn from "classnames";
import { typedMemo } from "../../../utils/internal";
import { backdropAnimation } from "../../../styles";

export type BackdropProps = { isOpen: boolean };

export const Backdrop = ({ isOpen }: BackdropProps) => (
  <div
    data-state={isOpen ? "open" : "closed"}
    className={cn(
      "fixed inset-0 bg-opacity-25 bg-black backdrop-blur-sm",
      backdropAnimation,
      "will-change-[opacity]"
    )}
  />
);

export default typedMemo(Backdrop);
