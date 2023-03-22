import cn from "classnames";
import { useRouter } from "next/router";
import qs from "qs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { ChevronLeftIcon, ChevronRightIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { updateQuery } from "../../../utils/internal/updateQuery";
import { Button, ButtonGroup, IconButton, Select, Text } from "../../ui";

export type PaginationProps = {
  limits?: number[];
  result?: number;
  emptyMessage?: string;
  setActivePage?: Function;
  setLimit?: Function;
  size?: keyof Sizes;
  containerClassName?: string;
  selectLimit?: boolean;
  variant?: "default" | "minimalistic";
};

type FormInputs = {
  limit: number;
};

export const Pagination = ({
  limits = [10, 25, 50, 100],
  result = 0,
  emptyMessage,
  setActivePage,
  setLimit,
  size = "md",
  containerClassName,
  selectLimit = true,
  variant = "default",
}: PaginationProps) => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const [initialLimit, setInitialLimit] = useState<Boolean>(true);
  const formMethods = useForm<FormInputs>({
    defaultValues: { limit: limits[0] },
  });
  const limit = formMethods.watch("limit") as number;
  const { page: p, ...restQuery }: any = router.query;

  const handlePage = (_page: number) => {
    setPage(_page);
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
    if (limit !== limits[0] || !initialLimit) {
      setInitialLimit(false);
      if (!setLimit) {
        updateQuery({
          router,
          name: "limit",
          value: limit,
        });
      } else {
        setLimit(limit);
      }
    }
  }, [limit]);

  const restQs = qs.stringify(restQuery);

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
        result > 1 * limit && (
          <ButtonGroup>
            <IconButton
              variant="ghost"
              type="button"
              onClick={() => handlePage(page - 1)}
              disabled={page === 1}
              icon={ChevronLeftIcon}
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
                      onClick={() => handlePage(i + 1)}
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
              onClick={() => handlePage(page + 1)}
              icon={ChevronRightIcon}
              disabled={page === Math.ceil(result / limit)}
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
