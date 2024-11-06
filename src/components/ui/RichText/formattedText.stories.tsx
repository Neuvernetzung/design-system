import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/utils";

import { FormattedText } from "./formattedText";

export default {
  title: "UI/Form/FormattedText",
  component: FormattedText,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
};

const Container = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-5", className)} {...props} />
);

export const Default = {
  render: function DefaultRender({ ...args }) {
    const formMethods = useForm();

    return (
      <Container>
        <FormattedText
          maxLength={120}
          control={formMethods.control}
          name="FormattedText"
          placeholder="Schreib etwas..."
          showLength
          {...args}
        />
      </Container>
    );
  },
};
