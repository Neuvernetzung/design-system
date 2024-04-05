import { extendedColors, sizes } from "@/types";

import { DropButton } from "./dropbutton";

export default {
  title: "UI/Buttons/DropButton",
  component: DropButton,
};

const Container = ({ ...props }) => (
  <div className="flex flex-row items-start gap-5" {...props} />
);

export const Colors = {
  render: ({ ...args }) => (
    <Container>
      {extendedColors.map((color) => (
        <DropButton color={color} key={color} {...args}>
          {color}
        </DropButton>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};

export const Sizes = {
  render: ({ ...args }) => (
    <Container>
      {sizes.map((size) => (
        <DropButton size={size} key={size} {...args}>
          {size}
        </DropButton>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "size" },
  },
};

export const AsChild = {
  render: ({ ...args }) => (
    <Container>
      <DropButton asChild {...args}>
        <a href="/">Test</a>
      </DropButton>
    </Container>
  ),
};
