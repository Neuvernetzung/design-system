import { Meta } from "@storybook/react";
import React from "react";

import { Anchor } from ".";
import { Text } from "../Text";

export default {
  title: "UI/Typography/Anchor",
  component: Anchor,
  argTypes: {
    size: {
      control: { type: "select" },
    },
    color: {
      control: { type: "select" },
    },
  },
} as Meta;

export const Default = ({ ...args }) => (
  <Text>
    Die ist ein <Anchor href="test">Link</Anchor>, welcher inline im Text
    eingebunden ist.
  </Text>
);
