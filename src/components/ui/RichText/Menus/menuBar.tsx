/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Editor } from "@tiptap/react";
import cn from "classnames";
import { useRef, KeyboardEvent, ReactNode } from "react";

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
          icon={Bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_1"
          ariaLabel="italic"
          icon={Italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_2"
          ariaLabel="underline"
          icon={UnderlineIcon}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_3"
          ariaLabel="strikthrough"
          icon={Strikethrough}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        />
      </RichTextMenuGroup>
      <RichTextMenuGroup>
        <RichTextMenuItem
          id="richtext_menu_item_4"
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
          icon={AlignLeftIcon}
          onClick={() => editor.chain().focus().setTextAlign("text-left").run()}
          active={editor.isActive({ textAlign: "text-left" })}
        />
        <RichTextMenuItem
          id="richtext_menu_item_8"
          ariaLabel="align center"
          icon={AlignCenterIcon}
          onClick={() =>
            editor.chain().focus().setTextAlign("text-center").run()
          }
          active={editor.isActive({ textAlign: "text-center" })}
        />
        <RichTextMenuItem
          id="richtext_menu_item_9"
          ariaLabel="align right"
          icon={AlignRightIcon}
          onClick={() =>
            editor.chain().focus().setTextAlign("text-right").run()
          }
          active={editor.isActive({ textAlign: "text-right" })}
        />
        <RichTextMenuItem
          id="richtext_menu_item_10"
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
          id="richtext_menu_item_11"
          ariaLabel="bulletlist"
          icon={ListBulletIcon}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_12"
          ariaLabel="orderedlist"
          icon={OrderedList}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_13"
          ariaLabel="quote"
          icon={Quote}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        />
        <RichTextMenuItem
          id="richtext_menu_item_14"
          ariaLabel="horizontal rule"
          icon={MinusIcon}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </RichTextMenuGroup>
      {AdditionalMenuItems && (
        <RichTextMenuGroup>{AdditionalMenuItems}</RichTextMenuGroup>
      )}
    </div>
  );
};
