import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import isString from "lodash/isString";
import { type ReactElement, useEffect } from "react";

import { gaps, paddingsYLarge } from "@/styles";
import { cn } from "@/utils";

import type { Size } from "../../../types";
import { Button, IconButton, SelectRaw, Text } from "../../ui";
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATIONS_LIMITS,
  PAGINATION_MIN_PAGE,
} from "./constants";

export type PaginationProps = {
  limits?: number[];
  result: number;
  emptyMessage?: ReactElement;
  size?: Size;
  containerClassName?: string;
  selectLimit?: boolean;
  variant?: "default" | "minimalistic";
} & SetPageProps &
  SetLimitProps;

type SetPageProps = {
  page: number | undefined;
  setPage: (page: number) => void;
};

type SetLimitProps =
  | {
      limit: number | undefined;
      setLimit: (limit: number) => void;
    }
  | {
      limit?: never;
      setLimit?: never;
    };

export const Pagination = ({
  limits = DEFAULT_PAGINATIONS_LIMITS,
  result = 0,
  emptyMessage,
  page = DEFAULT_PAGINATION_PAGE,
  setPage,
  limit: limitValue,
  setLimit,
  size = "md",
  containerClassName,
  selectLimit = true,
  variant = "default",
}: PaginationProps) => {
  const limit = limitValue || limits?.[0] || DEFAULT_PAGINATION_LIMIT;

  useEffect(() => {
    // Wenn sich das Result oder Limit ändert z.B. durch Filtern einer anderen Funktion oä. wird automatisch zur letzten Seite gesprungen.
    if (page <= Math.ceil(result / limit)) return;

    setPage(Math.max(Math.ceil(result / limit), PAGINATION_MIN_PAGE));
  }, [result, limit]);

  return (
    <div
      className={cn(
        "flex flex-row items-center justify-between",
        gaps[size],
        paddingsYLarge[size],
        containerClassName
      )}
    >
      {selectLimit && result !== 0 && limits.length > 1 && (
        <SelectRaw
          id="limit"
          value={limit}
          onChange={(v) => setLimit?.(v || DEFAULT_PAGINATION_LIMIT)}
          options={limits.map((limit) => ({
            children: `${limit} pro Seite`,
            value: limit,
          }))}
          placement="bottom-start"
          variant="ghost"
          size={size}
        />
      )}
      {result !== 0 ? (
        result > 1 * limit && (
          <div className="flex flex-row">
            <IconButton
              variant="ghost"
              type="button"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              icon={IconChevronLeft}
              ariaLabel="before page"
              size={size}
            />

            {variant === "default" &&
              Array(Math.ceil(result / limit))
                .fill(1)
                .map((_, i) =>
                  i === 0 ||
                  i === Math.ceil(result / limit) - 1 ||
                  (i >= page - 2 && i <= page) ? (
                    <Button
                      variant={i + 1 === page ? "filled" : "ghost"}
                      key={i}
                      type="button"
                      onClick={() => setPage(i + 1)}
                      className="min-w-[2.5rem]"
                      size={size}
                    >
                      {i + 1}
                    </Button>
                  ) : (
                    i >= page - 3 &&
                    i <= page + 1 && (
                      <Button variant="ghost" size={size} disabled key={i}>
                        ...
                      </Button>
                    )
                  )
                )}
            {variant === "minimalistic" && (
              <Button variant="ghost" className="pointer-events-none">
                {page} / {Math.ceil(result / limit)}
              </Button>
            )}

            <IconButton
              variant="ghost"
              type="button"
              onClick={() => setPage(page + 1)}
              icon={IconChevronRight}
              disabled={page === Math.ceil(result / limit)}
              ariaLabel="next page"
              size={size}
            />
          </div>
        )
      ) : emptyMessage ? (
        <div className="w-full flex justify-center">
          {isString(emptyMessage) ? <Text>{emptyMessage}</Text> : emptyMessage}
        </div>
      ) : null}
    </div>
  );
};

Pagination.displayName = "pagination";
