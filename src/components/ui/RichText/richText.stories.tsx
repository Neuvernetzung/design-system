import { Meta } from "@storybook/react";
import { cn } from "@/utils";
import { useForm } from "react-hook-form";

import { Button, Prose } from "..";
import { RichText } from ".";
import { Editor } from "@tiptap/react";
import { IconPhoto } from "@tabler/icons-react";
import { Form } from "../Form/form";
import { HTMLAttributes } from "react";

export default {
  title: "UI/Form/RichText",
  component: RichText,
  parameters: {
    docs: {
      source: {
        type: "code",
      },
    },
  }, // Workaround für https://github.com/storybookjs/storybook/issues/12747#issuecomment-707265001
} as Meta;

const Container = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-5", className)} {...props} />
);

export const Default = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Container>
      <RichText
        maxLength={120}
        control={formMethods.control}
        name="RichText"
        placeholder="Schreib etwas..."
        showLength
        {...args}
      />
    </Container>
  );
};

export const Error = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Form handleSubmit={formMethods.handleSubmit} onSubmit={() => {}}>
      <Container>
        <RichText
          required
          maxLength={120}
          control={formMethods.control}
          name="RichText"
          placeholder="Schreib etwas..."
          showLength
          {...args}
        />
        <Button type="submit">Bestätigen</Button>
      </Container>
    </Form>
  );
};

type CompareProps = {
  RichTextCompare: string;
};

export const CompareToProse = ({ ...args }) => {
  const { control, watch } = useForm<CompareProps>({
    defaultValues: {
      RichTextCompare: `<h1 class="font-heading font-semibold md:text-4xl text-3xl text-accent-900 dark:text-accent-100">Dies ist ein Vergleich.</h1><p>Dieser dient zur <strong>Veranschaulich </strong>zwischen <em>RichText Editor</em> und <a target="_blank" rel="noopener noreferrer nofollow" class="underline font-bold  focus-visible:ring-accent-600 dark:focus-visible:ring-accent-300 focus:outline-none focus-visible:ring focus-visible:ring-opacity-20 dark:focus-visible:ring-opacity-20 underline font-bold  focus-visible:ring-accent-600 dark:focus-visible:ring-accent-300 focus:outline-none focus-visible:ring focus-visible:ring-opacity-20 dark:focus-visible:ring-opacity-20 underline font-bold  focus-visible:ring-accent-600 dark:focus-visible:ring-accent-300 focus:outline-none focus-visible:ring focus-visible:ring-opacity-20 dark:focus-visible:ring-opacity-20 text-accent-900 dark:text-accent-100 outline-none transition ease-in-out duration-300" href="/story/ui-form-richtext--compare-to-prose">Prose</a> Komponente. Wichtig ist, dass beide Komponenten den gleichen <u>Output</u> hervorbringen und <s>nicht</s> voneinander abweichen.</p><h2 class="font-heading font-semibold text-xl text-accent-900 dark:text-accent-100">Ein Paar Komponenten sind zum Beispiel:</h2><ol><li><p>Überschriften</p><ol><li><p>H1</p></li><li><p>H2</p></li><li><p>...</p></li></ol></li><li><p>Texte</p></li></ol><hr><ul><li><p>Ausrichtungen</p><ul><li><p>Links</p></li><li><p>Zentriert</p></li><li><p>Rechts</p></li></ul></li></ul><blockquote><p>Außerdem sind Zitate möglich.</p></blockquote><p></p>`,
    },
  });

  return (
    <Container className="grid grid-cols-2">
      <RichText control={control} name="RichTextCompare" {...args} />
      <Prose content={watch("RichTextCompare")} />
    </Container>
  );
};

export const SelectOnTopOfEachOther = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Container>
      <RichText control={formMethods.control} name="RichText" {...args} />
      <RichText control={formMethods.control} name="RichText" {...args} />
    </Container>
  );
};

const MenuButtonItem = ({ editor }: { editor: Editor | null }) => (
  <Button
    size="sm"
    leftIcon={IconPhoto}
    onClick={() => {
      editor
        ?.chain()
        .focus()
        .setImage({
          src: "https://storybook.js.org/images/develop/vscode.svg",
          alt: "Test",
          title: "Image",
        })
        .run();
    }}
  >
    Custom
  </Button>
);

export const CustomMenuButtons = ({ ...args }) => {
  const { control, watch } = useForm();

  return (
    <Container className="grid grid-cols-2">
      <RichText
        control={control}
        AdditionalMenuItems={MenuButtonItem}
        name="RichText"
        {...args}
      />
      <Prose content={watch("RichText")} />
    </Container>
  );
};
