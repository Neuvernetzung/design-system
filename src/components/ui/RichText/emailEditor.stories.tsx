import { HTMLAttributes, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/utils";

import { EmailEditor } from ".";
import { Button } from "../Button";

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

    const [parseVariables, setParseVariables] = useState<boolean>(false);

    const currentDate = useMemo(() => new Date(), []);

    return (
      <Container>
        <EmailEditor
          maxLength={120}
          control={control}
          name="EmailEditor"
          showLength
          parseVariables={parseVariables}
          variables={[
            {
              title: "Name",
              value: "name",
              example: "Max Mustermann",
            },
            {
              title: "Datum",
              value: "date",
              example: Intl.DateTimeFormat(undefined, {
                dateStyle: "medium",
              }).format(currentDate),
            },
          ]}
          {...args}
        />
        {JSON.stringify(watch())}
        <div>
          <Button
            onClick={() => {
              setParseVariables((v) => !v);
            }}
            color={parseVariables ? "primary" : "accent"}
            size="sm"
          >
            Variablen parsen
          </Button>
        </div>
      </Container>
    );
  },
};
