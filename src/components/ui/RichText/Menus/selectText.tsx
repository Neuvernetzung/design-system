import { Editor as CoreEditor } from "@tiptap/core";
import { Editor } from "@tiptap/react";
import { IconSelector } from "@tabler/icons-react";
import { Menu } from "../../Menu";

export const textTypeTags = ["p", "h1", "h2", "h3", "h4", "h5", "h6"] as const;

export type TextTypeTags = (typeof textTypeTags)[number];

const tags: Record<TextTypeTags, string> = {
  p: "Paragraph - p",
  h1: "Überschrift - h1",
  h2: "Überschrift - h2",
  h3: "Überschrift - h3",
  h4: "Überschrift - h4",
  h5: "Überschrift - h5",
  h6: "Überschrift - h6",
};

type SelectTextProps = {
  editor: Editor;
  selectedTag: TextTypeTags;
  setSelectedTag: (type: TextTypeTags) => void;
  id: string;
};

type returnTextSelectionProps = {
  editor: CoreEditor;
};

export const returnTextSelection = ({ editor }: returnTextSelectionProps) => {
  if (editor.isActive("heading", { level: 1 })) {
    return "h1";
  }
  if (editor.isActive("heading", { level: 2 })) {
    return "h2";
  }
  if (editor.isActive("heading", { level: 3 })) {
    return "h3";
  }
  if (editor.isActive("heading", { level: 4 })) {
    return "h4";
  }
  if (editor.isActive("heading", { level: 5 })) {
    return "h5";
  }
  if (editor.isActive("heading", { level: 6 })) {
    return "h6";
  }
  return "p";
};

export const SelectText = ({
  editor,
  selectedTag,
  setSelectedTag,
  id,
}: SelectTextProps) => (
  <Menu
    size="sm"
    placement="bottom"
    buttonType="button"
    buttonProps={{
      id,
      tabIndex: -1,
      children: tags[selectedTag || "p"],
      className: "truncate w-36",
      variant: "ghost",
      size: "sm",
      rightIcon: IconSelector,
    }}
    items={[
      {
        children: "Fließtext",
        items: [
          {
            children: tags.p,
            onClick: () => {
              editor?.chain().focus().setParagraph().run();
              setSelectedTag("p");
            },
          },
        ],
      },
      {
        children: "Überschriften",
        items: [
          {
            children: tags.h1,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 1 }).run();
              setSelectedTag("h1");
            },
          },
          {
            children: tags.h2,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 2 }).run();
              setSelectedTag("h2");
            },
          },
          {
            children: tags.h3,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 3 }).run();
              setSelectedTag("h3");
            },
          },
          {
            children: tags.h4,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 4 }).run();
              setSelectedTag("h4");
            },
          },
          {
            children: tags.h5,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 5 }).run();
              setSelectedTag("h5");
            },
          },
          {
            children: tags.h6,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 6 }).run();
              setSelectedTag("h6");
            },
          },
        ],
      },
    ]}
  />
);
