import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react-dom";
import { Portal } from "@radix-ui/react-portal";
import { Root as ToolbarRoot, ToolbarButton } from "@radix-ui/react-toolbar";
import {
  IconAlignCenter,
  IconAlignJustified,
  IconAlignLeft,
  IconAlignRight,
  IconBold,
  IconClearFormatting,
  IconDots,
  IconItalic,
  IconList,
  IconListNumbers,
  IconQuote,
  IconSeparator,
  IconStrikethrough,
  IconUnderline,
} from "@tabler/icons-react";
import { isNodeSelection, posToDOMRect } from "@tiptap/core";
import type { Editor } from "@tiptap/react";
import { useRef } from "react";

import { useDebounce } from "@/hooks";
import {
  bgColors,
  borders,
  divides,
  gaps,
  paddings,
  popoverAnimation,
  roundings,
  shadows,
} from "@/styles";
import { offsetSizes } from "@/styles/popper/offset";
import { cn } from "@/utils";
import { mergeRefs } from "@/utils/internal";

import { IconButton } from "../../Button";
import { Menu } from "../../Menu";
import { AddLinkButton } from "./addLink";
import { RichTextMenuGroup, RichTextMenuGroupItem } from "./menuItem";
import { SelectText } from "./selectText";

export type BubbleMenuProps = {
  editor: Editor;
};

export const BubbleMenu = ({ editor }: BubbleMenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { ranges } = editor.state.selection;
  const from = Math.min(...ranges.map((range) => range.$from.pos));

  const to = Math.max(...ranges.map((range) => range.$to.pos));

  const virtualEl = {
    getBoundingClientRect() {
      if (isNodeSelection(editor.state.selection)) {
        const node = editor.view.nodeDOM(from) as HTMLElement;

        if (node) {
          return node.getBoundingClientRect();
        }
      }

      return posToDOMRect(editor?.view, from, to);
    },
  };

  const { x, y, strategy, refs } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "top",
    elements: { reference: virtualEl },
    middleware: [
      offset({ mainAxis: offsetSizes.md }),
      flip({
        padding: offsetSizes.md,
        boundary: editor.options.element,
        fallbackPlacements: [
          "bottom",
          "top-start",
          "bottom-start",
          "top-end",
          "bottom-end",
        ],
      }),
    ],
  });

  const openRaw = !editor.view.state.selection.empty;
  const open = useDebounce(openRaw, 250); // Werte werden einzelnd in useDebounce verwendet, da useEffect mit Object Schwierigkeiten hat

  if (!openRaw) return null;

  return (
    <Portal>
      <div
        style={{
          position: strategy,
          top: y,
          left: x,
        }}
        ref={refs.setFloating}
      >
        <ToolbarRoot
          ref={mergeRefs([containerRef])}
          data-state={open ? "open" : "closed"}
          className={cn(
            "flex-row flex-nowrap border",
            open ? "flex" : "hidden",
            popoverAnimation,
            gaps.md,
            divides.accent,
            borders.accent,
            paddings.sm,
            bgColors.white,
            shadows.md,
            roundings.md
          )}
        >
          <SelectText editor={editor} containerRef={containerRef} />
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
          <Menu
            containerRef={containerRef}
            buttonComponent={
              <ToolbarButton asChild>
                <IconButton
                  variant="ghost"
                  size="sm"
                  ariaLabel="extended_toolbar_menu"
                  icon={IconDots}
                />
              </ToolbarButton>
            }
            items={[
              {
                type: "group",
                children: "Ausrichtung",
                items: [
                  {
                    type: "custom",
                    children: (
                      <ToolbarRoot className={cn(paddings.sm)}>
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
                            onClick={() =>
                              editor.commands.setTextAlign("center")
                            }
                            active={editor.isActive({ textAlign: "center" })}
                          />
                          <RichTextMenuGroupItem
                            value="right"
                            ariaLabel="align right"
                            icon={IconAlignRight}
                            onClick={() =>
                              editor.commands.setTextAlign("right")
                            }
                            active={editor.isActive({ textAlign: "right" })}
                          />
                          <RichTextMenuGroupItem
                            value="justify"
                            ariaLabel="align justify"
                            icon={IconAlignJustified}
                            onClick={() =>
                              editor.commands.setTextAlign("justify")
                            }
                            active={editor.isActive({ textAlign: "justify" })}
                          />
                        </RichTextMenuGroup>
                      </ToolbarRoot>
                    ),
                  },
                ],
              },
              { type: "separator" },
              {
                type: "button",
                icon: IconList,
                onClick: () => editor.chain().focus().toggleBulletList().run(),
                children: "Ungeordnete Liste",
                buttonProps: {
                  variant: editor.isActive("bulletList") ? "subtile" : "ghost",
                },
              },
              {
                type: "button",
                icon: IconListNumbers,
                onClick: () => editor.chain().focus().toggleOrderedList().run(),
                children: "Geordnete Liste",
                buttonProps: {
                  variant: editor.isActive("orderedList") ? "subtile" : "ghost",
                },
              },
              { type: "separator" },
              {
                type: "button",
                icon: IconQuote,
                onClick: () => editor.chain().focus().toggleBlockquote().run(),
                children: "Zitat",
                buttonProps: {
                  variant: editor.isActive("blockquote") ? "subtile" : "ghost",
                },
              },
              { type: "separator" },
              {
                type: "button",
                icon: IconSeparator,
                onClick: () => editor.chain().focus().setHorizontalRule().run(),
                children: "Separierung",
              },
              {
                type: "button",
                icon: IconClearFormatting,
                onClick: () => () => {
                  editor.chain().focus().unsetAllMarks().run();
                  editor.chain().focus().clearNodes().run();
                },
                children: "Styles entfernen",
              },
            ]}
          />
        </ToolbarRoot>
      </div>
    </Portal>
  );
};
