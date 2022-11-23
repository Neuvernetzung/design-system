import { Meta, Story } from "@storybook/react/types-6-0";
import cn from "classnames";
import React from "react";
import { useForm } from "react-hook-form";

import { Prose } from "..";
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

const Container = ({ className, ...props }: any) => (
  <div className={cn("flex flex-col gap-5", className)} {...props} />
);

export const Default = ({ ...args }) => {
  const formMethods = useForm();

  return (
    <Container>
      <RichText control={formMethods.control} name="RichText" />
    </Container>
  );
};

interface CompareProps {
  RichTextCompare: string;
}

export const CompareToProse = ({ ...args }) => {
  const formMethods = useForm<CompareProps>({
    defaultValues: {
      RichTextCompare: `<h2 class="text-center">This is editable <span class="font-bold">rich</span> text, <span class="italic">much</span> better than a &lt;textarea&gt;!</h2><p class="text-justify">Since it&#39;s rich text, you can do </p><a href="#"><p class="text-justify">things </p></a><p class="text-justify">like turn a selection of text <span class="font-bold">bold</span>, or add a semantically rendered block quote in the middle of the page, like this:</p><ol><li class="text-justify">Punkt eins</li><li class="text-justify">Zwei</li></ol><blockquote class="text-left">A <span class="underline">wise</span> quote.</blockquote><ul><li class="text-left">Andere Liste</li><li class="text-left">Punkt zwei</li></ul><p class="text-right">Try it out for <span class="font-bold">yourself</span>!</p>`,
    },
  });

  // console.log(formMethods.watch("RichTextCompare"));
  return (
    <Container className="!flex-row">
      <RichText control={formMethods.control} name="RichTextCompare" />
      <Prose content={formMethods.watch("RichTextCompare")} />
    </Container>
  );
};
