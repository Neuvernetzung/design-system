import type { LinechartDataFieldProps } from "../Linechart";

const missingValueBehaviours = ["skip", "zero", "undefined"] as const;

export type MissingValueBehaviour = (typeof missingValueBehaviours)[number];

type FilterMissingChartDataProps = {
  data: LinechartDataFieldProps[];
  getY: (d: LinechartDataFieldProps) => number | null;
  missingValueBehaviour: MissingValueBehaviour;
};

export const filterMissingChartData = ({
  data,
  getY,
  missingValueBehaviour,
}: FilterMissingChartDataProps) =>
  data.filter((d) => {
    if (missingValueBehaviour === "skip") return getY(d) !== null;
    return true;
  });
