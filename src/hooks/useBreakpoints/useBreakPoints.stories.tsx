import { Meta } from "@storybook/react";

import { Heading, Tag, Text } from "@/components";

import { useBreakPoints } from ".";

export default {
  title: "utils/useBreakPoints",
  argTypes: {},
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = () => {
  const { breakpoint, isBreakpoint, isBreakpointOrLarger } = useBreakPoints();

  return (
    <Container>
      <div className="flex flex-col gap-4 items-start">
        <Heading>Javascript Breakpoint</Heading>
        <Tag label={breakpoint} />
        <Text>Breakpoint ist MD: {String(isBreakpoint("md"))}</Text>
        <Text>MD oder größer als MD: {String(isBreakpointOrLarger("md"))}</Text>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <Heading>Tailwind Breakpoint</Heading>
        <Tag className="sm:hidden" label="unter sm" />
        <Tag className="hidden sm:max-md:block" label="sm" />
        <Tag className="hidden md:max-lg:block" label="md" />
        <Tag className="hidden lg:max-xl:block" label="lg" />
        <Tag className="hidden xl:max-2xl:block" label="xl" />
        <Tag className="hidden 2xl:block" label="2xl" />
      </div>
    </Container>
  );
};
