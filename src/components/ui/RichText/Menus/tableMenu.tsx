import type { Editor } from "@tiptap/react";
import { Tooltip } from "../../Tooltip";
import { ToolbarButton } from "@radix-ui/react-toolbar";
import { IconButton } from "../../Button/IconButton";
import {
  IconColumnInsertLeft,
  IconColumnInsertRight,
  IconTableOptions,
  IconTablePlus,
} from "@tabler/icons-react";
import { Menu } from "../../Menu";

type TableMenuItemProps = {
  editor: Editor;
};

export const TableMenuItem = ({ editor }: TableMenuItemProps) => {
  const isTable = editor.isActive("table");
  if (!isTable)
    return (
      <Tooltip label="Tabelle hinzufügen">
        <ToolbarButton asChild>
          <IconButton
            variant="ghost"
            size="sm"
            ariaLabel="add_table"
            icon={IconTablePlus}
            onClick={() => {
              editor.commands.insertTable({
                rows: 3,
                cols: 3,
                withHeaderRow: true,
              });
            }}
          />
        </ToolbarButton>
      </Tooltip>
    );

  return (
    <Menu
      buttonComponent={
        <ToolbarButton asChild>
          <IconButton
            size="sm"
            variant="ghost"
            icon={IconTableOptions}
            ariaLabel="table_options"
          />
        </ToolbarButton>
      }
      items={[
        {
          type: "group",
          children: "Hinzufügen",
          items: [
            {
              type: "button",
              children: "Spalte davor hinzufügen",
              onClick: () => {
                editor.commands.addColumnBefore();
              },
              icon: IconColumnInsertLeft,
            },
            {
              type: "button",
              children: "Spalte danach hinzufügen",
              onClick: () => {
                editor.commands.addColumnAfter();
              },
              icon: IconColumnInsertRight,
            },
          ],
        },
      ]}
    />
  );
};
