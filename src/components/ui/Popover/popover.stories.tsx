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

export const OnHover = ({ ...args }) => (
  <Container>
    <Popover
      trigger="hover"
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      buttonProps={{ children: "Hier hovern" }}
      {...args}
    />
  </Container>
);

export const PanelClassName = ({ ...args }) => (
  <Container>
    <Popover
      trigger="hover"
      content={
        <div>
          <Text>Dies ist ein Popover</Text>
        </div>
      }
      placement="bottom-start"
      panelClassName="bg-red-500 w-64"
      buttonProps={{ children: "Hier hovern" }}
      {...args}
    />
  </Container>
);
