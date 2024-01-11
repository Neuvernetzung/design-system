import { Meta } from "@storybook/react";
import { useState } from "react";

import { useUrlState } from "@/hooks";

import { Modal } from "../../ui";
import { Searchbar } from ".";

export default {
  title: "COMMON/Searchbar",
  component: Searchbar,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => {
  const [search, setSearch] = useState<string>();

  return <Searchbar search={search} setSearch={setSearch} {...args} />;
};

export const WithUrlState = ({ ...args }) => {
  const [search, setSearch] = useUrlState("search");

  return (
    <div>
      <Modal
        open
        setOpen={() => null}
        content={
          <div>
            Suche: {search}
            <Searchbar search={search} setSearch={setSearch} {...args} />
          </div>
        }
      />
    </div>
  );
};
