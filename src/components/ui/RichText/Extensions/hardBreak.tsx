import HardBreakExtension from "@tiptap/extension-hard-break";

export const CustomHardBreak = HardBreakExtension.extend({
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.setHardBreak(),
    };
  },
});
