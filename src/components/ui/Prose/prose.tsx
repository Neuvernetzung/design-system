import cn from "classnames";
import type { Element, HTMLReactParserOptions } from "html-react-parser";
import parse, { domToReact } from "html-react-parser";
import { createElement, ReactNode } from "react";

import { prose } from "../../../styles";
import { ProseComponents, ProseComponentTags } from "../../../types";
import { typedMemo } from "../../../utils/internal";
import { BlockQuote } from "../BlockQuote";
import { HorizontalRule } from "../HorizontalRule";
import { NativeLink } from "../Link";
import { ListItem, OrderedList, UnorderedList } from "../List";
import { Heading, Text } from "../Typography";

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
    component: NativeLink,
    props: {},
  },
  hr: { component: HorizontalRule, props: {} },
};

interface CreateProseComponent {
  name: ProseComponentTags;
  attributes?: any;
  className?: string;
  children: ReactNode;
}

export const createProseElement = ({
  name,
  attributes,
  className,
  children,
}: CreateProseComponent) => {
  if (!proseComponents[name]) return null;
  const { component, props } = proseComponents[name];

  return createElement(
    component,
    { ...props, ...attributes, className },
    children
  );
};

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    const typedDomNode = domNode as Element;
    if (typedDomNode.attribs) {
      const name = (typedDomNode.name ||
        ProseComponentTags.P) as ProseComponentTags;
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
