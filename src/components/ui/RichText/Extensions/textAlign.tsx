import TextAlign from "@tiptap/extension-text-align";

const classAttachment = ` !block`; // Block um Default behaviour von Text "inline" zu überschreiben.
const defaultAlignment = "text-left";

export const CustomTextAlign = TextAlign.extend({
  addOptions() {
    return {
      types: ["heading", "paragraph"],
      alignments: ["text-left", "text-center", "text-right", "text-justify"],
      defaultAlignment,
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: ["heading", "paragraph"],
        attributes: {
          textAlign: {
            default: defaultAlignment,
            parseHTML: (element) =>
              element.className?.replace(classAttachment, "") ||
              defaultAlignment,
            renderHTML: (attributes) => {
              if (attributes.textAlign === defaultAlignment) {
                return {};
              }

              return { class: `${attributes.textAlign}${classAttachment}` };
            },
          },
        },
      },
    ];
  },
});
