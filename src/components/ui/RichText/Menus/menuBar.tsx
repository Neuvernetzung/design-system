/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Editor } from "@tiptap/react";
import { cn } from "@/utils";
import { useRef, KeyboardEvent, ReactNode } from "react";

import {
  bordersInteractive,
  extendedBgColors,
  gaps,
  paddings,
  transition,
} from "../../../../styles";
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconList,
  IconSeparator,
  IconBold,
  IconClearFormatting,
  IconItalic,
  IconListNumbers,
  IconQuote,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";

import { AddLinkButton } from "./addLink";
import { RichTextMenuGroup, RichTextMenuItem } from "./menuItem";
import { SelectText, TextTypeTags } from "./selectText";

type MenuBarProps = {
  editor: Editor | null;
  selectedTag: TextTypeTags;
  setSelectedTag: (type: TextTypeTags) => void;
  setLastMenuItem: (index: number) => void;
  AdditionalMenuItems?: ReactNode;
};

export const MenuBar = ({
  editor,
  selectedTag,
  setSelectedTag,
  setLastMenuItem,
  AdditionalMenuItems,
}: MenuBarProps) => {
  const menuBarRef = useRef<HTMLDivElement>(null);

  if (!editor) {
    return null;
  }

  const getAllMenuItems = () =>
    menuBarRef.current?.querySelectorAll(`[id^="richtext_menu_item_"]`) as
      | HTMLButtonElement[]
      | undefined;

  const getActiveElementId = () => document.activeElement?.id;

  const menuBarKeyDown = (e: KeyboardEvent) => {
    // Bei Tab und Shift-Tab reicht default Behaviour.
    if (e.key === "ArrowLeft") {
      const activeIndex = Number(
        getActiveElementId()?.replace("richtext_menu_item_", "")
      );
      const items = getAllMenuItems();
      if (!items) return;
      if (activeIndex - 1 < 0) {
        items[items.length - 1]?.focus();
        setLastMenuItem(items.length - 1);
      }
      items[activeIndex - 1]?.focus();
      setLastMenuItem(activeIndex - 1);
    }
    if (e.key === "ArrowRight") {
      const activeIndex = Number(
        getActiveElementId()?.replace("richtext_menu_item_", "")
      );
      const items = getAllMenuItems();
      if (!items) return;
      if (activeIndex + 1 > items.length - 1) {
        items[0]?.focus();
        setLastMenuItem(0);
      }
      items[activeIndex + 1]?.focus();
      setLastMenuItem(activeIndex + 1);
    }
    // Zur ersten und letzten Komponente springen
    if (e.key === "ArrowUp") {
      getAllMenuItems()?.[0]?.focus();
      setLastMenuItem(0);
    }
    if (e.key === "ArrowDown") {
      const items = getAllMenuItems();
      if (!items) return;
      items[items.length - 1]?.focus();
      setLastMenuItem(items.length - 1);
    }
  };

  return (
    <div
      onKeyDown={menuBarKeyDown}
      ref={menuBarRef}
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
          id="richtext_menu_item_0"
          ariaLabel="bold"
          icon={IconBold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_1"
          ariaLabel="italic"
          icon={IconItalic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_2"
          ariaLabel="underline"
          icon={IconUnderline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_3"
          ariaLabel="strikthrough"
          icon={IconStrikethrough}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        />
      </RichTextMenuGroup>
      <RichTextMenuGroup>
        <RichTextMenuItem
          id="richtext_menu_item_4"
          ariaLabel="formatclear"
          icon={IconClearFormatting}
          tooltip="Styles entfernen"
          onClick={() => {
            editor.chain().focus().unsetAllMarks().run();
            editor.chain().focus().clearNodes().run();
          }}
        />
      </RichTextMenuGroup>

      <RichTextMenuGroup>
        <SelectText
          id="richtext_menu_item_5"
          editor={editor}
          selectedTag={selectedTag}
          setSelectedTag={setSelectedTag}
        />
      </RichTextMenuGroup>
      <RichTextMenuGroup>
        <AddLinkButton id="richtext_menu_item_6" editor={editor} />
      </RichTextMenuGroup>
      <RichTextMenuGroup>
        <RichTextMenuItem
          id="richtext_menu_item_7"
          ariaLabel="align left"
          icon={IconAlignLeft}
          onClick={() => editor.commands.setTextAlign("left")}
          active={editor.isActive({ textAlign: "left" })}
        />
        <RichTextMenuItem
          id="richtext_menu_item_8"
          ariaLabel="align center"
          icon={IconAlignCenter}
          onClick={() => editor.commands.setTextAlign("center")}
          active={editor.isActive({ textAlign: "center" })}
        />
        <RichTextMenuItem
          id="richtext_menu_item_9"
          ariaLabel="align right"
          icon={IconAlignRight}
          onClick={() => editor.commands.setTextAlign("right")}
          active={editor.isActive({ textAlign: "right" })}
        />
        <RichTextMenuItem
          id="richtext_menu_item_10"
          ariaLabel="align justify"
          icon={IconAlignJustified}
          onClick={() => editor.commands.setTextAlign("justify")}
          active={editor.isActive({ textAlign: "justify" })}
        />
      </RichTextMenuGroup>
      <RichTextMenuGroup>
        <RichTextMenuItem
          id="richtext_menu_item_11"
          ariaLabel="bulletlist"
          icon={IconList}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_12"
          ariaLabel="orderedlist"
          icon={IconListNumbers}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_13"
          ariaLabel="quote"
          icon={IconQuote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_14"
          ariaLabel="horizontal rule"
          icon={IconSeparator}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </RichTextMenuGroup>
      {AdditionalMenuItems && (
        <RichTextMenuGroup>{AdditionalMenuItems}</RichTextMenuGroup>
      )}
    </div>
  );
};
