import HardBreakExtension from "@tiptap/extension-hard-break";

export const CustomHardBreak = HardBreakExtension.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => {
        if (
          this.editor.isActive("orderedList") ||
          this.editor.isActive("bulletList")
        ) {
          return this.editor.commands.createParagraphNear();
        }
        if (this.editor.isActive("heading"))
          return this.editor.commands.createParagraphNear();
        return this.editor.commands.setHardBreak();
      },
    };
  },
});
