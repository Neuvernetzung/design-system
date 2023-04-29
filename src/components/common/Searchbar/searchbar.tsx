import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { SearchIcon } from "../../../theme/icons";
import { Sizes } from "../../../types";
import { updateQuery } from "../../../utils/internal";
import { Icon, Input } from "../../ui";

type SearchbarProps = {
  size?: keyof Sizes;
  setSearch?: (search: string | undefined) => void;
};

interface ISearchProps {
  search?: string;
}

export const Searchbar = ({ size = "md", setSearch }: SearchbarProps) => {
  const router = useRouter();

  const [initialValue, setInitialValue] = useState(true);

  const { control, watch } = useForm<ISearchProps>({
    defaultValues: { search: undefined },
  });
  const search = watch("search");

  useEffect(() => {
    if (search || !initialValue) {
      setInitialValue(false);
      if (!setSearch) {
        updateQuery({
          router,
          name: "search",
          value: search && search.toLowerCase(),
        });
      } else {
        setSearch(search);
      }
    }
  }, [search]);

  return (
    <Input
      size={size}
      control={control}
      name="search"
      placeholder="Suche"
      rightElement={{
        children: <Icon size={size} color="subtile" icon={SearchIcon} />,
      }}
    />
  );
};
