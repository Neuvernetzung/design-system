import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Breadcrumbs } from ".";

export default {
  title: "COMMON/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => <Breadcrumbs {...args} />;

Default.parameters = {
  a11y: {
    disable: true,
  },
};
