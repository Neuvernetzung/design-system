import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Text } from "../Typography";
import { Popover } from "./popover";

export default {
  title: "UI/Overlay/Popover",
  component: Popover,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5 w-full justify-between" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Popover öffnen" }}
      {...args}
    />
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Popover öffnen" }}
      {...args}
    />
    <Popover
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Popover öffnen" }}
      {...args}
    />
  </Container>
);
