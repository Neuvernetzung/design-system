import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Pagination } from ".";

export default {
  title: "COMMON/Pagination",
  component: Pagination,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => <Pagination result={10000} {...args} />;

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
