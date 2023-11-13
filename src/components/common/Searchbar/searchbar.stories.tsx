import { Meta } from "@storybook/react";
import { useState } from "react";

import { Searchbar } from ".";
import { Modal } from "../../ui";

export default {
  title: "COMMON/Searchbar",
  component: Searchbar,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => <Searchbar {...args} />;

export const WithState = ({ ...args }) => {
  const [search, setSearch] = useState<string>();

  return (
    <div>
      <Modal
        open
        setOpen={() => null}
        content={
          <div>
            Suche: {search}
            <Searchbar setSearch={setSearch} {...args} />
          </div>
        }
      />
    </div>
  );
};
