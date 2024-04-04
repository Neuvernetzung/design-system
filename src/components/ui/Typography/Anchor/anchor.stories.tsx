import { Anchor } from ".";
import { Text } from "../Text";
import { Checkbox } from "../../Checkbox";
import { useForm } from "react-hook-form";

export default {
  title: "UI/Typography/Anchor",
  component: Anchor,

  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
};

export const Default = {
  render: ({ ...args }) => (
    <Text>
      Die ist ein{" "}
      <Anchor href="/test" {...args}>
        Link
      </Anchor>
      , welcher inline im Text eingebunden ist.
    </Text>
  ),
};

export const AnchorInsideCheckbox = {
  render: ({ ...args }) => {
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
  },
};
