import { Meta, Story } from "@storybook/react/types-6-0";
import React from "react";

import { Button } from "../Button";
import { Tooltip } from "./tooltip";

export default {
  title: "UI/Overlay/Tooltip",
  component: Tooltip,
} as Meta;

const Container = ({ ...props }) => (
  <div className="w-full flex flex-row items-center justify-center h-[80vh]">
    <div className="flex flex-row gap-5 mx-auto" {...props} />
  </div>
);

export const Default = ({ ...args }) => (
  <Container>
    <Tooltip label="Dies ist ein Tooltip" {...args}>
      <Button>Tooltip anzeigen lassen</Button>
    </Tooltip>
  </Container>
);

export const LongText = ({ ...args }) => (
  <Container>
    <Tooltip
      label="Dies ist ein Tooltip mit längerem Text um das Verhalten bei mehr Content zu testen."
      {...args}
    >
      <Button>Tooltip anzeigen lassen</Button>
    </Tooltip>
  </Container>
);
