import {
  IconChevronDown,
  IconColumnInsertLeft,
  IconColumnInsertRight,
  IconColumnRemove,
  IconRowInsertBottom,
  IconRowInsertTop,
  IconRowRemove,
} from "@tabler/icons-react";
import type { Editor } from "@tiptap/core";
import type { CSSProperties } from "react";

import { IconButton } from "@/components/ui/Button";
import { Menu } from "@/components/ui/Menu";

export type TableCellMenuProps = { editor: Editor; style?: CSSProperties };

export const TableCellMenu = ({ editor, style }: TableCellMenuProps) => (
  <Menu
    buttonComponent={
      <IconButton
        style={style}
        size="xs"
        variant="ghost"
        className="absolute top-0 right-0"
        ariaLabel="table_cell_options"
        icon={IconChevronDown}
      />
    }
    menuContentProps={{
      onCloseAutoFocus(e) {
        // Nach klick Menübutton nicht erneut fokussieren
        e.stopPropagation();
        e.preventDefault();
      },
    }}
    items={[
      {
        type: "group",
        children: "Hinzufügen",
        items: [
          {
            icon: IconRowInsertBottom,
            children: "Reihe unten",
            onClick: () => {
              editor.chain().focus().addRowAfter().run();
            },
          },
          {
            icon: IconRowInsertTop,
            children: "Reihe oben",
            onClick: () => {
              editor.chain().focus().addRowBefore().run();
            },
          },
          {
            icon: IconColumnInsertRight,
            children: "Spalte rechts",
            onClick: () => {
              editor.chain().focus().addColumnAfter().run();
            },
          },
          {
            icon: IconColumnInsertLeft,
            children: "Spalte links",
            onClick: () => {
              editor.chain().focus().addColumnBefore().run();
            },
          },
        ],
      },
      { type: "separator" },
      {
        type: "group",
        children: "Entfernen",
        items: [
          {
            icon: IconRowRemove,
            children: "Reihe entfernen",
            onClick: () => {
              editor.chain().focus().deleteRow().run();
            },
          },
          {
            icon: IconColumnRemove,
            children: "Spalte entfernen",
            onClick: () => {
              editor.chain().focus().deleteColumn().run();
            },
          },
        ],
      },
    ]}
  />
);
