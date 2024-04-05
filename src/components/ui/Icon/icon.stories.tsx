import { IconHome } from "@tabler/icons-react";

import { Icon } from "./icon";
import { colors, sizes } from "../../../types";

export default {
  title: "UI/Media/Icon",
  component: Icon,
};

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Sizes = {
  render: ({ ...args }) => (
    <Container>
      {sizes.map((size) => (
        <Icon size={size} key={size} icon={IconHome} {...args} />
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "size" },
  },
};

export const Colors = {
  render: ({ ...args }) => (
    <Container>
      {colors.map((color) => (
        <Icon color={color} key={color} icon={IconHome} {...args} />
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};
