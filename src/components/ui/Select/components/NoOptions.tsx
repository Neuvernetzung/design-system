import type { ReactNode } from "react";

import { paddings } from "@/styles";
import type { Size } from "@/types";
import { cn } from "@/utils";

import { Text } from "../../Typography/Text";

type NoOptionsProps = {
  size: Size;
  message: string | ReactNode;
};

export const NoOptionsFound = ({ size, message }: NoOptionsProps) => (
  <Text size={size} asChild>
    <li className={cn(paddings[size], "flex items-center justify-center")}>
      {message}
    </li>
  </Text>
);
