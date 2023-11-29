import { IconButton } from "@/components/ui/Button";
import { ToolbarButton, Root as ToolbarRoot } from "@radix-ui/react-toolbar";
import {
  IconRowInsertBottom,
  IconTableColumn,
  IconTableOff,
  IconTableRow,
  IconColumnInsertRight,
} from "@tabler/icons-react";
import type { Editor } from "@tiptap/core";
import { toolbarClassName } from "../../Menus/bubblemenu";
import { cn } from "@/utils";
import { CSSProperties, ForwardedRef, forwardRef } from "react";
import { Tooltip } from "@/components/ui/Tooltip";
import { menuGroupClassName } from "../../Menus/menuItem";

export type TableMenuProps = {
  editor: Editor;
  style?: CSSProperties;
};

export const TableMenu = forwardRef(
  ({ editor, style }: TableMenuProps, ref: ForwardedRef<HTMLDivElement>) => (
    <ToolbarRoot
      ref={ref}
      className={cn("flex", toolbarClassName)}
      style={style}
    >
      <div className={menuGroupClassName}>
        <Tooltip label="Zeile hinzufügen" delay={500}>
          <ToolbarButton asChild>
            <IconButton
              variant="ghost"
              size="sm"
              ariaLabel="add_row"
              icon={IconRowInsertBottom}
              onClick={() => {
                editor.chain().focus().addRowAfter().run();
              }}
            />
          </ToolbarButton>
        </Tooltip>
        <Tooltip label="Spalte hinzufügen" delay={500}>
          <ToolbarButton asChild>
            <IconButton
              variant="ghost"
              size="sm"
              ariaLabel="add_col"
              icon={IconColumnInsertRight}
              onClick={() => {
                editor.chain().focus().addColumnAfter().run();
              }}
            />
          </ToolbarButton>
        </Tooltip>
      </div>
      <div className={menuGroupClassName}>
        <Tooltip label="Header Reihe" delay={500}>
          <ToolbarButton asChild>
            <IconButton
              variant="ghost"
              size="sm"
              ariaLabel="toggle_header_row"
              icon={IconTableRow}
              onClick={() => {
                editor.chain().focus().toggleHeaderRow().run();
              }}
            />
          </ToolbarButton>
        </Tooltip>
        <Tooltip label="Header Spalte" delay={500}>
          <ToolbarButton asChild>
            <IconButton
              variant="ghost"
              size="sm"
              ariaLabel="toggle_header_column"
              icon={IconTableColumn}
              onClick={() => {
                editor.chain().focus().toggleHeaderColumn().run();
              }}
            />
          </ToolbarButton>
        </Tooltip>
      </div>
      <Tooltip label="Tabelle löschen" delay={500}>
        <ToolbarButton asChild>
          <IconButton
            variant="ghost"
            size="sm"
            ariaLabel="delete_table"
            icon={IconTableOff}
            onClick={() => {
              editor.chain().focus().deleteTable().run();
            }}
          />
        </ToolbarButton>
      </Tooltip>
    </ToolbarRoot>
  )
);

TableMenu.displayName = "TableMenu";
