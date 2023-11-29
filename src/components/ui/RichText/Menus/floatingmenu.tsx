import { Portal } from "@radix-ui/react-portal";
import {
  IconCode,
  IconH1,
  IconH2,
  IconH3,
  IconLetterP,
  IconList,
  IconListNumbers,
  IconPlus,
  IconQuote,
  IconSeparator,
  IconTable,
} from "@tabler/icons-react";
import { type Editor } from "@tiptap/react";
import { FloatingMenu as TiptapFloatingMenu } from "@tiptap/react";
import { useRef } from "react";

import { gapsSmall } from "@/styles";
import { cn } from "@/utils";

import { IconButton } from "../../Button/IconButton";
import { Menu } from "../../Menu";

export type ChangeMenuProps = {
  editor: Editor;
};

export const FloatingMenu = ({ editor }: ChangeMenuProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // selection.$from.posAtIndex(0) könnte die Lösung sein um immer am Anfang anzuzeigen

  return (
    <Portal>
      <TiptapFloatingMenu editor={editor}>
        <div ref={containerRef} className={cn("flex flex-row", gapsSmall.md)}>
          <Menu
            menuContentProps={{
              onCloseAutoFocus: () => {
                editor.commands.focus();
              },
            }}
            containerRef={containerRef}
            size="md"
            side="bottom"
            align="start"
            buttonComponent={
              <IconButton
                size="sm"
                variant="ghost"
                ariaLabel="add_element"
                icon={IconPlus}
              />
            }
            items={[
              {
                type: "group",
                children: "Fließtexte",
                items: [
                  {
                    icon: IconLetterP,
                    children: "Text",
                    onClick: () => {
                      editor.commands.setParagraph();
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
                      editor.commands.setHeading({ level: 1 });
                    },
                  },
                  {
                    icon: IconH2,
                    children: "Überschrift 2",
                    onClick: () => {
                      editor.commands.setHeading({ level: 2 });
                    },
                  },
                  {
                    icon: IconH3,
                    children: "Überschrift 3",
                    onClick: () => {
                      editor.commands.setHeading({ level: 3 });
                    },
                  },
                ],
              },
              { type: "separator" },
              {
                icon: IconTable,
                children: "Tabelle",
                onClick: () => {
                  editor.commands.insertTable();
                },
              },
              { type: "separator" },
              {
                icon: IconList,
                children: "Ungeordnete Liste",
                onClick: () => {
                  editor.commands.toggleBulletList();
                },
              },
              {
                icon: IconListNumbers,
                children: "Geordnete Liste",
                onClick: () => {
                  editor.commands.toggleOrderedList();
                },
              },
              { type: "separator" },
              {
                icon: IconQuote,
                children: "Zitat",
                onClick: () => {
                  editor.commands.setBlockquote();
                },
              },
              {
                icon: IconCode,
                children: "Code Block",
                onClick: () => {
                  editor.commands.setCodeBlock();
                },
              },
              { type: "separator" },
              {
                icon: IconSeparator,
                children: "Separierung",
                onClick: () => {
                  editor.commands.setHorizontalRule();
                },
              },
            ]}
          />
        </div>
      </TiptapFloatingMenu>
    </Portal>
  );
};
