import { FC } from "react";

import type { BlockQuoteProps } from "../components/ui/Typography/BlockQuote";
import type { HorizontalRuleProps } from "../components/ui/HorizontalRule";
import type {
  ListItemProps,
  OrderedListProps,
  UnorderedListProps,
} from "../components/ui/List";
import type { HeadingProps } from "../components/ui/Typography/Heading/heading";
import type { TextProps } from "../components/ui/Typography/Text";
import type { ImageProps } from "../components/ui/Image";
import type { AnchorProps } from "../components";

export const proseComponentTags = [
  "p",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "ol",
  "ul",
  "li",
  "blockquote",
  "a",
  "hr",
  "img",
] as const;

export type ProseComponentTag = (typeof proseComponentTags)[number];

export type ProseComponents = {
  p: ProseComponent<TextProps>;
  h1: ProseComponent<HeadingProps>;
  h2: ProseComponent<HeadingProps>;
  h3: ProseComponent<HeadingProps>;
  h4: ProseComponent<HeadingProps>;
  h5: ProseComponent<HeadingProps>;
  h6: ProseComponent<HeadingProps>;
  ol: ProseComponent<OrderedListProps>;
  ul: ProseComponent<UnorderedListProps>;
  li: ProseComponent<ListItemProps>;
  blockquote: ProseComponent<BlockQuoteProps>;
  a: ProseComponent<AnchorProps>;
  hr: ProseComponent<HorizontalRuleProps>;
  img: ProseComponent<ImageProps>;
};

type ProseComponent<T> = {
  component: string | FC;
  props: T & { className?: string };
  isVoid?: boolean;
};
