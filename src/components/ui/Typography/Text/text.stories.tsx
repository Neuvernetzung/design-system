import { Text } from "./text";
import { colors, sizes } from "../../../../types";

export default {
  title: "UI/Typography/Text",
  component: Text,
};

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Sizes = {
  render: ({ ...args }) => (
    <Container>
      {sizes.map((size) => (
        <Text size={size} key={size} {...args}>
          {size}
        </Text>
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
        <Text color={color} key={color} {...args}>
          {color}
        </Text>
      ))}
    </Container>
  ),

  parameters: {
    controls: { exclude: "color" },
  },
};
