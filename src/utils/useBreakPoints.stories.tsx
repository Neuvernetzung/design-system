import { Meta } from "@storybook/react";
import { useBreakPoints } from "./useBreakPoints";
import { Text } from "../components";

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
      <Text>Breakpoint: {breakpoint}</Text>
      <Text>Breakpoint ist MD: {String(isBreakpoint("md"))}</Text>
      <Text>MD oder größer als MD: {String(isBreakpointOrLarger("md"))}</Text>
    </Container>
  );
};
