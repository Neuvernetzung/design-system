import { autoUpdate, flip, offset, useFloating } from "@floating-ui/react-dom";
import {
  DropdownMenuContent,
  DropdownMenuPortal,
  Root as DropdownMenuRoot,
} from "@radix-ui/react-dropdown-menu";
import { Editor, isNodeSelection, posToDOMRect, Range } from "@tiptap/react";
import { useStore } from "zustand";

import {
  getDropdownContainerStyles,
  offsetSizes,
  popoverAnimation,
} from "@/styles";
import { cn } from "@/utils";

import { MenuItems } from "../../Menu";
import { VARIABLE_EXTENSIONS_NAME, variableMenuStore } from ".";
import { useVariablesContext } from "./Context/useVariableContext";

type VariableMenuProps = {
  editor: Editor;
};

export const VariableMenu = ({ editor }: VariableMenuProps) => {
  const { open, target, range: storeRange } = useStore(variableMenuStore);
  const range = storeRange || { from: NaN, to: NaN };

  const { variables = {} } = useVariablesContext();

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

  return (
    <DropdownMenuRoot
      open={open && editor.options.element === target} // Vergleich mit editorElement und target, da sonst durch globalen State alle SlashMenüs auf gehen bei jedem Editor
      onOpenChange={(open) => {
        variableMenuStore.setState({ open });
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
            items={[
              {
                type: "group",
                children: "Variablen",
                items:
                  Object.keys(variables).length !== 0
                    ? Object.entries(variables).map(([id, variable]) => ({
                        children: variable.title,
                        onClick: () => {
                          const allowed = allow({ state: editor.state, range });
                          if (!allowed) return;
                          command({
                            editor,
                            range,
                            props: { label: variable.title, id },
                          });
                        },
                      }))
                    : [
                        {
                          children: "Keine Variablen verfügbar.",
                          disabled: true,
                          onClick: () => {},
                        },
                      ],
              },
            ]}
          />
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  );
};

type AllowProps = { state: Editor["state"]; range: Range };

const allow = ({ state, range }: AllowProps) => {
  const $from = state.doc.resolve(range.from);
  const type = state.schema.nodes[VARIABLE_EXTENSIONS_NAME];
  const allow = !!$from.parent.type.contentMatch.matchType(type);

  return allow;
};

type CommandProps = {
  editor: Editor;
  range: Range;
  props: Record<string, string>;
};

const command = ({ editor, range, props }: CommandProps) => {
  // increase range.to by one when the next node is of type "text"
  // and starts with a space character
  const nodeAfter = editor.view.state.selection.$to.nodeAfter;
  const overrideSpace = nodeAfter?.text?.startsWith(" ");

  const clonedRange = { ...range };

  if (overrideSpace) {
    clonedRange.to += 1;
  }

  editor
    .chain()
    .focus()
    .insertContentAt(clonedRange, [
      {
        type: VARIABLE_EXTENSIONS_NAME,
        attrs: props,
      },
      {
        type: "text",
        text: " ",
      },
    ])
    .run();

  window.getSelection()?.collapseToEnd();
};
