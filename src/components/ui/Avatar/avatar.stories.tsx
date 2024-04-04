import type { Meta, StoryObj } from "@storybook/react";

import { colors, sizes } from "@/types";

import { Avatar } from ".";

const meta: Meta<typeof Avatar> = {
  title: "UI/Data Display/Avatar",
  component: Avatar,
};

export default meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  render: ({ ...args }) => (
    <Container>
      <Avatar {...args} />
      <Avatar image={{ src: "/avatar.avif", alt: "Avatar" }} {...args} />
    </Container>
  ),
  args: { name: "Foo Bar" },
};

const names = [
  "Foo Bar",
  "Foo",
  "Bar",
  "Test",
  "Walther White",
  "Michael Myers",
  "Martin Simone",
  "Hildegard Frauke",
  "Hildebert Hedy",
  "Justus Timotheus",
  "Ava Freya",
  "Maxi Luise",
  "Jonatan Siegward",
  "Gertrude Niklaus",
  "Kristin Zilla",
];

export const BackgroundColorsByNames: Story = {
  render: ({ name: argName, ...args }) => (
    <Container className="grid grid-cols-5 gap-2">
      {names.map((name) => (
        <Avatar name={argName || name} key={name} {...args} />
      ))}
    </Container>
  ),
};

export const Colors: Story = {
  render: ({ ...args }) => (
    <Container>
      {colors.map((color) => (
        <Avatar key={color} color={color} {...args} />
      ))}
    </Container>
  ),
  args: { name: "Foo bar" },
};

export const Sizes: Story = {
  render: ({ ...args }) => (
    <Container>
      {sizes.map((size) => (
        <Avatar key={size} size={size} {...args} />
      ))}
    </Container>
  ),
  args: { name: "Foo bar" },
};
