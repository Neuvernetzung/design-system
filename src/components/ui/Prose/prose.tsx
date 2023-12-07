import { sanitize } from "dompurify";

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
      dangerouslySetInnerHTML={{ __html: sanitize(content) }}
      className={cn(proseClassName, className)}
    />
  );
};

export const proseClassName = cn(
  "prose prose-accent dark:prose-invert prose-sm sm:prose-base",
  "prose-headings:font-heading prose-headings:font-semibold",
  "prose-a:after:content-['↗'] prose-a:after:align-middle",
  "prose-img:rounded-md prose-img:inline-block data-[float=left]:prose-figure:mr-4 data-[float=right]:prose-figure:ml-4",
  "prose-th:bg-accent-100 dark:prose-th:bg-accent-900 prose-th:border-accent-300 dark:prose-th:border-accent-700",
  "prose-td:border-accent-300 dark:prose-td:border-accent-700"
);
