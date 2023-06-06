import { FC } from "react";

import type { BlockQuoteProps } from "../components/ui/BlockQuote";
import type { HorizontalRuleProps } from "../components/ui/HorizontalRule";
import type { NativeLinkProps } from "../components/ui/Link";
import type {
  ListItemProps,
  OrderedListProps,
  UnorderedListProps,
} from "../components/ui/List";
import type { HeadingProps } from "../components/ui/Typography/Heading/heading";
import type { TextProps } from "../components/ui/Typography/Text";
import type { ImageProps } from "../components/ui/Image";

export enum ProseComponentTags {
  P = "p",
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  OL = "ol",
  UL = "ul",
  LI = "li",
  BLOCKQUOTE = "blockquote",
  A = "a",
  HR = "hr",
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
  hr: ProseComponent<HorizontalRuleProps>;
  img: ProseComponent<ImageProps>;
}

interface ProseComponent<T> {
  component: string | FC;
  props: T & { className?: string };
}
