import { Meta } from "@storybook/react";

import { Anchor } from ".";
import { Text } from "../Text";
import { Checkbox } from "../../Checkbox";
import { useForm } from "react-hook-form";

export default {
  title: "UI/Typography/Anchor",
  component: Anchor,
  argTypes: {
    size: {
      control: { type: "select" },
    },
    color: {
      control: { type: "select" },
    },
  },
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

export const Default = ({ ...args }) => (
  <Text>
    Die ist ein{" "}
    <Anchor href="/test" {...args}>
      Link
    </Anchor>
    , welcher inline im Text eingebunden ist.
  </Text>
);

export const AnchorInsideCheckbox = ({ ...args }) => {
  const { control } = useForm();

  return (
    <Checkbox
      name="test"
      control={control}
      options={[
        {
          label: (
            <Text>
              Die ist ein{" "}
              <Anchor href="/test" {...args}>
                Link
              </Anchor>
              , welcher inline im Text eingebunden ist.
            </Text>
          ),
          value: "123",
        },
      ]}
    />
  );
};
