import { Heading, Tag, Text } from "@/components";

import { useBreakPoints } from ".";

export default {
  title: "utils/useBreakPoints",

  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
};

const Container = ({ ...props }) => (
  <div className="flex flex-col gap-5" {...props} />
);

export const Default = () => {
  const { breakpoint, isBreakpoint, isBreakpointOrLarger } = useBreakPoints();

  return (
    <Container>
      <div className="flex flex-col gap-4 items-start">
        <Heading>Javascript Breakpoint</Heading>
        <Tag>{breakpoint}</Tag>
        <Text>Breakpoint ist MD: {String(isBreakpoint("md"))}</Text>
        <Text>MD oder größer als MD: {String(isBreakpointOrLarger("md"))}</Text>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <Heading>Tailwind Breakpoint</Heading>
        <Tag className="sm:hidden">unter sm</Tag>
        <Tag className="hidden sm:max-md:block">sm</Tag>
        <Tag className="hidden md:max-lg:block">md</Tag>
        <Tag className="hidden lg:max-xl:block">lg</Tag>
        <Tag className="hidden xl:max-2xl:block">xl</Tag>
        <Tag className="hidden 2xl:block">2xl</Tag>
      </div>
    </Container>
  );
};
