import type { Meta, StoryObj } from "@storybook/react";

import { extendedBgColors, maxPageWidths } from "@/styles";
import { cn } from "@/utils";

import { Text } from "../../ui/Typography";
import { Section, SectionWithBackgroundImage } from "./section";
import { PageContainer } from "../Container";
import { ThemeProvider } from "@/theme";

const meta: Meta<typeof Section> = {
  title: "COMMON/Section",
  component: Section,
};

export default meta;

type Story = StoryObj<typeof Section>;

export const Default: Story = {
  render: function Render({ ...args }) {
    return (
      <ThemeProvider config={{ maxPageWidth: "md" }}>
        <PageContainer
          enablePagePadding={false}
          enabledPageGaps={false}
          enabledMaxPageWidth={false}
        >
          <Section
            className={cn(extendedBgColors.filled)}
            disableMaxWidth
            {...args}
          >
            <div className={cn("mx-auto w-full", maxPageWidths.md)}>
              <Text>Dies ist ein Page Container</Text>
            </div>
          </Section>
          <Section className={cn("box-content")} {...args}>
            <Text>Dies ist ein Page Container</Text>
          </Section>
          <Section className={cn(extendedBgColors.filled)} {...args}>
            <Text>Dies ist ein Page Container</Text>
          </Section>
        </PageContainer>
      </ThemeProvider>
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
