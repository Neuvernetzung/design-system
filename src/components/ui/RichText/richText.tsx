import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import cn from "classnames";
import { useState } from "react";
import { Text } from "../Typography";
import {
  Controller,
  FieldPath,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

import {
  bordersInteractive,
  paddings,
  roundings,
  transition,
} from "../../../styles";
import { typedMemo } from "../../../utils/internal";
import { FormElement, RequiredRule } from "../Form";
import {
  CustomBlockQuote,
  CustomBulletList,
  CustomHeading,
  CustomHorizontalRule,
  CustomLink,
  CustomListItem,
  CustomOrderedList,
  CustomParagraph,
} from "./Extensions";
import { CustomTextAlign } from "./Extensions/textAlign";
import { MenuBar } from "./Menus/menuBar";
import { returnTextSelection, TextTypeTags } from "./Menus/selectText";

export interface RichTextProps {
  label?: string;
  helper?: string;
  required?: RequiredRule;
  placeholder?: string;
  maxLength?: number;
  showLength?: boolean;
}

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
}: RichTextProps & UseControllerProps<TFieldValues, TName>) => {
  const {
    field: { value, onChange },
  } = useController({ control, name });

  const [selectedTag, setSelectedTag] = useState<TextTypeTags>(TextTypeTags.P);

  const editor = useEditor({
    onSelectionUpdate({ editor }) {
      setSelectedTag(returnTextSelection({ editor }));
    },
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder,
      }),

      CharacterCount.configure({
        limit: maxLength,
      }),

      CustomTextAlign,
      CustomBulletList,
      CustomOrderedList,
      CustomListItem,
      CustomHeading,
      CustomParagraph,
      CustomLink,
      CustomBlockQuote,
      CustomHorizontalRule,
    ],
    editorProps: {
      attributes: {
        id: name,
        role: "textbox",
        "aria-label": label || name,
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
        required,
      }}
      render={({ fieldState: { error } }) => (
        <FormElement name={name} label={label} helper={helper} error={error}>
          <div
            className={cn(
              !error ? bordersInteractive.accent : bordersInteractive.danger,
              "group border w-full relative",
              roundings.md,
              transition,
              "focus:outline-none focus-within:ring focus-within:ring-opacity-20 dark:focus-within:ring-opacity-20 focus-within:ring-accent-600 dark:focus-within:ring-accent-300"
            )}
          >
            <MenuBar
              editor={editor}
              selectedTag={selectedTag}
              setSelectedTag={setSelectedTag}
            />
            <EditorContent
              className={cn(
                paddings.md,
                "[&>.ProseMirror]:outline-none [&>.ProseMirror]:focus:outline-none [&>.ProseMirror]:focus-visible:outline-none [&>.ProseMirror]:focus-within:outline-none",
                "appearance-none"
              )}
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

export default typedMemo(RichText);
