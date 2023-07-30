import {
  ComponentPropsWithoutRef,
  ForwardedRef,
  ReactNode,
  forwardRef,
} from "react";

export type ChartMargin = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export type ChartWrapperProps = {
  children: ReactNode;
};

export const ChartWrapper = forwardRef(
  ({ children }: ChartWrapperProps, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className="relative h-full w-full">
      {children}
    </div>
  )
);

ChartWrapper.displayName = "ChartWrapper";

export type ChartXAxisWrapperProps = {
  children: ReactNode;
};

export const ChartXAxisWrapper = forwardRef(
  ({ children }: ChartXAxisWrapperProps, ref: ForwardedRef<SVGSVGElement>) => (
    <svg className="overflow-visible">
      <g ref={ref}>{children}</g>
    </svg>
  )
);

ChartXAxisWrapper.displayName = "ChartXAxisWrapper";

export type ChartYAxisWrapperProps = {
  children: ReactNode;
};

export const ChartYAxisWrapper = forwardRef(
  ({ children }: ChartYAxisWrapperProps, ref: ForwardedRef<SVGSVGElement>) => (
    <svg className="overflow-visible">
      <g ref={ref}> {children}</g>
    </svg>
  )
);

ChartYAxisWrapper.displayName = "ChartYAxisWrapper";

export type ChartAreaWrapperProps = {
  id?: string;
  children: ReactNode;
  width: number;
  height: number;
  margin?: ChartMargin;
} & ComponentPropsWithoutRef<"svg">;

export const ChartAreaWrapper = forwardRef(
  (
    { id, children, width, height, margin, ...props }: ChartAreaWrapperProps,
    ref: ForwardedRef<SVGSVGElement>
  ) => (
    <svg
      ref={ref}
      id={id}
      width={width}
      height={height}
      style={{ marginLeft: margin?.left }}
      className="absolute inset-0 overflow-visible"
      {...props}
    >
      {children}
    </svg>
  )
);

ChartAreaWrapper.displayName = "ChartAreaWrapper";
