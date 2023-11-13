import { useState } from "react";

import { useUrlState } from "@/hooks";

import {
  DEFAULT_PAGINATION_LIMIT,
  DEFAULT_PAGINATION_PAGE,
} from "../constants";

export type UsePaginationReturn = {
  page: number;
  setPage: (page: number) => void;
  limit: number;
  setLimit: (limit: number) => void;
};

export const usePagination = (): UsePaginationReturn => {
  const [page, setPage] = useState<number>(DEFAULT_PAGINATION_PAGE);
  const [limit, setLimit] = useState<number>(DEFAULT_PAGINATION_LIMIT);

  return { page, setPage, limit, setLimit };
};

export const useUrlPagination = (): UsePaginationReturn => {
  const [page, setPage] = useUrlState({
    name: "page",
    defaultValue: DEFAULT_PAGINATION_PAGE.toString(),
  });

  const [limit, setLimit] = useUrlState({
    name: "limit",
    defaultValue: DEFAULT_PAGINATION_LIMIT.toString(),
  });

  return {
    page: Number(page),
    setPage: (page: number) => {
      setPage(String(page));
    },
    limit: Number(limit),
    setLimit: (limit: number) => {
      setLimit(String(limit));
    },
  };
};
