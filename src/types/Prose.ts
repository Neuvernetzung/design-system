import { FC } from "react";

import type { BlockQuoteProps } from "../components/ui/BlockQuote";
import type {
  ListItemProps,
  OrderedListProps,
  UnorderedListProps,
} from "../components/ui/List";
import { type HeadingProps } from "../components/ui/Typography/Heading/heading";
import { TextProps } from "../components/ui/Typography/Text";

export enum ProseComponentTags {
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ol,
  ul,
  li,
  blockquote,
}

export interface ProseComponents {
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
}

interface ProseComponent<T> {
  component: string | FC;
  props: T;
}
