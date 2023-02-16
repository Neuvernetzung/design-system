import { Editor } from "@tiptap/react";
import cn from "classnames";

import {
  bordersInteractive,
  extendedBgColors,
  gaps,
  paddings,
  transition,
} from "../../../../styles";
import {
  AlignCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ListBulletIcon,
  MinusIcon,
} from "../../../../theme/icons";
import {
  Bold,
  Break,
  FormatClear,
  Italic,
  OrderedList,
  Quote,
  Strikethrough,
  UnderlineIcon,
} from "../icons";
import { AddLinkButton } from "./addLink";
import { RichTextMenuGroup, RichTextMenuItem } from "./menuItem";
import { SelectText, TextTypeTags } from "./selectText";

type MenuBarProps = {
  editor: Editor | null;
  selectedTag: TextTypeTags;
  setSelectedTag: (type: TextTypeTags) => void;
};

export const MenuBar = ({
  editor,
  selectedTag,
  setSelectedTag,
}: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div
      className={cn(
        gaps.md,
        bordersInteractive.accent,
        extendedBgColors.filledSubtile,
        paddings.sm,
        transition,
        "z-[1] flex flex-row flex-wrap border-b sticky top-0"
      )}
    >
      <RichTextMenuGroup>
        <RichTextMenuItem
          ariaLabel="bold"
          icon={Bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        />
        <RichTextMenuItem
          ariaLabel="italic"
          icon={Italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        />
        <RichTextMenuItem
          ariaLabel="underline"
          icon={UnderlineIcon}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        />
        <RichTextMenuItem
          ariaLabel="strikthrough"
          icon={Strikethrough}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        />
      </RichTextMenuGroup>
      <RichTextMenuGroup>
        <RichTextMenuItem
          ariaLabel="formatclear"
          icon={FormatClear}
          tooltip="Styles entfernen"
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run();
            editor.chain().focus().clearNodes().run();
          }}
        />
      </RichTextMenuGroup>

      <RichTextMenuGroup>
        <SelectText
          editor={editor}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </RichTextMenuGroup>
      <RichTextMenuGroup>
        <AddLinkButton editor={editor} />
      </RichTextMenuGroup>
      <RichTextMenuGroup>
        <RichTextMenuItem
          ariaLabel="align left"
          icon={AlignLeftIcon}
          onClick={() => editor.chain().focus().setTextAlign("text-left").run()}
          active={editor.isActive({ textAlign: "text-left" })}
        />
        <RichTextMenuItem
          ariaLabel="align center"
          icon={AlignCenterIcon}
          onClick={() =>
            editor.chain().focus().setTextAlign("text-center").run()
          }
          active={editor.isActive({ textAlign: "text-center" })}
        />
        <RichTextMenuItem
          ariaLabel="align right"
          icon={AlignRightIcon}
          onClick={() =>
            editor.chain().focus().setTextAlign("text-right").run()
          }
          active={editor.isActive({ textAlign: "text-right" })}
        />
        <RichTextMenuItem
          ariaLabel="align justify"
          icon={AlignJustifyIcon}
          onClick={() =>
            editor.chain().focus().setTextAlign("text-justify").run()
          }
          active={editor.isActive({ textAlign: "text-justify" })}
        />
      </RichTextMenuGroup>
      <RichTextMenuGroup>
        <RichTextMenuItem
          ariaLabel="bulletlist"
          icon={ListBulletIcon}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        />
        <RichTextMenuItem
          ariaLabel="orderedlist"
          icon={OrderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        />
        <RichTextMenuItem
          ariaLabel="quote"
          icon={Quote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        />
        <RichTextMenuItem
          ariaLabel="horizontal rule"
          icon={MinusIcon}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
        <RichTextMenuItem
          ariaLabel="hard break"
          icon={Break}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        />
      </RichTextMenuGroup>
    </div>
  );
};
