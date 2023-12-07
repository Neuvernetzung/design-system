import { Meta } from "@storybook/react";

import { Breadcrumbs } from ".";

export default {
  title: "COMMON/Breadcrumbs",
  component: Breadcrumbs,
  argTypes: {},
} as Meta;

export const Default = ({ ...args }) => <Breadcrumbs {...args} />;
