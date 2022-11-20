import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { BlockQuote } from ".";

export default {
  title: "UI/Data Display/BlockQuote",
  component: BlockQuote,
  argTypes: {},
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <BlockQuote>
      Dies ist eine
      <br />
      mehrzeile Zitierung.
    </BlockQuote>
  </Container>
);
