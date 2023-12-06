import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect } from "react";

import { cn } from "@/utils";

import type { Size } from "../../../types";
import { Button, IconButton, SelectRaw, Text } from "../../ui";
import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
  DEFAULT_PAGINATIONS_LIMITS,
} from "./constants";

export type PaginationProps = {
  limits?: number[];
  result: number;
  emptyMessage?: string;
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
      setLimit: (limit: number | undefined) => void;
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
  limit = DEFAULT_PAGINATION_LIMIT,
  setLimit,
  size = "md",
  containerClassName,
  selectLimit = true,
  variant = "default",
}: PaginationProps) => {
  useEffect(() => {
    // Wenn sich das Result oder Limit ändert z.B. durch Filtern einer anderen Funktion oä. wird automatisch zur letzten Seite gesprungen.
    if (page * limit <= result) return;

    setPage(Math.ceil(result / limit));
  }, [result, limit]);

  return (
    <div
      className={cn(
        "py-5 flex flex-row items-center justify-between",
        containerClassName
      )}
    >
      {selectLimit && result !== 0 && limits.length > 1 && (
        <SelectRaw
          id="limit"
          value={limit}
          onChange={setLimit}
          options={limits.map((limit) => ({
            children: `${limit} pro Seite`,
            value: limit,
          }))}
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
      ) : (
        <div className="w-full flex justify-center">
          <Text>{emptyMessage}</Text>
        </div>
      )}
    </div>
  );
};

Pagination.displayName = "pagination";
