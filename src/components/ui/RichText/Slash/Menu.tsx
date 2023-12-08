import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react-dom";
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  Root as DropdownMenuRoot,
} from "@radix-ui/react-dropdown-menu";
import {
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconLetterP,
  IconList,
  IconListNumbers,
  IconQuote,
  IconSeparator,
  IconTable,
} from "@tabler/icons-react";
import {
  type Editor,
  isNodeSelection,
  posToDOMRect,
  type Range,
} from "@tiptap/react";
import compact from "lodash/compact";
import { create, useStore } from "zustand";

import { popoverAnimation } from "@/styles";
import { getDropdownContainerStyles } from "@/styles/groups";
import { offsetSizes } from "@/styles/popper/offset";
import { cn } from "@/utils";

import { MenuItems } from "../../Menu";
import type {
  RichTextOptionProps,
  RichTextPluginWithEditorProps,
} from "../richText";

export const slashMenuStore = create<{
  open: boolean;
  range?: Range;
  target?: Element;
}>(() => ({
  open: false,
  range: undefined,
  target: undefined,
}));

type SlashMenuProps = {
  editor: Editor;
  options: RichTextOptionProps | undefined;
  plugins: RichTextPluginWithEditorProps | undefined;
};

export const SlashMenu = ({ editor, options, plugins }: SlashMenuProps) => {
  const { open, range: storeRange, target } = useStore(slashMenuStore);
  const range = storeRange || { from: NaN, to: NaN };

  const virtualEl = {
    getBoundingClientRect() {
      if (isNodeSelection(editor.state.selection)) {
        const node = editor.view.nodeDOM(
          editor.state.selection.from
        ) as HTMLElement;

        if (node) {
          return node.getBoundingClientRect();
        }
      }

      return posToDOMRect(
        editor?.view,
        editor.state.selection.from,
        editor.state.selection.to
      );
    },
  };

  const { x, y, strategy, refs } = useFloating({
    whileElementsMounted: autoUpdate,
    placement: "bottom",
    elements: { reference: virtualEl },
    middleware: [
      offset({ mainAxis: offsetSizes.md }),
      flip({
        padding: offsetSizes.md,
        fallbackPlacements: [
          "top",
          "bottom-start",
          "top-start",
          "bottom-end",
          "top-end",
        ],
      }),
    ],
  });

  const pluginMenuItems = compact(
    plugins?.map((plugin) => plugin.menuItems).flat() || []
  );

  return (
    <DropdownMenuRoot
      open={open && editor.options.element === target} // Vergleich mit editorElement und target, da sonst durch globalen State alle SlashMenüs auf gehen bei jedem Editor
      onOpenChange={(open) => {
        slashMenuStore.setState({ open });
      }}
    >
      <DropdownMenuPortal>
        <DropdownMenuContent
          style={{ position: strategy, top: y, left: x }}
          ref={refs.setFloating}
          className={cn(
            getDropdownContainerStyles({ size: "sm" }),
            "will-change-[transform,opacity]",
            popoverAnimation
          )}
        >
          <MenuItems
            size="sm"
            items={compact([
              {
                type: "group",
                children: "Fließtexte",
                items: [
                  {
                    icon: IconLetterP,
                    children: "Text",
                    onClick: () => {
                      editor
                        .chain()
                        .deleteRange(range)
                        .setParagraph()
                        .focus()
                        .run();
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
                    children: "Überschrift 1",
                    onClick: () => {
                      editor
                        .chain()
                        .deleteRange(range)
                        .setHeading({ level: 1 })
                        .focus()
                        .run();
                    },
                  },
                  {
                    icon: IconH2,
                    children: "Überschrift 2",
                    onClick: () => {
                      editor
                        .chain()
                        .deleteRange(range)
                        .setHeading({ level: 2 })
                        .focus()
                        .run();
                    },
                  },
                  {
                    icon: IconH3,
                    children: "Überschrift 3",
                    onClick: () => {
                      editor
                        .chain()
                        .deleteRange(range)
                        .setHeading({ level: 3 })
                        .focus()
                        .run();
                    },
                  },
                ],
              },
              pluginMenuItems.length !== 0 && { type: "separator" },
              pluginMenuItems.length !== 0 && {
                type: "group",
                items: pluginMenuItems,
              },

              !options?.disableTable && { type: "separator" },
              !options?.disableTable && {
                icon: IconTable,
                children: "Tabelle",
                onClick: () => {
                  editor.chain().deleteRange(range).insertTable().focus().run();
                },
              },
              { type: "separator" },
              {
                icon: IconList,
                children: "Ungeordnete Liste",
                onClick: () => {
                  editor
                    .chain()
                    .deleteRange(range)
                    .toggleBulletList()
                    .focus()
                    .run();
                },
              },
              {
                icon: IconListNumbers,
                children: "Geordnete Liste",
                onClick: () => {
                  editor
                    .chain()
                    .deleteRange(range)
                    .toggleOrderedList()
                    .focus()
                    .run();
                },
              },
              { type: "separator" },
              {
                icon: IconQuote,
                children: "Zitat",
                onClick: () => {
                  editor
                    .chain()
                    .deleteRange(range)
                    .setBlockquote()
                    .focus()
                    .run();
                },
              },
              {
                icon: IconCode,
                children: "Code Block",
                onClick: () => {
                  editor
                    .chain()
                    .deleteRange(range)
                    .setCodeBlock()
                    .focus()
                    .run();
                },
              },
              { type: "separator" },
              {
                icon: IconSeparator,
                children: "Separierung",
                onClick: () => {
                  editor
                    .chain()
                    .deleteRange(range)
                    .setHorizontalRule()
                    .focus()
                    .run();
                },
              },
            ])}
          />
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};
