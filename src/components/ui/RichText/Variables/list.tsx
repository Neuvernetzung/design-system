import { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Button } from "../../Button";
import type { EmailVariable } from "../emailEditor";
import { useVariablesContext } from "./Context/useVariableContext";

export const VariablesList = forwardRef<
  ReturnType<NonNullable<SuggestionOptions["render"]>>,
  SuggestionProps<EmailVariable>
>(({ command }, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { values = [] } = useVariablesContext();

  const selectItem = (index: number) => {
    const item = values[index];

    if (item) {
      command({ label: item.title, id: item.value });
    }
  };

  const upHandler = () => {
    setSelectedIndex((selectedIndex + values.length - 1) % values.length);
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % values.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <div className="min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md flex flex-col gap-1">
      {values.map((item, index) => (
        <Button key={item.value} onClick={() => selectItem(index)}>
          {item.title}
        </Button>
      ))}
    </div>
  );
});

VariablesList.displayName = "VariablesList";
