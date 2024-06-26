import { IconHome } from "@tabler/icons-react";

import { colors } from "../../../types";

import { Indicator } from ".";
import { IconButton } from "../Button";

export default {
  title: "UI/Data Display/Indicator",
  component: Indicator,
};

const Container = ({ ...props }) => (
  <div className="flex flex-row gap-5" {...props} />
);

export const Default = {
  render: ({ ...args }) => (
    <Container>
      <Indicator>
        <IconButton ariaLabel="Test" icon={IconHome} {...args} />
      </Indicator>
      <Indicator value={2}>
        <IconButton ariaLabel="Test" icon={IconHome} {...args} />
      </Indicator>
      <Indicator value={33}>
        <IconButton ariaLabel="Test" icon={IconHome} {...args} />
      </Indicator>
      <Indicator value="Text">
        <IconButton ariaLabel="Test" icon={IconHome} {...args} />
      </Indicator>
    </Container>
  ),
};

export const Colors = {
  render: ({ ...args }) => (
    <Container>
      {colors.map((color) => (
        <Indicator key={color} color={color} value={23}>
          <IconButton ariaLabel="Test" icon={IconHome} {...args} />
        </Indicator>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};
