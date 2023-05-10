import cn from "classnames";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ChevronLeftIcon, ChevronRightIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { updateQuery } from "../../../utils/internal/updateQuery";
import { Button, ButtonGroup, IconButton, Select, Text } from "../../ui";
import { create } from "zustand";

export type PaginationProps = {
  limits?: number[];
  result?: number;
  emptyMessage?: string;
  size?: keyof Sizes;
  containerClassName?: string;
  selectLimit?: boolean;
  variant?: "default" | "minimalistic";
} & SetActivePageProps &
  SetLimitProps;

type SetActivePageProps =
  | {
      activePage: number | undefined;
      setActivePage: (page: number) => void;
    }
  | {
      activePage?: never;
      setActivePage?: never;
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

type FormInputs = {
  limit: number;
};

const usePaginationStore = create<{
  rerender: () => void;
}>((set) => ({
  rerender: () => set({}),
}));

const Pagination = ({
  limits = [10, 25, 50, 100],
  result = 0,
  emptyMessage,
  activePage = 1,
  setActivePage,
  limit = 10,
  setLimit,
  size = "md",
  containerClassName,
  selectLimit = true,
  variant = "default",
}: PaginationProps) => {
  const router = useRouter();
  const { rerender } = usePaginationStore();

  const [initialLimit, setInitialLimit] = useState<Boolean>(true);
  const formMethods = useForm<FormInputs>({
    defaultValues: {
      limit: setLimit ? limit : Number(router.query.limit) || limits[0],
    },
  });
  const watchLimit = formMethods.watch("limit");
  const { page: p = 1, ...restQuery }: any = router.query;

  const internalPage = setActivePage ? activePage : Number(p);
  const internalLimit = setLimit ? limit : Number(router.query.limit);

  const handlePage = (_page: number) => {
    rerender(); // Notwendig, damit mehrere Paginations synchron verwendet werden können.
    if (!setActivePage) {
      updateQuery({
        router,
        name: "page",
        value: _page,
      });
    } else {
      setActivePage(_page);
    }
  };

  useEffect(() => {
    rerender(); // Notwendig, damit mehrere Paginations synchron verwendet werden können.
    if (watchLimit !== limits[0] || !initialLimit) {
      setInitialLimit(false);
      if (!setLimit) {
        updateQuery({
          router,
          name: "limit",
          value: watchLimit,
        });
      } else {
        setLimit(watchLimit);
      }
    }
  }, [watchLimit]);

  const restQs = JSON.stringify(restQuery);

  useEffect(() => {
    if (p && Number(p) !== 1) {
      handlePage(1);
    }
  }, [restQs]);

  return (
    <div
      className={cn(
        "py-5 flex flex-row items-center justify-between",
        containerClassName
      )}
    >
      {selectLimit && result !== 0 && limits.length > 1 && (
        <Select
          control={formMethods.control}
          name="limit"
          options={limits.map((limit) => ({
            children: `${limit} pro Seite`,
            value: limit,
          }))}
          returned="value"
          variant="ghost"
          removeAll={false}
          size={size}
        />
      )}
      {result !== 0 ? (
        result > 1 * internalLimit && (
          <ButtonGroup>
            <IconButton
              variant="ghost"
              type="button"
              onClick={() => handlePage(internalPage - 1)}
              disabled={internalPage === 1}
              icon={ChevronLeftIcon}
              ariaLabel="before page"
              size={size}
            />

            {variant === "default" &&
              Array(Math.ceil(result / internalLimit))
                .fill(1)
                .map((_, i) =>
                  i === 0 ||
                  i === Math.ceil(result / internalLimit) - 1 ||
                  (i >= internalPage - 2 && i <= internalPage) ? (
                    <Button
                      variant={i + 1 === internalPage ? "filled" : "ghost"}
                      key={i}
                      type="button"
                      onClick={() => handlePage(i + 1)}
                      className="min-w-[2.5rem]"
                      size={size}
                    >
                      {i + 1}
                    </Button>
                  ) : (
                    i >= internalPage - 3 &&
                    i <= internalPage + 1 && (
                      <Button variant="ghost" size={size} disabled key={i}>
                        ...
                      </Button>
                    )
                  )
                )}
            {variant === "minimalistic" && (
              <Button variant="ghost" className="pointer-events-none">
                {internalPage} / {Math.ceil(result / internalLimit)}
              </Button>
            )}

            <IconButton
              variant="ghost"
              type="button"
              onClick={() => handlePage(internalPage + 1)}
              icon={ChevronRightIcon}
              disabled={internalPage === Math.ceil(result / internalLimit)}
              ariaLabel="next page"
              size={size}
            />
          </ButtonGroup>
        )
      ) : (
        <div className="w-full flex justify-center">
          <Text>{emptyMessage}</Text>
        </div>
      )}
    </div>
  );
};

export default typedMemo(Pagination);

Pagination.displayName = "pagination";
