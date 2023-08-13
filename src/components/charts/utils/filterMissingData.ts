const missingValueBehaviours = ["skip", "zero", "undefined"] as const;

export type MissingValueBehaviour = (typeof missingValueBehaviours)[number];

type FilterMissingChartDataProps<TData> = {
  data: TData[];
  getY: (d: TData) => number | null;
  missingValueBehaviour: MissingValueBehaviour;
};

export const filterMissingChartData = <TData>({
  data,
  getY,
  missingValueBehaviour,
}: FilterMissingChartDataProps<TData>) =>
  data.filter((d) => {
    if (missingValueBehaviour === "skip") return getY(d) !== null;
    return true;
  });
