import {
  findChildrenInRange,
  mergeAttributes,
  Node,
  nodeInputRule,
  Tracker,
} from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { ResizableMediaNodeView } from "./NodeView";

export interface FigureOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figure: {
      /**
       * Add a figure element
       */
      setFigure: (options: {
        src: string;
        alt?: string;
        title?: string;
        caption?: string;
      }) => ReturnType;

      /**
       * Converts an image to a figure
       */
      imageToFigure: () => ReturnType;

      /**
       * Converts a figure to an image
       */
      figureToImage: () => ReturnType;
    };
  }
}

export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const ImageFigure = Node.create<FigureOptions>({
  name: "figure",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: "block",

  content: "inline*",

  draggable: true,

  isolating: true,

  addAttributes() {
    return {
      src: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("src"),
      },

      alt: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("alt"),
      },

      title: {
        default: null,
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("title"),
      },

      width: {
        default: "100%",
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("width"),
      },

      height: {
        default: "auto",
        parseHTML: (element) =>
          element.querySelector("img")?.getAttribute("height"),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `figure[data-type="image"]`,
        contentElement: "figcaption",
      },
      {
        // Ohne data-type trotzdem unterstützen
        tag: `figure`,
        contentElement: "figcaption",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { style, "data-float": dataFloat, ...rest } = HTMLAttributes;

    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, {
        style,
        "data-float": dataFloat,
        "data-type": "image",
      }),
      ["img", rest],
      ["figcaption", 0],
    ];
  },

  addCommands() {
    return {
      setFigure:
        ({ caption, ...attrs }) =>
        ({ chain }) =>
          chain()
            .insertContent({
              type: this.name,
              attrs,
              content: caption ? [{ type: "text", text: caption }] : [],
            })
            // set cursor at end of caption field
            .command(({ tr, commands }) => {
              const { doc, selection } = tr;
              const position = doc.resolve(selection.to - 2).end();

              return commands.setTextSelection(position);
            })
            .run(),

      imageToFigure:
        () =>
        ({ tr, commands }) => {
          const { doc, selection } = tr;
          const { from, to } = selection;
          const images = findChildrenInRange(
            doc,
            { from, to },
            (node) => node.type.name === "image"
          );

          if (!images.length) {
            return false;
          }

          const tracker = new Tracker(tr);

          return commands.forEach(images, ({ node, pos }) => {
            const mapResult = tracker.map(pos);

            if (mapResult.deleted) {
              return false;
            }

            const range = {
              from: mapResult.position,
              to: mapResult.position + node.nodeSize,
            };

            return commands.insertContentAt(range, {
              type: this.name,
              attrs: node.attrs,
            });
          });
        },

      figureToImage:
        () =>
        ({ tr, commands }) => {
          const { doc, selection } = tr;
          const { from, to } = selection;
          const figures = findChildrenInRange(
            doc,
            { from, to },
            (node) => node.type.name === this.name
          );

          if (!figures.length) {
            return false;
          }

          const tracker = new Tracker(tr);

          return commands.forEach(figures, ({ node, pos }) => {
            const mapResult = tracker.map(pos);

            if (mapResult.deleted) {
              return false;
            }

            const range = {
              from: mapResult.position,
              to: mapResult.position + node.nodeSize,
            };

            return commands.insertContentAt(range, {
              type: "image",
              attrs: node.attrs,
            });
          });
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, src, alt, title] = match;

          return { src, alt, title };
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableMediaNodeView);
  },
});
