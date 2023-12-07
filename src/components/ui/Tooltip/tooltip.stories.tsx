import { Meta } from "@storybook/react";

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
  <Container className="flex flex-col mx-auto items-center gap-5">
    <Tooltip side="bottom" label="Dies ist ein Tooltip" {...args}>
      <Button>Unten</Button>
    </Tooltip>
    <Tooltip side="left" label="Dies ist ein Tooltip" {...args}>
      <Button>Links</Button>
    </Tooltip>
    <Tooltip side="right" label="Dies ist ein Tooltip" {...args}>
      <Button>Rechts</Button>
    </Tooltip>
    <Tooltip side="top" label="Dies ist ein Tooltip" {...args}>
      <Button>Unten</Button>
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
    <TooltipInner label="test" {...args} />
  </Container>
);

export const Delay = ({ ...args }) => (
  <Container>
    <Tooltip side="top" label="Dies ist ein Tooltip" delay={500} {...args}>
      <Button>500ms</Button>
    </Tooltip>
  </Container>
);
