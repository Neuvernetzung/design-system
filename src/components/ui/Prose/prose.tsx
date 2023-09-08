import cn from "classnames";
import type { Element, HTMLReactParserOptions } from "html-react-parser";
import parse, { domToReact } from "html-react-parser";
import { createElement, ReactNode } from "react";

import { prose } from "../../../styles";
import type { ProseComponents, ProseComponentTag } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { BlockQuote } from "../Typography/BlockQuote";
import { HorizontalRule } from "../HorizontalRule";
import { Image } from "../Image";
import { ListItem, OrderedList, UnorderedList } from "../List";
import { Anchor, Heading, Text } from "../Typography";

export type ProseProps = {
  content: string | undefined;
  className?: string;
};

export const proseComponents: ProseComponents = {
  p: { component: Text, props: {} },
  h1: {
    component: Heading,
    props: { size: "4xl", as: "h1" },
  },
  h2: { component: Heading, props: { size: "xl", as: "h2" } },
  h3: { component: Heading, props: { size: "lg", as: "h3" } },
  h4: { component: Heading, props: { size: "md", as: "h4" } },
  h5: { component: Heading, props: { size: "sm", as: "h5" } },
  h6: { component: Heading, props: { size: "xs", as: "h6" } },
  ol: { component: OrderedList, props: {} },
  ul: { component: UnorderedList, props: {} },
  li: { component: ListItem, props: {} },
  blockquote: {
    component: BlockQuote,
    props: {},
  },
  a: {
    component: Anchor,
    props: {},
  },
  hr: { component: HorizontalRule, props: {} },
  img: {
    component: Image as any,
    props: {
      alt: "",
      src: "",
      dynamicRatio: true,
    },
    isVoid: true,
  },
};

type CreateProseComponent = {
  name: ProseComponentTag;
  attributes?: any;
  className?: string;
  children?: ReactNode;
};

export const createProseElement = ({
  name,
  attributes,
  className,
  children,
}: CreateProseComponent) => {
  if (!proseComponents[name]) return null;
  const { component, props, isVoid } = proseComponents[name];

  if (isVoid)
    return createElement(component, {
      ...props,
      ...attributes,
      className: cn(props.className, attributes?.className, className),
    });

  return createElement(
    component,
    {
      ...props,
      ...attributes,
      className: cn(props.className, attributes?.className, className),
    },
    children
  );
};

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const typedDomNode = domNode as Element;
    if (typedDomNode.attribs) {
      const name = (typedDomNode.name || "p") as ProseComponentTag;
      const { class: className, ...attributes } = typedDomNode.attribs;

      return createProseElement({
        name,
        attributes,
        className,
        children:
          typedDomNode.children && domToReact(typedDomNode.children, options),
      });
    }

    return null;
  },
};

export const Prose = ({ content, className }: ProseProps) => {
  if (!content) return null;

  return <div className={cn(prose, className)}>{parse(content, options)}</div>;
};

export default typedMemo(Prose);
