import { HTMLAttributes, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/utils";

import { EmailEditor } from ".";
import { Button } from "../Button";
import {
  EmailVariables,
  EmailVariableValues,
  renderEmailTemplate,
} from "@/utils/template/renderEmailTemplate";

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

type FormVariables = "name" | "date";

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

    const variables: EmailVariables<FormVariables> = {
      name: { title: "Name", value: "Max Mustermann" },
      date: {
        title: "Datum",
        value: Intl.DateTimeFormat(undefined, {
          dateStyle: "medium",
        }).format(currentDate),
      },
    };

    const values: EmailVariableValues<FormVariables> = {
      name: "Max Mustermann",
      date: Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
      }).format(currentDate),
    };

    const value = watch();
    const rendered = useMemo(
      () => renderEmailTemplate(value.EmailEditor, values),
      [value]
    );

    return (
      <Container>
        <EmailEditor
          maxLength={120}
          control={control}
          name="EmailEditor"
          showLength
          parseVariables={parseVariables}
          variables={variables}
          {...args}
        />
        {JSON.stringify(value)}
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
        <div dangerouslySetInnerHTML={{ __html: rendered }} />
      </Container>
    );
  },
};

export const NoVariables = {
  render: function DefaultRender({ ...args }) {
    const { control, watch } = useForm({
      defaultValues: {
        EmailEditor: "Hallo, hier steht ein Beispieltext.",
      },
    });

    const variables: EmailVariables = {};

    const value = watch();

    return (
      <Container>
        <EmailEditor
          maxLength={120}
          control={control}
          name="EmailEditor"
          showLength
          variables={variables}
          {...args}
        />
        {JSON.stringify(value)}
      </Container>
    );
  },
};
