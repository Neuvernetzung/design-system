import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Button } from "../Button";
import { Tooltip, TooltipInner } from ".";

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

export const WithoutTooltip = ({ ...args }) => (
  <Container>
    <Tooltip {...args}>
      <Button>Kein Tooltip</Button>
    </Tooltip>
  </Container>
);

export const TooltipInnerView = ({ ...args }) => (
  <Container>
    <TooltipInner label="test" {...args}/>
  </Container>
);
