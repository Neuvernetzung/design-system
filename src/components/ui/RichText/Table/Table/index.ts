import TableExtension, { createTable } from "@tiptap/extension-table";
import { TextSelection } from "@tiptap/pm/state";

export const Table = TableExtension.configure({
  HTMLAttributes: { class: "relative" },
}).extend({
  addCommands() {
    return {
      ...this.parent?.(),
      insertTable:
        (options) =>
        ({ editor, commands, tr, dispatch }) => {
          const node = createTable(
            editor.schema,
            options?.rows || 3,
            options?.cols || 3,
            options?.withHeaderRow || false
          );

          if (dispatch) {
            const offset = tr.selection.anchor + 1;
            commands.insertContent({
              type: "table-wrapper",
              content: [node.toJSON()],
            });

            tr.scrollIntoView().setSelection(
              TextSelection.near(tr.doc.resolve(offset))
            );
          }

          return true;
        },
      deleteTable:
        () =>
        ({ state, dispatch }) => {
          const $pos = state.selection.$anchor;
          for (let d = $pos.depth; d > 0; d -= 1) {
            const node = $pos.node(d);
            if (node.type.name === "table-wrapper") {
              if (dispatch) {
                dispatch(
                  state.tr
                    .delete($pos.before(d), $pos.after(d))
                    .scrollIntoView()
                );
              }
              return true;
            }
          }
          return false;
        },
    };
  },
});
