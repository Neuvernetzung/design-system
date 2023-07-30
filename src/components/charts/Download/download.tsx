import { MutableRefObject, RefObject } from "react";

const chartdownloadTypes = ["svg", "png"] as const;

type ChartDownloadType = (typeof chartdownloadTypes)[number];

type DownloadChartProps = {
  type?: ChartDownloadType;
  title: string;
} & DownloadChartRefOrId;

type DownloadChartRefOrId =
  | { id: string; ref?: never }
  | {
      id?: never;
      ref?: RefObject<SVGSVGElement> | MutableRefObject<SVGSVGElement>;
    };

export const downloadChart = ({
  type = "svg",
  id,
  ref,
  title,
}: DownloadChartProps) => {
  const svg = id ? document.getElementById(id) : ref?.current;
  if (!svg) return;

  if (type === "png") {
    const svgData = new XMLSerializer().serializeToString(svg);
    svgToPng(svgData, title);
    return;
  }

  const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });

  clickDownload(URL.createObjectURL(blob), title, "svg");
};

const svgToPng = async (svgData: string, title: string) => {
  await new Promise((resolve) => {
    let canvas;
    let ctx: CanvasRenderingContext2D | null;
    let img: HTMLImageElement;

    const svgDataurl = `data:image/svg+xml;base64,${Buffer.from(
      svgData
    ).toString("base64")}`;

    img = new Image();
    img.src = svgDataurl;
    img.onload = () => {
      canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, img.width, img.height);

      img = new Image();
      img.src = canvas.toDataURL("image/png");
      img.onload = () => {
        canvas = document.createElement("canvas");
        ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      };

      clickDownload(img.src, title, "png");
    };
  });
};

const clickDownload = (
  href: string,
  title: string,
  type: ChartDownloadType
) => {
  const link = document.createElement("a");
  link.href = href;
  link.download = `${title}.${type}`;
  link.click();
};
