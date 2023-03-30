import { Editor as CoreEditor } from "@tiptap/core";
import { Editor } from "@tiptap/react";

import { ChevronUpDownIcon } from "../../../../theme/icons";
import { Menu } from "../../Menu";

export enum TextTypeTags {
  P = "p",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
}

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
    return TextTypeTags.H1;
  }
  if (editor.isActive("heading", { level: 2 })) {
    return TextTypeTags.H2;
  }
  if (editor.isActive("heading", { level: 3 })) {
    return TextTypeTags.H3;
  }
  if (editor.isActive("heading", { level: 4 })) {
    return TextTypeTags.H4;
  }
  if (editor.isActive("heading", { level: 5 })) {
    return TextTypeTags.H5;
  }
  if (editor.isActive("heading", { level: 6 })) {
    return TextTypeTags.H6;
  }
  return TextTypeTags.P;
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
      children: tags[selectedTag || TextTypeTags.P],
      className: "truncate w-36",
      variant: "ghost",
      size: "sm",
      rightIcon: ChevronUpDownIcon,
    }}
    items={[
      {
        children: "Fließtext",
        items: [
          {
            children: tags.p,
            onClick: () => {
              editor?.chain().focus().setParagraph().run();
              setSelectedTag(TextTypeTags.P);
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
              setSelectedTag(TextTypeTags.H1);
            },
          },
          {
            children: tags.h2,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 2 }).run();
              setSelectedTag(TextTypeTags.H2);
            },
          },
          {
            children: tags.h3,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 3 }).run();
              setSelectedTag(TextTypeTags.H3);
            },
          },
          {
            children: tags.h4,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 4 }).run();
              setSelectedTag(TextTypeTags.H4);
            },
          },
          {
            children: tags.h5,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 5 }).run();
              setSelectedTag(TextTypeTags.H5);
            },
          },
          {
            children: tags.h6,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 6 }).run();
              setSelectedTag(TextTypeTags.H6);
            },
          },
        ],
      },
    ]}
  />
);
