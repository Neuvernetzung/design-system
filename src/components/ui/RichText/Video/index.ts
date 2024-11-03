import {
  mergeAttributes,
  Node,
  nodeInputRule,
  ReactNodeViewRenderer,
} from "@tiptap/react";

import { ResizableVideoNodeView } from "./NodeView";

export interface VideoOptions {
  /**
   * HTML attributes to add to the video element.
   * @default {}
   * @example { class: 'foo' }
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    video: {
      /**
       * Add an video
       * @param options The video attributes
       * @example
       * editor
       *   .commands
       *   .setVideo({ src: 'https://beispiel.de/file.mp4' })
       */
      setVideo: (options: { src: string }) => ReturnType;
    };
  }
}

/**
 * Matches an video to a ![video](src "title") on input.
 */
export const inputRegex = /!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\)/;

export const VideoExtension = Node.create<VideoOptions>({
  name: "video",

  group: "block",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  draggable: true,

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
        tag: "video",
        getAttrs: (el) => {
          if (typeof el === "string") return { src: null }; // Return, da el kein HTMLElement ist
          let src: string | null = null;

          /**
           * Source Childnode muss gefunden werden um src Attribut zu bekommen.
           */
          for (let i = 0; i < el.children.length; i += 1) {
            if (el.children[i].localName === "source") {
              src = el.children[i].getAttribute("src");
            }
          }

          return {
            src,
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, ...rest } = HTMLAttributes;

    return [
      "video",
      mergeAttributes({ controls: true }, rest),
      ["source", { src }],
    ];
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            type: this.name,
            attrs: options,
          }),
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , src] = match;

          return { src };
        },
      }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ResizableVideoNodeView);
  },
});
