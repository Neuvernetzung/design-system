import { ChartMargin } from "../components/wrapper";

type GetInnerDimensionsProps = {
  margin: ChartMargin;
  width: number;
  height: number;
};

export const getInnerDimensions = ({
  margin,
  height,
  width,
}: GetInnerDimensionsProps) => {
  const innerHeight = height - margin.bottom - margin.top;
  const innerWidth = width - margin.left - margin.right;

  return { innerHeight, innerWidth };
};
