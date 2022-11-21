import cn from "classnames";
import { forwardRef, ReactNode } from "react";

import { gaps, paddingsX, paddingsY } from "../../../styles";
import { Link } from "../../ui/Link";
import { Text } from "../../ui/Typography/Text";

type FooterProps = {
  logo?: ReactNode;
  cols?: LinkGroupProps[];
  copyright?: string;
  className?: string;
};

type LinkGroupProps = {
  label: string;
  links: LinkProps[];
};

type LinkProps = {
  label: string;
  href: string;
};

export const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({ logo, cols, copyright, className }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-accent-50 dark:bg-accent-900 flex flex-col",
        gaps.md,
        className
      )}
    >
      <div
        className={cn("w-full max-w-6xl mx-auto", paddingsY.xl, paddingsX.lg)}
      >
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
            gaps.md
          )}
        >
          {cols &&
            cols?.map(({ label, links }, i) => (
              <div
                className="items-start flex flex-col"
                key={`footerlinkgroup_${i}`}
              >
                <Text size="sm" className="font-semibold">
                  {label}
                </Text>
                {links.map(({ label, href }, _i) => (
                  <Text size="sm" key={`footergroup_${i}_el_${_i}`}>
                    <Link href={href}>{label}</Link>
                  </Text>
                ))}
              </div>
            ))}
        </div>
      </div>
      {(copyright || logo) && (
        <div
          className={cn("flex flex-col items-center", gaps.md, paddingsY.md)}
        >
          <div className={cn("flex justify-center items-center w-full")}>
            <div className="border-b border-accent-200 dark:border-accent-700 w-full flex-grow" />
            {logo && <div className={cn("flex", paddingsX.xl)}>{logo}</div>}
            <div className="border-b border-accent-200 dark:border-accent-700 w-full flex-grow" />
          </div>

          <Text size="xs">{copyright}</Text>
        </div>
      )}
    </div>
  )
);

Footer.displayName = "Footer";

Footer.defaultProps = {
  logo: undefined,
  cols: [],
  copyright: undefined,
  className: undefined,
};
