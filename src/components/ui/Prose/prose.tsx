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
  "prose-img:rounded-md"
);
