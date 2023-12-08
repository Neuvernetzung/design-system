import { Meta } from "@storybook/react";
import { IconPhoto } from "@tabler/icons-react";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";

import { cn } from "@/utils";

import { Button, Modal, Prose } from "..";
import { Form } from "../Form/form";
import { RichText } from ".";

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
      RichTextCompare: `<h1>Dies ist ein Vergleich.</h1><p>Dieser dient zur <strong>Veranschaulich </strong>zwischen <em>RichText Editor</em> und <a target="_blank" rel="noopener noreferrer nofollow" class="underline font-bold  focus-visible:ring-accent-600 dark:focus-visible:ring-accent-300 focus:outline-none focus-visible:ring focus-visible:ring-opacity-20 dark:focus-visible:ring-opacity-20 underline font-bold  focus-visible:ring-accent-600 dark:focus-visible:ring-accent-300 focus:outline-none focus-visible:ring focus-visible:ring-opacity-20 dark:focus-visible:ring-opacity-20 underline font-bold  focus-visible:ring-accent-600 dark:focus-visible:ring-accent-300 focus:outline-none focus-visible:ring focus-visible:ring-opacity-20 dark:focus-visible:ring-opacity-20 text-accent-900 dark:text-accent-100 outline-none transition ease-in-out duration-300" href="/story/ui-form-richtext--compare-to-prose">Prose</a> Komponente. Wichtig ist, dass beide Komponenten den gleichen <u>Output</u> hervorbringen und <s>nicht</s> voneinander abweichen.</p><small>Kleiner Text</small><table-wrapper><table><tbody><tr><th colspan="1" rowspan="1"><p>Test</p></th><th colspan="1" rowspan="1"><p>Test</p></th><th colspan="1" rowspan="1"><p>Test</p></th></tr><tr><td colspan="1" rowspan="1"><p>1</p></td><td colspan="1" rowspan="1"><p>2</p></td><td colspan="1" rowspan="1"><p>3</p></td></tr><tr><td colspan="1" rowspan="1"><p>4</p></td><td colspan="1" rowspan="1"><p>5</p></td><td colspan="1" rowspan="1"><p>6</p></td></tr></tbody></table></table-wrapper><h2>Ein Paar Komponenten sind zum Beispiel:</h2><ol><li><p>Überschriften</p><ol><li><p>H1</p></li><li><p>H2</p></li><li><p>...</p></li></ol></li><li><p>Texte</p></li></ol><hr><ul><li><p>Ausrichtungen</p><ul><li><p>Links</p></li><li><p>Zentriert</p></li><li><p>Rechts</p></li></ul></li></ul><blockquote><p>Außerdem sind Zitate möglich.</p></blockquote><p></p>`,
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

export const CustomMenuButtons = ({ ...args }) => {
  const { control, watch } = useForm({
    defaultValues: {
      RichText: `
      <figure style="text-align: center;"><img src="https://raw.githubusercontent.com/Neuvernetzung/design-system/master/public/Header.png" alt="Alt Tag" title="Image" width="100%" height="auto" caption="Tolle Caption"><figcaption>Tolle Caption</figcaption></figure>
      <picture><img src="https://raw.githubusercontent.com/Neuvernetzung/design-system/master/public/Header.png" alt="Alt Tag" title="Image" width="346" height="auto" draggable="false" contenteditable="false"></picture>
      `,
    },
  });

  const [open, setOpen] = useState(false);

  return (
    <Container className="grid grid-cols-2">
      <RichText
        control={control}
        plugins={(editor) => [
          {
            menuItems: [
              {
                type: "button",
                icon: IconPhoto,
                children: "Bild",
                onClick: () => setOpen(true),
              },
            ],
            component: (
              <Modal
                open={open}
                setOpen={setOpen}
                content={
                  <div>
                    <Button
                      onClick={() => {
                        editor
                          ?.chain()
                          .focus()
                          .setImage({
                            src: "https://raw.githubusercontent.com/Neuvernetzung/design-system/master/public/Header.png",
                            alt: "Test",
                            title: "Image",
                          })
                          .run();
                        setOpen(false);
                      }}
                    >
                      Bild hinzufügen
                    </Button>
                  </div>
                }
              />
            ),
          },
        ]}
        name="RichText"
        {...args}
      />
      <Prose content={watch("RichText")} />
    </Container>
  );
};
