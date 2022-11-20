import { FC } from "react";

import type { BlockQuoteProps } from "../components/ui/BlockQuote";
import { NativeLinkProps } from "../components/ui/Link";
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
  a,
}

export interface ProseComponents {
  p: ProseComponent<TextProps>;
  h1: ProseComponent<HeadingProps<"h1">>;
  h2: ProseComponent<HeadingProps<"h2">>;
  h3: ProseComponent<HeadingProps<"h3">>;
  h4: ProseComponent<HeadingProps<"h4">>;
  h5: ProseComponent<HeadingProps<"h5">>;
  h6: ProseComponent<HeadingProps<"h6">>;
  ol: ProseComponent<OrderedListProps>;
  ul: ProseComponent<UnorderedListProps>;
  li: ProseComponent<ListItemProps>;
  blockquote: ProseComponent<BlockQuoteProps>;
  a: ProseComponent<NativeLinkProps>;
}

interface ProseComponent<T> {
  component: string | FC;
  props: T;
}
