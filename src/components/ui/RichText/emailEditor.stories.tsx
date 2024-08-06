import { HTMLAttributes } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/utils";

import { EmailEditor } from ".";

export default {
  title: "UI/Form/EmailEditor",
  component: EmailEditor,
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
    const { control, watch } = useForm({
      defaultValues: {
        EmailEditor:
          "Hallo, mein Name ist {{name}}. ...{{date}} ist heute und es ist sehr sonnig.",
      },
    });

    return (
      <Container>
        <EmailEditor
          maxLength={120}
          control={control}
          name="EmailEditor"
          showLength
          variables={[
            { title: "Name", value: "name" },
            { title: "Datum", value: "date" },
          ]}
          {...args}
        />
        {JSON.stringify(watch())}
      </Container>
    );
  },
};
