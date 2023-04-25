import { Meta, Story } from "@storybook/react/types-6-0";
import React, { useState } from "react";

import { Pagination } from ".";
import { Modal } from "../../ui";

export default {
  title: "COMMON/Pagination",
  component: Pagination,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => <Pagination result={10000} {...args} />;

export const WithState = ({ ...args }) => {
  const [page, setPage] = useState();
  const [limit, setLimit] = useState();

  return (
    <div>
      <Modal
        open
        setOpen={() => null}
        content={
          <div>
            Seite: {page}, Limit: {limit}
            <Pagination
              setActivePage={setPage}
              setLimit={setLimit}
              result={10000}
              {...args}
            />
          </div>
        }
      />
    </div>
  );
};

export const WithoutLimit = ({ ...args }) => (
  <Pagination selectLimit={false} result={10000} {...args} />
);

export const Minimalistic = ({ ...args }) => (
  <Pagination
    selectLimit={false}
    variant="minimalistic"
    result={10000}
    {...args}
  />
);
