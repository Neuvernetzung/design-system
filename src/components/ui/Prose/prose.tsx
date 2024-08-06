import { sanitize } from "isomorphic-dompurify";

import { cn } from "@/utils/cn";

export type ProseProps = {
  content: string | Node | undefined;
  className?: string;
};

export const Prose = ({ content, className }: ProseProps) => {
  if (!content) return null;

  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{
        __html: sanitize(content, { ADD_ATTR: ["target"] }),
      }}
      className={cn(proseClassName, className)}
    />
  );
};

export const proseClassName = cn(
  // Base
  "prose prose-accent dark:prose-invert prose-sm sm:prose-base",
  // Headings
  "prose-headings:font-heading prose-headings:font-semibold",
  // Anchor
  "prose-a:after:content-['↗'] prose-a:after:align-middle",
  // Image
  "prose-img:rounded-md prose-img:inline-block",
  "data-[float=left]:prose-img:mr-4 data-[float=right]:prose-img:ml-4 data-[float=left]:prose-figure:mr-4 data-[float=right]:prose-figure:ml-4",
  // Video
  "prose-video:rounded-md prose-video:inline-block prose-video:w-full",
  // Table
  "prose-th:bg-accent-100 dark:prose-th:bg-accent-900 prose-th:border-accent-300 dark:prose-th:border-accent-700",
  "prose-td:border-accent-300 dark:prose-td:border-accent-700"
);
