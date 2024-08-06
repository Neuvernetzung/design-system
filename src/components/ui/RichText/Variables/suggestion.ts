import { ReactRenderer } from "@tiptap/react";
import { SuggestionOptions, SuggestionProps } from "@tiptap/suggestion";
import tippy, { Instance } from "tippy.js";

import type { EmailVariable } from "../emailEditor";
import { VariablesList } from "./list";

export const suggestion: Partial<SuggestionOptions<EmailVariable>> = {
  render: () => {
    let component: ReactRenderer<
      ReturnType<NonNullable<SuggestionOptions["render"]>>,
      SuggestionProps<EmailVariable>
    >;
    let popup: Instance;

    return {
      onStart: (props) => {
        component = new ReactRenderer(VariablesList, {
          props,
          editor: props.editor,
        });

        if (!props.clientRect) {
          return;
        }

        popup = tippy(document.body as Element, {
          getReferenceClientRect: props.clientRect as () => DOMRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start",
        });
      },

      onUpdate(props) {
        component.updateProps(props);

        if (!props.clientRect) {
          return;
        }

        popup.setProps({
          getReferenceClientRect: props.clientRect as () => DOMRect,
        });
      },

      onKeyDown(props) {
        if (props.event.key === "Escape") {
          popup.hide();

          return true;
        }

        return !!component?.ref?.onKeyDown?.(props);
      },

      onExit() {
        popup.destroy();
        component.destroy();
      },
    };
  },
};
