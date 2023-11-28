/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Root as ToolbarRoot } from "@radix-ui/react-toolbar";
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconClearFormatting,
  IconItalic,
  IconList,
  IconListNumbers,
  IconQuote,
  IconSeparator,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";
import { Editor } from "@tiptap/react";
import type { ReactNode } from "react";

import { cn } from "@/utils";

import {
  bordersInteractive,
  extendedBgColors,
  gaps,
  paddings,
  transition,
} from "../../../../styles";
import { AddLinkButton } from "./addLink";
import {
  RichTextMenuGroup,
  RichTextMenuGroupItem,
  RichTextMenuItem,
} from "./menuItem";

type MenuBarProps = {
  editor: Editor | null;
  AdditionalMenuItems?: ReactNode;
};

export const MenuBar = ({ editor, AdditionalMenuItems }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <ToolbarRoot
      className={cn(
        gaps.md,
        bordersInteractive.accent,
        extendedBgColors.filledSubtile,
        paddings.sm,
        transition,
        "flex flex-row flex-wrap border-b"
      )}
    >
      <RichTextMenuGroup type="multiple">
        <RichTextMenuGroupItem
          value="bold"
          ariaLabel="bold"
          icon={IconBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        />
        <RichTextMenuGroupItem
          value="italic"
          ariaLabel="italic"
          icon={IconItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        />
        <RichTextMenuGroupItem
          value="underline"
          ariaLabel="underline"
          icon={IconUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        />
        <RichTextMenuGroupItem
          value="strikthrough"
          ariaLabel="strikthrough"
          icon={IconStrikethrough}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        />
      </RichTextMenuGroup>
      <AddLinkButton editor={editor} />
      <RichTextMenuGroup type="single">
        <RichTextMenuGroupItem
          value="left"
          ariaLabel="align left"
          icon={IconAlignLeft}
          onClick={() => editor.commands.setTextAlign("left")}
          active={editor.isActive({ textAlign: "left" })}
        />
        <RichTextMenuGroupItem
          value="center"
          ariaLabel="align center"
          icon={IconAlignCenter}
          onClick={() => editor.commands.setTextAlign("center")}
          active={editor.isActive({ textAlign: "center" })}
        />
        <RichTextMenuGroupItem
          value="right"
          ariaLabel="align right"
          icon={IconAlignRight}
          onClick={() => editor.commands.setTextAlign("right")}
          active={editor.isActive({ textAlign: "right" })}
        />
        <RichTextMenuGroupItem
          value="justify"
          ariaLabel="align justify"
          icon={IconAlignJustified}
          onClick={() => editor.commands.setTextAlign("justify")}
          active={editor.isActive({ textAlign: "justify" })}
        />
      </RichTextMenuGroup>
      <RichTextMenuGroup type="single">
        <RichTextMenuGroupItem
          value="bullet"
          ariaLabel="bulletlist"
          icon={IconList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        />
        <RichTextMenuGroupItem
          value="ordered"
          ariaLabel="orderedlist"
          icon={IconListNumbers}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        />
      </RichTextMenuGroup>
      <RichTextMenuItem
        ariaLabel="quote"
        icon={IconQuote}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      />
      <RichTextMenuItem
        ariaLabel="horizontal rule"
        icon={IconSeparator}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />
      {AdditionalMenuItems && (
        <RichTextMenuGroup type="multiple">
          {AdditionalMenuItems}
        </RichTextMenuGroup>
      )}
      <RichTextMenuItem
        ariaLabel="formatclear"
        icon={IconClearFormatting}
        tooltip="Styles entfernen"
        onClick={() => {
          editor.chain().focus().unsetAllMarks().run();
          editor.chain().focus().clearNodes().run();
        }}
      />
    </ToolbarRoot>
  );
};
