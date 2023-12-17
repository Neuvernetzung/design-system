import { cn } from "@/utils";

import { Button, type ButtonProps } from "../button";

export type DropButtonProps = Omit<ButtonProps, "variant">;

export const DropButton = ({
  asChild,
  className,
  ...props
}: DropButtonProps) => (
  <Button
    variant="outline"
    className={cn("border-2 border-dashed", className)}
    asChild={asChild}
    {...props}
  />
);
