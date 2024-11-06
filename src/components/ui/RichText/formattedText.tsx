/* eslint-disable jsx-a11y/no-static-element-interactions */
import CharacterCount from "@tiptap/extension-character-count";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Controller,
  type FieldPath,
  type FieldValues,
  useController,
  type UseControllerProps,
} from "react-hook-form";

import { cn } from "@/utils/cn";

import {
  bordersInteractive,
  paddingsXLarge,
  paddingsY,
  roundings,
  transition,
} from "../../../styles";
import { requiredInputRule } from "../../../utils/internal/inputRule";
import { FormElement } from "../Form";
import { proseClassName } from "../Prose";
import { Text } from "../Typography/Text";
import { Float } from "./Float";
import { BubbleMenu } from "./Menus/bubblemenu";
import { SmallParagraph } from "./Small";
import { richTextTableClassName } from "./Table/Table/className";
import type { RichTextProps } from "./richText";

export const FormattedText = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  label,
  name,
  required,
  control,
  helper,
  placeholder,
  maxLength,
  showLength,
  containerClassName,
  editorClassName,
  size = "md",
  extensions = [],
  options,
  plugins,
}: RichTextProps & UseControllerProps<TFieldValues, TName>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
        dropcursor: {
          width: 6,
          color: "rgb(var(--color-primary-500))",
          class: "rounded-full",
        },
      }),
      Underline,
      Placeholder.configure({
        emptyEditorClass:
          "first:before:content-[attr(data-placeholder)] first:before:float-left first:before:text-accent-500 first:before:pointer-events-none first:before:h-0",
        emptyNodeClass:
          "before:content-[attr(data-placeholder)] before:float-left before:text-accent-500 before:pointer-events-none before:h-0",
        placeholder: ({ editor }) => {
          if (editor.isEmpty && placeholder) return placeholder;
          return `Tippe "/" für Befehle...`;
        },
      }),
      CharacterCount.configure({
        limit: maxLength,
      }),
      TextAlign.configure({
        types: ["paragraph"],
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),

      Float,
      SmallParagraph,
      ...extensions,
    ],
    editorProps: {
      attributes: {
        id: name,
        role: "textbox",
        "aria-label": label || name,
        class: cn(
          proseClassName,
          "w-full mx-auto box-content", // box-content, damit max-w-prose gleich bleibt und Padding außerhalb des Contents ist
          paddingsXLarge.xl,
          paddingsY.xl,
          "outline-none focus:outline-none focus-visible:outline-none focus-within:outline-none",
          richTextTableClassName,
          editorClassName
        ),
      },
    },
    onCreate: ({ editor }) => {
      editor.commands.setContent(value);
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  const pluginsWithEditor = plugins?.(editor);

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{
          required: requiredInputRule(required),
        }}
        render={({ field: { ref }, fieldState: { error } }) => (
          <FormElement
            required={required}
            name={name}
            label={label}
            helper={helper}
            error={error}
            size={size}
          >
            <div
              defaultValue="editor"
              className={cn(
                !error ? bordersInteractive.accent : bordersInteractive.danger,
                "group border w-full relative cursor-auto overflow-hidden",
                roundings.md,
                transition,
                "focus:outline-none focus-within:ring focus-within:ring-opacity-20 dark:focus-within:ring-opacity-20 focus-within:ring-accent-600 dark:focus-within:ring-accent-300",
                containerClassName
              )}
            >
              {editor ? (
                <BubbleMenu
                  editor={editor}
                  options={{
                    disableTextSelection: true,
                    disableTable: true,
                    disableCodeBlock: true,
                    ...options,
                  }}
                  plugins={pluginsWithEditor}
                />
              ) : null}
              <EditorContent
                ref={ref}
                className={cn("appearance-none w-full")}
                editor={editor}
              />
              {maxLength && showLength && (
                <Text
                  size="xs"
                  color={
                    editor?.storage.characterCount.characters() > maxLength
                      ? "danger"
                      : "accent"
                  }
                  className={cn(
                    "absolute bottom-2 right-5 pointer-events-none"
                  )}
                >
                  {editor?.storage.characterCount.characters()} / {maxLength}
                </Text>
              )}
            </div>
          </FormElement>
        )}
      />
      {pluginsWithEditor
        ?.filter((plugin) => !!plugin.component)
        .map((plugin) => plugin.component)}
    </>
  );
};
