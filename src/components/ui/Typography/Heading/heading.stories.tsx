import { Heading } from "./heading";
import { extendedColors, sizes } from "../../../../types";

export default {
  title: "UI/Typography/Heading",
  component: Heading,
};

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Sizes = {
  render: ({ ...args }) => (
    <Container>
      {sizes.map((size) => (
        <Heading size={size} key={size} {...args}>
          {size}
        </Heading>
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
      {extendedColors.map((color) => (
        <Heading color={color} key={color} {...args}>
          {color}
        </Heading>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};
