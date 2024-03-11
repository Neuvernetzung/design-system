import { FC, ForwardRefExoticComponent, SVGProps } from "react";

type SvgProps = Omit<SVGProps<SVGSVGElement>, "stroke">;

export type SvgType =
  | ForwardRefExoticComponent<Omit<SvgProps, "ref">>
  | FC<SVGProps<SVGSVGElement>>;
