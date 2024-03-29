import { cn } from "@/utils";
import { backdropAnimation } from "../../../styles";

export type BackdropProps = { isOpen: boolean; className?: string };

export const Backdrop = ({ isOpen, className }: BackdropProps) => (
  <div
    data-state={isOpen ? "open" : "closed"}
    className={cn(
      "fixed inset-0 bg-opacity-25 bg-black backdrop-blur-sm",
      backdropAnimation,
      "will-change-[opacity]",
      className
    )}
  />
);
