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
import { EmailVariables } from "@/utils/template/renderEmailTemplate";

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
import { FloatingMenuExtension } from "./Floating";
import { Floating } from "./Floating/NodeView";
import { BubbleMenu } from "./Menus/bubblemenu";
import type { RichTextOptionProps, RichTextProps } from "./richText";
import { richTextTableClassName } from "./Table/Table/className";
import {
  replaceMustacheVariables,
  replaceVariableComponentVariables,
  VariablesExtension,
} from "./Variables";
import { VariablesContextProvider } from "./Variables/Context/provider";
import { VariableMenu } from "./Variables/Menu";

type EmailEditorProps<TVariables extends string> = Omit<
  RichTextProps,
  "options" | "plugins" | "extensions"
> & { variables: EmailVariables<TVariables>; parseVariables?: boolean };

export const EmailEditor = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TVariables extends string = string
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
  variables,
  parseVariables,
}: EmailEditorProps<TVariables> & UseControllerProps<TFieldValues, TName>) => {
  const options: RichTextOptionProps = {
    disableTable: true,
    disableVideos: true,
    disableImages: true,
    disableTextSelection: true,
    disableCodeBlock: true,
    disableHorizontalRule: true,
    disableLists: true,
    disableQuote: true,
  };

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
        placeholder: ({ node, editor }) => {
          if (editor.isEmpty && placeholder) return placeholder;
          if (node.type.name === "heading") {
            return `Überschrift ${node.attrs.level}`;
          }
          return Object.keys(variables).length !== 0
            ? `Mit "@" Variable hinzufügen...`
            : "";
        },
      }),
      CharacterCount.configure({
        limit: maxLength,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image", "figure"],
      }),
      LinkExtension.configure({
        openOnClick: false,
      }),
      VariablesExtension,
      ...(options?.disableFloatingMenu ? [] : [FloatingMenuExtension]),
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
      // Mustache Template muss vor dem parsen zu einem Html-Tag umgewandelt werden, da parsen von reinem Text mit parseDom oder parseHtml nicht möglich ist.
      editor.commands.setContent(replaceMustacheVariables(value));
    },
    onUpdate: ({ editor }) => {
      // TipTap braucht ein Html-Tag, sonst tritt der Fehler "TypeError: dom.hasAttribute is not a function" auf. Deswegen wird nicht direkt in Variable umgewandelt sondern erst hier.
      onChange(replaceVariableComponentVariables(editor.getHTML()));
    },
  });

  return (
    <VariablesContextProvider
      variables={variables}
      parseVariables={parseVariables}
    >
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
                  options={options}
                  plugins={undefined}
                />
              ) : null}
              {!options?.disableFloatingMenu && editor ? (
                <Floating editor={editor} />
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

      {editor ? <VariableMenu editor={editor} /> : null}
    </VariablesContextProvider>
  );
};
