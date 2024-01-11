import { useState } from "react";

import { useUrlState, parseQueryAsInteger } from "@/hooks";

import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from "../constants";

export type UsePaginationProps = {
  defaultPage?: number;
  defaultLimit?: number;
};

export type UsePaginationReturn = {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
};

export const usePagination = (
  props?: UsePaginationProps
): UsePaginationReturn => {
  const [page, setPage] = useState<number>(
    props?.defaultPage || DEFAULT_PAGINATION_PAGE
  );
  const [limit, setLimit] = useState<number>(
    props?.defaultLimit || DEFAULT_PAGINATION_LIMIT
  );

  return { page, setPage, limit, setLimit };
};

export const useUrlPagination = (
  props?: UsePaginationProps
): UsePaginationReturn => {
  const [page, setPage] = useUrlState("page", {
    ...parseQueryAsInteger,
    defaultValue: props?.defaultPage || DEFAULT_PAGINATION_PAGE,
  });

  const [limit, setLimit] = useUrlState("limit", {
    ...parseQueryAsInteger,
    defaultValue: props?.defaultLimit || DEFAULT_PAGINATION_LIMIT,
  });

  return {
    page,
    setPage: (page: number) => {
      setPage(page);
    },
    limit,
    setLimit: (limit: number) => {
      setLimit(limit);
    },
  };
};
