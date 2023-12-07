import { cn } from "@/utils";

import { Color } from "../types";
import { textColors } from "./colors";
import { focus } from "./focus";
import { transition } from "./transition";

type LinkStyleProps = { color?: Color };

export const getLinkStyle = ({ color = "accent" }: LinkStyleProps) =>
  cn("underline font-bold", textColors[color], focus[color], transition);
