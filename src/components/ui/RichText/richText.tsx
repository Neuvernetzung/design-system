/* eslint-disable jsx-a11y/no-static-element-interactions */
import CharacterCount from "@tiptap/extension-character-count";
import LinkExtension from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import { Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { ReactNode } from "react";
import {
  Controller,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import { cn } from "@/utils/cn";

import {
  bordersInteractive,
  paddingsXLarge,
  paddingsY,
  roundings,
  transition,
} from "../../../styles";
import type { Size } from "../../../types";
import { requiredInputRule } from "../../../utils/internal/inputRule";
import { FormElement, RequiredRule } from "../Form";
import { proseClassName } from "../Prose";
import { Text } from "../Typography";
import { FloatingMenuExtension } from "./Floating";
import { Floating } from "./Floating/NodeView";
import { ImageExtension } from "./Image";
import { ImageFigure } from "./Image/Figure";
import { BubbleMenu } from "./Menus/bubblemenu";
import { MenuBar } from "./Menus/menuBar";
import { SlashCommand } from "./Slash";
import { SlashMenu } from "./Slash/Menu";
import { TableExtensions } from "./Table";
import { Float } from "./Float";

export type RichTextProps = {
  label?: string;
  helper?: string;
  required?: RequiredRule;
  placeholder?: string;
  maxLength?: number;
  showLength?: boolean;
  containerClassName?: string;
  AdditionalMenuItems?: ({ editor }: { editor: Editor | null }) => ReactNode;
  size?: Size;
};

export const RichText = <
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
  AdditionalMenuItems,
  size = "md",
}: RichTextProps & UseControllerProps<TFieldValues, TName>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] },
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
          if (node.type.name === "figure") {
            return "";
          }
          return `Tippe "/" für Befehle...`;
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
        HTMLAttributes: { target: "_blank" },
      }),
      FloatingMenuExtension,
      Float,
      ImageFigure,
      ImageExtension,
      SlashCommand,
      ...TableExtensions,
    ],
    editorProps: {
      attributes: {
        id: name,
        role: "textbox",
        "aria-label": label || name,
        class: cn(
          proseClassName,
          paddingsY.md,
          paddingsXLarge.xl,
          "outline-none focus:outline-none focus-visible:outline-none focus-within:outline-none"
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

  return (
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
            className={cn(
              !error ? bordersInteractive.accent : bordersInteractive.danger,
              "group border w-full relative cursor-auto",
              roundings.md,
              transition,
              "focus:outline-none focus-within:ring focus-within:ring-opacity-20 dark:focus-within:ring-opacity-20 focus-within:ring-accent-600 dark:focus-within:ring-accent-300",
              containerClassName
            )}
          >
            {editor ? <BubbleMenu editor={editor} /> : null}
            {editor ? <Floating editor={editor} /> : null}
            {editor ? <SlashMenu editor={editor} /> : null}
            <MenuBar
              editor={editor}
              AdditionalMenuItems={
                AdditionalMenuItems && AdditionalMenuItems({ editor })
              }
            />
            <EditorContent
              ref={ref}
              className={cn("appearance-none")}
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
                className={cn("absolute bottom-2 right-5 pointer-events-none")}
              >
                {editor?.storage.characterCount.characters()} / {maxLength}
              </Text>
            )}
          </div>
        </FormElement>
      )}
    />
  );
};
