import { Extension } from "@tiptap/core";

export interface FloatOptions {
  types: string[];
  floats: string[];
  defaultFloat: string;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    float: {
      /**
       * Set the text align attribute
       */
      setFloat: (float: string) => ReturnType;
      /**
       * Unset the text align attribute
       */
      unsetFloat: () => ReturnType;
    };
  }
}

export const Float = Extension.create<FloatOptions>({
  name: "float",

  addOptions() {
    return {
      types: ["image", "figure"],
      floats: ["left", "right", "none"],
      defaultFloat: "none",
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          float: {
            default: this.options.defaultFloat,
            parseHTML: (element) =>
              element.style.float || this.options.defaultFloat,
            renderHTML: (attributes) => {
              if (attributes.float === this.options.defaultFloat) {
                return {};
              }

              return {
                style: `float: ${attributes.float}`,
                "data-float": attributes.float,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFloat:
        (float: string) =>
        ({ commands }) => {
          if (!this.options.floats.includes(float)) {
            return false;
          }

          return this.options.types.every((type) =>
            commands.updateAttributes(type, { float })
          );
        },

      unsetFloat:
        () =>
        ({ commands }) =>
          this.options.types.every((type) =>
            commands.resetAttributes(type, "float")
          ),
    };
  },
});
