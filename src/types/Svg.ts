import { FC, ForwardRefExoticComponent, SVGProps } from "react";

export type SvgType =
  | ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref">>
  | FC<SVGProps<SVGSVGElement>>;
