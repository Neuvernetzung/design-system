import { ToolbarButton } from "@radix-ui/react-toolbar";
import {
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconLetterP,
  IconSelector,
} from "@tabler/icons-react";
import { Editor as CoreEditor } from "@tiptap/core";
import { Editor } from "@tiptap/react";
import type { RefObject } from "react";

import { Button } from "../../Button";
import { Menu } from "../../Menu";

export const textTypeTags = ["p", "h1", "h2", "h3", "h4"] as const;

export type TextTypeTags = (typeof textTypeTags)[number];

const tags: Record<TextTypeTags, string> = {
  p: "Text",
  h1: "Überschrift 1",
  h2: "Überschrift 2",
  h3: "Überschrift 3",
  h4: "Überschrift 4",
};

type SelectTextProps = {
  editor: Editor;
  containerRef?: RefObject<HTMLElement>;
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
  return "p";
};

export const SelectText = ({ editor, containerRef }: SelectTextProps) => (
  <Menu
    size="sm"
    containerRef={containerRef}
    buttonComponent={
      <ToolbarButton asChild>
        <Button
          className="truncate"
          variant="ghost"
          size="sm"
          rightIcon={IconSelector}
        >
          {tags[returnTextSelection({ editor }) || "p"]}
        </Button>
      </ToolbarButton>
    }
    items={[
      {
        type: "group",
        children: "Fließtexte",
        items: [
          {
            icon: IconLetterP,
            children: tags.p,
            onClick: () => {
              editor?.chain().focus().setParagraph().run();
            },
          },
        ],
      },
      { type: "separator" },
      {
        type: "group",
        children: "Überschriften",
        items: [
          {
            icon: IconH1,
            children: tags.h1,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 1 }).run();
            },
          },
          {
            icon: IconH2,
            children: tags.h2,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 2 }).run();
            },
          },
          {
            icon: IconH3,
            children: tags.h3,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 3 }).run();
            },
          },
          {
            icon: IconH4,
            children: tags.h4,
            onClick: () => {
              editor?.chain().focus().toggleHeading({ level: 4 }).run();
            },
          },
        ],
      },
    ]}
  />
);
