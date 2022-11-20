import cn from "classnames";
import escapeHtml from "escape-html";
import parse from "html-dom-parser";
import { type Descendant, Text } from "slate";
import { jsx } from "slate-hyperscript";

// eslint-disable-next-line default-param-last
const serializeReducer = (acc: any = [], node: Descendant) => {
  const className = Object.entries(node).reduce(
    (classNames: any, [prop, value]) => {
      switch (prop) {
        // case "indent":
        //   return [...classNames, `indent-${value}`];
        // case "lineHeight":
        //   return [
        //     ...classNames,
        //     `line-height-${String(value).replace(".", "_")}`
        //   ];
        case "font-bold":
        case "italic":
        case "underline":
          return [...classNames, prop];
        default:
          return classNames;
      }
    },
    []
  );

  const classAttribute =
    node.className || className.length
      ? ` class="${cn(node.className, className)}"`
      : "";

  if (Text.isText(node)) {
    return classAttribute
      ? `${acc}<span${classAttribute}>${escapeHtml(node.text)}</span>`
      : `${acc}${escapeHtml(node.text)}`;
  }

  const children = node.children.reduce(serializeReducer, "");

  switch (node.type) {
    case "p":
      return `${acc}<p${classAttribute}>${children}</p>`;
    case "h1":
      return `${acc}<h1${classAttribute}>${children}</h1>`;
    case "h2":
      return `${acc}<h2${classAttribute}>${children}</h2>`;
    case "h3":
      return `${acc}<h3${classAttribute}>${children}</h2>`;
    case "h4":
      return `${acc}<h4${classAttribute}>${children}</h2>`;
    case "h5":
      return `${acc}<h5${classAttribute}>${children}</h2>`;
    case "h6":
      return `${acc}<h6${classAttribute}>${children}</h2>`;
    // case "link":
    //   return `${acc}<a href="${escapeHtml(
    //     node.url
    //   )}"${classAttribute}>${children}</a>`;
    case "ol":
      return `${acc}<ol${classAttribute}>${children}</ol>`;
    case "ul":
      return `${acc}<ul${classAttribute}>${children}</ul>`;
    case "li":
      return `${acc}<li${classAttribute}>${children}</li>`;
    case "blockquote":
      return `${acc}<blockquote${classAttribute}>${children}</blockquote>`;
    // case "hr":
    //   return `${acc}<hr />`;
    default:
      return `${acc}${children}`;
  }
};

export const serializeHtml = (nodes: Descendant[]) => {
  const serializedHtml = nodes.reduce(serializeReducer, "");
  return serializedHtml;
};

// eslint-disable-next-line default-param-last
const deserializeReducer = (acc: any = [], node: any) => {
  const annotations = node.attribs?.class
    ?.split(" ")
    .reduce((classNames: any, className: string) => {
      if (
        ["text-left", "text-center", "text-right", "text-justify"].includes(
          className
        )
      ) {
        return { ...classNames, className };
      }

      // const [, indent] = /indent-(\d+)/.exec(className) || [];
      // if (indent) {
      //   return { ...classNames, indent: parseInt(indent, 10) };
      // }

      // const [, lineHeight] = /line-height-(.+)/.exec(className) || [];
      // if (lineHeight) {
      //   return { ...classNames, lineHeight: lineHeight.replace("_", ".") };
      // }

      if (["font-bold", "italic", "underline"].includes(className)) {
        return { ...classNames, [className]: true };
      }

      return {
        ...classNames,
        annotations: {
          ...classNames.annotations,
          [className]: true,
        },
      };
    }, {});

  if (!node.name && node.type === "text") {
    return [...acc, { text: node.data }];
  }

  const children =
    node.children && node.children.length
      ? node.children.reduce(deserializeReducer, [])
      : [{ text: "" }];

  switch (node.name) {
    case "html":
    case "body":
    case "div":
      return [...acc, ...children];

    case "span":
      return [
        ...acc,
        jsx(
          "fragment",
          { ...annotations },
          children.map((child: any) => ({ ...annotations, ...child }))
        ),
      ];
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
    case "p":
    case "li":
    case "blockquote":
      return [
        ...acc,
        jsx("element", { ...annotations, type: node.name }, children),
      ];
    case "ol":
    case "ul":
      return [
        ...acc,
        jsx(
          "element",
          { ...annotations, type: node.name },
          children.filter((child: any) => child.text !== "")
        ),
      ];
    // case "hr":
    //   return [...acc, jsx("element", { ...annotations, type: "hr" }, children)];
    // case "a":
    //   return [
    //     ...acc,
    //     jsx(
    //       "element",
    //       { ...annotations, type: "link", url: node.attribs.href },
    //       children
    //     ),
    //   ];
    default:
      return acc;
  }
};

export const deserializeHtml = (html = "") => {
  const nodes = parse(html);

  const deserializedHtml = nodes.reduce(deserializeReducer, []);

  const patchDeserializedHtml = deserializedHtml.reduce(
    (acc: any, node: any) => {
      // Remove empty text nodes.
      if (!node.type && node.text && !node.text.trim()) {
        return acc;
      }

      // Handle span tags outside of paragraphs.
      if (Array.isArray(node)) {
        // eslint-disable-next-line prefer-destructuring, no-param-reassign
        node = node[0];
      }

      // Handle text outside of paragraphs.
      if (!node.type && typeof node.text !== "undefined") {
        const lastNode = acc[acc.length - 1];
        // Combine node with previous, patched paragraph.
        if (lastNode && lastNode.type === "p" && lastNode.isPatch) {
          return [
            ...acc.slice(0, -1),
            {
              ...lastNode,
              children: [...lastNode.children, node],
            },
          ];
        }

        // Create a new patch node by placing it in a paragraph.
        return [...acc, { type: "p", isPatch: true, children: [node] }];
      }

      return [...acc, node];
    },
    []
  );

  return patchDeserializedHtml;
};
