import type { Meta, StoryObj } from "@storybook/react";

import { extendedBgColors } from "@/styles";
import { cn } from "@/utils";

import { Text } from "../../ui/Typography";
import { Section, SectionWithBackgroundImage } from "./section";

const meta: Meta<typeof Section> = {
  title: "COMMON/Section",
  component: Section,
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: function Render({ ...args }) {
    return (
      <Section className={cn(extendedBgColors.filled)} {...args}>
        <Text>Dies ist ein Page Container</Text>
      </Section>
    );
  },
};

export const BackgroundImage: Story = {
  render: function Render({ ...args }) {
    return (
      <SectionWithBackgroundImage
        backgroundImage={{
          alt: "",
          src: "/testImage.jpg",
          width: 1200,
          height: 600,
        }}
        {...args}
      >
        <Text>Dies ist ein Page Container</Text>
      </SectionWithBackgroundImage>
    );
  },
};
