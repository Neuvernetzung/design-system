import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Button } from "../Button";
import { Tooltip } from "./tooltip";

export default {
  title: "UI/Overlay/Tooltip",
  component: Tooltip,
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5 w-full justify-between" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Tooltip label="Dies ist ein Tooltip" {...args}>
      <Button>Tooltip anzeigen lassen</Button>
    </Tooltip>
  </Container>
);
