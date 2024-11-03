import {
  findChildrenInRange,
  mergeAttributes,
  Node,
  nodeInputRule,
  Tracker,
} from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";

import { ResizableVideoNodeView } from "./NodeView";

export interface FigureOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    videoFigure: {
      /**
       * Add a figure element
       */
      setFigure: (options: { src: string; caption?: string }) => ReturnType;

      /**
       * Converts a video to a figure
       */
      videoToFigure: () => ReturnType;

      /**
       * Converts a figure to a video
       */
      figureToVideo: () => ReturnType;
    };
  }
}

export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const VideoFigure = Node.create<FigureOptions>({
  name: "videoFigure",

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
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: `figure[data-type="video"]`,
        contentElement: "figcaption",
        priority: 999, // Um data-type="video" zu bevorzugen im Vergleich zu ohne data-type Attribut
        getAttrs(element) {
          if (typeof element === "string") return { src: null }; // Return, da el kein HTMLElement ist
          const el = element.querySelector("video");
          if (!el) return { src: null };

          let src: string | null = null;

          /**
           * Source Childnode muss gefunden werden um src Attribut zu bekommen.
           */
          for (let i = 0; i < el.children.length; i += 1) {
            if (el.children[i].localName === "source") {
              src = el.children[i].getAttribute("src");
            }
          }

          return { src };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { style, src, ...rest } = HTMLAttributes;

    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes, {
        style,
        "data-type": "video",
      }),
      ["video", mergeAttributes({ controls: true }, rest), ["source", { src }]],
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

      videoToFigure:
        () =>
        ({ tr, commands }) => {
          const { doc, selection } = tr;
          const { from, to } = selection;
          const videos = findChildrenInRange(
            doc,
            { from, to },
            (node) => node.type.name === "video"
          );

          if (!videos.length) {
            return false;
          }

          const tracker = new Tracker(tr);

          return commands.forEach(videos, ({ node, pos }) => {
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

      figureToVideo:
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
              type: "video",
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
          const [, src] = match;

          return { src };
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableVideoNodeView);
  },
});
