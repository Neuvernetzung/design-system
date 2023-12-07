import { Meta } from "@storybook/react";

import { BlockQuote } from ".";

export default {
  title: "UI/Typography/BlockQuote",
  component: BlockQuote,
  argTypes: {},
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <BlockQuote {...args}>
      Dies ist eine
      <br />
      mehrzeile Zitierung.
    </BlockQuote>
  </Container>
);
