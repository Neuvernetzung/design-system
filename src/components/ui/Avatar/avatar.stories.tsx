import { Meta } from "@storybook/react";

import { colors, sizes } from "@/types";

import { Avatar } from ".";

export default {
  title: "UI/Data Display/Avatar",
  component: Avatar,
  argTypes: {},
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = ({ ...args }) => (
  <Container>
    <Avatar name="Foo Bar" {...args} />
    <Avatar
      image={{ src: "/avatar.avif", alt: "Avatar" }}
      name="Foo Bar"
      {...args}
    />
  </Container>
);

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

export const BackgroundColorsByNames = ({ ...args }) => (
  <Container className="grid grid-cols-5 gap-2">
    {names.map((name) => (
      <Avatar name={name} key={name} {...args} />
    ))}
  </Container>
);

export const Colors = ({ ...args }) => (
  <Container>
    {colors.map((color) => (
      <Avatar name="Foo Bar" key={color} color={color} {...args} />
    ))}
  </Container>
);

export const Sizes = ({ ...args }) => (
  <Container>
    {sizes.map((size) => (
      <Avatar name="Foo Bar" key={size} size={size} {...args} />
    ))}
  </Container>
);
