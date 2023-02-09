import cn from "classnames";
import { borders, marginsY } from "../../../styles";

export type HorizontalRuleProps = {};

export const HorizontalRule = () => (
  <hr className={cn(marginsY.lg, borders.accent)} />
);
