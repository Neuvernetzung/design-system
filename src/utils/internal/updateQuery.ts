import { NextRouter } from "next/router";

type UpdateRouterQuery = {
  router: NextRouter;
  name: string;
  value: any;
};

export const updateQuery = ({ router, name, value }: UpdateRouterQuery) => {
  const path = router.pathname;
  const query = router.query;

  if (name) query[name] = String(value);

  router.replace({
    pathname: path,
    query,
  });
};
