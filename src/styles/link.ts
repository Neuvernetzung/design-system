import cn from "classnames";

import { focus } from "./focus";
import { transition } from "./transition";
import { Color } from "../types";
import { textColors } from "./colors";

type LinkStyleProps = { color?: Color };

export const linkStyle = ({ color = "accent" }: LinkStyleProps) =>
  cn("underline font-bold", textColors[color], focus[color], transition);
