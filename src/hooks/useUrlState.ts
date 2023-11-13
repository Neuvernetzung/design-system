import { useRouter } from "next/router";

export type UseUrlStateProps = {
  name: string;
  replace?: boolean;
  defaultValue?: string;
};

export type UseUrlStateReturn = [string | undefined, (value: string) => void];

export const useUrlState = ({
  name,
  replace,
  defaultValue,
}: UseUrlStateProps): UseUrlStateReturn => {
  const router = useRouter();

  const query = router.query;
  const state = query[name];
  const path = router.pathname;

  const setState = (value: string) => {
    query[name] = value;

    const newRouterProps = {
      pathname: path,
      query,
    };

    if (replace) {
      router.replace(newRouterProps);
    } else {
      router.push(newRouterProps);
    }
  };

  return [state?.toString() || defaultValue, setState];
};
