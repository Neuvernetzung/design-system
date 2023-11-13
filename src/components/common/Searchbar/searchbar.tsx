import { IconSearch } from "@tabler/icons-react";
import type { Size } from "../../../types";
import { Icon } from "../../ui";
import { RawInput } from "@/components/ui/Input/input";

type SearchbarProps = {
  size?: Size;
  search: string | undefined;
  setSearch: (search: string) => void;
};

export const Searchbar = ({
  size = "md",
  search,
  setSearch,
}: SearchbarProps) => (
  <RawInput
    size={size}
    value={search}
    onChange={setSearch}
    placeholder="Suche"
    rightElement={{
      children: <Icon size={size} color="subtile" icon={IconSearch} />,
    }}
  />
);
